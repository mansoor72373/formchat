export const publicFormPath = (slug: string) => `/f/${slug}`;

export const embedSnippet = (origin: string, slug: string) =>
  `<script src="${origin}/widget.js" data-form="${slug}" async></script>`;
