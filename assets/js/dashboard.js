// Dashboard-specific functionality
// =================================

class DashboardManager {
    constructor() {
        this.refreshInterval = 30000; // 30 seconds
    }

    init() {
        this.startAutoRefresh();
    }

    startAutoRefresh() {
        setInterval(() => {
            if (window.app && window.app.currentSection === 'dashboard') {
                this.updateMetrics();
            }
        }, this.refreshInterval);
    }

    updateMetrics() {
        // Update project progress
        const completedTasks = gameData.tasks.filter(t => t.status === 'Complete').length;
        const totalTasks = gameData.tasks.length;
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

        gameData.project.progress = progressPercentage;

        // Update progress displays
        const progressElements = document.querySelectorAll('.progress-fill');
        progressElements.forEach(element => {
            if (element.style.width.includes('%')) {
                element.style.width = `${progressPercentage}%`;
            }
        });

        // Update metric displays
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach((element, index) => {
            switch(index) {
                case 0: // Progress
                    element.textContent = `${progressPercentage}%`;
                    break;
                case 1: // Tasks
                    element.textContent = `${completedTasks}/${totalTasks}`;
                    break;
            }
        });
    }

    getUpcomingMilestones(count = 3) {
        const now = new Date();
        return gameData.milestones
            .filter(m => new Date(m.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, count);
    }

    getTasksByStatus() {
        const statusCounts = {
            'Not Started': 0,
            'In Progress': 0,
            'Planning': 0,
            'Complete': 0
        };

        gameData.tasks.forEach(task => {
            statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
        });

        return statusCounts;
    }

    getTasksByPriority() {
        const priorityCounts = {
            'High': 0,
            'Medium': 0,
            'Low': 0
        };

        gameData.tasks.forEach(task => {
            priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1;
        });

        return priorityCounts;
    }
}

// Export for global use
window.DashboardManager = DashboardManager;