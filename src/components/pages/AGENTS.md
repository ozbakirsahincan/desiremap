<agents-mem-context>
# Recent Activity

<!-- Directory: src/components/pages/ -->

### Feb 22, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #1 | 1:45 PM | ✅ | Extracted page-level components from page.tsx | ~600 |
| #2 | 1:52 PM | 🔴 | Fixed Tailwind v4 gradient classes (bg-gradient → bg-linear) | ~200 |
| #3 | 2:30 PM | 🔴 | Refactored to reduce complexity (AdminPanel, DashboardPage, DetailPage, LoginPage) | ~400 |

</agents-mem-context>

## Module Info

- **Path**: src/components/pages/
- **Purpose**: Full-page components for different views
- **Related**: src/app/[locale]/page.tsx, src/components/listings/

## Components

| File | Purpose | Lines |
|------|---------|-------|
| CityPage.tsx | City-specific listing view with filters | ~27 |
| DetailPage.tsx | Single bordell detail view (DetailHero, DetailContent) | ~30 |
| LoginPage.tsx | Login/register form (LoginHeader, LoginFields, LoginActions) | ~40 |
| DashboardPage.tsx | User dashboard (DashboardSidebar, DashboardContent) | ~28 |
| AdminPanel.tsx | Admin panel (AdminSidebar, AdminDashboardContent) | ~32 |

## Dependencies

- lucide-react: Icons
- @/components/ui/*: Button, Input, Badge, etc.
- @/types: Bordell, DashboardTab, AdminTab, DashboardUser
- @/data/mock-data: bordells, admin data
