// Loot Analysis System
let lootData = {};
let specInfoData = {};
let trinketData = {};
let currentAnalysisResults = [];

// Analysis weights
let analysisWeights = {
    sim: 40,
    stats: 25,
    offset: 20,
    setBonus: 15
};

// Spec data for custom dropdown
const specData = {
    // Warrior
    'warrior-arms': { name: 'Arms', icon: '⚔️', class: 'Warrior', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_savageblow.jpg' },
    'warrior-fury': { name: 'Fury', icon: '⚔️', class: 'Warrior', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_innerrage.jpg' },
    'warrior-protection': { name: 'Protection', icon: '🛡️', class: 'Warrior', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_defensivestance.jpg' },
    
    // Paladin
    'paladin-holy': { name: 'Holy', icon: '✨', class: 'Paladin', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg' },
    'paladin-protection': { name: 'Protection', icon: '🛡️', class: 'Paladin', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_devotionaura.jpg' },
    'paladin-retribution': { name: 'Retribution', icon: '⚔️', class: 'Paladin', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_auraoflight.jpg' },
    
    // Hunter
    'hunter-beast-mastery': { name: 'Beast Mastery', icon: '🏹', class: 'Hunter', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_hunter_bestialdiscipline.jpg' },
    'hunter-marksmanship': { name: 'Marksmanship', icon: '🏹', class: 'Hunter', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_hunter_focusedaim.jpg' },
    'hunter-survival': { name: 'Survival', icon: '🏹', class: 'Hunter', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_hunter_camouflage.jpg' },
    
    // Rogue
    'rogue-assassination': { name: 'Assassination', icon: '🗡️', class: 'Rogue', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadlybrew.jpg' },
    'rogue-outlaw': { name: 'Outlaw', icon: '🗡️', class: 'Rogue', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_rogue_waylay.jpg' },
    'rogue-subtlety': { name: 'Subtlety', icon: '🗡️', class: 'Rogue', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_stealth.jpg' },
    
    // Priest
    'priest-discipline': { name: 'Discipline', icon: '✨', class: 'Priest', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_powerwordshield.jpg' },
    'priest-holy': { name: 'Holy', icon: '✨', class: 'Priest', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_guardianspirit.jpg' },
    'priest-shadow': { name: 'Shadow', icon: '🌙', class: 'Priest', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg' },
    
    // Shaman
    'shaman-elemental': { name: 'Elemental', icon: '⚡', class: 'Shaman', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg' },
    'shaman-enhancement': { name: 'Enhancement', icon: '⚡', class: 'Shaman', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shaman_improvedstormstrike.jpg' },
    'shaman-restoration': { name: 'Restoration', icon: '⚡', class: 'Shaman', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_magicimmunity.jpg' },
    
    // Mage
    'mage-arcane': { name: 'Arcane', icon: '🔮', class: 'Mage', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_magicalsentry.jpg' },
    'mage-fire': { name: 'Fire', icon: '🔥', class: 'Mage', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_fire_firebolt02.jpg' },
    'mage-frost': { name: 'Frost', icon: '❄️', class: 'Mage', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_frostbolt02.jpg' },
    
    // Warlock
    'warlock-affliction': { name: 'Affliction', icon: '💀', class: 'Warlock', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_deathcoil.jpg' },
    'warlock-demonology': { name: 'Demonology', icon: '👹', class: 'Warlock', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_metamorphosis.jpg' },
    'warlock-destruction': { name: 'Destruction', icon: '🔥', class: 'Warlock', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_rainoffire.jpg' },
    
    // Druid
    'druid-balance': { name: 'Balance', icon: '🌙', class: 'Druid', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_starfall.jpg' },
    'druid-feral': { name: 'Feral', icon: '🐾', class: 'Druid', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_druid_catform.jpg' },
    'druid-guardian': { name: 'Guardian', icon: '🐻', class: 'Druid', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_racial_bearform.jpg' },
    'druid-restoration': { name: 'Restoration', icon: '🌿', class: 'Druid', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_healingtouch.jpg' },
    
    // Death Knight
    'death-knight-blood': { name: 'Blood', icon: '🩸', class: 'Death Knight', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_bloodpresence.jpg' },
    'death-knight-frost': { name: 'Frost', icon: '❄️', class: 'Death Knight', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_frostpresence.jpg' },
    'death-knight-unholy': { name: 'Unholy', icon: '💀', class: 'Death Knight', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_unholypresence.jpg' },
    
    // Demon Hunter
    'demon-hunter-havoc': { name: 'Havoc', icon: '👁️', class: 'Demon Hunter', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_specdps.jpg' },
    'demon-hunter-vengeance': { name: 'Vengeance', icon: '🛡️', class: 'Demon Hunter', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_spectank.jpg' },
    
    // Monk
    'monk-brewmaster': { name: 'Brewmaster', icon: '🍺', class: 'Monk', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/monk_stance_drunkenox.jpg' },
    'monk-mistweaver': { name: 'Mistweaver', icon: '☁️', class: 'Monk', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/monk_stance_wisdom.jpg' },
    'monk-windwalker': { name: 'Windwalker', icon: '👊', class: 'Monk', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/monk_stance_whitetiger.jpg' },
    
    // Evoker
    'evoker-devastation': { name: 'Devastation', icon: '🐉', class: 'Evoker', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_evoker_devastation.jpg' },
    'evoker-preservation': { name: 'Preservation', icon: '💎', class: 'Evoker', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_evoker_preservation.jpg' },
    'evoker-augmentation': { name: 'Augmentation', icon: '✨', class: 'Evoker', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_evoker_augmentation.jpg' }
};

// Initialize the analysis system
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM Content Loaded - Starting initialization');
    
    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
    
    try {
        // Load data first
        await loadData();
        
        // Setup UI after data is loaded
        setupEventListeners();
        populateFilters();
        
        // Only perform analysis if data is available
        if (lootData && Object.keys(lootData).length > 0) {
            performAnalysis();
        } else {
            console.warn('No loot data available for initial analysis');
        }
        
        console.log('Initialization completed successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    } finally {
        // Hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
});

// Load all necessary data
async function loadData() {
    console.log('Loading data files...');
    
    try {
        // Load loot data
        const lootResponse = await fetch('loot-data.json');
        lootData = await lootResponse.json();
        console.log('Loot data loaded:', Object.keys(lootData.bosses || {}).length, 'bosses');
        
        // Load spec info data
        const specResponse = await fetch('spec-info-data.json');
        specInfoData = await specResponse.json();
        console.log('Spec data loaded:', Object.keys(specInfoData.specs || {}).length, 'specs');
        
        // Load trinket data
        const trinketResponse = await fetch('trinket-dps-data.json');
        trinketData = await trinketResponse.json();
        console.log('Trinket data loaded');
        
        console.log('All data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Filter controls
    const bossFilter = document.getElementById('bossFilter');
    const slotFilter = document.getElementById('slotFilter');
    const resetFilters = document.getElementById('resetFilters');
    
    if (bossFilter) bossFilter.addEventListener('change', performAnalysis);
    if (slotFilter) slotFilter.addEventListener('change', performAnalysis);
    if (resetFilters) resetFilters.addEventListener('click', resetFiltersFunction);
    
    // Custom spec dropdown functionality
    const specSearchInput = document.getElementById('specSearchInput');
    const specDropdown = document.getElementById('specDropdown');
    
    if (specSearchInput) {
        specSearchInput.addEventListener('input', function() {
            filterSpecOptions(this.value);
        });
        
        specSearchInput.addEventListener('focus', function() {
            toggleSpecDropdown();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (specDropdown && specSearchInput) {
            if (!specDropdown.contains(event.target) && !specSearchInput.contains(event.target)) {
                specDropdown.classList.remove('show');
            }
        }
    });
    
    // Weight sliders
    const simWeight = document.getElementById('simWeight');
    const statsWeight = document.getElementById('statsWeight');
    const offsetWeight = document.getElementById('offsetWeight');
    const setBonusWeight = document.getElementById('setBonusWeight');
    
    if (simWeight) simWeight.addEventListener('input', updateWeights);
    if (statsWeight) statsWeight.addEventListener('input', updateWeights);
    if (offsetWeight) offsetWeight.addEventListener('input', updateWeights);
    if (setBonusWeight) setBonusWeight.addEventListener('input', updateWeights);
    
    // Action buttons
    const exportAnalysis = document.getElementById('exportAnalysis');
    const refreshAnalysis = document.getElementById('refreshAnalysis');
    
    if (exportAnalysis) exportAnalysis.addEventListener('click', exportAnalysis);
    if (refreshAnalysis) refreshAnalysis.addEventListener('click', performAnalysis);
    
    // Sidebar overlay click to close
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', hideSpecDetailsPanel);
    }
    
    // ESC key to close sidebar
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideSpecDetailsPanel();
        }
    });
    
    console.log('Event listeners setup completed');
}

// Populate filter dropdowns
function populateFilters() {
    console.log('Populating filters...');
    
    // Populate boss filter
    const bossFilter = document.getElementById('bossFilter');
    if (bossFilter && lootData && lootData.bosses) {
        bossFilter.innerHTML = '<option value="all">All Bosses</option>';
        Object.keys(lootData.bosses).forEach(bossId => {
            const option = document.createElement('option');
            option.value = bossId;
            option.textContent = lootData.bosses[bossId].name;
            bossFilter.appendChild(option);
        });
        console.log(`Added ${Object.keys(lootData.bosses).length} bosses to filter`);
    } else {
        console.error('No loot data available for boss filter');
    }
    
    // Populate spec filter with custom dropdown
    const specDropdown = document.getElementById('specDropdown');
    const specSearchInput = document.getElementById('specSearchInput');
    
    if (specDropdown && specSearchInput) {
        populateSpecOptions();
        console.log('Custom spec dropdown populated');
    } else {
        console.error('Spec dropdown elements not found');
    }
}

// Populate spec options for custom dropdown
function populateSpecOptions() {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (!dropdownContent) return;
    
    // Clear existing content
    dropdownContent.innerHTML = '';
    
    // Add "All Specs" option
    const allSpecsItem = document.createElement('div');
    allSpecsItem.className = 'dropdown-item';
    allSpecsItem.setAttribute('data-value', 'all');
    allSpecsItem.textContent = 'All Specs';
    allSpecsItem.addEventListener('click', function() {
        selectSpec('all', 'All Specs');
    });
    dropdownContent.appendChild(allSpecsItem);
    
    // Group specs by class
    const classGroups = {};
    Object.entries(specData).forEach(([specId, specInfo]) => {
        if (specId !== 'all') {
            if (!classGroups[specInfo.class]) {
                classGroups[specInfo.class] = [];
            }
            classGroups[specInfo.class].push({ id: specId, ...specInfo });
        }
    });
    
    // Add specs grouped by class
    Object.entries(classGroups).forEach(([className, specs]) => {
        // Create class group
        const groupDiv = document.createElement('div');
        groupDiv.className = 'dropdown-group';
        groupDiv.setAttribute('data-class', className);
        
        // Class header
        const groupHeader = document.createElement('div');
        groupHeader.className = 'dropdown-group-header';
        groupHeader.textContent = className;
        groupDiv.appendChild(groupHeader);
        
        // Specs container
        const groupItems = document.createElement('div');
        groupItems.className = 'dropdown-group-items';
        
        // Add specs
        specs.forEach(spec => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'dropdown-item';
            itemDiv.setAttribute('data-value', spec.id);
            itemDiv.setAttribute('data-spec-name', spec.name.toLowerCase());
            itemDiv.setAttribute('data-class', spec.class);
            
            // Spec icon
            const iconImg = document.createElement('img');
            iconImg.className = 'spec-icon';
            iconImg.src = spec.iconUrl;
            iconImg.alt = spec.name;
            iconImg.onerror = function() {
                this.style.display = 'none';
            };
            
            // Spec name
            const specName = document.createElement('span');
            specName.textContent = spec.name;
            
            itemDiv.appendChild(iconImg);
            itemDiv.appendChild(specName);
            
            // Click event
            itemDiv.addEventListener('click', function() {
                selectSpec(spec.id, spec.name);
            });
            
            groupItems.appendChild(itemDiv);
        });
        
        groupDiv.appendChild(groupItems);
        dropdownContent.appendChild(groupDiv);
    });
    
    // Set default selection
    selectSpec('all', 'All Specs');
}

// Toggle spec dropdown
function toggleSpecDropdown() {
    const dropdown = document.getElementById('specDropdown');
    const specSearchInput = document.getElementById('specSearchInput');
    
    if (dropdown) {
        dropdown.classList.toggle('show');
        
        // Clear the input when dropdown is opened
        if (dropdown.classList.contains('show') && specSearchInput) {
            specSearchInput.value = '';
            specSearchInput.placeholder = 'Search specs...';
        }
    }
}

// Select spec from dropdown
function selectSpec(specId, specName) {
    const specSearchInput = document.getElementById('specSearchInput');
    if (specSearchInput) {
        specSearchInput.value = specName;
        // Clear the search input when a spec is selected
        specSearchInput.placeholder = 'Search specs...';
    }
    
    // Update selected item styling
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-value') === specId) {
            item.classList.add('selected');
        }
    });
    
    // Close dropdown
    const dropdown = document.getElementById('specDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    // Trigger analysis
    performAnalysis();
}

// Filter spec options based on search input
function filterSpecOptions(searchTerm) {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownGroups = document.querySelectorAll('.dropdown-group');
    
    searchTerm = searchTerm.toLowerCase();
    
    // Show/hide dropdown items
    dropdownItems.forEach(item => {
        const specName = item.getAttribute('data-spec-name') || '';
        const className = item.getAttribute('data-class') || '';
        const displayName = item.textContent.toLowerCase();
        
        const matches = specName.includes(searchTerm) || 
                       className.includes(searchTerm) || 
                       displayName.includes(searchTerm);
        
        item.style.display = matches ? 'flex' : 'none';
    });
    
    // Show/hide groups based on visible items
    dropdownGroups.forEach(group => {
        const visibleItems = group.querySelectorAll('.dropdown-item[style="display: flex"]');
        if (searchTerm === '' || visibleItems.length > 0) {
            group.style.display = 'block';
        } else {
            group.style.display = 'none';
        }
    });
}

// Get selected spec from custom dropdown
function getSelectedSpec() {
    const selectedItem = document.querySelector('.dropdown-item.selected');
    if (selectedItem) {
        return selectedItem.getAttribute('data-value');
    }
    return 'all';
}

// Get sim value for display (handles both spec sim and trinket DPS)
function getSimValueForDisplay(item, specId) {
    // If this is a trinket item, use trinket DPS data
    if (item.slot.toLowerCase() === 'trinket' && trinketData && trinketData.trinkets && specId) {
        // Find the trinket in trinket data
        const trinketName = item.name;
        const trinket = Object.values(trinketData.trinkets).find(t => t.name === trinketName);
        
        if (trinket) {
            // Use mythic version for highest values
            const dpsValues = trinket.mythic?.dpsValues || trinket.heroic?.dpsValues || trinket.champion?.dpsValues;
            
            if (dpsValues && dpsValues[specId]) {
                return dpsValues[specId].toLocaleString();
            }
        }
    }
    
    // Fall back to spec sim value for non-trinket items
    const specInfo = specInfoData.specs[specId];
    if (specInfo && specInfo.sim) {
        return specInfo.sim.toLocaleString();
    }
    
    return null;
}

// Update analysis weights
function updateWeights() {
    const simWeight = document.getElementById('simWeight');
    const statsWeight = document.getElementById('statsWeight');
    const offsetWeight = document.getElementById('offsetWeight');
    const setBonusWeight = document.getElementById('setBonusWeight');
    
    if (simWeight) analysisWeights.sim = parseInt(simWeight.value);
    if (statsWeight) analysisWeights.stats = parseInt(statsWeight.value);
    if (offsetWeight) analysisWeights.offset = parseInt(offsetWeight.value);
    if (setBonusWeight) analysisWeights.setBonus = parseInt(setBonusWeight.value);
    
    // Update display values
    const simWeightValue = document.getElementById('simWeightValue');
    const statsWeightValue = document.getElementById('statsWeightValue');
    const offsetWeightValue = document.getElementById('offsetWeightValue');
    const setBonusWeightValue = document.getElementById('setBonusWeightValue');
    
    if (simWeightValue) simWeightValue.textContent = analysisWeights.sim + '%';
    if (statsWeightValue) statsWeightValue.textContent = analysisWeights.stats + '%';
    if (offsetWeightValue) offsetWeightValue.textContent = analysisWeights.offset + '%';
    if (setBonusWeightValue) setBonusWeightValue.textContent = analysisWeights.setBonus + '%';
    
    performAnalysis();
}

// Reset all filters
function resetFiltersFunction() {
    const bossFilter = document.getElementById('bossFilter');
    const slotFilter = document.getElementById('slotFilter');
    const specSearchInput = document.getElementById('specSearchInput');
    
    if (bossFilter) bossFilter.value = 'all';
    if (slotFilter) slotFilter.value = 'all';
    if (specSearchInput) specSearchInput.value = 'All Specs';
    
    // Reset spec dropdown selection
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-value') === 'all') {
            item.classList.add('selected');
        }
    });
    
    performAnalysis();
}

// Perform the main analysis
function performAnalysis() {
    console.log('Performing analysis...');
    
    // Check if data is available
    if (!lootData || !lootData.bosses) {
        console.error('No loot data available for analysis');
        return;
    }
    
    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
    
    const bossFilter = document.getElementById('bossFilter')?.value || 'all';
    const slotFilter = document.getElementById('slotFilter')?.value || 'all';
    const specFilter = getSelectedSpec() || 'all';
    
    console.log('Filters:', { bossFilter, slotFilter, specFilter });
    
    const analysisResults = [];
    
    // Iterate through all items
    Object.keys(lootData.bosses).forEach(bossId => {
        if (bossFilter !== 'all' && bossFilter !== bossId) return;
        
        const boss = lootData.bosses[bossId];
        console.log(`Processing boss: ${boss.name} with ${boss.items.length} items`);
        
        boss.items.forEach(item => {
            if (slotFilter !== 'all' && slotFilter !== item.slot) return;
            
            // Always analyze the item with all specs to get the complete picture
            const itemAnalysis = analyzeItem(item, boss.name, 'all');
            if (itemAnalysis) {
                // If a specific spec is selected, only include items where that spec gets the highest score
                if (specFilter !== 'all') {
                    const topSpec = itemAnalysis.topPrioritySpec;
                    if (topSpec && topSpec.specId === specFilter) {
                        analysisResults.push(itemAnalysis);
                    }
                } else {
                    // If "All Specs" is selected, include all items
                    analysisResults.push(itemAnalysis);
                }
            }
        });
    });
    
    console.log(`Analysis complete. Found ${analysisResults.length} results`);
    
    // Sort by priority score (highest first)
    analysisResults.sort((a, b) => b.priorityScore - a.priorityScore);
    
    // Store results globally
    currentAnalysisResults = analysisResults;
    
    displayAnalysisResults(analysisResults);
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Analyze a single item
function analyzeItem(item, bossName, specFilter) {
    const itemAnalysis = {
        item: item,
        bossName: bossName,
        prioritySpecs: []
    };
    
    // Get all specs that could use this item
    const relevantSpecs = [];
    
    // Add BIS specs
    if (item.bisSpecs) {
        item.bisSpecs.forEach(specId => {
            if (specFilter === 'all' || specFilter === specId) {
                relevantSpecs.push({ specId, priority: 'bis' });
            }
        });
    }
    
    // Add goods for specs
    if (item.goodsFor) {
        item.goodsFor.forEach(specId => {
            if (specFilter === 'all' || specFilter === specId) {
                relevantSpecs.push({ specId, priority: 'goods' });
            }
        });
    }
    
    console.log(`Item ${item.name}: Found ${relevantSpecs.length} relevant specs`);
    
    // Calculate priority score for each spec
    relevantSpecs.forEach(({ specId, priority }) => {
        const specInfo = specInfoData.specs[specId];
        if (!specInfo) {
            console.warn(`Spec info not found for ${specId}`);
            return;
        }
        
        const specAnalysis = calculateSpecPriority(item, specId, specInfo, priority);
        itemAnalysis.prioritySpecs.push(specAnalysis);
    });
    
    // Sort specs by priority score
    itemAnalysis.prioritySpecs.sort((a, b) => b.priorityScore - a.priorityScore);
    
    // If no specific specs, analyze all specs for this item slot
    if (itemAnalysis.prioritySpecs.length === 0) {
        console.log(`No specific specs for ${item.name}, analyzing all specs for ${item.slot} slot`);
        
        Object.keys(specInfoData.specs).forEach(specId => {
            if (specFilter === 'all' || specFilter === specId) {
                const specInfo = specInfoData.specs[specId];
                const specAnalysis = calculateSpecPriority(item, specId, specInfo, 'general');
                itemAnalysis.prioritySpecs.push(specAnalysis);
            }
        });
        
        // Sort specs by priority score
        itemAnalysis.prioritySpecs.sort((a, b) => b.priorityScore - a.priorityScore);
    }
    
    // Get top priority spec
    if (itemAnalysis.prioritySpecs.length > 0) {
        const topSpec = itemAnalysis.prioritySpecs[0];
        itemAnalysis.topPrioritySpec = topSpec;
        itemAnalysis.priorityScore = topSpec.priorityScore;
        return itemAnalysis;
    }
    
    // If still no specs, return a basic analysis
    return {
        item: item,
        bossName: bossName,
        prioritySpecs: [],
        topPrioritySpec: null,
        priorityScore: 0
    };
}

// Calculate priority score for a spec
function calculateSpecPriority(item, specId, specInfo, priority) {
    let totalScore = 0;
    const breakdown = {};
    
    // 1. Sim Value Score (40% weight)
    const simScore = calculateSimScore(specInfo.sim, item, specId);
    breakdown.simScore = simScore;
    totalScore += (simScore * analysisWeights.sim) / 100;
    
    // 2. Secondary Stats Match Score (25% weight)
    const statsScore = calculateStatsMatchScore(item.secondaryStats, specInfo.stats.secondary);
    breakdown.statsScore = statsScore;
    totalScore += (statsScore * analysisWeights.stats) / 100;
    
    // 3. Off-Set Need Score (20% weight)
    const offsetScore = calculateOffsetScore(item, specInfo);
    breakdown.offsetScore = offsetScore;
    totalScore += (offsetScore * analysisWeights.offset) / 100;
    
    // 4. Set Bonus Score (15% weight) - only for tier set items
    const tierSetSlots = ['head', 'shoulder', 'chest', 'legs', 'hands'];
    const isTierSetItem = item.name.toLowerCase().includes('tier set') || 
                         (tierSetSlots.includes(item.slot.toLowerCase()) && item.name.toLowerCase().includes('tier'));
    
    let setBonusScore = 0; // Default score
    if (isTierSetItem) {
        setBonusScore = calculateSetBonusScore(specInfo);
    }
    breakdown.setBonusScore = setBonusScore;
    totalScore += (setBonusScore * analysisWeights.setBonus) / 100;
    
    // Priority multiplier
    const priorityMultiplier = priority === 'bis' ? 1.2 : priority === 'goods' ? 1.0 : 0.8;
    totalScore *= priorityMultiplier;
    
    return {
        specId,
        specInfo,
        priority,
        priorityScore: totalScore,
        breakdown
    };
}

// Calculate sim score (0-100)
function calculateSimScore(simValue, item, specId) {
    // If this is a trinket item, use trinket DPS data
    if (item.slot.toLowerCase() === 'trinket' && trinketData && trinketData.trinkets) {
        // Find the trinket in trinket data
        const trinketName = item.name;
        const trinket = Object.values(trinketData.trinkets).find(t => t.name === trinketName);
        
        if (trinket) {
            // Use mythic version for highest values (you can make this configurable)
            const dpsValues = trinket.mythic?.dpsValues || trinket.heroic?.dpsValues || trinket.champion?.dpsValues;
            
            if (dpsValues && dpsValues[specId]) {
                const trinketDps = dpsValues[specId];
                // Normalize trinket DPS to 0-100 scale
                // Trinket DPS values are typically in the 200k-600k range
                const minTrinketDps = 200000;
                const maxTrinketDps = 600000;
                const normalized = Math.min(Math.max((trinketDps - minTrinketDps) / (maxTrinketDps - minTrinketDps), 0), 1);
                return normalized * 100;
            }
        }
    }
    
    // Fall back to spec sim value for non-trinket items
    if (simValue) {
        // Normalize sim value to 0-100 scale
        // Assuming sim values range from 1M to 10M
        const minSim = 1000000;
        const maxSim = 10000000;
        const normalized = Math.min(Math.max((simValue - minSim) / (maxSim - minSim), 0), 1);
        return normalized * 100;
    }
    
    return 0; // Default score if no data available
}

// Calculate secondary stats match score (0-100)
function calculateStatsMatchScore(itemStats, specStats) {
    if (!itemStats || !specStats) return 0; // No score if no data
    
    const itemStatList = itemStats.toLowerCase().split('/').map(s => s.trim());
    const specStatList = specStats.map(s => s.toLowerCase());
    
    let matchCount = 0;
    itemStatList.forEach(itemStat => {
        if (specStatList.includes(itemStat)) {
            matchCount++;
        }
    });
    
    // Calculate match percentage
    const matchPercentage = (matchCount / itemStatList.length) * 100;
    
    // Bonus for perfect matches
    if (matchCount === itemStatList.length && itemStatList.length === specStatList.length) {
        return 100;
    }
    
    return matchPercentage;
}

// Calculate off-set need score (0-100)
function calculateOffsetScore(item, specInfo) {
    // Tier set slots: Head, Shoulder, Chest, Leg, Hands
    const tierSetSlots = ['head', 'shoulder', 'chest', 'legs', 'hands'];
    const itemSlot = item.slot.toLowerCase();
    
    // If this is not a tier set slot, it's not relevant for off-set calculation
    if (!tierSetSlots.includes(itemSlot)) {
        return 0; // No score for non-tier set slots
    }
    
    // Check if this spec needs an off-set piece for this specific slot
    if (!specInfo.offSet || !specInfo.offSet.item || specInfo.offSet.item === '-') {
        return 0; // No off-set need specified - no score
    }
    
    const offsetItem = specInfo.offSet.item.toLowerCase();
    
    // Check if this item slot matches the off-set need
    if (offsetItem.includes(itemSlot) || itemSlot.includes(offsetItem)) {
        return 100; // Perfect match - this spec needs this slot as off-set
    }
    
    // Check for partial matches using slot keywords
    const slotKeywords = {
        'head': ['helm', 'head'],
        'shoulder': ['shoulder', 'pauldron'],
        'chest': ['chest', 'robe'],
        'legs': ['leg', 'pant'],
        'hands': ['hand', 'glove']
    };
    
    const itemKeywords = slotKeywords[itemSlot] || [];
    for (const keyword of itemKeywords) {
        if (offsetItem.includes(keyword)) {
            return 75; // Partial match
        }
    }
    
    // This is a tier set slot, but this spec doesn't need it as off-set
    // They probably want the tier set piece instead
    return 25; // Low score - this spec doesn't need this slot as off-set
}

// Calculate set bonus score (0-100)
function calculateSetBonusScore(specInfo) {
    const setBonus2p = specInfo.setBonus2p || 0;
    const setBonus4p = specInfo.setBonus4p || 0;
    
    // Default: Everyone starts with 0 set pieces
    // Calculate score based on potential set bonus gains
    
    let totalScore = 0;
    
    // 2-set bonus potential (40% weight for 2-set)
    if (setBonus2p > 0) {
        // Normalize 2-set bonus to 0-100 scale
        // Assuming set bonuses range from 0% to 30%
        const normalized2p = Math.min(Math.max((setBonus2p / 30) * 100, 0), 100);
        totalScore += normalized2p * 0.4; // 40% weight for 2-set
    }
    
    // 4-set bonus potential (60% weight for 4-set)
    if (setBonus4p > 0) {
        // Normalize 4-set bonus to 0-100 scale
        // Assuming set bonuses range from 0% to 30%
        const normalized4p = Math.min(Math.max((setBonus4p / 30) * 100, 0), 100);
        totalScore += normalized4p * 0.6; // 60% weight for 4-set
    }
    
    return totalScore;
}

// Display analysis results
function displayAnalysisResults(results) {
    console.log(`Displaying ${results.length} analysis results`);
    
    const tableBody = document.getElementById('analysisTableBody');
    if (!tableBody) {
        console.error('Table body not found');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (results.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10" class="no-results">No items found matching the current filters</td></tr>';
        return;
    }
    
    results.forEach(result => {
        const row = document.createElement('tr');
        
        // Item info
        const itemCell = document.createElement('td');
        itemCell.innerHTML = `
            <div class="item-info">
                <img src="${result.item.iconUrl}" alt="${result.item.name}" class="item-icon">
                <div>
                    <div class="item-name">${result.item.name}</div>
                    <div class="boss-name">${result.bossName}</div>
                </div>
            </div>
        `;
        
        // Slot
        const slotCell = document.createElement('td');
        slotCell.textContent = result.item.slot;
        
        // Secondary stats
        const statsCell = document.createElement('td');
        statsCell.textContent = result.item.secondaryStats || 'N/A';
        
        // Top priority spec
        const topSpecCell = document.createElement('td');
        if (result.topPrioritySpec) {
            const spec = result.topPrioritySpec.specInfo;
            topSpecCell.innerHTML = `
                <div class="spec-info">
                    <img src="${spec.iconUrl}" alt="${spec.name}" class="spec-icon">
                    <span>${spec.class} - ${spec.name}</span>
                </div>
            `;
        } else {
            topSpecCell.textContent = 'No specific priority';
        }
        
        // Priority score
        const scoreCell = document.createElement('td');
        if (result.topPrioritySpec && result.topPrioritySpec.breakdown) {
            scoreCell.innerHTML = `
                <div class="priority-score">
                    <span class="score-value">${result.priorityScore.toFixed(1)}</span>
                    <div class="score-breakdown">
                        <div class="breakdown-item">
                            <span class="label">Sim:</span>
                            <span class="value">${result.topPrioritySpec.breakdown.simScore.toFixed(1)}</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="label">Stats:</span>
                            <span class="value">${result.topPrioritySpec.breakdown.statsScore.toFixed(1)}</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="label">Off-Set:</span>
                            <span class="value">${result.topPrioritySpec.breakdown.offsetScore.toFixed(1)}</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="label">Set:</span>
                            <span class="value">${result.topPrioritySpec.breakdown.setBonusScore.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            scoreCell.innerHTML = `
                <div class="priority-score">
                    <span class="score-value">${result.priorityScore.toFixed(1)}</span>
                    <div class="score-breakdown">
                        <div class="breakdown-item">
                            <span class="label">No analysis available</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Sim value
        const simCell = document.createElement('td');
        const simValue = getSimValueForDisplay(result.item, result.topPrioritySpec?.specId);
        simCell.textContent = simValue || 'N/A';
        
        // Stats match
        const statsMatchCell = document.createElement('td');
        statsMatchCell.textContent = result.topPrioritySpec?.breakdown?.statsScore?.toFixed(1) + '%' || 'N/A';
        
        // Off-set need
        const offsetCell = document.createElement('td');
        const tierSetSlots = ['head', 'shoulder', 'chest', 'legs', 'hands'];
        const isTierSetSlot = tierSetSlots.includes(result.item.slot.toLowerCase());
        const isTierSetItem = result.item.name.toLowerCase().includes('tier set') || 
                             (isTierSetSlot && result.item.name.toLowerCase().includes('tier'));
        
        if (isTierSetSlot) {
            const spec = result.topPrioritySpec?.specInfo;
            const itemSlot = result.item.slot.toLowerCase();
            
            if (spec?.offSet?.item && spec.offSet.item !== '-') {
                const offsetItem = spec.offSet.item.toLowerCase();
                
                // Check if this specific slot is needed as off-set
                const isOffSetSlot = offsetItem.includes(itemSlot) || itemSlot.includes(offsetItem) ||
                                   (itemSlot === 'head' && offsetItem.includes('helm')) ||
                                   (itemSlot === 'shoulder' && offsetItem.includes('pauldron')) ||
                                   (itemSlot === 'chest' && offsetItem.includes('robe')) ||
                                   (itemSlot === 'legs' && (offsetItem.includes('leg') || offsetItem.includes('pant'))) ||
                                   (itemSlot === 'hands' && (offsetItem.includes('hand') || offsetItem.includes('glove')));
                
                if (isOffSetSlot) {
                    offsetCell.innerHTML = `
                        <div class="offset-info">
                            <span class="offset-slot">${spec.offSet.item}</span>
                            <span class="offset-label">(Needed as Off-Set)</span>
                        </div>
                    `;
                } else {
                    offsetCell.innerHTML = `
                        <div class="offset-info">
                            <span class="offset-slot">Tier Set</span>
                            <span class="offset-label">(Wants Tier Set)</span>
                        </div>
                    `;
                }
            } else {
                offsetCell.innerHTML = `
                    <div class="offset-info">
                        <span class="offset-slot">Tier Set</span>
                        <span class="offset-label">(No Off-Set Need)</span>
                    </div>
                `;
            }
        } else {
            offsetCell.textContent = 'N/A (Non-Tier)';
        }
        
        // Set bonus
        const setBonusCell = document.createElement('td');
        const spec = result.topPrioritySpec?.specInfo;
        if (spec && isTierSetItem) {
            setBonusCell.innerHTML = `
                <div class="set-bonus-info">
                    <div class="set-bonus-values">${spec.setBonus2p || 0}% / ${spec.setBonus4p || 0}%</div>
                    <div class="set-bonus-label">(Tier Set Item)</div>
                </div>
            `;
        } else if (spec) {
            setBonusCell.innerHTML = `
                <div class="set-bonus-info">
                    <div class="set-bonus-values">${spec.setBonus2p || 0}% / ${spec.setBonus4p || 0}%</div>
                    <div class="set-bonus-label">(Current Set)</div>
                </div>
            `;
        } else {
            setBonusCell.textContent = 'N/A';
        }
        
        // Actions
        const actionsCell = document.createElement('td');
        const viewSpecsBtn = document.createElement('button');
        viewSpecsBtn.className = 'view-specs-btn';
        viewSpecsBtn.textContent = 'View All Specs';
        viewSpecsBtn.addEventListener('click', () => viewSpecDetails(result.item.name));
        actionsCell.appendChild(viewSpecsBtn);
        
        row.appendChild(itemCell);
        row.appendChild(slotCell);
        row.appendChild(statsCell);
        row.appendChild(topSpecCell);
        row.appendChild(scoreCell);
        row.appendChild(simCell);
        row.appendChild(statsMatchCell);
        row.appendChild(offsetCell);
        row.appendChild(setBonusCell);
        row.appendChild(actionsCell);
        
        tableBody.appendChild(row);
    });
}

// View spec details for an item
function viewSpecDetails(itemName) {
    console.log(`Opening spec details for item: ${itemName}`);
    
    // Check if analysis has been performed
    if (currentAnalysisResults.length === 0) {
        console.log('No analysis results available, performing initial analysis...');
        // Perform analysis synchronously for this specific item
        const targetItem = findAndAnalyzeItem(itemName);
        if (targetItem) {
            displaySpecDetailsInPanel(targetItem, itemName);
        } else {
            console.error(`Could not find or analyze item: ${itemName}`);
        }
        return;
    }
    
    // Find the item analysis from current results
    let targetItem = currentAnalysisResults.find(result => result.item.name === itemName);
    
    if (!targetItem) {
        console.error(`Could not find analysis for item: ${itemName} in current results`);
        console.log('Available items:', currentAnalysisResults.map(r => r.item.name));
        // Try to analyze this specific item
        targetItem = findAndAnalyzeItem(itemName);
        if (!targetItem) {
            return;
        }
    }
    
    displaySpecDetailsInPanel(targetItem, itemName);
}

// Find and analyze a specific item
function findAndAnalyzeItem(itemName) {
    console.log(`Finding and analyzing item: ${itemName}`);
    
    // Search through all bosses for this item
    for (const bossId in lootData.bosses) {
        const boss = lootData.bosses[bossId];
        const item = boss.items.find(i => i.name === itemName);
        if (item) {
            console.log(`Found item in boss: ${boss.name}`);
            const specFilter = getSelectedSpec() || 'all';
            return analyzeItem(item, boss.name, specFilter);
        }
    }
    
    console.error(`Item not found: ${itemName}`);
    return null;
}

// Display spec details in sidebar
function displaySpecDetailsInPanel(targetItem, itemName) {
    console.log(`Displaying spec details for item: ${itemName}`);
    console.log(`Found target item with ${targetItem.prioritySpecs.length} priority specs`);
    
    // Update sidebar title
    const sidebarTitle = document.getElementById('specDetailsTitle');
    if (sidebarTitle) {
        sidebarTitle.textContent = `${itemName} - All Spec Priorities`;
    }
    
    // Display spec details in the sidebar
    const specDetails = document.getElementById('specDetails');
    if (!specDetails) {
        console.error('Spec details container not found');
        return;
    }
    
    // Clear existing content
    specDetails.innerHTML = '';
    
    if (targetItem.prioritySpecs.length === 0) {
        specDetails.innerHTML = '<div class="no-specs">No spec analysis available for this item</div>';
        showSpecDetailsPanel();
        return;
    }
    
    // Create spec detail elements
    targetItem.prioritySpecs.forEach((specAnalysis, index) => {
        console.log(`Processing spec ${index + 1}:`, specAnalysis);
        
        if (!specAnalysis || !specAnalysis.specInfo) {
            console.warn(`Invalid spec analysis at index ${index}:`, specAnalysis);
            return;
        }
        
        const spec = specAnalysis.specInfo;
        
        // Create the spec detail item element
        const specDetailItem = document.createElement('div');
        specDetailItem.className = 'spec-detail-item';
        
        // Create the header
        const specHeader = document.createElement('div');
        specHeader.className = 'spec-header';
        
        const specIcon = document.createElement('img');
        specIcon.src = spec.iconUrl;
        specIcon.alt = spec.name;
        specIcon.className = 'spec-icon';
        
        const specName = document.createElement('span');
        specName.className = 'spec-name';
        specName.textContent = `${spec.class} - ${spec.name}`;
        
        const priorityBadge = document.createElement('span');
        priorityBadge.className = `priority-badge ${specAnalysis.priority}`;
        priorityBadge.textContent = specAnalysis.priority.toUpperCase();
        
        const priorityScore = document.createElement('span');
        priorityScore.className = 'priority-score';
        priorityScore.textContent = specAnalysis.priorityScore.toFixed(1);
        
        specHeader.appendChild(specIcon);
        specHeader.appendChild(specName);
        specHeader.appendChild(priorityBadge);
        specHeader.appendChild(priorityScore);
        
        // Create the breakdown
        const specBreakdown = document.createElement('div');
        specBreakdown.className = 'spec-breakdown';
        
        if (specAnalysis.breakdown) {
            const breakdownItems = [
                { label: 'Sim:', value: specAnalysis.breakdown.simScore.toFixed(1) },
                { label: 'Stats Match:', value: specAnalysis.breakdown.statsScore.toFixed(1) + '%' },
                { label: 'Off-Set Need:', value: specAnalysis.breakdown.offsetScore.toFixed(1) },
                { label: 'Set Bonus:', value: specAnalysis.breakdown.setBonusScore.toFixed(1) }
            ];
            
            breakdownItems.forEach(item => {
                const breakdownItem = document.createElement('div');
                breakdownItem.className = 'breakdown-item';
                
                const label = document.createElement('span');
                label.className = 'label';
                label.textContent = item.label;
                
                const value = document.createElement('span');
                value.className = 'value';
                value.textContent = item.value;
                
                breakdownItem.appendChild(label);
                breakdownItem.appendChild(value);
                specBreakdown.appendChild(breakdownItem);
            });
        } else {
            const noBreakdown = document.createElement('div');
            noBreakdown.className = 'breakdown-item';
            noBreakdown.innerHTML = '<span class="label">No breakdown available</span>';
            specBreakdown.appendChild(noBreakdown);
        }
        
        // Assemble the spec detail item
        specDetailItem.appendChild(specHeader);
        specDetailItem.appendChild(specBreakdown);
        
        // Add to the sidebar
        specDetails.appendChild(specDetailItem);
    });
    
    console.log(`Added ${specDetails.children.length} spec detail items to sidebar`);
    
    // Show the sidebar
    showSpecDetailsPanel();
}

// Show the spec details sidebar
function showSpecDetailsPanel() {
    const sidebar = document.getElementById('specDetailsSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.add('open');
    }
    
    if (overlay) {
        overlay.classList.add('active');
    }
}

// Hide the spec details sidebar
function hideSpecDetailsPanel() {
    const sidebar = document.getElementById('specDetailsSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Export analysis results
function exportAnalysis() {
    const bossFilter = document.getElementById('bossFilter')?.value || 'all';
    const slotFilter = document.getElementById('slotFilter')?.value || 'all';
    const specFilter = getSelectedSpec() || 'all';
    
    const exportData = {
        timestamp: new Date().toISOString(),
        filters: {
            boss: bossFilter,
            slot: slotFilter,
            spec: specFilter
        },
        weights: analysisWeights,
        results: []
    };
    
    // Collect current results
    const tableRows = document.querySelectorAll('#analysisTableBody tr');
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 9) {
            exportData.results.push({
                item: cells[0].querySelector('.item-name')?.textContent || '',
                slot: cells[1].textContent,
                secondaryStats: cells[2].textContent,
                topPrioritySpec: cells[3].querySelector('.spec-info span')?.textContent || '',
                priorityScore: parseFloat(cells[4].querySelector('.score-value')?.textContent || '0'),
                simValue: cells[5].textContent,
                statsMatch: cells[6].textContent,
                offsetNeed: cells[7].textContent,
                setBonus: cells[8].textContent
            });
        }
    });
    
    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `loot-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}
