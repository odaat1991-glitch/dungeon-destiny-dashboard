// Equipment Database System
// ==========================

class EquipmentDatabase {
    constructor() {
        this.currentFilter = 'all';
        this.searchTerm = '';
    }

    init(container) {
        this.renderEquipmentDatabase(container);
    }

    renderEquipmentDatabase(container) {
        container.innerHTML = `
            <div class="equipment-controls">
                <div class="search-bar">
                    <input type="text" id="equipmentSearch" placeholder="Search weapons and armor..." 
                           oninput="equipmentDatabase.handleSearch(event)">
                </div>
                <div class="filter-buttons">
                    <button class="filter-btn active" onclick="equipmentDatabase.setFilter('all')">All</button>
                    <button class="filter-btn" onclick="equipmentDatabase.setFilter('weapons')">Weapons</button>
                    <button class="filter-btn" onclick="equipmentDatabase.setFilter('armor')">Armor</button>
                </div>
            </div>

            <div class="equipment-grid" id="equipmentGrid">
                ${this.renderEquipmentItems()}
            </div>
        `;

        this.addEquipmentStyles();
    }

    renderEquipmentItems() {
        const filteredWeapons = this.getFilteredWeapons();
        const filteredArmor = this.getFilteredArmor();

        let html = '';

        if (this.currentFilter === 'all' || this.currentFilter === 'weapons') {
            if (filteredWeapons.length > 0) {
                html += '<h3>Weapons</h3>';
                html += filteredWeapons.map(weapon => this.renderWeaponCard(weapon)).join('');
            }
        }

        if (this.currentFilter === 'all' || this.currentFilter === 'armor') {
            if (filteredArmor.length > 0) {
                html += '<h3>Armor & Shields</h3>';
                html += filteredArmor.map(armor => this.renderArmorCard(armor)).join('');
            }
        }

        return html || '<p class="no-results">No equipment found matching your criteria.</p>';
    }

    getFilteredWeapons() {
        return gameData.weapons.filter(weapon => 
            weapon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            weapon.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            weapon.properties.some(prop => prop.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
    }

    getFilteredArmor() {
        return gameData.armor.filter(armor => 
            armor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            armor.type.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    renderWeaponCard(weapon) {
        return `
            <div class="equipment-card weapon-card">
                <div class="card-header">
                    <h4>${weapon.name}</h4>
                    <span class="damage-badge">${weapon.damage}</span>
                </div>
                <div class="card-content">
                    <p><strong>Damage Type:</strong> ${weapon.type}</p>
                    <div class="properties">
                        <strong>Properties:</strong>
                        ${weapon.properties.map(prop => 
                            `<span class="property-badge">${prop}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderArmorCard(armor) {
        return `
            <div class="equipment-card armor-card">
                <div class="card-header">
                    <h4>${armor.name}</h4>
                    <span class="ac-badge">AC ${armor.ac}</span>
                </div>
                <div class="card-content">
                    <p><strong>Type:</strong> ${armor.type}</p>
                    <p><strong>Stealth:</strong> ${armor.stealth}</p>
                </div>
            </div>
        `;
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.refreshGrid();
    }

    setFilter(filter) {
        this.currentFilter = filter;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        this.refreshGrid();
    }

    refreshGrid() {
        const grid = document.getElementById('equipmentGrid');
        if (grid) {
            grid.innerHTML = this.renderEquipmentItems();
        }
    }

    addEquipmentStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .equipment-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .search-bar {
                flex: 1;
                min-width: 300px;
            }

            .search-bar input {
                width: 100%;
                padding: 0.75rem;
                background: var(--tertiary-bg);
                border: 1px solid var(--border);
                border-radius: 8px;
                color: var(--primary-text);
                font-size: 0.875rem;
            }

            .filter-buttons {
                display: flex;
                gap: 0.5rem;
            }

            .filter-btn {
                padding: 0.5rem 1rem;
                background: var(--tertiary-bg);
                border: 1px solid var(--border);
                border-radius: 6px;
                color: var(--secondary-text);
                cursor: pointer;
                transition: all var(--transition-fast);
            }

            .filter-btn:hover {
                background: var(--primary-purple);
                color: white;
            }

            .filter-btn.active {
                background: var(--primary-purple);
                color: white;
            }

            .equipment-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
            }

            .equipment-grid h3 {
                grid-column: 1 / -1;
                color: var(--accent-text);
                border-bottom: 2px solid var(--primary-purple);
                padding-bottom: 0.5rem;
                margin: 1rem 0;
            }

            .equipment-card {
                background: var(--secondary-bg);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 1.5rem;
                transition: all var(--transition-fast);
            }

            .equipment-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 24px var(--shadow);
            }

            .weapon-card {
                border-left: 4px solid var(--error);
            }

            .armor-card {
                border-left: 4px solid var(--info);
            }

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            .card-header h4 {
                margin: 0;
                color: var(--accent-text);
            }

            .damage-badge, .ac-badge {
                background: var(--primary-purple);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
            }

            .card-content p {
                margin: 0.5rem 0;
                color: var(--secondary-text);
            }

            .properties {
                margin-top: 1rem;
            }

            .property-badge {
                display: inline-block;
                background: var(--tertiary-bg);
                color: var(--primary-text);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                margin: 0.25rem 0.25rem 0.25rem 0;
            }

            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                color: var(--muted-text);
                padding: 2rem;
                font-style: italic;
            }

            @media (max-width: 768px) {
                .equipment-controls {
                    flex-direction: column;
                    align-items: stretch;
                }

                .search-bar {
                    min-width: auto;
                }

                .equipment-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;

        if (!document.getElementById('equipment-database-styles')) {
            style.id = 'equipment-database-styles';
            document.head.appendChild(style);
        }
    }
}

// Create global instance
const equipmentDatabase = new EquipmentDatabase();
window.equipmentDatabase = equipmentDatabase;