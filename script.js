/* ═══════════════════════════════════════════
   StockFlow — Web Frontend
   Communicates with the C HTTP server via fetch()
   ═══════════════════════════════════════════ */

// ── DOM References ──
const $ = (id) => document.getElementById(id);

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initModals();
    initSearch();
    initClock();
    refreshAll();
});

// ══════════════════════════════════════
//  API LAYER — talks to C server
// ══════════════════════════════════════

async function api(path, options = {}) {
    try {
        const res = await fetch(`/api${path}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        return await res.json();
    } catch (err) {
        console.error('API Error:', err);
        showToast('error', 'Erreur de connexion au serveur C');
        return null;
    }
}

async function fetchProducts() {
    return (await api('/products')) || [];
}

async function fetchSuppliers() {
    return (await api('/suppliers')) || [];
}

async function fetchStats() {
    return (await api('/stats')) || { totalProducts: 0, totalSuppliers: 0, totalAlerts: 0, totalValue: 0 };
}

async function fetchAlerts() {
    return (await api('/products/alerts')) || [];
}

async function searchProducts(q) {
    return (await api(`/products/search?q=${encodeURIComponent(q)}`)) || [];
}

async function fetchPersonnel() {
    return (await api('/personnel')) || [];
}



// ══════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });

    const menuBtn = $('menu-toggle-btn');
    const sidebar = $('sidebar');
    const closeBtn = $('sidebar-close-btn');

    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        getOrCreateOverlay().classList.add('active');
    });

    closeBtn.addEventListener('click', closeSidebar);
}

function navigateTo(page) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const activePage = $(`page-${page}`);
    if (activePage) {
        activePage.classList.remove('active');
        void activePage.offsetWidth;
        activePage.classList.add('active');
    }

    const names = {
        dashboard: 'Tableau de Bord',
        produits: 'Produits',
        fournisseurs: 'Fournisseurs',
        personnel: 'Utilisateurs',
        alertes: 'Alertes Stock',
        guide: 'Comment ça marche'
    };
    $('breadcrumb-page').textContent = names[page] || page;
    closeSidebar();
}

function closeSidebar() {
    $('sidebar').classList.remove('open');
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('active');
}

function getOrCreateOverlay() {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeSidebar);
    }
    return overlay;
}

// ══════════════════════════════════════
//  CLOCK
// ══════════════════════════════════════

function initClock() {
    function updateTime() {
        const now = new Date();
        const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        $('topbar-time').textContent = now.toLocaleTimeString('fr-FR', opts);
    }
    updateTime();
    setInterval(updateTime, 1000);
}

// ══════════════════════════════════════
//  MODALS
// ══════════════════════════════════════

function initModals() {
    $('btn-add-product').addEventListener('click', () => openProductModal());
    $('product-modal-close').addEventListener('click', closeProductModal);
    $('product-cancel-btn').addEventListener('click', closeProductModal);
    $('product-modal-overlay').addEventListener('click', (e) => {
        if (e.target === $('product-modal-overlay')) closeProductModal();
    });
    $('product-form').addEventListener('submit', handleProductSubmit);

    $('btn-add-supplier').addEventListener('click', () => openSupplierModal());
    $('supplier-modal-close').addEventListener('click', closeSupplierModal);
    $('supplier-cancel-btn').addEventListener('click', closeSupplierModal);
    $('supplier-modal-overlay').addEventListener('click', (e) => {
        if (e.target === $('supplier-modal-overlay')) closeSupplierModal();
    });
    $('supplier-form').addEventListener('submit', handleSupplierSubmit);

    $('delete-modal-close').addEventListener('click', closeDeleteModal);
    $('delete-cancel-btn').addEventListener('click', closeDeleteModal);
    $('delete-modal-overlay').addEventListener('click', (e) => {
        if (e.target === $('delete-modal-overlay')) closeDeleteModal();
    });

    $('btn-add-personnel').addEventListener('click', () => openPersonnelModal());
    $('personnel-modal-close').addEventListener('click', closePersonnelModal);
    $('personnel-cancel-btn').addEventListener('click', closePersonnelModal);
    $('personnel-modal-overlay').addEventListener('click', (e) => {
        if (e.target === $('personnel-modal-overlay')) closePersonnelModal();
    });
    $('personnel-form').addEventListener('submit', handlePersonnelSubmit);
}

async function openProductModal(editId = null) {
    const overlay = $('product-modal-overlay');
    const form = $('product-form');
    form.reset();
    $('product-edit-id').value = '';

    // Populate supplier dropdown from C server
    const suppliers = await fetchSuppliers();
    const select = $('product-supplier');
    select.innerHTML = '<option value="">-- Sélectionner --</option>';
    suppliers.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = `${f.nom} (ID: ${f.id})`;
        select.appendChild(opt);
    });

    if (editId !== null) {
        const products = await fetchProducts();
        const prod = products.find(p => p.id === editId);
        if (prod) {
            $('product-modal-title').innerHTML = '<i class="ph ph-pencil-simple"></i> Modifier Produit';
            $('product-submit-btn').innerHTML = '<i class="ph ph-check"></i> Enregistrer';
            $('product-edit-id').value = prod.id;
            $('product-name').value = prod.nom;
            $('product-category').value = prod.cat;
            $('product-price').value = prod.prix;
            $('product-quantity').value = prod.qte;
            $('product-threshold').value = prod.seuil;
            $('product-supplier').value = prod.id_fourn;
        }
    } else {
        $('product-modal-title').innerHTML = '<i class="ph ph-package"></i> Nouveau Produit';
        $('product-submit-btn').innerHTML = '<i class="ph ph-check"></i> Ajouter';
    }

    overlay.classList.add('active');
}

function closeProductModal() {
    $('product-modal-overlay').classList.remove('active');
}

function openSupplierModal() {
    $('supplier-modal-overlay').classList.add('active');
    $('supplier-form').reset();
    $('supplier-modal-title').innerHTML = '<i class="ph ph-truck"></i> Nouveau Fournisseur';
}

function closeSupplierModal() {
    $('supplier-modal-overlay').classList.remove('active');
}

function openPersonnelModal() {
    $('personnel-modal-overlay').classList.add('active');
    $('personnel-form').reset();
}

function closePersonnelModal() {
    $('personnel-modal-overlay').classList.remove('active');
}

function openDeleteModal(message, onConfirm) {
    $('delete-message').textContent = message;
    $('delete-modal-overlay').classList.add('active');
    const btn = $('delete-confirm-btn');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
        onConfirm();
        closeDeleteModal();
    });
}

function closeDeleteModal() {
    $('delete-modal-overlay').classList.remove('active');
}

// ══════════════════════════════════════
//  FOURNISSEUR CRUD → calls C server
// ══════════════════════════════════════

async function handleSupplierSubmit(e) {
    e.preventDefault();
    const nom = $('supplier-name').value.trim();
    const tel = $('supplier-phone').value.trim();
    const adr = $('supplier-address').value.trim();

    if (!nom || !tel || !adr) return;

    const result = await api('/suppliers', {
        method: 'POST',
        body: JSON.stringify({ nom, tel, adr })
    });

    if (result && result.success) {
        closeSupplierModal();
        refreshAll();
        showToast('success', `Fournisseur « ${nom} » ajouté avec succès`);
    } else {
        showToast('error', result?.message || 'Erreur lors de l\'ajout');
    }
}

async function deleteSupplier(id) {
    const suppliers = await fetchSuppliers();
    const f = suppliers.find(s => s.id === id);
    if (!f) return;

    openDeleteModal(
        `Supprimer le fournisseur « ${f.nom} » (ID: ${f.id}) ? Cette action est irréversible.`,
        async () => {
            const result = await api(`/suppliers?id=${id}`, { method: 'DELETE' });
            if (result && result.success) {
                refreshAll();
                showToast('success', `Fournisseur « ${f.nom} » supprimé`);
            }
        }
    );
}

// ══════════════════════════════════════
//  PRODUIT CRUD → calls C server
// ══════════════════════════════════════

async function handleProductSubmit(e) {
    e.preventDefault();
    const editId = $('product-edit-id').value;
    const nom = $('product-name').value.trim();
    const cat = $('product-category').value.trim();
    const prix = parseFloat($('product-price').value);
    const qte = parseInt($('product-quantity').value);
    const seuil = parseInt($('product-threshold').value);
    const id_fourn = parseInt($('product-supplier').value);

    if (!nom || !cat || isNaN(prix) || isNaN(qte) || isNaN(seuil) || isNaN(id_fourn)) {
        showToast('error', 'Veuillez remplir tous les champs correctement');
        return;
    }

    let result;
    if (editId) {
        // modifier_prod via PUT
        result = await api('/products', {
            method: 'PUT',
            body: JSON.stringify({ id: parseInt(editId), nom, cat, prix, qte, seuil, id_fourn })
        });
        if (result && result.success) {
            showToast('success', `Produit « ${nom} » modifié avec succès`);
        }
    } else {
        // creer_prod + ajouter_prod via POST
        result = await api('/products', {
            method: 'POST',
            body: JSON.stringify({ nom, cat, prix, qte, seuil, id_fourn })
        });
        if (result && result.success) {
            showToast('success', `Produit « ${nom} » ajouté avec succès`);
        }
    }

    if (result && !result.success) {
        showToast('error', result.message || 'Erreur');
    }

    closeProductModal();
    refreshAll();
}

async function deleteProduct(id) {
    const products = await fetchProducts();
    const p = products.find(pr => pr.id === id);
    if (!p) return;

    openDeleteModal(
        `Supprimer le produit « ${p.nom} » (ID: ${p.id}) ? Cette action est irréversible.`,
        async () => {
            const result = await api(`/products?id=${id}`, { method: 'DELETE' });
            if (result && result.success) {
                refreshAll();
                showToast('success', `Produit « ${p.nom} » supprimé`);
            }
        }
    );
}

// ══════════════════════════════════════
//  PERSONNEL CRUD → calls C server
// ══════════════════════════════════════

async function handlePersonnelSubmit(e) {
    e.preventDefault();
    const nom = $('personnel-name').value.trim();
    const role = $('personnel-role').value.trim();
    const email = $('personnel-email').value.trim();

    if (!nom || !role || !email) return;

    const result = await api('/personnel', {
        method: 'POST',
        body: JSON.stringify({ nom, role, email })
    });

    if (result && result.success) {
        closePersonnelModal();
        refreshAll();
        showToast('success', `Utilisateur « ${nom} » ajouté`);
    } else {
        showToast('error', 'Erreur lors de l\'ajout');
    }
}

async function deletePersonnel(id) {
    const staff = await fetchPersonnel();
    const u = staff.find(x => x.id === id);
    if (!u) return;

    openDeleteModal(
        `Supprimer l'utilisateur « ${u.nom} » ?`,
        async () => {
            const result = await api(`/personnel?id=${id}`, { method: 'DELETE' });
            if (result && result.success) {
                refreshAll();
                showToast('success', `Utilisateur supprimé`);
            }
        }
    );
}


// ══════════════════════════════════════
//  SEARCH → calls C server
// ══════════════════════════════════════

function initSearch() {
    let searchTimeout;
    $('product-search-input').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => renderProductsTable(e.target.value.trim()), 200);
    });

    $('global-search-input').addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 0) {
            navigateTo('produits');
            $('product-search-input').value = query;
            renderProductsTable(query);
        }
    });
}

// ══════════════════════════════════════
//  RENDERING — fetches data from C server
// ══════════════════════════════════════
async function refreshAll() {
    await Promise.all([
        renderDashboard(),
        renderProductsTable(),
        renderSuppliersTable(),
        renderPersonnelTable(),
        renderAlerts(),
        updateBadges()
    ]);
}

async function updateBadges() {
    const stats = await fetchStats();
    $('product-count-badge').textContent = stats.totalProducts;
    $('supplier-count-badge').textContent = stats.totalSuppliers;
    $('alert-count-badge').textContent = stats.totalAlerts;
    if (stats.totalAlerts > 0) {
        $('alert-count-badge').classList.add('badge-danger');
    } else {
        $('alert-count-badge').classList.remove('badge-danger');
    }
}

async function renderDashboard() {
    const stats = await fetchStats();
    $('stat-total-products').textContent = stats.totalProducts;
    $('stat-total-suppliers').textContent = stats.totalSuppliers;
    $('stat-total-alerts').textContent = stats.totalAlerts;
    $('stat-total-value').textContent = formatPrice(stats.totalValue);

    // Recent products (last 5)
    const products = await fetchProducts();
    const recentBody = $('dashboard-recent-body');
    const recent = [...products].reverse().slice(0, 5);

    if (recent.length === 0) {
        recentBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="5">
                    <div class="empty-state-mini">
                        <i class="ph ph-package"></i>
                        <span>Aucun produit ajouté</span>
                    </div>
                </td>
            </tr>`;
    } else {
        recentBody.innerHTML = recent.map(p => `
            <tr>
                <td>#${p.id}</td>
                <td class="product-name-cell">${escapeHtml(p.nom)}</td>
                <td><span class="category-chip">${escapeHtml(p.cat)}</span></td>
                <td>${p.qte}</td>
                <td class="price-cell">${formatPrice(p.prix)} DA</td>
            </tr>
        `).join('');
    }

    // Dashboard alerts
    const alerts = await fetchAlerts();
    const alertsList = $('dashboard-alerts-list');
    if (alerts.length === 0) {
        alertsList.innerHTML = `
            <div class="empty-state-mini">
                <i class="ph ph-check-circle"></i>
                <span>Aucune alerte — stocks suffisants</span>
            </div>`;
    } else {
        alertsList.innerHTML = alerts.map(p => `
            <div class="alert-item">
                <div class="alert-dot"></div>
                <div class="alert-info">
                    <strong>${escapeHtml(p.nom)}</strong>
                    <span>Seuil: ${p.seuil}</span>
                </div>
                <span class="alert-stock">Stock: ${p.qte}</span>
            </div>
        `).join('');
    }
}

async function renderProductsTable(searchQuery = '') {
    const body = $('products-body');
    let items;

    if (searchQuery) {
        items = await searchProducts(searchQuery);
    } else {
        items = await fetchProducts();
    }

    const suppliers = await fetchSuppliers();

    if (items.length === 0) {
        const msg = searchQuery ? 'Aucun résultat pour cette recherche' : 'Aucun produit';
        const sub = searchQuery ? 'Essayez un autre terme' : 'Commencez par ajouter votre premier produit';
        body.innerHTML = `
            <tr class="empty-row">
                <td colspan="9">
                    <div class="empty-state">
                        <i class="ph ph-${searchQuery ? 'magnifying-glass' : 'package'}"></i>
                        <h3>${msg}</h3>
                        <p>${sub}</p>
                        ${!searchQuery ? `<button class="btn btn-primary btn-sm" onclick="openProductModal()">
                            <i class="ph ph-plus"></i> Ajouter un produit
                        </button>` : ''}
                    </div>
                </td>
            </tr>`;
        return;
    }

    body.innerHTML = items.map(p => {
        const fourn = suppliers.find(f => f.id === p.id_fourn);
        const isAlert = p.qte <= p.seuil;
        const statusClass = isAlert ? 'status-alert' : 'status-ok';
        const statusText = isAlert ? '⚠ Alerte' : '✓ OK';

        return `
            <tr>
                <td>#${p.id}</td>
                <td class="product-name-cell">${escapeHtml(p.nom)}</td>
                <td><span class="category-chip">${escapeHtml(p.cat)}</span></td>
                <td>${p.qte}</td>
                <td class="price-cell">${formatPrice(p.prix)} DA</td>
                <td>${p.seuil}</td>
                <td>${fourn ? escapeHtml(fourn.nom) : `<span style="color:var(--text-muted)">ID: ${p.id_fourn}</span>`}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-icon edit" onclick="openProductModal(${p.id})" title="Modifier">
                            <i class="ph ph-pencil-simple"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteProduct(${p.id})" title="Supprimer">
                            <i class="ph ph-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function renderSuppliersTable() {
    const body = $('suppliers-body');
    const suppliers = await fetchSuppliers();
    const products = await fetchProducts();

    if (suppliers.length === 0) {
        body.innerHTML = `
            <tr class="empty-row">
                <td colspan="6">
                    <div class="empty-state">
                        <i class="ph ph-truck"></i>
                        <h3>Aucun fournisseur</h3>
                        <p>Commencez par ajouter votre premier fournisseur</p>
                        <button class="btn btn-primary btn-sm" onclick="openSupplierModal()">
                            <i class="ph ph-plus"></i> Ajouter un fournisseur
                        </button>
                    </div>
                </td>
            </tr>`;
        return;
    }

    body.innerHTML = suppliers.map(f => {
        const productCount = products.filter(p => p.id_fourn === f.id).length;
        return `
            <tr>
                <td>#${f.id}</td>
                <td class="product-name-cell">${escapeHtml(f.nom)}</td>
                <td>${escapeHtml(f.tel)}</td>
                <td>${escapeHtml(f.adr)}</td>
                <td><span class="supplier-product-count">${productCount}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-icon delete" onclick="deleteSupplier(${f.id})" title="Supprimer">
                            <i class="ph ph-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function renderPersonnelTable() {
    const body = $('personnel-body');
    const staff = await fetchPersonnel();

    if (staff.length === 0) {
        body.innerHTML = '<tr><td colspan="5" class="text-center">Aucun utilisateur trouvé</td></tr>';
        return;
    }

    body.innerHTML = staff.map(u => `
        <tr>
            <td>#${u.id}</td>
            <td class="product-name-cell">${escapeHtml(u.nom)}</td>
            <td><span class="category-chip">${escapeHtml(u.role)}</span></td>
            <td>${escapeHtml(u.email)}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon delete" onclick="deletePersonnel(${u.id})" title="Supprimer">
                        <i class="ph ph-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}



async function renderAlerts() {
    const container = $('alerts-full-list');
    const alerts = await fetchAlerts();
    const suppliers = await fetchSuppliers();

    if (alerts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="ph ph-check-circle"></i>
                <h3>Tout va bien !</h3>
                <p>Aucun produit n'est en dessous du seuil d'alerte</p>
            </div>`;
        return;
    }

    container.innerHTML = alerts.map(p => {
        const fourn = suppliers.find(f => f.id === p.id_fourn);
        return `
            <div class="alert-item">
                <div class="alert-dot"></div>
                <div class="alert-info">
                    <strong>${escapeHtml(p.nom)}</strong>
                    <span>Catégorie: ${escapeHtml(p.cat)} · Fournisseur: ${fourn ? escapeHtml(fourn.nom) : 'ID ' + p.id_fourn} · Seuil: ${p.seuil}</span>
                </div>
                <span class="alert-stock">Stock: ${p.qte}/${p.seuil}</span>
            </div>
        `;
    }).join('');
}

// ══════════════════════════════════════
//  TOASTS
// ══════════════════════════════════════

function showToast(type, message) {
    const container = $('toast-container');
    const icons = {
        success: 'ph-fill ph-check-circle',
        error: 'ph-fill ph-x-circle',
        warning: 'ph-fill ph-warning',
        info: 'ph-fill ph-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="toast-icon ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ══════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════

function formatPrice(num) {
    return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
