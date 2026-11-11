# TRIPGUARD V1: Diesel Siphon & Fleet Debrief Dispute Terminal
**Document Ref:** ZAI-PRD-LOG-004 · **Version:** 1.0.0  
**Governing Standard:** ZAInnovate Technologies Production-Readiness Standard (`ZAI-STD-ENG-001`)  
**Depot Targets:** East London (West Bank), Gqeberha (Deal Party), Johannesburg (City Deep), Durban (Bayhead)

---

## 1. Executive Summary & Problem Context
In the South African road freight industry, long-haul fleet controllers lose upwards of **R10,000 to R25,000 weekly per depot** due to two primary leakage channels during the post-trip debrief:
1. **Unaccounted Diesel Siphoning:** Drivers decanting 50L to 100L of 50ppm diesel en-route (often between Colesberg, Beaufort West, Harrismith, or Cookhouse) and disguising the loss as "headwinds" or "heavy loads".
2. **Untracked Consumption Bleed:** Excessive idling (air conditioning / cab heaters running overnight at truck stops), worn injectors, or unauthorized detour kilometres not caught during debrief.

**TRIPGUARD V1** is a zero-dependency, standalone industrial instrument designed for dispatch and debrief desks. It performs real-time mathematical reconciliation between odometer readings, telematics GPS data, baseline consumption rates, and actual fuel card pumped litres, instantly categorizing trips into statutory compliance tiers and generating legal recovery artifacts.

---

## 2. Core Operational Capabilities

### 2.1 Fleet & Telematics Telemetry Input
- **Truck Class Presets:**
  - 34-Ton Interlink (Cascadia / Actros): Baseline `48.0 L/100km` (2.08 km/L)
  - 28-Ton Triaxle (Scania / Volvo): Baseline `38.0 L/100km` (2.63 km/L)
  - 14-Tonner Rigid (Hino 500 / Isuzu FVR): Baseline `28.0 L/100km` (3.57 km/L)
  - 8-Tonner Rigid (Freightliner / UD Croner): Baseline `20.0 L/100km` (5.00 km/L)
  - 4-Ton Light Delivery (Isuzu NPR / Canter): Baseline `15.0 L/100km` (6.67 km/L)
  - Full manual baseline override for specialized reefers or abnormal loads.
- **Hubodometer vs Satellite GPS Variance Flag:**
  - Real-time comparison between odometer distance and Ctrack / MiX Telematics GPS breadcrumb data.
  - Automatically flags discrepancies $>3.0\%$ to alert controllers to speedo cable disconnection or odometer tampering.
- **Dynamic Fuel Pricing:**
  - Retail En-route Card (`R23.50 / L` default with live override)
  - Depot Wholesale Bulk Bowser (`R21.80 / L`)
  - Auto-synchronization between Pumped Litres, Unit Price, and Fuel Slip Total Amount.

### 2.2 Live Variance & Bleed Reconciliation Engine
- **Expected Fuel Allocation ($L_{\text{expected}}$):**
  $$L_{\text{expected}} = \text{Distance (km)} \times \left(\frac{\text{Baseline Rate}}{100}\right) \times \text{Terrain Modifier}$$
- **Actual Fuel Consumption ($C_{\text{actual}}$):**
  $$C_{\text{actual}} = \left(\frac{\text{Diesel Pumped (L)}}{\text{Distance (km)}}\right) \times 100 \quad [\text{L/100km}]$$
- **Unaccounted Diesel Bleed ($\Delta L$):**
  $$\Delta L = \text{Diesel Pumped} - L_{\text{expected}}$$
- **Forensic Financial Loss (ZAR):**
  $$\text{Financial Loss} = \Delta L \times \text{Fuel Tariff (ZAR/L)} \quad (\text{if } \Delta L > 0)$$

### 2.3 Real-Time Warning Status Tiers
- **🟢 GREEN ($\le 3.0\%$ Variance):**  
  `CLEAR - DEBRIEF APPROVED` · Trip is within statutory road transport allowance. Driver debrief signed off.
- **🟡 AMBER ($3.0\% - 8.0\%$ Variance):**  
  `FLAGGED - EXCESS IDLE / DRIVER LOG CHECK` · Requires telematics idle audit (overnight cab heating/cooling, mountain pass climb, or traffic congestion).
- **🔴 RED ($> 8.0\%$ Variance):**  
  `THEFT ALERT: UNEXPLAINED DIESEL SIPHON CONFIRMED` · Unexplained fuel loss. Requires immediate physical tank dip, seal inspection, and issuance of Form AOD-104.

---

## 3. Statutory & Dispute Artifacts

### 3.1 Form AOD-104: Acknowledgement of Debt & Disciplinary Notice
1-click generation of a print-ready (`@media print`), legally vetted recovery slip formatted to A4 docket standards:
- **Statutory Authority:** Drafted pursuant to Section 34(1)(b) of the Basic Conditions of Employment Act (Act 75 of 1997) and Clause 54 of the NBCRFLI Main Collective Agreement.
- **Audit Data:** Serial reference, depot stamp, vehicle reg, driver employee number, odometer vs GPS distances, baseline allowance, litres deficit, and exact ZAR financial recovery figure.
- **Three-Party Signature Block:** Driver, Fleet Controller / Auditor, and Shop Steward / Witness.

### 3.2 Instant WhatsApp Operations Alert
Pre-formatted markdown alert ready for 1-click clipboard copy or direct WhatsApp Web dispatch to the Fleet Owner or Operations Director:
```text
🚨 *TRIPGUARD DEBRIEF DISPUTE ALERT* 🚨
--------------------------------------
*DEPOT:* Johannesburg (City Deep Freight Hub)
*DATE:* 10 Nov 2026, 16:45
*VEHICLE:* CA 842-991 (Unit #RIG-104B)
*DRIVER:* Sipho Ndlovu (Staff ID: EMP-4402)
*ROUTE:* JHB City Deep ⇄ DBN Bayhead (N3 Corridor)
--------------------------------------
*ODOMETER:* 570.0 km (GPS: 568.0 km)
*BASELINE TARGET:* 48.0 L/100km (273.6 L Allowed)
*DIESEL PUMPED:* 345.0 L (60.5 L/100km)
*VARIANCE BLEED:* +71.4 L (+26.1%)
*STATUS:* THEFT ALERT: UNEXPLAINED DIESEL SIPHON CONFIRMED
--------------------------------------
*FINANCIAL LOSS:* R 1,677.90 ZAR (@ R23.50/L)
*ACTION:* Form AOD-104 Notice Ref: AOD-202611-9842
--------------------------------------
_TRIPGUARD V1 • South African Road Freight Telematics_
```

### 3.3 Shift Batch Audit Register & Export
- Logs 10+ debriefs in a single operating shift.
- Stores state client-side in browser `localStorage`.
- Real-time summary billboard: Total trips, fleet kilometres, cumulative litres bleed, total financial recovery, and clear/flagged/theft ratios.
- 1-Click CSV export (`TRIPGUARD_SHIFT_AUDIT_YYYY-MM-DD.csv`).

---

## 4. UI Architecture & Design Standards
- **Hallmark Wayfind Platform System:**
  - 2px solid ink borders (`--bar: 2px solid var(--ink)`).
  - Square corners throughout (`border-radius: 0 !important`).
  - Monospaced platform departure-board typography (`Chivo Mono` with system monospace fallback).
  - Tabular numerals (`font-variant-numeric: tabular-nums`).
- **Zero External Dependencies:**
  - Standalone single HTML file.
  - Zero npm dependencies, zero remote JavaScript libraries, zero CDN frameworks.
  - 100% operational offline in remote depot conditions.
