export default {
  target: "static",

  head: {
    title: "AIRP Thing",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/tailwind.css"],
  components: true,

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  generate: {
    fallback: "404.html",
  },

  compatibilityDate: "2025-03-16",
};
