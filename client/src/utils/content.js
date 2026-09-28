// ========================================
// CONTENT HELPERS FOR CMS DATA
// ========================================

export const formatPostDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const readingTime = (text = "") => {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

// Splits plain-text content into paragraphs. Content is rendered as
// text (never as HTML), so admin input cannot inject markup.
export const toParagraphs = (text = "") =>
  String(text)
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}|\n(?=\s*[-•*]\s)/)
    .map((block) => block.trim())
    .filter(Boolean);

// Short headings written on their own line ("Why it matters") render as
// sub-headings inside an article.
export const isHeadingBlock = (block) =>
  !block.includes("\n") && block.length <= 80 && !/[.!?,:;]$/.test(block);

// CMS items first, then built-in items whose key is not already present
export const mergeUnique = (primary = [], fallback = [], key = "title") => {
  const seen = new Set(primary.map((item) => String(item[key]).trim().toLowerCase()));
  return [...primary, ...fallback.filter((item) => !seen.has(String(item[key]).trim().toLowerCase()))];
};

export const padNumber = (index) => String(index + 1).padStart(2, "0");
