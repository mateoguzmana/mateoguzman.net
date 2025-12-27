"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomepageFeatures;
var react_1 = require("react");
var clsx_1 = require("clsx");
var styles_module_css_1 = require("./styles.module.css");
var FeatureList = [
    {
        title: "Where to find me",
        description: (<>
        You can start by following me on{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/mateoguzmana">
          GitHub
        </a>
        , the interesting things happen in there.
      </>),
    },
    {
        title: "Why this website?",
        description: (<>
        I built this with Docusaurus because I was simply too lazy to build
        something more fancy.
      </>),
    },
    {
        title: "Contact Me",
        description: (<>
        Drop a message on my{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://x.com/MateoGuzmanA">
          X
        </a>
        {", or reach out to "}
        <a href="mailto:info@mateoguzmana.net">info@mateoguzmana.net</a>.
      </>),
    },
];
function Feature(_a) {
    var title = _a.title, description = _a.description;
    return (<div className={(0, clsx_1.default)("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>);
}
function HomepageFeatures() {
    return (<section className={styles_module_css_1.default.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map(function (props, idx) { return (<Feature key={idx} {...props}/>); })}
        </div>
      </div>
    </section>);
}
