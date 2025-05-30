# 🗄️ DATABASE SCHEMA & SQL COMMANDS V3
## Link-in-Bio Platform (Tumbuh Ide Indonesia)

**Database:** Supabase PostgreSQL  
**Security:** Row Level Security (RLS) Enabled  
**Copy-Paste Ready:** Semua SQL commands siap execute di Supabase SQL Editor

---

## 📋 EXECUTION ORDER

Execute SQL commands dalam urutan berikut di Supabase SQL Editor:

1. **CREATE TABLES** (Core tables first, then junction tables)
2. **CREATE INDEXES** (Performance optimization)
3. **ENABLE RLS & CREATE POLICIES** (Security)
4. **CREATE FUNCTIONS & TRIGGERS** (Automation)
5. **INSERT INITIAL DATA** (Master data seeding)

---

## 🗄️ CORE TABLES

### 1. Profiles Table
```sql
-- Extends Supabase auth.users
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL CHECK (username ~ '^[a-zA-Z0-9_]{3,20}$'),
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('content_creator', 'brand', 'admin')),
  avatar_url text,
  tagline text CHECK (char_length(tagline) <= 100),
  bio text CHECK (char_length(bio) <= 500),
  location_id uuid REFERENCES locations(id),
  birth_date date,
  hide_age boolean DEFAULT false,
  is_completed boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 2. Master Data Tables
```sql
-- Niches for Content Creators
CREATE TABLE niches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Business Categories for Brands
CREATE TABLE business_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Locations/Cities
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Social Media Platforms
CREATE TABLE social_platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  base_url text NOT NULL,
  logo_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

### 3. Junction Tables (Many-to-Many)
```sql
-- Profile Niches (Content Creators can have 1-3 niches)
CREATE TABLE profile_niches (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  niche_id uuid REFERENCES niches(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, niche_id)
);

-- Profile Categories (Brands have 1 category)
CREATE TABLE profile_categories (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES business_categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, category_id)
);
```

### 4. Links Tables
```sql
-- Social Media Links
CREATE TABLE social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  platform_id uuid NOT NULL REFERENCES social_platforms(id) ON DELETE CASCADE,
  username text NOT NULL,
  full_url text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(profile_id, platform_id)
);

-- Custom Links
CREATE TABLE custom_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(title) <= 100),
  url text NOT NULL,
  description text CHECK (char_length(description) <= 200),
  logo_url text,
  click_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 5. Analytics Tables
```sql
-- Profile Analytics (Page Views)
CREATE TABLE profile_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  visitor_ip_hash text NOT NULL, -- Hashed for privacy
  visitor_country text,
  visitor_city text,
  device_type text CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  browser text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

-- Link Analytics (Link Clicks)
CREATE TABLE link_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid NOT NULL,
  link_type text NOT NULL CHECK (link_type IN ('social', 'custom')),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  visitor_ip_hash text NOT NULL,
  visitor_country text,
  visitor_city text,
  device_type text CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  browser text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);
```

---

## 🔍 INDEXES FOR PERFORMANCE

```sql
-- Profile indexes
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- Social links indexes
CREATE INDEX idx_social_links_profile_id ON social_links(profile_id);
CREATE INDEX idx_social_links_platform_id ON social_links(platform_id);
CREATE INDEX idx_social_links_sort_order ON social_links(sort_order);

-- Custom links indexes
CREATE INDEX idx_custom_links_profile_id ON custom_links(profile_id);
CREATE INDEX idx_custom_links_sort_order ON custom_links(sort_order);
CREATE INDEX idx_custom_links_click_count ON custom_links(click_count DESC);

-- Analytics indexes
CREATE INDEX idx_profile_analytics_profile_id ON profile_analytics(profile_id);
CREATE INDEX idx_profile_analytics_created_at ON profile_analytics(created_at DESC);
CREATE INDEX idx_link_analytics_profile_id ON link_analytics(profile_id);
CREATE INDEX idx_link_analytics_link_id ON link_analytics(link_id);
CREATE INDEX idx_link_analytics_created_at ON link_analytics(created_at DESC);

-- Master data indexes
CREATE INDEX idx_niches_slug ON niches(slug);
CREATE INDEX idx_business_categories_slug ON business_categories(slug);
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_social_platforms_slug ON social_platforms(slug);
```

---

## 🔒 ROW LEVEL SECURITY POLICIES

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_niches ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable" ON profiles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Profile niches policies
CREATE POLICY "Users can manage own niches" ON profile_niches
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Public niche data viewable" ON profile_niches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = profile_id AND is_active = true
    )
  );

-- Profile categories policies  
CREATE POLICY "Users can manage own categories" ON profile_categories
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Public category data viewable" ON profile_categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = profile_id AND is_active = true
    )
  );

-- Social links policies
CREATE POLICY "Users can manage own social links" ON social_links
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Public social links viewable" ON social_links
  FOR SELECT USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = profile_id AND is_active = true
    )
  );

-- Custom links policies
CREATE POLICY "Users can manage own custom links" ON custom_links
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Public custom links viewable" ON custom_links
  FOR SELECT USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = profile_id AND is_active = true
    )
  );

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON profile_analytics
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "System can insert analytics" ON profile_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own link analytics" ON link_analytics
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "System can insert link analytics" ON link_analytics
  FOR INSERT WITH CHECK (true);

-- Master data policies (public read, admin write)
CREATE POLICY "Anyone can view active niches" ON niches
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage niches" ON niches
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can view active categories" ON business_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage categories" ON business_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can view active locations" ON locations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage locations" ON locations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can view active platforms" ON social_platforms
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage platforms" ON social_platforms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 🔄 FUNCTIONS & TRIGGERS

```sql
-- Auto-update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_social_links_updated_at
BEFORE UPDATE ON social_links
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_custom_links_updated_at
BEFORE UPDATE ON custom_links
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-increment click count function
CREATE OR REPLACE FUNCTION increment_link_click()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.link_type = 'custom' THEN
    UPDATE custom_links SET click_count = click_count + 1 WHERE id = NEW.link_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply click count trigger
CREATE TRIGGER increment_click_counter
AFTER INSERT ON link_analytics
FOR EACH ROW EXECUTE FUNCTION increment_link_click();
```

---

## 📊 INITIAL DATA SEEDING

```sql
-- Insert locations
INSERT INTO locations (name, slug) VALUES
('Surabaya', 'surabaya'),
('Gresik', 'gresik'),
('Sidoarjo', 'sidoarjo'),
('Jakarta', 'jakarta'),
('Bandung', 'bandung'),
('Semarang', 'semarang'),
('Yogyakarta', 'yogyakarta'),
('Denpasar', 'denpasar'),
('Malang', 'malang'),
('Makassar', 'makassar');

-- Insert social platforms
INSERT INTO social_platforms (name, slug, base_url) VALUES
('Instagram', 'instagram', 'https://instagram.com/'),
('TikTok', 'tiktok', 'https://tiktok.com/@'),
('Facebook', 'facebook', 'https://facebook.com/'),
('Twitter', 'twitter', 'https://twitter.com/'),
('YouTube', 'youtube', 'https://youtube.com/@'),
('Discord', 'discord', 'https://discord.gg/'),
('LinkedIn', 'linkedin', 'https://linkedin.com/in/'),
('GitHub', 'github', 'https://github.com/'),
('Twitch', 'twitch', 'https://twitch.tv/'),
('Telegram', 'telegram', 'https://t.me/');

-- Insert niches for content creators
INSERT INTO niches (name, slug) VALUES
('Food & Culinary', 'food-culinary'),
('Fashion', 'fashion'),
('Beauty', 'beauty'),
('Travel', 'travel'),
('Lifestyle', 'lifestyle'),
('Technology', 'technology'),
('Gaming', 'gaming'),
('Fitness', 'fitness'),
('Education', 'education'),
('Entertainment', 'entertainment'),
('Music', 'music'),
('Art & Design', 'art-design'),
('Photography', 'photography'),
('Business', 'business'),
('Finance', 'finance'),
('Health & Wellness', 'health-wellness'),
('DIY & Crafts', 'diy-crafts'),
('Parenting', 'parenting'),
('Sports', 'sports'),
('Comedy', 'comedy');

-- Insert business categories for brands
INSERT INTO business_categories (name, slug) VALUES
('Food & Beverage', 'food-beverage'),
('Fashion & Apparel', 'fashion-apparel'),
('Beauty & Cosmetics', 'beauty-cosmetics'),
('Health & Wellness', 'health-wellness'),
('Home & Decor', 'home-decor'),
('Technology', 'technology'),
('Education', 'education'),
('Entertainment', 'entertainment'),
('Travel & Hospitality', 'travel-hospitality'),
('Financial Services', 'financial-services'),
('Professional Services', 'professional-services'),
('Retail', 'retail'),
('Automotive', 'automotive'),
('Real Estate', 'real-estate'),
('Non-Profit', 'non-profit'),
('Media & Publishing', 'media-publishing'),
('Arts & Culture', 'arts-culture'),
('Sports & Recreation', 'sports-recreation'),
('Agriculture', 'agriculture'),
('Manufacturing', 'manufacturing');
```

---

## 🛡️ SECURITY BEST PRACTICES

### Password Security
```sql
-- Enforce strong passwords
ALTER TABLE auth.users VALIDATE CONSTRAINT users_password_strength_check;

-- Set password policy
-- Note: This is handled by Supabase Auth settings in the dashboard
```

### Permissions
```sql
-- Restrict schema changes to superuser only
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM anon;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant SELECT permissions on tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO service_role;
```

### Data Protection
```sql
-- Enable Row Level Security on all tables (done above)
-- Create RLS policies (done above)

-- Encrypt sensitive data using pgcrypto (optional for very sensitive data)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example for encrypting sensitive data
-- ALTER TABLE users ADD COLUMN encrypted_secret text;
-- UPDATE users SET encrypted_secret = pgp_sym_encrypt('secret data', 'encryption_key');
-- SELECT pgp_sym_decrypt(encrypted_secret::bytea, 'encryption_key') FROM users;
```

---

## 📈 OPTIMIZATION STRATEGIES

### Indexing Strategies
```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_social_links_profile_platform ON social_links(profile_id, platform_id);
CREATE INDEX idx_custom_links_profile_active ON custom_links(profile_id, is_active);
CREATE INDEX idx_profile_analytics_profile_date ON profile_analytics(profile_id, created_at);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_profiles ON profiles(username) WHERE is_active = true;
CREATE INDEX idx_high_click_links ON custom_links(profile_id) WHERE click_count > 10;
```

### Query Optimization
```sql
-- Optimize common queries with JOINs
-- Example: Get profile with links in a single query
SELECT 
  p.*, 
  json_agg(DISTINCT sl.*) AS social_links,
  json_agg(DISTINCT cl.*) AS custom_links
FROM profiles p
LEFT JOIN social_links sl ON p.id = sl.profile_id
LEFT JOIN custom_links cl ON p.id = cl.profile_id
WHERE p.username = 'someusername'
GROUP BY p.id;

-- Use materialized views for complex analytics queries (if needed)
CREATE MATERIALIZED VIEW profile_stats AS
SELECT 
  p.id AS profile_id,
  p.username,
  COUNT(DISTINCT pa.id) AS total_views,
  COUNT(DISTINCT la.id) AS total_clicks
FROM profiles p
LEFT JOIN profile_analytics pa ON p.id = pa.profile_id
LEFT JOIN link_analytics la ON p.id = la.profile_id
GROUP BY p.id, p.username;

-- Refresh materialized view
-- REFRESH MATERIALIZED VIEW profile_stats;
```

### Maintenance
```sql
-- Regular maintenance tasks
-- Run VACUUM ANALYZE periodically
VACUUM ANALYZE profiles;
VACUUM ANALYZE social_links;
VACUUM ANALYZE custom_links;
VACUUM ANALYZE profile_analytics;
VACUUM ANALYZE link_analytics;

-- Set up auto-vacuum parameters
ALTER TABLE profile_analytics SET (autovacuum_vacuum_scale_factor = 0.05);
ALTER TABLE link_analytics SET (autovacuum_vacuum_scale_factor = 0.05);
```

---

## 📱 ANALYTICS SCHEMA EXTENSIONS (Phase 4)

```sql
-- Extend analytics for more detailed tracking
CREATE TABLE analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb,
  visitor_ip_hash text,
  user_agent text,
  referrer text,
  utm_data jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_analytics_events_profile_id ON analytics_events(profile_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own analytics events" ON analytics_events
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "System can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

-- Aggregated analytics views
CREATE VIEW daily_profile_views AS
SELECT 
  profile_id,
  date_trunc('day', created_at) AS day,
  COUNT(*) AS view_count
FROM profile_analytics
GROUP BY profile_id, date_trunc('day', created_at)
ORDER BY profile_id, day DESC;

CREATE VIEW daily_link_clicks AS
SELECT 
  profile_id,
  link_id,
  link_type,
  date_trunc('day', created_at) AS day,
  COUNT(*) AS click_count
FROM link_analytics
GROUP BY profile_id, link_id, link_type, date_trunc('day', created_at)
ORDER BY profile_id, day DESC;
```

---

## 👤 ADMIN SCHEMA EXTENSIONS (Phase 5)

```sql
-- System configuration table
CREATE TABLE system_config (
  id serial PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_by uuid REFERENCES auth.users(id),
  updated_at timestamptz DEFAULT now()
);

-- Insert default config
INSERT INTO system_config (key, value, description) VALUES
('registration_enabled', 'true', 'Whether new registrations are allowed'),
('maintenance_mode', 'false', 'Whether the system is in maintenance mode'),
('max_links_per_profile', '20', 'Maximum number of custom links per profile'),
('feature_flags', '{"dark_mode": true, "analytics": true, "admin_panel": true}', 'Feature flags');

-- System audit log
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text,
  record_id text,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Enable RLS
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can read system config" ON system_config
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage system config" ON system_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- Audit log trigger function
CREATE OR REPLACE FUNCTION log_table_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (user_id, action, table_name, record_id, old_data, new_data)
    VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id::text, row_to_json(OLD), row_to_json(NEW));
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (user_id, action, table_name, record_id, old_data)
    VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, OLD.id::text, row_to_json(OLD));
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (user_id, action, table_name, record_id, new_data)
    VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id::text, row_to_json(NEW));
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit log triggers to key tables
CREATE TRIGGER audit_profiles_changes
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE FUNCTION log_table_change();

CREATE TRIGGER audit_social_links_changes
AFTER INSERT OR UPDATE OR DELETE ON social_links
FOR EACH ROW EXECUTE FUNCTION log_table_change();

CREATE TRIGGER audit_custom_links_changes
AFTER INSERT OR UPDATE OR DELETE ON custom_links
FOR EACH ROW EXECUTE FUNCTION log_table_change();
```

---

## 📈 PERFORMANCE BENCHMARKS

Expected performance for common queries with this schema:

1. **Profile Lookup by Username:**
   - Expected < 10ms with proper indexing
   - Query: `SELECT * FROM profiles WHERE username = 'username'`

2. **Get Profile with Links:**
   - Expected < 50ms for complete profile data
   - Uses JOIN optimization and indexing

3. **Analytics Queries:**
   - Daily aggregations: < 100ms
   - Monthly aggregations: < 500ms
   - Uses materialized views for complex analytics

4. **Write Operations:**
   - Insert analytics event: < 20ms
   - Update profile: < 30ms
   - Create new link: < 25ms

---

**Note:** This schema is designed for scale while maintaining performance. The RLS policies ensure proper data isolation and security while the indexes optimize query performance for common operations. Execute the commands in the specified order to ensure proper dependencies.