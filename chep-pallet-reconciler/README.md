# PALLETLOCK V1: CHEP & Loscam Pallet Exchange & Loss Ledger

**Product ID:** PALLETLOCK-V1-RELEASE  
**Standard Compliance:** ZAI-STD-ENG-001 v1.0 (ZAInnovate Technologies)  
**Target Sector:** South African Road Freight, 3PL Logistics & Manufacturing Dispatch  
**Corridors:** Wilsonia (East London), Fort Jackson, Dimbaza, Gqeberha (Port Elizabeth), City Deep (Johannesburg)  
**Runtime:** 100% Standalone, Zero-Dependency HTML/CSS/JS Single-File Application (`index.html`)  

---

## 1. Executive Summary & Problem Space

In South African road freight and manufacturing distribution, wooden and plastic pooling pallets are high-value operational assets:
* **CHEP Blue Pallet:** R380 to R450 replacement cost per lost unit (Standard Default: R395.00).
* **Loscam Wooden Pallet:** R350 to R380 replacement cost per lost unit (Standard Default: R360.00).
* **Plain White / Export Pallet:** R130 to R160 replacement cost (Standard Default: R140.00).

When linehaul vehicles deliver palletized FMCG and automotive components to Distribution Centers (Shoprite DC Wells Estate, Spar Distribution Gqeberha, IDZ Auto Plant, Distell Greenbushes, Massmart City Deep, Pick n Pay DC), DCs frequently operate under bay congestion or refuse 1:1 physical exchange. Drivers depart with paper "IOU Vouchers" or uncollected pallets. 

Within 14 to 30 days, undocumented or uncollected pallets are routinely written off by shippers, bleeding tens of thousands of Rands monthly in avoidable CHEP pool rental debits and replacement penalties.

**PALLETLOCK V1** is an industrial supply chain audit instrument engineered to eliminate pallet shrinkage, maintain running balances by receiver, track exposure aging, and produce statutory recovery demand notices and instant WhatsApp dispatch briefs.

---

## 2. Core Operational Capabilities

### 1. Pallet Movement Entry & Shift Dispatch
* **Customer / DC Destination:** Preset options and datalist for South African DCs (Shoprite, Spar, IDZ Auto, Distell, Massmart, Pick n Pay, Clover).
* **Equipment Pooling Types:** CHEP Blue, Loscam Wooden, Plain White/Export with configurable unit replacement tariffs.
* **Waybill & Shift Tracking:** Movement date, waybill/delivery note reference, fleet registration, driver identification, and route corridor.
* **1:1 Exchange Variance Calculation:** Immediate real-time variance calculation (`Delivered - Returned = Net Deficit`).
* **Reason Code Tracking:** Categorized reasons for unreturned equipment (e.g. *DC Exchange Pending*, *IOU Voucher Issued*, *Refused by Receiver*, *Damaged/Scrapped*, *Bay Congestion*).
* **Slip & Officer Verification:** Records security gate pass numbers, receiver slip codes, and supervisor bay identifications.

### 2. Live Liability & Shrinkage Engine
* **Platform Departure Board KPIs:** High-contrast Wayfind departure board displays:
  - **Total Capital at Risk (ZAR):** Live aggregate Rand liability.
  - **Unreturned Pallets (Units):** Aggregate net deficit in circulation.
  - **Critical Risk (>14 Days):** Value and count of overdue assets facing immediate write-off.
  - **Immediate Exchange Return Rate (%):** Operational efficiency percentage of 1:1 bay exchanges.
* **Aging Engine & Classification:**
  - **Normal (< 7 Days):** Active turnaround window (`badge-normal`).
  - **Warning (7 – 14 Days):** Follow-up required (`badge-warning`).
  - **Critical Risk (> 14 Days):** Formal commercial recovery notice required (`badge-critical`).
  - **Balanced / Settled (0 Variance):** Verified clean exchange (`badge-balanced`).
* **DC Running Balances:** Aggregated account matrix calculating CHEP, Loscam, and White unit totals and financial risk per customer.

### 3. Recovery & Audit Artifact Generation
* **Print-Ready Equipment Recovery Demand Notice (`@media print`):**
  - Generates a formal legal letterhead demand to the Customer Receiving Manager.
  - Itemized schedule of delivery dates, waybill numbers, fleet IDs, equipment types, and replacement cost calculations.
  - 72-Hour ultimatum notice to physically return empties, issue electronic pool vouchers, or accept replacement debit.
  - Formatted for clean A4 printing/PDF export without UI controls.
* **1-Click WhatsApp Dispatch Intel:**
  - Generates a pre-formatted, emoji-structured summary for logistics managers, fleet controllers, and linehaul drivers.
  - 1-click clipboard copy and direct WhatsApp Web deep linking.
* **Data Portability & Shift Continuity:**
  - 1-click CSV Export with Excel UTF-8 BOM encoding.
  - 1-click JSON Backup and Import for end-of-shift archiving.
  - Browser `localStorage` persistence across browser sessions.
  - Configurable Depot Profile (Depot name, physical address, pool account numbers, manager signatories).

---

## 3. Mathematical & Business Logic Specifications

$$\text{Net Unreturned Pallets} = \max(0, \text{Delivered} - \text{Returned})$$

$$\text{Financial Exposure (ZAR)} = \sum_{i=1}^{n} (\text{Unreturned}_i \times \text{Unit Replacement Cost}_i)$$

$$\text{Days Outstanding} = \left\lfloor \frac{\text{Current Date} - \text{Movement Date}}{86,400,000 \text{ ms}} \right\rfloor$$

$$\text{Recovery Efficiency Ratio} = \left( \frac{\sum \text{Returned}}{\sum \text{Delivered}} \right) \times 100\%$$

---

## 4. Design Language: Hallmark Wayfind Standard
* **Typography:** Chivo Mono (`tabular-nums`, monospaced departure board layout).
* **Borders:** 2px solid ink (`var(--bar)`).
* **Corners:** Square, 0px border-radius.
* **High-Contrast Colourway:**
  - Deep Ink (`oklch(16% 0.014 262)`)
  - Crisp Paper (`oklch(95.5% 0.006 250)`)
  - Cobalt live readings (`#1c52d8` CHEP blue tone)
  - Amber financial values (`#d97706` / `#b45309`)
  - Danger Alert (`#dc2626`)
  - Clean Settled (`#16a34a`)

---

## 5. Deployment & Execution
Zero installation required. Open `index.html` in any modern web browser (Edge, Chrome, Safari, Firefox). Works 100% offline with zero network calls, zero npm packages, and zero external CDNs.
