-- iou_schema_init.sql
-- 2021-08-31
-- Michael Cole (mcole042891.prof.dev@gmail.com)
--
-- Initialization Script to create the IOU Schema and all
-- associated tables
---------------------------------------------------------

-- Create Schema
CREATE SCHEMA IF NOT EXISTS iou;

-- Create Tables
    -- Debt Table
CREATE TABLE iou.debt (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    amt NUMERIC,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE DEFAULT NULL
);

-- Insert
INSERT INTO iou.debt (
    name, amt
) VALUES (
    'Test User', 123.45
);
