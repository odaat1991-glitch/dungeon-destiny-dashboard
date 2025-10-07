// Game Data for Dungeon Destiny Dashboard
// =======================================

const gameData = {
    "project": {
        "name": "Dungeon Destiny",
        "phase": "Phase 2 - Core Systems Implementation",
        "start_date": "2025-10-07",
        "estimated_completion": "2025-12-30",
        "lead_developer": "Martin Acosta",
        "version": "0.2.0-alpha",
        "progress": 25
    },
    "tasks": [
        {"id": 1, "system": "Character Creation", "task": "Design attribute generation system", "priority": "High", "estimate": 8, "status": "Not Started"},
        {"id": 2, "system": "Character Creation", "task": "Create race/class templates", "priority": "High", "estimate": 12, "status": "In Progress"},
        {"id": 3, "system": "Character Creation", "task": "Implement background system", "priority": "Medium", "estimate": 6, "status": "Not Started"},
        {"id": 4, "system": "Combat Mechanics", "task": "Design initiative system", "priority": "High", "estimate": 4, "status": "Not Started"},
        {"id": 5, "system": "Combat Mechanics", "task": "Create action economy", "priority": "High", "estimate": 8, "status": "Not Started"},
        {"id": 6, "system": "Combat Mechanics", "task": "Implement damage resolution", "priority": "High", "estimate": 10, "status": "Not Started"},
        {"id": 7, "system": "Skill System", "task": "Define skill categories", "priority": "Medium", "estimate": 4, "status": "Planning"},
        {"id": 8, "system": "Skill System", "task": "Create skill challenge mechanics", "priority": "Medium", "estimate": 6, "status": "Planning"},
        {"id": 9, "system": "Magic System", "task": "Design spell schools", "priority": "Low", "estimate": 12, "status": "Not Started"},
        {"id": 10, "system": "Magic System", "task": "Create mana system", "priority": "Low", "estimate": 8, "status": "Not Started"},
        {"id": 11, "system": "Adventures", "task": "Design beginner dungeon", "priority": "High", "estimate": 16, "status": "Not Started"},
        {"id": 12, "system": "Adventures", "task": "Create NPC templates", "priority": "Medium", "estimate": 8, "status": "Not Started"},
        {"id": 13, "system": "Adventures", "task": "Design monster encounters", "priority": "Medium", "estimate": 12, "status": "Not Started"},
        {"id": 14, "system": "Documentation", "task": "Write player handbook", "priority": "High", "estimate": 20, "status": "Not Started"},
        {"id": 15, "system": "Documentation", "task": "Create GM guide", "priority": "High", "estimate": 16, "status": "Not Started"},
        {"id": 16, "system": "Documentation", "task": "Design quick reference sheets", "priority": "Medium", "estimate": 6, "status": "Not Started"}
    ],
    "races": {
        "Human": {
            "attributes": {"Strength": 0, "Dexterity": 0, "Intelligence": 1, "Wisdom": 0, "Charisma": 1, "Constitution": 0},
            "traits": ["Versatile", "Adaptive", "Quick Learner"],
            "description": "Adaptable and ambitious, humans excel at any profession"
        },
        "Dwarf": {
            "attributes": {"Strength": 2, "Dexterity": -1, "Intelligence": 0, "Wisdom": 1, "Charisma": 0, "Constitution": 1},
            "traits": ["Hardy", "Resistant to Magic", "Craftsman"],
            "description": "Stout and resilient, dwarves are master craftsmen and warriors"
        },
        "Elf": {
            "attributes": {"Strength": -1, "Dexterity": 2, "Intelligence": 1, "Wisdom": 1, "Charisma": 0, "Constitution": 0},
            "traits": ["Keen Senses", "Magic Affinity", "Long-lived"],
            "description": "Graceful and wise, elves have natural magical abilities"
        },
        "Halfling": {
            "attributes": {"Strength": -2, "Dexterity": 2, "Intelligence": 0, "Wisdom": 1, "Charisma": 1, "Constitution": 0},
            "traits": ["Lucky", "Stealthy", "Brave"],
            "description": "Small but brave, halflings excel at stealth and survival"
        }
    },
    "classes": {
        "Guardian": {
            "role": "Tank/Defender",
            "primary_attributes": ["Strength", "Wisdom"],
            "hit_points": "High",
            "special_abilities": ["Protective Ward", "Taunt", "Heavy Armor Mastery"],
            "description": "Stalwart defenders who protect their allies from harm"
        },
        "Seeker": {
            "role": "DPS/Striker",
            "primary_attributes": ["Dexterity", "Intelligence"],
            "hit_points": "Medium",
            "special_abilities": ["Precise Strike", "Evasion", "Weapon Expertise"],
            "description": "Agile fighters who strike with precision and speed"
        },
        "Mystic": {
            "role": "Support/Controller",
            "primary_attributes": ["Intelligence", "Wisdom"],
            "hit_points": "Low",
            "special_abilities": ["Arcane Mastery", "Spell Weaving", "Magical Insight"],
            "description": "Masters of magic who control the battlefield"
        },
        "Scout": {
            "role": "Utility/Support",
            "primary_attributes": ["Dexterity", "Wisdom"],
            "hit_points": "Medium",
            "special_abilities": ["Tracking", "Survival", "Ranged Combat"],
            "description": "Versatile explorers skilled in wilderness survival"
        }
    },
    "weapons": [
        {"name": "Shortsword", "damage": "1d6", "type": "Slashing", "properties": ["Finesse", "Light"]},
        {"name": "Longsword", "damage": "1d8", "type": "Slashing", "properties": ["Versatile"]},
        {"name": "Greatsword", "damage": "2d6", "type": "Slashing", "properties": ["Two-handed", "Heavy"]},
        {"name": "Dagger", "damage": "1d4", "type": "Piercing", "properties": ["Finesse", "Light", "Thrown"]},
        {"name": "Crossbow", "damage": "1d8", "type": "Piercing", "properties": ["Ranged", "Loading"]},
        {"name": "Staff", "damage": "1d6", "type": "Bludgeoning", "properties": ["Versatile", "Magic Focus"]},
        {"name": "Warhammer", "damage": "1d8", "type": "Bludgeoning", "properties": ["Versatile"]},
        {"name": "Rapier", "damage": "1d8", "type": "Piercing", "properties": ["Finesse"]},
        {"name": "Shortbow", "damage": "1d6", "type": "Piercing", "properties": ["Ranged", "Two-handed"]}
    ],
    "armor": [
        {"name": "Leather Armor", "ac": 11, "type": "Light", "stealth": "Normal"},
        {"name": "Studded Leather", "ac": 12, "type": "Light", "stealth": "Normal"},
        {"name": "Chain Mail", "ac": 16, "type": "Heavy", "stealth": "Disadvantage"},
        {"name": "Plate Armor", "ac": 18, "type": "Heavy", "stealth": "Disadvantage"},
        {"name": "Shield", "ac": "+2", "type": "Shield", "stealth": "Normal"}
    ],
    "milestones": [
        {"name": "Core Mechanics Complete", "date": "2025-10-28", "priority": "High", "description": "Character creation, basic combat, and skill systems finalized", "status": "Planned"},
        {"name": "First Playtest Ready", "date": "2025-11-11", "priority": "High", "description": "Alpha version ready for internal testing", "status": "Planned"},
        {"name": "Adventure Module Alpha", "date": "2025-11-25", "priority": "Medium", "description": "First adventure scenario completed", "status": "Planned"},
        {"name": "Art Integration", "date": "2025-12-09", "priority": "Medium", "description": "Character sheets and visual assets integrated", "status": "Planned"},
        {"name": "Beta Release", "date": "2025-12-23", "priority": "High", "description": "Feature-complete beta ready for external testing", "status": "Planned"},
        {"name": "Documentation Complete", "date": "2025-12-30", "priority": "Low", "description": "Player handbook and GM guide finalized", "status": "Planned"}
    ],
    "playtests": [
        {
            "id": 1,
            "date": "2025-10-01",
            "participants": ["Alice", "Bob", "Charlie"],
            "scenario": "Character Creation Test",
            "duration": "2 hours",
            "issues": ["Attribute generation too complex", "Race bonuses unclear"],
            "feedback": "Overall positive, need clearer instructions",
            "status": "Complete"
        }
    ],
    "skills": [
        {"name": "Acrobatics", "attribute": "Dexterity", "description": "Balance, tumbling, and aerial maneuvers"},
        {"name": "Animal Handling", "attribute": "Wisdom", "description": "Calming and controlling animals"},
        {"name": "Arcana", "attribute": "Intelligence", "description": "Knowledge of magic and magical theory"},
        {"name": "Athletics", "attribute": "Strength", "description": "Climbing, jumping, swimming"},
        {"name": "Deception", "attribute": "Charisma", "description": "Lying and misdirection"},
        {"name": "History", "attribute": "Intelligence", "description": "Knowledge of past events"},
        {"name": "Insight", "attribute": "Wisdom", "description": "Reading people and situations"},
        {"name": "Intimidation", "attribute": "Charisma", "description": "Using fear to influence others"},
        {"name": "Investigation", "attribute": "Intelligence", "description": "Finding clues and solving mysteries"},
        {"name": "Medicine", "attribute": "Wisdom", "description": "Healing and medical knowledge"},
        {"name": "Nature", "attribute": "Intelligence", "description": "Knowledge of the natural world"},
        {"name": "Perception", "attribute": "Wisdom", "description": "Spotting hidden things"},
        {"name": "Performance", "attribute": "Charisma", "description": "Entertaining others"},
        {"name": "Persuasion", "attribute": "Charisma", "description": "Convincing others"},
        {"name": "Religion", "attribute": "Intelligence", "description": "Knowledge of deities and religious practices"},
        {"name": "Sleight of Hand", "attribute": "Dexterity", "description": "Manual dexterity and pickpocketing"},
        {"name": "Stealth", "attribute": "Dexterity", "description": "Moving unseen and unheard"},
        {"name": "Survival", "attribute": "Wisdom", "description": "Wilderness navigation and tracking"}
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gameData;
}