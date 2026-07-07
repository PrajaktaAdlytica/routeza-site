import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  ArrowRight,
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  DatabaseZap,
  Gauge,
  Globe2,
  Lock,
  MapPinned,
  Menu,
  Mail,
  PackageCheck,
  PanelTop,
  Phone,
  RadioTower,
  RefreshCw,
  Route,
  ShieldCheck,
  Snowflake,
  Truck,
  UserRoundCheck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Route as AppRoute, Routes, useLocation } from "react-router-dom";

const products = [
  {
    slug: "plan",
    name: "Routeza Plan",
    eyebrow: "Daily route planning",
    headline: "Build feasible routes before the first van leaves.",
    summary:
      "Create capacity-aware plans around service windows, driver skills, vehicle types, depot rules, and EU operating constraints.",
    icon: Route,
    accent: "mint",
    metric: "32%",
    metricLabel: "fewer planning hours",
    bullets: [
      "Time-window and driver-capacity planning",
      "Cold-chain handling rules by stop and vehicle",
      "Depot, territory, and local fleet balancing",
      "Planner review tools before dispatch",
    ],
  },
  {
    slug: "live",
    name: "Routeza Live",
    eyebrow: "Operational visibility",
    headline: "See every route, exception, and ETA as the day unfolds.",
    summary:
      "Give dispatchers a calm live control room for traffic shifts, missed stops, driver status, customer ETAs, and proof signals.",
    icon: RadioTower,
    accent: "blue",
    metric: "94%",
    metricLabel: "same-day visibility",
    bullets: [
      "Live route board with exception severity",
      "Driver status, stop progress, and ETA monitoring",
      "Customer notification triggers",
      "Temperature and service-window watchlists",
    ],
  },
  {
    slug: "replan",
    name: "Routeza Replan",
    eyebrow: "Midday recovery",
    headline: "Replan fast when the route breaks in real life.",
    summary:
      "Recover from traffic, cancellations, urgent pickups, capacity changes, and cold-chain constraints without rebuilding the day manually.",
    icon: RefreshCw,
    accent: "lime",
    metric: "11 min",
    metricLabel: "average recovery cycle",
    bullets: [
      "Scenario-based route repair",
      "Constraint checks before publishing changes",
      "Driver-ready reroute instructions",
      "Audit trail for dispatch decisions",
    ],
  },
];

const industries = [
  ["Delivery companies", "Dense urban drops, ETAs, proof flows, and missed-stop recovery.", Truck],
  ["Field service teams", "Technician skills, service windows, parts capacity, and repeat visits.", UserRoundCheck],
  ["Cold-chain operators", "Temperature-sensitive routes, vehicle suitability, and exception watchlists.", Snowflake],
  ["Local fleets", "Regional depots, mixed vehicle types, and practical day-of changes.", MapPinned],
];

const productNav = products.map((item) => ({
  label: item.name.replace("Routeza ", ""),
  to: `/products/${item.slug}`,
}));

const trustedCompanies = ["NorthGrid Logistics", "PolarFresh Chain", "Serva Fleet", "BlueParcel Europe", "UrbanMedic Dispatch", "FieldAxis"];

const testimonials = [
  {
    quote:
      "Routeza gave our dispatch team one place to plan in the morning and recover routes during the day without losing cold-chain priorities.",
    name: "Agnieszka Nowak",
    role: "Operations Director, PolarFresh Chain",
  },
  {
    quote:
      "We stopped juggling spreadsheets, driver calls, and ETA updates separately. Live and Replan finally behave like one operating workflow.",
    name: "Marek Zielinski",
    role: "Head of Dispatch, NorthGrid Logistics",
  },
  {
    quote:
      "The product feels built for real field constraints, not just map demos. Capacity, service windows, and urgent jobs are all in the same decision loop.",
    name: "Katarzyna Lewandowska",
    role: "Regional Service Lead, Serva Fleet",
  },
];

const pricingPlans = [
  {
    name: "Plan",
    price: "€490",
    period: "/month",
    description: "For smaller delivery and field teams that need structured daily route planning.",
    features: ["Routeza Plan workspace", "Capacity and service-window rules", "Planner review tools", "Email support"],
  },
  {
    name: "Operate",
    price: "€1,250",
    period: "/month",
    description: "For teams running live dispatch and route recovery across active fleets.",
    features: ["Plan, Live, and Replan", "Dispatcher control board", "Exception monitoring", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For multi-depot operators with advanced governance, integrations, and rollout support.",
    features: ["Multi-region rollout", "Advanced workflow support", "Security and governance review", "Dedicated success lead"],
  },
];

const footerGroups = [
  {
    title: "Products",
    links: [
      ["Routeza Plan", "/products/plan"],
      ["Routeza Live", "/products/live"],
      ["Routeza Replan", "/products/replan"],
      ["Request demo", "/demo"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Industries", "/#industries"],
      ["Security", "/#security"],
      ["Testimonials", "/#testimonials"],
      ["Sign in", "/sign-in"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Platform overview", "/#platform"],
      ["Trusted by", "/#trusted-by"],
      ["Support", "mailto:support@routeza.io"],
      ["Sales", "mailto:sales@routeza.io"],
    ],
  },
];

const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/company/routeza-io", "linkedin"],
  ["Instagram", "https://www.instagram.com/routeza.io", "instagram"],
  ["YouTube", "https://www.youtube.com/@routezaio", "youtube"],
];

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return (
    <div className="app-shell">
      <Navigation />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <AppRoute path="/" element={<HomePage />} />
            <AppRoute path="/products/:slug" element={<ProductPage />} />
            <AppRoute path="/demo" element={<DemoPage />} />
            <AppRoute path="/sign-in" element={<SignInPage />} />
            <AppRoute path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Routeza home">
        <LogoMark />
        <span>Routeza</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="nav-group">
          <span className="nav-label">
            Products <ChevronDown size={14} />
          </span>
          <div className="nav-popover">
            {productNav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <SiteLink to="/#industries">Industries</SiteLink>
        <SiteLink to="/#platform">Platform</SiteLink>
        <SiteLink to="/#pricing">Pricing</SiteLink>
        <SiteLink to="/#security">Security</SiteLink>
      </nav>

      <div className="nav-actions">
        <Link className="text-link" to="/sign-in">
          Sign in
        </Link>
        <Link className="button button-dark" to="/demo">
          <CalendarClock size={17} />
          Request demo
        </Link>
      </div>

      <button className="icon-button mobile-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {productNav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
          <SiteLink to="/#industries">Industries</SiteLink>
          <SiteLink to="/#platform">Platform</SiteLink>
          <SiteLink to="/#pricing">Pricing</SiteLink>
          <Link to="/sign-in">Sign in</Link>
          <Link className="button button-dark" to="/demo">
            Request demo
          </Link>
        </motion.div>
      )}
    </header>
  );
}

function HomePage() {
  return (
    <PageTransition>
      <section className="hero-section">
        <BackgroundPaths />
        <div className="hero-copy">
          <div className="pill">
            <span className="pulse-dot" />
            Poland and EU fleet operations
          </div>
          <h1>
            Route planning that keeps moving after the day changes.
          </h1>
          <p>
            Routeza helps delivery companies, field service teams, cold-chain operators, and local fleets plan,
            monitor, and repair routes when traffic, cancellations, service windows, capacity, and temperature
            rules collide.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/demo">
              Request demo <ArrowRight size={18} />
            </Link>
            <Link className="button button-ghost" to="/products/replan">
              See Replan <RefreshCw size={17} />
            </Link>
          </div>
          <div className="trust-row">
            <span>Built for dynamic EU operations</span>
            <span>routeza.io ready</span>
            <span>Cold-chain aware</span>
          </div>
        </div>
        <HeroEvidencePanel />
      </section>

      <section className="section trusted-band" id="trusted-by">
        <div className="trusted-intro">
          <p className="eyebrow">Trusted by operations teams</p>
          <h2>Routeza fits into fleets that need fewer surprises and faster recovery.</h2>
        </div>
        <div className="trusted-grid" aria-label="Trusted by companies">
          {trustedCompanies.map((company) => (
            <div className="trusted-logo" key={company}>
              <span>{company}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section product-band" id="platform">
        <SectionIntro
          eyebrow="Core products"
          title="Plan the day, watch the day, repair the day."
          copy="Routeza is split into focused products so teams can start where the operational pain is highest and expand into a complete route operations layer."
        />
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <SectionIntro
          eyebrow="Pricing"
          title="Pricing that matches how route operations teams actually roll out software."
          copy="Start with planning, expand into live dispatch, and move into full operational recovery when your team is ready."
        />
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <div className="pricing-top">
                <p className="eyebrow">{plan.name}</p>
                <h3>
                  {plan.price}
                  <span>{plan.period}</span>
                </h3>
                <p>{plan.description}</p>
              </div>
              <div className="pricing-features">
                {plan.features.map((feature) => (
                  <span key={feature}>
                    <Check size={16} /> {feature}
                  </span>
                ))}
              </div>
              <Link className={`button ${plan.featured ? "button-primary" : "button-ghost"}`} to="/demo">
                Request demo <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="industries">
        <div>
          <p className="eyebrow">Who it serves</p>
          <h2>Designed for fleets where route plans meet real-world pressure.</h2>
          <p className="section-copy">
            Routeza treats routes as living operational plans, not static drawings on a map. It keeps constraints
            visible when dispatchers need to make quick calls.
          </p>
        </div>
        <div className="industry-list">
          {industries.map(([title, copy, Icon]) => (
            <div className="industry-item" key={title}>
              <Icon size={22} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section motion-section">
        <div className="motion-map" aria-label="Animated route operations illustration">
          <RouteMotion />
        </div>
        <div>
          <p className="eyebrow">Exception handling</p>
          <h2>When one stop changes, Routeza shows the cleanest recovery path.</h2>
          <p className="section-copy">
            Dispatchers can compare operational scenarios, protect priority stops, preserve cold-chain requirements,
            and push route changes to drivers without turning every exception into a spreadsheet exercise.
          </p>
          <div className="check-list">
            {["Traffic-aware reroute options", "Cancellation and urgent pickup recovery", "Driver capacity checks", "Cold-chain safeguards"].map((item) => (
              <span key={item}>
                <Check size={17} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section security-band" id="security">
        <SectionIntro
          eyebrow="Operational confidence"
          title="Governance for teams that need to explain every route change."
          copy="Routeza gives dispatch managers the visibility, controls, and decision history needed for high-accountability fleet operations."
        />
        <div className="security-grid">
          {[
            ["Role-based control", "Planner, dispatcher, manager, and driver workspaces stay focused.", Lock],
            ["Decision audit trail", "Every published replan keeps the reason, user, and impact visible.", ClipboardCheck],
            ["EU-first data posture", "A product direction suited to Poland and EU fleet teams from day one.", ShieldCheck],
          ].map(([title, copy, Icon]) => (
            <div className="security-item" key={title}>
              <Icon size={23} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section testimonials-section" id="testimonials">
        <SectionIntro
          eyebrow="Customer perspective"
          title="A SaaS platform that looks and behaves like part of the daily operations stack."
          copy="Routeza is positioned as a working system for dispatch, planning, and exception recovery, with a calmer interface and operational trust signals where decision-makers expect them."
        />
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <p className="testimonial-quote">"{item.quote}"</p>
              <div className="testimonial-meta">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}

function ProductPage() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const product = products.find((item) => item.slug === slug) || products[0];
  const siblingProducts = products.filter((item) => item.slug !== product.slug);
  const Icon = product.icon;

  return (
    <PageTransition>
      <section className={`product-hero ${product.accent}`}>
        <div className="product-hero-copy">
          <div className="pill">
            <Icon size={16} />
            {product.eyebrow}
          </div>
          <h1>{product.headline}</h1>
          <p>{product.summary}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/demo">
              Request demo <ArrowRight size={18} />
            </Link>
            <SiteLink className="button button-ghost" to="/#platform">
              View platform
            </SiteLink>
          </div>
        </div>
        <ProductConsole product={product} />
      </section>

      <section className="section product-detail-grid">
        <div>
          <p className="eyebrow">Why teams use it</p>
          <h2>{product.name} turns messy routing constraints into workable decisions.</h2>
        </div>
        <div className="feature-matrix">
          {product.bullets.map((bullet, index) => (
            <div className="feature-row" key={bullet}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{bullet}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section workflow-section">
        <SectionIntro
          eyebrow="Workflow"
          title={`How ${product.name} fits into a fleet day`}
          copy="A practical flow for dispatch teams that have to protect service promises while dealing with constant operational movement."
        />
        <div className="workflow-grid">
          {getWorkflow(product.slug).map(([title, copy, Icon]) => (
            <div className="workflow-card" key={title}>
              <Icon size={23} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section next-products">
        <div>
          <p className="eyebrow">Explore more</p>
          <h2>Routeza products work best together.</h2>
        </div>
        <div className="mini-product-grid">
          {siblingProducts.map((item) => (
            <Link className="mini-product-card" to={`/products/${item.slug}`} key={item.slug}>
              <item.icon size={22} />
              <span>{item.name}</span>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}

function DemoPage() {
  return (
    <PageTransition>
      <section className="form-page">
        <div className="form-copy">
          <p className="eyebrow">Request demo</p>
          <h1>See how Routeza handles your real routing day.</h1>
          <p>
            Share your fleet profile and the operations team will tailor the walkthrough around your constraints:
            service windows, driver capacity, cold-chain rules, and midday route breaks.
          </p>
          <div className="demo-proof">
            {["Routeza Plan walkthrough", "Live dispatch board", "Replan scenario simulation"].map((item) => (
              <span key={item}>
                <Check size={17} /> {item}
              </span>
            ))}
          </div>
        </div>
        <motion.form className="lead-form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <label>
            Work email
            <input type="email" placeholder="name@company.eu" />
          </label>
          <label>
            Company
            <input type="text" placeholder="Fleet or delivery company" />
          </label>
          <div className="form-grid-two">
            <label>
              Fleet size
              <select defaultValue="">
                <option value="" disabled>
                  Select size
                </option>
                <option>1-20 vehicles</option>
                <option>21-100 vehicles</option>
                <option>101-500 vehicles</option>
                <option>500+ vehicles</option>
              </select>
            </label>
            <label>
              Operation type
              <select defaultValue="">
                <option value="" disabled>
                  Select type
                </option>
                <option>Last-mile delivery</option>
                <option>Field service</option>
                <option>Cold-chain</option>
                <option>Local mixed fleet</option>
              </select>
            </label>
          </div>
          <label>
            What breaks your route plan most often?
            <textarea placeholder="Traffic, cancellations, service windows, capacity changes..." />
          </label>
          <button className="button button-primary" type="button">
            Book demo <ArrowRight size={18} />
          </button>
        </motion.form>
      </section>
    </PageTransition>
  );
}

function SignInPage() {
  return (
    <PageTransition>
      <section className="signin-page">
        <div className="signin-panel">
          <LogoMark />
          <h1>Sign in to Routeza</h1>
          <p>Access planning, live control, and replan workspaces.</p>
          <form className="signin-form">
            <label>
              Email
              <input type="email" placeholder="you@company.eu" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>
            <button className="button button-primary" type="button">
              Sign in <ArrowRight size={18} />
            </button>
          </form>
          <div className="signin-meta">
            <a href="#reset">Reset password</a>
            <a href="#support">Contact support</a>
          </div>
        </div>
        <div className="signin-visual">
          <ProductConsole product={products[1]} compact />
        </div>
      </section>
    </PageTransition>
  );
}

function NotFoundPage() {
  return (
    <PageTransition>
      <section className="not-found">
        <h1>Route not found</h1>
        <p>This page is not part of the Routeza route plan.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </section>
    </PageTransition>
  );
}

function HeroEvidencePanel() {
  const metrics = [
    ["Planner effort", "32% lower", "versus manual route balancing"],
    ["ETA confidence", "94%", "same-day operational visibility"],
    ["Replan cycle", "11 min", "average recovery window"],
  ];

  const events = [
    ["Plan locked", "06:10", "Depot capacity and time windows cleared"],
    ["Traffic spike", "09:12", "Priority routes flagged for dispatcher review"],
    ["Replan published", "09:23", "Cold-chain stop preserved, urgent pickup absorbed"],
  ];

  return (
    <div className="hero-evidence">
      <div className="hero-evidence-header">
        <div>
          <span className="hero-panel-label">Operational evidence</span>
          <strong>Routeza operating snapshot</strong>
        </div>
        <span className="hero-panel-chip">Warsaw region</span>
      </div>

      <div className="hero-metric-grid">
        {metrics.map(([label, value, note]) => (
          <div className="hero-metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
          </div>
        ))}
      </div>

      <div className="hero-rail-card">
        <div className="hero-rail-copy">
          <p className="eyebrow">Plan to replan</p>
          <h3>A calmer lifecycle view for route operations.</h3>
          <p>
            The homepage now signals a working platform: daily planning, live monitoring, and controlled recovery,
            without making the hero feel like a motion showcase.
          </p>
        </div>
        <FocusRailVisual />
      </div>

      <div className="hero-event-list">
        {events.map(([title, time, note]) => (
          <div className="hero-event-row" key={title}>
            <div className="hero-event-bullet">
              <CircleDot size={14} />
            </div>
            <div className="hero-event-copy">
              <strong>{title}</strong>
              <p>{note}</p>
            </div>
            <span>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BackgroundPaths() {
  return (
    <svg className="background-paths" viewBox="0 0 1200 720" aria-hidden="true">
      <defs>
        <linearGradient id="heroPaths" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(67,214,178,0)" />
          <stop offset="35%" stopColor="rgba(67,214,178,0.45)" />
          <stop offset="65%" stopColor="rgba(201,242,61,0.22)" />
          <stop offset="100%" stopColor="rgba(201,242,61,0)" />
        </linearGradient>
      </defs>
      <path className="background-paths-base" d="M-20 146C111 174 182 91 288 125C393 159 455 276 570 269C669 263 729 176 825 185C950 196 1020 320 1224 273" />
      <path className="background-paths-base" d="M-22 290C102 324 167 247 281 258C398 269 455 380 568 386C682 392 760 299 867 307C992 317 1086 439 1220 420" />
      <path className="background-paths-base" d="M12 430C132 452 205 396 298 420C402 447 485 554 620 553C739 551 794 452 903 463C1029 477 1097 573 1232 554" />
      <path className="background-paths-glow" d="M-20 146C111 174 182 91 288 125C393 159 455 276 570 269C669 263 729 176 825 185C950 196 1020 320 1224 273" />
      <path className="background-paths-glow alt" d="M-22 290C102 324 167 247 281 258C398 269 455 380 568 386C682 392 760 299 867 307C992 317 1086 439 1220 420" />
    </svg>
  );
}

function FocusRailVisual() {
  const phases = [
    ["Plan", "Capacity, windows, and depot fit"],
    ["Live", "Exceptions, ETAs, and route health"],
    ["Replan", "Publish the cleanest recovery path"],
  ];

  return (
    <div className="focus-rail-visual" aria-label="Plan, live, and replan lifecycle">
      <div className="focus-rail-line" />
      {phases.map(([title, copy], index) => (
        <div className="focus-rail-step" key={title}>
          <div className={`focus-rail-node ${index === 1 ? "active" : ""}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="focus-rail-text">
            <strong>{title}</strong>
            <p>{copy}</p>
          </div>
          <ArrowUpRight size={16} />
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product, index }) {
  const Icon = product.icon;
  return (
    <article className={`product-card ${product.accent}`} style={{ animationDelay: `${index * 80}ms` }}>
      <div className="card-icon">
        <Icon size={25} />
      </div>
      <p className="eyebrow">{product.eyebrow}</p>
      <h3>{product.name}</h3>
      <p>{product.summary}</p>
      <div className="metric-row">
        <strong>{product.metric}</strong>
        <span>{product.metricLabel}</span>
      </div>
      <Link to={`/products/${product.slug}`}>
        Explore {product.name.replace("Routeza ", "")} <ArrowRight size={17} />
      </Link>
    </article>
  );
}

function ProductConsole({ product, compact = false }) {
  const Icon = product.icon;
  const rows = product.slug === "plan"
    ? [["Depot balance", "Clean", 88], ["Driver capacity", "Review", 72], ["Service windows", "Tight", 64]]
    : product.slug === "live"
      ? [["Route 12", "On time", 91], ["Route 18", "Traffic", 68], ["Cold-chain van", "Stable", 84]]
      : [["Scenario A", "Save 42 min", 83], ["Scenario B", "Protect cold stop", 77], ["Scenario C", "Move pickup", 71]];

  return (
    <motion.div className={`product-console ${compact ? "compact" : ""}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
      <div className="console-top">
        <div>
          <span>{product.name}</span>
          <strong>{product.eyebrow}</strong>
        </div>
        <Icon size={24} />
      </div>
      <div className="console-map">
        <RouteMotion small />
      </div>
      <div className="console-rows">
        {rows.map(([label, status, value], index) => (
          <div className="console-row" key={label}>
            <div>
              <span>{label}</span>
              <strong>{status}</strong>
            </div>
            <div className="bar-track">
              <motion.i initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 0.25 + index * 0.1, duration: 0.65 }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RouteMotion({ small = false }) {
  const points = small
    ? [[18, 78], [35, 42], [58, 58], [76, 25], [88, 62]]
    : [[12, 72], [28, 42], [47, 54], [63, 24], [82, 36], [91, 66]];

  const path = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="route-svg" role="img" aria-label="Route with moving vehicle marker">
      <defs>
        <linearGradient id={`routeGradient-${small ? "s" : "l"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#43D6B2" />
          <stop offset="100%" stopColor="#C9F23D" />
        </linearGradient>
      </defs>
      <path className="grid-line" d="M8 20 H92 M8 42 H92 M8 64 H92 M22 10 V90 M48 10 V90 M76 10 V90" />
      <path className="route-shadow" d={path} />
      <motion.path
        className="route-line"
        d={path}
        pathLength="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        stroke={`url(#routeGradient-${small ? "s" : "l"})`}
      />
      {points.map(([x, y], index) => (
        <motion.circle key={`${x}-${y}`} cx={x} cy={y} r={index === 0 || index === points.length - 1 ? 4.5 : 3.6} className={index === 2 ? "risk-node" : "route-node"} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + index * 0.08 }} />
      ))}
      <motion.circle r="3.2" className="vehicle-dot" initial={{ cx: points[0][0], cy: points[0][1] }} animate={{ cx: points.at(-1)[0], cy: points.at(-1)[1] }} transition={{ duration: 3.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
    </svg>
  );
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <div>
        <p className="eyebrow">Ready for a better route day?</p>
        <h2>Bring Routeza into your planning, live dispatch, and replan workflow.</h2>
      </div>
      <Link className="button button-primary" to="/demo">
        Request demo <ArrowRight size={18} />
      </Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-company">
        <Link className="brand footer-brand" to="/">
          <LogoMark />
          <span>Routeza</span>
        </Link>
        <p>Route operations software for delivery fleets, field service teams, and cold-chain operators across Poland and the wider EU market.</p>
        <div className="footer-contact">
          <span><MapPinned size={16} /> Grzybowska 87, 00-844 Warszawa, Poland</span>
          <a href="mailto:sales@routeza.io"><Mail size={16} /> sales@routeza.io</a>
          <a href="tel:+48221234567"><Phone size={16} /> +48 22 123 45 67</a>
        </div>
        <div className="footer-socials" aria-label="Social media">
          {socialLinks.map(([label, href, icon]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <SocialIcon kind={icon} />
            </a>
          ))}
        </div>
      </div>
      <div className="footer-nav-grid">
        {footerGroups.map((group) => (
          <div className="footer-column" key={group.title}>
            <strong>{group.title}</strong>
            {group.links.map(([label, href]) => (
              <SiteLink key={label} to={href}>
                {label}
              </SiteLink>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 Routeza</span>
        <span>Built for live route operations</span>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="#0B2E2B" />
      <path d="M14 14H34L18 35H35" fill="none" stroke="#E9FF6A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="14" r="4" fill="#43D6B2" />
    </svg>
  );
}

function SocialIcon({ kind }) {
  if (kind === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
        <path d="M6.6 8.2a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8ZM5.4 9.6h2.4v8.8H5.4Zm4 0h2.3v1.2h.1c.4-.8 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7v4.4H16V15c0-1-.1-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v3.5H9.4Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.1" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.2" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
      <path d="M21 8.5a2.6 2.6 0 0 0-1.8-1.8C17.7 6.2 12 6.2 12 6.2s-5.7 0-7.2.5A2.6 2.6 0 0 0 3 8.5c-.5 1.5-.5 3.5-.5 3.5s0 2 .5 3.5a2.6 2.6 0 0 0 1.8 1.8c1.5.5 7.2.5 7.2.5s5.7 0 7.2-.5a2.6 2.6 0 0 0 1.8-1.8c.5-1.5.5-3.5.5-3.5s0-2-.5-3.5ZM10 14.9v-5.8L15 12Z" fill="currentColor" />
    </svg>
  );
}

function SiteLink({ to, children, className }) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto:") || to.startsWith("tel:");

  if (isExternal) {
    const externalProps = to.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
    return (
      <a className={className} href={to} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
      {children}
    </motion.div>
  );
}

function getWorkflow(slug) {
  if (slug === "plan") {
    return [
      ["Import orders", "Load stops, service windows, vehicle capacity, depots, and driver availability.", DatabaseZap],
      ["Optimize constraints", "Balance travel time against promised windows, cold-chain needs, and local fleet rules.", Gauge],
      ["Review and publish", "Let planners inspect exceptions before dispatching routes to drivers.", ClipboardCheck],
    ];
  }
  if (slug === "live") {
    return [
      ["Watch every route", "Track progress, ETAs, and driver status from one operational board.", Activity],
      ["Spot exceptions", "Surface traffic, late stops, and temperature-sensitive risk before escalation.", Bell],
      ["Communicate clearly", "Keep dispatchers, drivers, and customers aligned as routes evolve.", Globe2],
    ];
  }
  return [
    ["Detect the break", "Identify the route, stop, driver, and customer promises affected by the change.", Zap],
    ["Compare scenarios", "Choose between faster recovery, cold-chain protection, capacity balance, or priority stops.", PanelTop],
    ["Push changes", "Publish clean driver instructions and keep a record of why the replan happened.", PackageCheck],
  ];
}

export default App;
