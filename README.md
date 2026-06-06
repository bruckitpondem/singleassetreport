# Single Asset Valuation Report

A compact React valuation report viewer for a single UK residential asset.

The report is intentionally asset-led rather than area-led. It answers:

```text
What is this asset worth, why, what evidence supports that value, and how could the value move?
```

## Sections

The first version uses four sections:

1. `Valuation Summary`
   Central value, range, confidence, value formation and underwriting read.

2. `Comparable Evidence`
   Sold comparable matrix, adjustment quality and evidence weighting.

3. `Income & Yield`
   Rental estimate, gross yield, income support and downside/upside sensitivity.

4. `Risk & Outlook`
   Key valuation risks, scenario range and forward watchpoints.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main Files

```text
src/SingleAssetValuationReport.jsx
src/valuation-theme.css
```

## Design Direction

The report follows the same Valtaic-style design language as the market report:

```text
monochrome
white background
hairline borders
small radii
compact data tables
institutional report density
minimal dashboard-like decoration
```

Mock data is local inside `SingleAssetValuationReport.jsx`. Replace the mock data object later with real valuation inputs while keeping the UI structure stable.
