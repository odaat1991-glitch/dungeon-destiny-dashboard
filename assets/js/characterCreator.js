// Character Creator functionality
// ===============================

class CharacterCreator {
    constructor() {
        this.currentCharacter = this.getEmptyCharacter();
        this.savedCharacters = this.loadSavedCharacters();
    }

    getEmptyCharacter() {
        return {
            name: '',
            race: '',
            class: '',
            attributes: {
                'Strength': 10,
                'Dexterity': 10,
                'Intelligence': 10,
                'Wisdom': 10,
                'Charisma': 10,
                'Constitution': 10
            },
            hitPoints: 0,
            armorClass: 10,
            equipment: [],
            skills: [],
            background: '',
            notes: ''
        };
    }

    init() {
        this.render();
    }

    render() {
        const container = document.getElementById('characterCreator');
        if (!container) return;

        container.innerHTML = `
            <div class="character-creator-content">
                <div class="character-form">
                    <div class="form-section">
                        <h3>Basic Information</h3>
                        <div class="form-group">
                            <label for="characterName">Character Name</label>
                            <input type="text" id="characterName" class="form-control" 
                                   value="${this.currentCharacter.name}" 
                                   onchange="characterCreator.updateCharacter('name', this.value)">
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="characterRace">Race</label>
                                <select id="characterRace" class="form-control" 
                                        onchange="characterCreator.updateCharacter('race', this.value)">
                                    <option value="">Select Race</option>
                                    ${Object.keys(gameData.races).map(race => `
                                        <option value="${race}" ${this.currentCharacter.race === race ? 'selected' : ''}>
                                            ${race}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="characterClass">Class</label>
                                <select id="characterClass" class="form-control" 
                                        onchange="characterCreator.updateCharacter('class', this.value)">
                                    <option value="">Select Class</option>
                                    ${Object.keys(gameData.classes).map(cls => `
                                        <option value="${cls}" ${this.currentCharacter.class === cls ? 'selected' : ''}>
                                            ${cls}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Attributes</h3>
                        <div class="attributes-grid">
                            ${Object.entries(this.currentCharacter.attributes).map(([attr, value]) => `
                                <div class="attribute-item">
                                    <label>${attr}</label>
                                    <div class="attribute-controls">
                                        <button onclick="characterCreator.adjustAttribute('${attr}', -1)">-</button>
                                        <span class="attribute-value">${value}</span>
                                        <button onclick="characterCreator.adjustAttribute('${attr}', 1)">+</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="attribute-actions">
                            <button onclick="characterCreator.rollAllAttributes()" class="btn btn-secondary">
                                🎲 Roll All Attributes
                            </button>
                            <button onclick="characterCreator.resetAttributes()" class="btn btn-secondary">
                                🔄 Reset to 10
                            </button>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3>Character Sheet Actions</h3>
                        <div class="character-actions">
                            <button onclick="characterCreator.saveCharacter()" class="btn btn-success">
                                💾 Save Character
                            </button>
                            <button onclick="characterCreator.exportCharacter()" class="btn btn-primary">
                                📄 Export Sheet
                            </button>
                            <button onclick="characterCreator.clearCharacter()" class="btn btn-warning">
                                🗑️ Clear Form
                            </button>
                        </div>
                    </div>
                </div>

                <div class="character-preview">
                    <h3>Character Preview</h3>
                    <div class="character-sheet">
                        ${this.renderCharacterPreview()}
                    </div>
                </div>

                <div class="saved-characters">
                    <h3>Saved Characters</h3>
                    <div class="character-list">
                        ${this.renderSavedCharacters()}
                    </div>
                </div>
            </div>
        `;

        this.addCharacterStyles();
    }

    renderCharacterPreview() {
        const char = this.currentCharacter;
        const race = gameData.races[char.race];
        const cls = gameData.classes[char.class];

        return `
            <div class="preview-card">
                <h4>${char.name || 'Unnamed Character'}</h4>
                <p><strong>Race:</strong> ${char.race || 'None selected'}</p>
                <p><strong>Class:</strong> ${char.class || 'None selected'}</p>
                
                ${race ? `
                    <div class="race-info">
                        <p><strong>Race Traits:</strong> ${race.traits.join(', ')}</p>
                        <p>${race.description}</p>
                    </div>
                ` : ''}
                
                ${cls ? `
                    <div class="class-info">
                        <p><strong>Role:</strong> ${cls.role}</p>
                        <p><strong>Hit Points:</strong> ${cls.hit_points}</p>
                        <p><strong>Abilities:</strong> ${cls.special_abilities.join(', ')}</p>
                        <p>${cls.description}</p>
                    </div>
                ` : ''}
                
                <div class="attributes-display">
                    ${Object.entries(char.attributes).map(([attr, value]) => `
                        <div class="attr-display">
                            <span class="attr-name">${attr}:</span>
                            <span class="attr-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSavedCharacters() {
        if (this.savedCharacters.length === 0) {
            return '<p class="no-characters">No saved characters yet.</p>';
        }

        return this.savedCharacters.map((char, index) => `
            <div class="saved-character-item">
                <div class="character-info">
                    <h4>${char.name}</h4>
                    <p>${char.race} ${char.class}</p>
                </div>
                <div class="character-actions">
                    <button onclick="characterCreator.loadCharacter(${index})" class="btn btn-sm btn-secondary">
                        📂 Load
                    </button>
                    <button onclick="characterCreator.deleteCharacter(${index})" class="btn btn-sm btn-danger">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateCharacter(field, value) {
        this.currentCharacter[field] = value;
        this.render();
    }

    adjustAttribute(attribute, change) {
        const newValue = this.currentCharacter.attributes[attribute] + change;
        if (newValue >= 3 && newValue <= 18) {
            this.currentCharacter.attributes[attribute] = newValue;
            this.render();
        }
    }

    rollAllAttributes() {
        Object.keys(this.currentCharacter.attributes).forEach(attr => {
            // 4d6 drop lowest
            const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
            rolls.sort((a, b) => b - a);
            this.currentCharacter.attributes[attr] = rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
        });
        this.render();
    }

    resetAttributes() {
        Object.keys(this.currentCharacter.attributes).forEach(attr => {
            this.currentCharacter.attributes[attr] = 10;
        });
        this.render();
    }

    saveCharacter() {
        if (!this.currentCharacter.name) {
            alert('Please enter a character name before saving.');
            return;
        }

        const characterCopy = JSON.parse(JSON.stringify(this.currentCharacter));
        characterCopy.savedAt = new Date().toISOString();
        
        this.savedCharacters.push(characterCopy);
        this.saveToBrowser();
        this.render();
        
        if (window.app) {
            window.app.showNotification(`Character "${characterCopy.name}" saved successfully!`, 'success');
        }
    }

    loadCharacter(index) {
        if (index >= 0 && index < this.savedCharacters.length) {
            this.currentCharacter = JSON.parse(JSON.stringify(this.savedCharacters[index]));
            delete this.currentCharacter.savedAt;
            this.render();
        }
    }

    deleteCharacter(index) {
        if (index >= 0 && index < this.savedCharacters.length) {
            const character = this.savedCharacters[index];
            if (confirm(`Delete character "${character.name}"?`)) {
                this.savedCharacters.splice(index, 1);
                this.saveToBrowser();
                this.render();
            }
        }
    }

    clearCharacter() {
        if (confirm('Clear current character form?')) {
            this.currentCharacter = this.getEmptyCharacter();
            this.render();
        }
    }

    exportCharacter() {
        if (!this.currentCharacter.name) {
            alert('Please enter a character name before exporting.');
            return;
        }

        const exportData = {
            ...this.currentCharacter,
            exportedAt: new Date().toISOString(),
            gameVersion: gameData.project.version
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.currentCharacter.name.replace(/[^a-zA-Z0-9]/g, '_')}_character.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        if (window.app) {
            window.app.showNotification('Character sheet exported successfully!', 'success');
        }
    }

    saveToBrowser() {
        try {
            localStorage.setItem('dungeon_destiny_characters', JSON.stringify(this.savedCharacters));
        } catch (error) {
            console.error('Failed to save characters:', error);
        }
    }

    loadSavedCharacters() {
        try {
            const saved = localStorage.getItem('dungeon_destiny_characters');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load saved characters:', error);
            return [];
        }
    }

    addCharacterStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .character-creator-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto;
                gap: 2rem;
                max-width: 1200px;
            }

            .character-form {
                grid-column: 1;
                grid-row: 1 / 3;
            }

            .character-preview {
                grid-column: 2;
                grid-row: 1;
            }

            .saved-characters {
                grid-column: 2;
                grid-row: 2;
            }

            .form-section {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .attributes-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .attribute-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                background: var(--bg-tertiary);
                border-radius: var(--border-radius);
            }

            .attribute-controls {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .attribute-controls button {
                width: 30px;
                height: 30px;
                border: none;
                background: var(--primary-color);
                color: white;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .attribute-value {
                min-width: 30px;
                text-align: center;
                font-weight: bold;
                color: var(--text-accent);
            }

            .character-actions, .attribute-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: 1rem;
            }

            .preview-card {
                background: var(--bg-tertiary);
                border: 1px solid var(--border-light);
                border-radius: var(--border-radius);
                padding: 1.5rem;
            }

            .attributes-display {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
                margin-top: 1rem;
            }

            .attr-display {
                display: flex;
                justify-content: space-between;
                padding: 0.25rem 0;
            }

            .saved-character-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                margin-bottom: 0.5rem;
            }

            .character-actions {
                display: flex;
                gap: 0.5rem;
            }

            @media (max-width: 768px) {
                .character-creator-content {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto;
                }

                .character-form,
                .character-preview,
                .saved-characters {
                    grid-column: 1;
                }

                .attributes-grid {
                    grid-template-columns: 1fr;
                }

                .form-row {
                    grid-template-columns: 1fr;
                }
            }
        `;

        if (!document.getElementById('character-creator-styles')) {
            style.id = 'character-creator-styles';
            document.head.appendChild(style);
        }
    }
}

// Initialize character creator globally
let characterCreator;
document.addEventListener('DOMContentLoaded', () => {
    characterCreator = new CharacterCreator();
});