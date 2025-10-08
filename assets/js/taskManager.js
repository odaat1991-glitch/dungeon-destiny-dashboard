// Task Management System
// ======================

class TaskManager {
    constructor() {
        this.draggedTask = null;
    }

    init(container) {
        this.renderTaskBoard(container);
    }

    renderTaskBoard(container) {
        const tasksByStatus = this.groupTasksByStatus();

        container.innerHTML = `
            <div class="task-board">
                <div class="task-columns">
                    ${Object.entries(tasksByStatus).map(([status, tasks]) => `
                        <div class="task-column" data-status="${status}">
                            <div class="column-header">
                                <h3>${status}</h3>
                                <span class="task-count">${tasks.length}</span>
                            </div>
                            <div class="task-list" ondrop="taskManager.handleDrop(event)" ondragover="taskManager.handleDragOver(event)">
                                ${tasks.map(task => this.renderTaskCard(task)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.addTaskManagerStyles();
    }

    groupTasksByStatus() {
        const statuses = ['Not Started', 'Planning', 'In Progress', 'Complete'];
        const grouped = {};

        statuses.forEach(status => {
            grouped[status] = gameData.tasks.filter(task => task.status === status);
        });

        return grouped;
    }

    renderTaskCard(task) {
        const priorityClass = task.priority.toLowerCase();
        return `
            <div class="task-card ${priorityClass}" draggable="true" ondragstart="taskManager.handleDragStart(event)" data-task-id="${task.id}">
                <div class="task-header">
                    <span class="task-system">${task.system}</span>
                    <span class="priority-badge ${priorityClass}">${task.priority}</span>
                </div>
                <div class="task-content">
                    <h4>${task.task}</h4>
                    <p class="task-estimate">${task.estimate}h estimated</p>
                </div>
            </div>
        `;
    }

    handleDragStart(event) {
        this.draggedTask = parseInt(event.target.dataset.taskId);
        event.dataTransfer.effectAllowed = 'move';
    }

    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    handleDrop(event) {
        event.preventDefault();
        const newStatus = event.currentTarget.parentElement.dataset.status;

        if (this.draggedTask && newStatus) {
            this.updateTaskStatus(this.draggedTask, newStatus);
            this.draggedTask = null;
        }
    }

    updateTaskStatus(taskId, newStatus) {
        const task = gameData.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;

            // Save changes
            if (window.saveSystem) {
                window.saveSystem.saveData();
            }

            // Refresh the board
            if (window.app && window.app.currentSection === 'tasks') {
                const container = document.getElementById('contentArea');
                this.renderTaskBoard(container.querySelector('.fade-in'));
            }

            // Show notification
            if (window.app) {
                window.app.showNotification(`Task moved to ${newStatus}`, 'success');
            }
        }
    }

    addTaskManagerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .task-board {
                width: 100%;
                overflow-x: auto;
            }

            .task-columns {
                display: grid;
                grid-template-columns: repeat(4, 300px);
                gap: 1.5rem;
                padding: 1rem;
                min-width: 1200px;
            }

            .task-column {
                background: var(--secondary-bg);
                border-radius: 12px;
                padding: 1rem;
                min-height: 400px;
            }

            .column-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--border);
            }

            .column-header h3 {
                color: var(--accent-text);
                margin: 0;
            }

            .task-count {
                background: var(--primary-purple);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: 0.75rem;
            }

            .task-list {
                min-height: 300px;
            }

            .task-card {
                background: var(--tertiary-bg);
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
                border-left: 4px solid var(--primary-purple);
                cursor: grab;
                transition: all var(--transition-fast);
            }

            .task-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px var(--shadow);
            }

            .task-card:active {
                cursor: grabbing;
            }

            .task-card.high {
                border-left-color: var(--error);
            }

            .task-card.medium {
                border-left-color: var(--warning);
            }

            .task-card.low {
                border-left-color: var(--success);
            }

            .task-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .task-system {
                font-size: 0.75rem;
                color: var(--muted-text);
                text-transform: uppercase;
                font-weight: 600;
            }

            .priority-badge {
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
            }

            .priority-badge.high {
                background: rgba(229, 62, 62, 0.2);
                color: var(--error);
            }

            .priority-badge.medium {
                background: rgba(237, 137, 54, 0.2);
                color: var(--warning);
            }

            .priority-badge.low {
                background: rgba(72, 187, 120, 0.2);
                color: var(--success);
            }

            .task-content h4 {
                margin: 0 0 0.5rem 0;
                color: var(--primary-text);
                line-height: 1.3;
            }

            .task-estimate {
                margin: 0;
                font-size: 0.75rem;
                color: var(--muted-text);
            }

            @media (max-width: 768px) {
                .task-columns {
                    grid-template-columns: 1fr;
                    min-width: auto;
                }
            }
        `;

        if (!document.getElementById('task-manager-styles')) {
            style.id = 'task-manager-styles';
            document.head.appendChild(style);
        }
    }
}

// Create global instance
const taskManager = new TaskManager();
window.taskManager = taskManager;