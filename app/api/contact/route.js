// Receives the contact form, validates it, emails it (with the CV attached).
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // nodemailer needs Node, not the edge runtime

const MAX_FILE = 4 * 1024 * 1024; // 4 MB. TODO: Vercel rejects request bodies over ~4.5 MB, so don't raise this there
const INTERESTS = ["Career opportunities ", "College or course Admissons", "Ielts / oet / Prometric preparations"];
const FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Very small in-memory rate limit (5 per 10 min per IP). Resets on server restart, and each
// serverless instance has its own counter, so it only stops casual spam. TODO: use Upstash/Redis for strict limits.
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

// Stops form values from injecting HTML into the email
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (limited(ip)) return fail("Too many attempts. Please try again later.", 429);

    const data = await req.formData();
    

    const EXPERIENCE = ["Fresher (no experience)", "Less than 1 year", "1-2 years", "3-5 years", "5+ years"];
const QUALIFICATIONS = ["12th / Plus Two", "Diploma", "GNM", "B.Sc Nursing", "Bachelor's degree", "Master's degree", "Other"];

    // Honeypot: real people never fill this hidden field, bots do. Pretend success so bots move on.
    if (data.get("website")) return Response.json({ ok: true });

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const interest = String(data.get("interest") || "");

    const age = Number(data.get("age"));
const qualification = String(data.get("qualification") || "");
const experience = String(data.get("experience") || "");
const passport = String(data.get("passport") || "");

if (!Number.isInteger(age) || age < 16 || age > 70) return fail("Please enter a valid age.");
if (!QUALIFICATIONS.includes(qualification)) return fail("Please choose your qualification.");
if (!EXPERIENCE.includes(experience)) return fail("Please choose your experience.");
if (!["Yes", "No"].includes(passport)) return fail("Please tell us if you have a valid passport.");


    const file = data.get("cv");

    if (name.length < 2 || name.length > 100) return fail("Please enter your name.");
    if (!/^[+\d][\d\s()-]{6,19}$/.test(phone)) return fail("Please enter a valid phone number.");
    if (!INTERESTS.includes(interest)) return fail("Please choose what you are interested in.");

    // CV is optional; validate it only if one was sent
    let attachments = [];
    if (file && typeof file === "object" && file.size > 0) {
      if (file.size > MAX_FILE) return fail("The file is too large (max 4 MB).");
      if (!FILE_TYPES.includes(file.type)) return fail("Please upload a PDF or Word file.");
      attachments = [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }];
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"FutureMap Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `New enquiry (${interest}): ${name}`, // TODO: subject format
      html: `
        <h2>New website enquiry</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Phone:</b> ${esc(phone)}</p>
        <p><b>Interested in:</b> ${esc(interest)}</p>

        <p><b>Age:</b> ${age}</p>
<p><b>Qualification:</b> ${esc(qualification)}</p>
<p><b>Experience:</b> ${esc(experience)}</p>
<p><b>Valid passport:</b> ${esc(passport)}</p>


        <p><b>CV:</b> ${attachments.length ? "attached" : "not provided"}</p>`,
      attachments,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return fail("Something went wrong. Please try again or WhatsApp us.", 500);
  }
}