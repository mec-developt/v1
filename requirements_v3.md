# 📝 REQUIREMENTS V3
## Link-in-Bio Platform (Tumbuh Ide Indonesia)

**Project Type:** SaaS Web Application  
**Target Users:** Content Creator & Brand Indonesia  
**Primary Focus:** Surabaya, Gresik, Sidoarjo  
**Development Approach:** Mobile-First Web Application dengan Next.js 14

---

## 🎯 PHASE-BASED DEVELOPMENT STRATEGY

### 📊 PHASE 0: FOUNDATION SETUP
**Goal:** Project foundation yang solid dan stable

**Core Tasks:**
- **Project Initialization:** Next.js 14 (fixed version 14.2.3) dengan App Router
- **Styling Setup:** Tailwind CSS v3.4.1 dengan custom design system
- **Database Setup:** Supabase project, schema, dan RLS policies
- **Environment Config:** Proper environment variables dan config
- **Base Structure:** Folder structure sesuai project_structure_v3.md
- **Git Setup:** Repository initialization dan structure

**Technical Specifications:**
- Next.js 14.2.3 (NOT v15) untuk compatibility
- React 18.2.0 untuk stability
- TypeScript 5.3.3 (optional tapi recommended)
- Tailwind CSS 3.4.1 dengan custom color scheme
- Responsive setup dengan mobile-first approach
- ESLint + Prettier untuk code formatting

**Success Criteria:**
- Project berjalan tanpa errors di development
- Database schema terbuat dengan SQL dari database_schema_v3.md
- Folder structure sesuai dokumentasi
- Environment variables configured dan working
- Mobile viewport properly configured
- Basic navigation functional

---

### 📊 PHASE 1: AUTHENTICATION CORE
**Goal:** Complete authentication system

**Core Tasks:**
- **Registration Flow:** Email/password dengan verification email
- **Login System:** Email/password authentication
- **Password Reset:** Forgot password functionality
- **Profile Completion:** Role selection dan initial profile setup
- **Route Protection:** Auth middleware untuk protected routes
- **Session Management:** Persistent authentication

**Technical Specifications:**
- Supabase Auth untuk authentication
- Email verification flow
- Password strength validation
- Username uniqueness checking
- Role-based conditional form fields
- Secure session management
- Mobile-optimized auth forms

**Auth Flow Details:**
1. Register: Email/password → verification email
2. Verify: Email verification → login
3. Login: Authentication → check profile completion
4. Complete Profile: Role selection → profile fields → dashboard
5. Forgot Password: Email → reset link → new password

**Success Criteria:**
- Users can register with email verification
- Login/logout works with persistent session
- Password reset flow works end-to-end
- Profile completion handles different roles
- Protected routes properly secured
- Mobile-friendly auth experience

---

### 📊 PHASE 2: DASHBOARD FOUNDATION
**Goal:** User dashboard dengan profile management

**Core Tasks:**
- **Dashboard Layout:** Responsive layout dengan mobile navigation
- **Profile Management:** Edit profile information
- **Avatar Upload:** Profile photo upload dan cropping
- **Social Links:** CRUD operations untuk social media links
- **Custom Links:** CRUD operations untuk custom links
- **Settings:** Password change dan account management

**Dashboard Components:**
- Responsive header/navigation
- Mobile bottom navigation
- Profile summary card
- Link management interfaces
- File upload components
- Settings management

**Technical Specifications:**
- Headless UI based components (BUKAN @radix-ui)
- Native React forms (BUKAN react-hook-form)
- Mobile-first responsive design
- CSS animations (BUKAN framer-motion)
- Supabase Storage untuk file uploads
- Client-side + Server-side validation

**Success Criteria:**
- Dashboard accessible dan fully responsive
- Profile editing works with real-time updates
- File uploads working dengan proper validation
- Social links CRUD operations working
- Custom links CRUD operations working
- Settings page functional dengan security measures

---

### 📊 PHASE 3: PUBLIC PROFILES
**Goal:** Public-facing profile pages

**Core Tasks:**
- **Dynamic Routes:** Username-based dynamic routing
- **Public Profile:** Responsive public profile display
- **Social Links Grid:** Visual display of social media links
- **Custom Links List:** Display of custom links
- **Analytics Tracking:** View/click tracking implementation
- **SEO Optimization:** Meta tags dan sharing optimization

**Public Profile Layouts:**
- Content Creator layout (niche tags, bio focus)
- Brand layout (business category, brand focus)
- Social links grid dengan platform icons
- Custom links dengan thumbnails dan description
- Share button untuk copy link/QR code

**Technical Specifications:**
- Dynamic routing dengan Next.js App Router
- SSR optimization untuk SEO
- Lazy-loaded images dan components
- Analytics tracking with privacy compliance
- OpenGraph meta tags untuk social sharing
- Mobile-optimized interfaces

**Success Criteria:**
- Public profiles accessible via username URL
- Different layouts for different roles
- Social/custom links displayed correctly
- Analytics tracking working properly
- SEO meta tags generated correctly
- Mobile experience smooth dan responsive

---

### 📊 PHASE 4: ANALYTICS & TRACKING
**Goal:** Analytics dashboard dengan tracking system

**Core Tasks:**
- **Page View Tracking:** Track public profile views
- **Link Click Tracking:** Track link clicks dengan attribution
- **Analytics Dashboard:** Visual display of metrics
- **Real-time Stats:** Updated stats in dashboard
- **Filtering & Sorting:** Date ranges dan filtering options
- **Export Functionality:** Data export capabilities

**Analytics Metrics:**
- Total profile views (daily, weekly, monthly)
- Total link clicks (by link, by platform)
- Visitor sources dan referrers
- Device/browser breakdown
- Geographic data (country/city level)
- Time-based trends

**Technical Specifications:**
- Umami (self-hosted) for analytics (BUKAN Google Analytics)
- Privacy-compliant tracking (hashed IPs)
- Server-side + client-side tracking
- Responsive charts dan visualizations
- Data aggregation dengan SQL/Supabase
- CSV export functionality

**Success Criteria:**
- Analytics tracking accurately records data
- Dashboard displays metrics clearly
- Filtering dan sorting works properly
- Export functionality working
- Mobile-friendly analytics interface
- Privacy compliance maintained

---

### 📊 PHASE 5: ADVANCED FEATURES
**Goal:** System polish dan advanced functionality

**Core Tasks:**
- **Admin Panel:** User dan content management
- **Moderation Tools:** Content moderation capabilities
- **System Monitoring:** Performance dan error tracking
- **Performance Optimization:** Speed dan bundle optimization
- **Security Hardening:** Advanced security measures
- **Production Deployment:** Deployment optimization

**Admin Features:**
- User management (view, edit, suspend)
- Content moderation (links, profiles)
- System statistics dan health metrics
- Bulk operations untuk management
- Audit logs untuk security events

**Technical Specifications:**
- Role-based access control
- Pagination dan search for admin interfaces
- Sentry integration for error tracking (free tier)
- Bundle analysis dan optimization
- Security headers dan best practices
- Vercel deployment optimization

**Success Criteria:**
- Admin panel fully functional
- System performance optimized
- Security measures comprehensively implemented
- Error handling robust dan informative
- Production deployment optimized
- Documentation complete dan accurate

---

## 🎨 UI/UX REQUIREMENTS

### Design Philosophy
- **Mobile-First:** Design untuk mobile terlebih dahulu, lalu enhance untuk larger screens
- **Minimalist:** Clean, uncluttered design yang fokus pada content
- **Accessibility:** WCAG 2.1 AA compliance untuk semua interfaces
- **Native Feel:** UI/UX yang terasa seperti native app di mobile
- **Speed Focus:** Fast loading, minimal JS, CSS animations

### Design System
- **Colors:** Purple (#8B5CF6) + Yellow (#EAB308) + White dengan dark mode support
- **Typography:** Inter untuk body text, Poppins untuk headings
- **Spacing:** 8px grid system untuk consistency
- **Border Radius:** Rounded corners (8px default, 12px for cards)
- **Shadows:** Subtle shadows untuk elevation (light mode only)

### Mobile-First Specifications
- **Viewport Range:** 320px - 1920px (design untuk 320px first)
- **Touch Targets:** Minimum 44px untuk interactive elements
- **Typography:** Minimum 16px font size untuk readability
- **Navigation:** Bottom tabs untuk mobile, sidebar untuk desktop
- **Gestures:** Swipe actions dan pull-to-refresh support

### UI Components
- **Buttons:** Primary, secondary, outline, ghost variants
- **Forms:** Text input, select, checkbox, radio, textarea
- **Cards:** Default, elevated, border variants
- **Navigation:** Mobile bottom tabs, desktop header/sidebar
- **Feedback:** Toast notifications, loading states, error messages
- **Modals:** Confirmation, form, information variants

---

## 🔒 SECURITY REQUIREMENTS

### Authentication Security
- **Password Strength:** Minimum 8 chars, require complexity
- **Rate Limiting:** Strict limits pada auth endpoints
- **Brute Force Protection:** Increasing delays after failed attempts
- **Session Management:** Secure, httpOnly cookies dengan expiration
- **Email Verification:** Required email verification untuk new accounts

### Data Security
- **Input Validation:** Client + server validation untuk semua inputs
- **SQL Injection Protection:** Parameterized queries, RLS policies
- **XSS Prevention:** Content sanitization, CSP headers
- **CSRF Protection:** Anti-CSRF tokens, SameSite cookies
- **API Security:** Authentication untuk all endpoints, rate limiting

### File Upload Security
- **Type Validation:** Strict MIME type checking
- **Size Limits:** Maximum file size enforcement
- **Storage Security:** Secure, authenticated access to uploaded files
- **Virus Scanning:** Malware detection untuk uploads (if possible)
- **Metadata Cleaning:** Strip EXIF data dari images

### Compliance & Privacy
- **Data Minimization:** Collect only necessary information
- **Privacy By Design:** Default privacy settings yang conservative
- **Anonymization:** Hash IP addresses untuk analytics
- **User Control:** Allow users to delete account dan data
- **Transparency:** Clear privacy policy dan data usage

---

## 📱 MOBILE-SPECIFIC REQUIREMENTS

### Mobile UI Requirements
- **Bottom Navigation:** Primary mobile navigation method
- **Floating Action Button:** For primary actions (where appropriate)
- **Pull-to-Refresh:** For content refreshing
- **Swipe Actions:** For item management (where appropriate)
- **Toast Notifications:** For feedback dan status updates

### Mobile Performance
- **Bundle Size:** < 300KB total JavaScript
- **First Contentful Paint:** < 1.5s on 3G connection
- **Time to Interactive:** < 3s on 3G connection
- **Smooth Scrolling:** 60fps scrolling performance
- **Battery Efficiency:** Minimal background processing

### Mobile Features
- **Offline Support:** Basic functionality when offline
- **Share Integration:** Native share API integration
- **Deep Linking:** Proper deep link support
- **Installable:** PWA support untuk home screen installation
- **Responsive Images:** Optimized images untuk different devices

---

## 🔧 TECHNICAL REQUIREMENTS

### Frontend Technical Requirements
- **Next.js 14.2.3:** App Router dengan latest stable 14.x
- **React 18.2.0:** Latest stable React 18
- **Tailwind CSS 3.4.1:** Utility-first styling
- **Headless UI:** Accessible UI components (BUKAN @radix-ui)
- **Lucide React:** SVG icons (BUKAN custom SVG)
- **Zod:** Schema validation

### Backend Technical Requirements
- **Supabase:** Database, Auth, Storage, dan RLS
- **Next.js API Routes:** Server-side logic
- **Server Actions:** Form handling (where appropriate)
- **Edge Functions:** Performance-critical operations
- **Middleware:** Auth protection, rate limiting

### Infrastructure Requirements
- **Vercel:** Hosting dan deployment
- **Supabase:** Database dan authentication
- **GitHub:** Version control dan CI/CD
- **Umami:** Self-hosted analytics (BUKAN Google Analytics)
- **Sentry:** Error tracking (free tier)

### Performance Requirements
- **Lighthouse Score:** > 90 on all metrics
- **Core Web Vitals:** All metrics passing
- **Bundle Size:** < 300KB total JavaScript
- **API Response Time:** < 200ms average
- **Time to First Byte:** < 100ms

---

## 📊 ANALYTICS & TRACKING

### Metrics to Track
- **Profile Views:** Unique dan total views
- **Link Clicks:** By link, by platform, conversion rates
- **User Engagement:** Session duration, pages per session
- **Device Data:** Mobile vs desktop, browser breakdown
- **Geographic Data:** Country, city breakdown
- **Referrers:** Traffic sources dan campaigns

### Analytics Implementation
- **Self-Hosted Umami:** Privacy-focused analytics
- **Server-Side Tracking:** For accuracy dan adblock bypass
- **Client-Side Events:** For interactive elements
- **Custom Events:** For specific user actions
- **Dashboard Integration:** Real-time stats in user dashboard

### Privacy Considerations
- **IP Anonymization:** Hash IP addresses
- **Data Minimization:** Only collect necessary data
- **Retention Policy:** Clear data retention policies
- **Opt-Out Option:** Allow users to opt out of analytics
- **Transparency:** Clear documentation of tracking methods

---

## 🌐 OPEN SOURCE ECOSYSTEM

### Free Tools Only
- **Analytics:** Umami (self-hosted) BUKAN Google Analytics
- **Maps:** OpenStreetMap + Leaflet BUKAN Google Maps
- **Email:** Resend (free tier) atau self-hosted SMTP
- **CDN:** Vercel Edge Network (built-in)
- **Monitoring:** Sentry (free tier)
- **Storage:** Supabase Storage

### Open Source Components
- **Icons:** Lucide React (open source SVG icons)
- **UI Components:** Headless UI (accessible components)
- **Form Validation:** Zod (open source schema validation)
- **Image Processing:** Sharp (open source image handling)
- **Date Handling:** Day.js (lightweight date library)

---

## 📋 FINAL NOTES

**Phase-Based Success:**
Complete each phase fully before moving to the next. Each phase builds on the previous, ensuring a solid foundation.

**Mobile-First Philosophy:**
Always design dan build for mobile first, then enhance for larger screens. This ensures the best experience for the majority of users.

**Open Source Ecosystem:**
Stick to free dan open source tools to minimize costs dan maximize sustainability.

**Security First Approach:**
Implement security measures from the beginning, not as an afterthought.

**Documentation Driven:**
Keep documentation updated as development progresses to ensure knowledge transfer dan sustainability.