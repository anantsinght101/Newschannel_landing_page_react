// Bilingual Data Store for News Yatra Platform

export const navLinks = [
  { to: "/latest", label: { mr: "ताज्या बातम्या", en: "Latest News" } },
  { to: "/maharashtra", label: { mr: "महाराष्ट्र", en: "Maharashtra" } },
  { to: "/politics", label: { mr: "राजकारण", en: "Politics" } },
  { to: "/sports", label: { mr: "क्रीडा", en: "Sports" } },
  { to: "/entertainment", label: { mr: "मनोरंजन", en: "Entertainment" } },
  { to: "/business", label: { mr: "व्यवसाय", en: "Business" } },
  { to: "/tech", label: { mr: "तंत्रज्ञान", en: "Technology" } },
  { to: "/agriculture", label: { mr: "कृषी", en: "Agriculture" } },
  { to: "/interviews", label: { mr: "संवाद", en: "Interviews" } },
  { to: "/others", label: { mr: "इतर", en: "Others" } },
  { to: "/special", label: { mr: "विशेष", en: "Special" } },
  { to: "/global", label: { mr: "ग्लोबल", en: "Global" } },
];

export const utilityLinks = [
  { to: "/about", label: { mr: "आमच्याबद्दल", en: "About Us" } },
  { to: "/contact", label: { mr: "संपर्क", en: "Contact" } },
  // { to: "/epaper", label: { mr: "ई-पेपर", en: "E-Paper" } },
  { to: "/admin/login", label: { mr: "अ‍ॅडमिन लॉगिन", en: "Admin Login" } },
];

export const topBarSocialLinks = [
  { label: "Instagram", to: "https://instagram.com/newsyatra2025", icon: "icon-social-instagram" },
  { label: "YouTube", to: "https://www.youtube.com/@NewsYatraS", icon: "icon-social-youtube" },
  { label: "WhatsApp", to: "https://wa.me/919764444001", icon: "icon-social-whatsapp" },
  { label: "Facebook", to: "https://facebook.com/share/15xr17qULk", icon: "icon-social-facebook" },
  { label: "Gmail", to: "https://mail.google.com/mail/?view=cm&fs=1&to=newsyatra01@gmail.com", icon: "icon-social-gmail" },
];

export const contactDetails = {
  phone: "9764444001",
  phoneFormatted: "+91 9764444001",
  whatsapp: "https://wa.me/919764444001",
  email: "newsyatra01@gmail.com",
  gmailWeb: "https://mail.google.com/mail/?view=cm&fs=1&to=newsyatra01@gmail.com",
  instagram: "https://instagram.com/newsyatra2025",
  facebook: "https://facebook.com/share/15xr17qULk",
  youtube: "https://www.youtube.com/@NewsYatraS",
};

export const breakingNews = {
  mr: [],
  en: [],
};

export const heroContent = {
  mr: {
    eyebrow: "विशेष वृत्तांत",
    title: "न्यूज यात्रा — ठाम परखड शोधयात्रा",
    subtitle: "संजय वरकड यांच्यासोबत निष्पक्ष आणि निडर पत्रकारिता",
    readMore: "सविस्तर पाहा →",
  },
  en: {
    eyebrow: "SPECIAL REPORT",
    title: "News Yatra — Bold & Fearless Journalism",
    subtitle: "Independent and trusted news coverage with Sanjay Warkad",
    readMore: "Watch Full Coverage →",
  },
};

export const sectionTitles = {
  gridTitle: {
    mr: "महत्त्वाच्या बातम्या",
    en: "TOP STORIES",
  },
  liveBadge: {
    mr: "थेट प्रक्षेपण",
    en: "LIVE",
  },
  readMoreCTA: {
    mr: "वाचा अधिक",
    en: "Read More",
  },
  tickerLabel: {
    mr: "ताजी बातमी",
    en: "BREAKING NEWS",
  },
};

export const articles = [];

export const footerGroups = [
  {
    heading: { mr: "विभाग", en: "Categories" },
    links: [
      { label: { mr: "महाराष्ट्र", en: "Maharashtra" }, to: "/maharashtra" },
      { label: { mr: "राजकारण", en: "Politics" }, to: "/politics" },
      { label: { mr: "क्रीडा", en: "Sports" }, to: "/sports" },
      { label: { mr: "मनोरंजन", en: "Entertainment" }, to: "/entertainment" },
    ],
  },
  {
    heading: { mr: "खास विशेष", en: "Special Features" },
    links: [
      { label: { mr: "विशेष मुलाखती", en: "Exclusive Interviews" }, to: "/interviews" },
      { label: { mr: "शोधात्मक पत्रकारिता", en: "Investigative Reports" }, to: "/special" },
      { label: { mr: "इतर बातम्या", en: "Others" }, to: "/others" },
    ],
  },
  {
    heading: { mr: "माहिती", en: "Company" },
    links: [
      { label: { mr: "आमच्याबद्दल", en: "About Us" }, to: "/about" },
      { label: { mr: "संपर्क साधा", en: "Contact Us" }, to: "/contact" },
      { label: { mr: "जाहिरात करा", en: "Advertise With Us" }, to: "/advertise" },
      { label: { mr: "गोपनीयता धोरण", en: "Privacy Policy" }, to: "/privacy" },
    ],
  },
  {
    heading: { mr: "सेवा", en: "Services" },
    links: [
      // { label: { mr: "ई-पेपर", en: "Digital E-Paper" }, to: "/epaper" },
      { label: { mr: "लाइव्ह टीव्ही", en: "Live TV Stream" }, to: "/livetv" },
      { label: { mr: "न्यूजलेटर", en: "Newsletter" }, to: "/newsletter" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", to: "https://instagram.com/newsyatra2025", icon: "icon-social-instagram" },
  { label: "YouTube", to: "https://www.youtube.com/@NewsYatraS", icon: "icon-social-youtube" },
  { label: "WhatsApp", to: "https://wa.me/919764444001", icon: "icon-social-whatsapp" },
  { label: "Facebook", to: "https://facebook.com/share/15xr17qULk", icon: "icon-social-facebook" },
  { label: "Gmail", to: "https://mail.google.com/mail/?view=cm&fs=1&to=newsyatra01@gmail.com", icon: "icon-social-gmail" },
];

export const uploadNewsModal = {
  buttonText: {
    mr: "बातमी अपलोड करा +",
    en: "Upload News Article +",
  },
  modalTitle: {
    mr: "नवीन बातमी अपलोड करा",
    en: "Upload New Article",
  },
  headlineLabel: {
    mr: "बातमीचे शीर्षक (Headline)",
    en: "Article Headline",
  },
  headlinePlaceholder: {
    mr: "येथे मुख्य बातमीचे शीर्षक लिहा...",
    en: "Enter news headline here...",
  },
  textLabel: {
    mr: "बातमीचा मजकूर (Article Content)",
    en: "Article Content / Story",
  },
  textPlaceholder: {
    mr: "येथे बातमीचा संपूर्ण मजकूर लिहा...",
    en: "Write the full story / article content here...",
  },
  mediaLabel: {
    mr: "फोटो / व्हिडिओ अपलोड करा (जास्तीत जास्त ५ फायली)",
    en: "Upload Images / Videos (Max 5 Files)",
  },
  mediaHint: {
    mr: "तुम्ही जास्तीत जास्त ५ फोटो किंवा व्हिडिओ निवडून अपलोड करू शकता.",
    en: "You can upload up to 5 images or video files.",
  },
  submitBtn: {
    mr: "बातमी सबमिट करा",
    en: "Submit Article",
  },
  cancelBtn: {
    mr: "रद्द करा",
    en: "Cancel",
  },
  fileLimitAlert: {
    mr: "कृपया जास्तीत जास्त ५ फायलीच निवडा.",
    en: "Please select a maximum of 5 files.",
  },
  categoryLabel: {
    mr: "विभाग / श्रेणी निवडा (Category)",
    en: "Select Category",
  },
  categoryPlaceholder: {
    mr: "-- विभाग निवडा --",
    en: "-- Select Category --",
  },
  categoriesList: [
    { value: "maharashtra", label: { mr: "महाराष्ट्र", en: "Maharashtra" } },
    { value: "politics", label: { mr: "राजकारण", en: "Politics" } },
    { value: "sports", label: { mr: "क्रीडा", en: "Sports" } },
    { value: "entertainment", label: { mr: "मनोरंजन", en: "Entertainment" } },
    { value: "business", label: { mr: "व्यवसाय", en: "Business" } },
    { value: "tech", label: { mr: "तंत्रज्ञान", en: "Technology" } },
    { value: "agriculture", label: { mr: "कृषी", en: "Agriculture" } },
    { value: "special", label: { mr: "विशेष", en: "Special Reports" } },
  ],
  successMessage: {
    mr: "बातमी यशस्वीरीत्या सबमिट झाली आहे!",
    en: "Article successfully submitted!",
  },
};

