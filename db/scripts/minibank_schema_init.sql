-- minibank_schema_init.sql
-- 2021-09-06
-- Michael Cole (mcole042891.prof.dev@gmail.com)
--
-- Initialization Script to create the MiniBank Schema
-- and all associated tables
---------------------------------------------------------

-- Create Schema
CREATE SCHEMA IF NOT EXISTS minibank;

-- Create Tables
    -- Account Table
CREATE TABLE minibank.account (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    account_create_date DATE DEFAULT CURRENT_DATE,
    account_close_date DATE DEFAULT NULL
);
    -- Payment Table
CREATE TABLE minibank.payment (
    id SERIAL PRIMARY KEY,
    account_id INTEGER,
    amount NUMERIC,
    note VARCHAR DEFAULT NULL,
    payment_date DATE DEFAULT CURRENT_DATE
);

-- Create Views
    -- Balance View
CREATE OR REPLACE VIEW minibank.balance AS (
    SELECT
        account_id,
        SUM(amount) AS balance
    FROM minibank.payment
    GROUP BY account_id
);

-- Insert
    -- New Test Account
INSERT INTO minibank.account (
    name, email, phone
) VALUES (
    'Test User', 'testuser@gmail.com',
    '555-1234'
);
    -- New Payment
INSERT INTO minibank.payment (
    account_id, amount, note
) VALUES (
    '1', 123.45,
    'Initialization Script'
);
