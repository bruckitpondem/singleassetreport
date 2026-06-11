import { Fragment, useState } from "react";
import "./valuation-theme.css";

const reportData = {
  reportInfo: {
    title: "Single Asset Valuation",
    asset: "17 Westbridge Road, SW18",
    date: "8 June 2026",
    basis: "Market value",
    floorArea: "104 sqm",
    propertyType: "Terraced house",
    tenure: "Freehold"
  },
  sections: [
    {
      title: "Valuation Summary",
      headline: "Point estimate, confidence bounds and valuation drivers for the subject asset.",
      description:
        "The page combines asset identity, value bounds, driver-family attribution, six-month value movement and cross-check metrics. Property characteristics are shown alongside the valuation evidence so the estimate can be read in one place.",
      component: ValuationSummarySection
    },
    {
      title: "Positioning",
      headline: "This section should show where the asset sits versus its local market and versus the national market.",
      description:
        "The subject is positioned first against nearby family-house evidence and then against the wider UK market. The visuals below show whether the asset sits below, around or above the local norm on value and on key physical characteristics, instead of leaving that interpretation buried inside benchmark tables.",
      component: RelativePerformanceSection
    },
    {
      title: "Comparables",
      headline: "Comparable matrix provides the primary valuation anchor.",
      description:
        "The strongest evidence comes from recent terraced-house sales within a tight local radius. Adjustments are mainly for condition, size and finish rather than locational divergence.",
      component: ComparableEvidenceSection
    },
    {
      title: "Income & Yield",
      headline: "Income evidence supports the value but does not dominate it.",
      description:
        "The rental estimate sits within local family-house evidence and implies a 4.2% gross yield. Yield support is adequate, with value still driven principally by owner-occupier comparable pricing.",
      component: IncomeYieldSection
    },
    {
      title: "Risk & Outlook",
      headline: "Value outlook is constructive if capex remains controlled.",
      description:
        "The forward view assumes modest £/sqm growth, stable rental progression and no severe liquidity shock. Downside widens if survey capex rises or comparable evidence thins.",
      component: RiskOutlookSection
    }
  ],
  summary: {
    identity: {
      address: "17 Westbridge Road",
      flatName: "Whole house",
      street: "Westbridge Road",
      town: "London",
      postcode: "SW18 1LP",
      lsoa: "Wandsworth 015E",
      localAuthority: "Wandsworth",
      descriptor: "3-bed terrace",
      floorArea: "104 sqm",
      tenure: "Freehold",
      reportDate: "8 June 2026",
      basis: "Market value"
    },
    estimate: {
      point: "£875k",
      lower: "£835k",
      upper: "£910k",
      confidence: "78 / 100",
      capitalValue: "£8,420/m²",
      lowerCapitalValue: "£8,030/m²",
      upperCapitalValue: "£8,750/m²",
      rangeWidth: "£75k",
      rangePercent: "8.6% range"
    },
    driverFamilies: [
      { family: "Location", contribution: "18%", metricLabel: "Location prior", metric: "SW18 / 015E", evidence: "SW18 / 015E - high-value Wandsworth geography sets the base price level for the estimate.", tone: "location" },
      { family: "Spatial", contribution: "16%", metricLabel: "Local market", metric: "£8.5k/m²", evidence: "£8.5k/m² - nearby pricing evidence anchors the current trading level for the property.", tone: "pcm" },
      { family: "Property Identity", contribution: "14%", metricLabel: "Subject class", metric: "Terrace / freehold", evidence: "Terrace / freehold - clean ownership and house class define a tight peer set.", tone: "identity" },
      { family: "Physical Form", contribution: "13%", metricLabel: "Asset form", metric: "104 m² / 3 beds", evidence: "104 m² / 3 beds - floor area and layout sit inside the core family trading band.", tone: "form" },
      { family: "Comparables", contribution: "12%", metricLabel: "Comparable base", metric: "12 comps <1km", evidence: "12 comps <1km - nearby terrace sales stabilise the resale range and price read.", tone: "priors" },
      { family: "Momentum", contribution: "9%", metricLabel: "6M market", metric: "Stable / +0.8%", evidence: "Stable / +0.8% - recent price movement is supportive but not the main driver.", tone: "momentum" },
      { family: "Repeat Sales", contribution: "8%", metricLabel: "Repeat sales", metric: "3 historic anchors", evidence: "3 historic anchors - repeat-sale evidence supports the valuation floor and range.", tone: "memory" },
      { family: "Static Context", contribution: "6%", metricLabel: "Context", metric: "Access positive", evidence: "Access positive - transport and services add useful secondary support to the read.", tone: "context" },
      { family: "Microspatial", contribution: "4%", metricLabel: "Micro-pool", metric: "Street-row only", evidence: "Street-row only - narrow micro evidence checks the local price read but stays secondary.", tone: "cluster" }
    ],
    valuePath: [
      { month: "Jan", value: 846, low: 807, high: 884, peer: 829, national: 818 },
      { month: "Feb", value: 852, low: 812, high: 890, peer: 840, national: 826 },
      { month: "Mar", value: 861, low: 820, high: 899, peer: 856, national: 822 },
      { month: "Apr", value: 868, low: 828, high: 905, peer: 878, national: 836 },
      { month: "May", value: 872, low: 832, high: 908, peer: 888, national: 833 },
      { month: "Jun", value: 875, low: 835, high: 910, peer: 898, national: 846 }
    ],
    summaryGroups: [
      {
        title: "Valuation Checks",
        rows: [
          ["Gross yield", "4.2%"],
          ["Income check", "£878k"],
          ["Cost check", "£812k"],
          ["Land value", "£74k"],
          ["Range width", "£75k"],
          ["Comp depth", "7 sales"],
          ["Memory anchor", "£858k"],
          ["Comps anchor", "£865k"],
          ["PCM anchor", "£882k"],
          ["Land anchor", "£897k"]
        ]
      },
      {
        title: "Asset Profile",
        rows: [
          ["Asset type", "Terrace"],
          ["Floor area", "104 sqm"],
          ["Plot size", "0.045 acres"],
          ["Beds", "3 beds"],
          ["EPC", "C"],
          ["Class", "Core urban"],
          ["Use", "Single dwelling"],
          ["Condition", "Good / dated"],
          ["Band", "£850k-£900k"],
          ["Liquidity", "High"],
          ["Tenure", "Freehold"],
          ["Build date", "c.1905"]
        ]
      }
    ],
  },
  relative: {
    overview: [
      {
        label: "Market value",
        subject: "£875k",
        localText: "62nd percentile locally",
        nationalText: "94th percentile nationally",
        read: "Above the local midpoint and top-decile against the UK family-house frame."
      },
      {
        label: "Price intensity",
        subject: "£8,420/m²",
        localText: "67th percentile locally",
        nationalText: "96th percentile nationally",
        read: "Richer than most nearby peers and far above the national house benchmark."
      },
      {
        label: "Rental support",
        subject: "£3,075 pcm",
        localText: "59th percentile locally",
        nationalText: "93rd percentile nationally",
        read: "Rent evidence supports the valuation and remains strong beyond the local market."
      },
      {
        label: "Liquidity",
        subject: "38-52 days",
        localText: "71st percentile locally",
        nationalText: "88th percentile nationally",
        read: "Expected sale timing is faster than typical local and national stock."
      }
    ],
    maps: [
      {
        title: "Local area position",
        subtitle: "Relative to nearby Wandsworth family-house / terrace evidence.",
        xLabel: "Value percentile",
        yLabel: "Characteristic percentile",
        bandLabel: "Typical local band",
        subject: { x: 67, y: 61, label: "Subject" },
        benchmark: { x: 50, y: 50, label: "Local median" },
        band: { x1: 42, x2: 61, y1: 44, y2: 58 },
        read: "Upper-right of the local market: a little richer and a little stronger in spec than the local midpoint."
      },
      {
        title: "National position",
        subtitle: "Relative to the wider UK 3-bed terrace / family-house frame.",
        xLabel: "Value percentile",
        yLabel: "Characteristic percentile",
        bandLabel: "Typical national band",
        subject: { x: 94, y: 78, label: "Subject" },
        benchmark: { x: 50, y: 50, label: "National median" },
        band: { x1: 33, x2: 58, y1: 38, y2: 60 },
        read: "Clearly top-right nationally: high-value, above-average quality and notably more liquid than the UK midpoint."
      }
    ],
    valueRanks: [
      { label: "Market value", subject: "£875k", local: 62, national: 94, localText: "62nd pct local", nationalText: "94th pct national" },
      { label: "£/m²", subject: "£8,420", local: 67, national: 96, localText: "67th pct local", nationalText: "96th pct national" },
      { label: "Rent pcm", subject: "£3,075", local: 59, national: 93, localText: "59th pct local", nationalText: "93rd pct national" },
      { label: "Yield support", subject: "4.2%", local: 54, national: 38, localText: "54th pct local", nationalText: "38th pct national" },
      { label: "Liquidity", subject: "38-52d", local: 71, national: 88, localText: "71st pct local", nationalText: "88th pct national" }
    ],
    characteristicRanks: [
      { label: "Floor area", subject: "104 m²", local: 58, national: 76, localText: "58th pct local", nationalText: "76th pct national" },
      { label: "Bedroom count", subject: "3 beds", local: 61, national: 73, localText: "61st pct local", nationalText: "73rd pct national" },
      { label: "Tenure quality", subject: "Freehold", local: 66, national: 81, localText: "66th pct local", nationalText: "81st pct national" },
      { label: "EPC / condition", subject: "C / good", local: 52, national: 57, localText: "52nd pct local", nationalText: "57th pct national" },
      { label: "Property-type fit", subject: "Terrace", local: 64, national: 69, localText: "64th pct local", nationalText: "69th pct national" },
      { label: "Owner-occupier fit", subject: "Family house", local: 69, national: 79, localText: "69th pct local", nationalText: "79th pct national" }
    ],
    benchmarkRows: [
      ["Measure", "Subject", "Local", "National", "Read"],
      ["Value", "£875k", "£830k", "£286k", "Above local / far above UK"],
      ["£/m²", "£8,420", "£8,090", "£3,160", "Richer pricing"],
      ["Rent", "£3,075", "£2,960", "£1,150", "Supported"],
      ["Area", "104 m²", "96 m²", "88 m²", "Larger"],
      ["Timing", "38-52d", "48-62d", "71-92d", "Faster exit"]
    ]
  },
  comps: {
    evidenceRows: [
      { rank: "01", name: "12 Westbridge Rd", meta: "Terrace · 101 m² · Mar 2026", distance: "0.08 mi", price: "£870k", ppsqm: "£8,610", weight: "30%", fit: "92", timePrice: "£853k", timePpsqm: "£8,438" },
      { rank: "02", name: "44 Putney Bridge Rd", meta: "Terrace · 109 m² · Jan 2026", distance: "0.19 mi", price: "£908k", ppsqm: "£8,330", weight: "24%", fit: "86", timePrice: "£922k", timePpsqm: "£8,455" },
      { rank: "03", name: "7 Garton Street", meta: "Terrace · 98 m² · Nov 2025", distance: "0.24 mi", price: "£803k", ppsqm: "£8,190", weight: "18%", fit: "81", timePrice: "£827k", timePpsqm: "£8,436" },
      { rank: "04", name: "81 Tonsley Hill", meta: "Terrace · 112 m² · Sep 2025", distance: "0.31 mi", price: "£979k", ppsqm: "£8,740", weight: "12%", fit: "74", timePrice: "£935k", timePpsqm: "£8,347" },
      { rank: "05", name: "23 Eltringham St", meta: "Terrace · 95 m² · Aug 2025", distance: "0.37 mi", price: "£758k", ppsqm: "£7,980", weight: "7%", fit: "68", timePrice: "£792k", timePpsqm: "£8,339" },
      { rank: "06", name: "31 Tonsley Place", meta: "Terrace · 106 m² · Jun 2025", distance: "0.41 mi", price: "£885k", ppsqm: "£8,350", weight: "5%", fit: "64", timePrice: "£890k", timePpsqm: "£8,392" },
      { rank: "07", name: "4 Bramford Rd", meta: "Terrace · 102 m² · May 2025", distance: "0.46 mi", price: "£825k", ppsqm: "£8,088", weight: "4%", fit: "61", timePrice: "£856k", timePpsqm: "£8,395" },
      { rank: "08", name: "18 Tonsley Street", meta: "Terrace · 108 m² · Apr 2025", distance: "0.52 mi", price: "£894k", ppsqm: "£8,278", weight: "3%", fit: "58", timePrice: "£911k", timePpsqm: "£8,435" }
    ],
    evidenceStats: [
      {
        title: "Pricing Evidence",
        metrics: [
          { label: "Weighted £/sqm", value: "£8,420" },
          { label: "Median Comp", value: "£8,330" },
          { label: "Current Range", value: "£8.34k-£8.46k" }
        ]
      },
      {
        title: "Evidence Quality",
        metrics: [
          { label: "Evidence Depth", value: "8 comps" },
          { label: "Prime Weight", value: "72%" },
          { label: "Similarity Range", value: "58-92%" }
        ]
      },
      {
        title: "Normalization",
        metrics: [
          { label: "Mean Distance", value: "0.29 mi" },
          { label: "Recency Window", value: "10 mo" },
          { label: "Net Adjustment", value: "+0.2%" }
        ]
      }
    ]
  },
  income: {
    rentRows: [
      ["Subject estimate", "£3,075", "£296", "4.2%", "Base"],
      ["Family-house comp", "£3,150", "£301", "4.3%", "Above"],
      ["Terraced median", "£2,950", "£284", "4.1%", "Benchmark"],
      ["Premium finish", "£3,325", "£315", "4.4%", "Ceiling"],
      ["Lower finish", "£2,850", "£274", "3.9%", "Downside"],
      ["LSOA house rent", "£2,960", "£286", "4.1%", "Local base"],
      ["Investor floor", "£2,875", "£276", "4.0%", "Floor"]
    ],
    incomeStack: [
      { label: "Gross yield", value: "4.2%", width: 62 },
      { label: "Local house yield", value: "4.1%", width: 58 },
      { label: "Rent cover", value: "1.08x", width: 66 },
      { label: "Income confidence", value: "74", width: 74 },
      { label: "ERV premium", value: "+3.8%", width: 68 },
      { label: "Investor floor", value: "£835k", width: 52 }
    ],
    sensitivity: [
      ["Downside rent", "£2,850", "3.9%", "£835k value support"],
      ["Base rent", "£3,075", "4.2%", "£875k central"],
      ["Upside rent", "£3,325", "4.4%", "£910k ceiling"],
      ["Investor floor", "£2,875", "4.0%", "Yield support threshold"]
    ]
  },
  risk: {
    riskRows: [
      ["Condition variance", "Medium", "£18k reserve", "-2.1%"],
      ["Pricing stretch", "Low", "Inside evidence range", "-0.8%"],
      ["Liquidity timing", "Low", "Active local turnover", "-0.5%"],
      ["Supply pressure", "Medium", "Pipeline rising", "-1.2%"],
      ["Survey risk", "Medium", "No intrusive survey", "-1.6%"],
      ["Rental fallback", "Low", "Yield support stable", "+0.4%"]
    ],
    scenarios: [
      ["Optimistic", "£910k", "£8,750", "£3,250", "32-42d", "Clean"],
      ["Base case", "£875k", "£8,420", "£3,075", "38-52d", "Base"],
      ["Pessimistic", "£835k", "£8,030", "£2,900", "60-75d", "Capex"],
      ["Income floor", "£825k", "£7,930", "£2,750", "65-85d", "Yield"],
      ["Forced sale", "£810k", "£7,790", "£2,875", "75-90d", "Forced"]
    ],
    outlookRows: [
      ["£/sqm trend", "£8,420", "£8,620", "Monitor if <£8,100"],
      ["Rent pcm", "£3,075", "£3,190", "Monitor if <£2,900"],
      ["Comparable depth", "5 strong", "Stable", "Monitor if <3 strong"],
      ["Capex reserve", "£18k", "Unchanged", "Review if >£30k"],
      ["Exit period", "38-52d", "Stable", "Review if >70d"]
    ]
  }
};

export default function SingleAssetValuationReport() {
  const [activeSection, setActiveSection] = useState(() => getInitialSection(reportData.sections.length));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const section = reportData.sections[activeSection];
  const SectionComponent = section.component;

  return (
    <article className="valuation-report">
      <header className="report-banner">
        <p>{reportData.reportInfo.title}</p>
        <span>{reportData.reportInfo.date}</span>
      </header>

      <div className={`report-shell${isSidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
        <Sidebar
          activeSection={activeSection}
          collapsed={isSidebarCollapsed}
          onSelect={setActiveSection}
          sections={reportData.sections}
          onToggle={() => setIsSidebarCollapsed((value) => !value)}
        />

        <main className="report-canvas">
          <SectionBar
            activeSection={activeSection}
            count={reportData.sections.length}
            title={section.title}
            onPrevious={() => setActiveSection((value) => Math.max(0, value - 1))}
            onNext={() => setActiveSection((value) => Math.min(reportData.sections.length - 1, value + 1))}
          />
          <div className="report-body">
            <SectionComponent section={section} data={reportData} />
          </div>
          <div className="canvas-progress" aria-hidden="true">
            <span style={{ width: `${((activeSection + 1) / reportData.sections.length) * 100}%` }} />
          </div>
        </main>
      </div>
    </article>
  );
}

function getInitialSection(count) {
  if (typeof window === "undefined") {
    return 0;
  }

  const rawSection = new URLSearchParams(window.location.search).get("section");
  const sectionNumber = Number(rawSection);

  if (!Number.isInteger(sectionNumber)) {
    return 0;
  }

  return Math.min(Math.max(sectionNumber - 1, 0), count - 1);
}

function Sidebar({ activeSection, collapsed, onSelect, onToggle, sections }) {
  return (
    <aside className={`report-rail${collapsed ? " is-collapsed" : ""}`}>
      <div className="rail-heading">
        <span>Sections</span>
        <button
          type="button"
          className="rail-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand report navigation" : "Collapse report navigation"}
          aria-expanded={!collapsed}
        >
          <RailToggleIcon collapsed={collapsed} />
        </button>
      </div>
      <nav className="section-nav" aria-label="Report sections">
        {sections.map((section, index) => (
          <button
            key={section.title}
            type="button"
            className={activeSection === index ? "is-active" : ""}
            onClick={() => onSelect(index)}
            title={collapsed ? section.title : undefined}
          >
            <span>{index + 1}</span>
            <em>{section.title}</em>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SectionBar({ activeSection, count, title, onPrevious, onNext }) {
  return (
    <header className="section-bar">
      <h1>{title}</h1>
      <div>
        <button type="button" onClick={onPrevious} disabled={activeSection === 0} aria-label="Previous section">
          <ChevronLeft />
        </button>
        <span>{activeSection + 1} / {count}</span>
        <button type="button" onClick={onNext} disabled={activeSection === count - 1} aria-label="Next section">
          <ChevronRight />
        </button>
      </div>
    </header>
  );
}

function SectionLead({ section }) {
  return (
    <section className="section-lead">
      <h2>{section.headline}</h2>
      <p>{section.description}</p>
    </section>
  );
}

function ValuationSummarySection({ section, data }) {
  const summary = data.summary;

  return (
    <section className="valuation-layout valuation-summary-layout">
      <Panel title="Subject & Estimate" className="summary-subject-panel">
        <SubjectValuationSheet identity={summary.identity} estimate={summary.estimate} />
      </Panel>
      <Panel title="Six-month Value Path" className="summary-chart-panel">
        <ValuePathChart points={summary.valuePath} />
      </Panel>
      <Panel title="Valuation Breakdown" className="summary-breakdown-panel">
        <ValuationSupport families={summary.driverFamilies} />
      </Panel>
      <div className="summary-bottom-triad">
        <Panel title="Property Characteristics">
          <PropertyCharacteristicsGrid rows={getPropertyCharacteristicRows(summary)} />
        </Panel>
        <Panel title="Implied Values">
          <ImpliedValuesPanel rows={getImpliedValueRows(summary)} />
        </Panel>
        <Panel title="Alternative Value Calculations">
          <BallparkEstimatesPanel rows={getBallparkEstimateRows(summary)} />
        </Panel>
      </div>
    </section>
  );
}

function SummaryHeadline({ title }) {
  return (
    <section className="summary-headline">
      <h2>{title}</h2>
    </section>
  );
}

function RelativePerformanceSection({ section, data }) {
  return (
    <section className="valuation-layout relative-layout">
      <Panel className="relative-summary-panel">
        <SectionLead section={section} />
        <PositioningOverviewCards cards={data.relative.overview} />
      </Panel>
      {data.relative.maps.map((map) => (
        <Panel key={map.title} title={map.title} meta={map.subtitle}>
          <PositioningMap map={map} />
        </Panel>
      ))}
      <Panel title="Value positioning" className="relative-ranks-panel">
        <PositioningRankCards rows={data.relative.valueRanks} />
      </Panel>
      <Panel title="Characteristic positioning" className="relative-ranks-panel">
        <PositioningRankCards rows={data.relative.characteristicRanks} />
      </Panel>
    </section>
  );
}

function PositioningOverviewCards({ cards }) {
  return (
    <div className="positioning-overview-cards">
      {cards.map((card) => (
        <article key={card.label} className="positioning-overview-card">
          <header>
            <span>{card.label}</span>
            <strong>{card.subject}</strong>
          </header>
          <p>{card.read}</p>
          <footer>
            <em>{card.localText}</em>
            <em>{card.nationalText}</em>
          </footer>
        </article>
      ))}
    </div>
  );
}

function PositioningMap({ map }) {
  const subjectStyle = { left: `${map.subject.x}%`, bottom: `${map.subject.y}%` };
  const benchmarkStyle = { left: `${map.benchmark.x}%`, bottom: `${map.benchmark.y}%` };
  const bandStyle = {
    left: `${map.band.x1}%`,
    width: `${map.band.x2 - map.band.x1}%`,
    bottom: `${map.band.y1}%`,
    height: `${map.band.y2 - map.band.y1}%`
  };

  return (
    <div className="positioning-map-panel">
      <div className="positioning-map-frame">
        <div className="positioning-map-grid" aria-hidden="true">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="positioning-map-band" style={bandStyle} aria-hidden="true" />
        <div className="positioning-map-axis positioning-map-axis-x">
          <span>Lower value</span>
          <strong>{map.xLabel}</strong>
          <span>Higher value</span>
        </div>
        <div className="positioning-map-axis positioning-map-axis-y">
          <span>Stronger characteristics</span>
          <strong>{map.yLabel}</strong>
          <span>Weaker characteristics</span>
        </div>
        <div className="positioning-map-marker is-benchmark" style={benchmarkStyle}>
          <b />
          <span>{map.benchmark.label}</span>
        </div>
        <div className="positioning-map-marker is-subject" style={subjectStyle}>
          <b />
          <span>{map.subject.label}</span>
        </div>
        <p className="positioning-map-band-label">{map.bandLabel}</p>
      </div>
      <div className="positioning-map-summary">
        <strong>{`${formatOrdinal(map.subject.x)} pct value / ${formatOrdinal(map.subject.y)} pct characteristics`}</strong>
        <p>{map.read}</p>
      </div>
    </div>
  );
}

function formatOrdinal(value) {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${value}st`;
  }

  if (mod10 === 2 && mod100 !== 12) {
    return `${value}nd`;
  }

  if (mod10 === 3 && mod100 !== 13) {
    return `${value}rd`;
  }

  return `${value}th`;
}

function PositioningComparisonPanel({ rows }) {
  return (
    <div className="positioning-comparison-panel">
      <div className="positioning-comparison-panel-head">
        <span>Measure</span>
        <span>Subject</span>
        <span>Local</span>
        <span>National</span>
        <span>Read</span>
      </div>
      <div className="positioning-comparison-panel-body">
        {rows.map((row) => (
          <article key={row[0]} className="positioning-comparison-panel-row">
            {row.map((cell) => (
              <span key={`${row[0]}-${cell}`}>{cell}</span>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}

function PositioningDomainMatrix({ groups }) {
  return (
    <div className="positioning-domain-matrix">
      <div className="positioning-domain-head">
        <span>Measure</span>
        <span>Subject</span>
        <span>Local Area</span>
        <span>National</span>
        <span>Position</span>
      </div>
      <div className="positioning-domain-body">
        {groups.map((group) => (
          <section key={group.title} className="positioning-domain-group">
            <h3>{group.title}</h3>
            <div>
              {group.rows.map((row) => (
                <article key={`${group.title}-${row[0]}`} className="positioning-domain-row">
                  {row.map((cell) => (
                    <span key={`${group.title}-${row[0]}-${cell}`}>{cell}</span>
                  ))}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function PositioningRankCards({ rows }) {
  return (
    <div className="positioning-rank-cards">
      {rows.map((row) => (
        <article key={row.label} className="positioning-rank-card">
          <header>
            <div>
              <span>{row.label}</span>
              <strong>{row.subject}</strong>
            </div>
            <em>{row.localText} / {row.nationalText}</em>
          </header>
          <div className="positioning-rank-rail">
            <i />
            <b className="is-local" style={{ left: `${row.local}%` }} />
            <b className="is-national" style={{ left: `${row.national}%` }} />
          </div>
          <footer>
            <span>Local</span>
            <span>National</span>
          </footer>
        </article>
      ))}
    </div>
  );
}

function ComparableEvidenceSection({ section, data }) {
  return (
    <section className="valuation-layout comps-layout">
      <div className="comps-bottom">
        <Panel className="comps-summary-panel">
          <ComparableEvidenceStats metrics={data.comps.evidenceStats} />
        </Panel>
      </div>
      <Panel title="Comparable Evidence" className="comps-matrix-panel">
        <ComparableEvidenceMatrix rows={data.comps.evidenceRows} />
      </Panel>
    </section>
  );
}

function IncomeYieldSection({ section, data }) {
  return (
    <section className="valuation-layout income-layout">
      <SectionLead section={section} />
      <div className="income-main">
        <Panel title="Rental Evidence">
          <CompactTable columns={["Evidence", "Rent pcm", "£/sqm", "Yield", "Read"]} rows={data.income.rentRows} />
        </Panel>
        <Panel title="Yield Position">
          <BarList rows={data.income.incomeStack} />
        </Panel>
      </div>
      <Panel title="Income Sensitivity">
        <CompactTable columns={["Scenario", "Rent pcm", "Yield", "Valuation Read"]} rows={data.income.sensitivity} />
      </Panel>
    </section>
  );
}

function RiskOutlookSection({ section, data }) {
  return (
    <section className="valuation-layout risk-layout">
      <SectionLead section={section} />
      <div className="risk-main">
        <Panel title="Risk Register">
          <CompactTable columns={["Risk", "Level", "Evidence", "Impact"]} rows={data.risk.riskRows} />
        </Panel>
        <Panel title="Valuation Scenarios">
          <CompactTable columns={["Scenario", "Value", "£/sqm", "Rent", "Exit", "Read"]} rows={data.risk.scenarios} />
        </Panel>
      </div>
      <Panel title="Forward Watchpoints">
        <CompactTable columns={["Driver", "Current", "12M View", "Watchpoint"]} rows={data.risk.outlookRows} />
      </Panel>
    </section>
  );
}

function Panel({ title, meta, className = "", children }) {
  return (
    <section className={["panel", className].filter(Boolean).join(" ")}>
      {title || meta ? (
        <div className="panel-header">
          {title ? <p className="panel-title">{title}</p> : null}
          {meta ? <span>{meta}</span> : null}
        </div>
      ) : null}
      <div className="panel-body">{children}</div>
    </section>
  );
}

function SubjectValuationSheet({ identity, estimate }) {
  return (
    <div className="subject-valuation-sheet">
      <div className="subject-address-card">
        <div className="subject-address-block">
          <strong>{identity.address}</strong>
          <span>{identity.descriptor} · {identity.reportDate}</span>
          <p>Central value supported by recent terrace evidence, stable local pricing and a defined confidence range.</p>
        </div>
        <div className="subject-valuation-read">
          <div className="subject-estimate-card" aria-label="Valuation summary">
            <div className="estimate-core">
              <span>Market value</span>
              <strong>{estimate.point}</strong>
              <em>{estimate.capitalValue}</em>
            </div>
            <div className="estimate-bound">
              <span>Lower bound</span>
              <strong>{estimate.lower}</strong>
              <em>{estimate.lowerCapitalValue}</em>
            </div>
            <div className="estimate-bound">
              <span>Upper bound</span>
              <strong>{estimate.upper}</strong>
              <em>{estimate.upperCapitalValue}</em>
            </div>
            <div className="estimate-range">
              <span>Range width</span>
              <strong>{estimate.rangeWidth}</strong>
              <em>{estimate.rangePercent}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAssetRegisterGroups(summary) {
  const assetProfile = summary.summaryGroups.find((group) => group.title === "Asset Profile");
  const profileValue = (label) => assetProfile.rows.find(([rowLabel]) => rowLabel === label)?.[1];

  return [
    {
      title: "Asset",
      lead: `${profileValue("Asset type")} / ${profileValue("Tenure")}`,
      rows: [
        ["Floor area", profileValue("Floor area")],
        ["Bedrooms", profileValue("Beds")],
        ["Use", profileValue("Use")]
      ]
    },
    {
      title: "Physical",
      lead: "Form",
      rows: [
        ["EPC", profileValue("EPC")],
        ["Condition", profileValue("Condition")],
        ["Build", profileValue("Build date")]
      ]
    },
    {
      title: "Market Fit",
      lead: profileValue("Class"),
      rows: [
        ["Band", profileValue("Band")],
        ["Liquidity", profileValue("Liquidity")],
        ["Profile", "Core resale"]
      ]
    }
  ];
}

function getValuationCheckValue(summary, label) {
  const valuationChecks = summary.summaryGroups.find((group) => group.title === "Valuation Checks");
  return valuationChecks.rows.find(([rowLabel]) => rowLabel === label)?.[1];
}

function getPropertyCharacteristicRows(summary) {
  const assetProfile = summary.summaryGroups.find((group) => group.title === "Asset Profile");
  const profileValue = (label) => assetProfile.rows.find(([rowLabel]) => rowLabel === label)?.[1];

  return [
    { label: "Type", value: profileValue("Asset type") },
    { label: "Beds", value: "3 beds" },
    { label: "Tenure", value: profileValue("Tenure") },
    { label: "Area", value: "104 m²" },
    { label: "Plot", value: "0.045 ac" },
    { label: "EPC", value: "C" },
    { label: "Build", value: profileValue("Build date") },
    { label: "Finish", value: "Good" },
    { label: "New Build", value: "No" },
    { label: "Use", value: "Single" },
    { label: "Value Tier", value: "Core" },
    { label: "Class", value: "Core urban" }
  ];
}

function getBallparkEstimateRows(summary) {
  const checkValue = (label) => getValuationCheckValue(summary, label);

  return [
    {
      label: "Income Approach",
      value: checkValue("Income check"),
      method: "Annualised rent at local house yield",
      inputs: [
        { label: "Income", value: "£36.9k pa" }
      ],
      benchmark: { label: "Yield", value: "4.2%" },
    },
    {
      label: "Replacement Cost",
      value: checkValue("Cost check"),
      method: "Build-cost proxy plus land allowance",
      inputs: [
        { label: "Build Cost", value: "£738k" },
        { label: "Land", value: "£74k" }
      ],
      benchmark: null,
    }
  ];
}

function getImpliedValueRows(summary) {
  const checkValue = (label) => getValuationCheckValue(summary, label);

  return [
    { label: "Implied Yield", value: `${checkValue("Gross yield")} GIY`, note: "Yield implied by estimated value." },
    { label: "Implied Land Value", value: checkValue("Land value"), note: "Plot value implied by estimated value." },
    { label: "Implied Rent", value: "£3,065 pcm", note: "Rent implied by estimated value." },
    { label: "Implied Tenure Ratio", value: "1.07x", note: "FH/LH ratio based on estimated value." }
  ];
}

function getTriangulationRows(summary) {
  const checkValue = (label) => getValuationCheckValue(summary, label);

  return [
    { label: "Income approach", value: checkValue("Income check"), delta: "+£3k" },
    { label: "Replacement cost", value: checkValue("Cost check"), delta: "-£63k" },
    { label: "Comps anchor", value: checkValue("Comps anchor"), delta: "-£10k" },
    { label: "Spatial anchor", value: checkValue("PCM anchor"), delta: "+£7k" },
    { label: "Repeat anchor", value: checkValue("Memory anchor"), delta: "-£17k" }
  ];
}

function getEvidenceInputRows(summary) {
  const checkValue = (label) => getValuationCheckValue(summary, label);

  return [
    ["Confidence", summary.estimate.confidence],
    ["Range width", checkValue("Range width")],
    ["Comp depth", checkValue("Comp depth")],
    ["Gross yield", checkValue("Gross yield")],
    ["Land value", checkValue("Land value")]
  ];
}

function SnapshotMetricGrid({ metrics }) {
  return (
    <div className="snapshot-metric-grid">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
      ))}
    </div>
  );
}

function MetricPlate({ hero, metrics }) {
  return (
    <div className="metric-plate">
      <div className="metric-plate-hero">
        {hero.map((metric) => (
          <div key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
      <div className="metric-plate-grid">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function DenseMetricMatrix({ rows }) {
  return (
    <div className="dense-metric-matrix">
      {rows.map((row) => (
        <div key={row.map((metric) => metric.label).join("-")} className="dense-metric-row">
          {row.map((metric) => (
            <div key={metric.label} className="dense-metric-cell">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AssetRegister({ groups }) {
  return (
    <div className="asset-register">
      {groups.map((group) => (
        <section key={group.title} className="asset-register-group">
          <header>
            <span>{group.title}</span>
            <strong>{group.lead}</strong>
          </header>
          <div>
            {group.rows.map(([label, value]) => (
              <p key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ValuationTriangulation({ rows, estimate }) {
  return (
    <div className="valuation-triangulation">
      <header className="triangulation-anchor">
        <span>Point estimate</span>
        <strong>{estimate}</strong>
      </header>
      <div className="triangulation-rows">
        {rows.map((row) => (
          <div key={row.label} className="triangulation-row">
            <span>{row.label}</span>
            <strong>{row.value}</strong>
            <em>{row.delta}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceInputs({ rows }) {
  return (
    <div className="evidence-inputs">
      {rows.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function SummaryDataTable({ rows }) {
  return (
    <div className="summary-data-table">
      <div className="summary-data-head">
        <span>Measure</span>
        <span>Value</span>
        <span>Read</span>
      </div>
      <div className="summary-data-body">
        {rows.map((row) => (
          <div key={row.label} className="summary-data-row">
            <span>{row.label}</span>
            <strong>{row.value}</strong>
            <em>{row.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function PropertyCharacteristicsGrid({ rows }) {
  return (
    <div className="property-characteristics-matrix">
      {rows.map((row) => (
        <div key={row.label} className="property-characteristic-cell">
          <span>{row.label}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}

function BallparkEstimatesPanel({ rows }) {
  return (
    <div className="ballpark-estimates-panel">
      {rows.map((row) => (
        <article key={row.label} className="ballpark-estimate-row">
          <header>
            <div>
              <span>{row.label}</span>
              <em>{row.method}</em>
            </div>
          </header>
          <MiniEstimateStrip items={[{ label: "Estimate", value: row.value }, ...row.inputs, row.benchmark].filter(Boolean)} />
        </article>
      ))}
    </div>
  );
}

function MiniEstimateStrip({ items }) {
  return (
    <div className="mini-estimate-strip" style={{ "--mini-point-count": items.length }}>
      {items.map((item, index) => (
        <div key={item.label} className={`mini-estimate-point${index === 0 ? " is-core" : ""}`}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function ImpliedValuesPanel({ rows }) {
  return (
    <div className="implied-values-panel">
      {rows.map((row) => (
        <article key={row.label} className="implied-value-row">
          <header>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </header>
          <p>{row.note}</p>
        </article>
      ))}
    </div>
  );
}

function ValuationSupport({ families }) {
  const contributionValue = (family) => Number.parseFloat(family.contribution);
  const findFamily = (familyName) => families.find((family) => family.family === familyName);
  const evidenceBody = (family) => family.evidence.replace(`${family.metric} - `, "");
  const combineFamilies = ({ family, contributionFamilies, metricLabel, metric, evidence, tone }) => {
    const sourceFamilies = contributionFamilies.map(findFamily).filter(Boolean);
    const contribution = sourceFamilies.reduce((sum, sourceFamily) => sum + contributionValue(sourceFamily), 0);

    return {
      family,
      contribution: `${contribution}%`,
      metricLabel,
      metric,
      evidence,
      tone
    };
  };
  const groupConfig = [
    {
      title: "Asset Characteristics",
      read: "Subject definition and physical form.",
      rows: [findFamily("Property Identity"), findFamily("Physical Form")]
    },
    {
      title: "Market Evidence",
      read: "Comparable depth and market movement.",
      rows: [findFamily("Comparables"), findFamily("Momentum")]
    },
    {
      title: "Spatial Context",
      read: "Location, street-row and access signal.",
      rows: [
        combineFamilies({
          family: "Spatial",
          contributionFamilies: ["Location", "Spatial", "Microspatial"],
          metricLabel: "Spatial signal",
          metric: "SW18 / £8.5k",
          evidence: "SW18 / £8.5k - location, nearby pricing and street-row evidence support the value read.",
          tone: "location"
        }),
        findFamily("Static Context")
      ]
    }
  ];
  const groups = groupConfig.map((group) => {
    const rows = group.rows.filter(Boolean);
    const total = rows.reduce((sum, family) => sum + contributionValue(family), 0);
    return { ...group, rows, total };
  });

  return (
    <div className="valuation-support">
      <div className="valuation-driver-map">
        {groups.map((group, index) => (
          <Fragment key={group.title}>
            {index > 0 && <div className="valuation-breakdown-divider" aria-hidden="true" />}
            <section className="valuation-breakdown-tile">
            <header className="breakdown-tile-header">
              <div>
                <strong>
                  {group.title}
                  <em>{group.total}%</em>
                </strong>
              </div>
            </header>
            <div className="breakdown-driver-stack">
              {group.rows.map((family) => (
                <article key={family.family} className="breakdown-driver-row">
                  <header>
                    <span>
                      {family.family}
                      <strong>- {family.contribution}</strong>
                    </span>
                  </header>
                  <p>
                    <strong>{family.metric}</strong>
                    <span> - {evidenceBody(family)}</span>
                  </p>
                </article>
              ))}
            </div>
            </section>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ValuePathChart({ points }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const hoveredPoint = hoveredIndex === null ? null : points[hoveredIndex];
  const width = 520;
  const height = 190;
  const padLeft = 14;
  const padRight = 18;
  const plotLeft = padLeft;
  const plotRight = width - padRight;
  const padTop = 9;
  const padBottom = 34;
  const axisBottom = height - 18;
  const values = points.flatMap((point) => [point.low, point.value, point.high, point.peer, point.national]);
  const min = Math.floor((Math.min(...values) - 8) / 10) * 10;
  const max = Math.ceil((Math.max(...values) + 8) / 10) * 10;
  const mid = Math.round((min + max) / 20) * 10;
  const ticks = [max, mid, min];
  const xFor = (index) => plotLeft + (index * (plotRight - plotLeft)) / (points.length - 1);
  const yFor = (value) => height - padBottom - ((value - min) / (max - min)) * (height - padTop - padBottom);
  const xPercent = (x) => `${(x / width) * 100}%`;
  const yPercent = (y) => `${(y / height) * 100}%`;
  const peerLine = points.map((point, index) => `${xFor(index)},${yFor(point.peer)}`).join(" ");
  const nationalLine = points.map((point, index) => `${xFor(index)},${yFor(point.national)}`).join(" ");
  const tooltipWidth = 112;
  const tooltipX = hoveredIndex === null ? 0 : Math.min(Math.max(xFor(hoveredIndex) - tooltipWidth / 2, padLeft), width - tooltipWidth - padRight);
  const tooltipY = hoveredPoint ? Math.max(yFor(hoveredPoint.high) - 43, padTop) : 0;

  return (
    <div className="value-path">
      <div className="value-path-legend" aria-hidden="true">
        <span>
          <i className="is-local" />
          <em>Local 3-bed terrace equivalent</em>
        </span>
        <span>
          <i className="is-national" />
          <em>National 3-bed terrace equivalent</em>
        </span>
      </div>
      <div className="value-plot">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Six-month valuation path">
          <line className="value-axis-line" x1={plotLeft} y1={axisBottom} x2={plotRight} y2={axisBottom} />
          {points.map((point, index) => (
            <line
              key={`${point.month}-axis-tick`}
              className="value-month-tick"
              x1={xFor(index)}
              y1={axisBottom - 2.5}
              x2={xFor(index)}
              y2={axisBottom + 2.5}
            />
          ))}
          {ticks.map((tick, index) => (
            <g key={tick} className={`value-axis-tick${index === 0 ? " is-top" : ""}${index === ticks.length - 1 ? " is-bottom" : ""}`}>
              <line x1={padLeft} y1={yFor(tick)} x2={width - padRight} y2={yFor(tick)} />
            </g>
          ))}
          <polyline className="value-national-line" points={nationalLine} />
          <polyline className="value-peer-line" points={peerLine} />
          {points.map((point, index) => (
            <g
              key={point.month}
              className="value-interval"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
            >
              <line className="value-interval-stem" x1={xFor(index)} y1={yFor(point.low)} x2={xFor(index)} y2={yFor(point.high)} />
              <line x1={xFor(index) - 4.5} y1={yFor(point.low)} x2={xFor(index) + 4.5} y2={yFor(point.low)} />
              <line x1={xFor(index) - 4.5} y1={yFor(point.high)} x2={xFor(index) + 4.5} y2={yFor(point.high)} />
              <circle className="value-hit" cx={xFor(index)} cy={yFor(point.value)} r={11} />
            </g>
          ))}
          {hoveredPoint ? (
            <g className="value-tooltip" transform={`translate(${tooltipX} ${tooltipY})`}>
              <rect width={tooltipWidth} height="38" rx="2" />
              <text x="8" y="13">{hoveredPoint.month}</text>
              <text x="8" y="25">{`£${hoveredPoint.value}k`}</text>
              <text x="8" y="34">{`Local £${hoveredPoint.peer}k · UK £${hoveredPoint.national}k`}</text>
            </g>
          ) : null}
        </svg>
          {points.map((point, index) => (
            <span
              key={`${point.month}-high`}
            className={`value-bound-label is-high${index % 2 ? " is-offset" : ""}`}
              style={{ left: xPercent(xFor(index)), top: yPercent(yFor(point.high)) }}
            >
              {`£${point.high}k`}
          </span>
        ))}
        {points.map((point, index) => (
          <span
            key={`${point.month}-value`}
            className="value-point-label"
            style={{ left: xPercent(xFor(index)), top: yPercent(yFor(point.value)) }}
          >
            {`£${point.value}k`}
          </span>
        ))}
          {points.map((point, index) => (
            <span
              key={`${point.month}-low`}
            className={`value-bound-label is-low${index % 2 ? " is-offset" : ""}`}
              style={{ left: xPercent(xFor(index)), top: yPercent(yFor(point.low)) }}
            >
              {`£${point.low}k`}
          </span>
        ))}
        {points.map((point, index) => (
          <span
            key={`${point.month}-label`}
            className="value-x-label"
            style={{ left: xPercent(xFor(index)), top: yPercent(axisBottom + 15) }}
          >
            {point.month}
          </span>
        ))}
      </div>
    </div>
  );
}

function KeyValueList({ rows, emphasisFirst = false }) {
  return (
    <div className={`key-value-list${emphasisFirst ? " has-emphasis" : ""}`}>
      {rows.map(([label, value], index) => (
        <div key={label} className={index === 0 ? "is-primary" : ""}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function FactMatrix({ rows, compact = false }) {
  const pairedRows = [];

  for (let index = 0; index < rows.length; index += 2) {
    const first = rows[index];
    const second = rows[index + 1] || ["", ""];
    pairedRows.push([first[0], first[1], second[0], second[1]]);
  }

  return (
    <div className={`fact-matrix${compact ? " is-compact" : ""}`}>
      {pairedRows.map((row, rowIndex) => (
        <div key={`${row[0]}-${rowIndex}`} className="fact-row">
          <span>{row[0]}</span>
          <strong>{row[1]}</strong>
          <span>{row[2]}</span>
          <strong>{row[3]}</strong>
        </div>
      ))}
    </div>
  );
}

function SummaryFactList({ rows }) {
  const pairedRows = [];

  for (let index = 0; index < rows.length; index += 2) {
    pairedRows.push([rows[index], rows[index + 1] || ["", ""]]);
  }

  return (
    <div className="summary-fact-list">
      {pairedRows.map(([[leftLabel, leftValue], [rightLabel, rightValue]], index) => (
        <div key={`${leftLabel}-${index}`} className="summary-fact-row">
          <div className="summary-fact-cell">
            <span>{leftLabel}</span>
            <strong>{leftValue}</strong>
          </div>
          <div className="summary-fact-cell">
            <span>{rightLabel}</span>
            <strong>{rightValue}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

function CharacteristicLedger({ rows }) {
  const rowPairs = rows.slice(0, 5).map((left, index) => [left, rows[index + 5]]);

  return (
    <div className="characteristic-ledger">
      {rowPairs.map(([[leftLabel, leftValue], right], index) => {
        const [rightLabel, rightValue] = right || ["", ""];

        return (
          <div key={`${leftLabel}-${index}`} className="characteristic-row">
            <div className="characteristic-item">
              <span>{leftLabel}</span>
              <strong>{leftValue}</strong>
            </div>
            <div className="characteristic-item">
              <span>{rightLabel}</span>
              <strong>{rightValue}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HeadlineMetrics({ metrics, compact = false }) {
  return (
    <div className={`headline-metrics${compact ? " is-compact" : ""}`}>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          {metric.note ? <em>{metric.note}</em> : null}
        </div>
      ))}
    </div>
  );
}

function BarList({ rows }) {
  return (
    <div className="bar-list">
      {rows.map((row) => (
        <div key={row.label} className="bar-row">
          <div>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
          <i>
            <b style={{ width: `${row.width}%` }} />
          </i>
        </div>
      ))}
    </div>
  );
}

function CompactTable({ columns, rows, className = "" }) {
  return (
    <div className={["compact-table", `cols-${columns.length}`, className].filter(Boolean).join(" ")}>
      <div className="compact-table-head">
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="compact-table-body">
        {rows.map((row, rowIndex) => (
          <div key={`${row[0]}-${rowIndex}`} className="compact-table-row">
            {row.map((cell, cellIndex) => (
              <span key={`${cell}-${cellIndex}`}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparableEvidenceMatrix({ rows }) {
  return (
    <div className="comparable-evidence-matrix">
      <div className="comparable-evidence-head">
        <span aria-label="Rank" />
        <span className="transaction-head">Transaction</span>
        <span>Distance</span>
        <span>Price</span>
        <span>£/sqm</span>
        <span>Weight</span>
        <span>Similarity</span>
        <span>Time Adj. Price</span>
        <span>Time Adj. £/sqm</span>
      </div>
      <div className="comparable-evidence-body">
        {rows.map((row) => (
          <article key={row.name} className="comparable-evidence-row">
            <span className="comparable-rank-cell">{row.rank}</span>
            <div className="comparable-address-cell">
              <strong>{row.name}</strong>
              <em>{row.meta}</em>
            </div>
            <span>{row.distance}</span>
            <span>{row.price}</span>
            <span>{row.ppsqm}</span>
            <span>{row.weight}</span>
            <div className="comparable-fit-cell">
              <strong>{row.fit}%</strong>
              <i>
                <b style={{ width: `${row.fit}%` }} />
              </i>
            </div>
            <span>{row.timePrice}</span>
            <span>{row.timePpsqm}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function ComparableEvidenceStats({ metrics }) {
  return (
    <div className="comparable-evidence-stats">
      {metrics.map((group) => (
        <section key={group.title} className="comparable-summary-group">
          <h3>{group.title}</h3>
          <div className="comparable-summary-details">
            {group.metrics.map((metric) => (
              <p key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ComparableNormalisationTable({ rows }) {
  return (
    <div className="comparable-normalisation-table">
      <div className="comparable-normalisation-head">
        <span>Step</span>
        <span>Basis</span>
        <span>Effect</span>
        <span>Output</span>
      </div>
      <div className="comparable-normalisation-body">
        {rows.map((row) => (
          <div key={row[0]} className="comparable-normalisation-row">
            {row.map((cell, index) => (
              <span key={`${row[0]}-${index}`}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function WideCompsTable({ columns, rows }) {
  return (
    <div className="wide-comps-table">
      <div className="wide-comps-head">
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="wide-comps-body">
        {rows.map((row) => (
          <div key={row[0]} className="wide-comps-row">
            {row.map((cell, index) => (
              <span key={`${row[0]}-${index}`}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m10 3.5-4.5 4.5 4.5 4.5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m6 3.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function RailToggleIcon({ collapsed }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d={collapsed ? "m6 3.5 4.5 4.5-4.5 4.5" : "m10 3.5-4.5 4.5 4.5 4.5"} />
    </svg>
  );
}
