import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  Quote,
  Send,
  Smartphone,
  UserCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FAQ,
  FinalCTA,
  ProductConsole,
  Reveal,
  SectionHeading,
} from "./components.jsx";
import { buyerFaq, industries, packages, products } from "./data.js";

const scenarios = [
  {
    id: "A",
    name: "Reorder and detour",
    service: "96%",
    distance: "+6.2 km",
    overtime: "None",
    cold: "Protected",
    recommended: true,
    reason: "Protects the cold-chain window, avoids overtime, and adds the least operational risk.",
  },
  {
    id: "B",
    name: "Add available vehicle",
    service: "94%",
    distance: "+11.7 km",
    overtime: "None",
    cold: "Protected",
    reason: "Protects the priority window but introduces another vehicle and more distance.",
  },
  {
    id: "C",
    name: "Split route",
    service: "90%",
    distance: "+4.1 km",
    overtime: "24 min",
    cold: "At risk",
    reason: "Adds the least distance, but leaves the priority cold-chain window exposed.",
  },
];

const operatorPerspectives = [
  {
    name: "Marta Zielińska",
    role: "Operations manager · Warsaw delivery network",
    quote:
      "The useful moment is not when a route turns red. It is when the dispatcher can see which promise is affected and compare the next feasible move.",
  },
  {
    name: "Piotr Nowak",
    role: "Field service coordinator · Poznań region",
    quote:
      "A same-day job changes more than one technician schedule. The scenario view makes the trade-off visible before the update reaches the field.",
  },
  {
    name: "Anna Kowalska",
    role: "Cold-chain dispatcher · Łódź region",
    quote:
      "We need recovery options that respect the protected window, vehicle suitability, and driver capacity together, not as separate alerts.",
  },
];

const entryScenes = [
  ["06:10", "Plan", "Warsaw wakes"],
  ["09:12", "Live", "Disruption appears"],
  ["09:17", "Replan", "A feasible response"],
  ["09:23", "Recovered", "The day moves again"],
];

export default function HomePage() {
  return (
    <>
      <EntryPortal />
      <DocumentaryHero />
      <MorningPlan />
      <DisruptionChapter />
      <LiveChapter />
      <ReplanChapter />
      <RecoveryChapter />
      <ProductLoop />
      <IndustryStories />
      <OperatorScenario />
      <TestimonialsChapter />
      <FundingAnnouncement />
      <PackagingPreview />
      <FAQ items={buyerFaq} />
      <FinalCTA />
    </>
  );
}

function FundingAnnouncement() {
  return (
    <section id="funding" className="funding-announcement" aria-labelledby="funding-announcement-title">
      <div className="content-width funding-announcement-inner">
        <div className="funding-announcement-meta">
          <p className="eyebrow">Funding announcement</p>
          <time dateTime="2026-06-09">Jun 9, 2026</time>
          <span aria-hidden="true" />
          <strong>Logistics intelligence</strong>
        </div>
        <div className="funding-announcement-copy">
          <h2 id="funding-announcement-title">Roviaza secures $485K in funding from Dlabs.</h2>
          <p>
            Roviaza is part of Dlabs’ global portfolio of companies building logistics intelligence for complex
            operating environments.
          </p>
          <div className="funding-announcement-actions">
            <Link className="text-arrow-link light-link" to="/news/funding-announcement">
              Read the announcement <ArrowRight size={17} />
            </Link>
            <a
              className="button button-lime"
              href="https://d-labs-site.vercel.app/companies"
              target="_blank"
              rel="noreferrer noopener"
            >
              View Dlabs portfolio <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <div className="funding-record" aria-label="Funding record">
          <div><span>Backed by</span><strong>Dlabs</strong></div>
          <div><span>Funding</span><strong>$485K</strong></div>
          <div><span>Announced</span><strong>Jun 9, 2026</strong></div>
        </div>
      </div>
    </section>
  );
}

function EntryPortal() {
  const videoRef = useRef(null);
  const restartTimerRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.pause();
      return undefined;
    }

    let animationFrame;
    const updateFilm = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const fadeIn = Math.min(video.currentTime / 0.65, 1);
        const fadeOut = Math.min((video.duration - video.currentTime) / 0.7, 1);
        video.style.opacity = String(Math.max(0, Math.min(fadeIn, fadeOut)));
        const nextScene = Math.min(3, Math.floor(video.currentTime / (video.duration / 4)));
        setActiveScene((current) => (current === nextScene ? current : nextScene));
      }
      animationFrame = window.requestAnimationFrame(updateFilm);
    };

    const restart = () => {
      video.style.opacity = "0";
      restartTimerRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        setActiveScene(0);
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", restart);
    video.play().catch(() => {});
    animationFrame = window.requestAnimationFrame(updateFilm);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(restartTimerRef.current);
      video.removeEventListener("ended", restart);
    };
  }, []);

  return (
    <section className="entry-portal" aria-labelledby="entry-title">
      <img
        className="entry-poster"
        src="/assets/story/roviaza-warsaw-traffic.webp"
        alt=""
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="entry-film"
        src="/assets/video/roviaza-entry-film.mp4"
        muted
        playsInline
        preload="auto"
        poster="/assets/story/roviaza-warsaw-traffic.webp"
        aria-hidden="true"
      />
      <div className="entry-film-shade" />
      <div className="entry-content content-width">
        <div className="entry-copy">
          <p className="eyebrow">Live route operations for distribution teams</p>
          <h1 id="entry-title">Roviaza</h1>
          <h2>The route changes. The operation responds.</h2>
          <p>
            One coordination layer for feasible planning, live disruption, and dispatcher-controlled recovery.
          </p>
          <div className="entry-actions">
            <a className="button button-lime" href="#roviaza-story">
              Enter the operating day <ArrowDown size={17} />
            </a>
            <Link className="text-arrow-link light-link" to="/demo">
              Book a walkthrough <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="entry-scene-status" aria-live="polite">
          <span>Now showing</span>
          <strong>{entryScenes[activeScene][2]}</strong>
        </div>
        <div className="entry-timeline" aria-label="Roviaza operating-day sequence">
          {entryScenes.map(([time, mode], index) => (
            <div className={index === activeScene ? "active" : ""} key={mode}>
              <span>{time}</span>
              <strong>{mode}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentaryHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="documentary-hero" id="roviaza-story">
      <img
        className="documentary-hero-image"
        src="/assets/story/roviaza-dispatch-room.webp"
        alt="Illustrative Warsaw dispatch room with a live route display"
      />
      <div className="documentary-hero-shade" />
      <div className="documentary-hero-content content-width">
        <motion.div
          className="hero-story-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Live route operations for operations teams</p>
          <h2 className="documentary-title">
            <span>The day changes.</span>
            <span>Your team stays ahead.</span>
          </h2>
          <p>
            Roviaza helps delivery and field operations plan feasible routes, see disruption early, and recover
            the day with human-controlled AI.
          </p>
          <div className="hero-actions">
            <Link className="button button-lime" to="/demo">
              Book an operational walkthrough <ArrowRight size={17} />
            </Link>
            <a className="text-arrow-link light-link" href="#morning-plan">
              Watch the recovery <ArrowDown size={17} />
            </a>
          </div>
        </motion.div>
        <div className="hero-story-index" aria-label="Operating day chapters">
          <span><b>06:10</b> Plan</span>
          <span><b>09:12</b> Live</span>
          <span><b>09:17</b> Replan</span>
          <span><b>09:23</b> Recovered</span>
        </div>
      </div>
      <div className="hero-disclosure">Illustrative product environment</div>
    </section>
  );
}

function MorningPlan() {
  return (
    <section className="chapter chapter-plan" id="morning-plan">
      <div className="content-width">
        <div className="chapter-intro">
          <div className="chapter-time">
            <span>01</span>
            <strong>06:10</strong>
            <em>Before dispatch</em>
          </div>
          <Reveal className="chapter-copy">
            <p className="eyebrow">Roviaza Plan</p>
            <h2>Start with what is feasible.</h2>
            <p>
              Route PL-204 leaves the Mokotów depot with 18 stops, a protected service window, and a plan the
              dispatcher can explain.
            </p>
            <Link className="text-arrow-link" to="/products/plan">
              Explore Roviaza Plan <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
        <Reveal className="chapter-product-stage">
          <ProductConsole mode="plan" />
        </Reveal>
      </div>
    </section>
  );
}

function DisruptionChapter() {
  const events = [
    ["09:12", "Traffic incident", "Puławska"],
    ["09:13", "Customer cancellation", "Stop 07"],
    ["09:14", "Urgent pickup", "Żwirki i Wigury"],
    ["09:15", "Driver capacity", "91% used"],
    ["09:16", "Cold-chain window", "At risk"],
  ];

  return (
    <section className="disruption-chapter">
      <img
        src="/assets/story/roviaza-warsaw-traffic.webp"
        alt="Illustrative Warsaw traffic disruption affecting delivery routes"
        loading="lazy"
      />
      <div className="disruption-shade" />
      <div className="disruption-content content-width">
        <Reveal className="disruption-copy">
          <p className="eyebrow">09:12 · The real world intervenes</p>
          <h2>The first problem is rarely the only problem.</h2>
          <p>
            One delay spreads into capacity pressure, an urgent pickup, and a priority window that is running out
            of room.
          </p>
        </Reveal>
        <div className="event-sequence">
          {events.map(([time, title, detail], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <span>{time}</span>
              <strong>{title}</strong>
              <em>{detail}</em>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveChapter() {
  const [state, setState] = useState(0);
  const states = [
    ["Detect the cause", "A traffic incident puts route PL-204 behind its feasible sequence."],
    ["Trace the consequence", "Four downstream stops move from normal to at risk while capacity reaches 91%."],
    ["Prioritise the decision", "The cold-chain window becomes the first commitment that needs intervention."],
  ];

  return (
    <section className="live-story">
      <div className="content-width live-story-layout">
        <div className="live-product-sticky">
          <ProductConsole mode="live" liveState={state} />
        </div>
        <div className="live-story-steps">
          <SectionHeading
            light
            eyebrow="Roviaza Live"
            title="See what changed, what it affects, and how long you have to act."
            copy="Normal operations remain quiet. The decision queue only raises what deserves attention."
          />
          {states.map(([title, copy], index) => (
            <motion.article
              key={title}
              className={state === index ? "active" : ""}
              onViewportEnter={() => setState(index)}
              viewport={{ amount: 0.65 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
          <Link className="text-arrow-link light-link" to="/products/live">
            Explore Roviaza Live <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReplanChapter() {
  const [selected, setSelected] = useState(scenarios[0]);
  const [approved, setApproved] = useState(false);

  const selectScenario = (scenario) => {
    setSelected(scenario);
    setApproved(false);
  };

  return (
    <section className="replan-chapter">
      <div className="content-width">
        <div className="replan-heading">
          <SectionHeading
            eyebrow="09:17 · Roviaza Replan"
            title="Repair the route without rebuilding the day."
            copy="Compare the service impact, distance, workload, overtime, and protected commitments before a route change is published."
          />
          <Link className="text-arrow-link" to="/products/replan">
            Explore Replan <ArrowRight size={17} />
          </Link>
        </div>
        <div className="scenario-workbench">
          <div className="scenario-map">
            <span className="demo-label">Illustrative demo data</span>
            <img src="/assets/product/roviaza-map-replan.webp" alt="Illustrative Poland recovery route map" loading="lazy" />
            <div className="scenario-map-summary">
              <span>Selected recovery</span>
              <strong>Scenario {selected.id} · {selected.name}</strong>
              <small>{selected.reason}</small>
            </div>
          </div>
          <div className="scenario-comparison">
            {scenarios.map((scenario) => (
              <button
                type="button"
                key={scenario.id}
                className={selected.id === scenario.id ? "selected" : ""}
                onClick={() => selectScenario(scenario)}
              >
                <span>Scenario {scenario.id}</span>
                <strong>{scenario.name}</strong>
                {scenario.recommended && <em>Recommended</em>}
                <dl>
                  <div><dt>Service</dt><dd>{scenario.service}</dd></div>
                  <div><dt>Distance</dt><dd>{scenario.distance}</dd></div>
                  <div><dt>Overtime</dt><dd>{scenario.overtime}</dd></div>
                  <div><dt>Cold-chain</dt><dd>{scenario.cold}</dd></div>
                </dl>
              </button>
            ))}
            <div className="scenario-decision">
              <div>
                <span>Recommendation explanation</span>
                <p>{selected.reason}</p>
              </div>
              <button className="button button-lime" type="button" onClick={() => setApproved(true)}>
                {approved ? <><Check size={17} /> Recovery approved</> : <>Approve recovery <ArrowRight size={17} /></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecoveryChapter() {
  const events = [
    [UserCheck, "Dispatcher", "Scenario A approved"],
    [Smartphone, "Driver", "Updated route received"],
    [Send, "Customer", "New ETA shared"],
    [Check, "Decision history", "Reason and impact recorded"],
  ];

  return (
    <section className="recovery-chapter">
      <img
        src="/assets/story/roviaza-driver-recovery.webp"
        alt="Illustrative driver receiving a recovered route in Warsaw"
        loading="lazy"
      />
      <div className="recovery-shade" />
      <div className="recovery-content content-width">
        <Reveal className="recovery-copy">
          <p className="eyebrow">09:23 · Recovered</p>
          <h2>Updated plan.<br />Protected promise.</h2>
          <p>Everyone gets a feasible next step, and the reason for the change remains visible.</p>
        </Reveal>
        <div className="coordination-rail">
          {events.map(([Icon, label, detail], index) => (
            <Reveal key={label} delay={index * 0.08}>
              <Icon size={19} />
              <span>{label}</span>
              <strong>{detail}</strong>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductLoop() {
  return (
    <section className="product-loop content-width">
      <SectionHeading
        eyebrow="One operating loop"
        title="Three products. One route day."
        copy="Plan, Live, and Replan are connected operating modes, not detached tools."
      />
      <div className="product-loop-rail">
        {Object.values(products).map((product, index) => (
          <Link key={product.slug} to={`/products/${product.slug}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <product.icon size={26} />
            <div>
              <h3>{product.shortName}</h3>
              <p>{product.summary}</p>
            </div>
            <ArrowRight size={19} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function IndustryStories() {
  const industryList = Object.values(industries);
  const [active, setActive] = useState(industryList[0]);

  return (
    <section className="industry-stories">
      <div className="content-width">
        <SectionHeading
          eyebrow="Built around the operation"
          title="Different fleets. The same need for feasible change."
          copy="Choose an operating environment to see the constraint that shapes its route day."
        />
        <div className="industry-layout">
          <div className="industry-rows">
            {industryList.map((industry, index) => (
              <Link
                className={active.slug === industry.slug ? "active" : ""}
                onMouseEnter={() => setActive(industry)}
                onFocus={() => setActive(industry)}
                key={industry.slug}
                to={`/industries/${industry.slug}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <industry.icon size={24} />
                <div>
                  <h3>{industry.name}</h3>
                  <p>{industry.constraints.join(" · ")}</p>
                </div>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
          <div className="industry-visual">
            <img src={active.image} alt={`${active.name} illustrative operating environment`} loading="lazy" />
            <div>
              <span>Illustrative operating scenario</span>
              <p>{active.scenario}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OperatorScenario() {
  return (
    <section className="operator-scenario content-width">
      <div className="operator-copy">
        <p className="eyebrow">Illustrative operator scenario</p>
        <h2>Vistula Fresh Logistics</h2>
        <p>
          A Warsaw cold-chain fleet uses the Roviaza demonstration to protect a priority window while absorbing a
          cancellation and an urgent pickup.
        </p>
        <div className="illustrative-outcomes">
          <div><strong>18</strong><span>routes reviewed</span></div>
          <div><strong>3</strong><span>scenarios compared</span></div>
          <div><strong>1</strong><span>priority window protected</span></div>
          <div><strong>0</strong><span>unapproved changes</span></div>
        </div>
        <small>This organisation and its operating data are fictional and shown only to explain the product workflow.</small>
      </div>
      <img
        src="/assets/story/roviaza-cold-chain-depot.webp"
        alt="Illustrative cold-chain depot with refrigerated delivery vehicles"
        loading="lazy"
      />
    </section>
  );
}

function TestimonialsChapter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = operatorPerspectives[activeIndex];

  return (
    <section className="testimonials-story">
      <div className="content-width">
        <div className="testimonials-heading">
          <SectionHeading
            light
            eyebrow="Illustrative operator perspectives"
            title="The platform earns trust at the point of decision."
            copy="Composite perspectives show how different Polish operations would evaluate a controlled route-recovery workflow."
          />
          <span>Fictional profiles · Demonstration content</span>
        </div>
        <div className="testimonial-stage">
          <div className="testimonial-people" aria-label="Illustrative operator perspectives">
            {operatorPerspectives.map((person, index) => (
              <button
                className={`testimonial-person ${index === activeIndex ? "active" : ""}`}
                type="button"
                key={person.name}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{person.name}</strong>
                  <small>{person.role}</small>
                </div>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
          <motion.blockquote
            key={active.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <Quote size={34} aria-hidden="true" />
            <p>“{active.quote}”</p>
            <footer>
              <strong>{active.name}</strong>
              <span>{active.role}</span>
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

function PackagingPreview() {
  return (
    <section className="packaging-preview content-width">
      <div className="packaging-heading">
        <SectionHeading
          eyebrow="Rollout options"
          title="Start with the operating problem you need to solve."
          copy="No invented prices. Scope is shaped around the products, regions, constraints, and rollout support the operation needs."
        />
        <Link className="text-arrow-link" to="/pricing">
          Compare rollout options <ArrowRight size={17} />
        </Link>
      </div>
      <div className="package-table">
        {packages.map((item, index) => (
          <Reveal className="package-column" key={item.name} delay={index * 0.05}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.name}</h3>
            <strong>{item.descriptor}</strong>
            <p>{item.copy}</p>
            <ul>
              {item.includes.slice(0, 3).map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
