// Global değişkenler
let currentBoss = 'all';
let currentSpec = 'all';
let currentSlot = 'all';
let trinketData = null;
let specInfoData = null;

// DOM elementleri
const lootGrid = document.getElementById('lootGrid');
const bossFilter = document.getElementById('bossFilter');
const specSearchInput = document.getElementById('specSearchInput');
const specDropdown = document.getElementById('specDropdown');

// WoW Item Slot Sistemi
const itemSlots = {
    'head': { name: 'Head', icon: '🪖' },
    'neck': { name: 'Neck', icon: '📿' },
    'shoulder': { name: 'Shoulder', icon: '👔' },
    'back': { name: 'Back', icon: '🧥' },
    'chest': { name: 'Chest', icon: '👕' },
    'wrist': { name: 'Wrist', icon: '⌚' },
    'hand': { name: 'Hands', icon: '🧤' },
    'waist': { name: 'Waist', icon: '👖' },
    'legs': { name: 'Legs', icon: '👖' },
    'feet': { name: 'Feet', icon: '👟' },
    'finger': { name: 'Finger', icon: '💍' },
    'trinket': { name: 'Trinket', icon: '🔮' },
    'main-hand': { name: 'Main Hand', icon: '⚔️' },
    'off-hand': { name: 'Off Hand', icon: '🛡️' },
    'two-hand': { name: 'Two Hand', icon: '🗡️' },
    'ranged': { name: 'Ranged', icon: '🏹' }
};

// Silah Türleri
const weaponTypes = {
    'sword': { name: 'Sword', icon: '⚔️' },
    'axe': { name: 'Axe', icon: '🪓' },
    'mace': { name: 'Mace', icon: '🔨' },
    'dagger': { name: 'Dagger', icon: '🗡️' },
    'polearm': { name: 'Polearm', icon: '🔱' },
    'staff': { name: 'Staff', icon: '📏' },
    'wand': { name: 'Wand', icon: '🪄' },
    'fist': { name: 'Fist Weapon', icon: '👊' },
    'bow': { name: 'Bow', icon: '🏹' },
    'crossbow': { name: 'Crossbow', icon: '🎯' },
    'gun': { name: 'Gun', icon: '🔫' },
    'thrown': { name: 'Thrown', icon: '🎪' },
    'shield': { name: 'Shield', icon: '🛡️' },
    'off-hand-fist': { name: 'Off-hand Fist', icon: '👊' },
    'held-in-off-hand': { name: 'Held in Off-hand', icon: '📖' }
};

// Zırh Türleri
const armorTypes = {
    'cloth': { name: 'Cloth', icon: '🧵' },
    'leather': { name: 'Leather', icon: '🦊' },
    'mail': { name: 'Mail', icon: '🔗' },
    'plate': { name: 'Plate', icon: '🛡️' }
};

// Spec iconları ve bilgileri (WoW'daki gerçek iconlar - WoWhead CDN)
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
    
    // Monk
    'monk-brewmaster': { name: 'Brewmaster', icon: '🍺', class: 'Monk', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_monk_brewmaster_spec.jpg' },
    'monk-mistweaver': { name: 'Mistweaver', icon: '☁️', class: 'Monk', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_monk_mistweaver_spec.jpg' },
    'monk-windwalker': { name: 'Windwalker', icon: '👊', class: 'Monk', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_monk_windwalker_spec.jpg' },
    
    // Druid
    'druid-balance': { name: 'Balance', icon: '🌙', class: 'Druid', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_starfall.jpg' },
    'druid-feral': { name: 'Feral', icon: '🐾', class: 'Druid', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_druid_catform.jpg' },
    'druid-guardian': { name: 'Guardian', icon: '🐻', class: 'Druid', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_racial_bearform.jpg' },
    'druid-restoration': { name: 'Restoration', icon: '🌿', class: 'Druid', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_nature_healingtouch.jpg' },
    
    // Demon Hunter
    'demon-hunter-havoc': { name: 'Havoc', icon: '⚔️', class: 'Demon Hunter', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_specdps.jpg' },
    'demon-hunter-vengeance': { name: 'Vengeance', icon: '🛡️', class: 'Demon Hunter', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_spectank.jpg' },
    
    // Death Knight
    'death-knight-blood': { name: 'Blood', icon: '🩸', class: 'Death Knight', role: 'tank', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_bloodpresence.jpg' },
    'death-knight-frost': { name: 'Frost', icon: '❄️', class: 'Death Knight', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_frostpresence.jpg' },
    'death-knight-unholy': { name: 'Unholy', icon: '💀', class: 'Death Knight', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_unholypresence.jpg' },
    
    // Evoker
    'evoker-devastation': { name: 'Devastation', icon: '🐉', class: 'Evoker', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_devastation.jpg' },
    'evoker-preservation': { name: 'Preservation', icon: '🐉', class: 'Evoker', role: 'healer', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_preservation.jpg' },
    'evoker-augmentation': { name: 'Augmentation', icon: '🐉', class: 'Evoker', role: 'dps', iconUrl: 'https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_augmentation.jpg' },
    
    // Tüm spec'ler
    'all': { name: 'All Specs', icon: '🌟', class: 'All', iconUrl: '' }
};

// Uygulamayı başlat
function initializeApp() {
    // Boss seçeneklerini doldur
    populateBossOptions();
    
    // Spec seçeneklerini doldur
    populateSpecOptions();
    
    // Trinket verilerini yükle
    loadTrinketData();
    
    // Spec Info verilerini yükle
    loadSpecInfoData();
    
    // Trinket popup event listener'larını ekle
    setupTrinketPopup();
    
    // Spec Info popup event listener'larını ekle
    setupSpecInfoPopup();
    
    // Slot filter event listener'ını ekle
    const slotFilter = document.getElementById('slotFilter');
    if (slotFilter) {
        slotFilter.addEventListener('change', filterLoot);
    }
    
    // Reset filters button event listener'ını ekle
    const resetFiltersButton = document.getElementById('resetFiltersButton');
    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', resetAllFilters);
    }
    
    // İlk yükleme
    displayLoot();
}

// Boss seçeneklerini doldur
function populateBossOptions() {
    const bossSelect = document.getElementById('bossFilter');
    
    // Mevcut "Tüm Bosslar" seçeneğini koru
    bossSelect.innerHTML = '<option value="all">All Bosses</option>';
    
    // Boss seçeneklerini ekle
    const bossEntries = Object.entries(window.lootData.bosses);
    bossEntries.forEach(([bossId, bossData]) => {
        const option = document.createElement('option');
        option.value = bossId;
        option.textContent = bossData.name;
        bossSelect.appendChild(option);
    });
    
    // All Bosses'i varsayılan olarak seç
    bossSelect.value = 'all';
    currentBoss = 'all';
}

// Spec seçeneklerini doldur
function populateSpecOptions() {
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // Mevcut "All Specs" seçeneğini koru
    const allSpecsItem = document.createElement('div');
    allSpecsItem.className = 'dropdown-item';
    allSpecsItem.setAttribute('data-value', 'all');
    allSpecsItem.textContent = 'All Specs';
    allSpecsItem.addEventListener('click', function() {
        selectSpec('all', 'All Specs');
    });
    dropdownContent.innerHTML = '';
    dropdownContent.appendChild(allSpecsItem);
    
    // Class'lara göre spec'leri grupla
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
        // Class grubu oluştur
        const groupDiv = document.createElement('div');
        groupDiv.className = 'dropdown-group';
        groupDiv.setAttribute('data-class', className);
        
        // Class başlığı
        const groupHeader = document.createElement('div');
        groupHeader.className = 'dropdown-group-header';
        groupHeader.textContent = className;
        groupDiv.appendChild(groupHeader);
        
        // Spec'ler için container
        const groupItems = document.createElement('div');
        groupItems.className = 'dropdown-group-items';
        
        // Spec'leri ekle
        specs.forEach(spec => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'dropdown-item';
            itemDiv.setAttribute('data-value', spec.id);
            itemDiv.setAttribute('data-spec-name', spec.name.toLowerCase());
            itemDiv.setAttribute('data-class', spec.class);
            
            // Spec icon'u
            const iconImg = document.createElement('img');
            iconImg.className = 'spec-icon';
            iconImg.src = spec.iconUrl;
            iconImg.alt = spec.name;
            iconImg.onerror = function() {
                this.style.display = 'none';
            };
            
            // Spec adı
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
    
    // All Specs'i varsayılan olarak seç
    selectSpec('all', 'All Specs');
}

// Spec arama fonksiyonu
function filterSpecOptions(searchTerm) {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownGroups = document.querySelectorAll('.dropdown-group');
    
    searchTerm = searchTerm.toLowerCase();
    
    // Tüm dropdown item'larını göster/gizle
    dropdownItems.forEach(item => {
        if (item.getAttribute('data-value') === 'all') {
            item.style.display = 'block';
            return;
        }
        
        const specName = item.getAttribute('data-spec-name') || item.textContent.toLowerCase();
        if (specName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Dropdown gruplarını göster/gizle
    dropdownGroups.forEach(group => {
        const visibleItems = Array.from(group.querySelectorAll('.dropdown-item')).filter(item => 
            item.style.display !== 'none' && item.getAttribute('data-value') !== 'all'
        );
        
        if (searchTerm === '' || visibleItems.length > 0) {
            group.style.display = 'block';
        } else {
            group.style.display = 'none';
        }
    });
}

// Dropdown toggle fonksiyonu
function toggleSpecDropdown() {
    const dropdown = document.getElementById('specDropdown');
    dropdown.classList.toggle('show');
}

// Spec seçme fonksiyonu
function selectSpec(specId, specName) {
    currentSpec = specId;
    specSearchInput.value = specName;
    
    // Seçili item'ı güncelle
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-value') === specId) {
            item.classList.add('selected');
        }
    });
    
    // Dropdown'ı kapat
    document.getElementById('specDropdown').classList.remove('show');
    
    // Loot'u filtrele
    filterLoot();
}

// Dropdown dışına tıklandığında kapatma
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('specDropdown');
    const searchInput = document.getElementById('specSearchInput');
    
    if (!dropdown.contains(event.target) && !searchInput.contains(event.target)) {
        dropdown.classList.remove('show');
    }
    

});


// Loot gösterimi
function displayLoot() {
    const items = getFilteredItems();
    
    lootGrid.innerHTML = '';
    
    if (items.length === 0) {
        lootGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #b8c5d6;">
                <h3>No items found matching the selected criteria</h3>
                <p>Try changing the filters</p>
            </div>
        `;
        return;
    }
    
    // All Bosses seçildiğinde boss ismine göre grupla
    if (currentBoss === 'all') {
        // Boss ismine göre grupla
        const groupedItems = {};
        items.forEach(item => {
            if (!groupedItems[item.bossName]) {
                groupedItems[item.bossName] = [];
            }
            groupedItems[item.bossName].push(item);
        });
        
        // Her boss için ayrı bölüm oluştur
        Object.entries(groupedItems).forEach(([bossName, bossItems]) => {
            // Boss başlığı
            const bossHeader = document.createElement('div');
            bossHeader.className = 'boss-section-header';
            bossHeader.style.cssText = `
                grid-column: 1 / -1;
                background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                border: 1px solid #4a4a4a;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0 15px 0;
                text-align: center;
                color: #ffd700;
                font-size: 1.2rem;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            `;
            bossHeader.textContent = bossName;
            lootGrid.appendChild(bossHeader);
            
            // Bu boss'un item'larını göster
            bossItems.forEach(item => {
                displayLootItem(item);
            });
        });
    } else {
        // Tek boss seçildiğinde normal göster
        items.forEach(item => {
            displayLootItem(item);
        });
    }
}

// Tek item gösterimi (yardımcı fonksiyon)
function displayLootItem(item) {
    const lootItem = document.createElement('div');
    lootItem.className = 'loot-item';
    
    const bisSpecsHTML = item.bisSpecs.map(spec => {
        const specInfo = specData[spec] || { name: spec, icon: '❓', iconUrl: '' };
        const iconElement = specInfo.iconUrl ? 
            `<img src="${specInfo.iconUrl}" alt="${specInfo.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${specInfo.class} - ${specInfo.name}">` : 
            `<span class="spec-icon-fallback">${specInfo.icon}</span>`;
        return `<span class="bis-spec" title="${specInfo.class} - ${specInfo.name}">${iconElement} ${specInfo.name}</span>`;
    }).join('');
    
    const goodsForHTML = item.goodsFor ? item.goodsFor.map(spec => {
        const specInfo = specData[spec] || { name: spec, icon: '❓', iconUrl: '' };
        const iconElement = specInfo.iconUrl ? 
            `<img src="${specInfo.iconUrl}" alt="${specInfo.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${specInfo.class} - ${specInfo.name}">` : 
            `<span class="spec-icon-fallback">${specInfo.icon}</span>`;
        return `<span class="goods-spec" title="${specInfo.class} - ${specInfo.name}">${iconElement} ${specInfo.name}</span>`;
    }).join('') : '';
    
    const slotInfo = item.slot ? (itemSlots[item.slot] || { name: item.slot, icon: '❓' }) : { name: 'Unknown Slot', icon: '❓' };

    // Item icon'u için HTML
    const itemIcon = item.iconUrl ? 
        `<img src="${item.iconUrl}" alt="${item.name}" class="item-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${item.name}">` : 
        `<div class="item-icon-fallback">⚔️</div>`;
    
    // Stats section
    const statsSection = item.secondaryStats ? 
        `<div class="secondary-stats">
            <strong style="color: #ff6b6b; font-weight: 600; font-size: 0.85rem;">Stats:</strong><br>
            <span style="color: #ff6b6b; font-weight: 500;">${item.secondaryStats}</span>
        </div>` : 
        `<div class="secondary-stats">
            <strong style="color: #ff6b6b; font-weight: 600; font-size: 0.85rem;">Stats:</strong><br>
            <span style="color: #888; font-style: italic;">Not specified</span>
        </div>`;
    
    // BIS Specs section with updated styling
    const bisSpecsSection = item.bisSpecs && item.bisSpecs.length > 0 ? 
        `<div class="bis-specs">
            <strong style="color: #ffd700; font-weight: 600; font-size: 0.85rem;">BIS Specs:</strong><br>
            ${bisSpecsHTML}
        </div>` : 
        `<div class="bis-specs">
            <strong style="color: #ffd700; font-weight: 600; font-size: 0.85rem;">BIS Specs:</strong><br>
            <span style="color: #888; font-style: italic;">No BIS specs assigned</span>
        </div>`;
    
    // Goods For section with updated styling
    const goodsForSection = item.goodsFor && item.goodsFor.length > 0 ? 
        `<div class="goods-for">
            <strong style="color: #2ed573; font-weight: 600; font-size: 0.85rem;">Goods For:</strong><br>
            ${goodsForHTML}
        </div>` : 
        `<div class="goods-for">
            <strong style="color: #2ed573; font-weight: 600; font-size: 0.85rem;">Goods For:</strong><br>
            <span style="color: #888; font-style: italic;">No specs assigned</span>
        </div>`;
    
    lootItem.innerHTML = `
        <div class="item-header">
            ${itemIcon}
            <div class="item-info">
                <h3>${item.name}</h3>
                <div style="color: #b8c5d6; font-size: 0.9rem; margin-top: 5px;">
                    <strong>Slot:</strong> ${slotInfo.name}
                </div>
            </div>
        </div>
        ${statsSection}
        ${bisSpecsSection}
        ${goodsForSection}
    `;
    
    lootGrid.appendChild(lootItem);
}

// Filtrelenmiş itemları al
function getFilteredItems() {
    let allItems = [];
    
    // Tüm itemları topla
    Object.entries(window.lootData.bosses).forEach(([bossId, bossData]) => {
        bossData.items.forEach(item => {
            allItems.push({
                ...item,
                bossId: bossId,
                bossName: bossData.name
            });
        });
    });
    
    // Boss filtreleme
    if (currentBoss !== 'all') {
        allItems = allItems.filter(item => item.bossId === currentBoss);
    }
    
    // Spec filtreleme
    if (currentSpec !== 'all') {
        allItems = allItems.filter(item => {
            // BIS Specs'te veya Goods For'da seçili spec var mı kontrol et
            const hasBisSpec = item.bisSpecs && item.bisSpecs.includes(currentSpec);
            const hasGoodsFor = item.goodsFor && item.goodsFor.includes(currentSpec);
            return hasBisSpec || hasGoodsFor;
        });
    }
    
    // Slot filtreleme
    if (currentSlot !== 'all') {
        allItems = allItems.filter(item => {
            return item.slot === currentSlot;
        });
    }
    
    return allItems;
}

// Loot filtreleme
function filterLoot() {
    currentBoss = bossFilter.value;
    currentSlot = document.getElementById('slotFilter').value;
    // currentSpec is already set by selectSpec function
    
    displayLoot();
}

// Tüm filtreleri sıfırla
function resetAllFilters() {
    // Global değişkenleri sıfırla
    currentBoss = 'all';
    currentSpec = 'all';
    currentSlot = 'all';
    
    // HTML elementlerini sıfırla
    const bossFilter = document.getElementById('bossFilter');
    const slotFilter = document.getElementById('slotFilter');
    const specSearchInput = document.getElementById('specSearchInput');
    
    if (bossFilter) bossFilter.value = 'all';
    if (slotFilter) slotFilter.value = 'all';
    if (specSearchInput) specSearchInput.value = 'All Specs';
    
    // Spec dropdown'ını sıfırla
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-value') === 'all') {
            item.classList.add('selected');
        }
    });
    
    // Loot'u yeniden göster
    displayLoot();
}

// Item'ın boss adını al
function getBossNameByItem(item) {
    for (const [bossId, bossData] of Object.entries(window.lootData.bosses)) {
        if (bossData.items.some(bossItem => bossItem.name === item.name)) {
            return bossData.name;
        }
    }
    return 'Unknown Boss';
}

// Spec display name helper
function getSpecDisplayName(spec) {
    const specInfo = specData[spec];
    if (specInfo) {
        return `${specInfo.icon} ${specInfo.name}`;
    }
    return spec;
}

// Item type display name helper
function getItemTypeDisplayName(type) {
    const typeNames = {
        'weapon': 'Weapon',
        'armor': 'Armor',
        'trinket': 'Trinket'
    };
    return typeNames[type] || type;
}

// Trinket verilerini yükle
function loadTrinketData() {
    fetch('trinket-dps-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('trinket-dps-data.json dosyası bulunamadı!');
            }
            return response.json();
        })
        .then(data => {
            trinketData = data;
            console.log('Trinket verileri başarıyla yüklendi:', trinketData);
        })
        .catch(error => {
            console.error('❌ trinket-dps-data.json yüklenemedi:', error);
            // Hata durumunda varsayılan veri oluştur
            trinketData = {
                trinkets: {
                    "default-trinket": {
                        "name": "No Trinket Data Available",
                        "iconUrl": "",
                        "dpsValues": {}
                    }
                }
            };
        });
}

// Trinket popup event listener'larını ayarla
function setupTrinketPopup() {
    const trinketButton = document.getElementById('trinketButton');
    const trinketPopup = document.getElementById('trinketPopup');
    const closeTrinketPopup = document.getElementById('closeTrinketPopup');
    const trinketPopupBackdrop = document.getElementById('trinketPopupBackdrop');
    const trinketDropdown = document.getElementById('trinketDropdown');

    // Trinket butonuna tıklandığında popup'ı aç
    trinketButton.addEventListener('click', function() {
        showTrinketPopup();
    });

    // Close butonuna tıklandığında popup'ı kapat
    closeTrinketPopup.addEventListener('click', function() {
        hideTrinketPopup();
    });

    // Backdrop'a tıklandığında popup'ı kapat
    trinketPopupBackdrop.addEventListener('click', function() {
        hideTrinketPopup();
    });

    // ESC tuşuna basıldığında popup'ı kapat
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideTrinketPopup();
        }
    });

    // Trinket dropdown değiştiğinde chart'ı güncelle
    trinketDropdown.addEventListener('change', function() {
        updateTrinketChart();
    });

    // Version radio button'ları değiştiğinde chart'ı güncelle ve role filter'ı sıfırla
    document.querySelectorAll('input[name="version"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Role filter'ı "All" olarak sıfırla
            const allRoleRadio = document.querySelector('input[name="role"][value="all"]');
            if (allRoleRadio) {
                allRoleRadio.checked = true;
            }
            updateTrinketChart();
        });
    });

    // Role radio button'ları değiştiğinde chart'ı güncelle
    document.querySelectorAll('input[name="role"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateTrinketChart();
        });
    });

    // Click outside dropdown to close it
    document.addEventListener('click', function(event) {
        const trinketDropdown = document.getElementById('trinketDropdown');
        const dropdownContent = document.querySelector('.trinket-dropdown-content');
        
        if (!trinketDropdown.contains(event.target) && dropdownContent && dropdownContent.style.display === 'block') {
            trinketDropdown.classList.remove('show');
            // Move dropdown content back to its original position
            trinketDropdown.appendChild(dropdownContent);
            dropdownContent.style.display = 'none';
            dropdownContent.style.position = '';
            dropdownContent.style.top = '';
            dropdownContent.style.left = '';
            dropdownContent.style.width = '';
            dropdownContent.style.zIndex = '';
        }
    });
}

// Trinket popup'ını göster
function showTrinketPopup() {
    const trinketPopup = document.getElementById('trinketPopup');
    const trinketPopupBackdrop = document.getElementById('trinketPopupBackdrop');
    const trinketDropdown = document.getElementById('trinketDropdown');
    
    // Popup ve backdrop'ı göster
    trinketPopup.classList.add('show');
    trinketPopupBackdrop.style.display = 'block';
    
    // Dropdown'ı sıfırla
    populateTrinketDropdown();
    
    // Reset selected display
    const selectedElement = document.querySelector('.trinket-dropdown-selected');
    if (selectedElement) {
        selectedElement.innerHTML = `
            <span>Choose a trinket...</span>
        `;
    }
    
    // Champion radio button'ı seç (default)
    const championRadio = document.querySelector('input[name="version"][value="champion"]');
    if (championRadio) {
        championRadio.checked = true;
    }
    
    // All role radio button'ı seç (default)
    const allRoleRadio = document.querySelector('input[name="role"][value="all"]');
    if (allRoleRadio) {
        allRoleRadio.checked = true;
    }
    
    // Chart'ı temizle
    clearTrinketChart();
}

// Trinket popup'ını gizle
function hideTrinketPopup() {
    const trinketPopup = document.getElementById('trinketPopup');
    const trinketPopupBackdrop = document.getElementById('trinketPopupBackdrop');
    
    // Popup ve backdrop'ı gizle
    trinketPopup.classList.remove('show');
    trinketPopupBackdrop.style.display = 'none';
}

// Trinket dropdown'ını doldur
function populateTrinketDropdown() {
    const trinketDropdown = document.getElementById('trinketDropdown');
    const dropdownContent = trinketDropdown.querySelector('.trinket-dropdown-content');
    const selectedElement = trinketDropdown.querySelector('.trinket-dropdown-selected');
    
    // Mevcut seçenekleri temizle
    dropdownContent.innerHTML = '';
    
    if (!trinketData || !trinketData.trinkets) {
        return;
    }
    
    // Her trinket için seçenek ekle
    Object.entries(trinketData.trinkets).forEach(([trinketId, trinket]) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'trinket-dropdown-item';
        itemDiv.setAttribute('data-value', trinketId);
        
        const trinketIcon = trinket.iconUrl ? 
            `<img src="${trinket.iconUrl}" alt="${trinket.name}" class="trinket-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');">` : 
            `<div class="trinket-icon-fallback">🔮</div>`;
        
        itemDiv.innerHTML = `
            ${trinketIcon}
            <span>${trinket.name}</span>
        `;
        
        // Click event
        itemDiv.addEventListener('click', function() {
            selectTrinket(trinketId, trinket.name, trinket.iconUrl);
        });
        
        dropdownContent.appendChild(itemDiv);
    });
    
    // Dropdown click event
    trinketDropdown.addEventListener('click', function(e) {
        if (e.target.closest('.trinket-dropdown-item')) {
            return; // Item click handled separately
        }
        toggleTrinketDropdown();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!trinketDropdown.contains(e.target)) {
            trinketDropdown.classList.remove('show');
            dropdownContent.style.display = 'none';
        }
    });
}

// Trinket seçme fonksiyonu
function selectTrinket(trinketId, trinketName, trinketIconUrl) {
    const trinketDropdown = document.getElementById('trinketDropdown');
    const selectedElement = trinketDropdown.querySelector('.trinket-dropdown-selected');
    const dropdownContent = document.querySelector('.trinket-dropdown-content');
    
    // Update selected display
    const trinketIcon = trinketIconUrl ? 
        `<img src="${trinketIconUrl}" alt="${trinketName}" class="trinket-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');">` : 
        `<div class="trinket-icon-fallback">🔮</div>`;
    
    selectedElement.innerHTML = `
        ${trinketIcon}
        <span>${trinketName}</span>
    `;
    
    // Update dropdown items
    document.querySelectorAll('.trinket-dropdown-item').forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-value') === trinketId) {
            item.classList.add('selected');
        }
    });
    
    // Close dropdown
    trinketDropdown.classList.remove('show');
    if (dropdownContent) {
        // Move dropdown content back to its original position
        trinketDropdown.appendChild(dropdownContent);
        dropdownContent.style.display = 'none';
        dropdownContent.style.position = '';
        dropdownContent.style.top = '';
        dropdownContent.style.left = '';
        dropdownContent.style.width = '';
        dropdownContent.style.zIndex = '';
    }
    
    // Update chart
    updateTrinketChart();
}

// Trinket dropdown toggle fonksiyonu
function toggleTrinketDropdown() {
    const trinketDropdown = document.getElementById('trinketDropdown');
    const dropdownContent = trinketDropdown.querySelector('.trinket-dropdown-content');
    
    trinketDropdown.classList.toggle('show');
    
    if (trinketDropdown.classList.contains('show')) {
        // Move dropdown content to body to avoid stacking context issues
        document.body.appendChild(dropdownContent);
        
        // Calculate position for fixed dropdown
        const rect = trinketDropdown.getBoundingClientRect();
        dropdownContent.style.position = 'fixed';
        dropdownContent.style.top = (rect.bottom + 5) + 'px';
        dropdownContent.style.left = rect.left + 'px';
        dropdownContent.style.width = rect.width + 'px';
        dropdownContent.style.display = 'block';
        dropdownContent.style.zIndex = '10001'; // Ensure it's above everything
    } else {
        // Move dropdown content back to its original position
        trinketDropdown.appendChild(dropdownContent);
        dropdownContent.style.display = 'none';
        dropdownContent.style.position = '';
        dropdownContent.style.top = '';
        dropdownContent.style.left = '';
        dropdownContent.style.width = '';
        dropdownContent.style.zIndex = '';
    }
}

// Trinket chart'ını güncelle
function updateTrinketChart() {
    const trinketDropdown = document.getElementById('trinketDropdown');
    const selectedItem = trinketDropdown.querySelector('.trinket-dropdown-item.selected');
    const selectedTrinketId = selectedItem ? selectedItem.getAttribute('data-value') : null;
    const selectedVersion = document.querySelector('input[name="version"]:checked')?.value;
    
    if (selectedTrinketId && selectedVersion) {
        createSingleTrinketChart(selectedTrinketId, selectedVersion);
    } else {
        clearTrinketChart();
    }
}

// Tek trinket grafiği oluştur
function createSingleTrinketChart(trinketId, version) {
    const trinketChart = document.getElementById('trinketChart');
    
    if (!trinketData || !trinketData.trinkets || !trinketData.trinkets[trinketId]) {
        trinketChart.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #b8c5d6;">
                <h3>Trinket not found</h3>
                <p>Please select a valid trinket from the dropdown</p>
            </div>
        `;
        return;
    }
    
    const trinket = trinketData.trinkets[trinketId];
    
    // Version kontrolü
    if (!trinket[version] || !trinket[version].dpsValues) {
        trinketChart.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #b8c5d6;">
                <h3>Version not found</h3>
                <p>Please select a valid version for this trinket</p>
            </div>
        `;
        return;
    }
    
    // Trinket icon'u
    const trinketIcon = trinket.iconUrl ? 
        `<img src="${trinket.iconUrl}" alt="${trinket.name}" class="trinket-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');" title="${trinket.name}">` : 
        `<div class="trinket-icon-fallback">🔮</div>`;
    
    // Role filter değerini al
    const selectedRole = document.querySelector('input[name="role"]:checked')?.value || 'all';
    
    // DPS değerlerini büyükten küçüğe sırala ve role göre filtrele
    let sortedDpsEntries = Object.entries(trinket[version].dpsValues || {})
        .map(([specId, dpsValue]) => ({
            specId,
            dpsValue,
            specInfo: specData[specId] || { name: specId, icon: '❓', iconUrl: '', role: 'unknown' }
        }))
        .filter(entry => {
            if (selectedRole === 'all') return true;
            return entry.specInfo.role === selectedRole;
        })
        .sort((a, b) => b.dpsValue - a.dpsValue);
    
    // En yüksek DPS değerini bul (progress bar için)
    const maxDps = sortedDpsEntries.length > 0 ? sortedDpsEntries[0].dpsValue : 1;
    
    // DPS listesi HTML'i
    const dpsListHTML = sortedDpsEntries.map((entry, index) => {
        const barWidth = (entry.dpsValue / maxDps) * 100;
        // Calculate percentage based on the highest DPS value
        const percentage = ((entry.dpsValue / maxDps) * 100).toFixed(2);
        const specIcon = entry.specInfo.iconUrl ? 
            `<img src="${entry.specInfo.iconUrl}" alt="${entry.specInfo.name}" class="spec-icon" onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='inline');" title="${entry.specInfo.class} - ${entry.specInfo.name}">` : 
            `<span class="spec-icon-fallback">${entry.specInfo.icon}</span>`;
        
        return `
            <div class="dps-entry">
                <div class="spec-info">
                    ${specIcon}
                    <span class="spec-name">${entry.specInfo.name}</span>
                </div>
                <div class="dps-bar-container">
                    <div class="dps-bar">
                        <div class="dps-bar-fill" style="width: ${barWidth}%"></div>
                    </div>
                </div>
                <span class="dps-value">${entry.dpsValue.toLocaleString()}</span>
            </div>
        `;
    }).join('');
    
    // Update the existing chart structure instead of replacing it
    const trinketIconElement = trinketChart.querySelector('.trinket-icon-fallback, .trinket-icon');
    const trinketNameElement = trinketChart.querySelector('.trinket-name');
    const dpsListElement = trinketChart.querySelector('.trinket-dps-list');
    
    if (trinketIconElement) {
        trinketIconElement.outerHTML = trinketIcon;
    }
    
    if (trinketNameElement) {
        trinketNameElement.textContent = `${trinket.name} (${version.charAt(0).toUpperCase() + version.slice(1)})`;
    }
    
    if (dpsListElement) {
        dpsListElement.innerHTML = dpsListHTML;
    }
}

// Trinket chart'ını temizle
function clearTrinketChart() {
    const trinketChart = document.getElementById('trinketChart');
    const trinketIconElement = trinketChart.querySelector('.trinket-icon-fallback, .trinket-icon');
    const trinketNameElement = trinketChart.querySelector('.trinket-name');
    const dpsListElement = trinketChart.querySelector('.trinket-dps-list');
    
    if (trinketIconElement) {
        trinketIconElement.outerHTML = '<div class="trinket-icon-fallback"></div>';
    }
    
    if (trinketNameElement) {
        trinketNameElement.textContent = 'Select a trinket';
    }
    
    if (dpsListElement) {
        dpsListElement.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #b8c5d6;">
                <h3>Select a trinket</h3>
                <p>Please choose a trinket from the dropdown to view its DPS data</p>
            </div>
        `;
    }
}

// ==================== SPEC INFO FUNCTIONS ====================

// Spec Info verilerini yükle
function loadSpecInfoData() {
    fetch('spec-info-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('spec-info-data.json dosyası bulunamadı!');
            }
            return response.json();
        })
        .then(data => {
            specInfoData = data;
            console.log('Spec Info verisi başarıyla yüklendi:', specInfoData);
            // Data yüklendikten sonra listeyi doldur
            populateSpecInfoList();
        })
        .catch(error => {
            console.error('❌ spec-info-data.json yüklenemedi:', error);
            specInfoData = { specs: {} };
        });
}

// Spec Info popup event listener'larını ayarla
function setupSpecInfoPopup() {
    const specInfoButton = document.getElementById('specInfoButton');
    const specInfoPopup = document.getElementById('specInfoPopup');
    const specInfoPopupBackdrop = document.getElementById('specInfoPopupBackdrop');
    const closeSpecInfoPopup = document.getElementById('closeSpecInfoPopup');

    // Spec Info butonuna tıklandığında popup'ı aç
    specInfoButton.addEventListener('click', showSpecInfoPopup);

    // Close butonuna tıklandığında popup'ı kapat
    closeSpecInfoPopup.addEventListener('click', hideSpecInfoPopup);

    // Backdrop'a tıklandığında popup'ı kapat
    specInfoPopupBackdrop.addEventListener('click', hideSpecInfoPopup);

    // Search input event listeners are now set up in HTML script section

    // Spec Info listesini doldur (data yüklendikten sonra çağrılacak)
    if (specInfoData && specInfoData.specs) {
        populateSpecInfoList();
    }
}

// Spec Info popup'ını göster
function showSpecInfoPopup() {
    const specInfoPopup = document.getElementById('specInfoPopup');
    const specInfoPopupBackdrop = document.getElementById('specInfoPopupBackdrop');
    
    specInfoPopup.style.display = 'flex';
    specInfoPopupBackdrop.style.display = 'block';
    
    // Popup açıldığında tüm spec'leri göster
    if (specInfoData && specInfoData.specs) {
        // Clear input
        document.getElementById('specInfoSearchInput').value = '';
        
        // Populate and show all specs in list
        populateSpecInfoList();
    }
    
    // Search input event listeners are now set up in HTML script section
}

// Spec Info popup'ını gizle
function hideSpecInfoPopup() {
    const specInfoPopup = document.getElementById('specInfoPopup');
    const specInfoPopupBackdrop = document.getElementById('specInfoPopupBackdrop');
    
    specInfoPopup.style.display = 'none';
    specInfoPopupBackdrop.style.display = 'none';
}

// Spec Info listesini doldur
function populateSpecInfoList() {
    const specInfoList = document.getElementById('specInfoList');
    
    if (!specInfoData || !specInfoData.specs) {
        console.error('Spec Info data not loaded');
        return;
    }

    // Clear existing content
    specInfoList.innerHTML = '';

    // Spec'leri sim değerine göre büyükten küçüğe sırala
    const sortedSpecs = Object.entries(specInfoData.specs).sort(([, specA], [, specB]) => {
        const simA = specA.sim || 0;
        const simB = specB.sim || 0;
        return simB - simA; // Büyükten küçüğe sıralama
    });

    // Sıralanmış spec'leri ekle
    sortedSpecs.forEach(([specId, specInfo]) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'spec-info-list-item';
        itemDiv.setAttribute('data-value', specId);
        itemDiv.setAttribute('data-spec-name', specInfo.name.toLowerCase());
        itemDiv.setAttribute('data-class-name', specInfo.class.toLowerCase());
        
        // Spec icon'u
        const iconImg = document.createElement('img');
        iconImg.className = 'spec-icon';
        iconImg.src = specInfo.iconUrl;
        iconImg.alt = specInfo.name;
        iconImg.onerror = function() {
            this.style.display = 'none';
        };
        
        // Spec adı
        const specName = document.createElement('span');
        specName.className = 'spec-name';
        specName.textContent = specInfo.name;
        
        // Stats bilgisi (sadece secondary stats)
        const statsText = specInfo.stats.secondary.join(', ');
        const statsInfo = document.createElement('span');
        statsInfo.className = 'spec-stats-info';
        statsInfo.textContent = statsText;
        
        // Off-set bilgisi (tek item veya yok)
        let offSetText = 'yok';
        if (specInfo.offSet && specInfo.offSet.item) {
            offSetText = specInfo.offSet.item;
        }
        const offSetInfo = document.createElement('span');
        offSetInfo.className = 'spec-offset-info';
        offSetInfo.textContent = offSetText;
        
        // Sim değeri
        const simValue = specInfo.sim || 0;
        const simInfo = document.createElement('span');
        simInfo.className = 'spec-sim-info';
        simInfo.textContent = simValue.toLocaleString();
        
        itemDiv.appendChild(iconImg);
        itemDiv.appendChild(specName);
        itemDiv.appendChild(statsInfo);
        itemDiv.appendChild(offSetInfo);
        itemDiv.appendChild(simInfo);
        
        specInfoList.appendChild(itemDiv);
    });
}





// Spec Info listesini filtrele
function filterSpecInfoList(searchTerm) {
    const listItems = document.querySelectorAll('#specInfoList .spec-info-list-item');
    
    searchTerm = searchTerm.toLowerCase();
    
    // Tüm list item'larını göster/gizle
    listItems.forEach(item => {
        const specName = item.getAttribute('data-spec-name') || item.textContent.toLowerCase();
        if (specName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}





// Spec Info seçimini temizle
function clearSpecInfoSelection() {
    // Input'u temizle
    document.getElementById('specInfoSearchInput').value = '';
    
    // Show all specs
    filterSpecInfoList('');
} 