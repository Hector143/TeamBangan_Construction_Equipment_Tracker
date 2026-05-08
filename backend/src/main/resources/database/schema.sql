CREATE DATABASE IF NOT EXISTS construction_tracker;
USE construction_tracker;

-- 1. Users Table (for Authentication & RBAC)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- To be hashed via BCrypt
    role ENUM('ADMIN', 'STAFF') DEFAULT 'STAFF',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Construction Sites Table
CREATE TABLE sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT
);

-- 3. Heavy Equipment Table
CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(100) NOT NULL,
    model_number VARCHAR(50),
    status ENUM('AVAILABLE', 'ON_SITE', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    current_site_id INT,
    FOREIGN KEY (current_site_id) REFERENCES sites(id) ON DELETE SET NULL
);

-- 4. Audit Log (Key Checkout Tracking)
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    equipment_id INT,
    action_type ENUM('CHECK_OUT', 'CHECK_IN') NOT NULL,
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

-- Initial Data for Testing
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@teambangan.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00Wxs.WxDjQ8Oq', 'ADMIN'); -- password: password123