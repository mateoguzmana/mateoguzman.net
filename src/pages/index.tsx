import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function ProfileImage() {
  return (
    <div className={styles.profileImageWrapper}>
      <div aria-hidden="true" className={styles.profileSkeleton} />
      <img
        src="https://github.com/mateoguzmana.png"
        alt="Mateo Guzmán"
        width={220}
        height={220}
        loading="eager"
        decoding="async"
        className={styles.profileImage}
      />
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBannerCustom}>
      <div aria-hidden="true" className={styles.starfield} />
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroImage}>
            <ProfileImage />
          </div>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Mobile engineering · React Native</p>
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.heroRole}>
              Senior mobile engineer · React Native core contributor
            </p>
            <p className={styles.heroPitch}>
              I work at the edges of React Native — bundle size, native modules,
              performance, migrations — and write about what I learn along the way.
            </p>
            <div className={styles.ctaRow}>
              <Link
                className={styles.ctaPrimary}
                to="/blog/cutting-react-native-bundle-size"
              >
                Read the deep dive
                <span aria-hidden="true" className={styles.ctaArrow}>
                  →
                </span>
              </Link>
              <a
                className={styles.ctaSecondary}
                href="mailto:info@mateoguzmana.net"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Mateo Guzmán — React Native consultant"
      description={siteConfig.tagline}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
