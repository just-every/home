import cli from '@/data/rer-cli.generated.json';

/** The one command that clones a product and starts it. */
export const runCommand = (target: string) =>
  cli.devCommand.replace('owner/repo', target);

/** After the installer, use the same template through its package executable. */
export const installedRunCommand = (target: string) =>
  runCommand(target).replace(
    `npx -y ${cli.package}`,
    cli.package.split('/')[1]
  );
