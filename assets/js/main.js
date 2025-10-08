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
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                }, 500);
            }, 1500);

            // Initialize save system
            this.saveSystem = new DungeonDestinySaveSystem();
            await this.saveSystem.init();

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
                        this.saveSystem.saveData();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.saveSystem.loadData();
                        break;
                    case 'e':
                        e.preventDefault();
                        this.saveSystem.exportData();
                        break;
                }
            }

            // Section navigation shortcuts
            if (e.altKey) {
                const sectionMap = {
                    '1': 'dashboard',
                    '2': 'tasks',
                    '3': 'character',
                    '4': 'equipment',
                    '5': 'timeline',
                    '6': 'playtesting',
                    '7': 'documentation'
                };

                if (sectionMap[e.key]) {
                    e.preventDefault();
                    this.showSection(sectionMap[e.key]);
                }
            }
        });
    }

    setupAutoSave() {
        // Auto-save every 60 seconds
        setInterval(() => {
            if (this.saveSystem && this.saveSystem.hasUnsavedChanges()) {
                this.saveSystem.saveData(true); // Silent save
                document.getElementById('autoSaveStatus').textContent = 
                    `Auto-saved: ${new Date().toLocaleTimeString()}`;
            }
        }, 60000);
    }

    showSection(sectionName) {
        this.currentSection = sectionName;
        const contentArea = document.getElementById('contentArea');

        // Add fade effect
        contentArea.style.opacity = '0';

        setTimeout(() => {
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
                    contentArea.innerHTML = '<h1>Section not found</h1>';
            }

            contentArea.style.opacity = '1';
        }, 150);
    }

    renderDashboard(container) {
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

        // Add dashboard-specific styles
        this.addDashboardStyles();
    }

    addDashboardStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .dashboard-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .dashboard-header h1 {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                background: linear-gradient(45deg, var(--primary-purple), var(--primary-gold));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .project-subtitle {
                font-size: 1.2rem;
                color: var(--secondary-text);
                margin-bottom: 0.25rem;
            }

            .project-lead {
                color: var(--muted-text);
                font-size: 0.9rem;
            }

            .dashboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .metric-card {
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .metric-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-purple), var(--primary-gold));
            }

            .metric-value {
                font-size: 2.5rem;
                font-weight: bold;
                color: var(--accent-text);
                margin: 1rem 0;
            }

            .metric-subtitle {
                color: var(--muted-text);
                font-size: 0.875rem;
            }

            .milestones-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .milestone-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: var(--tertiary-bg);
                border-radius: 8px;
                border-left: 4px solid var(--primary-purple);
            }

            .milestone-icon {
                font-size: 1.5rem;
            }

            .milestone-content h4 {
                color: var(--accent-text);
                margin-bottom: 0.25rem;
            }

            .milestone-content p {
                color: var(--secondary-text);
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
            }

            .milestone-date {
                color: var(--muted-text);
                font-size: 0.75rem;
                font-weight: 500;
            }

            .quick-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                justify-content: center;
            }

            @media (max-width: 768px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }

                .quick-actions {
                    flex-direction: column;
                }
            }
        `;

        if (!document.getElementById('dashboard-styles')) {
            style.id = 'dashboard-styles';
            document.head.appendChild(style);
        }
    }

    renderTaskManagement(container) {
        container.innerHTML = `
            <div class="fade-in">
                <h1>📋 Task Management</h1>
                <p>Drag and drop tasks between columns to update their status.</p>
                <div id="taskBoard" class="task-board">
                    <!-- Task board will be rendered here -->
                </div>
            </div>
        `;

        // Initialize the actual task manager
        const taskBoard = document.getElementById('taskBoard');
        if (window.taskManager && taskBoard) {
            taskManager.init(taskBoard);
        }
    }

    renderCharacterCreation(container) {
        container.innerHTML = `
            <div class="fade-in">
                <h1>🧙‍♂️ Character Creation</h1>
                <p>Create and test characters using the Dungeon Destiny system.</p>
                <div id="characterCreator" class="character-creator">
                    <!-- Character creator will be rendered here -->
                </div>
            </div>
        `;

        // Initialize character creator if available
        const creatorContainer = document.getElementById('characterCreator');
        if (window.characterCreator && creatorContainer) {
            characterCreator.init(creatorContainer);
        }
    }

    renderEquipmentDatabase(container) {
        container.innerHTML = `
            <div class="fade-in">
                <h1>⚔️ Equipment Database</h1>
                <p>Browse and manage weapons, armor, and items.</p>
                <div id="equipmentDatabase" class="equipment-database">
                    <!-- Equipment database will be rendered here -->
                </div>
            </div>
        `;

        // Initialize equipment database if available
        const dbContainer = document.getElementById('equipmentDatabase');
        if (window.equipmentDB && dbContainer) {
            equipmentDB.init(dbContainer);
        }
    }

    renderTimeline(container) {
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
        container.innerHTML = `
            <div class="fade-in">
                <h1>🎲 Playtesting Tracker</h1>
                <p>Record test sessions, feedback, and issues.</p>
                <div id="playtestingTracker" class="playtesting-tracker">
                    <div class="playtesting-stats">
                        <div class="stat-card">
                            <h3>Test Sessions</h3>
                            <div class="stat-value">12</div>
                        </div>
                        <div class="stat-card">
                            <h3>Issues Found</h3>
                            <div class="stat-value">8</div>
                        </div>
                        <div class="stat-card">
                            <h3>Issues Resolved</h3>
                            <div class="stat-value">5</div>
                        </div>
                    </div>
                    <div class="playtesting-log">
                        <h3>Recent Sessions</h3>
                        <div class="session-item">
                            <div class="session-date">Oct 5, 2025</div>
                            <div class="session-details">
                                <h4>Combat System Test</h4>
                                <p>Tested new initiative mechanics with 4 players</p>
                            </div>
                        </div>
                        <div class="session-item">
                            <div class="session-date">Oct 2, 2025</div>
                            <div class="session-details">
                                <h4>Character Creation Flow</h4>
                                <p>Validated race and class selection process</p>
                            </div>
                        </div>
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
                                <li><a href="#">Player Handbook</a></li>
                                <li><a href="#">Quick Start Guide</a></li>
                                <li><a href="#">Character Sheet</a></li>
                                <li><a href="#">Rules Reference</a></li>
                            </ul>
                        </div>
                        <div class="doc-category">
                            <h3>🎭 GM Resources</h3>
                            <ul class="doc-list">
                                <li><a href="#">GM Guide</a></li>
                                <li><a href="#">Monster Manual</a></li>
                                <li><a href="#">Adventure Templates</a></li>
                                <li><a href="#">Session Tools</a></li>
                            </ul>
                        </div>
                        <div class="doc-category">
                            <h3>🔧 Development</h3>
                            <ul class="doc-list">
                                <li><a href="#">Design Document</a></li>
                                <li><a href="#">API Reference</a></li>
                                <li><a href="#">Changelog</a></li>
                                <li><a href="#">Contributing Guide</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notificationContainer');
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
            setTimeout(() => container.removeChild(notification), 300);
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
    app = new DungeonDestinyApp();
    app.init();
});

// Export for global access
window.app = app;