/** The one command that clones a product and starts it. */
export const runCommand = (target: string) =>
  `npx -y @runeditrun/rer dev ${target}`;
