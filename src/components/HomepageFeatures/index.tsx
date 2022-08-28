import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Support Me",
    description: (
      <>
        Give me a star on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mateoguzmana"
        >
          GitHub
        </a>
        .
      </>
    ),
  },
  {
    title: "About Me",
    description: (
      <>
        Having fun with <code>React Native</code>.
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
          href="https://twitter.com/MateoGuzmanA"
        >
          Twitter
        </a>
        .
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
