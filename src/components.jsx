import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Mail,
  MapPinned,
  Menu,
  Newspaper,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { industries, products } from "./data.js";

export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.56, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function BrandLogo({ reversed = false, className = "" }) {
  return (
    <Link className={`brand-logo ${className}`.trim()} to="/" aria-label="Roviaza home">
      <img
        src={reversed ? "/assets/brand/roviaza-logo-primary-reversed.svg" : "/assets/brand/roviaza-logo-primary.svg"}
        alt="Roviaza"
      />
    </Link>
  );
}

const productLinks = Object.values(products).map((product) => ({
  label: product.shortName,
  detail: product.eyebrow,
  to: `/products/${product.slug}`,
  Icon: product.icon,
}));

const solutionLinks = Object.values(industries).map((industry) => ({
  label: industry.name,
  detail: industry.summary,
  to: `/industries/${industry.slug}`,
  Icon: industry.icon,
}));

const companyLinks = [
  { label: "About", detail: "Purpose and operating principles", to: "/company/about", Icon: Building2 },
  { label: "Funding announcement", detail: "Jun 9, 2026 · Backed by Dlabs", to: "/news/funding-announcement", Icon: Newspaper },
  { label: "Security", detail: "Platform boundary and buyer questions", to: "/security", Icon: ShieldCheck },
  { label: "Contact", detail: "Sales and general enquiries", to: "/company/contact", Icon: Mail },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const overHero = location.pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      const threshold = location.pathname === "/" ? window.innerHeight * 0.82 : 48;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`site-header ${overHero ? "site-header-over-hero" : "site-header-solid"}`}>
      <BrandLogo reversed={overHero} />
      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavDropdown
          label="Products"
          items={[...productLinks, { label: "Platform", detail: "One operating layer", to: "/platform" }]}
          open={openDropdown === "products"}
          onOpen={() => setOpenDropdown("products")}
          onClose={() => setOpenDropdown(null)}
        />
        <NavDropdown
          label="Solutions"
          items={solutionLinks}
          open={openDropdown === "solutions"}
          onOpen={() => setOpenDropdown("solutions")}
          onClose={() => setOpenDropdown(null)}
        />
        <NavLink to="/platform">Platform</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavDropdown
          label="Company"
          items={companyLinks}
          open={openDropdown === "company"}
          onOpen={() => setOpenDropdown("company")}
          onClose={() => setOpenDropdown(null)}
        />
      </nav>
      <div className="nav-actions">
        <Link className="nav-signin" to="/sign-in">Sign in</Link>
        <Link className={`button ${overHero ? "button-lime" : "button-dark"}`} to="/demo">
          Book a walkthrough <ArrowRight size={16} />
        </Link>
      </div>
      <button
        className="icon-button mobile-toggle"
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <MobileGroup title="Products" items={productLinks} />
            <MobileGroup title="Solutions" items={solutionLinks} />
            <MobileGroup title="Company" items={companyLinks} />
            <div className="mobile-sheet-utility">
              <Link to="/platform">Platform</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/sign-in">Sign in</Link>
            </div>
            <Link className="button button-lime" to="/demo">
              Book a walkthrough <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavDropdown({ label, items, open, onOpen, onClose }) {
  return (
    <div className="nav-dropdown" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-expanded={open}
        onClick={onOpen}
        onFocus={onOpen}
      >
        {label} <ChevronDown size={14} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-dropdown-panel"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
          >
            {items.map(({ label: itemLabel, detail, to, Icon }) => (
              <Link key={to} to={to}>
                {Icon && <Icon size={19} />}
                <span>
                  <strong>{itemLabel}</strong>
                  <small>{detail}</small>
                </span>
                <ArrowRight size={15} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileGroup({ title, items }) {
  return (
    <div className="mobile-group">
      <span>{title}</span>
      {items.map((item) => (
        <Link key={item.to} to={item.to}>{item.label}</Link>
      ))}
    </div>
  );
}

export function ProductConsole({ mode = "plan", liveState = 0, compact = false, interactive = true }) {
  const product = products[mode];
  const [selectedRoute, setSelectedRoute] = useState(0);
  const routeNames = ["PL-204", "PL-118", "PL-306", "PL-072"];
  const alerts = [
    ["Traffic incident", "Puławska", "Critical"],
    ["Service window", "Stop 12", "At risk"],
    ["Driver capacity", "91% used", "Watch"],
  ];

  return (
    <div className={`product-console product-console-${mode} ${compact ? "product-console-compact" : ""}`}>
      <div className="console-toolbar">
        <span className="demo-label">Illustrative demo data</span>
        <div className="mode-switcher" aria-label="Product mode">
          {Object.values(products).map((item) => (
            <Link className={item.slug === mode ? "active" : ""} key={item.slug} to={`/products/${item.slug}`}>
              {item.shortName}
            </Link>
          ))}
        </div>
        <span className={`system-status status-${product.accent}`}>{product.status}</span>
      </div>
      <div className="console-body">
        <aside className="route-list">
          <div className="console-panel-heading">
            <span>Routes</span>
            <small>12 active</small>
          </div>
          {routeNames.map((name, index) => (
            <button
              type="button"
              key={name}
              className={selectedRoute === index ? "active" : ""}
              onClick={() => interactive && setSelectedRoute(index)}
            >
              <span>{name}</span>
              <small>{index === 0 ? "K. Nowak" : ["A. Kowalska", "P. Nowak", "M. Zielińska"][index - 1]}</small>
              <em>{index === 0 && mode === "live" ? "Delay" : index === 0 && mode === "replan" ? "Recovering" : "On time"}</em>
            </button>
          ))}
          <div className="capacity-block">
            <span>Capacity</span>
            <strong>{mode === "plan" ? "78%" : mode === "live" ? "91%" : "84%"}</strong>
            <div><i /></div>
          </div>
        </aside>
        <div className="console-map">
          <img src={product.map} alt={`${product.name} illustrative Poland route map`} />
          <div className="map-caption">
            <span>Route {routeNames[selectedRoute]}</span>
            <strong>{mode === "plan" ? "Ready for review" : mode === "live" ? "Downstream risk detected" : "Scenario A selected"}</strong>
          </div>
        </div>
        <aside className="operation-panel">
          <div className="operation-time">
            <Clock3 size={17} />
            <strong>{product.time}</strong>
            <small>Tuesday · Warszawa</small>
          </div>
          {mode === "plan" && (
            <div className="operation-details">
              <span>Route PL-204</span>
              <strong>Mokotów depot</strong>
              <p>18 stops · 142 km</p>
              <p>Cold-chain 10:00–10:25</p>
              <span className="text-success"><Check size={14} /> Feasible</span>
            </div>
          )}
          {mode === "live" && (
            <div className="alert-stack">
              {alerts.map(([title, detail, level], index) => (
                <div className={index <= liveState ? "active" : ""} key={title}>
                  <span>{level}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
          )}
          {mode === "replan" && (
            <div className="operation-details">
              <span>Recommended recovery</span>
              <strong>Reorder + detour</strong>
              <p>Cold-chain protected</p>
              <p>No overtime · +6.2 km</p>
              <span className="text-success"><Check size={14} /> Lowest operational risk</span>
            </div>
          )}
        </aside>
      </div>
      <div className="console-timeline">
        {product.steps.map((step, index) => (
          <div key={step} className={index < (mode === "plan" ? 5 : mode === "live" ? 3 : 4) ? "complete" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, copy, light = false, align = "left" }) {
  return (
    <Reveal className={`section-heading section-heading-${align} ${light ? "section-heading-light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-lead">{copy}</p>}
    </Reveal>
  );
}

export function FAQ({ items, title = "Serious buyer questions" }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section content-width">
      <SectionHeading eyebrow="Questions before a pilot" title={title} />
      <div className="faq-list">
        {items.map(([question, answer], index) => (
          <div className={open === index ? "open" : ""} key={question}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{question}</strong>
              <ChevronDown size={20} />
            </button>
            <AnimatePresence initial={false}>
              {open === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

const footerGroups = [
  ["Products", [["Plan", "/products/plan"], ["Live", "/products/live"], ["Replan", "/products/replan"], ["Platform", "/platform"]]],
  ["Solutions", [["Delivery", "/industries/delivery"], ["Field service", "/industries/field-service"], ["Cold chain", "/industries/cold-chain"], ["Local fleets", "/industries/local-fleets"]]],
  ["Company", [["About", "/company/about"], ["Funding announcement", "/news/funding-announcement"], ["Security", "/security"], ["Contact", "/company/contact"], ["Book a walkthrough", "/demo"]]],
  ["Legal", [["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"], ["Cookies", "/legal/cookies"], ["Pricing", "/pricing"]]],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <div className="footer-brand-column">
          <BrandLogo reversed />
          <p>The live coordination layer for routes that change after dispatch.</p>
          <span><MapPinned size={16} /> Warszawa, Poland</span>
          <div className="footer-credibility" aria-label="Roviaza company record">
            <strong>Backed by Dlabs</strong>
            <span>$485K funding</span>
            <div>
              <a href="https://d-labs-site.vercel.app/companies" target="_blank" rel="noreferrer noopener">
                Dlabs <ExternalLink size={12} />
              </a>
              <a href="https://www.linkedin.com/company/roviaza/" target="_blank" rel="noreferrer noopener">
                LinkedIn <ExternalLink size={12} />
              </a>
              <a href="https://www.crunchbase.com/organization/roviaza" target="_blank" rel="noreferrer noopener">
                Crunchbase <ExternalLink size={12} />
              </a>
            </div>
          </div>
          <small>Frontend demonstration · Illustrative product data</small>
        </div>
        <div className="footer-links">
          {footerGroups.map(([title, links]) => (
            <div key={title}>
              <strong>{title}</strong>
              {links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-utility content-width">
        <span>© 2026 Roviaza</span>
        <span>Poland and European Union</span>
        <span>roviaza.com</span>
      </div>
    </footer>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="content-width">
        <img src="/assets/brand/roviaza-logo-mark.svg" alt="" />
        <div>
          <p className="eyebrow">One difficult operating day</p>
          <h2>Your route plan will change. Your operation does not have to lose control.</h2>
        </div>
        <div className="final-cta-actions">
          <Link className="button button-lime" to="/demo">
            Book an operational walkthrough <CalendarClock size={17} />
          </Link>
          <Link className="text-arrow-link light-link" to="/company/contact">
            Contact the team <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, copy, children, dark = false }) {
  return (
    <section className={`page-hero ${dark ? "page-hero-dark" : ""}`}>
      <div className="content-width page-hero-inner">
        <Reveal className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{copy}</p>
          <div className="page-hero-actions">
            <Link className={dark ? "button button-lime" : "button button-dark"} to="/demo">
              Book a walkthrough <ArrowRight size={17} />
            </Link>
            <Link className={`text-arrow-link ${dark ? "light-link" : ""}`} to="/products/replan">
              Explore Replan <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function DemoNotice({ children }) {
  return (
    <div className="demo-notice">
      <ShieldCheck size={18} />
      <p>{children}</p>
    </div>
  );
}
