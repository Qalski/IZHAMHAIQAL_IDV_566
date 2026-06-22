readme_content = """# Debuk Shop — Advanced Bookstore Management & Content Management Ecosystem

### Course Code: IMS566 (Advanced Web Design Development and Content Management)
### Project Type: Individual Assignment Prototype (Weightage: 20%)
### Developed By: Muhd Izham Haiqal (Information Systems, IM245)
### Academic Institution: Universiti Teknologi MARA (UiTM) Puncak Perdana

---

## 1. Project Overview & Description
**Debuk Shop** is a premium, minimalist independent online bookstore interface engineered to showcase advanced front-end content management concepts, stateful user interactions, and robust data visualization capabilities. Built entirely on client-side web technologies, this platform functions dynamically without requiring server-side or cloud database connections by anchoring its complete operational state within browser storage (`localStorage`).

The system is architected around **Role-Based Access Control (RBAC)** to separate standard consumers from administrators. Regular users enjoy a seamless boutique shopping journey from catalog curation to an advanced, masked payment terminal. Meanwhile, administrative accounts unlock an exclusive management ecosystem featuring dynamic statistical tickers, automated layout animations, and real-time inventory injection modules.

---

## 2. Core Strategic Features

### A. Role-Based Authentication Gateway (`index.html`)
* **Simulated Credential Registry:** Standard users can create persistent accounts locally via the registration panel. The login processor performs multi-field validation loops across browser memory records.
* **Elevated Administrative Routing:** Detecting the specific administrative token (`admin@debukshop.com`) swaps the operational state, unrolls management features, and triggers an automated direct redirection to the performance desk.
* **Automated Visual Error Feedback:** Empty required fields, unregistered profiles, or malformed inputs instantly halt submission loops, highlight input borders in high-contrast crimson red (`field-error`), and append contextual error hint strings directly under the target field box.

### B. Dynamic Navigation UI Menu Tray (`All Pages`)
* **Dynamic Menu Injection:** The main navbar row utilizes automated runtime assembly. When logged out or signed in as a regular customer, administrative options remain completely invisible. The exact second an admin authenticates, the JavaScript engine dynamically crafts and inserts the **Dashboard** and **Inventory** tabs right before the log button slot.
* **Frosted-Glass Asymmetric Layout:** Features a fixed, sticky navbar using modern `backdrop-filter: blur(8px)` rendering. It uses `margin-right: auto` layout mechanics to close the center empty void, grouping the logo and expanded search box nicely on the left while anchoring interactive menus on the right.
* **Full Responsive Adaptability:** Leverages fluid breakpoints and media queries to seamlessly collapse into an off-screen mobile burger menu layout panel on small display views.

### C. Performance Reporting Management Dashboard (`dashboard.html`)
* **Animated Summary Tickers:** Migrated from customer-facing profiles into the restricted administrative hub, these cards display lifetime books sold and gross store revenue. Counters fetch dynamic parameters from checkout data blocks and run fluid frame count-up entry animations.
* **Live Channel Session Tickers:** Simulates live global reader activity on your site, randomly fluctuating concurrently active connections in real-time.

### D. Advanced Data View & Structured Grid Systems (Minimum 2 Views)
* **View 1 — Retail Curation Marketplace (`catalogue.html`):** Renders the library database using a modular CSS layout grid. Cards feature high-performance lazy-loading book covers, dynamic genre badge groupings, and interactive overlay description curtains that slide up smoothly on user hover.
* **View 2 — Administrative Inventory Workspace (`addbook.html`):** A clean data capture form layout split into two functional columns (form controls on the left, architectural code syntax references on the right) providing a dedicated channel for catalog configuration.

### E. Multi-Graph Data Visualization Components (`dashboard.html`)
* **Chart 1 — Live Traffic Volume (Line Graph):** A Chart.js unique visitor tracking system utilizing custom vertical gradient area fills. An integrated background interval loop triggers every 5 seconds, generating occasional simulated site hits and visually climbing the canvas line step-by-step.
* **Chart 2 — Genre Popularity Index (Horizontal Bar Graph):** A modern data distribution histogram mapping volume demand and unit distribution ratios across your individual curated literary genres (Poetry, Mystery, Fiction, Sci-Fi, Philosophy).

### F. E-Commerce Utility & Masked Payment Pipeline (`cart.html`, `payment.html`)
* **Persistent Shopping Tray:** Features quantity increments, line items reduction, and total clearance tools that automatically sync with browser state caches.
* **Real-Time Input Masking:** Payment fields utilize strict input listeners to prevent text strings, format credit card digits automatically into uniform blocks (`0000 0000 0000 0000`), and inject date slashes safely (`MM/YY`).
* **Luxury Success Overlay Modal:** Eliminates cheap browser alert popups, replacing them with a custom blurred backdrop modal overlay that maps receipt counts and charged currency fields instantly upon payment approval.

---

## 3. System Architecture & Libraries Used
* **Semantic HTML5 Grid Layouts:** Document fragments are built using crisp section dividers, labels, and structured data blocks to maintain an accessible content management profile.
* **Custom CSS3 Variables:** Core theme maps dark high-contrast accents, muted secondary text layouts, and fluid transitions through systematic token variables.
* **Modular JavaScript Engine (ES6+):** All features (cart modifications, input masks, validation layers, menu injection paths, security fences) run inside a singular unified core handler script (`js/main.js`).
* **Chart.js Library:** Loaded via a high-speed CDN connection to render interactive graph canvases.

---

## 4. Software Uniformity & Testing Environment
In strict compliance with evaluation rules, this platform was developed, debugged, and optimized exclusively using **Google Chrome** as the primary web browser. This ensures complete software uniformity and perfect visual rendering between the student development view and the lecturer assessment pipeline.

---

## 5. Detailed Steps to Test System Functions

### Test Track A: Standard Customer / Consumer Experience
1. Open your browser and navigate to the landing storefront dashboard screen (`index.html`).
2. Click the **Login** link in the right-hand corner of the navbar.
3. Click the **Create an account** switch link in the popup modal card to swap forms.
4. Enter a valid email structure (e.g., `izham@student.com`), choose a password, and press **Register Account**.
5. Once registered, switch back to the Sign-In view, fill out your new credentials, and hit submit. The engine will authorize your session and route you directly onto the bookstore collection page (`catalogue.html`).
6. Browse the master catalog grid, filter by genre buttons, hover to view synopses, and add items to your tray.
7. Click the **Cart** tab link, test the `+` or `-` buttons to modify units, and hit the **Proceed to Payment** shortcut.
8. On the payment page, try submitting with empty inputs to trigger the red outlines. Test typing into the card field to watch the automatic spacing format in real-time. Fill out the fields completely and submit to experience the custom success modal overlay.

### Test Track B: Elevated Administrator Workspace Experience
1. Click the navbar **Logout** button to clear your active consumer cookies.
2. Launch the authentication overlay card window again and enter these hardcoded assignment credentials:
   * **Administrative Email:** `admin@debukshop.com`
   * **Secret Access Password:** `1234`
3. Click submit. The console will authorize your clearance, fire a welcome back alert, and **automatically redirect you straight onto `dashboard.html`**.
4. Observe the admin dashboard: notice that the count-up entry loops animate perfectly, the active session ticker changes numbers, and both management graphs render live data.
5. Inspect the navigation menu row—the JavaScript engine has cleanly injected both the **Dashboard** and **Inventory** link tabs.
6. Click on **Inventory** (`addbook.html`). Test the input rules by entering negative integers in the pricing slot or leaving fields blank to view the red error walls.
7. Complete the specifications fully by entering a title, author name, specific genre, price, custom book cover URL (using an Open Library track link or any direct web image path), and a summary text paragraph.
8. Click **Publish to Storefront**. The script will commit your changes, fire a confirmation pop-up, and instantly route you to `catalogue.html` where your new title will be seamlessly loaded on the grid ready for checkout operations!
\"\"\"

with open("README.md", "w", encoding="utf-8") as file:
    file.write(readme_content)

print("File written successfully.")
