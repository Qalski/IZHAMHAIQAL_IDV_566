document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. GLOBAL STATE MAPPING (CART, TELEMETRY, & ROBUST REGISTERED USERS)
    // =========================================================================
    let cart = JSON.parse(localStorage.getItem('debuk_cart')) || [];
    let lifetimeSold = parseInt(localStorage.getItem('debuk_total_sold'), 10) || 100;
    let lifetimeRevenue = parseFloat(localStorage.getItem('debuk_total_revenue')) || 2000.00;
    
    // Active Authentication States
    let currentUser = localStorage.getItem('debuk_user') || null;
    
    // Persistent Account Registry Database Array
    let registeredUsers = JSON.parse(localStorage.getItem('debuk_registered_users')) || [];

    function updateCartBadge() {
        const cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = `(${totalItems})`;
        }
    }
    
    // ROLE-BASED ACCESS CONTROL NAVBAR SYNC ENGINE
    function syncAuthNavbarUI() {
        const navMenu = document.getElementById('nav-menu');
        const authNavBtn = document.getElementById('auth-nav-btn');
        if (!navMenu || !authNavBtn) return;

        // Clean out historical privilege instances to prevent duplicates
        const runningAdminTabs = navMenu.querySelectorAll('.admin-privilege-tab');
        runningAdminTabs.forEach(tab => tab.remove());

        if (currentUser === 'admin') {
            authNavBtn.textContent = "Logout (Admin)";
            authNavBtn.style.color = "#ef4444"; 

            // Create Admin Dashboard Link
            const dashboardTab = document.createElement('a');
            dashboardTab.href = 'dashboard.html';
            dashboardTab.textContent = 'Dashboard';
            dashboardTab.className = 'admin-privilege-tab';
            if (window.location.pathname.includes('dashboard.html')) dashboardTab.classList.add('active');

            // Create Admin Inventory Link (Matched to your addbook.html preference)
            const inventoryTab = document.createElement('a');
            inventoryTab.href = 'addbook.html';
            inventoryTab.textContent = 'Inventory';
            inventoryTab.className = 'admin-privilege-tab';
            if (window.location.pathname.includes('addbook.html')) inventoryTab.classList.add('active');

            navMenu.insertBefore(dashboardTab, authNavBtn);
            navMenu.insertBefore(inventoryTab, authNavBtn);

        } else if (currentUser) {
            authNavBtn.textContent = `Logout (${currentUser})`;
            authNavBtn.style.color = "#ef4444";
        } else {
            authNavBtn.textContent = "Login";
            authNavBtn.style.color = "";
        }
    }
    
    updateCartBadge();
    syncAuthNavbarUI();

    // =========================================================================
    // 2. ENHANCED AUTHENTICATION MODAL ENGINE (WITH RED-BAR ERROR HIGHLIGHTS)
    // =========================================================================
    const authModal = document.getElementById('auth-modal');
    const authNavBtn = document.getElementById('auth-nav-btn');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const modalAuthForm = document.getElementById('modal-auth-form');
    let isRegisterMode = false;

    function openAuthModal() { if (authModal) authModal.classList.add('modal-open'); }
    function closeAuthModal() { if (authModal) { authModal.classList.remove('modal-open'); resetAuthModalForm(); } }
    
    function resetAuthModalForm() {
        isRegisterMode = false;
        clearModalErrors();
        document.getElementById('auth-modal-title').textContent = "Login to Debuk Shop";
        document.getElementById('auth-modal-desc').textContent = "Please sign in to access curation files, your shopping tray, and secure payment processing options.";
        document.getElementById('auth-submit-btn').textContent = "Sign In";
        document.getElementById('auth-switch-text').innerHTML = `New reader? <a href="#" id="auth-switch-link">Create an account</a>`;
        rebindSwitchLink();
    }

    function clearModalErrors() {
        if (!modalAuthForm) return;
        const modalInputs = modalAuthForm.querySelectorAll('input');
        modalInputs.forEach(input => {
            input.classList.remove('field-error');
            const hint = input.parentNode.querySelector('.error-hint');
            if (hint) hint.remove();
        });
    }

    function rebindSwitchLink() {
        const link = document.getElementById('auth-switch-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                isRegisterMode = !isRegisterMode;
                clearModalErrors();
                if (isRegisterMode) {
                    document.getElementById('auth-modal-title').textContent = "Create an Account";
                    document.getElementById('auth-modal-desc').textContent = "Join Debuk Shop to track historical literature archives and build a curated inventory collection panel.";
                    document.getElementById('auth-submit-btn').textContent = "Register Account";
                    document.getElementById('auth-switch-text').innerHTML = `Already registered? <a href="#" id="auth-switch-link">Sign in here</a>`;
                } else {
                    resetAuthModalForm();
                }
                rebindSwitchLink();
            });
        }
    }
    rebindSwitchLink();

    if (authNavBtn) {
        authNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser) {
                localStorage.removeItem('debuk_user');
                currentUser = null;
                syncAuthNavbarUI();
                alert("Session terminated. You have logged out safely.");
                window.location.href = 'index.html';
            } else {
                openAuthModal();
            }
        });
    }
    if (authCloseBtn) authCloseBtn.addEventListener('click', closeAuthModal);
    
    if (modalAuthForm) {
        modalAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearModalErrors();

            const emailField = document.getElementById('auth-email');
            const passwordField = document.getElementById('auth-password');
            const emailValue = emailField.value.trim().toLowerCase();
            const passwordValue = passwordField.value;

            // Helper to paint bars red and drop visual warnings
            const throwModalError = (element, message) => {
                element.classList.add('field-error');
                const errorHint = document.createElement('span');
                errorHint.className = 'error-hint';
                errorHint.textContent = message;
                element.parentNode.appendChild(errorHint);
            };

            // -----------------------------------------------------------------
            // PIPELINE A: REGISTERING NEW ACCOUNTS
            // -----------------------------------------------------------------
            if (isRegisterMode) {
                if (emailValue === 'admin@debukshop.com') {
                    throwModalError(emailField, "This system address is reserved for administrative tasks.");
                    return;
                }

                const emailExists = registeredUsers.some(user => user.email === emailValue);
                if (emailExists) {
                    throwModalError(emailField, "This email profile is already registered in our catalog archive.");
                    return;
                }

                // Append new account to local registry
                registeredUsers.push({ email: emailValue, password: passwordValue });
                localStorage.setItem('debuk_registered_users', JSON.stringify(registeredUsers));

                alert("Account created successfully!\nYou can now sign in using your secure reader credentials.");
                resetAuthModalForm();
                modalAuthForm.reset();
                return;
            }

            // -----------------------------------------------------------------
            // PIPELINE B: SIGNING INTO EXISTING ACCOUNTS
            // -----------------------------------------------------------------
            // 1. Strict Administrator Pathway Check
            if (emailValue === 'admin@debukshop.com') {
                if (passwordValue === '1234') {
                    currentUser = 'admin';
                    localStorage.setItem('debuk_user', 'admin');
                    syncAuthNavbarUI();
                    closeAuthModal();
                    alert("Administrative Workspace Unlocked.\nRedirecting directly to the performance control center.");
                    window.location.href = 'dashboard.html';
                } else {
                    throwModalError(passwordField, "Invalid administrative access key code.");
                    throwModalError(emailField, "Invalid email or password parameters.");
                }
                return;
            }

            // 2. Standard Customer Validation Search
            const authenticatedUser = registeredUsers.find(user => user.email === emailValue && user.password === passwordValue);

            if (authenticatedUser) {
                currentUser = emailValue.split('@')[0];
                localStorage.setItem('debuk_user', currentUser);
                syncAuthNavbarUI();
                closeAuthModal();
                alert(`Welcome back, ${currentUser}!\nYour secure profile portal is now online.`);
                window.location.href = 'catalogue.html';
            } else {
                // Paint inputs red and display structural assignment error hints
                throwModalError(emailField, "");
                throwModalError(passwordField, "Invalid email or password parameters.");
            }
            modalAuthForm.reset();
        });
    }

    function checkAuthenticationGuard() {
        if (!currentUser) {
            alert("Authentication Required:\nPlease log in or create an account to process bookstore operations.");
            openAuthModal();
            return false;
        }
        return true;
    }

    // =========================================================================
    // 3. SHARED NAVIGATION MENUS (MOBILE RESPONSIVE BURGER BAR)
    // =========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => { menuToggle.classList.toggle('open'); navMenu.classList.toggle('mobile-active'); });
    }

    // =========================================================================
    // 4. INDEX PAGE COMPONENTS (HORIZONTAL SLIDER SCROLLER)
    // =========================================================================
    const slider = document.getElementById('new-arrivals-slider');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    if (slider && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 280; 
        scrollLeftBtn.addEventListener('click', () => { slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
        scrollRightBtn.addEventListener('click', () => { slider.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
    }

    // =========================================================================
    // 5. MANAGEMENT DASHBOARD DATA METRIC GRAPH ENGINE
    // =========================================================================
    const booksCounter = document.getElementById('stat-books');
    const revenueCounter = document.getElementById('stat-revenue');
    const liveReadersText = document.getElementById('stat-live-readers');
    const welcomeTag = document.getElementById('dashboard-welcome-tag');
    const dashboardMainView = document.getElementById('dashboard-main-view');
    
    if (dashboardMainView) {
        if (currentUser !== 'admin') {
            dashboardMainView.innerHTML = `
                <div class="empty-cart-message" style="grid-column: 1/-1; padding: 8rem 0; text-align:center;">
                    <h2>Access Prohibited</h2>
                    <p>Elevated administrative permissions are required to inspect bookstore operational performance logs.</p>
                    <button class="btn-primary" onclick="document.getElementById('auth-nav-btn').click()" style="margin-top:1.5rem; border:1px solid #111; padding:0.75rem 2rem; background:#111; color:#fff; cursor:pointer;">Verify Administrative Session</button>
                </div>`;
            return;
        }

        if (welcomeTag) welcomeTag.textContent = `Welcome Back, Admin • Operational Summary`;
        if (booksCounter) booksCounter.setAttribute('data-target', lifetimeSold);
        if (revenueCounter) revenueCounter.setAttribute('data-target', Math.round(lifetimeRevenue));

        const counters = document.querySelectorAll('.metric-value[data-target]');
        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-target'), 10);
            const totalFrames = Math.round(1500 / (1000 / 60)); let frame = 0;
            const countUp = () => {
                frame++; const progress = frame / totalFrames; const easeOut = 1 - Math.pow(1 - progress, 3); const currentValue = Math.floor(easeOut * targetValue);
                counter.textContent = counter.id === 'stat-revenue' ? `$${currentValue.toLocaleString()}` : currentValue.toLocaleString();
                if (frame < totalFrames) { requestAnimationFrame(countUp); } 
                else { counter.textContent = counter.id === 'stat-revenue' ? `$${targetValue.toLocaleString()}` : targetValue.toLocaleString(); }
            };
            requestAnimationFrame(countUp);
        });

        let simulatedLiveReaders = Math.floor(Math.random() * 5) + 2;
        if (liveReadersText) liveReadersText.textContent = simulatedLiveReaders;

        const ctxLine = document.getElementById('visitorChart');
        if (ctxLine && typeof Chart !== 'undefined') {
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const defaultTrafficHistory = [14, 22, 19, 35, 41, 28, 33];
            let savedTraffic = JSON.parse(localStorage.getItem('debuk_visitor_history'));
            
            if (!savedTraffic || savedTraffic[0] > 100) {
                savedTraffic = defaultTrafficHistory;
                localStorage.setItem('debuk_visitor_history', JSON.stringify(savedTraffic));
            }

            const currentCalendarDay = new Date().getDay();
            const targetedArrayDayIndex = currentCalendarDay === 0 ? 6 : currentCalendarDay - 1;
            savedTraffic[targetedArrayDayIndex] += 1;
            localStorage.setItem('debuk_visitor_history', JSON.stringify(savedTraffic));

            const subtitleText = document.getElementById('dashboard-traffic-subtitle');
            const updateLiveTextBanner = () => {
                if (subtitleText) {
                    subtitleText.innerHTML = `Live Activity • <span style="color:#10b981; font-weight:600;">${savedTraffic[targetedArrayDayIndex]} Unique Visitors Today</span>`;
                }
            };
            updateLiveTextBanner();

            const liveVisitorChart = new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: daysOfWeek,
                    datasets: [{
                        data: savedTraffic,
                        borderColor: '#111111', borderWidth: 2, pointBackgroundColor: '#111111', tension: 0.35, fill: true,
                        backgroundColor: (c) => {
                            const chart = c.chart; const {ctx, chartArea} = chart; if (!chartArea) return null;
                            const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                            g.addColorStop(0, 'rgba(17, 17, 17, 0.08)'); g.addColorStop(1, 'rgba(17, 17, 17, 0.00)'); return g;
                        }
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { min: 0, grid: { color: '#e5e7eb' }, border: { dash: [5, 5] } } } }
            });

            setInterval(() => {
                const simulatedIncomingHits = Math.floor(Math.random() * 2) + 1;
                savedTraffic[targetedArrayDayIndex] += simulatedIncomingHits;
                localStorage.setItem('debuk_visitor_history', JSON.stringify(savedTraffic));
                simulatedLiveReaders += (Math.random() > 0.5 ? 1 : -1);
                if (simulatedLiveReaders < 1) simulatedLiveReaders = 1;
                if (liveReadersText) liveReadersText.textContent = simulatedLiveReaders;
                updateLiveTextBanner();
                liveVisitorChart.data.datasets[0].data = savedTraffic;
                liveVisitorChart.update(); 
            }, 5000);
        }

        const ctxBar = document.getElementById('genreDemandChart');
        if (ctxBar && typeof Chart !== 'undefined') {
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: ['Poetry', 'Mystery', 'Fiction', 'Sci-Fi', 'Philosophy'],
                    datasets: [{ label: 'Units Distributed', data: [24, 38, 45, 18, 31], backgroundColor: '#111111', hoverBackgroundColor: '#1f2937', borderRadius: 2, barThickness: 20 }]
                },
                options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { min: 0, grid: { color: '#e5e7eb' }, border: { dash: [5, 5] } }, y: { grid: { display: false } } } }
            });
        }
    }

    // =========================================================================
    // 6. CATALOGUE DATA ARRAYS AND STORAGE MERGE HANDLING
    // =========================================================================
    const baselineBooks = [
        { id: 1, title: "In the Presence of Absence", author: "Mahmoud Darwish", genre: "Poetry", price: 18.00, img: "https://covers.openlibrary.org/b/isbn/9781935744016-L.jpg", desc: "A sweeping, luminous self-elegy bridging exile, collective memory, and Palestinian poetic sovereignty." },
        { id: 2, title: "Memory for Forgetfulness", author: "Mahmoud Darwish", genre: "Poetry", price: 16.50, img: "https://covers.openlibrary.org/b/isbn/9780520915138-L.jpg", desc: "A masterful prose poem tracking a single day during the 1982 siege of Beirut." },
        { id: 3, title: "The Essential Rumi", author: "Jalal al-Din Rumi", genre: "Poetry", price: 15.00, img: "https://covers.openlibrary.org/b/isbn/9780062509598-L.jpg", desc: "Timeless ecstasies and spiritual transformations captured by history's premier mystic poet." },
        { id: 4, title: "Twenty Love Poems", author: "Pablo Neruda", genre: "Poetry", price: 12.00, img: "https://covers.openlibrary.org/b/isbn/9780142437704-L.jpg", desc: "Searing, earth-bound Chilean verse tracking the heights of passion and depths of isolation." },
        { id: 5, title: "And Then There Were None", author: "Agatha Christie", genre: "Mystery", price: 14.99, img: "https://covers.openlibrary.org/b/isbn/9780062073488-L.jpg", desc: "Ten strangers isolated on an island are systematically eliminated matching a dark nursery rhyme." },
        { id: 6, title: "Murder on the Orient Express", author: "Agatha Christie", genre: "Mystery", price: 13.99, img: "https://covers.openlibrary.org/b/isbn/9780062073495-L.jpg", desc: "Hercule Poirot must solve an intricate, layered assassination plot trapped aboard a snowbound train." },
        { id: 7, title: "The Adventures of Sherlock Holmes", author: "Arthur Conan Doyle", genre: "Mystery", price: 11.50, img: "https://covers.openlibrary.org/b/isbn/9780141040349-L.jpg", desc: "The definitive short stories tracing the pristine deductive architectures of Baker Street." },
        { id: 8, title: "Gone Girl", author: "Gillian Flynn", genre: "Mystery", price: 16.00, img: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg", desc: "A dark, shifting psychological puzzle parsing toxic relationships and masterclass media manipulations." },
        { id: 9, title: "Norwegian Wood", author: "Haruki Murakami", genre: "Fiction", price: 17.00, img: "https://covers.openlibrary.org/b/isbn/9780375704079-L.jpg", desc: "A nostalgic, poignant look at student life, mental fragility, and romantic loss in 1960s Tokyo." },
        { id: 10, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", genre: "Fiction", price: 19.99, img: "https://covers.openlibrary.org/b/isbn/9780060883287-L.jpg", desc: "The foundational epic tracking generations of the Buendía family through the magical lens of Macondo." },
        { id: 11, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", price: 10.00, img: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", desc: "A brilliant, tragic autopsy of the deceptive promises wrapped inside the American Dream." },
        { id: 12, title: "The Metamorphosis", author: "Franz Kafka", genre: "Fiction", price: 9.50, img: "https://covers.openlibrary.org/b/isbn/9780486441405-L.jpg", desc: "Gregor Samsa wakes up transformed into a monstrous insect, detailing profound alienation." },
        { id: 13, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", price: 21.00, img: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg", desc: "The premier planetary space opera parsing politics, ecology, and messianic prophecies on Arrakis." },
        { id: 14, title: "Foundation", author: "Isaac Asimov", genre: "Sci-Fi", price: 15.99, img: "https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg", desc: "A historic sweeping saga mapping the mathematical prediction and preservation of a galactic empire." },
        { id: 15, title: "Neuromancer", author: "William Gibson", genre: "Sci-Fi", price: 14.50, img: "https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg", desc: "The matrix-defining cyberpunk thriller following a washed-up hacker on a matrix-wide heist." },
        { id: 16, title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", genre: "Sci-Fi", price: 13.00, img: "https://covers.openlibrary.org/b/isbn/9780345404473-L.jpg", desc: "An investigation into empathy and identity tracking a bounty hunter searching for fugitive androids." },
        { id: 17, title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", genre: "Philosophy", price: 18.50, img: "https://covers.openlibrary.org/b/isbn/9780140441185-L.jpg", desc: "A poetic philosophical treatise outlining the death of old dogma, the Will to Power, and the Übermensch." },
        { id: 18, title: "Meditations", author: "Marcus Aurelius", genre: "Philosophy", price: 11.00, img: "https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg", desc: "Private diary entries from a Roman Emperor detailing pristine Stoic practices and mental resilience." },
        { id: 19, title: "The Stranger", author: "Albert Camus", genre: "Philosophy", price: 12.50, img: "https://covers.openlibrary.org/b/isbn/9780679720201-L.jpg", desc: "An absurdism-anchored masterpiece parsing emotional detachment and societal sentence structures." },
        { id: 20, title: "Beyond Good and Evil", author: "Friedrich Nietzsche", genre: "Philosophy", price: 15.00, img: "https://covers.openlibrary.org/b/isbn/9780140449235-L.jpg", desc: "A dramatic dismantling of traditional morality, laying groundwork for a new psychological paradigm." }
    ];

    let customizedAdminBooks = JSON.parse(localStorage.getItem('debuk_custom_books')) || [];
    const bookDatabase = [...baselineBooks, ...customizedAdminBooks];

    const catalogueGrid = document.getElementById('catalogue-grid');
    if (catalogueGrid) {
        function displayBooks(booksToRender) {
            catalogueGrid.innerHTML = ''; 
            if (booksToRender.length === 0) {
                catalogueGrid.innerHTML = `<p class="no-results">No masterworks found matching your search parameter.</p>`;
                return;
            }
            booksToRender.forEach(book => {
                const card = document.createElement('div'); card.className = 'catalogue-card';
                card.innerHTML = `
                    <div class="card-media-wrapper">
                        <img src="${book.img}" alt="${book.title}" loading="lazy">
                        <div class="hover-description-overlay"><div class="overlay-inner-content"><p class="overlay-genre">${book.genre}</p><p class="overlay-summary">${book.desc}</p></div></div>
                    </div>
                    <div class="card-details">
                        <h3 class="book-title-text">${book.title}</h3><p class="book-author-text">${book.author}</p>
                        <div class="card-footer-flex"><span class="book-price">$${book.price.toFixed(2)}</span><button class="add-to-cart-btn" data-id="${book.id}">Add To Cart</button></div>
                    </div>
                `;
                catalogueGrid.appendChild(card);
            });
            bindAddToCartEvents();
        }

        function bindAddToCartEvents() {
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    if (!checkAuthenticationGuard()) return;
                    const bookId = parseInt(e.target.getAttribute('data-id'), 10);
                    const completeBookData = bookDatabase.find(b => b.id === bookId);
                    if (completeBookData) {
                        const existingItem = cart.find(item => item.id === bookId);
                        if (existingItem) { existingItem.quantity += 1; } 
                        else { cart.push({ id: completeBookData.id, title: completeBookData.title, author: completeBookData.author, price: completeBookData.price, img: completeBookData.img, quantity: 1 }); }
                        localStorage.setItem('debuk_cart', JSON.stringify(cart));
                        updateCartBadge();
                        button.textContent = "Added ✓"; button.style.backgroundColor = "#111111"; button.style.color = "#ffffff";
                        setTimeout(() => { button.textContent = "Add To Cart"; button.style.backgroundColor = ""; button.style.color = ""; }, 1000);
                    }
                });
            });
        }
        displayBooks(bookDatabase);

        const searchInput = document.getElementById('global-search');
        const filterButtons = document.querySelectorAll('.filter-btn');
        let currentGenre = 'all', searchQuery = '';

        function filterCatalogue() {
            const filteredBooks = bookDatabase.filter(book => {
                return (currentGenre === 'all' || book.genre === currentGenre) && 
                       (book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery));
            });
            displayBooks(filteredBooks);
        }
        filterButtons.forEach(btn => btn.addEventListener('click', (e) => { filterButtons.forEach(b => b.classList.remove('active')); e.target.classList.add('active'); currentGenre = e.target.getAttribute('data-filter'); filterCatalogue(); }));
        if (searchInput) searchInput.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase().trim(); filterCatalogue(); });
    }

    // =========================================================================
    // 7. SHOPPING BASKET DISPLAY BLOCK
    // =========================================================================
    const cartTbody = document.getElementById('cart-items-tbody');
    const basketLayoutContainer = document.getElementById('cart-layout-container');

    function displayCartPage() {
        if (!cartTbody) return;
        cartTbody.innerHTML = '';
        if (cart.length === 0) {
            if (basketLayoutContainer) basketLayoutContainer.innerHTML = `<div class="empty-cart-message"><p>Your shopping basket is currently empty.</p><a href="catalogue.html" class="btn-primary">Return To Catalogue</a></div>`;
            return;
        }
        let subtotalAccumulator = 0;
        cart.forEach((item, index) => {
            const itemSubtotal = item.price * item.quantity; subtotalAccumulator += itemSubtotal;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><div class="cart-item-info"><img src="${item.img}" alt="${item.title}"><div class="cart-item-details"><h4>${item.title}</h4><p>${item.author}</p></div></div></td>
                <td>$${item.price.toFixed(2)}</td>
                <td><div class="quantity-control"><button class="quantity-btn decrease-qty" data-index="${index}">-</button><span class="quantity-value">${item.quantity}</span><button class="quantity-btn increase-qty" data-index="${index}">+</button></div></td>
                <td>$${itemSubtotal.toFixed(2)}</td>
                <td><button class="remove-item-btn" data-index="${index}">Remove</button></td>
            `;
            cartTbody.appendChild(row);
        });
        document.getElementById('summary-subtotal').textContent = `$${subtotalAccumulator.toFixed(2)}`;
        document.getElementById('summary-total').textContent = `$${subtotalAccumulator.toFixed(2)}`;
        bindCartModifiers();
    }

    function bindCartModifiers() {
        document.querySelectorAll('.increase-qty').forEach(btn => btn.addEventListener('click', (e) => { cart[e.target.getAttribute('data-index')].quantity += 1; syncCartState(); }));
        document.querySelectorAll('.decrease-qty').forEach(btn => btn.addEventListener('click', (e) => { const idx = e.target.getAttribute('data-index'); if (cart[idx].quantity > 1) { cart[idx].quantity -= 1; } else { cart.splice(idx, 1); } syncCartState(); }));
        document.querySelectorAll('.remove-item-btn').forEach(btn => btn.addEventListener('click', (e) => { cart.splice(e.target.getAttribute('data-index'), 1); syncCartState(); }));
    }
    function syncCartState() { localStorage.setItem('debuk_cart', JSON.stringify(cart)); updateCartBadge(); displayCartPage(); }
    displayCartPage();

    // =========================================================================
    // 8. PAYMENT CHECKOUT PIPELINE VALIDATION AND HOOKS
    // =========================================================================
    const checkoutItemsList = document.getElementById('checkout-items-list');
    const paymentForm = document.getElementById('payment-form');
    const paymentViewGrid = document.getElementById('payment-layout-view');

    const cardNumInput = document.getElementById('card-num');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvcInput = document.getElementById('card-cvc');

    function displayPaymentPage() {
        if (!checkoutItemsList) return; 
        if (!currentUser) {
            if (paymentViewGrid) {
                paymentViewGrid.innerHTML = `<div class="empty-cart-message" style="grid-column: 1/-1;"><h2>Access Blocked</h2><p>Please establish a secure reader login session profile before processing payments.</p></div>`;
            }
            return;
        }

        checkoutItemsList.innerHTML = '';
        if (cart.length === 0) {
            checkoutItemsList.innerHTML = `<p class="no-results" style="padding:1rem 0; text-align:center; color:var(--text-muted);">No active book orders found in your tray.</p>`;
            const orderBtn = document.getElementById('place-order-btn'); if (orderBtn) { orderBtn.disabled = true; orderBtn.style.opacity = '0.4'; }
            return;
        }

        let checkoutSubtotal = 0;
        cart.forEach(item => {
            checkoutSubtotal += (item.price * item.quantity);
            const itemRow = document.createElement('div'); itemRow.className = 'checkout-mini-item';
            itemRow.innerHTML = `<img src="${item.img}" alt="${item.title}"><div class="mini-item-meta"><h4>${item.title}</h4><p>Qty: ${item.quantity}</p></div><span class="mini-item-price">$${(item.price * item.quantity).toFixed(2)}</span>`;
            checkoutItemsList.appendChild(itemRow);
        });
        document.getElementById('checkout-subtotal').textContent = `$${checkoutSubtotal.toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${checkoutSubtotal.toFixed(2)}`;
    }

    if (cardNumInput) {
        cardNumInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let matches = value.match(/\d{4,16}/g);
            let match = matches && matches[0] || '';
            let parts = [];
            for (let i=0, len=match.length; i<len; i+=4) { parts.push(match.substring(i, i+4)); }
            if (parts.length > 0) { e.target.value = parts.join(' '); } else { e.target.value = value.substring(0, 16); }
        });
    }

    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            if (value.length > 2) { e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4); } else { e.target.value = value; }
        });
    }

    if (cardCvcInput) {
        cardCvcInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/[^0-9]/gi, ''); });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const inputs = paymentForm.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('field-error');
                const existingHint = input.parentNode.querySelector('.error-hint'); if (existingHint) existingHint.remove();
            });

            let formIsValid = true;
            const throwFieldError = (element, message) => {
                element.classList.add('field-error'); formIsValid = false;
                const errorHint = document.createElement('span'); errorHint.className = 'error-hint'; errorHint.textContent = message;
                element.parentNode.appendChild(errorHint);
            };

            inputs.forEach(input => { if (!input.value.trim() && input.hasAttribute('required')) { throwFieldError(input, "This field cannot be left vacant."); } });

            const emailField = document.getElementById('bill-email');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) { throwFieldError(emailField, "Please provide a valid email reference address."); }
            }
            if (cardNumInput && cardNumInput.value.replace(/\s/g, '').length < 16) { throwFieldError(cardNumInput, "Card sequence requires exactly 16 processing digits."); }
            if (cardExpiryInput && cardExpiryInput.value.length < 5) { throwFieldError(cardExpiryInput, "Date signature requires MM/YY format mapping variables."); }
            if (cardCvcInput && cardCvcInput.value.length < 3) { throwFieldError(cardCvcInput, "Security CVC codes require a minimum parameter of 3 digits."); }

            if (!formIsValid) return;

            const currentItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            const currentRevenueAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            lifetimeSold += currentItemsCount; lifetimeRevenue += currentRevenueAmount;
            localStorage.setItem('debuk_total_sold', lifetimeSold);
            localStorage.setItem('debuk_total_revenue', lifetimeRevenue.toFixed(2));

            document.getElementById('receipt-qty').textContent = `${currentItemsCount} Books Built`;
            document.getElementById('receipt-cost').textContent = `$${currentRevenueAmount.toFixed(2)}`;

            cart = []; localStorage.setItem('debuk_cart', JSON.stringify(cart)); updateCartBadge();
            const successModal = document.getElementById('success-purchase-modal');
            if (successModal) successModal.classList.add('show-success');
        });
    }

    const successConfirmBtn = document.getElementById('btn-success-confirm');
    if (successConfirmBtn) {
        successConfirmBtn.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
    }

    displayPaymentPage();

    // =========================================================================
    // 9. CONTACT DESK PORTAL LOGIC
    // =========================================================================
    const contactForm = document.getElementById('contact-form-element');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); const clientName = document.getElementById('contact-name').value;
            alert(`Thank you, ${clientName}!\nYour message has been safely transmitted to Debuk Shop.`);
            contactForm.reset();
        });
    }

    // =========================================================================
    // 10. ADMINISTRATIVE INVENTORY MANAGEMENT ENGINE (MATCHED TO addbook.html)
    // =========================================================================
    const inventoryForm = document.getElementById('admin-add-book-form');
    const inventoryMainView = document.getElementById('inventory-main-view');

    if (inventoryMainView) {
        if (currentUser !== 'admin') {
            inventoryMainView.innerHTML = `
                <div class="empty-cart-message" style="grid-column: 1/-1; padding: 8rem 0; text-align:center;">
                    <h2>Access Prohibited</h2>
                    <p>Elevated credential permissions are required to append items to the active book index logs.</p>
                    <button class="btn-primary" onclick="document.getElementById('auth-nav-btn').click()" style="margin-top:1.5rem; border:1px solid #111; padding:0.75rem 2rem; background:#111; color:#fff; cursor:pointer;">Verify Administrative Session</button>
                </div>`;
            return;
        }
    }

    if (inventoryForm) {
        inventoryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = inventoryForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('field-error');
                const existingHint = input.parentNode.querySelector('.error-hint');
                if (existingHint) existingHint.remove();
            });

            let formIsValid = true;
            const throwFieldError = (element, message) => {
                element.classList.add('field-error');
                formIsValid = false;
                const errorHint = document.createElement('span');
                errorHint.className = 'error-hint';
                errorHint.textContent = message;
                element.parentNode.appendChild(errorHint);
            };

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    throwFieldError(input, "This inventory variable slot cannot be left vacant.");
                }
            });

            const priceField = document.getElementById('book-price');
            if (priceField && parseFloat(priceField.value) <= 0) {
                throwFieldError(priceField, "Please provide a valid processing retail value greater than 0.");
            }

            if (!formIsValid) return;

            const newBookItem = {
                id: Date.now(),
                title: document.getElementById('book-title').value.trim(),
                author: document.getElementById('book-author').value.trim(),
                genre: document.getElementById('book-genre').value,
                price: parseFloat(priceField.value),
                img: document.getElementById('book-image-url').value.trim(),
                desc: document.getElementById('book-description').value.trim()
            };

            let customStoredBooks = JSON.parse(localStorage.getItem('debuk_custom_books')) || [];
            customStoredBooks.push(newBookItem);
            localStorage.setItem('debuk_custom_books', JSON.stringify(customStoredBooks));

            alert(`Masterpiece Cataloged!\n"${newBookItem.title}" has been successfully pushed into the dynamic inventory data stream.`);
            
            inventoryForm.reset();
            window.location.href = 'catalogue.html';
        });
    }
});