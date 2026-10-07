// ⚠️ PLACEHOLDERS: replace every value marked TODO before launch.
import { FaGlobeAsia, FaBookOpen, FaHandshake, FaHeadset, FaUserTie } from "react-icons/fa";
import { MdWifiCalling } from "react-icons/md";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaPlaneCircleCheck } from "react-icons/fa6";


export const site = {
  name: "FutureMap",
  tagline: "Career & Admissions Network",
  whatsapp: "https://wa.me/919846604636", // TODO: real WhatsApp number (country code, no +)
  phone: "+91 9846604636",               // TODO
  email: "Futuremapcareer@gmail.com",       // TODO
  instagram: "https://www.instagram.com/futuremapcareer?stkn=MXF5Mjc1N3BxMDc0dQ==",

  facebook:"https://www.facebook.com/share/1FBT4mwuAa/?mibextid=wwXIfr",
  address: "Futuremapcareer, Aqua city township, Tetracore 22, Aluva Paravoor road, Aluva 683511",               // TODO: full address
// Text Google Maps searches for. Replace with the exact business name if it has a Google listing.
mapQuery: "Aqua City Township, Aluva Paravoor Road, Aluva 683511",

};

export const nav = [
  { label: "About", href: "/about" },   // new
  { label: "Services", href: "/services" },
  { label: "Jobs Abroad", href: "/jobs-abroad" },
  { label: "Exam Training", href: "/exam-training" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

// Content below comes from the PDF brief. Edit copy here, not in components.

export const highlights = [
  {
    title: "Jobs in 6 Gulf countries",
    icon: FaGlobeAsia,
  },
  {
    title: "Prometric exam training",
    icon: FaBookOpen,
  },
  {
    title: "Licensed placement partners",
    icon: FaHandshake,
  },
  {
    title: "Help from start to finish",
    icon: FaHeadset,
  },
];


export const services = [
  { title: "Jobs Abroad",   text: "Hospital and healthcare jobs in the Gulf.",    href: "/jobs-abroad",   image: "/images/jobs.jpg" },       // TODO: image
  { title: "Exam Training", text: "Get ready for Prometric and licensing exams.", href: "/exam-training", image: "/images/exam.jpg" },       // TODO: image
  { title: "Documents",     text: "We sort your papers, attestation and visa.",    href: "/services",      image: "/images/documents.jpg" }, // TODO: image
  { title: "Admissions",    text: "Find the right college and course.",           href: "/admissions",    image: "/images/admissions.jpg" }, // TODO: image
];


export const roles = ["Nurses", "Male Nurses", "Doctors", "Pharmacists", "Lab Techs", "Radiographers", "Physiotherapists", "Caregivers", "Technicians", "Aviation", "Engineering", "B.Sc Nursing admissions"];
export const countries = [
  { name: "Saudi Arabia", flag: "/images/flags/saudi.jpg" }, { name: "UAE", flag: "/images/flags/uae.jpg" }, { name: "Qatar", flag: "/images/flags/qatar.jpg" },
  { name: "Kuwait", flag: "/images/flags/kuwait.jpg" }, { name: "Oman", flag: "/images/flags/oman.jpg" }, { name: "Bahrain", flag: "/images/flags/bahrain.jpg" },
];
export const steps = [
  { t: "Talk to us", d: "Free call", icon:MdWifiCalling }, { t: "Get ready", d: "Exam + documents", icon: IoDocumentsSharp, },
  { t: "Get selected", d: "Interview", icon:FaUserTie }, { t: "Fly", d: "Visa, ticket, done", icon:FaPlaneCircleCheck },
];

export const stepslong = [
  { t: "Free Counselling", d: "A one-to-one call to understand your goals, qualifications and budget.", icon:MdWifiCalling }, { t: "Eligibility Check", d: "We review your documents and tell you honestly which options fit - and which don't.", icon: IoDocumentsSharp, },
  { t: "Preparation", d: "Applications, exam training, interview prep and paperwork, handled step by step.", icon:FaUserTie }, { t: "Admission or Offer", d: "We stay with you through joining - and after, if you need us.", icon:FaPlaneCircleCheck },
];
export const why = [
  { t: "Honest advice", d: "We tell you what really fits you." },
  { t: "Licensed partners", d: "Safe, legal jobs only." },
  { t: "No hidden fees", d: "Everything clear upfront." },
  { t: "Always reachable", d: "One person, on WhatsApp." },
  { t: "Here after you fly", d: "We stay in touch." },
];
export const faqs = [
  { q: "Is the first call free?", a: "Yes." },
  { q: "Do I need Prometric?", a: "For most healthcare jobs, yes. We'll tell you which exam." },
  { q: "How long does it take?", a: "Usually a few months. We'll give you a clear timeline." },
  { q: "Do you help male nurses?", a: "Yes, there are lots of openings." },
];
