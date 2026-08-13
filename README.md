# 🏢 Enterprise Vendor Management System (VMS)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://vendor-management-system-indol.vercel.app/dashboard)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rahul9214/vendor-management-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)

An enterprise-grade, scalable, and responsive **Vendor Management System (VMS)** web application built with **React 19**, **TypeScript**, **Vite**, **TailwindCSS**, **TanStack Query**, and **Zustand**. Designed with modern product engineering practices, rich dark mode grid aesthetic, fluid responsiveness, zero layout shifts, and full accessibility compliance.

---

## 🌐 Live Production Application

🔗 **Live Vercel Web App**: [https://vendor-management-system-indol.vercel.app/dashboard](https://vendor-management-system-indol.vercel.app/dashboard)

---

## 🚀 Key Modules & Feature Highlights

### 📊 Module 1 – Vendor Dashboard (`/dashboard`)
- **6 Real-time KPI Cards**: Total Vendors (148), Active Vendors (112), Blacklisted Vendors (8), Pending Approvals (14), Average Rating (4.6 ⭐), Active Purchase Orders (34).
- **4 Visual Recharts Analytics**:
  1. *Vendor Performance Trend* (Multi-metric quality vs. delivery time-series)
  2. *Category-wise Vendor Distribution* (Interactive donut chart)
  3. *Monthly Purchase Value* (Bar chart tracking spend velocity)
  4. *Vendor Rating Distribution* (Distribution bar chart)

### 🏢 Module 2 – Vendor Directory Data Table (`/vendors`)
- **9 Core Enterprise Columns**: Vendor Name, Vendor Code, Category, Contact Person, City, Rating, Status, Last Transaction Date, Total Purchase Value.
- **Enterprise Features**: Debounced live search, multi-criteria filter drawer, multi-column sorting, pagination page size selector, sticky headers.
- **Bonus Capabilities**:
  - 💾 **Saved Views**: Persist custom table filter states (*Default*, *Top Rated*, *Pending Approval*, *High Spend*).
  - 👁️ **Column Selection Drawer**: Toggle visibility of table columns on the fly.
  - 📥 **Multi-Format Export Modal**: Native browser export to CSV and JSON files.

### 🔍 Module 3 – Vendor Details (`/vendors/:id`)
- **9 Interactive Tabs**:
  1. **Overview**: Executive summary, business classification, risk indicator, tax IDs.
  2. **Contacts**: Primary & secondary vendor account representatives.
  3. **Performance**: Historical quality score, delivery rating, response times.
  4. **Purchase History**: Complete PO stream with fulfillment tracking.
  5. **Documents**: Uploaded W-9, ISO certificates, NDAs, GST certificates.
  6. **Payments**: Invoice payment history with payment terms (*Net 30/60*).
  7. **Projects Associated**: Enterprise active project engagements.
  8. **Issues Raised**: Open SLA breach tickets and resolution status.
  9. **Audit Timeline**: Governance logs tracking vendor profile modifications.

### 📝 Module 4 – Create Vendor Form (`/onboarding`)
- **Multi-Step Form**: 5-step wizard covering General Info, Address Location, Contact & Banking, Terms & Uploads, and Review Summary.
- **Strict Validation**: Powered by `react-hook-form` + `Zod` schemas with custom regex rules for Indian **GSTIN**, **PAN**, **IFSC codes**, email, and phone.
- **Drag & Drop Uploader**: Direct document upload area.
- **💾 Auto-Save Drafts**: Automatically saves form progress in `localStorage` so draft data is preserved across page reloads.

### 📈 Module 5 – Vendor Performance (`/performance`)
- **8 Core Metrics**: Quality Score %, Delivery Score %, Response Time (hrs), Payment History %, Risk Index Gauge (0-100), Star Rating, SLA Breach Tickets.
- **Interactive Multi-Line Trend Chart**: Tracks quality score vs. delivery score against 95% target baseline.

### 🛡️ Module 6 – Approval Workflow & Governance (`/approvals`)
- **5 Governance Status Codes**: *Pending*, *Approved*, *Rejected*, *On Hold*, *Changes Requested*.
- **3-Level Approval Timeline**: Multi-stage authorization stream (Level 1 Legal, Level 2 Finance, Level 3 Procurement CPO).
- **Interactive Action Modal**: Stakeholder decision popup to approve, reject, hold, or request changes with rationale comments.

### 🔔 Module 7 – Notifications & Alert Center (`/notifications`)
- **5 Alert Categories**: *Approval Pending*, *Document Expiring*, *Low Vendor Rating*, *Delayed Delivery*, *Payment Due*.
- **Interactive Header Bell Dropdown**: Live navbar popover with real-time unread badge counter, category filtering, mark-as-read, and deep-link navigation.

### 📱 Module 8 – Responsive Experience & Settings (`/settings`)
- **Fluid Layout**: Tested across Desktop (1440px+), Laptop (1024px), Tablet (768px), and Mobile (375px) with off-canvas sidebar drawer.
- **Active Viewport Diagnostics**: Live inspector on `/settings` displaying real-time viewport width/height, Display Scale DPR, and active breakpoint category.

### 🖐️ Bonus Challenge: Drag-and-Drop Kanban Board (`/kanban`)
- **5 Onboarding Pipeline Stages**: *Application Submitted* → *Legal Screening* → *Financial Audit* → *Revisions Requested* → *Approved & Onboarded*.
- **HTML5 Drag and Drop**: Smooth card dragging across columns with fallback quick-stage mover dropdowns for touch devices.

### 📄 Extra Modules Included Beyond Prompt
- **Contracts Management (`/contracts`)**: Track Master Services Agreements (MSA), NDAs, SLAs, auto-renewals, and download contract summaries.
- **Purchase Orders Tracker (`/orders`)**: Dedicated PO fulfillment tracker with payment status tags.

---

## 🏗️ Technical Architecture & Folder Structure

```
src/
├── api/          # Reusable API HTTP client abstractions & base error handlers
├── assets/       # Static icons & Geist web font variables
├── components/   # Modular UI components grouped by feature domain
│   ├── approval/     # ApprovalTimeline, ApprovalStatusBadge, ApprovalActionModal, CommentThread
│   ├── contract/     # ContractTable, ContractKpiCards, CreateContractModal, ContractStatusBadge
│   ├── kanban/       # KanbanBoard, KanbanColumn, KanbanCard
│   ├── notification/ # HeaderNotificationDropdown, NotificationCard, NotificationCategoryBadge
│   ├── performance/  # PerformanceKpiCards, PerformanceTrendChart, RecentIssuesList
│   ├── shared/       # Skeleton loaders, ErrorState, ChartCard, EmptyState
│   ├── ui/           # Base primitives (Button, Card, Badge, Dialog, Toast)
│   └── vendor/       # VendorTable, VendorFilterDrawer, VendorColumnToggle, VendorExportModal
├── constants/    # Navigation array, mock scorecards, mock approvals, mock notifications
├── hooks/        # Custom TanStack Query hooks (useVendors, usePerformance, useApprovals, useNotifications)
├── layouts/      # AppLayout, Sidebar (with collapsed tooltips), Header (with global search & user profile)
├── pages/        # Lazy-loaded views (Dashboard, Vendors, VendorDetail, Onboarding, Performance, Approvals, Notifications, Contracts, Orders, Kanban, Settings)
├── services/     # Decoupled service layer (vendorService, performanceService, approvalService, contractService)
├── types/        # TypeScript domain models (vendor, performance, approval, notification, contract, order, kanban)
└── utils/        # Zod validation schemas, formatters, Tailwind classnames merge
```

---

## 🧠 State Management Rationale

1. **TanStack Query (React Query v5)**:
   - Selected for **Server State Management**. Manages background data revalidation, stale-time caching, loading/error states, and query invalidation. Eliminates boilerplate Redux actions/reducers.
2. **Zustand**:
   - Selected for **Client UI State Management** (<1KB store size). Used exclusively for persistent user UI preferences (`theme: 'light' | 'dark'`, `sidebarCollapsed: boolean`) with `localStorage` hydration.

---

## ⚡ Performance Optimization Highlights

- **Code Splitting & Lazy Loading**: All 11 route pages are lazy-loaded via `React.lazy()` with `<Suspense />` fallback screens, resulting in fast initial bundle loads (<900ms build time).
- **Memoization**: Heavy table rows and chart components use `React.memo` to eliminate unnecessary DOM re-renders when parent states change.
- **Global Scrollbar Suppression**: Customized CSS rules hide messy browser scrollbars globally while preserving 100% smooth scrollability across elements.
- **Grid Dark Mode Palette**: Ultra-sleek dark grid background texture (`rgba(99, 102, 241, 0.06)` 32px grid lines against dark `#050811` background).

---

## 🛠️ Local Development & Build Commands

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` or `yarn` / `pnpm`

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Rahul9214/vendor-management-system.git
cd vendor-management-system

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

### Verification & Production Build
```bash
# Run TypeScript type check (0 errors)
npx tsc -b

# Run ESLint check (0 errors, 0 warnings)
npx eslint .

# Build production bundle for deployment
npm run build
```

---

## 🛡️ Production Readiness & Audit Scorecard

- **TypeScript Compilation (`npx tsc -b`)**: 🟢 **0 Errors**
- **ESLint Linter (`npx eslint .`)**: 🟢 **0 Warnings / 0 Errors**
- **Vite Production Build (`npm run build`)**: 🟢 **Passed in 874ms**
- **Deployment Host**: **Vercel Production** (`https://vendor-management-system-indol.vercel.app/dashboard`)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
