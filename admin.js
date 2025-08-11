// Global variables
let currentEditMode = null; // 'boss' or 'item'
let currentEditId = null; // bossId
let currentEditItemIndex = null; // itemIndex, -1 for new item

// Admin panel değişkenleri (legacy - keeping for compatibility)
let currentEditBossId = null;
let isEditingBoss = false;

// Spec iconları ve bilgileri (WoW'daki gerçek iconlar - WoWhead CDN)
const specData = {
    // Warrior
    'warrior-arms': { name: 'Arms', icon: '⚔️', class: 'Warrior', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_savageblow.jpg' },
    'warrior-fury': { name: 'Fury', icon: '⚔️', class: 'Warrior', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_innerrage.jpg' },
    'warrior-protection': { name: 'Protection', icon: '🛡️', class: 'Warrior', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_warrior_defensivestance.jpg' },
    
    // Paladin
    'paladin-holy': { name: 'Holy', icon: '✨', class: 'Paladin', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg' },
    'paladin-protection': { name: 'Protection', icon: '🛡️', class: 'Paladin', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_devotionaura.jpg' },
    'paladin-retribution': { name: 'Retribution', icon: '⚔️', class: 'Paladin', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_auraoflight.jpg' },
    
    // Hunter
    'hunter-beast-mastery': { name: 'Beast Mastery', icon: '🏹', class: 'Hunter', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_hunter_bestialdiscipline.jpg' },
    'hunter-marksmanship': { name: 'Marksmanship', icon: '🏹', class: 'Hunter', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_hunter_focusedaim.jpg' },
    'hunter-survival': { name: 'Survival', icon: '🏹', class: 'Hunter', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_hunter_camouflage.jpg' },
    
    // Rogue
    'rogue-assassination': { name: 'Assassination', icon: '🗡️', class: 'Rogue', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadlybrew.jpg' },
    'rogue-outlaw': { name: 'Outlaw', icon: '🗡️', class: 'Rogue', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_rogue_waylay.jpg' },
    'rogue-subtlety': { name: 'Subtlety', icon: '🗡️', class: 'Rogue', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_stealth.jpg' },
    
    // Priest
    'priest-discipline': { name: 'Discipline', icon: '✨', class: 'Priest', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_powerwordshield.jpg' },
    'priest-holy': { name: 'Holy', icon: '✨', class: 'Priest', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_guardianspirit.jpg' },
    'priest-shadow': { name: 'Shadow', icon: '🌙', class: 'Priest', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg' },
    
    // Shaman
    'shaman-elemental': { name: 'Elemental', icon: '⚡', class: 'Shaman', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg' },
    'shaman-enhancement': { name: 'Enhancement', icon: '⚡', class: 'Shaman', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shaman_improvedstormstrike.jpg' },
    'shaman-restoration': { name: 'Restoration', icon: '⚡', class: 'Shaman', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_magicimmunity.jpg' },
    
    // Mage
    'mage-arcane': { name: 'Arcane', icon: '🔮', class: 'Mage', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_magicalsentry.jpg' },
    'mage-fire': { name: 'Fire', icon: '🔥', class: 'Mage', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_fire_firebolt02.jpg' },
    'mage-frost': { name: 'Frost', icon: '❄️', class: 'Mage', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_frostbolt02.jpg' },
    
    // Warlock
    'warlock-affliction': { name: 'Affliction', icon: '💀', class: 'Warlock', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_deathcoil.jpg' },
    'warlock-demonology': { name: 'Demonology', icon: '👹', class: 'Warlock', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_metamorphosis.jpg' },
    'warlock-destruction': { name: 'Destruction', icon: '🔥', class: 'Warlock', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_shadow_rainoffire.jpg' },
    
    // Monk
    'monk-brewmaster': { name: 'Brewmaster', icon: '🍺', class: 'Monk', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_monk_brewmaster_spec.jpg' },
    'monk-mistweaver': { name: 'Mistweaver', icon: '☁️', class: 'Monk', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_monk_mistweaver_spec.jpg' },
    'monk-windwalker': { name: 'Windwalker', icon: '👊', class: 'Monk', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_monk_windwalker_spec.jpg' },
    
    // Druid
    'druid-balance': { name: 'Balance', icon: '🌙', class: 'Druid', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_starfall.jpg' },
    'druid-feral': { name: 'Feral', icon: '🐾', class: 'Druid', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_druid_catform.jpg' },
    'druid-guardian': { name: 'Guardian', icon: '🐻', class: 'Druid', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_racial_bearform.jpg' },
    'druid-restoration': { name: 'Restoration', icon: '🌿', class: 'Druid', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_healingtouch.jpg' },
    
    // Demon Hunter
    'demon-hunter-havoc': { name: 'Havoc', icon: '⚔️', class: 'Demon Hunter', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_specdps.jpg' },
    'demon-hunter-vengeance': { name: 'Vengeance', icon: '🛡️', class: 'Demon Hunter', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_spectank.jpg' },
    
    // Death Knight
    'death-knight-blood': { name: 'Blood', icon: '🩸', class: 'Death Knight', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_bloodpresence.jpg' },
    'death-knight-frost': { name: 'Frost', icon: '❄️', class: 'Death Knight', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_frostpresence.jpg' },
    'death-knight-unholy': { name: 'Unholy', icon: '💀', class: 'Death Knight', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_unholypresence.jpg' },
    
    // Evoker
    'evoker-devastation': { name: 'Devastation', icon: '🐉', class: 'Evoker', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_devastation.jpg' },
    'evoker-preservation': { name: 'Preservation', icon: '🐉', class: 'Evoker', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_preservation.jpg' },
    'evoker-augmentation': { name: 'Augmentation', icon: '🐉', class: 'Evoker', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_augmentation.jpg' },
    
    // Tüm spec'ler
    'all': { name: 'All Specs', icon: '🌟', class: 'All', iconUrl: '' }
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Veri yüklendikten sonra çağrılacak
    console.log('Admin panel hazır, veri bekleniyor...');
    
    // Spec filter event listeners
    document.getElementById('bisSpecsFilter').addEventListener('input', function() {
        filterSpecCheckboxes('editBisSpecs', this.value);
    });
    
    document.getElementById('goodsForFilter').addEventListener('input', function() {
        filterSpecCheckboxes('editGoodsFor', this.value);
    });
    
    // Backdrop click to close popup
    document.getElementById('editFormBackdrop').addEventListener('click', function(e) {
        if (e.target === this) {
            cancelEdit();
        }
    });
    
    // Item search functionality
    document.getElementById('itemSearchInput').addEventListener('input', function() {
        performItemSearch(this.value);
    });
    
    // Clear item search input when focused
    document.getElementById('itemSearchInput').addEventListener('focus', function() {
        // Clear the input when focused
        this.value = '';
        // Clear search highlights
        clearSearchHighlights();
    });
    
    // Initialize display
    if (window.lootData) {
        displayBosses();
        populateSpecCheckboxes();
        populateGoodsForCheckboxes();
    }
});

// Spec checkbox'larını filtrele
function filterSpecCheckboxes(containerId, searchTerm) {
    const container = document.getElementById(containerId);
    const checkboxes = container.querySelectorAll('.spec-checkbox');
    const classHeaders = container.querySelectorAll('div[style*="font-weight: bold"]');
    
    searchTerm = searchTerm.toLowerCase();
    
    // Class başlıklarını gizle/göster
    classHeaders.forEach(header => {
        const className = header.textContent.toLowerCase();
        const hasVisibleSpecs = Array.from(checkboxes).some(checkbox => {
            const label = checkbox.querySelector('label');
            // Extract the spec name from the label by finding the spec name in specData
            const input = checkbox.querySelector('input');
            const specId = input.value;
            const specInfo = specData[specId];
            const specName = specInfo ? specInfo.name.toLowerCase() : '';
            
            return specName.includes(searchTerm) && checkbox.closest('div').contains(header);
        });
        
        if (searchTerm === '' || hasVisibleSpecs) {
            header.style.display = 'block';
        } else {
            header.style.display = 'none';
        }
    });
    
    // Spec checkbox'larını filtrele
    checkboxes.forEach(checkbox => {
        const label = checkbox.querySelector('label');
        // Extract the spec name from the label by finding the spec name in specData
        const input = checkbox.querySelector('input');
        const specId = input.value;
        const specInfo = specData[specId];
        const specName = specInfo ? specInfo.name.toLowerCase() : '';
        
        if (specName.includes(searchTerm)) {
            checkbox.style.display = 'flex';
        } else {
            checkbox.style.display = 'none';
        }
    });
}

// JSON verilerini güncelle ve localStorage'a kaydet
function updateAndReload() {
    // localStorage'a kaydet
    localStorage.setItem('lootData', JSON.stringify(window.lootData, null, 2));
    
    // Display'i yenile
    displayBosses();
    
    console.log('✅ Değişiklikler localStorage\'a kaydedildi');
    console.log('📊 Güncel veri:', window.lootData);
}

// Boss'ları göster
function displayBosses() {
    const bossList = document.getElementById('bossList');
    bossList.innerHTML = '';
    
    Object.entries(window.lootData.bosses).forEach(([bossId, bossData]) => {
        const bossCard = document.createElement('div');
        bossCard.className = 'boss-card';
        bossCard.setAttribute('data-boss-id', bossId);
        
        const itemsHTML = bossData.items.map((item, index) => {
            // Item icon'u için HTML
            const itemIcon = item.iconUrl ? 
                `<img src="${item.iconUrl}" alt="${item.name}" class="item-icon" onerror="this.style.display='none';" title="${item.name}">` : 
                `<div class="item-icon-fallback">⚔️</div>`;
            
            return `
            <div class="item-card">
                <div class="item-header">
                    ${itemIcon}
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-details">
                            ${item.slot ? `Slot: ${item.slot}` : ''}
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-small" onclick="editItem('${bossId}', ${index})" title="Edit Item">✏️</button>
                        <button class="btn btn-danger btn-small" onclick="deleteItem('${bossId}', ${index})" title="Delete Item">🗑️</button>
                    </div>
                </div>
                ${item.secondaryStats ? `
                <div class="secondary-stats-display">
                    <div class="specs-header">Stats:</div>
                    <span class="secondary-stats-value">${item.secondaryStats}</span>
                </div>
                ` : ''}
                <div class="bis-specs-display">
                    <div class="specs-header">BIS Specs:</div>
                    ${item.bisSpecs && item.bisSpecs.length > 0 ? item.bisSpecs.map(spec => {
                        const specInfo = specData[spec] || { name: spec, icon: '❓', iconUrl: '' };
                        const iconElement = specInfo.iconUrl ? 
                            `<img src="${specInfo.iconUrl}" alt="${specInfo.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${specInfo.class} - ${specInfo.name}">` : 
                            `<span class="spec-icon-fallback">${specInfo.icon}</span>`;
                        return `<span class="bis-spec" title="${specInfo.class} - ${specInfo.name}">${iconElement} ${specInfo.name}</span>`;
                    }).join('') : '<span style="color: #888; font-style: italic;">No BIS specs assigned</span>'}
                </div>
                <div class="goods-for-display">
                    <div class="specs-header">Goods For:</div>
                    ${item.goodsFor && item.goodsFor.length > 0 ? item.goodsFor.map(spec => {
                        const specInfo = specData[spec] || { name: spec, icon: '❓', iconUrl: '' };
                        const iconElement = specInfo.iconUrl ? 
                            `<img src="${specInfo.iconUrl}" alt="${specInfo.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${specInfo.class} - ${specInfo.name}">` : 
                            `<span class="spec-icon-fallback">${specInfo.icon}</span>`;
                        return `<span class="goods-spec" title="${specInfo.class} - ${specInfo.name}">${iconElement} ${specInfo.name}</span>`;
                    }).join('') : '<span style="color: #888; font-style: italic;">No specs assigned</span>'}
                </div>
            </div>
        `}).join('');
        
        bossCard.innerHTML = `
            <div class="boss-header" onclick="toggleBossItems('${bossId}')" style="cursor: pointer;">
                <div class="boss-name">
                    <span class="boss-toggle" id="toggle-${bossId}">▶️</span>
                    ${bossData.name} (${bossData.items.length})
                </div>
                <div class="btn-group" onclick="event.stopPropagation();">
                    <button class="btn btn-primary btn-small" onclick="editBoss('${bossId}')" title="Edit Boss">✏️</button>
                    <button class="btn btn-success btn-small" onclick="addItem('${bossId}')" title="Add Item">➕</button>
                    <button class="btn btn-danger btn-small" onclick="deleteBoss('${bossId}')" title="Delete Boss">🗑️</button>
                </div>
            </div>
            <div class="item-list" id="items-${bossId}" style="display: none;">
                ${itemsHTML}
            </div>
        `;
        
        bossList.appendChild(bossCard);
    });
}

// Boss item'larını aç/kapat
function toggleBossItems(bossId) {
    const itemsContainer = document.getElementById(`items-${bossId}`);
    const toggleIcon = document.getElementById(`toggle-${bossId}`);
    
    if (itemsContainer.style.display === 'none') {
        itemsContainer.style.display = 'grid';
        toggleIcon.textContent = '🔽';
    } else {
        itemsContainer.style.display = 'none';
        toggleIcon.textContent = '▶️';
    }
}

// Spec checkbox'larını doldur
function populateSpecCheckboxes() {
    const specContainer = document.getElementById('editBisSpecs');
    specContainer.innerHTML = '';
    
    // Class'ları grupla
    const classGroups = {};
    Object.entries(specData).forEach(([specId, specInfo]) => {
        if (specId !== 'all') {
            if (!classGroups[specInfo.class]) {
                classGroups[specInfo.class] = [];
            }
            classGroups[specInfo.class].push({ id: specId, ...specInfo });
        }
    });
    
    // Class'lara göre spec'leri ekle
    Object.entries(classGroups).forEach(([className, specs]) => {
        // Class başlığı
        const classHeader = document.createElement('div');
        classHeader.style.cssText = 'font-weight: bold; color: #ffd700; margin: 10px 0 5px 0; font-size: 0.9rem;';
        classHeader.textContent = className;
        specContainer.appendChild(classHeader);
        
        // Spec'leri ekle
        specs.forEach(spec => {
            const checkbox = document.createElement('div');
            checkbox.className = 'spec-checkbox';
            const iconElement = spec.iconUrl ? 
                `<img src="${spec.iconUrl}" alt="${spec.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${spec.class} - ${spec.name}">` : 
                `<span class="spec-icon-fallback">${spec.icon}</span>`;
            checkbox.innerHTML = `
                <input type="checkbox" id="bis_spec_${spec.id}" value="${spec.id}">
                <label for="bis_spec_${spec.id}" data-class="${spec.class}">${iconElement} ${spec.name}</label>
            `;
            specContainer.appendChild(checkbox);
        });
    });
}

// Goods For checkbox'larını doldur
function populateGoodsForCheckboxes() {
    const specContainer = document.getElementById('editGoodsFor');
    specContainer.innerHTML = '';
    
    // Class'ları grupla
    const classGroups = {};
    Object.entries(specData).forEach(([specId, specInfo]) => {
        if (specId !== 'all') {
            if (!classGroups[specInfo.class]) {
                classGroups[specInfo.class] = [];
            }
            classGroups[specInfo.class].push({ id: specId, ...specInfo });
        }
    });
    
    // Class'lara göre spec'leri ekle
    Object.entries(classGroups).forEach(([className, specs]) => {
        // Class başlığı
        const classHeader = document.createElement('div');
        classHeader.style.cssText = 'font-weight: bold; color: #ffd700; margin: 10px 0 5px 0; font-size: 0.9rem;';
        classHeader.textContent = className;
        specContainer.appendChild(classHeader);
        
        // Spec'leri ekle
        specs.forEach(spec => {
            const checkbox = document.createElement('div');
            checkbox.className = 'spec-checkbox';
            const iconElement = spec.iconUrl ? 
                `<img src="${spec.iconUrl}" alt="${spec.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${spec.class} - ${spec.name}">` : 
                `<span class="spec-icon-fallback">${spec.icon}</span>`;
            checkbox.innerHTML = `
                <input type="checkbox" id="goods_spec_${spec.id}" value="${spec.id}">
                <label for="goods_spec_${spec.id}" data-class="${spec.class}">${iconElement} ${spec.name}</label>
            `;
            specContainer.appendChild(checkbox);
        });
    });
}

// Boss düzenleme
function editBoss(bossId) {
    const boss = window.lootData.bosses[bossId];
    if (!boss) return;

    document.getElementById('editFormTitle').textContent = 'Edit Boss';
    document.getElementById('editBossId').value = bossId;
    document.getElementById('editBossName').value = boss.name;
    
    // Show boss fields, hide item fields
    document.getElementById('bossFields').style.display = 'flex';
    document.querySelectorAll('.form-row:not(#bossFields)').forEach(row => {
        row.style.display = 'none';
    });
    
    document.getElementById('deleteButton').style.display = 'none';
    
    // Show popup
    document.getElementById('editFormBackdrop').style.display = 'block';
    document.getElementById('editForm').style.display = 'block';
    
    // Ensure popup is centered
    const editForm = document.getElementById('editForm');
    editForm.style.position = 'fixed';
    editForm.style.top = '50%';
    editForm.style.left = '50%';
    editForm.style.transform = 'translate(-50%, -50%)';
    editForm.style.zIndex = '1002';
    
    currentEditMode = 'boss';
    currentEditId = bossId;
}

// Item düzenleme
function editItem(bossId, itemIndex) {
    const item = window.lootData.bosses[bossId].items[itemIndex];
    if (!item) return;

    document.getElementById('editFormTitle').textContent = 'Edit Item';
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemIconUrl').value = item.iconUrl || '';
    document.getElementById('editItemSlot').value = item.slot || '';
    document.getElementById('editSecondaryStats').value = item.secondaryStats || '';
    
    // Hide boss fields, show item fields
    document.getElementById('bossFields').style.display = 'none';
    document.querySelectorAll('.form-row:not(#bossFields)').forEach(row => {
        row.style.display = 'flex';
    });
    
    document.getElementById('deleteButton').style.display = 'inline-block';
    
    // Populate spec checkboxes
    populateSpecCheckboxes();
    populateGoodsForCheckboxes();
    
    // Set existing values
    if (item.bisSpecs) {
        item.bisSpecs.forEach(specId => {
            const checkbox = document.getElementById(`bis_spec_${specId}`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    if (item.goodsFor) {
        item.goodsFor.forEach(specId => {
            const checkbox = document.getElementById(`goods_spec_${specId}`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Show popup
    document.getElementById('editFormBackdrop').style.display = 'block';
    document.getElementById('editForm').style.display = 'block';
    
    // Ensure popup is centered
    const editForm = document.getElementById('editForm');
    editForm.style.position = 'fixed';
    editForm.style.top = '50%';
    editForm.style.left = '50%';
    editForm.style.transform = 'translate(-50%, -50%)';
    editForm.style.zIndex = '1002';
    
    currentEditMode = 'item';
    currentEditId = bossId;
    currentEditItemIndex = itemIndex;
}

// Yeni boss ekleme
function addNewBoss() {
    const bossId = prompt('Enter Boss ID (e.g., boss9):');
    if (!bossId) return;
    
    if (window.lootData.bosses[bossId]) {
        alert('This Boss ID already exists!');
        return;
    }
    
    const bossName = prompt('Enter Boss name:');
    if (!bossName) return;
    
    window.lootData.bosses[bossId] = {
        name: bossName,
        items: []
    };
    
    displayBosses();
    updateAndReload();
}

// Item ekleme
function addItem(bossId) {
    document.getElementById('editFormTitle').textContent = 'Add New Item';
    document.getElementById('editItemName').value = '';
    document.getElementById('editItemIconUrl').value = '';
    document.getElementById('editItemSlot').value = '';
    document.getElementById('editSecondaryStats').value = '';
    
    // Hide boss fields, show item fields
    document.getElementById('bossFields').style.display = 'none';
    document.querySelectorAll('.form-row:not(#bossFields)').forEach(row => {
        row.style.display = 'flex';
    });
    
    document.getElementById('deleteButton').style.display = 'none';
    
    // Clear and populate spec checkboxes
    populateSpecCheckboxes();
    populateGoodsForCheckboxes();
    
    // Clear filter inputs
    document.getElementById('bisSpecsFilter').value = '';
    document.getElementById('goodsForFilter').value = '';
    filterSpecCheckboxes('editBisSpecs', '');
    filterSpecCheckboxes('editGoodsFor', '');
    
    // Show popup
    document.getElementById('editFormBackdrop').style.display = 'block';
    document.getElementById('editForm').style.display = 'block';
    
    // Ensure popup is centered
    const editForm = document.getElementById('editForm');
    editForm.style.position = 'fixed';
    editForm.style.top = '50%';
    editForm.style.left = '50%';
    editForm.style.transform = 'translate(-50%, -50%)';
    editForm.style.zIndex = '1002';
    
    currentEditMode = 'item';
    currentEditId = bossId;
    currentEditItemIndex = -1; // -1 indicates new item
}

// URL dönüştürme fonksiyonu - tiny gif'i large jpg'e çevir
function convertIconUrl(url) {
    if (!url) return url;
    
    // tiny -> large ve gif -> jpg dönüştür
    let convertedUrl = url
        .replace('/icons/tiny/', '/icons/large/')
        .replace('.gif', '.jpg');
    
    console.log('🔄 URL dönüştürüldi:', url, '->', convertedUrl);
    return convertedUrl;
}

// Düzenlemeyi kaydet
function saveEdit() {
    if (currentEditMode === 'boss') {
        // Boss düzenleme
        const bossId = currentEditId;
        const newBossName = document.getElementById('editBossName').value.trim();
        
        if (!newBossName) {
            alert('Boss name is required!');
            return;
        }
        
        window.lootData.bosses[bossId].name = newBossName;
        console.log('Boss updated:', bossId, newBossName);
        
    } else if (currentEditMode === 'item') {
        // Item düzenleme/ekleme
        const bossId = currentEditId;
        const itemName = document.getElementById('editItemName').value.trim();
        const itemIconUrl = document.getElementById('editItemIconUrl').value.trim();
        const itemSlot = document.getElementById('editItemSlot').value;
        
        if (!itemName) {
            alert('Item name is required!');
            return;
        }
        
        if (!itemSlot) {
            alert('Item slot is required!');
            return;
        }
        
        // Convert icon URL
        const convertedIconUrl = convertIconUrl(itemIconUrl);
        
        // Get selected specs
        const selectedBisSpecs = Array.from(document.querySelectorAll('#editBisSpecs input:checked')).map(cb => cb.value);
        const selectedGoodsFor = Array.from(document.querySelectorAll('#editGoodsFor input:checked')).map(cb => cb.value);
        const secondaryStats = document.getElementById('editSecondaryStats').value.trim();
        
        const item = {
            name: itemName,
            iconUrl: convertedIconUrl,
            slot: itemSlot,
            bisSpecs: selectedBisSpecs,
            goodsFor: selectedGoodsFor,
            secondaryStats: secondaryStats || undefined
        };
        
        if (currentEditItemIndex === -1) {
            // Yeni item ekleme
            if (!window.lootData.bosses[bossId].items) {
                window.lootData.bosses[bossId].items = [];
            }
            window.lootData.bosses[bossId].items.push(item);
            console.log('New item added to boss:', bossId, item);
        } else {
            // Mevcut item düzenleme
            window.lootData.bosses[bossId].items[currentEditItemIndex] = item;
            console.log('Item updated:', bossId, currentEditItemIndex, item);
        }
    }
    
    // Save to localStorage and update display
    updateAndReload();
    
    // Close popup
    cancelEdit();
    
    console.log('Data saved to localStorage. Use Export to File to update loot-data.json');
}

// Düzenlemeyi iptal et
function cancelEdit() {
    document.getElementById('editFormBackdrop').style.display = 'none';
    document.getElementById('editForm').style.display = 'none';
    
    // Reset form
    document.getElementById('editFormTitle').textContent = 'Edit Item';
    document.getElementById('editBossId').value = '';
    document.getElementById('editBossName').value = '';
    document.getElementById('editItemName').value = '';
    document.getElementById('editItemIconUrl').value = '';
    document.getElementById('editItemSlot').value = '';
    document.getElementById('editSecondaryStats').value = '';
    
    // Clear filter inputs
    document.getElementById('bisSpecsFilter').value = '';
    document.getElementById('goodsForFilter').value = '';
    filterSpecCheckboxes('editBisSpecs', '');
    filterSpecCheckboxes('editGoodsFor', '');
    
    // Reset popup positioning
    const editForm = document.getElementById('editForm');
    editForm.style.position = '';
    editForm.style.top = '';
    editForm.style.left = '';
    editForm.style.transform = '';
    editForm.style.zIndex = '';
    
    currentEditMode = null;
    currentEditId = null;
    currentEditItemIndex = null;
}

// Item silme
function deleteItem(bossId, itemIndex) {
    if (confirm('Are you sure you want to delete this item?')) {
        window.lootData.bosses[bossId].items.splice(itemIndex, 1);
        displayBosses();
        updateAndReload();
        
        // Close popup after deletion
        cancelEdit();
    }
}

// Boss silme
function deleteBoss(bossId) {
    if (confirm('Are you sure you want to delete this boss and all its items?')) {
        delete window.lootData.bosses[bossId];
        displayBosses();
        updateAndReload();
        
        // Close popup after deletion
        cancelEdit();
    }
}

// Export fonksiyonu - localStorage'daki veriyi JSON dosyası olarak indir
function exportToFile() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';
    
    // localStorage'daki güncel veriyi al
    const dataString = JSON.stringify(window.lootData, null, 2);
    
    // Debug: localStorage verisini console'a yazdır
    console.log('=== DEBUG: localStorage\'dan JSON Export ===');
    console.log('localStorage verisi:', window.lootData);
    console.log('JSON String:', dataString);
    console.log('Dosya adı: loot-data.json');
    console.log('Dosya boyutu:', dataString.length, 'karakter');
    console.log('==========================================');
    
    // Simulate file writing process with loading animation
    setTimeout(() => {
        const blob = new Blob([dataString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'loot-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Hide loading overlay
        loadingOverlay.style.display = 'none';
        
        // Show success message with detailed instructions
        console.log('✅ loot-data.json dosyası başarıyla oluşturuldu!');
        console.log('📁 İndirilen dosya: loot-data.json');
        console.log('📊 Dosya içeriği:', dataString);
        
        alert('✅ İşlem tamamlandı!');
    }, 2000); // 2 second delay to show loading animation
}

// JSON dosyasından veri yükle
function loadFromJSON() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';
    
    console.log('📂 loot-data.json dosyasından veri yükleniyor...');
    
    fetch('loot-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('loot-data.json dosyası bulunamadı!');
            }
            return response.json();
        })
        .then(data => {
            // Migrate old 'icon' field to 'iconUrl' if needed
            Object.values(data.bosses).forEach(boss => {
                if (boss.items) {
                    boss.items.forEach(item => {
                        if (item.icon && !item.iconUrl) {
                            item.iconUrl = item.icon;
                            delete item.icon;
                            console.log('🔄 Migrated icon field to iconUrl for item:', item.name);
                        }
                    });
                }
            });
            
            // localStorage'a kaydet
            localStorage.setItem('lootData', JSON.stringify(data, null, 2));
            window.lootData = data;
            
            // Display'i yenile
            displayBosses();
            
            // Auto-open first boss menu if data is loaded
            const bossIds = Object.keys(data.bosses);
            if (bossIds.length > 0) {
                const firstBossId = bossIds[0];
                const firstBossCard = document.querySelector(`[data-boss-id="${firstBossId}"]`);
                if (firstBossCard) {
                    const itemList = firstBossCard.querySelector('.item-list');
                    const toggleIcon = document.getElementById(`toggle-${firstBossId}`);
                    
                    if (itemList && itemList.style.display === 'none') {
                        itemList.style.display = 'grid';
                        if (toggleIcon) {
                            toggleIcon.textContent = '🔽';
                        }
                        console.log(`📂 First boss menu opened: ${firstBossId}`);
                    }
                }
            }
            
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
            
            console.log('✅ loot-data.json dosyasından veri başarıyla yüklendi!');
            console.log('📊 Yüklenen veri:', window.lootData);
            
            alert(`✅ loot-data.json dosyasından veri başarıyla yüklendi!\n\n📊 Yüklenen veri:\n- Boss sayısı: ${Object.keys(data.bosses).length}\n- Toplam item sayısı: ${Object.values(data.bosses).reduce((total, boss) => total + boss.items.length, 0)}\n\n💾 Veriler localStorage'a kaydedildi.`);
        })
        .catch(error => {
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
            
            console.error('❌ loot-data.json yüklenemedi:', error);
            alert('❌ HATA: loot-data.json dosyası yüklenemedi!\n\nLütfen loot-data.json dosyasının proje klasöründe olduğundan emin olun.');
        });
}

// Item Search Functions
function performItemSearch(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    // Clear previous highlights
    clearSearchHighlights();
    
    if (searchTermLower === '') {
        // If search is empty, show all items normally
        displayBosses();
        return;
    }
    
    // Search through all bosses and items
    const bossList = document.getElementById('bossList');
    const bossCards = bossList.querySelectorAll('.boss-card');
    
    let foundItems = 0;
    
    bossCards.forEach(bossCard => {
        const bossName = bossCard.querySelector('.boss-name').textContent;
        const itemCards = bossCard.querySelectorAll('.item-card');
        let bossHasMatchingItems = false;
        
        itemCards.forEach(itemCard => {
            const itemName = itemCard.querySelector('.item-name').textContent;
            const itemSlot = itemCard.querySelector('.item-details')?.textContent || '';
            
            // Check if item name or slot contains search term
            if (itemName.toLowerCase().includes(searchTermLower) || 
                itemSlot.toLowerCase().includes(searchTermLower)) {
                
                // Show the matching item
                itemCard.style.display = 'block';
                itemCard.classList.add('highlighted');
                bossHasMatchingItems = true;
                foundItems++;
                
                // Ensure the boss section is expanded to show the item
                const bossId = bossCard.getAttribute('data-boss-id');
                const itemList = bossCard.querySelector('.item-list');
                if (itemList.style.display === 'none') {
                    itemList.style.display = 'grid';
                    const toggleIcon = document.getElementById(`toggle-${bossId}`);
                    if (toggleIcon) {
                        toggleIcon.textContent = '🔽';
                    }
                }
            } else {
                // Hide non-matching items
                itemCard.style.display = 'none';
            }
        });
        
        // Show boss if it has matching items, hide if not
        if (bossHasMatchingItems) {
            bossCard.style.display = 'block';
        } else {
            bossCard.style.display = 'none';
        }
    });
    
    // Show search results summary
    if (foundItems > 0) {
        console.log(`🔍 Search results: Found ${foundItems} items matching "${searchTerm}"`);
    } else {
        console.log(`🔍 No items found matching "${searchTerm}"`);
    }
}

function clearSearchHighlights() {
    // Remove highlighted class from all elements and restore display
    const highlightedElements = document.querySelectorAll('.highlighted');
    highlightedElements.forEach(element => {
        element.classList.remove('highlighted');
    });
    
    // Restore display of all boss cards and item cards
    const bossCards = document.querySelectorAll('.boss-card');
    bossCards.forEach(bossCard => {
        bossCard.style.display = 'block';
        const itemCards = bossCard.querySelectorAll('.item-card');
        itemCards.forEach(itemCard => {
            itemCard.style.display = 'block';
        });
    });
}

function clearItemSearch() {
    const searchInput = document.getElementById('itemSearchInput');
    searchInput.value = '';
    clearSearchHighlights();
    displayBosses(); // Refresh display to show all items normally
    console.log('🔍 Item search cleared');
}

// Set secondary stats from preset buttons
function setSecondaryStats(stats) {
    const inputField = document.getElementById('editSecondaryStats');
    if (inputField) {
        // Format the stats: capitalize first letter of each stat and add spaces around /
        const formattedStats = stats
            .split('/')
            .map(stat => stat.charAt(0).toUpperCase() + stat.slice(1).toLowerCase())
            .join(' / ');
        
        inputField.value = formattedStats;
        console.log(`✅ Secondary stats set to: ${formattedStats}`);
    } else {
        console.error('❌ editSecondaryStats input field not found');
    }
} 