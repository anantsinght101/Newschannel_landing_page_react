import { navLinks } from "../siteData";

export const categoryTranslationMap = {
  categories: { mr: "सर्व विभाग", en: "All Categories" },
  latest: { mr: "ताज्या बातम्या", en: "Latest" },
  maharashtra: { mr: "महाराष्ट्र", en: "Maharashtra" },
  politics: { mr: "राजकारण", en: "Politics" },
  sports: { mr: "क्रीडा", en: "Sports" },
  entertainment: { mr: "मनोरंजन", en: "Entertainment" },
  business: { mr: "व्यवसाय", en: "Business" },
  tech: { mr: "तंत्रज्ञान", en: "Tech" },
  agriculture: { mr: "कृषी", en: "Agriculture" },
  interviews: { mr: "संवाद", en: "Interviews" },
  videos: { mr: "व्हिडिओ", en: "Videos" },
  special: { mr: "विशेष", en: "Special" },
  global: { mr: "ग्लोबल", en: "Global" },
  others: { mr: "इतर", en: "Others" },
};

// Map Marathi names back to slugs
export const marathiToSlugMap = {
  "सर्व विभाग": "categories",
  "ताज्या बातम्या": "latest",
  "महाराष्ट्र": "maharashtra",
  "राजकारण": "politics",
  "क्रीडा": "sports",
  "मनोरंजन": "entertainment",
  "व्यवसाय": "business",
  "तंत्रज्ञान": "tech",
  "कृषी": "agriculture",
  "संवाद": "interviews",
  "व्हिडिओ": "videos",
  "विशेष": "special",
  "ग्लोबल": "global",
  "इतर": "others",
};

/**
 * Get category label in active language.
 * Unmapped/unknown category names or slugs automatically map to "इतर / Others".
 */
export function getCategoryLabel(categoryKeyOrSlugOrName, lang = "mr") {
  if (!categoryKeyOrSlugOrName) {
    return categoryTranslationMap.others[lang];
  }

  const keyLower = String(categoryKeyOrSlugOrName).toLowerCase().replace("/", "");

  // 1. Direct slug match
  if (categoryTranslationMap[keyLower]) {
    return categoryTranslationMap[keyLower][lang] || categoryTranslationMap[keyLower].mr;
  }

  // 2. Check if input is a Marathi name
  if (marathiToSlugMap[categoryKeyOrSlugOrName]) {
    const slug = marathiToSlugMap[categoryKeyOrSlugOrName];
    return categoryTranslationMap[slug][lang] || categoryKeyOrSlugOrName;
  }

  // 3. Match against navLinks
  const navItem = navLinks.find(
    (nl) =>
      nl.to === `/${keyLower}` ||
      nl.to.replace("/", "") === keyLower ||
      nl.label.mr === categoryKeyOrSlugOrName ||
      nl.label.en === categoryKeyOrSlugOrName
  );

  if (navItem) {
    return navItem.label[lang] || navItem.label.mr;
  }

  // Fallback to "इतर / Others" for any unmapped category
  return categoryTranslationMap.others[lang];
}
