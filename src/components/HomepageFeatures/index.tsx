import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  body: React.JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "What I work on",
    body: (
      <ul className={styles.list}>
        <li>Bundle size and cold-start performance</li>
        <li>Native modules in Kotlin, Swift, and C++ via JSI</li>
        <li>React Native version upgrades and migrations</li>
        <li>Hermes profiling, on-device caching, asset pipelines</li>
        <li>The long-tail problems that don't have a Stack Overflow answer</li>
      </ul>
    ),
  },
  {
    title: "Selected work",
    body: (
      <ul className={styles.list}>
        <li>
          <a
            href="https://github.com/facebook/react-native/pulls?q=author%3Amateoguzmana"
            target="_blank"
            rel="noopener noreferrer"
          >
            facebook/react-native
          </a>
          {" "}— core contributor (Image caching, Kotlin migration, smaller things)
        </li>
        <li>
          <a
            href="https://github.com/mateoguzmana/react-native-lz4"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-native-lz4
          </a>
          {" "}— C++ compression bindings via JSI
        </li>
        <li>
          <a
            href="https://mateoguzmana.github.io/react-native-fiesta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-native-fiesta
          </a>
          {" "}— celebration animations on Skia
        </li>
        <li>
          <Link to="/blog/cutting-react-native-bundle-size">
            Cutting ~7 MB off a React Native bundle
          </Link>
          {" "}— deep dive
        </li>
        <li>
          <a
            href="https://xplorerapp.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xplorer
          </a>
          {" "}— planetary-exploration app with AI-generated textures
        </li>
      </ul>
    ),
  },
  {
    title: "Get in touch",
    body: (
      <>
        <p className={styles.contactLead}>
          If anything here resonates — a problem you're stuck on, a topic
          you'd like to compare notes on — feel free to drop a line.
        </p>
        <ul className={styles.contactList}>
          <li>
            <a href="mailto:info@mateoguzmana.net">
              info@mateoguzmana.net
            </a>
          </li>
          <li>
            <a
              href="https://x.com/MateoGuzmanA"
              target="_blank"
              rel="noopener noreferrer"
            >
              @MateoGuzmanA on X
            </a>
          </li>
          <li>
            <a
              href="https://stackoverflow.com/users/5415299/mateo-guzm%c3%a1n"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stack Overflow
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mateoguzmana"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/mateoguzmana
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

function Feature({ title, body }: FeatureItem) {
  return (
    <div className={clsx("col col--4", styles.col)}>
      <article className={styles.card}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.cardBody}>{body}</div>
      </article>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
