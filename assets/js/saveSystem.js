// Enhanced Save System for Dungeon Destiny Dashboard
// ==================================================

class DungeonDestinySaveSystem {
    constructor() {
        this.saveKey = 'dungeon_destiny_save_data';
        this.autoSaveInterval = 60000; // 60 seconds
        this.lastSaveTime = null;
        this.autoSaveTimer = null;
    }

    async init() {
        console.log('💾 Initializing save system...');

        // Setup save buttons
        this.setupSaveButtons();

        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Try to load existing data
        this.loadData(true); // Silent load

        // Setup auto-save
        this.setupAutoSave();

        console.log('✅ Save system ready!');
    }

    setupSaveButtons() {
        const saveBtn = document.getElementById('saveBtn');
        const loadBtn = document.getElementById('loadBtn');
        const exportBtn = document.getElementById('exportBtn');
        const importFile = document.getElementById('importFile');

        if (saveBtn) saveBtn.addEventListener('click', () => this.saveData());
        if (loadBtn) loadBtn.addEventListener('click', () => this.loadData());
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportData());
        if (importFile) importFile.addEventListener('change', (e) => this.importData(e.target));
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 's':
                        e.preventDefault();
                        this.saveData();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.loadData();
                        break;
                    case 'e':
                        e.preventDefault();
                        this.exportData();
                        break;
                }
            }
        });
    }

    setupAutoSave() {
        this.autoSaveTimer = setInterval(() => {
            if (this.hasUnsavedChanges()) {
                this.saveData(true); // Silent save
                this.updateAutoSaveStatus();
            }
        }, this.autoSaveInterval);
    }

    saveData(silent = false) {
        try {
            const saveData = {
                timestamp: new Date().toISOString(),
                version: gameData.project.version,
                data: JSON.parse(JSON.stringify(gameData)), // Deep clone
                metadata: {
                    totalTasks: gameData.tasks.length,
                    completedTasks: gameData.tasks.filter(t => t.status === 'Complete').length,
                    lastModified: new Date().toISOString()
                }
            };

            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            this.lastSaveTime = new Date();

            if (!silent) {
                this.showNotification('💾 Progress saved successfully!', 'success');
                console.log('✅ Data saved at:', this.lastSaveTime.toLocaleTimeString());
            }

            this.updateSaveStatus('Saved');
            return true;

        } catch (error) {
            console.error('❌ Save failed:', error);
            if (!silent) {
                this.showNotification('❌ Save failed: ' + error.message, 'error');
            }
            this.updateSaveStatus('Save Error');
            return false;
        }
    }

    loadData(silent = false) {
        try {
            const savedData = localStorage.getItem(this.saveKey);

            if (!savedData) {
                if (!silent) {
                    this.showNotification('📭 No saved data found', 'warning');
                }
                return false;
            }

            const parsedData = JSON.parse(savedData);

            if (!parsedData.data || !parsedData.timestamp) {
                throw new Error('Invalid save file format');
            }

            // Merge the saved data
            Object.assign(gameData, parsedData.data);

            if (!silent) {
                const loadTime = new Date(parsedData.timestamp);
                this.showNotification(
                    `📂 Data loaded from ${loadTime.toLocaleDateString()} ${loadTime.toLocaleTimeString()}`, 
                    'success'
                );
                console.log('✅ Data loaded from:', parsedData.timestamp);

                // Refresh current view
                if (window.app && window.app.currentSection) {
                    window.app.showSection(window.app.currentSection);
                }
            }

            this.updateSaveStatus('Loaded');
            return true;

        } catch (error) {
            console.error('❌ Load failed:', error);
            if (!silent) {
                this.showNotification('❌ Load failed: ' + error.message, 'error');
            }
            this.updateSaveStatus('Load Error');
            return false;
        }
    }

    exportData() {
        try {
            const exportData = {
                projectName: gameData.project.name,
                exportDate: new Date().toISOString(),
                version: gameData.project.version,
                data: gameData,
                metadata: {
                    totalTasks: gameData.tasks.length,
                    completedTasks: gameData.tasks.filter(t => t.status === 'Complete').length,
                    progressPercentage: gameData.project.progress,
                    exportedBy: gameData.project.lead_developer
                }
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `dungeon_destiny_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.showNotification('📤 Backup exported successfully!', 'success');
            console.log('📤 Data exported');

            return true;

        } catch (error) {
            console.error('❌ Export failed:', error);
            this.showNotification('❌ Export failed: ' + error.message, 'error');
            return false;
        }
    }

    importData(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importData = JSON.parse(event.target.result);

                if (!importData.data || !importData.projectName) {
                    throw new Error('Invalid backup file format');
                }

                const importDate = new Date(importData.exportDate);
                const confirmMessage = `Import data from "${importData.projectName}"?\n\nBackup Date: ${importDate.toLocaleDateString()} ${importDate.toLocaleTimeString()}\nVersion: ${importData.version}\n\n⚠️ This will replace all current data!`;

                if (confirm(confirmMessage)) {
                    Object.assign(gameData, importData.data);
                    this.saveData(); // Save the imported data

                    this.showNotification('📥 Data imported successfully!', 'success');
                    console.log('📥 Data imported from:', importData.exportDate);

                    // Refresh current view
                    if (window.app && window.app.currentSection) {
                        window.app.showSection(window.app.currentSection);
                    }
                }

            } catch (error) {
                console.error('❌ Import failed:', error);
                this.showNotification('❌ Import failed: ' + error.message, 'error');
            }

            // Reset file input
            fileInput.value = '';
        };

        reader.readAsText(file);
    }

    hasUnsavedChanges() {
        if (!this.lastSaveTime) return true;

        const currentData = JSON.stringify(gameData);
        const savedData = localStorage.getItem(this.saveKey);

        if (!savedData) return true;

        try {
            const parsedSave = JSON.parse(savedData);
            const savedGameData = JSON.stringify(parsedSave.data);
            return currentData !== savedGameData;
        } catch {
            return true;
        }
    }

    updateSaveStatus(status) {
        const statusElement = document.getElementById('saveStatus');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    updateAutoSaveStatus() {
        const autoSaveElement = document.getElementById('autoSaveStatus');
        if (autoSaveElement) {
            autoSaveElement.textContent = `Auto-saved: ${new Date().toLocaleTimeString()}`;
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        // Use app notification system if available
        if (window.app && typeof window.app.showNotification === 'function') {
            window.app.showNotification(message, type, duration);
            return;
        }

        // Fallback notification system
        const container = document.getElementById('notificationContainer') || document.body;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;

        container.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (container.contains(notification)) {
                    container.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DungeonDestinySaveSystem;
}