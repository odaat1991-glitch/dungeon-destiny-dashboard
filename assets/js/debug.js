// Debug Script for Dungeon Destiny Dashboard
// ==========================================

console.log('🔍 Debug script loaded');

// Check if all required objects exist
function checkDependencies() {
    const checks = {
        'gameData': typeof gameData !== 'undefined',
        'DungeonDestinySaveSystem': typeof DungeonDestinySaveSystem !== 'undefined',
        'taskManager': typeof taskManager !== 'undefined' || typeof window.taskManager !== 'undefined',
        'characterCreator': typeof characterCreator !== 'undefined' || typeof window.characterCreator !== 'undefined',
        'equipmentDB': typeof equipmentDB !== 'undefined' || typeof window.equipmentDB !== 'undefined'
    };

    console.log('📋 Dependency check:', checks);
    
    Object.entries(checks).forEach(([name, exists]) => {
        if (!exists) {
            console.warn(`⚠️ Missing: ${name}`);
        }
    });

    return checks;
}

// Simple fallback initialization
function initializeFallback() {
    console.log('🚀 Initializing fallback...');
    
    // Remove loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Setup basic navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            
            console.log(`🔗 Navigating to: ${section}`);
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Simple section display
            showBasicSection(section);
        });
    });
    
    // Show dashboard by default
    showBasicSection('dashboard');
}

// Basic section renderer
function showBasicSection(sectionName) {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;
    
    contentArea.style.opacity = '0';
    
    setTimeout(() => {
        switch(sectionName) {
            case 'dashboard':
                showBasicDashboard(contentArea);
                break;
            case 'tasks':
                showBasicTasks(contentArea);
                break;
            default:
                contentArea.innerHTML = `
                    <div class="fade-in">
                        <h1>🚧 ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</h1>
                        <p>This section is under development.</p>
                        <p>Section: ${sectionName}</p>
                        <button onclick="window.location.reload()" class="btn btn-primary">🔄 Reload Page</button>
                    </div>
                `;
        }
        contentArea.style.opacity = '1';
    }, 150);
}

function showBasicDashboard(container) {
    const data = typeof gameData !== 'undefined' ? gameData : {
        project: { name: 'Dungeon Destiny', progress: 25 },
        tasks: []
    };
    
    container.innerHTML = `
        <div class="fade-in">
            <h1>🎯 ${data.project.name} Dashboard</h1>
            <div class="dashboard-basic">
                <div class="metric-card">
                    <h3>📊 Progress</h3>
                    <div class="metric-value">${data.project.progress || 25}%</div>
                </div>
                <div class="metric-card">
                    <h3>📋 Tasks</h3>
                    <div class="metric-value">${data.tasks ? data.tasks.length : 16}</div>
                </div>
                <div class="metric-card">
                    <h3>🎲 Phase</h3>
                    <div class="metric-value">2</div>
                </div>
            </div>
            <div class="debug-info">
                <h3>🔍 Debug Info</h3>
                <p>Time: ${new Date().toLocaleString()}</p>
                <p>gameData: ${typeof gameData !== 'undefined' ? '✅ Loaded' : '❌ Missing'}</p>
                <p>App: ${typeof window.app !== 'undefined' ? '✅ Initialized' : '❌ Missing'}</p>
                <button onclick="checkDependencies()" class="btn btn-secondary">🔍 Check Dependencies</button>
                <button onclick="window.location.reload()" class="btn btn-primary">🔄 Reload</button>
            </div>
        </div>
    `;
}

function showBasicTasks(container) {
    container.innerHTML = `
        <div class="fade-in">
            <h1>📋 Task Management</h1>
            <p>Task management interface is being initialized...</p>
            <div class="task-board-basic">
                <div class="task-column">
                    <h3>📝 Planned</h3>
                    <div class="task-item">Character Creation System</div>
                    <div class="task-item">Combat Mechanics</div>
                </div>
                <div class="task-column">
                    <h3>🔄 In Progress</h3>
                    <div class="task-item">Race/Class Templates</div>
                </div>
                <div class="task-column">
                    <h3>✅ Complete</h3>
                    <div class="task-item">Project Setup</div>
                </div>
            </div>
        </div>
    `;
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🏁 DOM ready, checking dependencies...');
            const checks = checkDependencies();
            
            // If main app isn't working, use fallback
            if (!window.app || !checks.gameData) {
                console.log('🆘 Using fallback initialization');
                initializeFallback();
            }
        }, 1000);
    });
} else {
    setTimeout(() => {
        console.log('🏁 Page already loaded, checking dependencies...');
        const checks = checkDependencies();
        
        if (!window.app || !checks.gameData) {
            console.log('🆘 Using fallback initialization');
            initializeFallback();
        }
    }, 1000);
}