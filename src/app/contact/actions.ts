"use server";

import fs from "fs";
import path from "path";

export interface ContactState {
  status: "success" | "error" | null;
  message: string;
}

interface ContactEntry {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "contacts.json");

const LIMITS = { name: 100, email: 254, phone: 30, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s().-]+$/;

function stripTags(str: string) {
  return str.replace(/<[^>]*>/g, "");
}

function sanitize(str: string, maxLen: number) {
  return stripTags(str.trim()).slice(0, maxLen);
}

function appendContact(entry: ContactEntry) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let existing: ContactEntry[] = [];
  if (fs.existsSync(DATA_FILE)) {
    existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }

  existing.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = sanitize(formData.get("name")?.toString()    ?? "", LIMITS.name);
  const email   = sanitize(formData.get("email")?.toString()   ?? "", LIMITS.email);
  const phone   = sanitize(formData.get("phone")?.toString()   ?? "", LIMITS.phone);
  const message = sanitize(formData.get("message")?.toString() ?? "", LIMITS.message);

  if (!name) {
    return { status: "error", message: "Name is required." };
  }
  if (!email && !phone) {
    return { status: "error", message: "Please provide an email or phone number." };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (phone && !PHONE_RE.test(phone)) {
    return { status: "error", message: "Please enter a valid phone number." };
  }

  try {
    appendContact({ name, email, phone, message, submittedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success", message: "Thanks! I'll be in touch soon." };
}
