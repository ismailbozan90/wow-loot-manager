// Global değişkenler
let currentBoss = 'all';
let currentSpec = 'all';

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
    'hands': { name: 'Hands', icon: '🧤' },
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

// Uygulamayı başlat
function initializeApp() {
    // Boss seçeneklerini doldur
    populateBossOptions();
    
    // Spec seçeneklerini doldur
    populateSpecOptions();
    
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
    
    // BIS Specs ve Goods For mesajları
    const bisSpecsSection = item.bisSpecs && item.bisSpecs.length > 0 ? 
        `<div class="bis-specs">
            <strong>BIS Specs:</strong><br>
            ${bisSpecsHTML}
        </div>` : 
        `<div class="bis-specs">
            <strong>BIS Specs:</strong><br>
            <span style="color: #888; font-style: italic;">No BIS specs assigned</span>
        </div>`;
    
    const goodsForSection = item.goodsFor && item.goodsFor.length > 0 ? 
        `<div class="goods-for">
            <strong>Goods For:</strong><br>
            ${goodsForHTML}
        </div>` : 
        `<div class="goods-for">
            <strong>Goods For:</strong><br>
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
    
    return allItems;
}

// Loot filtreleme
function filterLoot() {
    currentBoss = bossFilter.value;
    // currentSpec is already set by selectSpec function
    
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