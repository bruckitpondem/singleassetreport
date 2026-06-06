import { useState } from "react";
import "./valuation-theme.css";

const reportData = {
  reportInfo: {
    title: "Single Asset Valuation",
    asset: "17 Westbridge Road, SW18",
    date: "6 June 2026",
    basis: "Market value",
    reportType: "Residential valuation"
  },
  metrics: [
    { label: "Indicative Value", value: "£875k" },
    { label: "Confidence Range", value: "£835k-£910k" },
    { label: "Value Rate", value: "£8,420/sqm" },
    { label: "Gross Yield", value: "4.2%" }
  ],
  sections: [
    {
      title: "Valuation Summary",
      headline: "Core mid-market house with resilient valuation support.",
      description:
        "The asset underwrites to £875k on a market-value basis, with support from comparable £/sqm evidence and stable rental yield. Downside sits mainly in condition uncertainty and execution timing rather than local market depth.",
      component: ValuationSummarySection
    },
    {
      title: "Comparable Evidence",
      headline: "Comparable evidence supports a tight central valuation range.",
      description:
        "Sold evidence clusters around £8.1k-£8.8k per square metre after condition and size adjustments. The strongest comparables are nearby terraced houses with recent completion dates and similar internal floor area.",
      component: ComparableEvidenceSection
    },
    {
      title: "Income & Yield",
      headline: "Rental underwriting is supportive but not the primary value driver.",
      description:
        "Estimated rent of £3,075 pcm implies a 4.2% gross yield at the indicated value. Income support is strongest where family-house rental supply is constrained and affordability remains within the local professional tenant band.",
      component: IncomeYieldSection
    },
    {
      title: "Risk & Outlook",
      headline: "Forward value path is positive but dependent on execution quality.",
      description:
        "The 12-month view assumes modest capital growth, stable rent progression and no major supply shock. The valuation range widens if condition capex rises or if comparable liquidity softens below the current trading baseline.",
      component: RiskOutlookSection
    }
  ],
  valuationSummary: {
    snapshot: [
      { label: "Market Value", value: "£875k", sub: "Central estimate" },
      { label: "Low Range", value: "£835k", sub: "Evidence floor" },
      { label: "High Range", value: "£910k", sub: "Prime execution" },
      { label: "Confidence", value: "78 / 100", sub: "High-medium" },
      { label: "£/sqm", value: "£8,420", sub: "Adjusted basis" },
      { label: "Comparable Fit", value: "82%", sub: "Strong" }
    ],
    bridge: [
      { label: "Local baseline", value: "£830k", progress: 54 },
      { label: "Comparable uplift", value: "+£38k", progress: 68 },
      { label: "Condition reserve", value: "-£18k", progress: 42 },
      { label: "Liquidity premium", value: "+£25k", progress: 63 },
      { label: "Final view", value: "£875k", progress: 74 }
    ],
    table: {
      columns: ["Measure", "Value", "Benchmark", "Read", "Impact"],
      rows: [
        ["Market value", "£875k", "£860k", "Above local median", "Positive"],
        ["Value rate", "£8,420/sqm", "£8,250/sqm", "Within evidence range", "Neutral"],
        ["Saleability", "38-52 days", "45 days", "Liquid if priced cleanly", "Positive"],
        ["Capex reserve", "£18k", "2.1% value", "Moderate allowance", "Watch"]
      ]
    }
  },
  comparables: {
    sold: {
      columns: ["Comparable", "Distance", "Sale Date", "£/sqm", "Adjustment", "Weight"],
      rows: [
        ["12 Westbridge Rd", "0.08 mi", "Mar 2026", "£8,610", "-2.0%", "32%"],
        ["44 Putney Bridge Rd", "0.19 mi", "Jan 2026", "£8,330", "+1.5%", "26%"],
        ["7 Garton Street", "0.24 mi", "Nov 2025", "£8,190", "+3.0%", "20%"],
        ["81 Tonsley Hill", "0.31 mi", "Sep 2025", "£8,740", "-4.5%", "14%"],
        ["23 Eltringham St", "0.37 mi", "Aug 2025", "£7,980", "+4.5%", "8%"]
      ]
    },
    adjustments: [
      { label: "Location fit", value: "88", progress: 88 },
      { label: "Size fit", value: "81", progress: 81 },
      { label: "Recency fit", value: "84", progress: 84 },
      { label: "Condition fit", value: "69", progress: 69 },
      { label: "Evidence depth", value: "76", progress: 76 }
    ],
    table: {
      columns: ["Evidence Layer", "Input", "Adjustment Logic", "Output", "Confidence"],
      rows: [
        ["Primary sold comps", "5 assets", "Weighted by distance / fit", "£865k", "High"],
        ["£/sqm benchmark", "£8.1k-£8.8k", "Area-normalised range", "£875k", "High"],
        ["Asking evidence", "4 listings", "Used as ceiling check", "£900k cap", "Medium"],
        ["Rental cross-check", "4.2% yield", "Income sanity test", "Supportive", "Medium"]
      ]
    }
  },
  income: {
    rentBuild: {
      columns: ["Unit Type", "Rent pcm", "Rent £/sqm", "Yield", "Read"],
      rows: [
        ["Subject asset", "£3,075", "£296", "4.2%", "Supportive"],
        ["Family house comp", "£3,150", "£301", "4.3%", "Above"],
        ["Terraced median", "£2,950", "£284", "4.1%", "Baseline"],
        ["Premium finish", "£3,325", "£315", "4.4%", "Ceiling"]
      ]
    },
    yieldRows: [
      { label: "Gross yield", value: "4.2%", progress: 62 },
      { label: "Local house yield", value: "4.1%", progress: 58 },
      { label: "Rent cover", value: "1.08x", progress: 66 },
      { label: "Void sensitivity", value: "Low", progress: 35 },
      { label: "Income confidence", value: "74", progress: 74 }
    ],
    table: {
      columns: ["Income Factor", "Base", "Upside", "Downside", "Valuation Effect"],
      rows: [
        ["Rent pcm", "£3,075", "£3,325", "£2,850", "Yield support"],
        ["Gross yield", "4.2%", "4.4%", "3.9%", "Range check"],
        ["Void allowance", "3 weeks", "2 weeks", "6 weeks", "Execution risk"],
        ["Tenant depth", "Family / professional", "Broad", "Selective", "Liquidity read"]
      ]
    }
  },
  risk: {
    risks: {
      columns: ["Risk", "Level", "Evidence", "Mitigation", "Value Impact"],
      rows: [
        ["Condition variance", "Medium", "No survey allowance", "£18k reserve", "-2.1%"],
        ["Pricing stretch", "Low", "Within comp range", "Evidence-led pricing", "-0.8%"],
        ["Liquidity timing", "Low", "Active local turnover", "Price discipline", "-0.5%"],
        ["Supply pressure", "Medium", "Pipeline rising", "Monitor new-build", "-1.2%"]
      ]
    },
    scenarios: [
      { label: "Optimistic", value: "£910k", progress: 86 },
      { label: "Base case", value: "£875k", progress: 74 },
      { label: "Pessimistic", value: "£835k", progress: 58 },
      { label: "12M value path", value: "+2.4%", progress: 64 },
      { label: "Exit confidence", value: "High", progress: 78 }
    ],
    table: {
      columns: ["Outlook Driver", "Current", "12M View", "Trigger", "Response"],
      rows: [
        ["£/sqm trend", "£8,420", "£8,620", "<£8,100", "Review value"],
        ["Rent pcm", "£3,075", "£3,190", "<£2,900", "Widen yield"],
        ["Comparable depth", "5 strong", "Stable", "<3 strong", "Lower confidence"],
        ["Pipeline pressure", "Moderate", "Rising", ">1,100 units", "Increase discount"]
      ]
    }
  }
};

export default function SingleAssetValuationReport() {
  const [activeSection, setActiveSection] = useState(0);
  const section = reportData.sections[activeSection];
  const SectionComponent = section.component;

  return (
    <article className="valuation-report">
      <header className="report-banner">
        <p>{reportData.reportInfo.title}</p>
        <span>{reportData.reportInfo.asset}</span>
      </header>

      <div className="report-shell">
        <Sidebar
          activeSection={activeSection}
          onSelect={setActiveSection}
          sections={reportData.sections}
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
        </main>
      </div>

      <BottomMetrics metrics={reportData.metrics} />
    </article>
  );
}

function Sidebar({ activeSection, onSelect, sections }) {
  return (
    <aside className="report-rail">
      <div className="asset-card">
        <span>Asset</span>
        <strong>{reportData.reportInfo.asset}</strong>
        <dl>
          <div>
            <dt>Date</dt>
            <dd>{reportData.reportInfo.date}</dd>
          </div>
          <div>
            <dt>Basis</dt>
            <dd>{reportData.reportInfo.basis}</dd>
          </div>
          <div>
            <dt>Report</dt>
            <dd>{reportData.reportInfo.reportType}</dd>
          </div>
        </dl>
      </div>

      <nav className="section-nav" aria-label="Report sections">
        {sections.map((section, index) => (
          <button
            key={section.title}
            type="button"
            className={activeSection === index ? "is-active" : ""}
            onClick={() => onSelect(index)}
          >
            <span>{index + 1}</span>
            {section.title}
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

function ReportPlate({ section, primaryTitle, secondaryTitle, supportTitle, primary, secondary, support }) {
  return (
    <div className="report-plate">
      <LeadBlock section={section} />
      <div className="plate-main">
        <PlateSlot title={primaryTitle}>{primary}</PlateSlot>
        <PlateSlot title={secondaryTitle}>{secondary}</PlateSlot>
      </div>
      <div className="plate-support">
        <PlateSlot title={supportTitle}>{support}</PlateSlot>
      </div>
    </div>
  );
}

function LeadBlock({ section }) {
  return (
    <section className="lead-block">
      <h2>{section.headline}</h2>
      <p>{section.description}</p>
    </section>
  );
}

function PlateSlot({ title, children }) {
  return (
    <section className="plate-slot-shell">
      <p className="plate-slot-title">{title}</p>
      <div className="plate-slot">{children}</div>
    </section>
  );
}

function ValuationSummarySection({ section, data }) {
  return (
    <ReportPlate
      section={section}
      primaryTitle="Valuation Position"
      secondaryTitle="Value Formation"
      supportTitle="Underwriting View"
      primary={<MetricGrid metrics={data.valuationSummary.snapshot} />}
      secondary={<ScorePanel rows={data.valuationSummary.bridge} />}
      support={<DataTable table={data.valuationSummary.table} />}
    />
  );
}

function ComparableEvidenceSection({ section, data }) {
  return (
    <ReportPlate
      section={section}
      primaryTitle="Sold Comparable Matrix"
      secondaryTitle="Adjustment Quality"
      supportTitle="Evidence Weighting"
      primary={<DataTable table={data.comparables.sold} />}
      secondary={<ScorePanel rows={data.comparables.adjustments} />}
      support={<DataTable table={data.comparables.table} />}
    />
  );
}

function IncomeYieldSection({ section, data }) {
  return (
    <ReportPlate
      section={section}
      primaryTitle="Rental Build"
      secondaryTitle="Yield Position"
      supportTitle="Income Sensitivity"
      primary={<DataTable table={data.income.rentBuild} />}
      secondary={<ScorePanel rows={data.income.yieldRows} />}
      support={<DataTable table={data.income.table} />}
    />
  );
}

function RiskOutlookSection({ section, data }) {
  return (
    <ReportPlate
      section={section}
      primaryTitle="Risk Register"
      secondaryTitle="Valuation Scenarios"
      supportTitle="Forward Watchpoints"
      primary={<DataTable table={data.risk.risks} />}
      secondary={<ScorePanel rows={data.risk.scenarios} />}
      support={<DataTable table={data.risk.table} />}
    />
  );
}

function MetricGrid({ metrics }) {
  return (
    <div className="metric-grid">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-cell">
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <em>{metric.sub}</em>
        </div>
      ))}
    </div>
  );
}

function ScorePanel({ rows }) {
  return (
    <div className="score-panel">
      {rows.map((row) => (
        <div key={row.label} className="score-row">
          <div className="score-row-head">
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
          <div className="score-track">
            <i style={{ width: `${row.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function DataTable({ table }) {
  return (
    <div className={`data-table cols-${table.columns.length}`}>
      <div className="data-table-head">
        {table.columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="data-table-body">
        {table.rows.map((row, rowIndex) => (
          <div key={`${table.columns[0]}-${rowIndex}`} className="data-table-row">
            {row.map((cell, cellIndex) => (
              <span key={`${cell}-${cellIndex}`}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomMetrics({ metrics }) {
  return (
    <footer className="bottom-strip">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
      ))}
    </footer>
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
