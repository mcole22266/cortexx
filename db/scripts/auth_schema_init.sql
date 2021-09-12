-- auth_schema_init.sql
-- 2021-09-12
-- Michael Cole (mcole042891.prof.dev@gmail.com)
--
-- Initialization Script to create the Auth Schema and all
-- associated tables
---------------------------------------------------------

-- Create Schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create Tables
    -- User Table
CREATE TABLE auth.user (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE DEFAULT NULL
);

-- Insert
INSERT INTO auth.user(
    username, name, email, password, phone, role
) VALUES (
    'TestUser', 'Test User', 'test_user@example.com',
    'MyPass12!@', '555-123-4567', 'administrator'
);
