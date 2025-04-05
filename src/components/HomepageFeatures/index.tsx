import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Where to find me",
    description: (
      <>
        You can start by following me on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mateoguzmana"
        >
          GitHub
        </a>
        , the interesting things happen in there.
      </>
    ),
  },
  {
    title: "Why this website?",
    description: (
      <>
        I built this with Docusaurus because I was simply too lazy to build
        something more fancy.
      </>
    ),
  },
  {
    title: "Contact Me",
    description: (
      <>
        Drop a message on my{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://x.com/MateoGuzmanA"
        >
          X
        </a>
        {", or reach out to "}
        <a href="mailto:info@mateoguzmana.net">info@mateoguzmana.net</a>.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
