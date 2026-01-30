# Schema Design Plan for CryptoAlertPro

## Overview
This document outlines the database schema for CryptoAlertPro, focusing on user profiles, alert configurations (price & technical), notification history, and user settings.

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table.
- **id**: `UUID` (Primary Key, Foreign Key -> auth.users.id)
- **username**: `TEXT` (Unique, Nullable)
- **avatar_url**: `TEXT` (Nullable)
- **created_at**: `TIMESTAMPTZ` (Default: now())
- **updated_at**: `TIMESTAMPTZ` (Default: now())

### 2. alerts
Stores the core alert definitions for users.
- **id**: `UUID` (Primary Key, Default: uuid_generate_v4())
- **user_id**: `UUID` (Foreign Key -> profiles.id)
- **symbol**: `TEXT` (Not Null, e.g., "BTC/USDT")
- **exchange**: `TEXT` (Not Null, e.g., "Binance", "Coinbase")
- **alert_type**: `TEXT` (Not Null, Enum: "price", "technical")
- **condition**: `TEXT` (Not Null, e.g., "gt" (greater than), "lt" (less than), "cross_up", "cross_down")
- **target_price**: `NUMERIC` (Nullable, used if alert_type="price")
- **indicator_settings**: `JSONB` (Nullable, used if alert_type="technical". Stores things like `{ "indicator": "RSI", "period": 14, "threshold": 70 }`)
- **is_active**: `BOOLEAN` (Default: true)
- **last_triggered_at**: `TIMESTAMPTZ` (Nullable)
- **created_at**: `TIMESTAMPTZ` (Default: now())

### 3. notification_history
Logs all alerts sent to users for auditing and history display.
- **id**: `UUID` (Primary Key, Default: uuid_generate_v4())
- **user_id**: `UUID` (Foreign Key -> profiles.id)
- **alert_id**: `UUID` (Foreign Key -> alerts.id, Nullable - in case alert is deleted)
- **message**: `TEXT` (Not Null)
- **channel**: `TEXT` (e.g., "email", "push", "web")
- **read_at**: `TIMESTAMPTZ` (Nullable)
- **created_at**: `TIMESTAMPTZ` (Default: now())

### 4. user_settings
Stores preferences for notifications and UI.
- **user_id**: `UUID` (Primary Key, Foreign Key -> profiles.id)
- **email_notifications**: `BOOLEAN` (Default: true)
- **push_notifications**: `BOOLEAN` (Default: false)
- **telegram_id**: `TEXT` (Nullable)
- **theme**: `TEXT` (Default: 'dark')
- **updated_at**: `TIMESTAMPTZ` (Default: now())

## Relationships
- One `profile` has many `alerts`.
- One `profile` has one `user_settings` entry.
- One `profile` has many `notification_history` entries.
- One `alert` has many `notification_history` entries.

## Security (RLS)
- **profiles**: Users can read/update their own profile. Public can read basic profile info (username/avatar).
- **alerts**: Users can only Select, Insert, Update, Delete their own alerts (user_id = auth.uid()).
- **notification_history**: Users can only Select their own history.
- **user_settings**: Users can only Select/Update their own settings.
