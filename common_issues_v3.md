# 🚨 COMMON ISSUES & TROUBLESHOOTING GUIDE V3
## Link-in-Bio Platform (Tumbuh Ide Indonesia)

**Quick Reference untuk mengatasi masalah umum dalam development Phase-Based**

---

## 📋 QUICK NAVIGATION

- [🔐 Authentication Issues](#-authentication-issues)
- [🗄️ Database & Supabase Issues](#️-database--supabase-issues)
- [📱 Mobile & Responsive Issues](#-mobile--responsive-issues)
- [🎨 UI/UX & Styling Issues](#-uiux--styling-issues)
- [⚡ Performance Issues](#-performance-issues)
- [🛣️ Routing & Navigation Issues](#️-routing--navigation-issues)
- [📤 File Upload Issues](#-file-upload-issues)
- [📊 Analytics & Tracking Issues](#-analytics--tracking-issues)
- [🔧 Development Environment Issues](#-development-environment-issues)
- [🚀 Deployment Issues](#-deployment-issues)
- [🎭 Package Compatibility Issues](#-package-compatibility-issues) (NEW)

---

## 🔐 AUTHENTICATION ISSUES

### ❌ **Problem: User tidak bisa login setelah register**
**Symptoms:**
- Registration berhasil tapi login gagal
- Error "Invalid login credentials"

**Solutions:**
```javascript
// 1. Check email verification requirement
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`
  }
})

// 2. Handle email confirmation
if (data?.user && !data?.session) {
  // User needs to confirm email
  setMessage("Please check your email to confirm your account")
}
```

### ❌ **Problem: Session tidak persist setelah refresh**
**Symptoms:**
- User logout otomatis setelah refresh page
- Auth state tidak tersimpan

**Solutions:**
```javascript
// 1. Setup proper Supabase client
// lib/supabase.js
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// 2. Setup auth listener
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'SIGNED_IN') {
        router.refresh()
      }
    }
  )

  return () => subscription.unsubscribe()
}, [])
```

### ❌ **Problem: Middleware tidak protect routes dengan benar**
**Symptoms:**
- User bisa akses dashboard tanpa login
- Protected routes tidak redirect ke login

**Solutions:**
```javascript
// middleware.js
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect authenticated users from auth pages
  if ((req.nextUrl.pathname.startsWith('/login') || 
       req.nextUrl.pathname.startsWith('/register')) && user) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
}
```

---

## 🗄️ DATABASE & SUPABASE ISSUES

### ❌ **Problem: RLS Policy blocking legitimate queries**
**Symptoms:**
- "Row Level Security policy violation" errors
- Data tidak muncul meskipun ada di database

**Solutions:**
```sql
-- 1. Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- 2. Create proper RLS policies
-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow public to read public profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_public = true);
```

### ❌ **Problem: Database connection timeout**
**Symptoms:**
- "Connection timeout" errors
- Slow query responses

**Solutions:**
```javascript
// 1. Optimize Supabase client configuration
const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  options: {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: true,
    },
  }
})

// 2. Add query optimization
const { data, error } = await supabase
  .from('profiles')
  .select('id, username, display_name, avatar_url') // Only select needed fields
  .eq('username', username)
  .single()
```

### ❌ **Problem: Foreign key constraint violations**
**Symptoms:**
- "violates foreign key constraint" errors
- Data insertion failures

**Solutions:**
```sql
-- 1. Check foreign key relationships
SELECT
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM 
  information_schema.table_constraints AS tc 
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE constraint_type = 'FOREIGN KEY';

-- 2. Ensure proper insertion order
-- Insert user first, then profile
INSERT INTO auth.users (id, email) VALUES (uuid_generate_v4(), 'user@example.com');
INSERT INTO profiles (user_id, username) VALUES (auth.uid(), 'username');
```

---

## 📱 MOBILE & RESPONSIVE ISSUES

### ❌ **Problem: Touch targets terlalu kecil di mobile**
**Symptoms:**
- Sulit tap buttons di mobile
- User experience buruk di touch devices

**Solutions:**
```css
/* Ensure minimum 44px touch targets */
.touch-target {
  @apply min-h-[44px] min-w-[44px] flex items-center justify-center;
}

/* Button component with proper touch targets */
.btn-mobile {
  @apply h-12 px-6 text-base font-medium;
  @apply md:h-10 md:px-4 md:text-sm;
}
```

### ❌ **Problem: Horizontal scroll di mobile**
**Symptoms:**
- Content overflow horizontally
- User harus scroll horizontal

**Solutions:**
```css
/* Prevent horizontal overflow */
.container {
  @apply w-full max-w-full overflow-x-hidden;
}

/* Responsive grid that doesn't overflow */
.responsive-grid {
  @apply grid grid-cols-1 gap-4;
  @apply sm:grid-cols-2;
  @apply lg:grid-cols-3;
}

/* Responsive text that wraps properly */
.responsive-text {
  @apply break-words overflow-wrap-anywhere;
}
```

### ❌ **Problem: Bottom navigation overlap dengan content**
**Symptoms:**
- Content terpotong di bagian bawah
- Bottom navigation menutupi content

**Solutions:**
```css
/* Add padding bottom for bottom navigation */
.main-content {
  @apply pb-20 md:pb-0; /* 80px padding for mobile bottom nav */
}

/* Fixed bottom navigation */
.bottom-nav {
  @apply fixed bottom-0 left-0 right-0 z-50;
  @apply bg-white border-t border-gray-200;
  @apply h-16 flex items-center justify-around;
}
```

### ❌ **Problem: Viewport height issues di mobile browsers**
**Symptoms:**
- Content tidak full height di mobile
- Address bar menyebabkan layout shift

**Solutions:**
```css
/* Use dvh instead of vh for mobile */
.full-height {
  @apply min-h-screen; /* Fallback */
  min-height: 100dvh; /* Dynamic viewport height */
}

/* Alternative with CSS custom properties */
:root {
  --vh: 1vh;
}

.mobile-full-height {
  height: calc(var(--vh, 1vh) * 100);
}
```

```javascript
// JavaScript to handle viewport height
useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVH()
  window.addEventListener('resize', setVH)
  window.addEventListener('orientationchange', setVH)

  return () => {
    window.removeEventListener('resize', setVH)
    window.removeEventListener('orientationchange', setVH)
  }
}, [])
```

---

## 🎨 UI/UX & STYLING ISSUES

### ❌ **Problem: Dark mode tidak consistent**
**Symptoms:**
- Beberapa components tidak support dark mode
- Flash of wrong theme saat load

**Solutions:**
```javascript
// 1. Setup proper theme provider
// contexts/ThemeContext.jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

```css
/* Consistent dark mode classes */
.card {
  @apply bg-white dark:bg-gray-800;
  @apply text-gray-900 dark:text-gray-100;
  @apply border border-gray-200 dark:border-gray-700;
}

.input {
  @apply bg-white dark:bg-gray-700;
  @apply text-gray-900 dark:text-gray-100;
  @apply border-gray-300 dark:border-gray-600;
  @apply focus:border-primary-500 dark:focus:border-primary-400;
}
```

### ❌ **Problem: Loading states tidak smooth**
**Symptoms:**
- Jarring transitions saat loading
- No feedback untuk user actions

**Solutions:**
```javascript
// Skeleton loading component
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4 mb-2"></div>
    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/2"></div>
  </div>
)

// Loading button state
const Button = ({ loading, children, ...props }) => (
  <button 
    {...props}
    disabled={loading || props.disabled}
    className={`${props.className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {loading ? (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    ) : children}
  </button>
)
```

### ❌ **Problem: Form validation tidak user-friendly (Using Zod, NOT react-hook-form)**
**Symptoms:**
- Error messages tidak jelas
- Validation terlalu aggressive

**Solutions:**
```javascript
// Better form validation with native React form and Zod
import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const validateField = (name, value) => {
    try {
      schema.shape[name].parse(value)
      setErrors(prev => ({ ...prev, [name]: null }))
      return true
    } catch (error) {
      const message = error.errors[0]?.message || `Invalid ${name}`
      setErrors(prev => ({ ...prev, [name]: message }))
      return false
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Only validate on blur or after first submission attempt
    if (errors[name]) validateField(name, value)
  }
  
  const handleBlur = (e) => {
    const { name, value } = e.target
    validateField(name, value)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate all fields
    let isValid = true
    Object.entries(formData).forEach(([name, value]) => {
      if (!validateField(name, value)) isValid = false
    })
    
    if (isValid) {
      try {
        // Submit form
        console.log('Form submitted:', formData)
      } catch (error) {
        console.error('Submission error:', error)
      }
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
```

---

## ⚡ PERFORMANCE ISSUES

### ❌ **Problem: Large bundle size**
**Symptoms:**
- Slow initial page load
- Poor mobile performance

**Solutions:**
```javascript
// 1. Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('@/components/admin/AdminPanel'), {
  loading: () => <div>Loading admin panel...</div>,
  ssr: false
})

// 2. Optimize images
import Image from 'next/image'

const ProfileImage = ({ src, alt }) => (
  <Image
    src={src || "/placeholder.svg"}
    alt={alt}
    width={100}
    height={100}
    className="rounded-full"
    priority={false} // Only true for above-the-fold images
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  />
)

// 3. Code splitting with React.lazy
import { lazy, Suspense } from 'react'

const AnalyticsChart = lazy(() => import('@/components/analytics/Chart'))

const AnalyticsPage = () => (
  <Suspense fallback={<ChartSkeleton />}>
    <AnalyticsChart />
  </Suspense>
)
```

### ❌ **Problem: Too many re-renders**
**Symptoms:**
- Laggy UI interactions
- High CPU usage

**Solutions:**
```javascript
// 1. Memoize expensive calculations
import { useMemo, useCallback } from 'react'

const ExpensiveComponent = ({ data, filter }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => item.category === filter)
  }, [data, filter])

  const handleClick = useCallback((id) => {
    // Handle click
  }, [])

  return (
    <div>
      {filteredData.map(item => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  )
}

// 2. Use React.memo for pure components
const Item = React.memo(({ data, onClick }) => (
  <div onClick={() => onClick(data.id)}>
    {data.name}
  </div>
))
```

---

## 🛣️ ROUTING & NAVIGATION ISSUES

### ❌ **Problem: Dynamic routes tidak work dengan username**
**Symptoms:**
- 404 errors untuk public profiles
- Username routes tidak resolve

**Solutions:**
```javascript
// app/[username]/page.jsx
export async function generateStaticParams() {
  // Pre-generate popular usernames
  const profiles = await supabase
    .from('profiles')
    .select('username')
    .eq('is_public', true)
    .limit(100)

  return profiles.data?.map((profile) => ({
    username: profile.username,
  })) || []
}

export default async function PublicProfile({ params }) {
  const { username } = params
  
  // Validate username format
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    notFound()
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .eq('is_public', true)
    .single()

  if (!profile) {
    notFound()
  }

  return <ProfileComponent profile={profile} />
}
```

### ❌ **Problem: Navigation state tidak sync dengan URL**
**Symptoms:**
- Back button tidak work properly
- URL tidak update saat navigate

**Solutions:**
```javascript
// Use Next.js router properly
import { useRouter, usePathname } from 'next/navigation'

const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = (path) => {
    router.push(path)
  }

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <nav>
      <button 
        onClick={() => navigate('/dashboard')}
        className={isActive('/dashboard') ? 'active' : ''}
      >
        Dashboard
      </button>
    </nav>
  )
}
```

---

## 📤 FILE UPLOAD ISSUES

### ❌ **Problem: File upload gagal atau slow**
**Symptoms:**
- Upload timeout errors
- Large files tidak bisa upload

**Solutions:**
```javascript
// 1. Optimize file upload with compression
import imageCompression from 'browser-image-compression'

const uploadProfileImage = async (file) => {
  try {
    // Compress image before upload
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
    }
    
    const compressedFile = await imageCompression(file, options)
    
    // Upload to Supabase
    const fileName = `${Date.now()}-${compressedFile.name}`
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, compressedFile)

    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}

// 2. File upload with progress
const FileUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (file) => {
    setUploading(true)
    setProgress(0)

    try {
      // Simulate progress (Supabase doesn't provide real progress)
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const url = await uploadProfileImage(file)
      
      clearInterval(interval)
      setProgress(100)
      onUpload(url)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
```

---

## 📊 ANALYTICS & TRACKING ISSUES

### ❌ **Problem: Analytics tidak track dengan benar (Using Umami, NOT Google Analytics)**
**Symptoms:**
- Missing click events
- Inaccurate visitor counts

**Solutions:**
```javascript
// 1. Server-side analytics tracking
// app/api/analytics/route.js
import { supabase } from '@/lib/supabase'
import { createHash } from 'crypto'

export async function POST(request) {
  try {
    const { eventType, profileId, linkId, linkType, metadata } = await request.json()
    
    // Hash IP for privacy
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const ipHash = createHash('sha256').update(ip).digest('hex')
    
    // Get device info
    const userAgent = request.headers.get('user-agent') || ''
    const deviceType = userAgent.match(/mobile|tablet/i) 
      ? userAgent.match(/tablet/i) ? 'tablet' : 'mobile'
      : 'desktop'
    
    // Get referrer
    const referrer = request.headers.get('referer') || ''
    
    // Track based on event type
    if (eventType === 'page_view') {
      await supabase
        .from('profile_analytics')
        .insert({
          profile_id: profileId,
          visitor_ip_hash: ipHash,
          device_type: deviceType,
          browser: userAgent,
          referrer: referrer,
          ...metadata
        })
    } else if (eventType === 'link_click') {
      await supabase
        .from('link_analytics')
        .insert({
          profile_id: profileId,
          link_id: linkId,
          link_type: linkType,
          visitor_ip_hash: ipHash,
          device_type: deviceType,
          browser: userAgent,
          referrer: referrer,
          ...metadata
        })
    }
    
    return Response.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return Response.json({ error: 'Failed to track event' }, { status: 500 })
  }
}

// 2. Umami Analytics Setup (Self-hosted alternative to Google Analytics)
// components/analytics/UmamiTracker.jsx
export function UmamiTracker({ websiteId }) {
  return (
    <>
      <script 
        async 
        defer 
        data-website-id={websiteId}
        src="/umami.js" // Self-hosted
      />
    </>
  )
}

// 3. Track link clicks
const TrackableLink = ({ href, children, profileId, linkId, linkType, ...props }) => {
  const handleClick = async () => {
    // Track via API
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType: 'link_click',
        profileId,
        linkId,
        linkType,
      }),
    })
    
    // Track via Umami (if using)
    if (window.umami) {
      window.umami.track('link_click', {
        linkId,
        linkType,
      })
    }
  }

  return (
    <a 
      href={href} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}
```

---

## 🔧 DEVELOPMENT ENVIRONMENT ISSUES

### ❌ **Problem: Environment variables tidak load**
**Symptoms:**
- undefined environment variables
- API calls failing

**Solutions:**
```bash
# 1. Check .env.local file exists and has correct format
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 2. Restart development server after adding env vars
npm run dev
```

```javascript
// 3. Validate environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})
```

### ❌ **Problem: Hot reload tidak work**
**Symptoms:**
- Changes tidak reflect automatically
- Need manual refresh

**Solutions:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Enable hot reload for all file types
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

module.exports = nextConfig
```

### ❌ **Problem: Import path errors**
**Symptoms:**
- "Module not found" errors
- Relative import issues

**Solutions:**
```json
// jsconfig.json or tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🚀 DEPLOYMENT ISSUES

### ❌ **Problem: Build failures di Vercel**
**Symptoms:**
- "Build failed" errors
- TypeScript errors in production

**Solutions:**
```javascript
// 1. Fix TypeScript errors
// Add to next.config.js to ignore TypeScript errors temporarily
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Only for emergency deployment
  },
  eslint: {
    ignoreDuringBuilds: true, // Only for emergency deployment
  },
}

// 2. Check build locally first
npm run build
npm run start

// 3. Environment variables in Vercel
// Make sure all env vars are added in Vercel dashboard
// Settings > Environment Variables
```

### ❌ **Problem: Supabase connection issues in production**
**Symptoms:**
- Database connection errors in production
- Auth not working after deployment

**Solutions:**
```javascript
// 1. Check environment variables in production
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

// 2. Verify Supabase project settings
// - Check if project is paused
// - Verify API keys are correct
// - Check database connection limits

// 3. Add error handling for production
const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
})
```

---

## 🎭 PACKAGE COMPATIBILITY ISSUES

### ❌ **Problem: Package conflicts dengan Next.js 14**
**Symptoms:**
- Build errors mentioning React version conflicts
- Components rendering incorrectly
- Hook-related errors

**Solutions:**
```bash
# 1. Use specific Next.js version to avoid compatibility issues
npm install next@14.2.3 --save-exact

# 2. Replace problematic packages
# AVOID these packages
npm uninstall framer-motion @radix-ui/react-* react-hook-form next-auth

# USE these alternatives instead
npm install @headlessui/react clsx zod

# 3. Lock versions to prevent unexpected updates
npm config set save-exact=true
```

### ❌ **Problem: CSS animation issues dengan older browsers**
**Symptoms:**
- Animations not working in Safari or older browsers
- Mobile animations causing performance issues

**Solutions:**
```css
/* 1. Use simple CSS animations instead of JavaScript libraries */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease forwards;
}

/* 2. Add browser prefixes for compatibility */
.transform-element {
  -webkit-transform: translateY(-10px);
  -moz-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
  transform: translateY(-10px);
}

/* 3. For mobile performance, use GPU acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}
```

```javascript
// 4. Only use CSS animations for simple transitions
// components/Transition.jsx
const Transition = ({ show, enter, leave, children }) => {
  const [isShowing, setIsShowing] = useState(show)
  
  useEffect(() => {
    if (show) setIsShowing(true)
    
    // If hiding, wait for animation to complete
    if (!show) {
      const timer = setTimeout(() => setIsShowing(false), 300) // Animation duration
      return () => clearTimeout(timer)
    }
  }, [show])
  
  if (!isShowing) return null
  
  return (
    <div className={show ? enter : leave}>
      {children}
    </div>
  )
}

// Usage
<Transition
  show={isOpen}
  enter="animate-fade-in"
  leave="animate-fade-out"
>
  <div>Content</div>
</Transition>
```

### ❌ **Problem: SSR Hydration issues dengan headless UI components**
**Symptoms:**
- "Hydration failed" warnings
- UI flickering on load
- Client/server mismatch errors

**Solutions:**
```javascript
// 1. Use dynamic import with ssr: false for client-only components
import dynamic from 'next/dynamic'

const ClientOnlyDropdown = dynamic(
  () => import('@/components/ui/Dropdown'),
  { ssr: false }
)

// 2. Use useId for stable IDs across server and client
import { useId } from 'react'

function Form() {
  const emailId = useId()
  const passwordId = useId()
  
  return (
    <form>
      <label htmlFor={emailId}>Email</label>
      <input id={emailId} type="email" />
      
      <label htmlFor={passwordId}>Password</label>
      <input id={passwordId} type="password" />
    </form>
  )
}

// 3. Use suppress-hydration-warning for expected mismatches
function DateDisplay() {
  const [date, setDate] = useState(new Date())
  
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div suppressHydrationWarning>
      {date.toLocaleTimeString()}
    </div>
  )
}
```

### ❌ **Problem: Incompatible ES module syntax**
**Symptoms:**
- "Cannot use import statement outside a module" errors
- Package resolution issues

**Solutions:**
```javascript
// 1. Use CommonJS syntax for incompatible modules
// Instead of:
// import { something } from 'problematic-package'

// Use:
const { something } = require('problematic-package')

// 2. Use next.config.js transpilePackages for ES module issues
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['problematic-package'],
}

module.exports = nextConfig

// 3. Create custom wrapper for problematic packages
// lib/compatibleWrapper.js
export function safelyUsePackage() {
  let result = null
  if (typeof window !== 'undefined') {
    // Only import on client side
    const package = require('problematic-package')
    result = package.doSomething()
  }
  return result
}
```

---

## 🔍 DEBUGGING TECHNIQUES

### Console Debugging
```javascript
// 1. Debug API calls
const debugAPI = async (url, options) => {
  console.log('API Call:', url, options)
  const response = await fetch(url, options)
  console.log('API Response:', response.status, await response.clone().text())
  return response
}

// 2. Debug component renders
const DebugComponent = ({ children, name }) => {
  console.log(`${name} rendered at:`, new Date().toISOString())
  return children
}

// 3. Debug state changes
useEffect(() => {
  console.log('State changed:', { user, loading, error })
}, [user, loading, error])
```

### Network Debugging
```javascript
// Check network requests in browser dev tools
// Network tab > Filter by XHR/Fetch
// Look for failed requests (red status codes)
// Check request/response headers and body
```

### Database Debugging
```sql
-- Check recent queries in Supabase
SELECT * FROM pg_stat_activity WHERE state = 'active';

-- Check table permissions
SELECT * FROM information_schema.table_privileges 
WHERE table_name = 'your_table_name';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'your_table_name';
```

---

## 🆘 EMERGENCY FIXES

### Quick Fixes untuk Demo/Presentation
```javascript
// 1. Disable problematic features temporarily
const DEMO_MODE = process.env.NODE_ENV === 'production'

if (DEMO_MODE) {
  // Skip analytics tracking
  // Use mock data instead of API calls
  // Disable file uploads
}

// 2. Add error boundaries everywhere
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <div>Something went wrong. Please refresh the page.</div>
  }

  return children
}

// 3. Fallback UI for failed components
const SafeComponent = ({ children, fallback = null }) => {
  try {
    return children
  } catch (error) {
    console.error('Component error:', error)
    return fallback || <div>Content unavailable</div>
  }
}
```

---

## 📞 WHEN ALL ELSE FAILS

### Escalation Steps
1. **Check this guide first** - Most issues are covered here
2. **Search error message** - Google the exact error message
3. **Check Supabase status** - https://status.supabase.com/
4. **Check Next.js docs** - https://nextjs.org/docs
5. **Check GitHub issues** - Search for similar problems
6. **Ask for help** - Provide error messages and code context

### Information to Provide When Asking for Help
- **Exact error message**
- **Steps to reproduce**
- **Browser and device info**
- **Code snippet causing the issue**
- **Environment (development/production)**
- **Recent changes made**

---

**Remember: Focus on completing each phase fully before moving to the next. Phase 0 and Phase 1 are the most critical for establishing a solid foundation.**