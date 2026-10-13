import { Collection } from './Collection';
import { Hero } from './Hero';
import { Makers } from './Makers';
import { Questions } from './Questions';
import { ReelsSection } from './ReelsSection';
import { RunOne } from './RunOne';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { Stand } from './Stand';
import standRun from './StandRun.module.css';
import ui from './running.module.css';

/** The Running direction: a dense wall of the real apps, then the proof. */
export function RunningPage() {
  return (
    <div id="top" className={ui.root}>
      <div className={ui.page}>
        <SiteHeader />
        <main>
          <Hero />
          <ReelsSection />
          <Collection />
          <Questions />
          <div className={standRun.row}>
            <Stand />
            <RunOne />
          </div>
          <Makers />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
