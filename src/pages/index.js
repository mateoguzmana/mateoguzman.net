"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = require("react");
var clsx_1 = require("clsx");
var Link_1 = require("@docusaurus/Link");
var useDocusaurusContext_1 = require("@docusaurus/useDocusaurusContext");
var Layout_1 = require("@theme/Layout");
var HomepageFeatures_1 = require("@site/src/components/HomepageFeatures");
var index_module_css_1 = require("./index.module.css");
function HomepageHeader() {
    var siteConfig = (0, useDocusaurusContext_1.default)().siteConfig;
    return (<header className={(0, clsx_1.default)(index_module_css_1.default.heroBannerCustom)}>
      <div className="container">
        <div className={index_module_css_1.default.heroInner}>
          <div className={index_module_css_1.default.heroImage}>
            <img src="https://github.com/mateoguzmana.png" alt="Mateo Guzmán" className={index_module_css_1.default.profileImage}/>
          </div>
          <div className={index_module_css_1.default.heroText}>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <Link_1.default className={(0, clsx_1.default)("button", index_module_css_1.default.ctaButton)} to="/docs/intro">
              <span>👋 Get to know me</span>
            </Link_1.default>
          </div>
        </div>
      </div>
    </header>);
}
function Home() {
    var siteConfig = (0, useDocusaurusContext_1.default)().siteConfig;
    return (<Layout_1.default title={"Welcome"} description="Mateo Guzmán personal site <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures_1.default />
      </main>
    </Layout_1.default>);
}
