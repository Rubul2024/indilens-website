import { useEffect } from "react";

/*
========================================
INDILENS SEO COMPONENT
========================================

This component manages:

1. Page Title
2. Meta Description
3. Canonical URL
4. Robots Meta
5. Open Graph
6. Twitter/X Card
7. JSON-LD Structured Data

Usage:

<SEO
  title="Page Title | Indilens"
  description="Page description..."
  canonical="/about"
/>

========================================
*/

const SITE_NAME = "Indilens";

const SITE_URL = "https://indilens.com";

const DEFAULT_TITLE =
  "Indilens | Web Development, Software & Digital Solutions";

const DEFAULT_DESCRIPTION =
  "Indilens provides modern web development, custom software, digital solutions, SEO and digital marketing services for ambitious businesses.";

const DEFAULT_IMAGE =
  `${SITE_URL}/images/indilens-og-image.jpg`;


/*
========================================
HELPER: SET META TAG
========================================
*/

const setMetaTag = (attribute, key, content) => {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");

    element.setAttribute(attribute, key);

    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};


/*
========================================
HELPER: SET LINK TAG
========================================
*/

const setLinkTag = (rel, href) => {
  let element = document.head.querySelector(
    `link[rel="${rel}"]`
  );

  if (!element) {
    element = document.createElement("link");

    element.setAttribute("rel", rel);

    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};


/*
========================================
SEO COMPONENT
========================================
*/

const SEO = ({
  title = DEFAULT_TITLE,

  description = DEFAULT_DESCRIPTION,

  canonical,

  image = DEFAULT_IMAGE,

  type = "website",

  noIndex = false,

  schema = null,
}) => {

  useEffect(() => {

    /*
    ========================================
    FINAL VALUES
    ========================================
    */

    const finalTitle = title || DEFAULT_TITLE;

    const finalDescription =
      description || DEFAULT_DESCRIPTION;

    const finalCanonical =
      canonical
        ? canonical.startsWith("http")
          ? canonical
          : `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
        : window.location.href.split("#")[0];

    const finalImage =
      image.startsWith("http")
        ? image
        : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;


    /*
    ========================================
    1. PAGE TITLE
    ========================================
    */

    document.title = finalTitle;


    /*
    ========================================
    2. STANDARD META
    ========================================
    */

    setMetaTag(
      "name",
      "description",
      finalDescription
    );

    setMetaTag(
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow"
    );

    setMetaTag(
      "name",
      "googlebot",
      noIndex
        ? "noindex, nofollow"
        : "index, follow"
    );

    setMetaTag(
      "name",
      "theme-color",
      "#2563eb"
    );


    /*
    ========================================
    3. CANONICAL URL
    ========================================
    */

    setLinkTag(
      "canonical",
      finalCanonical
    );


    /*
    ========================================
    4. OPEN GRAPH
    ========================================
    */

    setMetaTag(
      "property",
      "og:type",
      type
    );

    setMetaTag(
      "property",
      "og:title",
      finalTitle
    );

    setMetaTag(
      "property",
      "og:description",
      finalDescription
    );

    setMetaTag(
      "property",
      "og:url",
      finalCanonical
    );

    setMetaTag(
      "property",
      "og:image",
      finalImage
    );

    setMetaTag(
      "property",
      "og:site_name",
      SITE_NAME
    );

    setMetaTag(
      "property",
      "og:locale",
      "en_IN"
    );


    /*
    ========================================
    5. TWITTER / X
    ========================================
    */

    setMetaTag(
      "name",
      "twitter:card",
      "summary_large_image"
    );

    setMetaTag(
      "name",
      "twitter:title",
      finalTitle
    );

    setMetaTag(
      "name",
      "twitter:description",
      finalDescription
    );

    setMetaTag(
      "name",
      "twitter:image",
      finalImage
    );


    /*
    ========================================
    6. STRUCTURED DATA
    ========================================
    */

    let schemaElement =
      document.head.querySelector(
        "#indilens-structured-data"
      );

    if (!schemaElement) {

      schemaElement =
        document.createElement("script");

      schemaElement.type =
        "application/ld+json";

      schemaElement.id =
        "indilens-structured-data";

      document.head.appendChild(
        schemaElement
      );
    }


    /*
    ========================================
    DEFAULT ORGANIZATION SCHEMA
    ========================================
    */

    const organizationSchema = {
      "@context": "https://schema.org",

      "@type": "Organization",

      name: "Indilens",

      url: SITE_URL,

      logo:
        `${SITE_URL}/images/indilens-logo.png`,

      description:
        DEFAULT_DESCRIPTION,

      email:
        "marketing@indilens.in",

      telephone:
        "+91-9954639509",
    };


    /*
    ========================================
    WEBSITE SCHEMA
    ========================================
    */

    const websiteSchema = {
      "@context": "https://schema.org",

      "@type": "WebSite",

      name: SITE_NAME,

      url: SITE_URL,
    };


    /*
    ========================================
    COMBINE SCHEMAS
    ========================================
    */

    let finalSchema;

    if (schema) {

      finalSchema = {
        "@context": "https://schema.org",

        "@graph": [
          organizationSchema,
          websiteSchema,
          schema,
        ],
      };

    } else {

      finalSchema = {
        "@context": "https://schema.org",

        "@graph": [
          organizationSchema,
          websiteSchema,
        ],
      };
    }


    /*
    ========================================
    ADD JSON-LD
    ========================================
    */

    schemaElement.textContent =
      JSON.stringify(finalSchema);


  }, [
    title,
    description,
    canonical,
    image,
    type,
    noIndex,
    schema,
  ]);


  /*
  ========================================
  SEO COMPONENT RENDERS NOTHING
  ========================================
  */

  return null;
};

export default SEO;