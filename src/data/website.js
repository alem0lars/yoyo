const website = {
  url: "https://cyberloop.it",
  lang: "it-IT",
  initialConsoleLog: `
  This is the Cyberloop Official Website.

  Following Secure-by-Design principle, the website has been made completely static.
  This also means you can read the entire source of the website, of course we do NOT believe in Security-through-Obscurity.
  The server-side attack surface should be only limited to the webserver exposing the assets, which is btw hosted by Github.
  The client-side attack surface should be none, hence it doesn't accept any user input/parameter.

  However, if you find any code vulnerability, contact us at info@cyberloop.it for a €-reward and a job offering :)

  %c  🔧 with ❤️ by Cyberloop  `,
  mainBar: {
    items: [
      {
        title: "Home",
        namespace: "homepage",
        href: "homepage.pug",
      },
      {
        title: "Approccio",
        namespace: "approach",
        href: "approach.pug",
      },
      {
        title: "Chi siamo",
        namespace: "about",
        href: "about.pug",
      },
      {
        title: "Contatti",
        namespace: "contact",
        href: "contact.pug",
      },
    ],
  },
};

module.exports = website;
