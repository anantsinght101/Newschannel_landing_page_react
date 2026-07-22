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
  { to: "/videos", label: { mr: "व्हिडिओ", en: "Videos" } },
  { to: "/special", label: { mr: "विशेष", en: "Special" } },
];

export const utilityLinks = [
  { to: "/about", label: { mr: "आमच्याबद्दल", en: "About Us" } },
  { to: "/contact", label: { mr: "संपर्क", en: "Contact" } },
  { to: "/epaper", label: { mr: "ई-पेपर", en: "E-Paper" } },
];

export const topBarSocialLinks = [
  { label: "Facebook", to: "https://facebook.com", icon: "icon-social-facebook" },
  { label: "Twitter", to: "https://twitter.com", icon: "icon-social-twitter" },
  { label: "YouTube", to: "https://youtube.com", icon: "icon-social-youtube" },
  { label: "Instagram", to: "https://instagram.com", icon: "icon-social-instagram" },
  { label: "WhatsApp", to: "https://whatsapp.com", icon: "icon-social-whatsapp" },
  { label: "Newsfeed", to: "https://news.google.com", icon: "icon-social-newsfeed" },
];

export const breakingNews = {
  mr: [
    "न्यूज यात्रा विशेष: महाराष्ट्र राजकारणातील ताज्या घडामोडींचे थेट अपडेट्स",
    "हवामान इशारा: पुढील २४ तासांत कोकण आणि मध्य महाराष्ट्रात मुसळधार पावसाची शक्यता",
    "क्रीडा वृत्त: भारतीय क्रिकेट संघाचा ऐतिहासिक विजय; चाहत्यांचा जल्लोष",
    "शेतीविषयक: शेतकऱ्यांसाठी शासनाची नवीन योजना जाहीर; वाचा सविस्तर",
  ],
  en: [
    "News Yatra Live: Special coverage on latest political developments",
    "Weather Alert: Heavy rainfall predicted across Konkan and Central Maharashtra",
    "Sports Update: Team India achieves historic victory; fans celebrate",
    "Agri News: Government announces new welfare policy for farmers",
  ],
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

export const articles = [
  {
    id: "article-1",
    category: { mr: "राजकारण", en: "Politics" },
    title: {
      mr: "राज्यातील आगामी निवडणुकांबाबत महत्त्वाचा निर्णय; राजकीय वर्तुळात मोठी चर्चा",
      en: "Key decision announced regarding upcoming state elections",
    },
    excerpt: {
      mr: "निवडणूक आयोगाच्या बैठकीत महत्त्वाच्या विषयांवर सविस्तर चर्चा; सर्व पक्षांची लक्षवेधी प्रतिक्रिया.",
      en: "Election commission meets to finalize key guidelines ahead of upcoming state polls.",
    },
    image: "article-thumbnail-1",
    to: "/article-1",
  },
  {
    id: "article-2",
    category: { mr: "महाराष्ट्र", en: "State" },
    title: {
      mr: "राज्यात नवीन पायाभूत सुविधा प्रकल्पांना गती; कोट्यवधींच्या निधीला मंजुरी",
      en: "Infrastructure push: Major funding approved for new state transit projects",
    },
    excerpt: {
      mr: "वाहतूक व्यवस्था सुधारण्यासाठी आणि रोजगाराच्या संधी वाढवण्यासाठी महत्त्वपूर्ण निर्णय.",
      en: "Government approves multi-crore investment for highway and regional transit networks.",
    },
    image: "article-thumbnail-2",
    to: "/article-2",
  },
  {
    id: "article-3",
    category: { mr: "कृषी", en: "Agriculture" },
    title: {
      mr: "बळीराजासाठी दिलासादायक बातमी; पिकांच्या हमीभावात मोठी वाढ जाहीर",
      en: "Relief for farmers as government increases minimum support price for crops",
    },
    excerpt: {
      mr: "शेतकऱ्यांचे उत्पन्न वाढवण्यासाठी केंद्राचा मोठा निर्णय; राज्यातील शेतकऱ्यांकडून स्वागत.",
      en: "New support price policy aims to boost rural economy and safeguard crop yields.",
    },
    image: "article-thumbnail-3",
    to: "/article-3",
  },
  {
    id: "article-4",
    category: { mr: "क्रीडा", en: "Sports" },
    title: {
      mr: "भारतीय संघाचा शानदार विजय; मालिका जिंकून रचला नवा ऐतिहासिक विक्रम",
      en: "Team India clinches thrilling victory to seal international championship title",
    },
    excerpt: {
      mr: "उत्कृष्ट फलंदाजी आणि भेदक गोलंदाजीच्या जोरावर विरोधी संघाचा पूर्ण धुव्वा.",
      en: "Outstanding team performance leads to memorable series triumph on foreign soil.",
    },
    image: "article-thumbnail-4",
    to: "/article-4",
  },
  {
    id: "article-5",
    category: { mr: "तंत्रज्ञान", en: "Technology" },
    title: {
      mr: "डिजिटल युगात सायबर सुरक्षेचे महत्त्व; नागरिकांसाठी महत्त्वाच्या टिप्स",
      en: "Cybersecurity awareness: Essential safety guidelines for digital payment users",
    },
    excerpt: {
      mr: "ऑनलाइन फसवणुकीपासून स्वतःचे संरक्षण करण्यासाठी या सोप्या नियमांचे पालन करा.",
      en: "Experts share vital advice on protecting personal data and online transactions.",
    },
    image: "article-thumbnail-5",
    to: "/article-5",
  },
  {
    id: "article-6",
    category: { mr: "मनोरंजन", en: "Entertainment" },
    title: {
      mr: "मराठी चित्रपटसृष्टीत नवीन पर्वाची सुरुवात; प्रेक्षकांचा उत्स्फूर्त प्रतिसाद",
      en: "New era in Marathi cinema as latest release receives overwhelming box office response",
    },
    excerpt: {
      mr: "दमदार कथानक आणि उत्कृष्ट अभिनयाने रसिकांची मने जिंकली; चित्रपटगृहे हाऊसफुल्ल.",
      en: "Box office success highlights strong storytelling and powerful performances.",
    },
    image: "article-thumbnail-6",
    to: "/article-6",
  },
];

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
      { label: { mr: "व्हिडिओ बातम्या", en: "Video Coverage" }, to: "/videos" },
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
      { label: { mr: "ई-पेपर", en: "Digital E-Paper" }, to: "/epaper" },
      { label: { mr: "लाइव्ह टीव्ही", en: "Live TV Stream" }, to: "/livetv" },
      { label: { mr: "न्यूजलेटर", en: "Newsletter" }, to: "/newsletter" },
    ],
  },
];

export const socialLinks = [
  { label: "Facebook", to: "https://facebook.com", icon: "icon-social-facebook" },
  { label: "Twitter", to: "https://twitter.com", icon: "icon-social-twitter" },
  { label: "Instagram", to: "https://instagram.com", icon: "icon-social-instagram" },
  { label: "YouTube", to: "https://youtube.com", icon: "icon-social-youtube" },
];
