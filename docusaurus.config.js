// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Mateo Guzmán",
  tagline: "I have fun coding",
  url: "https://mateoguzman.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/mateoguzmana/mateoguzman.net/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/mateoguzmana/mateoguzman.net/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Mateo Guzmán",
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/myself.jpeg',
        // },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "About me",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/mateoguzmana",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Get to know me",
            items: [
              {
                label: "About me",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Social Media",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/users/5415299/mateo-guzm%c3%a1n",
              },
              {
                label: "Medium",
                href: "https://mateoguzmana.medium.com/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/MateoGuzmanA",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/mateoguzmana",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mateo Guzmán. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
