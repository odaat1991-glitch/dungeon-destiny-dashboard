# Create GitHub Pages deployment structure
import os
import json
from datetime import datetime

# Create the main HTML file for GitHub Pages
index_html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dungeon Destiny - Phase 2 Development Dashboard</title>
    <meta name="description" content="Interactive development management dashboard for Dungeon Destiny tabletop RPG Phase 2 implementation">
    <meta name="author" content="Martin Acosta">
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
</head>
<body>
    <!-- Loading Screen -->
    <div id="loadingScreen" class="loading-screen">
        <div class="loading-content">
            <div class="loading-logo">⚔️</div>
            <h2>Dungeon Destiny</h2>
            <p>Loading Phase 2 Development Dashboard...</p>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    </div>

    <!-- Sidebar Navigation -->
    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="logo">⚔️</div>
            <div class="title-section">
                <h2>Dungeon Destiny</h2>
                <span class="phase-badge">Phase 2</span>
            </div>
        </div>
        <ul class="nav-menu">
            <li><a href="#dashboard" class="nav-link active" data-section="dashboard">
                <span class="material-icons">dashboard</span>
                <span class="nav-text">Overview</span>
            </a></li>
            <li><a href="#tasks" class="nav-link" data-section="tasks">
                <span class="material-icons">task</span>
                <span class="nav-text">Task Management</span>
            </a></li>
            <li><a href="#character" class="nav-link" data-section="character">
                <span class="material-icons">person</span>
                <span class="nav-text">Character Creation</span>
            </a></li>
            <li><a href="#equipment" class="nav-link" data-section="equipment">
                <span class="material-icons">shield</span>
                <span class="nav-text">Equipment Database</span>
            </a></li>
            <li><a href="#timeline" class="nav-link" data-section="timeline">
                <span class="material-icons">timeline</span>
                <span class="nav-text">Development Timeline</span>
            </a></li>
            <li><a href="#playtesting" class="nav-link" data-section="playtesting">
                <span class="material-icons">bug_report</span>
                <span class="nav-text">Playtesting Tracker</span>
            </a></li>
            <li><a href="#documentation" class="nav-link" data-section="documentation">
                <span class="material-icons">description</span>
                <span class="nav-text">Documentation Hub</span>
            </a></li>
        </ul>
        
        <!-- Save System UI -->
        <div class="save-controls">
            <div class="save-title">Project Saves</div>
            <div class="save-buttons">
                <button id="saveBtn" class="save-btn save" title="Save Progress (Ctrl+S)">
                    <span class="material-icons">save</span>
                </button>
                <button id="loadBtn" class="save-btn load" title="Load Saved Data">
                    <span class="material-icons">folder_open</span>
                </button>
                <button id="exportBtn" class="save-btn export" title="Export Backup">
                    <span class="material-icons">download</span>
                </button>
                <label for="importFile" class="save-btn import" title="Import Backup">
                    <span class="material-icons">upload</span>
                </label>
                <input type="file" id="importFile" accept=".json" style="display: none;">
            </div>
            <div class="save-status" id="saveStatus">Ready</div>
            <div class="auto-save-indicator" id="autoSaveStatus">Auto-save: ON</div>
        </div>
    </nav>

    <!-- Main Content Area -->
    <main class="main-content">
        <!-- Dynamic content sections will be loaded here -->
        <div id="contentArea">
            <!-- Content loads via JavaScript -->
        </div>
    </main>

    <!-- Notification Container -->
    <div id="notificationContainer"></div>

    <!-- Scripts -->
    <script src="assets/js/gameData.js"></script>
    <script src="assets/js/saveSystem.js"></script>
    <script src="assets/js/dashboard.js"></script>
    <script src="assets/js/characterCreator.js"></script>
    <script src="assets/js/taskManager.js"></script>
    <script src="assets/js/equipmentDatabase.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>'''

# Create the main CSS file
main_css = '''/* Dungeon Destiny Dashboard - GitHub Pages Version */
/* =========================== */

:root {
    /* Color Palette - Dark Fantasy Theme */
    --primary-bg: #1a1b23;
    --secondary-bg: #252833;
    --tertiary-bg: #2d3748;
    --accent-bg: #4a5568;
    
    --primary-text: #f7fafc;
    --secondary-text: #e2e8f0;
    --muted-text: #a0aec0;
    --accent-text: #ffd700;
    
    --primary-purple: #805ad5;
    --secondary-purple: #9f7aea;
    --primary-gold: #ffd700;
    --secondary-gold: #ffc107;
    
    --success: #48bb78;
    --warning: #ed8936;
    --error: #e53e3e;
    --info: #4299e1;
    
    --border: #4a5568;
    --hover: rgba(128, 90, 213, 0.1);
    --shadow: rgba(0, 0, 0, 0.3);
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* Typography */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    
    /* Animation */
    --transition-fast: 150ms ease-in-out;
    --transition-normal: 300ms ease-in-out;
    --transition-slow: 500ms ease-in-out;
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    background: var(--primary-bg);
    color: var(--primary-text);
    line-height: 1.6;
    overflow-x: hidden;
}

/* Loading Screen */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity var(--transition-slow);
}

.loading-content {
    text-align: center;
}

.loading-logo {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    animation: pulse 2s infinite;
}

.loading-bar {
    width: 200px;
    height: 4px;
    background: var(--tertiary-bg);
    border-radius: 2px;
    overflow: hidden;
    margin: var(--spacing-lg) auto 0;
}

.loading-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-purple), var(--primary-gold));
    width: 0%;
    animation: loading 3s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

@keyframes loading {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
}

/* Sidebar */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background: var(--secondary-bg);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    z-index: 1000;
    box-shadow: 4px 0 12px var(--shadow);
}

.sidebar-header {
    padding: var(--spacing-xl);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.logo {
    font-size: var(--font-size-3xl);
}

.title-section h2 {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--accent-text);
}

.phase-badge {
    background: var(--primary-purple);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-size: var(--font-size-xs);
    font-weight: 600;
}

.nav-menu {
    list-style: none;
    padding: var(--spacing-lg);
    flex: 1;
}

.nav-menu li {
    margin-bottom: var(--spacing-sm);
}

.nav-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    color: var(--secondary-text);
    text-decoration: none;
    border-radius: 8px;
    transition: all var(--transition-fast);
}

.nav-link:hover {
    background: var(--hover);
    color: var(--primary-text);
}

.nav-link.active {
    background: var(--primary-purple);
    color: white;
}

.nav-link .material-icons {
    font-size: 20px;
}

/* Save Controls */
.save-controls {
    padding: var(--spacing-lg);
    border-top: 1px solid var(--border);
    background: var(--tertiary-bg);
}

.save-title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--accent-text);
    margin-bottom: var(--spacing-md);
    text-align: center;
}

.save-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
}

.save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow);
}

.save-btn.save {
    background: var(--success);
    color: white;
}

.save-btn.load {
    background: var(--info);
    color: white;
}

.save-btn.export {
    background: var(--warning);
    color: white;
}

.save-btn.import {
    background: var(--secondary-purple);
    color: white;
}

.save-status, .auto-save-indicator {
    font-size: var(--font-size-xs);
    color: var(--muted-text);
    text-align: center;
}

.auto-save-indicator {
    margin-top: var(--spacing-xs);
}

/* Main Content */
.main-content {
    margin-left: 280px;
    min-height: 100vh;
    background: var(--primary-bg);
    padding: var(--spacing-xl);
}

#contentArea {
    max-width: 1200px;
    margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
        transition: transform var(--transition-normal);
    }
    
    .sidebar.mobile-open {
        transform: translateX(0);
    }
    
    .main-content {
        margin-left: 0;
        padding: var(--spacing-md);
    }
    
    .nav-text {
        display: none;
    }
    
    .sidebar {
        width: 80px;
    }
    
    .save-buttons {
        grid-template-columns: 1fr;
    }
}

/* Utility Classes */
.hidden {
    display: none !important;
}

.fade-in {
    animation: fadeIn var(--transition-normal);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Cards and Components */
.card {
    background: var(--secondary-bg);
    border-radius: 12px;
    padding: var(--spacing-lg);
    border: 1px solid var(--border);
    box-shadow: 0 2px 8px var(--shadow);
    margin-bottom: var(--spacing-lg);
}

.card-header {
    margin-bottom: var(--spacing-lg);
}

.card-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--accent-text);
}

.card-subtitle {
    font-size: var(--font-size-sm);
    color: var(--muted-text);
    margin-top: var(--spacing-xs);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: all var(--transition-fast);
    text-decoration: none;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px var(--shadow);
}

.btn-primary {
    background: var(--primary-purple);
    color: white;
}

.btn-secondary {
    background: var(--tertiary-bg);
    color: var(--primary-text);
}

.btn-success {
    background: var(--success);
    color: white;
}

.btn-warning {
    background: var(--warning);
    color: white;
}

.btn-error {
    background: var(--error);
    color: white;
}

/* Progress Bars */
.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--tertiary-bg);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-purple), var(--primary-gold));
    transition: width var(--transition-normal);
}

/* Notifications */
#notificationContainer {
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: 10001;
}

.notification {
    background: var(--secondary-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    box-shadow: 0 4px 12px var(--shadow);
    transform: translateX(400px);
    transition: transform var(--transition-normal);
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-color: var(--success);
    background: rgba(72, 187, 120, 0.1);
}

.notification.warning {
    border-color: var(--warning);
    background: rgba(237, 137, 54, 0.1);
}

.notification.error {
    border-color: var(--error);
    background: rgba(229, 62, 62, 0.1);
}

.notification.info {
    border-color: var(--info);
    background: rgba(66, 153, 225, 0.1);
}'''

# Create the main JavaScript file
main_js = '''// Dungeon Destiny Dashboard - Main Application
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
        
        // Initialize task board (placeholder)
        document.getElementById('taskBoard').innerHTML = 
            '<p class="placeholder">Task management interface loading...</p>';
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
    }

    renderTimeline(container) {
        container.innerHTML = `
            <div class="fade-in">
                <h1>📅 Development Timeline</h1>
                <p>Track milestones and project deadlines.</p>
                <div id="timelineView" class="timeline-view">
                    <!-- Timeline will be rendered here -->
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
                    <!-- Playtesting tracker will be rendered here -->
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
                    <!-- Documentation hub will be rendered here -->
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
window.app = app;'''

# Create a comprehensive README for GitHub Pages
readme_content = '''# Dungeon Destiny - Phase 2 Development Dashboard

🎲 **An interactive development management dashboard for the Dungeon Destiny tabletop RPG**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://odaat1991.github.io/dungeon-destiny-dashboard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-0.2.0--alpha-blue.svg)](https://github.com/odaat1991/dungeon-destiny-dashboard/releases)

## 🌟 Live Dashboard

**Access the live dashboard here:** [https://odaat1991.github.io/dungeon-destiny-dashboard/](https://odaat1991.github.io/dungeon-destiny-dashboard/)

## 📋 Project Overview

Dungeon Destiny is an innovative tabletop RPG that blends classic fantasy elements with modern game mechanics. This dashboard provides comprehensive project management tools for Phase 2 development, including:

- **📊 Project Overview** - Real-time progress tracking and metrics
- **✅ Task Management** - Kanban-style development board
- **🧙‍♂️ Character Creation** - Interactive character generator
- **⚔️ Equipment Database** - Searchable weapons and armor catalog
- **📅 Timeline Tracker** - Milestone and deadline management
- **🎲 Playtesting Tools** - Session logging and feedback collection
- **📚 Documentation Hub** - Centralized resource management

## 🚀 Features

### Core Development Tools
- **Visual Task Management**: Drag-and-drop Kanban board with priority filtering
- **Character System Testing**: Interactive character creation with all races and classes
- **Equipment Management**: Comprehensive database of weapons, armor, and items
- **Progress Tracking**: Real-time metrics and completion percentages
- **Milestone Planning**: Visual timeline with deadline alerts

### Save System
- **Local Persistence**: Automatic local storage saves
- **Export/Import**: JSON backup files for data portability
- **Auto-save**: Background saving every 60 seconds
- **Keyboard Shortcuts**: Quick save (Ctrl+S), load (Ctrl+O), export (Ctrl+E)

### Game Content
- **4 Character Races**: Human, Dwarf, Elf, Halfling with unique traits
- **4 Character Classes**: Guardian, Seeker, Mystic, Scout with distinct roles
- **Equipment System**: 6 weapon types and 4 armor categories
- **Skill Framework**: 18-skill proficiency system with challenge mechanics

## 🎮 Game System Highlights

### Character Races
- **Human**: Versatile and adaptive with balanced growth
- **Dwarf**: Hardy craftsmen with strength bonuses and magic resistance
- **Elf**: Graceful spellcasters with dexterity and intelligence bonuses
- **Halfling**: Small but brave with stealth and luck abilities

### Character Classes
- **Guardian**: Tank/Defender with protective abilities
- **Seeker**: DPS/Striker with precision combat skills
- **Mystic**: Support/Controller with magical mastery
- **Scout**: Utility/Support with wilderness expertise

## 📈 Development Status

**Current Phase**: Phase 2 - Core Systems Implementation  
**Progress**: 25% Complete  
**Timeline**: October 2025 - December 2025  
**Tasks**: 16 development tasks (156 estimated hours)

### Upcoming Milestones
1. **Core Mechanics Complete** (Oct 28, 2025) - Character creation and combat systems
2. **First Playtest Ready** (Nov 11, 2025) - Alpha version for internal testing
3. **Adventure Module Alpha** (Nov 25, 2025) - First playable scenario
4. **Beta Release** (Dec 23, 2025) - Feature-complete external testing version

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3 (CSS Grid/Flexbox), Vanilla JavaScript
- **Styling**: Custom CSS with CSS Variables, Material Icons
- **Data**: JSON-based game content, localStorage persistence
- **Hosting**: GitHub Pages with custom domain support
- **Version Control**: Git with semantic versioning

## 🏃‍♂️ Quick Start

### Using the Live Dashboard
1. Visit [https://odaat1991.github.io/dungeon-destiny-dashboard/](https://odaat1991.github.io/dungeon-destiny-dashboard/)
2. Explore different sections using the sidebar navigation
3. Use the save system to preserve your progress
4. Export backups for data safety

### Local Development
```bash
# Clone the repository
git clone https://github.com/odaat1991/dungeon-destiny-dashboard.git

# Navigate to project directory
cd dungeon-destiny-dashboard

# Serve locally (Python)
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Open browser to http://localhost:8000
```

## 💾 Save System Usage

### Automatic Features
- ✅ Auto-saves every 60 seconds
- ✅ Detects unsaved changes
- ✅ Visual save status indicators
- ✅ Browser session persistence

### Manual Controls
- **💾 Save**: Preserve current progress
- **📂 Load**: Restore saved data
- **📤 Export**: Download backup JSON
- **📥 Import**: Upload backup file

### Keyboard Shortcuts
- **Ctrl+S**: Quick save
- **Ctrl+O**: Quick load
- **Ctrl+E**: Quick export
- **Alt+1-7**: Navigate between sections

## 📊 Dashboard Sections

### Overview Dashboard
- Project progress metrics
- Task completion statistics
- Upcoming milestone alerts
- Quick action buttons

### Task Management
- Kanban board with drag-and-drop
- Priority-based task filtering
- System-based task organization
- Time estimation tracking

### Character Creation
- Interactive race/class selection
- Attribute point allocation
- Equipment starting packages
- Character sheet export

### Equipment Database
- Searchable weapon catalog
- Armor and shield database
- Property and trait filtering
- Custom item creation

### Development Timeline
- Visual milestone calendar
- Dependency tracking
- Progress indicators
- Deadline notifications

### Playtesting Tracker
- Session recording forms
- Issue and bug tracking
- Feedback categorization
- Resolution status updates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Coding Standards
- Use semantic HTML5 elements
- Follow CSS BEM methodology
- Write vanilla JavaScript (ES6+)
- Comment complex logic
- Test across modern browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: Martin Acosta ([@odaat1991](https://github.com/odaat1991))
- **Project Type**: Tabletop RPG Development Tool
- **Status**: Active Development

## 🔗 Links

- **Live Dashboard**: [https://odaat1991.github.io/dungeon-destiny-dashboard/](https://odaat1991.github.io/dungeon-destiny-dashboard/)
- **Repository**: [https://github.com/odaat1991/dungeon-destiny-dashboard](https://github.com/odaat1991/dungeon-destiny-dashboard)
- **Issues**: [Report bugs and request features](https://github.com/odaat1991/dungeon-destiny-dashboard/issues)
- **Releases**: [Version history and downloads](https://github.com/odaat1991/dungeon-destiny-dashboard/releases)

## 📞 Support

For questions, feedback, or support:
- **Email**: odaat1991@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/odaat1991/dungeon-destiny-dashboard/issues)
- **Project Discussions**: [Join the conversation](https://github.com/odaat1991/dungeon-destiny-dashboard/discussions)

---

⚔️ **Built with passion for tabletop gaming and modern web development** 🎲'''

# Create directory structure and save files
files_created = []

# Save all files
files_to_create = [
    ('index.html', index_html),
    ('assets/css/style.css', main_css),
    ('assets/js/main.js', main_js),
    ('README.md', readme_content)
]

for filepath, content in files_to_create:
    # Create directory if it doesn't exist
    directory = os.path.dirname(filepath) if os.path.dirname(filepath) else '.'
    if directory != '.' and not os.path.exists(directory):
        os.makedirs(directory)
    
    # Write file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    files_created.append(filepath)

print("✅ GitHub Pages Structure Created!")
print("\n📁 Files Generated:")
for file in files_created:
    print(f"   • {file}")

print(f"\n📊 Total Files: {len(files_created)}")
print("\n🚀 Next Steps:")
print("   1. Create GitHub repository: 'dungeon-destiny-dashboard'")
print("   2. Upload all generated files")
print("   3. Enable GitHub Pages in repository settings")
print("   4. Access at: https://odaat1991.github.io/dungeon-destiny-dashboard/")