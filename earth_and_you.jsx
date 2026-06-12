import { useState } from "react";

const DEV = "Joe B.S. Robinson Jr.";
const APP = "Earth and You";
const VERSION = "1.0.0";

const COLORS = {
  igneous: "#D85A30",
  sedimentary: "#BA7517",
  metamorphic: "#533AB7",
  mineral: "#1D9E75",
  structure: "#185FA5",
  hazard: "#A32D2D",
  term: "#3C3489",
};

const TABS = [
  { id: "home", label: "Home", icon: "ti-home" },
  { id: "lessons", label: "Lessons", icon: "ti-school" },
  { id: "rocks", label: "Rock Types", icon: "ti-diamond" },
  { id: "minerals", label: "Minerals", icon: "ti-crystal-ball" },
  { id: "glossary", label: "Glossary", icon: "ti-book" },
  { id: "maps", label: "Geo Maps", icon: "ti-map" },
  { id: "quiz", label: "Quiz", icon: "ti-brain" },
  { id: "about", label: "About", icon: "ti-info-circle" },
];

const ROCKS = [
  {
    type: "Igneous",
    color: COLORS.igneous,
    icon: "ti-flame",
    definition: "Rocks formed from the cooling and solidification of magma or lava. The word igneous comes from the Latin ignis, meaning fire.",
    subtypes: [
      { name: "Granite", desc: "Coarse-grained intrusive rock rich in quartz and feldspar. Forms deep underground.", texture: "Coarse-grained", origin: "Intrusive" },
      { name: "Basalt", desc: "Fine-grained extrusive rock. The most common rock on Earth's surface and ocean floors.", texture: "Fine-grained", origin: "Extrusive" },
      { name: "Obsidian", desc: "Volcanic glass formed when lava cools rapidly. Used as cutting tools in ancient times.", texture: "Glassy", origin: "Extrusive" },
      { name: "Pumice", desc: "Highly porous volcanic rock formed by frothy lava. So light it can float on water.", texture: "Vesicular", origin: "Extrusive" },
      { name: "Rhyolite", desc: "Fine-grained extrusive rock equivalent to granite in composition.", texture: "Fine-grained", origin: "Extrusive" },
      { name: "Gabbro", desc: "Coarse-grained intrusive rock equivalent to basalt. Forms the lower oceanic crust.", texture: "Coarse-grained", origin: "Intrusive" },
    ],
  },
  {
    type: "Sedimentary",
    color: COLORS.sedimentary,
    icon: "ti-stack-2",
    definition: "Rocks formed from the accumulation and compaction of sediment — fragments of older rocks, minerals, or organic material — over millions of years.",
    subtypes: [
      { name: "Sandstone", desc: "Formed from compressed sand grains. Often contains fossils and is porous enough to hold groundwater.", texture: "Medium-grained", origin: "Clastic" },
      { name: "Limestone", desc: "Primarily composed of calcium carbonate from marine organisms. Caves and karst landscapes form in limestone.", texture: "Fine to coarse", origin: "Chemical/Biogenic" },
      { name: "Shale", desc: "Formed from compacted clay and mud. The most abundant sedimentary rock on Earth.", texture: "Fine-grained", origin: "Clastic" },
      { name: "Conglomerate", desc: "Made of large rounded pebbles cemented together. Indicates high-energy ancient environments like rivers.", texture: "Coarse-grained", origin: "Clastic" },
      { name: "Coal", desc: "Organic sedimentary rock formed from compressed plant material over millions of years.", texture: "Variable", origin: "Organic" },
      { name: "Rock Salt", desc: "Formed by evaporation of saltwater bodies. Found in thick deposits beneath many deserts.", texture: "Crystalline", origin: "Chemical" },
    ],
  },
  {
    type: "Metamorphic",
    color: COLORS.metamorphic,
    icon: "ti-arrows-exchange",
    definition: "Rocks that have been transformed by extreme heat, pressure, or chemically active fluids — changing their mineral content, texture, or both — without fully melting.",
    subtypes: [
      { name: "Marble", desc: "Metamorphosed limestone composed of recrystallized calcite. Used extensively in sculpture and architecture.", texture: "Crystalline", origin: "From Limestone" },
      { name: "Slate", desc: "Fine-grained rock that splits into thin flat sheets. Metamorphosed from shale or mudstone.", texture: "Fine-grained", origin: "From Shale" },
      { name: "Schist", desc: "Medium to coarse-grained with visible mica flakes. Shows distinct layering called foliation.", texture: "Medium-coarse", origin: "From Shale/Basalt" },
      { name: "Gneiss", desc: "Coarse-grained with alternating light and dark bands. Forms under extreme pressure and temperature.", texture: "Banded/Coarse", origin: "From Granite/Shale" },
      { name: "Quartzite", desc: "Extremely hard rock formed from sandstone. One of the most durable rocks on Earth.", texture: "Medium-grained", origin: "From Sandstone" },
      { name: "Hornfels", desc: "Dark, fine-grained rock formed by contact metamorphism close to magma intrusions.", texture: "Fine-grained", origin: "From Shale" },
    ],
  },
];

const MINERALS = [
  { name: "Quartz", hardness: 7, color: "Colorless/White", luster: "Vitreous", formula: "SiO₂", use: "Glass, electronics, gemstones" },
  { name: "Feldspar", hardness: 6, color: "Pink/White/Gray", luster: "Vitreous", formula: "KAlSi₃O₈", use: "Ceramics, glass, porcelain" },
  { name: "Calcite", hardness: 3, color: "White/Colorless", luster: "Vitreous", formula: "CaCO₃", use: "Cement, antacids, paper" },
  { name: "Pyrite", hardness: 6.5, color: "Brass-yellow", luster: "Metallic", formula: "FeS₂", use: "Sulfuric acid production" },
  { name: "Mica", hardness: 2.5, color: "Silver/Brown", luster: "Pearly", formula: "K(Mg,Fe)₃AlSi₃O₁₀", use: "Insulation, cosmetics" },
  { name: "Olivine", hardness: 6.5, color: "Olive-green", luster: "Vitreous", formula: "(Mg,Fe)₂SiO₄", use: "Refractory materials, gemstone (peridot)" },
  { name: "Magnetite", hardness: 5.5, color: "Black", luster: "Metallic", formula: "Fe₃O₄", use: "Iron ore, magnets" },
  { name: "Halite", hardness: 2.5, color: "Colorless/White", luster: "Vitreous", formula: "NaCl", use: "Table salt, food preservation" },
  { name: "Gypsum", hardness: 2, color: "White/Colorless", luster: "Pearly/Silky", formula: "CaSO₄·2H₂O", use: "Plaster of Paris, drywall" },
  { name: "Diamond", hardness: 10, color: "Colorless", luster: "Adamantine", formula: "C", use: "Cutting tools, jewelry" },
  { name: "Gold", hardness: 2.5, color: "Gold-yellow", luster: "Metallic", formula: "Au", use: "Jewelry, electronics, currency" },
  { name: "Talc", hardness: 1, color: "White/Pale green", luster: "Pearly", formula: "Mg₃Si₄O₁₀(OH)₂", use: "Talcum powder, ceramics" },
];

const GLOSSARY = [
  { term: "Lithosphere", def: "The rigid outermost shell of Earth, consisting of the crust and upper mantle. It is broken into tectonic plates." },
  { term: "Asthenosphere", def: "The semi-fluid layer of the mantle beneath the lithosphere, on which the tectonic plates move." },
  { term: "Tectonic Plates", def: "Large segments of Earth's lithosphere that move relative to one another, driven by convection currents in the mantle." },
  { term: "Subduction", def: "The process where a denser oceanic plate dives beneath a lighter continental plate at a convergent boundary." },
  { term: "Stratigraphy", def: "The study of rock layers (strata) and their sequence, used to interpret Earth's geological history." },
  { term: "Erosion", def: "The wearing away of rock and soil by water, wind, ice, or gravity and the transport of the resulting material." },
  { term: "Weathering", def: "The breakdown of rocks at or near Earth's surface through physical and chemical processes." },
  { term: "Fault", def: "A fracture in Earth's crust along which rocks on opposite sides have moved relative to each other." },
  { term: "Fold", def: "A bend or curve in rock layers caused by compressive forces in Earth's crust." },
  { term: "Magma", def: "Molten rock material found beneath Earth's surface. When it erupts onto the surface it is called lava." },
  { term: "Lava", def: "Magma that has reached Earth's surface through volcanic eruptions." },
  { term: "Epoch", def: "A subdivision of geological time shorter than a period." },
  { term: "Eon", def: "The largest division of geological time, e.g., the Phanerozoic Eon." },
  { term: "Mantle", def: "The layer of Earth between the crust and the core, constituting about 84% of Earth's volume." },
  { term: "Crust", def: "The outermost layer of Earth. Continental crust is thicker (30–70 km) and less dense than oceanic crust (5–10 km)." },
  { term: "Core", def: "Earth's innermost layer, divided into a liquid outer core and a solid inner core, composed mainly of iron and nickel." },
  { term: "Mineral", def: "A naturally occurring, inorganic solid with a definite chemical composition and crystalline structure." },
  { term: "Rock Cycle", def: "The continuous process by which rocks are formed, destroyed, altered, and reformed through geological processes." },
  { term: "Unconformity", def: "A surface of erosion or non-deposition that separates younger strata from older rocks." },
  { term: "Geomorphology", def: "The study of Earth's physical features and the processes that shape them." },
  { term: "Ore", def: "Rock or mineral from which a valuable metal or mineral can be profitably extracted." },
  { term: "Paleontology", def: "The study of ancient life through fossils — the preserved remains or traces of organisms from the past." },
  { term: "Seismology", def: "The scientific study of earthquakes and the propagation of elastic waves through the Earth." },
  { term: "Volcanism", def: "All geological phenomena associated with the movement and eruption of magma." },
  { term: "Geologic Time Scale", def: "A system used by geologists to describe the timing and relationships of events in Earth's 4.6-billion-year history." },
  { term: "Petroleum Geology", def: "The study of the origin, occurrence, movement, accumulation, and exploration of hydrocarbon fuels." },
  { term: "Aquifer", def: "An underground layer of water-bearing rock or sediment from which groundwater can be extracted." },
  { term: "Karst", def: "A topography formed from the dissolution of soluble rocks such as limestone, featuring sinkholes, caves, and springs." },
  { term: "Isostasy", def: "The state of gravitational equilibrium between Earth's crust and mantle, causing the crust to float at an elevation that depends on its thickness and density." },
  { term: "Radiometric Dating", def: "A technique used to date materials using the known decay rates of radioactive isotopes." },
];

const LESSONS = [
  {
    id: "l1",
    title: "The Structure of Earth",
    icon: "ti-world",
    color: COLORS.structure,
    content: `Earth is composed of four main layers, each with distinct properties:

INNER CORE — A solid sphere about 1,220 km in radius, composed mainly of iron and nickel. Despite temperatures reaching 5,000–6,000°C, immense pressure keeps it solid.

OUTER CORE — A liquid layer about 2,260 km thick, also iron-nickel. Its movement generates Earth's magnetic field through a dynamo effect.

MANTLE — The thickest layer at about 2,900 km. It is solid but behaves plastically over long timescales, allowing tectonic plates to move. The upper mantle forms the asthenosphere.

CRUST — Earth's thin outer shell. There are two types:
  • Continental crust: 30–70 km thick, less dense, composed of granite-like rocks
  • Oceanic crust: 5–10 km thick, denser, basaltic in composition

The crust and upper mantle together form the lithosphere, which is broken into tectonic plates. These plates move at speeds of 2–15 cm per year.`,
  },
  {
    id: "l2",
    title: "Plate Tectonics",
    icon: "ti-arrows-move",
    color: COLORS.structure,
    content: `Plate tectonics is the unifying theory of modern geology, explaining earthquakes, volcanoes, mountain ranges, and ocean basins.

THE THREE BOUNDARY TYPES:

1. DIVERGENT BOUNDARIES — Plates move apart. New oceanic crust forms as magma rises. Example: the Mid-Atlantic Ridge, where the African and South American plates separate at ~2.5 cm/year.

2. CONVERGENT BOUNDARIES — Plates move toward each other. Three scenarios occur:
   • Ocean–Ocean collision: One plate subducts, forming a trench and island arc volcanoes
   • Ocean–Continent: Oceanic plate subducts, forming coastal mountain belts (e.g. Andes)
   • Continent–Continent: Neither subducts; mountains form (e.g. Himalayas)

3. TRANSFORM BOUNDARIES — Plates slide horizontally past each other. Major earthquakes occur here. Example: the San Andreas Fault in California.

DRIVING FORCES: Convection currents in the mantle, driven by radioactive heat from Earth's interior, are the primary engine of plate movement.`,
  },
  {
    id: "l3",
    title: "The Rock Cycle",
    icon: "ti-refresh",
    color: COLORS.mineral,
    content: `The rock cycle is the continuous set of processes by which rocks of all three types are formed, modified, and transformed into one another over geological time.

THE CYCLE:

Igneous rocks form when magma cools — either underground (intrusive) or at the surface (extrusive). Over time, they are:

→ WEATHERED AND ERODED into sediment by wind, water, and ice.

→ The sediment is TRANSPORTED and DEPOSITED in layers, then COMPACTED and CEMENTED over millions of years to form Sedimentary rocks.

→ When rocks of any type are buried deeply, heat and pressure cause METAMORPHISM, producing Metamorphic rocks.

→ If temperatures rise high enough, rocks MELT back into MAGMA, completing the cycle.

KEY PROCESSES:
• Weathering: physical and chemical breakdown of rock
• Erosion: transport of broken material
• Deposition: settling of sediment
• Lithification: compaction and cementation into rock
• Metamorphism: transformation by heat and pressure
• Melting: transition back to magma
• Crystallization: magma solidifying into igneous rock`,
  },
  {
    id: "l4",
    title: "Volcanoes & Volcanic Processes",
    icon: "ti-flame",
    color: COLORS.hazard,
    content: `A volcano is an opening in Earth's crust through which magma, gases, and ash escape to the surface.

TYPES OF VOLCANOES:

SHIELD VOLCANOES — Broad, gently sloping. Formed by low-viscosity basaltic lava that flows easily. Example: Mauna Loa, Hawaii (Earth's largest volcano by volume).

STRATOVOLCANOES (COMPOSITE) — Steep, conical. Explosive eruptions alternating with lava flows. Example: Mount Fuji, Mount Pinatubo.

CINDER CONE VOLCANOES — Small, steep, built from erupted lava fragments. Example: Parícutin in Mexico.

LAVA DOMES — Slow extrusion of high-viscosity lava. Can collapse explosively.

VOLCANIC HAZARDS:
• Pyroclastic flows: fast-moving currents of hot gas and volcanic matter
• Lahars: volcanic mudflows mixed with water
• Tephra falls: ash and rock fragments
• Lava flows: slower but destructive
• Volcanic gases: sulfur dioxide, CO₂, hydrogen sulfide

WHERE VOLCANOES OCCUR:
About 75% of the world's volcanoes are along the Pacific "Ring of Fire" — a belt of subduction zones surrounding the Pacific Ocean.`,
  },
  {
    id: "l5",
    title: "Earthquakes & Seismology",
    icon: "ti-wave-sine",
    color: COLORS.hazard,
    content: `An earthquake is the sudden release of energy in Earth's crust that creates seismic waves, causing the ground to shake.

KEY TERMS:
• Focus (Hypocenter): The point underground where rupture begins
• Epicenter: The point on the surface directly above the focus
• Seismic waves: Energy waves traveling through Earth
• Magnitude: A measure of energy released (Richter/Moment scales)
• Intensity: Measure of shaking felt at a specific location (Mercalli scale)

TYPES OF SEISMIC WAVES:
P-WAVES (Primary/Compressional) — Fastest waves; travel through solids and liquids; cause back-and-forth ground motion.
S-WAVES (Secondary/Shear) — Slower than P-waves; travel through solids only; cause side-to-side motion.
SURFACE WAVES — Travel along Earth's surface; slowest but most destructive.

FAULT TYPES:
• Normal fault: crust pulls apart (extensional)
• Reverse/Thrust fault: crust is compressed
• Strike-slip fault: blocks slide horizontally (e.g. San Andreas Fault)

WHERE EARTHQUAKES OCCUR: Most occur along tectonic plate boundaries. Subduction zones (convergent boundaries) produce the deepest and strongest earthquakes.`,
  },
  {
    id: "l6",
    title: "Geologic Time",
    icon: "ti-clock-hour-9",
    color: "#0F6E56",
    content: `Earth is approximately 4.54 billion years old. Geologists organize this vast span into a hierarchy of time units.

THE GEOLOGIC TIME SCALE (from oldest to most recent):

HADEAN EON (4.54–4.0 Ga) — Formation of Earth; intense bombardment; formation of Moon.

ARCHEAN EON (4.0–2.5 Ga) — First rocks; first microbial life (stromatolites); early atmosphere.

PROTEROZOIC EON (2.5 Ga–541 Ma) — First multicellular life; Great Oxidation Event; Snowball Earth episodes.

PHANEROZOIC EON (541 Ma–Present) — Abundant hard-shelled life:
  • PALEOZOIC ERA (541–252 Ma): Cambrian explosion, fish, land plants, insects, reptiles; ends with largest extinction (96% marine species lost)
  • MESOZOIC ERA (252–66 Ma): Age of Dinosaurs; first mammals, birds, flowering plants; ends with mass extinction
  • CENOZOIC ERA (66 Ma–Present): Age of Mammals; humans appear ~300,000 years ago

DATING METHODS:
• Relative dating: using rock layers (stratigraphy) and fossils
• Radiometric dating: measuring radioactive decay (carbon-14, uranium-lead)
• Dendrochronology: tree-ring counting for recent periods`,
  },
];

const GEO_MAPS = [
  { name: "Tectonic Plates Map", desc: "Shows the boundaries of Earth's major and minor tectonic plates, their movement directions, and boundary types (divergent, convergent, transform).", icon: "ti-puzzle", color: COLORS.structure, link: "https://www.usgs.gov/media/images/map-tectonic-plates-and-their-boundaries-0" },
  { name: "Seismic Hazard Map", desc: "Global earthquake hazard zones, based on historical seismicity, fault locations, and soil conditions. Used in building codes and disaster planning.", icon: "ti-wave-sine", color: COLORS.hazard, link: "https://www.globalseismichazard.org" },
  { name: "Volcanic Regions Map", desc: "Distribution of active, dormant, and extinct volcanoes worldwide, including the Pacific Ring of Fire and major volcanic hotspots.", icon: "ti-flame", color: "#D85A30", link: "https://volcano.si.edu/faq/index.cfm?question=worldvolcanodistribution" },
  { name: "Geologic Map of Africa", desc: "Shows the rock formations, ages, and geological structures across the African continent, including the West African Craton and East African Rift System.", icon: "ti-map-pin", color: COLORS.mineral, link: "https://www.brgm.fr/en" },
  { name: "World Mineral Resources", desc: "Locations of major mineral deposits globally — iron, copper, gold, bauxite, and diamonds — and their relationship to geological formations.", icon: "ti-diamond", color: COLORS.mineral, link: "https://mrdata.usgs.gov/mineral-resources/" },
  { name: "Geologic Map of Liberia", desc: "Detailed geological map of Liberia showing rock formations, iron ore deposits, and the geological structure of the Mano River region.", icon: "ti-map-2", color: "#639922", link: "https://www.bgs.ac.uk/geology-projects/africa/" },
];

const QUIZ_QUESTIONS = [
  { q: "What type of rock is formed from cooled magma or lava?", options: ["Sedimentary", "Metamorphic", "Igneous", "Organic"], answer: 2 },
  { q: "Which layer of Earth is liquid?", options: ["Inner core", "Mantle", "Outer core", "Crust"], answer: 2 },
  { q: "What is the hardest mineral on the Mohs scale?", options: ["Quartz", "Feldspar", "Diamond", "Corundum"], answer: 2 },
  { q: "Where do divergent plate boundaries create new crust?", options: ["Trenches", "Mid-ocean ridges", "Subduction zones", "Hotspots"], answer: 1 },
  { q: "What is the point underground where an earthquake rupture begins?", options: ["Epicenter", "Fault line", "Focus (Hypocenter)", "Seismic zone"], answer: 2 },
  { q: "Which sedimentary rock is formed from compressed plant material?", options: ["Sandstone", "Limestone", "Shale", "Coal"], answer: 3 },
  { q: "What process transforms sedimentary rock into metamorphic rock?", options: ["Erosion", "Deposition", "Heat and pressure", "Crystallization"], answer: 2 },
  { q: "The 'Ring of Fire' is associated with which ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { q: "What mineral has a chemical formula of SiO₂?", options: ["Feldspar", "Quartz", "Calcite", "Mica"], answer: 1 },
  { q: "What is the age of Earth approximately?", options: ["1 billion years", "2.5 billion years", "4.54 billion years", "10 billion years"], answer: 2 },
];

export default function EarthAndYou() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRockType, setSelectedRockType] = useState(null);
  const [selectedRock, setSelectedRock] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [mineralSearch, setMineralSearch] = useState("");
  const [quizActive, setQuizActive] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const filteredGlossary = GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const filteredMinerals = MINERALS.filter((m) =>
    m.name.toLowerCase().includes(mineralSearch.toLowerCase())
  );

  function startQuiz() {
    setQuizActive(true);
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizDone(false);
    setQuizAnswers([]);
  }

  function handleQuizAnswer(idx) {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    const correct = idx === QUIZ_QUESTIONS[quizIdx].answer;
    if (correct) setQuizScore((s) => s + 1);
    setQuizAnswers((a) => [...a, { selected: idx, correct }]);
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
    } else {
      setQuizIdx((i) => i + 1);
      setQuizSelected(null);
    }
  }

  const s = {
    app: { fontFamily: "system-ui, sans-serif", maxWidth: 860, margin: "0 auto", padding: "0 0 40px 0", color: "var(--color-text-primary)" },
    header: { background: "linear-gradient(135deg, #0c1c3a 0%, #185FA5 60%, #1D9E75 100%)", padding: "28px 28px 20px", borderRadius: "0 0 18px 18px" },
    headerTitle: { color: "#fff", fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" },
    headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 13, margin: "4px 0 0" },
    nav: { display: "flex", overflowX: "auto", gap: 2, padding: "12px 16px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)" },
    navBtn: (active) => ({
      display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "none", background: "none",
      borderBottom: active ? "2px solid #185FA5" : "2px solid transparent",
      color: active ? "#185FA5" : "var(--color-text-secondary)",
      fontWeight: active ? 500 : 400, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", borderRadius: 0,
    }),
    body: { padding: "20px 20px 0" },
    card: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "16px 20px", marginBottom: 14 },
    sectionTitle: { fontSize: 18, fontWeight: 500, margin: "0 0 14px", color: "var(--color-text-primary)" },
    tag: (color) => ({ background: color + "22", color: color, fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 20, display: "inline-block" }),
    badge: (color) => ({ background: color, color: "#fff", fontSize: 12, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 8 }),
    btn: (color) => ({ background: color, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontSize: 14, fontWeight: 500 }),
    outlineBtn: { background: "none", border: "0.5px solid var(--color-border-secondary)", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13, color: "var(--color-text-secondary)" },
    input: { width: "100%", padding: "9px 14px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", fontSize: 14, background: "var(--color-background-secondary)", color: "var(--color-text-primary)", boxSizing: "border-box" },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 },
  };

  return (
    <div style={s.app}>
      <div style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <i className="ti ti-globe" style={{ fontSize: 36, color: "#7dd3fc" }} aria-hidden="true"></i>
          <div>
            <h1 style={s.headerTitle}>{APP}</h1>
            <p style={s.headerSub}>Your interactive geology companion • Developed by {DEV}</p>
          </div>
        </div>
      </div>

      <nav style={s.nav}>
        {TABS.map((t) => (
          <button key={t.id} style={s.navBtn(activeTab === t.id)} onClick={() => { setActiveTab(t.id); setSelectedLesson(null); setSelectedRockType(null); setSelectedRock(null); }}>
            <i className={`ti ${t.icon}`} style={{ fontSize: 15 }} aria-hidden="true"></i>
            {t.label}
          </button>
        ))}
      </nav>

      <div style={s.body}>

        {/* HOME */}
        {activeTab === "home" && (
          <div>
            <div style={{ ...s.card, background: "linear-gradient(120deg,#EAF3DE,#E6F1FB)", border: "none", marginBottom: 18 }}>
              <h2 style={{ ...s.sectionTitle, margin: "0 0 8px" }}>Welcome to Earth and You</h2>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
                Explore the science of our planet — from the molten core to the mountain tops. Discover rocks, minerals, geological processes, and the deep history of Earth, all in one place.
              </p>
            </div>

            <div style={s.grid2}>
              {[
                { label: "Rock Types", desc: "Igneous, Sedimentary & Metamorphic", icon: "ti-diamond", color: COLORS.igneous, tab: "rocks" },
                { label: "Minerals", desc: "12 essential minerals with properties", icon: "ti-crystal-ball", color: COLORS.mineral, tab: "minerals" },
                { label: "Lessons", desc: "6 in-depth geological topics", icon: "ti-school", color: COLORS.structure, tab: "lessons" },
                { label: "Glossary", desc: "30 key geological terms defined", icon: "ti-book", color: COLORS.term, tab: "glossary" },
                { label: "Geo Maps", desc: "6 essential geological maps", icon: "ti-map", color: "#0F6E56", tab: "maps" },
                { label: "Quiz", desc: "Test your geology knowledge", icon: "ti-brain", color: COLORS.hazard, tab: "quiz" },
              ].map((item) => (
                <div key={item.tab} onClick={() => setActiveTab(item.tab)} style={{ ...s.card, cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: item.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${item.icon}`} style={{ fontSize: 20, color: item.color }} aria-hidden="true"></i>
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, margin: "0 0 2px", fontSize: 15 }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...s.card, marginTop: 18, background: "#0c1c3a", border: "none" }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 4px" }}>DID YOU KNOW?</p>
              <p style={{ color: "#fff", fontSize: 14, margin: 0, lineHeight: 1.7 }}>
                The oldest rocks ever found on Earth are the Acasta Gneisses of Canada, dating to about <strong style={{ color: "#7dd3fc" }}>4.03 billion years ago</strong>. For context, the entire history of complex life on Earth spans only the last 541 million years.
              </p>
            </div>
          </div>
        )}

        {/* LESSONS */}
        {activeTab === "lessons" && !selectedLesson && (
          <div>
            <h2 style={s.sectionTitle}>Geology Lessons</h2>
            {LESSONS.map((lesson) => (
              <div key={lesson.id} onClick={() => setSelectedLesson(lesson)} style={{ ...s.card, cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: lesson.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ti ${lesson.icon}`} style={{ fontSize: 22, color: lesson.color }} aria-hidden="true"></i>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: 15, margin: "0 0 4px" }}>{lesson.title}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{lesson.content.split("\n")[0]}</p>
                </div>
                <i className="ti ti-chevron-right" style={{ color: "var(--color-text-secondary)", fontSize: 16, marginTop: 4 }} aria-hidden="true"></i>
              </div>
            ))}
          </div>
        )}

        {activeTab === "lessons" && selectedLesson && (
          <div>
            <button style={s.outlineBtn} onClick={() => setSelectedLesson(null)}>
              <i className="ti ti-arrow-left" style={{ fontSize: 14, marginRight: 4 }} aria-hidden="true"></i>Back to Lessons
            </button>
            <div style={{ ...s.card, marginTop: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: selectedLesson.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className={`ti ${selectedLesson.icon}`} style={{ fontSize: 22, color: selectedLesson.color }} aria-hidden="true"></i>
                </div>
                <h2 style={{ ...s.sectionTitle, margin: 0 }}>{selectedLesson.title}</h2>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.85, color: "var(--color-text-secondary)", whiteSpace: "pre-line" }}>
                {selectedLesson.content}
              </div>
            </div>
          </div>
        )}

        {/* ROCKS */}
        {activeTab === "rocks" && !selectedRockType && (
          <div>
            <h2 style={s.sectionTitle}>The Three Rock Types</h2>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 18, lineHeight: 1.7 }}>
              All rocks on Earth fall into three main categories based on how they formed. Select a type to explore its characteristics and examples.
            </p>
            {ROCKS.map((rt) => (
              <div key={rt.type} onClick={() => setSelectedRockType(rt)} style={{ ...s.card, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <i className={`ti ${rt.icon}`} style={{ fontSize: 22, color: rt.color }} aria-hidden="true"></i>
                  <span style={s.badge(rt.color)}>{rt.type} Rocks</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 10px", lineHeight: 1.6 }}>{rt.definition}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {rt.subtypes.map((r) => <span key={r.name} style={s.tag(rt.color)}>{r.name}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "rocks" && selectedRockType && !selectedRock && (
          <div>
            <button style={s.outlineBtn} onClick={() => setSelectedRockType(null)}>
              <i className="ti ti-arrow-left" style={{ fontSize: 14, marginRight: 4 }} aria-hidden="true"></i>All Rock Types
            </button>
            <div style={{ marginTop: 14, marginBottom: 16 }}>
              <span style={s.badge(selectedRockType.color)}>{selectedRockType.type} Rocks</span>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 8, lineHeight: 1.7 }}>{selectedRockType.definition}</p>
            </div>
            <div style={s.grid2}>
              {selectedRockType.subtypes.map((rock) => (
                <div key={rock.name} onClick={() => setSelectedRock(rock)} style={{ ...s.card, cursor: "pointer" }}>
                  <p style={{ fontWeight: 500, margin: "0 0 6px", color: selectedRockType.color }}>{rock.name}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 10px", lineHeight: 1.6 }}>{rock.desc.slice(0, 80)}…</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={s.tag(selectedRockType.color)}>{rock.texture}</span>
                    <span style={s.tag("#888")}>{rock.origin}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rocks" && selectedRockType && selectedRock && (
          <div>
            <button style={s.outlineBtn} onClick={() => setSelectedRock(null)}>
              <i className="ti ti-arrow-left" style={{ fontSize: 14, marginRight: 4 }} aria-hidden="true"></i>Back to {selectedRockType.type} Rocks
            </button>
            <div style={{ ...s.card, marginTop: 14 }}>
              <span style={s.badge(selectedRockType.color)}>{selectedRockType.type}</span>
              <h2 style={{ fontSize: 22, fontWeight: 600, margin: "8px 0 12px" }}>{selectedRock.name}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--color-text-secondary)", margin: "0 0 16px" }}>{selectedRock.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Texture", selectedRock.texture], ["Origin / Type", selectedRock.origin], ["Rock Class", selectedRockType.type]].map(([k, v]) => (
                  <div key={k} style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: "10px 14px" }}>
                    <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</p>
                    <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MINERALS */}
        {activeTab === "minerals" && (
          <div>
            <h2 style={s.sectionTitle}>Common Minerals</h2>
            <input style={{ ...s.input, marginBottom: 16 }} placeholder="Search minerals by name…" value={mineralSearch} onChange={(e) => setMineralSearch(e.target.value)} />
            {filteredMinerals.map((m) => (
              <div key={m.name} style={s.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 15, margin: "0 0 2px", color: COLORS.mineral }}>{m.name}</p>
                    <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>{m.formula}</p>
                  </div>
                  <span style={{ ...s.tag(COLORS.mineral), fontSize: 12 }}>Hardness: {m.hardness}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
                  {[["Color", m.color], ["Luster", m.luster], ["Use", m.use]].map(([k, v]) => (
                    <div key={k} style={{ background: "var(--color-background-secondary)", borderRadius: 6, padding: "8px 10px" }}>
                      <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: "0 0 1px", textTransform: "uppercase", letterSpacing: 0.3 }}>{k}</p>
                      <p style={{ fontSize: 12, margin: 0, fontWeight: 500 }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GLOSSARY */}
        {activeTab === "glossary" && (
          <div>
            <h2 style={s.sectionTitle}>Geological Glossary</h2>
            <input style={{ ...s.input, marginBottom: 16 }} placeholder="Search terms and definitions…" value={glossarySearch} onChange={(e) => setGlossarySearch(e.target.value)} />
            <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 12 }}>{filteredGlossary.length} terms found</p>
            {filteredGlossary.map((g) => (
              <div key={g.term} style={{ ...s.card, borderLeft: `3px solid ${COLORS.term}` }}>
                <p style={{ fontWeight: 500, color: COLORS.term, margin: "0 0 4px", fontSize: 15 }}>{g.term}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>{g.def}</p>
              </div>
            ))}
          </div>
        )}

        {/* GEO MAPS */}
        {activeTab === "maps" && (
          <div>
            <h2 style={s.sectionTitle}>Geological Maps & Resources</h2>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16, lineHeight: 1.7 }}>
              Geological maps are essential tools for understanding Earth's surface and subsurface. Each map below links to authoritative geological databases and research institutions.
            </p>
            {GEO_MAPS.map((m) => (
              <div key={m.name} style={s.card}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <i className={`ti ${m.icon}`} style={{ fontSize: 20, color: m.color }} aria-hidden="true"></i>
                  <p style={{ fontWeight: 500, fontSize: 15, margin: 0 }}>{m.name}</p>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 10px", lineHeight: 1.6 }}>{m.desc}</p>
                <a href={m.link} style={{ fontSize: 12, color: m.color, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <i className="ti ti-external-link" style={{ fontSize: 13 }} aria-hidden="true"></i>
                  View Resource
                </a>
              </div>
            ))}

            <div style={{ ...s.card, background: "#EAF3DE", border: "0.5px solid #C0DD97", marginTop: 4 }}>
              <p style={{ fontWeight: 500, margin: "0 0 6px", color: "#3B6D11" }}>
                <i className="ti ti-map-pin" style={{ fontSize: 14, marginRight: 6 }} aria-hidden="true"></i>About Liberia's Geology
              </p>
              <p style={{ fontSize: 13, color: "#3B6D11", margin: 0, lineHeight: 1.7 }}>
                Liberia sits on the West African Craton, one of the oldest geological formations on Earth (over 3 billion years old). The country holds significant iron ore, gold, diamond, and bauxite deposits. The Nimba Range and Bomi Hills are key mining regions, and the Mano River basin reflects ancient Precambrian basement rocks.
              </p>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {activeTab === "quiz" && !quizActive && !quizDone && (
          <div>
            <h2 style={s.sectionTitle}>Geology Quiz</h2>
            <div style={s.card}>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <i className="ti ti-brain" style={{ fontSize: 48, color: COLORS.hazard }} aria-hidden="true"></i>
                <p style={{ fontSize: 16, fontWeight: 500, margin: "12px 0 6px" }}>Test Your Geology Knowledge</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 20px" }}>10 questions covering rocks, minerals, plate tectonics, and Earth structure.</p>
                <button style={s.btn(COLORS.structure)} onClick={startQuiz}>Start Quiz</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "quiz" && quizActive && !quizDone && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span style={{ fontSize: 12, color: COLORS.mineral, fontWeight: 500 }}>Score: {quizScore}</span>
            </div>
            <div style={{ height: 4, background: "var(--color-background-secondary)", borderRadius: 4, marginBottom: 20 }}>
              <div style={{ height: 4, background: COLORS.structure, borderRadius: 4, width: `${((quizIdx) / QUIZ_QUESTIONS.length) * 100}%`, transition: "width 0.3s" }}></div>
            </div>
            <div style={s.card}>
              <p style={{ fontWeight: 500, fontSize: 16, margin: "0 0 20px", lineHeight: 1.5 }}>{QUIZ_QUESTIONS[quizIdx].q}</p>
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                let bg = "var(--color-background-secondary)";
                let border = "0.5px solid var(--color-border-tertiary)";
                let color = "var(--color-text-primary)";
                if (quizSelected !== null) {
                  if (i === QUIZ_QUESTIONS[quizIdx].answer) { bg = "#EAF3DE"; border = "1.5px solid #639922"; color = "#27500A"; }
                  else if (i === quizSelected && quizSelected !== QUIZ_QUESTIONS[quizIdx].answer) { bg = "#FCEBEB"; border = "1.5px solid #E24B4A"; color = "#501313"; }
                }
                return (
                  <div key={i} onClick={() => handleQuizAnswer(i)} style={{ padding: "12px 16px", borderRadius: 8, background: bg, border, color, marginBottom: 8, cursor: quizSelected === null ? "pointer" : "default", fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}>
                    {quizSelected !== null && i === QUIZ_QUESTIONS[quizIdx].answer && <i className="ti ti-check" style={{ color: "#3B6D11", fontSize: 16 }} aria-hidden="true"></i>}
                    {quizSelected !== null && i === quizSelected && quizSelected !== QUIZ_QUESTIONS[quizIdx].answer && <i className="ti ti-x" style={{ color: "#A32D2D", fontSize: 16 }} aria-hidden="true"></i>}
                    {opt}
                  </div>
                );
              })}
              {quizSelected !== null && (
                <button style={{ ...s.btn(COLORS.structure), marginTop: 10, width: "100%" }} onClick={nextQuestion}>
                  {quizIdx + 1 >= QUIZ_QUESTIONS.length ? "See Results" : "Next Question"}
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "quiz" && quizDone && (
          <div>
            <div style={{ ...s.card, textAlign: "center", padding: "30px 20px" }}>
              <i className={`ti ${quizScore >= 7 ? "ti-trophy" : quizScore >= 5 ? "ti-thumb-up" : "ti-refresh"}`} style={{ fontSize: 52, color: quizScore >= 7 ? "#BA7517" : quizScore >= 5 ? COLORS.mineral : COLORS.structure }} aria-hidden="true"></i>
              <p style={{ fontSize: 22, fontWeight: 600, margin: "12px 0 4px" }}>{quizScore} / {QUIZ_QUESTIONS.length}</p>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 20px" }}>
                {quizScore >= 8 ? "Outstanding! You have a strong grasp of geology." : quizScore >= 5 ? "Good effort! Review the lessons to strengthen your knowledge." : "Keep studying! The lessons and glossary will help you improve."}
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={s.btn(COLORS.structure)} onClick={startQuiz}>Try Again</button>
                <button style={s.outlineBtn} onClick={() => { setActiveTab("lessons"); setQuizActive(false); setQuizDone(false); }}>Review Lessons</button>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div>
            <h2 style={s.sectionTitle}>About This App</h2>
            <div style={{ ...s.card, borderTop: `3px solid ${COLORS.structure}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: COLORS.structure + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-globe" style={{ fontSize: 26, color: COLORS.structure }} aria-hidden="true"></i>
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>{APP}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Version {VERSION}</p>
                </div>
              </div>
              <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 14 }}>
                {[
                  ["Developer", DEV],
                  ["App Name", APP],
                  ["Version", VERSION],
                  ["Category", "Geological Education"],
                  ["Target Audience", "Students, educators, and geology enthusiasts"],
                  ["Platform", "Web / Interactive"],
                  ["Language", "English"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", fontSize: 13 }}>
                    <span style={{ color: "var(--color-text-secondary)" }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...s.card, marginTop: 12 }}>
              <p style={{ fontWeight: 500, margin: "0 0 8px" }}>What's Inside</p>
              <ul style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 2, paddingLeft: 18, margin: 0 }}>
                <li>6 comprehensive geology lessons (Earth structure, plate tectonics, rock cycle, volcanoes, earthquakes, geologic time)</li>
                <li>18 rock profiles across 3 rock types</li>
                <li>12 mineral entries with physical properties</li>
                <li>30 defined geological terms in a searchable glossary</li>
                <li>6 geological map resources including Liberia-specific geology</li>
                <li>10-question interactive geology quiz</li>
              </ul>
            </div>
            <div style={{ ...s.card, background: "#0c1c3a", border: "none", marginTop: 12 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>DEVELOPER NOTE</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.7 }}>
                This application was created to bring geological education to students and professionals across West Africa and beyond. Understanding Earth's processes is critical — from natural hazard preparedness to sustainable resource management. — <em>{DEV}</em>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}