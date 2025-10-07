// Character Creation System
// =========================

class CharacterCreator {
    constructor() {
        this.currentCharacter = null;
        this.rollHistory = [];
    }

    init(container) {
        this.renderCharacterCreator(container);
    }

    renderCharacterCreator(container) {
        container.innerHTML = `
            <div class="character-creator-grid">
                <div class="character-form card">
                    <h3>Create New Character</h3>
                    <div class="form-group">
                        <label for="characterName">Character Name</label>
                        <input type="text" id="characterName" placeholder="Enter character name">
                    </div>

                    <div class="form-group">
                        <label for="characterRace">Race</label>
                        <select id="characterRace" onchange="characterCreator.updateRaceInfo()">
                            <option value="">Select Race</option>
                            ${Object.keys(gameData.races).map(race => 
                                `<option value="${race}">${race}</option>`
                            ).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="characterClass">Class</label>
                        <select id="characterClass" onchange="characterCreator.updateClassInfo()">
                            <option value="">Select Class</option>
                            ${Object.keys(gameData.classes).map(cls => 
                                `<option value="${cls}">${cls}</option>`
                            ).join('')}
                        </select>
                    </div>

                    <div class="attributes-section">
                        <h4>Attributes</h4>
                        <button type="button" onclick="characterCreator.rollAttributes()" class="btn btn-primary">
                            🎲 Roll Attributes
                        </button>
                        <div id="attributesContainer">
                            <!-- Attributes will be populated here -->
                        </div>
                    </div>

                    <div class="form-actions">
                        <button onclick="characterCreator.createCharacter()" class="btn btn-success">
                            ⚔️ Create Character
                        </button>
                        <button onclick="characterCreator.clearForm()" class="btn btn-secondary">
                            🔄 Clear Form
                        </button>
                    </div>
                </div>

                <div class="character-info card">
                    <div id="raceInfo" class="info-section" style="display: none;">
                        <h4>Race Information</h4>
                        <div id="raceDetails"></div>
                    </div>

                    <div id="classInfo" class="info-section" style="display: none;">
                        <h4>Class Information</h4>
                        <div id="classDetails"></div>
                    </div>

                    <div id="characterPreview" class="info-section" style="display: none;">
                        <h4>Character Preview</h4>
                        <div id="previewDetails"></div>
                    </div>
                </div>

                <div class="created-characters card">
                    <h3>Created Characters</h3>
                    <div id="charactersList">
                        <p class="placeholder">No characters created yet.</p>
                    </div>
                </div>
            </div>
        `;

        this.addCharacterCreatorStyles();
        this.loadSavedCharacters();
    }

    rollAttributes() {
        const attributes = ['Strength', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma', 'Constitution'];
        const rolledStats = {};

        attributes.forEach(attr => {
            // Roll 4d6, drop lowest
            const rolls = [this.rollD6(), this.rollD6(), this.rollD6(), this.rollD6()];
            rolls.sort((a, b) => b - a);
            rolledStats[attr] = rolls[0] + rolls[1] + rolls[2];
        });

        this.displayAttributes(rolledStats);
        this.rollHistory.push({timestamp: new Date(), stats: rolledStats});
    }

    rollD6() {
        return Math.floor(Math.random() * 6) + 1;
    }

    displayAttributes(stats) {
        const container = document.getElementById('attributesContainer');
        container.innerHTML = `
            <div class="attributes-grid">
                ${Object.entries(stats).map(([attr, value]) => `
                    <div class="attribute-item">
                        <label>${attr}</label>
                        <input type="number" id="${attr.toLowerCase()}" value="${value}" min="3" max="18">
                        <span class="modifier">(${this.getModifier(value)})</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    updateRaceInfo() {
        const selectedRace = document.getElementById('characterRace').value;
        const raceInfo = document.getElementById('raceInfo');

        if (selectedRace && gameData.races[selectedRace]) {
            const race = gameData.races[selectedRace];
            document.getElementById('raceDetails').innerHTML = `
                <p><strong>Description:</strong> ${race.description}</p>
                <p><strong>Traits:</strong> ${race.traits.join(', ')}</p>
                <p><strong>Attribute Modifiers:</strong></p>
                <ul>
                    ${Object.entries(race.attributes).map(([attr, mod]) => 
                        mod !== 0 ? `<li>${attr}: ${mod > 0 ? '+' : ''}${mod}</li>` : ''
                    ).filter(item => item).join('')}
                </ul>
            `;
            raceInfo.style.display = 'block';
        } else {
            raceInfo.style.display = 'none';
        }

        this.updatePreview();
    }

    updateClassInfo() {
        const selectedClass = document.getElementById('characterClass').value;
        const classInfo = document.getElementById('classInfo');

        if (selectedClass && gameData.classes[selectedClass]) {
            const charClass = gameData.classes[selectedClass];
            document.getElementById('classDetails').innerHTML = `
                <p><strong>Role:</strong> ${charClass.role}</p>
                <p><strong>Description:</strong> ${charClass.description}</p>
                <p><strong>Hit Points:</strong> ${charClass.hit_points}</p>
                <p><strong>Primary Attributes:</strong> ${charClass.primary_attributes.join(', ')}</p>
                <p><strong>Special Abilities:</strong></p>
                <ul>
                    ${charClass.special_abilities.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
            `;
            classInfo.style.display = 'block';
        } else {
            classInfo.style.display = 'none';
        }

        this.updatePreview();
    }

    updatePreview() {
        const name = document.getElementById('characterName')?.value;
        const race = document.getElementById('characterRace')?.value;
        const charClass = document.getElementById('characterClass')?.value;

        if (name && race && charClass) {
            const preview = document.getElementById('characterPreview');
            const raceData = gameData.races[race];
            const classData = gameData.classes[charClass];

            document.getElementById('previewDetails').innerHTML = `
                <h5>${name}</h5>
                <p><strong>${race} ${charClass}</strong></p>
                <p><em>${classData.description}</em></p>
                <div class="preview-stats">
                    <small>Racial Traits: ${raceData.traits.join(', ')}</small>
                </div>
            `;
            preview.style.display = 'block';
        }
    }

    createCharacter() {
        const character = this.gatherCharacterData();

        if (!this.validateCharacter(character)) {
            return;
        }

        // Save character
        if (!gameData.characters) gameData.characters = [];
        character.id = Date.now();
        gameData.characters.push(character);

        // Save to localStorage
        if (window.saveSystem) {
            window.saveSystem.saveData();
        }

        this.displayCreatedCharacters();
        this.clearForm();

        if (window.app) {
            window.app.showNotification(`✅ Character "${character.name}" created successfully!`, 'success');
        }
    }

    gatherCharacterData() {
        const attributes = {};
        ['strength', 'dexterity', 'intelligence', 'wisdom', 'charisma', 'constitution'].forEach(attr => {
            const element = document.getElementById(attr);
            attributes[attr] = element ? parseInt(element.value) : 10;
        });

        return {
            name: document.getElementById('characterName')?.value || '',
            race: document.getElementById('characterRace')?.value || '',
            class: document.getElementById('characterClass')?.value || '',
            attributes: attributes,
            level: 1,
            hitPoints: this.calculateHitPoints(attributes.constitution, document.getElementById('characterClass')?.value),
            created: new Date().toISOString()
        };
    }

    calculateHitPoints(constitution, characterClass) {
        const modifier = this.getModifier(constitution);
        const baseHP = gameData.classes[characterClass]?.hit_points === 'High' ? 12 : 
                      gameData.classes[characterClass]?.hit_points === 'Medium' ? 8 : 6;
        return Math.max(1, baseHP + modifier);
    }

    validateCharacter(character) {
        if (!character.name.trim()) {
            alert('Please enter a character name');
            return false;
        }
        if (!character.race) {
            alert('Please select a race');
            return false;
        }
        if (!character.class) {
            alert('Please select a class');
            return false;
        }
        return true;
    }

    clearForm() {
        document.getElementById('characterName').value = '';
        document.getElementById('characterRace').value = '';
        document.getElementById('characterClass').value = '';
        document.getElementById('attributesContainer').innerHTML = '';
        document.getElementById('raceInfo').style.display = 'none';
        document.getElementById('classInfo').style.display = 'none';
        document.getElementById('characterPreview').style.display = 'none';
    }

    loadSavedCharacters() {
        this.displayCreatedCharacters();
    }

    displayCreatedCharacters() {
        const container = document.getElementById('charactersList');
        const characters = gameData.characters || [];

        if (characters.length === 0) {
            container.innerHTML = '<p class="placeholder">No characters created yet.</p>';
            return;
        }

        container.innerHTML = characters.map(char => `
            <div class="character-card">
                <h5>${char.name}</h5>
                <p>${char.race} ${char.class} (Level ${char.level})</p>
                <p>HP: ${char.hitPoints}</p>
                <small>Created: ${new Date(char.created).toLocaleDateString()}</small>
                <div class="character-actions">
                    <button onclick="characterCreator.viewCharacter(${char.id})" class="btn btn-sm">View</button>
                    <button onclick="characterCreator.deleteCharacter(${char.id})" class="btn btn-sm btn-error">Delete</button>
                </div>
            </div>
        `).join('');
    }

    viewCharacter(id) {
        const character = gameData.characters?.find(c => c.id === id);
        if (!character) return;

        alert(`Character Sheet:\n\nName: ${character.name}\nRace: ${character.race}\nClass: ${character.class}\nLevel: ${character.level}\nHP: ${character.hitPoints}\n\nAttributes:\n${Object.entries(character.attributes).map(([attr, value]) => `${attr}: ${value} (${this.getModifier(value)})`).join('\n')}`);
    }

    deleteCharacter(id) {
        if (confirm('Are you sure you want to delete this character?')) {
            gameData.characters = gameData.characters?.filter(c => c.id !== id) || [];
            this.displayCreatedCharacters();
            if (window.saveSystem) {
                window.saveSystem.saveData();
            }
        }
    }

    addCharacterCreatorStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .character-creator-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
            }

            .character-form {
                grid-row: span 2;
            }

            .form-group {
                margin-bottom: 1rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--accent-text);
            }

            .form-group input,
            .form-group select {
                width: 100%;
                padding: 0.75rem;
                background: var(--tertiary-bg);
                border: 1px solid var(--border);
                border-radius: 6px;
                color: var(--primary-text);
                font-size: 0.875rem;
            }

            .attributes-section {
                margin: 1.5rem 0;
                padding: 1rem;
                background: var(--tertiary-bg);
                border-radius: 8px;
            }

            .attributes-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-top: 1rem;
            }

            .attribute-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .attribute-item label {
                font-size: 0.75rem;
                color: var(--secondary-text);
                margin-bottom: 0.25rem;
            }

            .attribute-item input {
                width: 60px;
                text-align: center;
                margin-bottom: 0.25rem;
            }

            .modifier {
                font-size: 0.75rem;
                color: var(--muted-text);
            }

            .form-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
            }

            .info-section {
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: var(--tertiary-bg);
                border-radius: 8px;
            }

            .character-card {
                padding: 1rem;
                background: var(--tertiary-bg);
                border-radius: 8px;
                margin-bottom: 1rem;
            }

            .character-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }

            .btn-sm {
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
            }

            @media (max-width: 768px) {
                .character-creator-grid {
                    grid-template-columns: 1fr;
                }

                .attributes-grid {
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

// Create global instance
const characterCreator = new CharacterCreator();
window.characterCreator = characterCreator;