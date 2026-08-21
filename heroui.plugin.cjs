// Tailwind 4's `@plugin` directive imports a default export, but HeroUI 2
// ships a plugin factory that must be invoked. Bridge the two.
const { heroui } = require("@heroui/react");

module.exports = heroui();
