/** Validate the public command template before it can reach a shell. */
export function validateRerCli(manifest) {
  const { schema, cli } = manifest ?? {};
  if (
    schema !== 'brand/v1' ||
    !cli ||
    typeof cli.package !== 'string' ||
    !/^@[a-z0-9-]+\/[a-z0-9-]+$/.test(cli.package) ||
    typeof cli.installUrl !== 'string' ||
    !/^https:\/\/[^\s'"`$;|<>]+$/.test(cli.installUrl) ||
    typeof cli.devCommand !== 'string' ||
    cli.devCommand !== `npx -y ${cli.package} dev owner/repo`
  ) {
    throw new Error(
      'RER brand: invalid brand/v1 cli package, HTTPS installUrl or devCommand template'
    );
  }
  const url = new URL(cli.installUrl);
  if (
    url.username ||
    url.password ||
    url.hash ||
    url.search ||
    !/^\/[A-Za-z0-9._/-]+$/.test(url.pathname)
  )
    throw new Error('RER brand: invalid installUrl');
  return {
    package: cli.package,
    installUrl: cli.installUrl,
    devCommand: cli.devCommand,
  };
}
