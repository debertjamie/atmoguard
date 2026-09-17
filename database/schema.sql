-- ============================================
-- Schema Database: Atmo Guard App
-- Task: INFRA-02 - Provisioning Database Cloud dan Skema Data
-- Engine: PostgreSQL (Supabase)
-- ============================================

-- Untuk re-run 
DROP TABLE IF EXISTS favorite_locations CASCADE;
DROP TABLE IF EXISTS air_quality_data CASCADE;
DROP TABLE IF EXISTS health_recommendations CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- Tabel: users
-- ============================================
CREATE TABLE users (
    user_id       SERIAL PRIMARY KEY,
    nama          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================
-- Tabel: locations
-- ============================================
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    nama_kota   VARCHAR(100) NOT NULL,
    provinsi    VARCHAR(100) NOT NULL,
    latitude    DECIMAL(9,6) NOT NULL,
    longitude   DECIMAL(9,6) NOT NULL
);

-- ============================================
-- Tabel: favorite_locations
-- Relasi: users (1) -- (banyak) favorite_locations
--         locations (1) -- (banyak) favorite_locations
-- ============================================
CREATE TABLE favorite_locations (
    fav_id      SERIAL PRIMARY KEY,
    user_id     INT NOT NULL,
    location_id INT NOT NULL,
    CONSTRAINT fk_fav_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_fav_location
        FOREIGN KEY (location_id) REFERENCES locations(location_id)
        ON DELETE CASCADE,
    CONSTRAINT uq_user_location UNIQUE (user_id, location_id) -- cegah duplikat favorit
);

-- ============================================
-- Tabel: air_quality_data
-- Relasi: locations (1) -- (banyak) air_quality_data ("memiliki riwayat")
-- ============================================
CREATE TABLE air_quality_data (
    data_id     SERIAL PRIMARY KEY,
    location_id INT NOT NULL,
    aqi_value   INT NOT NULL,
    pm25        DECIMAL(6,2),
    pm10        DECIMAL(6,2),
    co2         DECIMAL(6,2),
    o3          DECIMAL(6,2),
    timestamp   TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_aqd_location
        FOREIGN KEY (location_id) REFERENCES locations(location_id)
        ON DELETE CASCADE
);

-- ============================================
-- Tabel: health_recommendations
-- Relasi ke air_quality_data: "dikategorikan oleh" (berdasarkan rentang aqi,
-- BUKAN foreign key langsung -- dicocokkan lewat query di aplikasi/service layer)
-- ============================================
CREATE TABLE health_recommendations (
    rec_id        SERIAL PRIMARY KEY,
    aqi_category  VARCHAR(50) NOT NULL,
    aqi_min       INT NOT NULL,
    aqi_max       INT NOT NULL,
    saran_aktivitas TEXT,
    saran_masker    TEXT,
    CONSTRAINT chk_aqi_range CHECK (aqi_min <= aqi_max)
);

-- ============================================
-- Index tambahan untuk performa query
-- ============================================
CREATE INDEX idx_aqd_location_timestamp ON air_quality_data (location_id, timestamp);
CREATE INDEX idx_fav_user ON favorite_locations (user_id);