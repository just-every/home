import { runOne } from '@/content/landing';

import styles from './panels.module.css';
import { installedRunCommand } from './runCommand';

/** The no-npm route: the installer script, then the same start command. */
export function AltLine({
  target,
  className,
}: {
  target: string;
  className?: string;
}) {
  return (
    <p className={className ?? styles.altLine}>
      {runOne.altLine.before} <code>{runOne.altLine.command}</code>{' '}
      {runOne.altLine.after} <code>{installedRunCommand(target)}</code>.
    </p>
  );
}
