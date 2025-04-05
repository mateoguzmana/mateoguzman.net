import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBannerCustom)}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroImage}>
            <img
              src="https://github.com/mateoguzmana.png"
              alt="Mateo Guzmán"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.heroText}>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <Link className={clsx("button", styles.ctaButton)} to="/docs/intro">
              <span>👋 Get to know me</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Welcome`} description="Mateo Guzmán personal site <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
