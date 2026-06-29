# 📚 Debuk Shop — Advanced Bookstore Management & Content Management Ecosystem

> **⚠️ EXAMINER / EVALUATOR NOTICE: ADMINISTRATIVE ACCESS**
> To immediately test the backend management features, please use the following hardcoded credentials on the login page:
> * **Admin Email:** `admin@debukshop.com`
> * **Admin Password:** `1234`

---

## 📖 1. Project Overview & Description
**Debuk Shop** is a premium, minimalist independent online bookstore interface engineered to showcase advanced front-end content management concepts, stateful user interactions, and robust data visualization capabilities. 

Built entirely on client-side web technologies, this platform functions dynamically without requiring server-side or cloud database connections by anchoring its complete operational state within browser storage (`localStorage`).

The system is architected around **Role-Based Access Control (RBAC)** to securely separate standard consumers from administrators. Regular users enjoy a seamless boutique shopping journey from catalog curation to an advanced, masked payment terminal. Meanwhile, administrative accounts unlock an exclusive management ecosystem featuring dynamic statistical tickers, automated layout animations, and real-time inventory injection modules.

---

## ⚡ 2. Core Strategic Features

### 🔐 Role-Based Authentication Gateway (`index.html`)
* **Simulated Credential Registry:** Standard users can create persistent accounts locally via the registration panel. The login processor performs multi-field validation loops across browser memory records.
* **Elevated Administrative Routing:** Detecting the specific administrative token swaps the operational state, unrolls management features, and triggers an automated redirect to the performance dashboard.

### 🧭 Dynamic Navigation UI Menu Tray 
* **Dynamic Menu Injection:** The main navbar row utilizes automated runtime assembly. The exact second an admin authenticates, the JavaScript engine dynamically crafts and inserts the **Dashboard** and **Add** (Inventory) tabs.
* **Frosted-Glass Retractable Layout:** Features a fixed, sticky navbar using modern `backdrop-filter: blur()` rendering that smartly auto-hides when you scroll down to maximize screen real estate.

### 📊 Performance Reporting Management Dashboard (`dashboard.html`)
* **Animated Summary Tickers:** Restricted administrative hub displaying lifetime books sold and gross store revenue (formatted in RM). Counters fetch dynamic parameters from checkout data blocks and run fluid frame count-up entry animations.
* **Live Session Analytics:** Features Chart.js data visualization components mapping live traffic volume (Line Graph) and genre popularity distribution (Bar Graph).

### 🛍️ E-Commerce Utility & Masked Payment Pipeline (`cart.html`)
* **Persistent Shopping Tray:** Features quantity increments, line items reduction, and total clearance tools that automatically sync with browser state caches.
* **Real-Time Input Masking:** Payment fields utilize strict input listeners to format credit card digits automatically into uniform blocks (`0000 0000 0000 0000`) and inject date slashes safely (`MM/YY`).
* **Luxury Success Overlay Modal:** Eliminates cheap browser alert popups, replacing them with a custom frosted-glass backdrop modal overlay that maps receipt counts, charged currency fields, and a generated tracking ID instantly upon payment approval.

### 🗄️ Administrative Inventory Workspace (`catalogue.html` & `addbook.html`)
* **Real-time Price Editing & Deletion:** Admins can instantly alter the retail price of any item or purge it from the system entirely directly from the storefront UI.
* **Inventory Injection:** A clean data capture form allowing admins to push new literature masterpieces into the dynamic `localStorage` array.

---

## 🛠️ 3. System Architecture & Technologies Used
* **Semantic HTML5 Grid Layouts:** Document fragments are built using crisp section dividers, labels, and structured data blocks to maintain an accessible content management profile.
* **Custom CSS3 Variables:** Core theme maps dark high-contrast accents, muted secondary text layouts, and fluid transitions through systematic token variables (Cyber-Neon Theme).
* **Modular Vanilla JavaScript (ES6+):** All features (cart modifications, input masks, validation layers, menu injection paths, security fences) run inside a singular unified core handler script (`js/main.js`).
* **Browser LocalStorage API:** Functions as the primary NoSQL relational database mapping user profiles, cart arrays, and dynamic inventory overrides.
* **Chart.js Library:** Loaded via CDN to render interactive administrative graph canvases.

---

## 🧪 4. Testing Guide for Evaluators

### Test Track A: Standard Customer Experience
1. Open `index.html`.
2. Click **Login** and switch to **Create an account**. Register a test user (e.g., `test@student.com`).
3. Sign in with the new credentials. You will be routed to the `catalogue.html` page.
4. Test the **Genre Filters** (Poetry, Mystery, etc.) and add items to your cart.
5. Click the **Cart** tab. Test the `+` and `-` quantity modifiers.
6. Fill out the checkout form. Observe the automatic credit card spacing.
7. Click **Authorize & Approve Order** to view the custom success receipt modal.

### Test Track B: Administrator Experience
1. Click the navbar **Logout** button to clear your active consumer session.
2. Log in using `admin@debukshop.com` / `1234`.
3. You will be automatically routed to `dashboard.html`. Observe the animated number tickers and the live Chart.js graphs.
4. Navigate to `catalogue.html`. Notice that "Add to Cart" buttons are replaced with **Edit Price** and **Remove** controls. Test altering a book's price.
5. Navigate to the **Add** tab. Fill out the inventory form completely and publish a new book to watch it dynamically appear in the master catalogue.

---

### 🎓 Academic Context
* **Course Code:** IMS566 (Advanced Web Design Development and Content Management)
* **Project Type:** Individual Assignment Prototype (Weightage: 20%)
* **Developed By:** Muhd Izham Haiqal (Information Systems, IM245)
* **Academic Institution:** Universiti Teknologi MARA (UiTM) Puncak Perdana
