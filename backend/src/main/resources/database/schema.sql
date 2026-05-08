CREATE DATABASE IF NOT EXISTS equiptrack_pro_db;
USE equiptrack_pro_db;

-- 1. Users Table (Authentication & RBAC)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- BCrypt Hash
    role ENUM('ADMIN', 'STAFF') DEFAULT 'STAFF',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Construction Sites Table (Matches Site Management UI)
CREATE TABLE sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL, -- Physical address from UI
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    site_manager VARCHAR(100), -- Added field based on standard site cards
    status ENUM('ACTIVE', 'COMPLETED', 'ON_HOLD') DEFAULT 'ACTIVE'
);

-- 3. Heavy Equipment Table (Matches Asset Inventory UI)
CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(100) NOT NULL, -- e.g., "Excavator XL"
    asset_id VARCHAR(50) NOT NULL UNIQUE, -- Serial/Asset ID from UI
    type VARCHAR(50) NOT NULL, -- e.g., "Crane", "Bulldozer"
    status ENUM('AVAILABLE', 'ON_SITE', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    site_id INT, -- Linked to the current site
    FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE SET NULL
);

-- 4. Audit Logs Table (Matches Audit Log UI columns)
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL, -- Logged as snapshot for UI display
    equipment_name VARCHAR(100) NOT NULL, -- Logged as snapshot
    asset_id VARCHAR(50) NOT NULL, -- Reference ID for tracking
    action_type ENUM('CHECK_OUT', 'CHECK_IN') NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Matches "Date" in UI
    status_at_time VARCHAR(50), -- Records the state during log
    user_id INT,
    equipment_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE SET NULL
);

-- Initial Data
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@equiptrack.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00Wxs.WxDjQ8Oq', 'ADMIN');

INSERT INTO sites (site_name, location, latitude, longitude, site_manager) VALUES 
('City Center Mall', 'Downtown Davao', 7.0707, 125.6087, 'Hector Salera'),
('Skyline Tower', 'North Avenue', 7.0900, 125.6100, 'Virche Tautoan');

INSERT INTO equipment (equipment_name, asset_id, type, status, site_id) VALUES 
('Caterpillar 320', 'CAT-001', 'Excavator', 'ON_SITE', 1),
('Tower Crane X1', 'CRN-99', 'Crane', 'AVAILABLE', NULL);