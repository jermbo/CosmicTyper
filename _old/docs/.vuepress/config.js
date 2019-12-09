module.exports = {
  base: "/CosmicTyper/",
  title: "Cosmic Typer Documentation",
  description: "Practice typing and learn by doing.",
  themeConfig: {
    sidebar: {
      "/get-started/": ["", "API", "how-to-use"]
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/get-started/" },
      {
        text: "GitHub",
        items: [
          { text: "Project Page", link: "https://github.com/jermbo/CosmicTyper" },
          { text: "Issue Tracker", link: "https://github.com/jermbo/CosmicTyper/issues" },
          { text: "Contributors", link: "https://github.com/jermbo/CosmicTyper/graphs/contributors" }
        ]
      }
    ]
  }
};
