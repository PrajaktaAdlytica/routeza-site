import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  DemoNotice,
  FAQ,
  FinalCTA,
  PageHero,
  ProductConsole,
  Reveal,
  SectionHeading,
} from "./components.jsx";
import { buyerFaq, industries, packages, platformLayers, products } from "./data.js";

export function ProductPage() {
  const { slug } = useParams();
  const product = products[slug];
  if (!product) return <Navigate to="/products/plan" replace />;

  return (
    <>
      <PageHero eyebrow={`${product.time} · ${product.eyebrow}`} title={product.headline} copy={product.summary}>
        <div className="page-hero-aside">
          <span className="demo-label">Illustrative demo data</span>
          <div className="product-mode-index">
            {Object.values(products).map((item) => (
              <Link className={item.slug === product.slug ? "active" : ""} to={`/products/${item.slug}`} key={item.slug}>
                <item.icon size={18} />
                <span>{item.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="product-page-stage content-width">
        <ProductConsole mode={product.slug} />
      </section>

      <section className="problem-response content-width">
        <Reveal>
          <p className="eyebrow">The operating problem</p>
          <h2>{product.problem}</h2>
        </Reveal>
        <Reveal>
          <p className="eyebrow">How {product.shortName} responds</p>
          <p>{product.response}</p>
          <Link className="text-arrow-link" to="/demo">Plan a walkthrough <ArrowRight size={17} /></Link>
        </Reveal>
      </section>

      <section className="feature-ledger content-width">
        <SectionHeading
          eyebrow={`${product.name} capabilities`}
          title="The operational detail stays visible."
          copy="Each capability is part of the same decision workflow rather than a detached feature card."
        />
        <div>
          {product.features.map(([title, copy], index) => (
            <Reveal className="feature-ledger-row" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="workflow-band">
        <div className="content-width">
          <SectionHeading
            light
            eyebrow="Working sequence"
            title={`How ${product.name} fits into the route day.`}
          />
          <div className="workflow-line">
            {product.steps.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="product-metrics content-width">
        <div>
          <p className="eyebrow">Illustrative operating state</p>
          <h2>Evidence belongs inside the workflow.</h2>
          <p>These values explain the fictional route state. They are not customer performance claims.</p>
        </div>
        <div className="metric-ledger">
          {product.metrics.map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </section>

      <ConnectedProducts active={product.slug} />
      <FAQ items={product.faq} title={`Questions about ${product.name}`} />
      <FinalCTA />
    </>
  );
}

function ConnectedProducts({ active }) {
  return (
    <section className="connected-products content-width">
      <SectionHeading eyebrow="One operating loop" title="Continue through the route day." />
      <div>
        {Object.values(products).map((product) => (
          <Link className={active === product.slug ? "active" : ""} to={`/products/${product.slug}`} key={product.slug}>
            <product.icon size={22} />
            <span>{product.shortName}</span>
            <small>{product.eyebrow}</small>
            <ArrowRight size={17} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Roviaza platform"
        title="One operating layer from plan to recovery."
        copy="Keep operational inputs, route state, constraints, recovery decisions, and publication history connected through the route day."
      >
        <div className="page-hero-aside platform-hero-aside">
          <span>Input</span><ArrowRight size={17} /><span>Plan</span><ArrowRight size={17} /><span>Live</span><ArrowRight size={17} /><span>Replan</span>
        </div>
      </PageHero>
      <section className="platform-stage content-width"><ProductConsole mode="live" compact /></section>
      <section className="platform-layers content-width">
        <SectionHeading
          eyebrow="Platform boundary"
          title="From operational input to an approved next step."
          copy="The demonstration describes the intended workflow without claiming unsupported integrations or security controls."
        />
        <div>
          {platformLayers.map(([Icon, title, copy], index) => (
            <Reveal className="platform-layer" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={23} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="boundary-band">
        <div className="content-width">
          <div>
            <p className="eyebrow">Integration boundary</p>
            <h2>Roviaza coordinates route decisions. It does not need to become every system around them.</h2>
          </div>
          <div className="boundary-list">
            <span>Receive work and constraints</span>
            <span>Return plans and decisions</span>
            <span>Keep approval visible</span>
            <span>Publish verified integrations only</span>
          </div>
        </div>
      </section>
      <FAQ items={buyerFaq.slice(1, 5)} title="Platform questions" />
      <FinalCTA />
    </>
  );
}

export function IndustryPage() {
  const { slug } = useParams();
  const industry = industries[slug];
  if (!industry) return <Navigate to="/industries/delivery" replace />;
  const product = products[industry.mode];

  return (
    <>
      <section className="industry-hero">
        <img src={industry.image} alt={`${industry.name} illustrative operating environment`} />
        <div className="industry-hero-shade" />
        <div className="content-width industry-hero-copy">
          <p className="eyebrow">{industry.name}</p>
          <h1>{industry.headline}</h1>
          <p>{industry.summary}</p>
          <Link className="button button-lime" to="/demo">Book a walkthrough <ArrowRight size={17} /></Link>
        </div>
      </section>
      <section className="industry-scenario content-width">
        <div>
          <p className="eyebrow">A realistic working day</p>
          <h2>{industry.scenario}</h2>
          <small>Illustrative operating scenario</small>
        </div>
        <div className="constraint-ledger">
          {industry.constraints.map((constraint, index) => (
            <div key={constraint}><span>{String(index + 1).padStart(2, "0")}</span><strong>{constraint}</strong></div>
          ))}
        </div>
      </section>
      <section className="industry-product-stage">
        <div className="content-width">
          <SectionHeading
            light
            eyebrow={product.name}
            title={`${product.shortName} becomes the primary operating view.`}
            copy={product.response}
          />
          <ProductConsole mode={product.slug} />
        </div>
      </section>
      <section className="implementation-strip content-width">
        <SectionHeading eyebrow="Implementation considerations" title="Begin with one operation that is difficult enough to be useful." />
        <div>
          {["Define the route day", "Map the decision inputs", "Agree the protected commitments", "Review the approval workflow"].map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>
      <FAQ items={buyerFaq.slice(0, 4)} title={`${industry.name} questions`} />
      <FinalCTA />
    </>
  );
}

export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Packaging and rollout"
        title="Start with the operating problem you need to solve."
        copy="Roviaza packaging follows product scope, operating regions, constraints, and implementation needs. Numerical pricing will only be published after it is approved."
      />
      <section className="pricing-table content-width">
        <div className="pricing-table-head">
          <span>Rollout package</span><span>Best for</span><span>Included scope</span><span>Next step</span>
        </div>
        {packages.map((item, index) => (
          <Reveal className="pricing-table-row" key={item.name}>
            <div><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.name}</h2><strong>{item.descriptor}</strong></div>
            <p>{item.copy}</p>
            <ul>{item.includes.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
            <Link className="button button-secondary" to="/demo">Discuss your operation <ArrowRight size={16} /></Link>
          </Reveal>
        ))}
      </section>
      <section className="pilot-band content-width">
        <div>
          <p className="eyebrow">A useful pilot</p>
          <h2>One depot. One difficult operating day. A decision workflow your team can evaluate.</h2>
        </div>
        <ol>
          <li><span>01</span>Choose the operational scope</li>
          <li><span>02</span>Prepare illustrative or approved data</li>
          <li><span>03</span>Review Plan, Live, and Replan decisions</li>
          <li><span>04</span>Agree what a production rollout must prove</li>
        </ol>
      </section>
      <FAQ items={buyerFaq} title="Packaging and pilot questions" />
      <FinalCTA />
    </>
  );
}

export function AboutPage() {
  const principles = [
    ["Feasibility first", "A route is only useful when the whole operating day can run."],
    ["Calm under pressure", "Normal work stays quiet so exceptions can be understood."],
    ["Human-controlled AI", "Roviaza recommends and explains; dispatchers decide."],
    ["Evidence over theatre", "Product states, constraints, and consequences carry the story."],
  ];
  return (
    <>
      <PageHero
        eyebrow="About Roviaza"
        title="Routes change. Operations still need a feasible next step."
          copy="Roviaza is a logistics AI product concept for teams whose morning route plans have to survive real operational disruption."
      />
      <section className="about-purpose content-width">
        <div>
          <p className="eyebrow">Why Roviaza exists</p>
          <h2>The gap is not another route line. It is the controlled decision between disruption and recovery.</h2>
        </div>
        <p>
          Delivery and field operations already have orders, maps, drivers, vehicles, and customer promises.
          Roviaza focuses on connecting those inputs to an explainable, dispatcher-approved next step when the plan
          stops being feasible.
        </p>
      </section>
      <section className="principles-ledger content-width">
        {principles.map(([title, copy], index) => (
          <Reveal key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></Reveal>
        ))}
      </section>
      <section className="company-proof content-width" aria-labelledby="company-proof-title">
        <div className="company-proof-heading">
          <p className="eyebrow">Company record</p>
          <h2 id="company-proof-title">Backed for the operating environments where routes do not stay still.</h2>
        </div>
        <div className="company-proof-body">
          <div className="company-proof-stats">
            <div><span>Investor</span><strong>Backed by Dlabs</strong></div>
            <div><span>Funding</span><strong>$485K funding</strong></div>
          </div>
          <div className="company-proof-links" aria-label="Roviaza company profiles">
            <Link to="/news/funding-announcement">Funding announcement <ArrowRight size={16} /></Link>
            <a href="https://d-labs-site.vercel.app/companies" target="_blank" rel="noreferrer noopener">
              Dlabs portfolio <ExternalLink size={15} />
            </a>
            <a href="https://www.linkedin.com/company/roviaza/" target="_blank" rel="noreferrer noopener">
              LinkedIn <ExternalLink size={15} />
            </a>
            <a href="https://www.crunchbase.com/organization/roviaza" target="_blank" rel="noreferrer noopener">
              Crunchbase <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
      <section className="status-band">
        <div className="content-width">
          <div>
            <p className="eyebrow">Current product status</p>
            <h2>This website presents an interactive frontend demonstration.</h2>
          </div>
          <DemoNotice>
            Product environments and operator scenarios are illustrative. Founder, team, legal entity, integration,
            security, and customer information will only be published after verification.
          </DemoNotice>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function FundingAnnouncementPage() {
  return (
    <>
      <PageHero
        eyebrow="Funding announcement · Jun 9, 2026"
        title="Roviaza secures $485K in funding from Dlabs."
        copy="Roviaza is part of Dlabs’ global portfolio of companies building logistics intelligence for complex operating environments."
      />
      <article className="funding-article content-width">
        <div className="funding-article-aside">
          <p className="eyebrow">Announcement record</p>
          <dl>
            <div><dt>Announcement date</dt><dd><time dateTime="2026-06-09">Jun 9, 2026</time></dd></div>
            <div><dt>Sector</dt><dd>Logistics intelligence</dd></div>
            <div><dt>Investor</dt><dd>Dlabs</dd></div>
            <div><dt>Funding</dt><dd>$485K</dd></div>
          </dl>
        </div>
        <div className="funding-article-body">
          <p className="funding-article-lead">Roviaza has secured $485K in funding from Dlabs.</p>
          <p>
            Roviaza is part of Dlabs’ global portfolio of companies building logistics intelligence for complex
            operating environments.
          </p>
          <div className="funding-article-actions">
            <a
              className="button button-dark"
              href="https://d-labs-site.vercel.app/companies"
              target="_blank"
              rel="noreferrer noopener"
            >
              View Dlabs portfolio <ExternalLink size={16} />
            </a>
            <a href="https://www.linkedin.com/company/roviaza/" target="_blank" rel="noreferrer noopener">
              Roviaza on LinkedIn <ExternalLink size={15} />
            </a>
            <a href="https://www.crunchbase.com/organization/roviaza" target="_blank" rel="noreferrer noopener">
              Roviaza on Crunchbase <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </article>
      <FinalCTA />
    </>
  );
}

const contactTypes = ["Sales and walkthroughs", "Partnerships", "Product and support", "General enquiry"];

export function ContactPage() {
  return (
    <FormPage
      eyebrow="Contact Roviaza"
      title="Bring us the route day that is hardest to control."
      copy="Choose the conversation that fits. The current demonstration form validates your input but does not send it to a backend."
      fields="contact"
    />
  );
}

export function DemoPage() {
  return (
    <FormPage
      eyebrow="Book an operational walkthrough"
      title="Show us where your route day breaks."
      copy="The strongest walkthrough starts with a real operating pattern: the constraints, disruptions, and protected commitments your team manages."
      fields="demo"
    />
  );
}

function FormPage({ eyebrow, title, copy, fields }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = {};
    ["name", "email", "company", "message"].forEach((field) => {
      if (!String(form.get(field) || "").trim()) nextErrors[field] = "This field is required.";
    });
    if (!String(form.get("email") || "").includes("@")) nextErrors.email = "Enter a valid work email.";
    if (!consent) nextErrors.consent = "Consent is required before the form can be prepared.";
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <section className="form-page content-width">
      <div className="form-page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="form-contact-paths">
          {contactTypes.map((item) => <span key={item}><ArrowRight size={15} /> {item}</span>)}
        </div>
        <DemoNotice>No message is transmitted from this frontend demonstration.</DemoNotice>
      </div>
      <form className="lead-form" onSubmit={onSubmit} noValidate>
        {submitted && (
          <div className="form-status" role="status">
            <CheckCircle2 size={20} />
            <div>
              <strong>Your details are valid.</strong>
              <p>This demonstration is not connected to a delivery endpoint, so nothing has been sent.</p>
            </div>
          </div>
        )}
        <Field label="Full name" name="name" error={errors.name} />
        <Field label="Work email" name="email" type="email" error={errors.email} />
        <Field label="Company" name="company" error={errors.company} />
        <div className="form-grid">
          <label>
            Country
            <select name="country" defaultValue="Poland">
              <option>Poland</option><option>Germany</option><option>Czechia</option><option>Other EU country</option>
            </select>
          </label>
          <label>
            {fields === "demo" ? "Operation type" : "Enquiry type"}
            <select name="type" defaultValue="">
              <option value="" disabled>Select one</option>
              {(fields === "demo" ? ["Delivery", "Field service", "Cold-chain", "Local fleet"] : contactTypes).map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        {fields === "demo" && (
          <div className="form-grid">
            <label>Fleet or team size<input name="size" placeholder="e.g. 40 vehicles" /></label>
            <label>Current system<input name="system" placeholder="TMS, FSM, spreadsheet..." /></label>
          </div>
        )}
        <label>
          {fields === "demo" ? "Where does the route day break?" : "Message"}
          <textarea
            name="message"
            placeholder="Traffic, cancellations, urgent work, service windows, capacity..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && <small className="field-error" id="message-error" role="alert">{errors.message}</small>}
        </label>
        <label className="consent-row">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>I agree that these details may be prepared for a Roviaza enquiry. <Link to="/legal/privacy">Privacy notice</Link></span>
        </label>
        {errors.consent && <small className="field-error" id="consent-error" role="alert">{errors.consent}</small>}
        <button className="button button-lime" type="submit">
          Validate enquiry <ArrowRight size={17} />
        </button>
      </form>
    </section>
  );
}

function Field({ label, name, type = "text", error }) {
  const errorId = `${name}-error`;
  return (
    <label>
      {label}
      <input
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <small className="field-error" id={errorId} role="alert">{error}</small>}
    </label>
  );
}

export function SignInPage() {
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState(false);
  return (
    <section className="signin-page">
      <div className="signin-documentary">
        <img src="/assets/story/roviaza-dispatch-room.webp" alt="Illustrative Roviaza operations environment" />
        <div>
          <span>Illustrative operations environment</span>
          <h2>Return to the route day.</h2>
          <p>Planning, live coordination, and recovery in one operating workspace.</p>
        </div>
      </div>
      <div className="signin-form-wrap">
        <img className="signin-logo" src="/assets/brand/roviaza-logo-primary.svg" alt="Roviaza" />
        <div>
          <p className="eyebrow">Workspace access</p>
          <h1>Sign in to Roviaza</h1>
          <p>Authentication is demonstrative until a production identity provider is connected.</p>
        </div>
        {notice && <div className="auth-notice"><AlertCircle size={19} /> Backend sign-in is not available in this demonstration.</div>}
        <form onSubmit={(event) => { event.preventDefault(); setNotice(true); }}>
          <label>Email<input type="email" placeholder="you@company.eu" required /></label>
          <label>
            Password
            <span className="password-field">
              <input type={visible ? "text" : "password"} required />
              <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? "Hide password" : "Show password"}>
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          <div className="signin-options">
            <label><input type="checkbox" /> Remember me</label>
            <Link to="/company/contact">Forgot password?</Link>
          </div>
          <button className="button button-dark" type="submit">Sign in <ArrowRight size={17} /></button>
        </form>
        <p className="signin-support"><Mail size={16} /> Need access? <Link to="/company/contact">Contact support</Link></p>
      </div>
    </section>
  );
}

export function SecurityPage() {
  const topics = [
    ["Platform boundary", "Document the systems, data, and decisions that sit inside and outside Roviaza."],
    ["Access controls", "Publish the implemented identity, roles, permissions, and review practices."],
    ["Data protection", "Verify encryption, hosting region, retention, deletion, and export behaviour."],
    ["Subprocessors", "List every production service that handles operational or personal data."],
    ["Incident response", "Provide an approved process and contact before commercial launch."],
    ["Responsible disclosure", "Publish a verified security contact and coordinated disclosure process."],
  ];
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Operational trust requires verified facts."
        copy="This demonstration defines the questions a production Roviaza security programme must answer. It does not display certifications or guarantees that have not been verified."
      >
        <div className="security-hero-mark"><LockKeyhole size={34} /><span>Production facts pending verification</span></div>
      </PageHero>
      <section className="security-topics content-width">
        {topics.map(([title, copy], index) => (
          <Reveal key={title}><span>{String(index + 1).padStart(2, "0")}</span><ShieldCheck size={23} /><h2>{title}</h2><p>{copy}</p></Reveal>
        ))}
      </section>
      <section className="security-disclosure content-width">
        <MapPinned size={22} />
            <div><strong>Operational product focus</strong><p>Hosting location and data residency will only be stated after the production architecture is approved.</p></div>
      </section>
      <FinalCTA />
    </>
  );
}

const legalContent = {
  privacy: ["Privacy notice", "This route reserves the production privacy notice. Controller, processor, retention, purpose, legal basis, rights, and contact details require legal and business verification."],
  terms: ["Website terms", "This route reserves the production website and service terms. Company identity, commercial scope, governing law, limitations, and service conditions require approval."],
  cookies: ["Cookie notice", "This route reserves the production cookie notice. The final content must describe the analytics, consent, and storage technologies that are actually deployed."],
};

export function LegalPage() {
  const { slug } = useParams();
  const content = legalContent[slug];
  if (!content) return <Navigate to="/legal/privacy" replace />;
  return (
    <section className="legal-page content-width">
      <div>
        <p className="eyebrow">Draft legal route</p>
        <h1>{content[0]}</h1>
        <p>{content[1]}</p>
      </div>
      <aside>
        <AlertCircle size={22} />
        <strong>Publication blocked</strong>
        <p>This page is intentionally not presented as approved legal advice.</p>
        <Link className="text-arrow-link" to="/company/contact">Contact Roviaza <ArrowRight size={16} /></Link>
      </aside>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="not-found-page content-width">
      <span>404</span>
      <h1>This route is not in the operating plan.</h1>
      <p>Return to the Roviaza homepage or continue to the Replan product.</p>
      <div><Link className="button button-dark" to="/">Return home</Link><Link className="text-arrow-link" to="/products/replan">Explore Replan <ArrowRight size={16} /></Link></div>
    </section>
  );
}
