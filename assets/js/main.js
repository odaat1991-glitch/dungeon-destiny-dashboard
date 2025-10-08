// Dungeon Destiny Dashboard - Main Application
// =============================================

class DungeonDestinyApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.saveSystem = null;
        this.initialized = false;
    }

    async init() {
        console.log('🎮 Initializing Dungeon Destiny Dashboard...');

        try {
            // Remove loading screen after short delay
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 1500);

            // Initialize save system
            if (typeof DungeonDestinySaveSystem !== 'undefined') {
                this.saveSystem = new DungeonDestinySaveSystem();
                await this.saveSystem.init();
            }

            // Setup navigation
            this.setupNavigation();

            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();

            // Load initial section
            this.showSection('dashboard');

            // Setup auto-save
            this.setupAutoSave();

            this.initialized = true;
            console.log('✅ Dashboard initialized successfully!');

        } catch (error) {
            console.error('❌ Failed to initialize dashboard:', error);
            this.showNotification('Failed to initialize dashboard: ' + error.message, 'error');
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                console.log(`🗺️ Navigating to section: ${section}`);
                this.showSection(section);

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Save shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        if (this.saveSystem) this.saveSystem.saveData();
                        break;
                    case 'o':
                        e.preventDefault();
                        if (this.saveSystem) this.saveSystem.loadData();
                        break;
                    case 'e':
                        e.preventDefault();
                        if (this.saveSystem) this.saveSystem.exportData();
                        break;
                }
            }
        });
    }

    setupAutoSave() {
        if (!this.saveSystem) return;
        
        // Auto-save every 60 seconds
        setInterval(() => {
            if (this.saveSystem && this.saveSystem.hasUnsavedChanges()) {
                this.saveSystem.saveData(true); // Silent save
                const autoSaveStatus = document.getElementById('autoSaveStatus');
                if (autoSaveStatus) {
                    autoSaveStatus.textContent = `Auto-saved: ${new Date().toLocaleTimeString()}`;
                }
            }
        }, 60000);
    }

    showSection(sectionName) {
        console.log(`📝 Showing section: ${sectionName}`);
        this.currentSection = sectionName;
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) {
            console.error('❌ Content area not found!');
            return;
        }

        // Add fade effect
        contentArea.style.opacity = '0';

        setTimeout(() => {
            try {
                switch(sectionName) {
                    case 'dashboard':
                        this.renderDashboard(contentArea);
                        break;
                    case 'tasks':
                        this.renderTaskManagement(contentArea);
                        break;
                    case 'character':
                        this.renderCharacterCreation(contentArea);
                        break;
                    case 'equipment':
                        this.renderEquipmentDatabase(contentArea);
                        break;
                    case 'timeline':
                        this.renderTimeline(contentArea);
                        break;
                    case 'playtesting':
                        this.renderPlaytesting(contentArea);
                        break;
                    case 'documentation':
                        this.renderDocumentation(contentArea);
                        break;
                    default:
                        contentArea.innerHTML = '<div class="fade-in"><h1>Section not found</h1></div>';
                }
            } catch (error) {
                console.error(`❌ Error rendering section ${sectionName}:`, error);
                contentArea.innerHTML = `<div class="fade-in"><h1>❌ Error loading ${sectionName}</h1><p>${error.message}</p></div>`;
            }

            contentArea.style.opacity = '1';
        }, 150);
    }

    renderDashboard(container) {
        if (typeof gameData === 'undefined') {
            container.innerHTML = '<div class="fade-in"><h1>❌ Game data not loaded</h1></div>';
            return;
        }

        const progress = gameData.project.progress;
        const totalTasks = gameData.tasks.length;
        const completedTasks = gameData.tasks.filter(t => t.status === 'Complete').length;
        const inProgressTasks = gameData.tasks.filter(t => t.status === 'In Progress').length;

        container.innerHTML = `
            <div class="fade-in">
                <header class="dashboard-header">
                    <h1>🎯 ${gameData.project.name}</h1>
                    <p class="project-subtitle">${gameData.project.phase}</p>
                    <p class="project-lead">Lead Developer: ${gameData.project.lead_developer}</p>
                </header>

                <div class="dashboard-grid">
                    <div class="card metric-card">
                        <div class="card-header">
                            <h3 class="card-title">📊 Project Progress</h3>
                        </div>
                        <div class="metric-value">${progress}%</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <p class="metric-subtitle">Overall completion</p>
                    </div>

                    <div class="card metric-card">
                        <div class="card-header">
                            <h3 class="card-title">✅ Tasks Complete</h3>
                        </div>
                        <div class="metric-value">${completedTasks}/${totalTasks}</div>
                        <p class="metric-subtitle">${inProgressTasks} in progress</p>
                    </div>

                    <div class="card metric-card">
                        <div class="card-header">
                            <h3 class="card-title">📅 Timeline</h3>
                        </div>
                        <div class="metric-value">${gameData.project.estimated_completion.split('-')[1]}/${gameData.project.estimated_completion.split('-')[2]}</div>
                        <p class="metric-subtitle">Target completion</p>
                    </div>

                    <div class="card metric-card">
                        <div class="card-header">
                            <h3 class="card-title">🎲 Game Elements</h3>
                        </div>
                        <div class="metric-value">${Object.keys(gameData.races).length + Object.keys(gameData.classes).length}</div>
                        <p class="metric-subtitle">${Object.keys(gameData.races).length} races, ${Object.keys(gameData.classes).length} classes</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🚀 Upcoming Milestones</h3>
                    </div>
                    <div class="milestones-list">
                        ${gameData.milestones.slice(0, 3).map(milestone => `
                            <div class="milestone-item">
                                <div class="milestone-icon ${milestone.priority.toLowerCase()}">
                                    ${milestone.priority === 'High' ? '🔥' : milestone.priority === 'Medium' ? '🔶' : '🔹'}
                                </div>
                                <div class="milestone-content">
                                    <h4>${milestone.name}</h4>
                                    <p>${milestone.description}</p>
                                    <span class="milestone-date">Due: ${new Date(milestone.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⚡ Quick Actions</h3>
                    </div>
                    <div class="quick-actions">
                        <button class="btn btn-primary" onclick="app.showSection('tasks')">
                            <span class="material-icons">task</span>
                            Manage Tasks
                        </button>
                        <button class="btn btn-secondary" onclick="app.showSection('character')">
                            <span class="material-icons">person</span>
                            Create Character
                        </button>
                        <button class="btn btn-success" onclick="app.saveSystem.exportData()">
                            <span class="material-icons">download</span>
                            Export Backup
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderTaskManagement(container) {
        console.log('📋 Rendering Task Management section...');
        
        container.innerHTML = `
            <div class="fade-in">
                <h1>📋 Task Management</h1>
                <p>Drag and drop tasks between columns to update their status.</p>
                <div id="taskBoard" class="task-board-container">
                    <div class="loading-message">🔄 Loading task board...</div>
                </div>
            </div>
        `;

        // Initialize the task manager with better error handling
        setTimeout(() => {
            const taskBoard = document.getElementById('taskBoard');
            if (!taskBoard) {
                console.error('❌ Task board container not found');
                return;
            }

            if (typeof window.taskManager !== 'undefined' && window.taskManager) {
                console.log('✅ Task manager found, initializing...');
                try {
                    window.taskManager.init(taskBoard);
                    console.log('✅ Task manager initialized successfully');
                } catch (error) {
                    console.error('❌ Task manager initialization failed:', error);
                    taskBoard.innerHTML = '<div class="error-message">❌ Task manager failed to load: ' + error.message + '</div>';
                }
            } else {
                console.error('❌ Task manager not found');
                taskBoard.innerHTML = '<div class="error-message">❌ Task manager not available. Please refresh the page.</div>';
            }
        }, 200);
    }

    renderCharacterCreation(container) {
        if (typeof gameData === 'undefined') {
            container.innerHTML = '<div class="fade-in"><h1>❌ Game data not loaded</h1></div>';
            return;
        }

        container.innerHTML = `
            <div class="fade-in">
                <h1>🧙‍♂️ Character Creation</h1>
                <p>Create and test characters using the Dungeon Destiny system.</p>
                <div class="character-creator-container">
                    <div class="race-selection">
                        <h3>Choose Your Race</h3>
                        <div class="race-grid">
                            ${Object.entries(gameData.races).map(([raceName, race]) => `
                                <div class="race-card">
                                    <h4>${raceName}</h4>
                                    <p>${race.description}</p>
                                    <div class="traits">
                                        ${race.traits.map(trait => `<span class="trait-tag">${trait}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="class-selection">
                        <h3>Choose Your Class</h3>
                        <div class="class-grid">
                            ${Object.entries(gameData.classes).map(([className, classData]) => `
                                <div class="class-card">
                                    <h4>${className}</h4>
                                    <p class="class-role">${classData.role}</p>
                                    <p>${classData.description}</p>
                                    <div class="abilities">
                                        ${classData.special_abilities.map(ability => `<span class="ability-tag">${ability}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderEquipmentDatabase(container) {
        if (typeof gameData === 'undefined') {
            container.innerHTML = '<div class="fade-in"><h1>❌ Game data not loaded</h1></div>';
            return;
        }

        container.innerHTML = `
            <div class="fade-in">
                <h1>⚔️ Equipment Database</h1>
                <p>Browse and manage weapons, armor, and items.</p>
                <div class="equipment-tabs">
                    <button class="tab-btn active" data-tab="weapons">Weapons</button>
                    <button class="tab-btn" data-tab="armor">Armor</button>
                </div>
                <div class="equipment-content">
                    <div id="weapons" class="tab-content active">
                        <div class="equipment-grid">
                            ${gameData.weapons.map(weapon => `
                                <div class="equipment-card">
                                    <h4>${weapon.name}</h4>
                                    <p><strong>Damage:</strong> ${weapon.damage}</p>
                                    <p><strong>Type:</strong> ${weapon.type}</p>
                                    <div class="properties">
                                        ${weapon.properties.map(prop => `<span class="property-tag">${prop}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div id="armor" class="tab-content">
                        <div class="equipment-grid">
                            ${gameData.armor.map(armor => `
                                <div class="equipment-card">
                                    <h4>${armor.name}</h4>
                                    <p><strong>AC:</strong> ${armor.ac}</p>
                                    <p><strong>Type:</strong> ${armor.type}</p>
                                    <p><strong>Stealth:</strong> ${armor.stealth}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Setup tab switching
        const tabBtns = container.querySelectorAll('.tab-btn');
        const tabContents = container.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const targetTab = container.querySelector(`#${tabName}`);
                if (targetTab) targetTab.classList.add('active');
            });
        });
    }

    renderTimeline(container) {
        if (typeof gameData === 'undefined') {
            container.innerHTML = '<div class="fade-in"><h1>❌ Game data not loaded</h1></div>';
            return;
        }

        container.innerHTML = `
            <div class="fade-in">
                <h1>📅 Development Timeline</h1>
                <p>Track milestones and project deadlines.</p>
                <div id="timelineView" class="timeline-view">
                    <div class="timeline-container">
                        ${gameData.milestones.map((milestone, index) => `
                            <div class="timeline-item">
                                <div class="timeline-marker ${milestone.priority.toLowerCase()}"></div>
                                <div class="timeline-content">
                                    <h3>${milestone.name}</h3>
                                    <p>${milestone.description}</p>
                                    <span class="timeline-date">${new Date(milestone.date).toLocaleDateString()}</span>
                                    <span class="timeline-priority priority-${milestone.priority.toLowerCase()}">${milestone.priority} Priority</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderPlaytesting(container) {
        if (typeof gameData === 'undefined') {
            container.innerHTML = '<div class="fade-in"><h1>❌ Game data not loaded</h1></div>';
            return;
        }

        container.innerHTML = `
            <div class="fade-in">
                <h1>🎲 Playtesting Tracker</h1>
                <p>Record test sessions, feedback, and issues.</p>
                <div id="playtestingTracker" class="playtesting-tracker">
                    <div class="playtesting-stats">
                        <div class="stat-card">
                            <h3>Test Sessions</h3>
                            <div class="stat-value">${gameData.playtests.length}</div>
                        </div>
                        <div class="stat-card">
                            <h3>Issues Found</h3>
                            <div class="stat-value">${gameData.playtests.reduce((acc, test) => acc + test.issues.length, 0)}</div>
                        </div>
                        <div class="stat-card">
                            <h3>Issues Resolved</h3>
                            <div class="stat-value">5</div>
                        </div>
                    </div>
                    <div class="playtesting-log">
                        <h3>Recent Sessions</h3>
                        ${gameData.playtests.map(test => `
                            <div class="session-item">
                                <div class="session-date">${new Date(test.date).toLocaleDateString()}</div>
                                <div class="session-details">
                                    <h4>${test.scenario}</h4>
                                    <p>${test.feedback}</p>
                                    <div class="session-meta">
                                        <span>Duration: ${test.duration}</span>
                                        <span>Participants: ${test.participants.join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderDocumentation(container) {
        container.innerHTML = `
            <div class="fade-in">
                <h1>📚 Documentation Hub</h1>
                <p>Access player handbooks, GM guides, and development docs.</p>
                <div id="documentationHub" class="documentation-hub">
                    <div class="doc-categories">
                        <div class="doc-category">
                            <h3>📖 Player Resources</h3>
                            <ul class="doc-list">
                                <li><a href="#" onclick="alert('Document not yet available')">Player Handbook</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Quick Start Guide</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Character Sheet</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Rules Reference</a></li>
                            </ul>
                        </div>
                        <div class="doc-category">
                            <h3>🎭 GM Resources</h3>
                            <ul class="doc-list">
                                <li><a href="#" onclick="alert('Document not yet available')">GM Guide</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Monster Manual</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Adventure Templates</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Session Tools</a></li>
                            </ul>
                        </div>
                        <div class="doc-category">
                            <h3>🔧 Development</h3>
                            <ul class="doc-list">
                                <li><a href="#" onclick="alert('Document not yet available')">Design Document</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">API Reference</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Changelog</a></li>
                                <li><a href="#" onclick="alert('Document not yet available')">Contributing Guide</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="material-icons">${this.getNotificationIcon(type)}</span>
                <span>${message}</span>
            </div>
        `;

        container.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (container.contains(notification)) {
                    container.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check_circle';
            case 'warning': return 'warning';
            case 'error': return 'error';
            case 'info': 
            default: return 'info';
        }
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏁 DOM Content Loaded - Starting app initialization');
    app = new DungeonDestinyApp();
    app.init();
});

// Export for global access
window.app = app;