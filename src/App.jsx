import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navigation } from "./components.jsx";
import HomePage from "./HomePage.jsx";
import {
  AboutPage,
  ContactPage,
  DemoPage,
  FundingAnnouncementPage,
  IndustryPage,
  LegalPage,
  NotFoundPage,
  PlatformPage,
  PricingPage,
  ProductPage,
  SecurityPage,
  SignInPage,
} from "./Pages.jsx";

const metadata = {
  "/": ["Roviaza | Live route operations for Poland and Europe", "Plan feasible routes, see disruption early, and compare recovery scenarios with Roviaza’s human-controlled logistics AI platform."],
  "/products/plan": ["Roviaza Plan | Constraint-aware route planning", "Build feasible route days around service windows, capacity, drivers, vehicles, and operational constraints."],
  "/products/live": ["Roviaza Live | Live route health and exception visibility", "See route health, disruption, downstream impact, and the operational decisions that need attention."],
  "/products/replan": ["Roviaza Replan | Scenario-based route recovery", "Compare feasible recovery scenarios, approve a response, and publish route changes with decision history."],
  "/platform": ["Roviaza Platform | From plan to recovery", "Connect operational inputs, route state, constraints, recovery decisions, and human approval."],
  "/pricing": ["Roviaza Packaging | Planning, Live Operations, Full Route Control", "Explore rollout options for route planning, live operations, and scenario-based recovery."],
  "/industries/delivery": ["Roviaza for Delivery Companies | Live Route Operations", "Keep dense delivery routes feasible through traffic, cancellations, urgent pickups, and changing service windows."],
  "/industries/field-service": ["Roviaza for Field Service Teams | Live Route Operations", "Coordinate technician eligibility, appointment windows, parts, capacity, and urgent work across a changing day."],
  "/industries/cold-chain": ["Roviaza for Cold-Chain Operators | Protected Route Recovery", "Protect priority windows and vehicle constraints while dispatchers compare and approve feasible route changes."],
  "/industries/local-fleets": ["Roviaza for Local Fleets | Practical Route Control", "Give regional operators a calmer way to plan, monitor, and recover mixed fleets during the day."],
  "/company/about": ["About Roviaza | Human-controlled logistics AI", "Learn why Roviaza focuses on the controlled decision between route disruption and recovery."],
  "/company/contact": ["Contact Roviaza", "Start a conversation about delivery, field service, cold-chain, or local fleet operations."],
  "/news/funding-announcement": ["Roviaza secures $485K in funding from Dlabs", "Roviaza is part of Dlabs’ global portfolio of companies building logistics intelligence for complex operating environments."],
  "/demo": ["Book a Roviaza operational walkthrough", "Show Roviaza where your route day breaks and prepare a product walkthrough around the operation."],
  "/sign-in": ["Sign in | Roviaza", "Access the Roviaza route operations workspace."],
  "/security": ["Security | Roviaza", "Review the production security and data-handling questions Roviaza must verify before launch."],
  "/legal/privacy": ["Privacy Notice | Roviaza", "Read the current Roviaza demonstration privacy notice and its production readiness boundary."],
  "/legal/terms": ["Website Terms | Roviaza", "Read the current terms for the Roviaza frontend demonstration."],
  "/legal/cookies": ["Cookie Notice | Roviaza", "Read the current cookie notice for the Roviaza frontend demonstration."],
};

export default function App() {
  const location = useLocation();
  const hideShellFooter = location.pathname === "/sign-in";

  useEffect(() => {
    const knownRoute = Boolean(metadata[location.pathname]);
    const [title, description] = metadata[location.pathname] || [
      "Page not found | Roviaza",
      "The requested route is not part of the Roviaza website.",
    ];
    const canonicalUrl = knownRoute
      ? new URL(location.pathname, "https://roviaza.com").href
      : "https://roviaza.com/";

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="robots"]')?.setAttribute("content", knownRoute ? "index, follow" : "noindex, nofollow");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <ScrollRevelation />
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/industries/:slug" element={<IndustryPage />} />
              <Route path="/company/about" element={<AboutPage />} />
              <Route path="/company/contact" element={<ContactPage />} />
              <Route path="/news/funding-announcement" element={<FundingAnnouncementPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/legal/:slug" element={<LegalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!hideShellFooter && <Footer />}
    </div>
  );
}

function ScrollRevelation() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = [...document.querySelectorAll("#main-content section")];
    const itemSelectors = [
      ".event-sequence > div",
      ".live-story-steps > article",
      ".scenario-comparison > button",
      ".coordination-rail > div",
      ".product-loop-rail > a",
      ".industry-rows > a",
      ".illustrative-outcomes > div",
      ".testimonial-person",
      ".package-table > div",
      ".faq-list > div",
      ".feature-ledger-row",
      ".workflow-line > div",
      ".metric-ledger > div",
      ".connected-products a",
      ".platform-layer",
      ".constraint-ledger > div",
      ".implementation-strip > div:last-child > div",
      ".pricing-table-row",
      ".principles-ledger > div",
      ".security-topics > div",
      ".funding-record > div",
      ".company-proof-stats > div",
      ".funding-article-aside dl > div",
    ];
    const items = [...document.querySelectorAll(itemSelectors.join(","))];

    sections.forEach((section) => section.classList.add("scroll-reveal-section"));
    items.forEach((item, index) => {
      item.classList.add("scroll-reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 55}ms`);
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      [...sections, ...items].forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 18% 0px" },
    );

    [...sections, ...items].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
