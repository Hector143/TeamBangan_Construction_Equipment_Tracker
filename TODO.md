# TODO - Equipment Tracker API/UI schema alignment

## Step 1: Backend - Equipment model & controller
- [x] Update `constructionEquipmentTrackerModel` to match DB columns:
  - `equipment_name`, `asset_id`, `site_id`, `type`, `status`
- [x] Ensure `constructionEquipmentTrackerController` returns/accepts matching JSON



## Step 2: Backend - Sites endpoints
- [x] Create `SiteModel` entity mapped to `sites`
- [x] Create `SiteRepository`
- [x] Create `SitesController` with:
  - `GET /api/sites`
  - `POST /api/sites`

## Step 3: Backend - Logs (audit_logs) endpoints
- [x] Create `AuditLogModel` entity mapped to `audit_logs`
- [x] Create `AuditLogRepository`
- [x] Create `LogsController` with:
  - `GET /api/logs`
  - `POST /api/logs`




## Step 4: Frontend - EquipmentPage refactor
- [x] Replace hardcoded equipment with fetch from `GET /api/equipment`
- [x] Render DB-backed fields only

## Step 5: Frontend - SitesPage refactor
- [x] Replace hardcoded sites with fetch from `GET /api/sites`
- [x] Render DB-backed fields only

## Step 6: Frontend - LogsPage refactor
- [x] Replace hardcoded logs with fetch from `GET /api/logs`
- [x] Render columns that exist in `audit_logs`


## Step 7: Build & run
- [ ] Build backend (`mvn test` or `mvn package`)
- [ ] Run frontend dev server
- [ ] Manual/API verification of endpoints

