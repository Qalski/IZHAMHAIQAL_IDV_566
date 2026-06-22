# IZHAMHAIQAL_IDV_566

# Debuk Shop - Advanced Bookstore Management Ecosystem

### Course Code: IMS566 (Advanced Web Design Development and Content Management)
### Project Type: Individual Assignment Prototype

---

## Project Description
**Debuk Shop** is a premium, high-contrast minimalist independent bookstore interface designed to explore advanced client-side telemetry patterns, responsive layouts, and role-based access flows. The application simulates a full-scale e-commerce operation combined with a real-time administrative intelligence suite, operating dynamically without relying on active server-side database environments by anchoring state management variables within browser storage (`localStorage`).

---

## Strategic Features Included

### 1. Dynamic User Role Authentication Gateway
* **Role Partitioning Handshake:** Implements automated discrimination logic that evaluates active session tokens upon submission to dynamically split users into unique target interfaces.
* **Smart Redirection Links:** Whitelisted regular readers are routed seamlessly to the client-facing catalog tray, while administrators bypass retail layers entirely to load the management desk.

### 2. Client-Side Telemetry Management Dashboard
* **Dynamic Numerical Counters:** Pulls live variables directly from client checkout instances to execute synchronized count-up animations reporting lifetime total books sold and gross bookstore revenue.
* **Dual-Graph Analytics Board:** * *Live Traffic Volume Chart:* A Chart.js line graph mapping daily site hits with built-in interval loops that simulate concurrent readers and actively update the viewport scales.
  * *Genre Popularity Index:* A horizontal data distribution bar chart providing strategic visibility into product tier engagement.

### 3. Dynamic Inventory Expansion Matrix
* **Autonomous Array Mutation:** Features an exclusive inventory control sheet where authorized admins can inject custom cover URLs, title parameters, retail values, and structural text summaries.
* **Live Catalog Integration:** Submitting the data form appends the new product to the active array in real-time, instantly rendering it across public display grids.

### 4. Interactive E-Commerce Operations Tray
* **State-Persisting Basket:** Supports multi-item queue queues with dynamic increment/decrement/removal controls that synchronize instantly across browser restarts.
* **Masked Payment Pipeline:** Provides real-time input formatting logic (automatic digit spacing for credit cards and automatic slash insertions for expiration records) alongside strict error highlighting that paints faulty inputs red.

---

## Frameworks & Libraries Utilized
* **Core Languages:** Semantic HTML5, Vanilla JavaScript (ES6+ Architecture), Custom CSS3 variables.
* **Data Visualization Engine:** Chart.js Library (via secure CDN hook integration).
* **Typography & Icons:** SVG Vector Micro-Assets.

---

## Instructions to Test System Functions

### To Test as a Standard Customer / Reader:
1. Open the website homepage and click the **Login** link in the navbar.
2. Enter any standard email address (e.g., `reader@example.com`) and password, then hit submit.
3. The system will establish a customer profile and redirect you directly to the **Catalogue** grid. 
4. Add items to your cart, click the Cart tab, modify quantities, and hit **Proceed to Payment**.
5. Test the checkout inputs—blank fields or malformed data points will immediately trigger crimson warning flags. Complete the secure fields to trigger the transaction success modal overlay.

### To Test as an Elevated Administrator (Unlocks Dashboard & Inventory):
1. Click the **Logout** button if an active session is currently running.
2. Launch the authentication modal window and use the following verified assignment credential profiles:
   * **Administrative Email:** `admin@debukshop.com`
   * **Password:** *(Any alphanumeric entry password string is accepted)*
3. Upon submission, the engine will trigger an administrative clearance alert and automatically route you directly to `dashboard.html`.
4. Observe the animated statistic counters and fluctuating live traffic charts. 
5. Look at the top navigation row—the **Dashboard** and **Inventory** management tabs have been dynamically injected into the menu tray.
6. Click **Inventory**, fill out a test book structure completely, and hit **Publish to Storefront**. You will be instantly redirected to the Catalogue grid where your new creation will be live at the bottom!
