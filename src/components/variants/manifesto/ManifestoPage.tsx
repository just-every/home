import { Collection } from './Collection';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Makers } from './Makers';
import m from './manifesto.module.css';
import { Nav } from './Nav';
import { Principles } from './Principles';
import { Questions } from './Questions';
import { Running } from './Running';

/** The Manifesto direction: editorial, type-led, with crisp index lists. */
export function ManifestoPage() {
  return (
    <div id="top" className={m.root}>
      <Nav />
      <main>
        <Hero />
        <Running />
        <Collection />
        <Questions />
        <Principles />
        <Makers />
      </main>
      <Footer />
    </div>
  );
}
