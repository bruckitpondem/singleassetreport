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
      title: "Value Enhancements",
      headline: "Asset-level upgrade sensitivities and a worked enhancement case.",
      description:
        "The section tests extension-led value creation, efficiency-led income benefits and a combined upgrade case. Figures are illustrative sensitivities based on the adopted subject valuation.",
      component: ValueEnhancementsReturnsSection
    },
    {
      title: "Investment Analysis",
      headline: "Cash flow model for acquisition, income, financing and disposal mechanics.",
      description:
        "The schedule sets out a simple multi-year cash flow model from acquisition through income, operating costs, financing and disposal. Values are illustrative and should be read as an investment analysis rather than a valuation conclusion.",
      component: InvestmentProformaSection
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
    domains: [
      {
        title: "Headline Comparisons",
        size: "wide",
        read: "Like-for-like estimate for a 104 sqm freehold terrace, compared with equivalent locality, London and national market frames.",
        columns: ["Metric", "Property", "Locality", "London", "National"],
        rows: [
          ["Market value", "£875k", "£830k", "£805k", "£286k"],
          ["Capital value", "£8,420", "£8,090", "£7,760", "£3,160"],
          ["Implied rent", "£3,075", "£2,960", "£2,875", "£1,150"],
          ["Est. Gross yield", "4.2%", "4.1%", "4.0%", "4.8%"]
        ]
      },
      {
        title: "Accommodation Scale",
        size: "narrow",
        read: "Internal area and living-space count compare the subject with equivalent terrace stock.",
        columns: ["Frame", "Area", "Living spaces"],
        rows: [
          ["Subject", "104 m²", "5"],
          ["Locality", "96 m²", "4.6"],
          ["London", "93 m²", "4.4"],
          ["National", "88 m²", "4.2"]
        ]
      },
      {
        title: "Asset Proximity",
        size: "narrow",
        read: "Subject-level proximity measures capture access to green space, amenities, roads and transport.",
        columns: ["Measure", "Nearest", "≤1km"],
        rows: [
          ["Green space", "0.4 mi", "3 parks"],
          ["Amenities", "6 min", "42 places"],
          ["Stations", "0.6 mi", "2 stations"],
          ["Schools", "0.3 mi", "6 schools"]
        ]
      },
      {
        title: "Property Attributes",
        size: "wide",
        read: "Non-financial attributes compare the subject with equivalent 104 sqm freehold terrace stock across wider market frames.",
        columns: ["Metric", "Property", "Locality", "London", "National"],
        rows: [
          ["Plot size", "0.045 ac", "0.036 ac", "0.034 ac", "0.029 ac"],
          ["Building / plot", "0.53x", "0.61x", "0.64x", "0.70x"],
          ["Extension count", "1", "0.7", "0.5", "0.4"],
          ["Avg room size", "17.3 m²", "16.1 m²", "15.4 m²", "14.8 m²"]
        ]
      },
      {
        title: "Market Conditions",
        size: "wide",
        read: "Postcode market structure is compared with wider frames, including detached pricing premium.",
        columns: ["Metric", "Postcode", "Locality", "London", "National"],
        rows: [
          ["Sales / km²", "18", "14", "11", "5"],
          ["Turnover", "4.8%", "4.1%", "3.6%", "2.4%"],
          ["New completions", "38", "214", "9,840", "182k"],
          ["Detached premium", "+6%", "+9%", "-3%", "+18%"]
        ]
      },
      {
        title: "Premiums",
        size: "narrow",
        read: "Pricing premiums compare freehold and new-build uplifts across each market frame.",
        columns: ["Frame", "Freehold", "New-build"],
        rows: [
          ["Postcode", "+8.4%", "+11.2%"],
          ["Locality", "+7.1%", "+9.4%"],
          ["London", "+5.8%", "+7.8%"],
          ["National", "+3.2%", "+5.1%"]
        ]
      }
    ]
  },
  comps: {
    evidenceRead: "Eight nearby terrace transactions provide a tight evidence set, with strongest weight on recent, close-proximity sales and limited £/sqm variance after time adjustment.",
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
        read: "Tight pricing cluster near adopted £/sqm.",
        metrics: [
          { label: "Weighted £/sqm", value: "£8,420" },
          { label: "Median Comp", value: "£8,330" },
          { label: "Current Range", value: "£8.34k-£8.46k" }
        ]
      },
      {
        title: "Evidence Quality",
        read: "Close, recent terrace comps carry weight.",
        metrics: [
          { label: "Evidence Depth", value: "8 comps" },
          { label: "Prime Weight", value: "72%" },
          { label: "Similarity Range", value: "58-92%" }
        ]
      },
      {
        title: "Normalization",
        read: "Light adjustment after time and distance.",
        metrics: [
          { label: "Mean Distance", value: "0.29 mi" },
          { label: "Recency Window", value: "10 mo" },
          { label: "Net Adjustment", value: "+0.2%" }
        ]
      }
    ]
  },
  investment: {
    extensionRows: [
      ["One-bed Extension", "+18 m²", "£74k", "£975k", "+£26k", "£3,360", "+£285", "-0.06 pp"],
      ["Two-bed Extension", "+30 m²", "£126k", "£1.07m", "+£69k", "£3,585", "+£510", "-0.18 pp"],
      ["Loft Conversion", "+24 m²", "£96k", "£1.02m", "+£49k", "£3,465", "+£390", "-0.12 pp"],
      ["One-bed Ext. + Loft", "+42 m²", "£178k", "£1.17m", "+£117k", "£3,835", "+£760", "-0.27 pp"]
    ],
    retrofitGroups: [
      {
        title: "Solar PV Grid Export",
        read: "Export-led PV sensitivity based on plant size.",
        rows: [
          ["3.6 kW", "£520", "£8k", "+0.06 pp"],
          ["4.8 kW", "£690", "£10k", "+0.08 pp"],
          ["5.6 kW", "£820", "£12k", "+0.10 pp"],
          ["7.2 kW", "£1.1k", "£15k", "+0.13 pp"]
        ]
      },
      {
        title: "Solar PV Battery Powered",
        read: "Self-consumption case with battery storage.",
        rows: [
          ["3.6 kW", "£780", "£13k", "+0.09 pp"],
          ["4.8 kW", "£1.0k", "£16k", "+0.12 pp"],
          ["5.6 kW", "£1.3k", "£18k", "+0.15 pp"],
          ["7.2 kW", "£1.6k", "£22k", "+0.18 pp"]
        ]
      },
      {
        title: "Heat Pump",
        read: "Heat pump sensitivity by installed system size.",
        rows: [
          ["6 kW", "£640", "£14k", "+0.07 pp"],
          ["8 kW", "£760", "£17k", "+0.09 pp"],
          ["10 kW", "£920", "£22k", "+0.11 pp"],
          ["12 kW", "£1.1k", "£25k", "+0.13 pp"]
        ]
      },
      {
        title: "Insulation",
        read: "Insulation sensitivity by coverage level.",
        rows: [
          ["Loft only", "£260", "£2k", "+0.03 pp"],
          ["Loft + wall", "£610", "£11k", "+0.07 pp"],
          ["Wall + floor", "£820", "£16k", "+0.10 pp"],
          ["Full Fabric", "£1.1k", "£24k", "+0.13 pp"]
        ]
      }
    ],
    workedCase: {
      title: "Worked Upgrade Case",
      cases: [
        {
          title: "Base Case",
          tag: "Current",
          read: "Current position before upgrades.",
          metrics: [
            ["Value", "£875k"],
            ["12m Income", "£36.9k"],
            ["GIY", "4.20%"],
            ["Rooms", "2"],
            ["Beds", "3 beds"],
            ["Floor Area", "104 m²"]
          ]
        },
        {
          title: "Example Upgrade",
          tag: "Loft + opex",
          read: "Loft conversion plus opex savings.",
          metrics: [
            ["Value", "£1.02m"],
            ["12m Income", "£42.7k"],
            ["GIY", "4.18%"],
            ["Rooms", "3"],
            ["Beds", "4 beds"],
            ["Floor Area", "128 m²"]
          ]
        }
      ]
    },
    proforma: {
      columns: ["Line Item", "Year 0", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7"],
      rows: [
        { type: "section", label: "Purchase Price", metrics: [["Acq. Fees", "2.0%"], ["SDLT", "6.5%"]] },
        { type: "item", label: "Acquisition Cost", values: ["£875k", "—", "—", "—", "—", "—", "—", "—"] },
        { type: "item", label: "SDLT + Acq. Fees", values: ["£39k", "—", "—", "—", "—", "—", "—", "—"] },
        { type: "total", label: "Total Purchase", values: ["£914k", "—", "—", "—", "—", "—", "—", "—"] },
        { type: "section", label: "Income", metrics: [["Rent Growth", "3.0%"], ["Expense Growth", "3.0%"]] },
        { type: "item", label: "Gross Rental Income", values: ["—", "£36.9k", "£38.0k", "£39.1k", "£40.3k", "£41.5k", "£42.7k", "£44.0k"] },
        { type: "item", label: "Operational Expenses", values: ["—", "-£5.5k", "-£5.7k", "-£5.8k", "-£6.0k", "-£6.2k", "-£6.4k", "-£6.6k"] },
        { type: "total", label: "Net Operating Income", values: ["—", "£31.4k", "£32.3k", "£33.3k", "£34.3k", "£35.3k", "£36.3k", "£37.4k"] },
        { type: "section", label: "Disposal", metrics: [["Disp. Fees", "2.0%"], ["CGT", "0.0%"]] },
        { type: "item", label: "Disposal Value", values: ["—", "—", "—", "—", "—", "—", "—", "£1.12m"] },
        { type: "item", label: "CGT + Disp. Fees", values: ["—", "—", "—", "—", "—", "—", "—", "-£22k"] },
        { type: "total", label: "Total Disposal", values: ["—", "—", "—", "—", "—", "—", "—", "£1.10m"] },
        { type: "section", label: "Unlevered Cash Flow", metrics: [["IRR", "6.2%"], ["Equity Multiple", "1.47x"], ["Cash-on-Cash Yield", "18.2%"]], result: true },
        { type: "item", label: "Net Operating Income", values: ["—", "£31.4k", "£32.3k", "£33.3k", "£34.3k", "£35.3k", "£36.3k", "£37.4k"] },
        { type: "item", label: "Acquisition & Disposal", values: ["-£914k", "—", "—", "—", "—", "—", "—", "£1.10m"] },
        { type: "total", label: "Unlevered Cash Flow", values: ["-£914k", "£31.4k", "£32.3k", "£33.3k", "£34.3k", "£35.3k", "£36.3k", "£1.14m"] },
        { type: "section", label: "Financing", metrics: [["Mortgage Type", "Repayment"], ["LTV", "60%"], ["Initial Rate", "5.25%"], ["Reversion Rate", "7.75% SVR"], ["Term", "25 years"]] },
        { type: "item", label: "Financing Proceeds", values: ["£525k", "—", "—", "—", "—", "—", "—", "—"] },
        { type: "item", label: "Financing Fees", values: ["-£8k", "—", "—", "—", "—", "—", "—", "—"] },
        { type: "item", label: "Principal & Interest", values: ["—", "-£32.8k", "-£32.7k", "-£32.5k", "-£32.4k", "-£32.2k", "-£32.1k", "-£508.9k"] },
        { type: "total", label: "Debt Flows", values: ["£517k", "-£32.8k", "-£32.7k", "-£32.5k", "-£32.4k", "-£32.2k", "-£32.1k", "-£508.9k"] },
        { type: "section", label: "Levered Cash Flow", metrics: [["IRR", "7.0%"], ["Equity Multiple", "1.60x"], ["Cash-on-Cash Yield", "1.0%"]], result: true },
        { type: "item", label: "Unlevered Cash Flow", values: ["-£914k", "£31.4k", "£32.3k", "£33.3k", "£34.3k", "£35.3k", "£36.3k", "£1.14m"] },
        { type: "item", label: "Debt Flows", values: ["£517k", "-£32.8k", "-£32.7k", "-£32.5k", "-£32.4k", "-£32.2k", "-£32.1k", "-£508.9k"] },
        { type: "total", label: "Levered Cash Flow", values: ["-£397k", "-£1.4k", "-£0.4k", "£0.8k", "£1.9k", "£3.1k", "£4.2k", "£629k"] }
      ]
    }
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

function ValuationSummarySection({ section, data }) {
  const summary = data.summary;

  return (
    <section className="valuation-layout valuation-summary-layout">
      <Panel title="Valuation Overview" className="summary-subject-panel">
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
  const assetDomains = data.relative.domains.slice(0, 4);
  const marketDomains = data.relative.domains.slice(4);

  return (
    <section className="valuation-layout positioning-layout">
      <div className="positioning-group-label">
        <span>Asset-Level Comparisons</span>
      </div>
      {assetDomains.map((domain) => (
        <Panel key={domain.title} title={domain.title} className={`positioning-panel is-${domain.size}`}>
          <PositioningDomainSheet domain={domain} />
        </Panel>
      ))}
      <div className="positioning-group-label">
        <span>Local Market Comparisons</span>
      </div>
      {marketDomains.map((domain) => (
        <Panel key={domain.title} title={domain.title} className={`positioning-panel is-${domain.size}`}>
          <PositioningDomainSheet domain={domain} />
        </Panel>
      ))}
    </section>
  );
}

function PositioningDomainSheet({ domain }) {
  return (
    <div className="positioning-domain-content">
      {domain.read ? <p className="positioning-domain-read">{domain.read}</p> : null}
      {domain.type === "points" ? (
        <PositioningPointTile points={domain.points} axis={domain.axis} />
      ) : domain.type === "ranges" ? (
        <PositioningRangeTile ranges={domain.ranges} axis={domain.axis} />
      ) : domain.type === "bars" ? (
        <PositioningBarTile bars={domain.bars} />
      ) : (
        <div className={`positioning-domain-sheet cols-${domain.columns.length}`}>
          <div className="positioning-domain-sheet-head">
            {domain.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
          <div className={`positioning-domain-sheet-body rows-${domain.rows.length}`}>
            {domain.rows.map((row) => (
              <article key={`${domain.title}-${row[0]}`} className="positioning-domain-sheet-row">
                {row.map((cell, index) => (
                  <PositioningDomainCell key={`${domain.title}-${row[0]}-${index}`} cell={cell} />
                ))}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PositioningPointTile({ points, axis }) {
  return (
    <div className="positioning-point-tile">
      <div className="positioning-point-plot" aria-hidden="true">
        <i />
        {points.map((point) => (
          <b
            key={point.label}
            className={point.subject ? "is-subject" : undefined}
            style={{ left: `${point.position}%` }}
          />
        ))}
      </div>
      <div className="positioning-point-axis" aria-hidden="true">
        <span>{axis?.[0]}</span>
        <span>{axis?.[1]}</span>
      </div>
      <div className="positioning-point-list">
        {points.map((point) => (
          <article key={point.label}>
            <span>{point.label}</span>
            <strong>{point.value}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

function PositioningRangeTile({ ranges, axis }) {
  return (
    <div className="positioning-range-tile">
      {ranges.map((range) => {
        const midpoint = range.start + (range.end - range.start) / 2;

        return (
          <article key={range.label} className="positioning-range-row">
            <header>
              <span>{range.label}</span>
              <strong>{range.value}</strong>
              <em>{range.meta}</em>
            </header>
            <div aria-hidden="true">
              <i>
                <b style={{ left: `${range.start}%`, width: `${range.end - range.start}%` }} />
                <strong style={{ left: `${midpoint}%` }} />
              </i>
            </div>
          </article>
        );
      })}
      <footer aria-hidden="true">
        <span>{axis?.[0]}</span>
        <span>{axis?.[1]}</span>
      </footer>
    </div>
  );
}

function PositioningBarTile({ bars }) {
  return (
    <div className="positioning-bar-tile">
      {bars.map((bar) => (
        <article key={bar.label} className="positioning-bar-row">
          <header>
            <span>{bar.label}</span>
            <strong>{bar.value}</strong>
            {bar.meta ? <em>{bar.meta}</em> : null}
          </header>
          <div aria-hidden="true">
            <i>
              <b style={{ width: `${bar.bar}%` }} />
            </i>
          </div>
        </article>
      ))}
    </div>
  );
}

function PositioningDomainCell({ cell }) {
  return <span>{cell}</span>;
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
        <ComparableEvidenceMatrix read={data.comps.evidenceRead} rows={data.comps.evidenceRows} />
      </Panel>
    </section>
  );
}

function ValueEnhancementsReturnsSection({ data }) {
  return (
    <section className="valuation-layout value-enhancement-layout">
      <div className="value-enhancement-group-label space-creation-group-label">
        <span>Space Creation Scenarios</span>
      </div>
      <Panel title="Extension & Conversion" className="extension-value-panel">
        <ExtensionValueTable rows={data.investment.extensionRows} />
      </Panel>
      <div className="value-enhancement-group-label retrofit-group-label">
        <span>Operating Cost Savings</span>
      </div>
      <div className="retrofit-sensitivity-grid">
        {data.investment.retrofitGroups.map((group) => (
          <Panel key={group.title} title={group.title} className="enhancement-sensitivity-panel">
            <EnhancementSensitivityCard group={group} />
          </Panel>
        ))}
      </div>
      <div className="value-enhancement-group-label worked-case-group-label">
        <span>{data.investment.workedCase.title}</span>
      </div>
      <Panel className="worked-upgrade-panel">
        <WorkedUpgradeCase caseData={data.investment.workedCase} />
      </Panel>
    </section>
  );
}

function InvestmentProformaSection({ data }) {
  return (
    <section className="valuation-layout investment-proforma-layout">
      <Panel className="investment-proforma-panel">
        <InvestmentProformaTable proforma={data.investment.proforma} />
      </Panel>
    </section>
  );
}

function InvestmentProformaTable({ proforma }) {
  const formatProformaValue = (value) => {
    if (value === "—") {
      return { className: "is-empty-value", text: value };
    }

    if (typeof value === "string" && value.startsWith("-")) {
      return { className: "is-negative-value", text: `(${value.slice(1)})` };
    }

    return { className: "", text: value };
  };

  const proformaRows = proforma.rows.flatMap((row, rowIndex) => {
    const rows = [{ ...row, key: `${row.label}-${rowIndex}` }];

    if (row.type === "total" && rowIndex < proforma.rows.length - 1) {
      rows.push({ type: "spacer", key: `section-gap-${rowIndex}` });
    }

    return rows;
  });

  const proformaRowTemplate = proformaRows
    .map((row) => (row.type === "spacer" ? "0.42fr" : "minmax(0, 1fr)"))
    .join(" ");

  return (
    <div className="investment-proforma-table">
      <div className="investment-proforma-head">
        {proforma.columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="investment-proforma-body" style={{ gridTemplateRows: proformaRowTemplate }}>
        {proformaRows.map((row) => {
          if (row.type === "spacer") {
            return <div key={row.key} className="investment-proforma-spacer" aria-hidden="true" />;
          }

          if (row.type === "section") {
            const metrics = row.metrics ?? [];

            return (
              <div key={row.key} className={`investment-proforma-row is-section${row.result ? " has-results" : ""}`}>
                <span className="investment-proforma-section-title">{row.label}</span>
                <span className="investment-proforma-section-note">
                  {metrics.length ? (
                    <>
                      <i aria-hidden="true">(</i>
                      {metrics.map(([label, value], index) => (
                        <b key={`${row.label}-${label}`}>
                          <small>{label}</small>
                          <i aria-hidden="true">:</i>
                          <var>{value}</var>
                          {index < metrics.length - 1 ? <i aria-hidden="true">,</i> : null}
                        </b>
                      ))}
                      <i aria-hidden="true">)</i>
                    </>
                  ) : null}
                </span>
              </div>
            );
          }

          return (
            <div key={row.key} className={`investment-proforma-row is-${row.type}`}>
              <span>
                {row.type === "item" ? <i aria-hidden="true">+</i> : null}
                {row.label}
              </span>
              {row.values.map((value, index) => {
                const formattedValue = formatProformaValue(value);

                return (
                  <span key={`${row.label}-${index}`} className={formattedValue.className}>
                    {formattedValue.text}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExtensionValueTable({ rows }) {
  const headGroups = [
    ["Case", "Area"],
    ["Build Cost", "New Value", "Profit"],
    ["New Rent", "Rental Uplift", "GIY Chg"]
  ];

  return (
    <div className="extension-value-table">
      <p className="extension-value-read">Extension and conversion sensitivities show capex, revised value, rent movement and gross yield.</p>
      <div className="extension-value-head">
        {headGroups.map((group) => (
          <div key={group.join("-")} className="extension-value-group">
            {group.map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="extension-value-body">
        {rows.map((row) => (
          <div key={row[0]} className="extension-value-row">
            {[row.slice(0, 2), row.slice(2, 5), row.slice(5)].map((group, groupIndex) => (
              <div key={`${row[0]}-${groupIndex}`} className="extension-value-group">
                {group.map((cell) => (
                  <span key={`${row[0]}-${cell}`}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EnhancementSensitivityCard({ group }) {
  return (
    <div className="enhancement-sensitivity-card">
      <p>{group.read}</p>
      <div className="enhancement-sensitivity-table">
        <div className="enhancement-sensitivity-head">
          <span>Case</span>
          <span>Annual Saving</span>
          <span>GIY Chg</span>
        </div>
        <div className="enhancement-sensitivity-body">
          {group.rows.map((row) => (
            <div key={`${group.title}-${row[0]}`} className="enhancement-sensitivity-row">
              {[row[0], row[1], row[3]].map((cell) => (
                <span key={`${group.title}-${row[0]}-${cell}`}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkedUpgradeCase({ caseData }) {
  const [baseCase, upgradeCase] = caseData.cases;
  const base = Object.fromEntries(baseCase.metrics);
  const upgrade = Object.fromEntries(upgradeCase.metrics);
  const sections = [
    {
      title: "Base Case",
      read: "Current value baseline.",
      stats: [
        ["Market Val.", base.Value],
        ["£/m² pa", "£355"]
      ],
      rows: [
        ["Income", base["12m Income"]],
        ["Yield", base.GIY],
        ["Beds", base.Beds],
        ["Area", base["Floor Area"]]
      ]
    },
    {
      title: "Upgrade Package",
      read: "Works and capital spend.",
      stats: [
        ["Capex", "£136k"],
        ["£/m² pa", "£242"]
      ],
      rows: [
        ["Loft", "+24 m²"],
        ["PV export", "5.6 kW"],
        ["Heat pump", "8 kW"],
        ["Insulation", "Loft + wall"]
      ]
    },
    {
      title: "Revised",
      read: "Post-upgrade value read.",
      stats: [
        ["Revised Val.", upgrade.Value],
        ["£/m² pa", "£334"]
      ],
      rows: [
        ["Income", upgrade["12m Income"]],
        ["Yield", upgrade.GIY],
        ["Beds", upgrade.Beds],
        ["Area", upgrade["Floor Area"]]
      ]
    }
  ];

  return (
    <div className="worked-upgrade-case">
      {sections.map((section) => (
        <article key={section.title} className="upgrade-section">
          <header className="upgrade-section-header">
            <div className="upgrade-section-heading-row">
              <span>{section.title}</span>
            </div>
          </header>
          <div className="upgrade-section-body">
            <div className="upgrade-section-stats">
              {section.stats.map(([label, value]) => (
                <div key={`${section.title}-${label}`} className="upgrade-section-stat">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="upgrade-section-facts">
              {section.rows.map(([label, value]) => (
                <div key={`${section.title}-${label}`}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
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

function ComparableEvidenceMatrix({ read, rows }) {
  return (
    <div className="comparable-evidence-matrix">
      {read ? <p className="comparable-evidence-read">{read}</p> : null}
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
          {group.read ? <p className="comparable-summary-read">{group.read}</p> : null}
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
