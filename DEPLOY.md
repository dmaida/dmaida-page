# Deploy dmaida-page to S3 + CloudFront (dmaida.com)

## Prerequisites

- AWS CLI installed and configured
- Node.js installed
- Access to your Cloudflare dashboard for dmaida.com
- All AWS commands use `--region us-west-2` (except ACM, which must be `us-east-1` for CloudFront)

## 1. Code Changes (already done)

- `next.config.ts` — changed to `output: "export"` with `images: { unoptimized: true }`
- Contact page removed entirely (no backend on S3)

## 2. Build the Static Site

```bash
cd /tmp/dmaida-page
npm install
npm run build
```

Output goes to the `out/` directory.

## 3. Create the S3 Bucket

```bash
aws s3api create-bucket \
  --bucket dmaida-page \
  --region us-west-2 \
  --create-bucket-configuration LocationConstraint=us-west-2

aws s3api put-public-access-block \
  --bucket dmaida-page \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true \
  --region us-west-2
```

## 4. Create CloudFront Origin Access Control

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "dmaida-page-oac",
    "OriginAccessControlOriginType": "s3",
    "SigningBehavior": "always",
    "SigningProtocol": "sigv4"
  }' \
  --region us-west-2
```

Save the `Id` from the output → referred to as `<OAC_ID>` below.

## 5. Request ACM Certificate for dmaida.com

This must be in `us-east-1` (CloudFront requirement):

```bash
aws acm request-certificate \
  --domain-name dmaida.com \
  --subject-alternative-names "*.dmaida.com" \
  --validation-method DNS \
  --region us-east-1
```

Save the `CertificateArn` from the output → referred to as `<CERT_ARN>`.

### Validate the certificate via Cloudflare DNS

Get the DNS validation records:

```bash
aws acm describe-certificate \
  --certificate-arn <CERT_ARN> \
  --query "Certificate.DomainValidationOptions" \
  --region us-east-1
```

For each entry in the output, go to **Cloudflare → DNS → Add Record**:

| Field | Value |
|-------|-------|
| Type  | CNAME |
| Name  | The `ResourceRecord.Name` value (without trailing dot, Cloudflare handles it) |
| Target | The `ResourceRecord.Value` value (without trailing dot) |
| Proxy status | **DNS only** (grey cloud) — must NOT be proxied |

Wait for the certificate status to become `ISSUED` (usually 5–15 minutes):

```bash
aws acm describe-certificate \
  --certificate-arn <CERT_ARN> \
  --query "Certificate.Status" \
  --region us-east-1
```

## 6. Create CloudFront Distribution

Replace `<OAC_ID>` and `<CERT_ARN>`:

```bash
aws cloudfront create-distribution \
  --distribution-config '{
    "CallerReference": "dmaida-page-'$(date +%s)'",
    "Comment": "dmaida.com static site",
    "Enabled": true,
    "DefaultRootObject": "index.html",
    "Aliases": {
      "Quantity": 2,
      "Items": ["dmaida.com", "www.dmaida.com"]
    },
    "Origins": {
      "Quantity": 1,
      "Items": [
        {
          "Id": "S3-dmaida-page",
          "DomainName": "dmaida-page.s3.us-west-2.amazonaws.com",
          "OriginAccessControlId": "<OAC_ID>",
          "S3OriginConfig": {
            "OriginAccessIdentity": ""
          }
        }
      ]
    },
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-dmaida-page",
      "ViewerProtocolPolicy": "redirect-to-https",
      "AllowedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      },
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
      "Compress": true
    },
    "CustomErrorResponses": {
      "Quantity": 1,
      "Items": [
        {
          "ErrorCode": 403,
          "ResponsePagePath": "/404.html",
          "ResponseCode": "404",
          "ErrorCachingMinTTL": 60
        }
      ]
    },
    "ViewerCertificate": {
      "ACMCertificateArn": "<CERT_ARN>",
      "SSLSupportMethod": "sni-only",
      "MinimumProtocolVersion": "TLSv1.2_2021"
    },
    "PriceClass": "PriceClass_100"
  }' \
  --region us-west-2
```

Save `Distribution.Id` → `<DIST_ID>` and `Distribution.DomainName` → `<CF_DOMAIN>` (e.g. `d1234abcdef.cloudfront.net`).

## 7. Add S3 Bucket Policy for CloudFront Access

Replace `<DIST_ID>`:

```bash
aws s3api put-bucket-policy \
  --bucket dmaida-page \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowCloudFrontServicePrincipal",
        "Effect": "Allow",
        "Principal": {
          "Service": "cloudfront.amazonaws.com"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::dmaida-page/*",
        "Condition": {
          "StringEquals": {
            "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DIST_ID>"
          }
        }
      }
    ]
  }' \
  --region us-west-2
```

## 8. Upload the Static Site to S3

```bash
aws s3 sync out/ s3://dmaida-page/ \
  --delete \
  --region us-west-2
```

## 9. Configure Cloudflare DNS

In **Cloudflare → dmaida.com → DNS**:

### Remove old records

Delete any existing A, AAAA, or CNAME records for `dmaida.com` and `www` that pointed to your Unraid/Tunnel setup.

### Add new records

| Type  | Name  | Target | Proxy status |
|-------|-------|--------|--------------|
| CNAME | `@`   | `<CF_DOMAIN>` (e.g. `d1234abcdef.cloudfront.net`) | **DNS only** (grey cloud) |
| CNAME | `www` | `<CF_DOMAIN>` | **DNS only** (grey cloud) |

> **Important**: The proxy status MUST be "DNS only" (grey cloud icon), not "Proxied" (orange cloud). CloudFront needs to terminate TLS itself using your ACM certificate. If Cloudflare proxies the traffic, you'll get SSL errors because Cloudflare and CloudFront will fight over TLS termination.

### Disable the Cloudflare Tunnel

If your old tunnel is still active, go to **Cloudflare → Zero Trust → Networks → Tunnels** and remove or disable the tunnel for dmaida.com.

## 10. Verify

Wait for the CloudFront distribution to deploy (5–10 minutes):

```bash
aws cloudfront get-distribution \
  --id <DIST_ID> \
  --query "Distribution.Status" \
  --region us-west-2
```

Once `Deployed`, verify:

```bash
curl -I https://dmaida.com
curl -I https://www.dmaida.com
```

Both should return `200` with `server: CloudFront`.

## Automated Deploys with GitHub Actions

Automates build + deploy on every push to `main`. Free for public repos.

### 1. Create a deploy IAM user

This user has only the permissions needed to sync files and invalidate the cache:

```bash
aws iam create-user --user-name github-actions-deploy --region us-west-2

aws iam put-user-policy --user-name github-actions-deploy \
  --policy-name dmaida-page-deploy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
        "Resource": ["arn:aws:s3:::dmaida-page", "arn:aws:s3:::dmaida-page/*"]
      },
      {
        "Effect": "Allow",
        "Action": "cloudfront:CreateInvalidation",
        "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DIST_ID>"
      }
    ]
  }' \
  --region us-west-2

aws iam create-access-key --user-name github-actions-deploy --region us-west-2
```

Save the `AccessKeyId` and `SecretAccessKey` from the output.

### 2. Add secrets to GitHub

Go to **github.com/dmaida/dmaida-page → Settings → Secrets and variables → Actions** and add:

| Secret name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | The access key ID from above |
| `AWS_SECRET_ACCESS_KEY` | The secret access key from above |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your `<DIST_ID>` |

### 3. Create the workflow file

Add `.github/workflows/deploy.yml` to your repo:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2

      - run: aws s3 sync out/ s3://dmaida-page/ --delete

      - run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

After this, every push to `main` will automatically build and deploy your site in ~2 minutes.

### Manual deploy (without GitHub Actions)

```bash
npm run build
aws s3 sync out/ s3://dmaida-page/ --delete --region us-west-2
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*" --region us-west-2
```

## Estimated Cost

| Service | Cost |
|---------|------|
| S3 storage (2.6 MB) | ~$0.001/month |
| CloudFront (free tier: 1 TB/month for first year) | $0 → ~$0.05/month after |
| ACM certificate | Free |
| GitHub Actions (public repo) | Free |
| **Total** | **~$0.05/month** (effectively $0 during free tier) |
