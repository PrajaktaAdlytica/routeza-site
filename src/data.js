import {
  Activity,
  Boxes,
  ClipboardCheck,
  Gauge,
  MapPinned,
  RadioTower,
  RefreshCw,
  Route,
  ShieldCheck,
  Snowflake,
  Truck,
  UserRoundCheck,
} from "lucide-react";

export const products = {
  plan: {
    slug: "plan",
    name: "Roviaza Plan",
    shortName: "Plan",
    eyebrow: "Before dispatch",
    time: "06:10",
    icon: Route,
    headline: "Build a day that can actually run.",
    summary:
      "Turn orders, jobs, shifts, vehicles, depots, and service promises into routes that are feasible before anyone leaves.",
    map: "/assets/product/roviaza-map-plan.webp",
    status: "Feasible",
    accent: "blue",
    problem:
      "A route can look efficient on a map and still fail when capacity, driver eligibility, service windows, and cold-chain work collide.",
    response:
      "Roviaza Plan validates the operating inputs, applies the constraint set, and gives planners a reviewable route plan with unresolved conflicts kept visible.",
    features: [
      ["Import validation", "Catch missing windows, vehicle details, and conflicting inputs before optimisation begins."],
      ["Constraint-aware routing", "Plan around service windows, capacity, skills, depots, and vehicle eligibility."],
      ["Feasibility explanations", "Understand why work does not fit instead of receiving a generic warning."],
      ["Planner control", "Review balance, make overrides, and approve the dispatch plan with the exceptions still visible."],
    ],
    steps: ["Load operating data", "Validate conflicts", "Build feasible options", "Review route balance", "Approve dispatch"],
    metrics: [
      ["Routes", "18"],
      ["Stops", "142"],
      ["Capacity", "78%"],
      ["Cold-chain", "Protected"],
    ],
    faq: [
      ["Can planners edit a generated route?", "Yes. The demonstration keeps manual review and approval central to the workflow."],
      ["What inputs does planning require?", "Orders or jobs, locations, service windows, depots, vehicles, drivers, and the constraints relevant to the operation."],
      ["Does Roviaza replace our order system?", "No. Roviaza is positioned as an operating layer that receives work and returns route decisions."],
    ],
  },
  live: {
    slug: "live",
    name: "Roviaza Live",
    shortName: "Live",
    eyebrow: "After dispatch",
    time: "09:12",
    icon: RadioTower,
    headline: "See the day diverge before commitments fail.",
    summary:
      "Turn route progress and emerging exceptions into an ordered operational decision queue while normal work remains quiet.",
    map: "/assets/product/roviaza-map-live.webp",
    status: "Action required",
    accent: "coral",
    problem:
      "A traffic delay is not one isolated alert. It can threaten downstream service windows, driver capacity, vehicle suitability, and customer promises.",
    response:
      "Roviaza Live connects the cause to the affected routes and commitments, then shows dispatchers how long they have to intervene.",
    features: [
      ["Route health", "See planned versus actual progress without turning every movement into an alert."],
      ["Exception priority", "Separate watch items, at-risk commitments, and work that needs action now."],
      ["Downstream impact", "Connect one disruption to affected stops, windows, drivers, and vehicles."],
      ["Decision queue", "Give dispatchers a clear order of operations before opening a recovery scenario."],
    ],
    steps: ["Observe route health", "Detect disruption", "Trace downstream impact", "Prioritise action", "Open Replan"],
    metrics: [
      ["Affected routes", "1"],
      ["Stops at risk", "4"],
      ["Capacity", "91%"],
      ["Time to act", "05 min"],
    ],
    faq: [
      ["Does Live show every vehicle movement?", "The product direction prioritises route health and operational exceptions rather than map movement for its own sake."],
      ["Can dispatchers see why a stop is at risk?", "Yes. Cause, affected commitments, and the available intervention window are shown together."],
      ["Does Live automatically change active work?", "No. Route changes remain subject to dispatcher review and approval."],
    ],
  },
  replan: {
    slug: "replan",
    name: "Roviaza Replan",
    shortName: "Replan",
    eyebrow: "During disruption",
    time: "09:17",
    icon: RefreshCw,
    headline: "Recover the operation without creating the next disruption.",
    summary:
      "Compare feasible recovery paths, understand the trade-offs, and publish a dispatcher-approved response to the affected routes.",
    map: "/assets/product/roviaza-map-replan.webp",
    status: "Recovery ready",
    accent: "lime",
    problem:
      "A fast reroute can protect one stop while quietly creating overtime, capacity pressure, or a new cold-chain risk somewhere else.",
    response:
      "Roviaza Replan compares service, distance, workload, and new risk before recommending a scenario and explaining why.",
    features: [
      ["Scenario generation", "Create feasible responses around the active routes and protected commitments."],
      ["Trade-off comparison", "Compare service level, added distance, driver load, overtime, and cold-chain feasibility."],
      ["Human approval", "Keep the dispatcher in control of every published route change."],
      ["Decision history", "Record the selected scenario, reason, operator, time, and operational impact."],
    ],
    steps: ["Select affected work", "Generate scenarios", "Compare trade-offs", "Approve recovery", "Publish and record"],
    metrics: [
      ["Scenarios", "3"],
      ["Stops protected", "4"],
      ["Added distance", "+6.2 km"],
      ["Cold-chain", "Protected"],
    ],
    faq: [
      ["How is a scenario recommended?", "The demonstration recommendation protects the priority window, avoids overtime, and introduces the least operational risk."],
      ["Can the dispatcher choose another scenario?", "Yes. The recommendation is explained, but the dispatcher makes the final selection."],
      ["What happens after approval?", "The affected work receives a feasible next step and the decision event remains visible in the operating history."],
    ],
  },
};

export const industries = {
  delivery: {
    slug: "delivery",
    name: "Delivery companies",
    icon: Truck,
    mode: "live",
    headline: "Keep dense delivery routes moving after dispatch.",
    summary: "Protect ETA commitments, urgent pickups, and failed-stop recovery across same-day and last-mile operations.",
    image: "/assets/story/roviaza-warsaw-traffic.webp",
    constraints: ["Dense urban stops", "Promised delivery windows", "Cancellations and failed stops", "Urgent pickup insertion"],
    scenario:
      "A Warsaw route loses time in traffic while a customer cancels and an urgent pickup enters the same service area.",
  },
  "field-service": {
    slug: "field-service",
    name: "Field service teams",
    icon: UserRoundCheck,
    mode: "plan",
    headline: "Match the right technician to a day that keeps changing.",
    summary: "Plan around technician skills, appointment windows, parts capacity, territories, and urgent work.",
    image: "/assets/story/roviaza-driver-recovery.webp",
    constraints: ["Technician eligibility", "Appointment windows", "Parts and vehicle capacity", "Urgent job insertion"],
    scenario:
      "An urgent service visit enters a full schedule and must be assigned without breaking existing appointments or skill requirements.",
  },
  "cold-chain": {
    slug: "cold-chain",
    name: "Cold-chain operators",
    icon: Snowflake,
    mode: "replan",
    headline: "Protect priority windows through every route change.",
    summary: "Keep vehicle suitability, time exposure, approval, and decision evidence visible during recovery.",
    image: "/assets/story/roviaza-cold-chain-depot.webp",
    constraints: ["Vehicle suitability", "Priority service windows", "Condition-risk inputs", "Approval and decision history"],
    scenario:
      "A temperature-sensitive delivery is threatened by traffic and capacity pressure while an urgent pickup enters the route.",
  },
  "local-fleets": {
    slug: "local-fleets",
    name: "Local fleets",
    icon: MapPinned,
    mode: "live",
    headline: "Give regional operations a calmer control layer.",
    summary: "Coordinate mixed vehicles, local depots, and practical day-of changes with a small dispatch team.",
    image: "/assets/story/roviaza-dispatch-room.webp",
    constraints: ["Mixed vehicle types", "Regional depot rules", "Limited dispatcher capacity", "Practical day-of changes"],
    scenario:
      "A regional team balances local knowledge with route progress when driver availability changes halfway through the day.",
  },
};

export const packages = [
  {
    name: "Planning",
    descriptor: "Build feasible route days",
    copy: "For teams replacing manual route construction and fragmented feasibility checks.",
    includes: ["Roviaza Plan", "One operating region", "Planning workspace", "Import setup", "Standard onboarding"],
  },
  {
    name: "Live Operations",
    descriptor: "See what needs attention",
    copy: "For teams that need route health, planned-versus-actual context, and exception visibility.",
    includes: ["Roviaza Plan and Live", "Dispatcher workspace", "Exception workflows", "Operational reporting", "Rollout support"],
  },
  {
    name: "Full Route Control",
    descriptor: "Recover active routes",
    copy: "For teams that need scenario-based recovery and controlled publication across active work.",
    includes: ["Plan, Live, and Replan", "Scenario comparison", "Approval workflows", "Decision history", "Multi-region options"],
  },
];

export const buyerFaq = [
  [
    "How is Roviaza different from route-planning software?",
    "Route planning is the beginning of the Roviaza story. The platform is designed to connect feasible planning with live exception understanding and dispatcher-approved recovery.",
  ],
  [
    "Can Roviaza work with our TMS or field-service system?",
    "The intended boundary is to receive operational work and relevant constraints from existing systems, then return route decisions. Specific connectors will only be published after they are verified.",
  ],
  [
    "Does Roviaza automatically publish route changes?",
    "No. Roviaza recommends and explains recovery scenarios; the dispatcher reviews and approves the selected change.",
  ],
  [
    "How does Roviaza support cold-chain operations?",
    "Roviaza can represent vehicle suitability, priority windows, and condition-risk inputs in planning and recovery. It does not claim to monitor temperature or establish compliance on its own.",
  ],
  [
    "How is operational data handled in the EU?",
    "The production security page will publish verified hosting, retention, subprocessors, and data-flow details before launch. The demonstration does not make unsupported compliance claims.",
  ],
  [
    "What does a pilot involve?",
    "A pilot starts with one difficult operating day, a defined depot or team, the relevant inputs, and a clear set of operational decisions to evaluate.",
  ],
];

export const platformLayers = [
  [Boxes, "Operational inputs", "Orders, jobs, depots, shifts, vehicles, drivers, and promised windows enter one shared model."],
  [ClipboardCheck, "Validation and constraints", "Input quality, eligibility, capacity, windows, and protected commitments remain explicit."],
  [Activity, "Live route state", "Planned work, execution progress, and emerging exceptions stay connected."],
  [Gauge, "Recovery intelligence", "Feasible scenarios expose trade-offs before a decision is made."],
  [ShieldCheck, "Human control", "Roles, approval, publication, and decision history frame every route change."],
];
