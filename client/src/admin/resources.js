// ========================================
// CONTENT RESOURCES
// ========================================
// Each entry drives a generic list page and form page.
//
// field types: text | slug | textarea | longtext | image | url |
//              email | number | toggle | tags | date | select
// ========================================

const publishFields = [
  {
    name: "isPublished",
    label: "Published",
    type: "toggle",
    help: "Visible on the public website.",
    section: "status",
  },
  {
    name: "isFeatured",
    label: "Featured",
    type: "toggle",
    help: "Highlight on the website where supported.",
    section: "status",
  },
];

export const RESOURCES = {
  blogs: {
    key: "blogs",
    api: "blog",
    icon: "blog",
    label: "Blog Posts",
    singular: "Blog Post",
    description: "Write, publish and manage articles for the Indilens blog.",
    titleField: "title",
    subtitleField: "slug",
    searchFields: ["title", "slug", "category", "author"],
    columns: [
      { name: "category", label: "Category" },
      { name: "author", label: "Author" },
    ],
    dateField: "createdAt",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 160 },
      { name: "slug", label: "URL Slug", type: "slug", from: "title", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true, maxLength: 300, help: "Short summary shown in blog listings." },
      { name: "content", label: "Content", type: "longtext", required: true },
      { name: "featuredImage", label: "Featured Image URL", type: "image", section: "media" },
      { name: "category", label: "Category", type: "text", default: "General", section: "meta" },
      { name: "author", label: "Author", type: "text", default: "Indilens", section: "meta" },
      { name: "isPublished", label: "Published", type: "toggle", help: "Visible on the public website.", section: "status" },
    ],
  },

  services: {
    key: "services",
    api: "services",
    icon: "layers",
    label: "Services",
    singular: "Service",
    description: "Manage the services Indilens offers.",
    titleField: "title",
    subtitleField: "slug",
    searchFields: ["title", "slug", "category"],
    columns: [
      { name: "category", label: "Category" },
      { name: "displayOrder", label: "Order" },
    ],
    dateField: "createdAt",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 120 },
      { name: "slug", label: "URL Slug", type: "slug", from: "title", required: true },
      { name: "excerpt", label: "Short Description", type: "textarea", required: true, maxLength: 300 },
      { name: "description", label: "Full Description", type: "longtext", required: true },
      { name: "featuredImage", label: "Featured Image URL", type: "image", section: "media" },
      { name: "icon", label: "Icon", type: "text", help: "Emoji or icon name.", section: "meta" },
      { name: "category", label: "Category", type: "text", default: "Technology", section: "meta" },
      { name: "displayOrder", label: "Display Order", type: "number", default: 0, help: "Lower numbers appear first.", section: "meta" },
      ...publishFields,
    ],
  },

  portfolio: {
    key: "portfolio",
    api: "portfolio",
    icon: "briefcase",
    label: "Portfolio",
    singular: "Project",
    description: "Showcase client projects and case studies.",
    titleField: "title",
    subtitleField: "clientName",
    searchFields: ["title", "slug", "category", "clientName"],
    columns: [
      { name: "category", label: "Category" },
      { name: "technologies", label: "Technologies", format: (value) => (value || []).slice(0, 3).join(", ") || "—" },
    ],
    dateField: "createdAt",
    fields: [
      { name: "title", label: "Project Title", type: "text", required: true, maxLength: 140 },
      { name: "slug", label: "URL Slug", type: "slug", from: "title", required: true },
      { name: "excerpt", label: "Summary", type: "textarea", required: true, maxLength: 300 },
      { name: "description", label: "Case Study / Description", type: "longtext", required: true },
      { name: "featuredImage", label: "Cover Image URL", type: "image", section: "media" },
      { name: "clientName", label: "Client", type: "text", section: "meta" },
      { name: "category", label: "Category", type: "text", default: "Web Development", section: "meta" },
      { name: "technologies", label: "Technologies", type: "tags", help: "Separate with commas.", section: "meta" },
      { name: "liveUrl", label: "Live URL", type: "url", section: "meta" },
      { name: "githubUrl", label: "Repository URL", type: "url", section: "meta" },
      ...publishFields,
    ],
  },

  faq: {
    key: "faq",
    api: "faq",
    icon: "help",
    label: "FAQs",
    singular: "FAQ",
    description: "Answer common questions from clients.",
    titleField: "question",
    subtitleField: "answer",
    searchFields: ["question", "answer", "category"],
    columns: [
      { name: "category", label: "Category" },
      { name: "displayOrder", label: "Order" },
    ],
    dateField: "createdAt",
    fields: [
      { name: "question", label: "Question", type: "text", required: true, maxLength: 250 },
      { name: "answer", label: "Answer", type: "longtext", required: true },
      { name: "category", label: "Category", type: "text", default: "General", section: "meta" },
      { name: "displayOrder", label: "Display Order", type: "number", default: 0, help: "Lower numbers appear first.", section: "meta" },
      ...publishFields,
    ],
  },

  team: {
    key: "team",
    api: "team",
    icon: "users",
    label: "Team",
    singular: "Team Member",
    description: "Manage the people shown on the Team page.",
    titleField: "name",
    subtitleField: "role",
    imageField: "profileImage",
    searchFields: ["name", "role", "department", "email"],
    columns: [
      { name: "department", label: "Department" },
      { name: "displayOrder", label: "Order" },
    ],
    dateField: "createdAt",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true, maxLength: 100 },
      { name: "role", label: "Role / Designation", type: "text", required: true, maxLength: 100 },
      { name: "shortBio", label: "Short Bio", type: "textarea", maxLength: 300 },
      { name: "bio", label: "Full Bio", type: "longtext" },
      { name: "profileImage", label: "Profile Photo URL", type: "image", section: "media" },
      { name: "department", label: "Department", type: "text", default: "General", section: "meta" },
      { name: "email", label: "Email", type: "email", section: "meta" },
      { name: "linkedin", label: "LinkedIn URL", type: "url", section: "meta" },
      { name: "github", label: "GitHub URL", type: "url", section: "meta" },
      { name: "website", label: "Website", type: "url", section: "meta" },
      { name: "joinedAt", label: "Joined On", type: "date", section: "meta" },
      { name: "displayOrder", label: "Display Order", type: "number", default: 0, section: "meta" },
      ...publishFields,
    ],
  },
};

export const RESOURCE_LIST = Object.values(RESOURCES);
