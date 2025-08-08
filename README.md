# WoW Loot Manager - Omega Manaforge 11.2

A comprehensive World of Warcraft mythic raid loot management web application with advanced filtering, trinket DPS analysis, and administrative tools.

## 🌟 Features

### Main Application (`index.html`)
- **8 Boss Loot Management**: Complete loot tables for all raid bosses
- **Advanced Filtering System**:
  - Boss-specific filtering
  - Item slot filtering (Head, Neck, Shoulder, Chest, Waist, Legs, Feet, Wrist, Hands, Finger, Trinket, Back, Main Hand, Off Hand)
  - Spec-based filtering with search functionality
  - Real-time filter reset capability
- **BIS Spec Tracking**: Visual display of which specs each item is BIS for
- **Goods For Tracking**: Additional spec assignments for items
- **Responsive Design**: Mobile and desktop optimized interface
- **Modern UI**: Gradient backgrounds, smooth animations, and professional styling

### Trinket DPS Analysis System
- **Interactive Trinket Popup**: Modal-based trinket analysis interface
- **Multi-Version Support**: Champion, Heroic, and Mythic versions for each trinket
- **DPS Visualization**: 
  - Bar chart representation of DPS values
  - Spec-specific DPS data with icons
  - Role-based filtering (All, DPS, Healer, Tank)
  - Sorted by DPS value (highest to lowest)
- **Custom Dropdown**: Trinket selection with icons and search functionality
- **Real-time Updates**: Dynamic chart updates based on selection

### Administrative Tools

#### Main Admin Panel (`admin.html`)
- **Complete Loot Management**: Add, edit, and delete raid bosses and items
- **BIS Spec Management**: Assign and manage BIS specs for each item
- **Goods For Management**: Additional spec assignments
- **JSON Import/Export**: Full data backup and restore functionality
- **Icon URL Management**: Automatic conversion of WoWhead icon URLs
- **Local Storage**: Persistent data storage in browser

#### Trinket Admin Panel (`trinket-admin.html`)
- **Trinket DPS Management**: Add, edit, and delete trinket DPS data
- **Multi-Version Support**: Manage Champion, Heroic, and Mythic versions
- **Spec-specific DPS Values**: Individual DPS values for all 36 specs
- **Icon Management**: Trinket icon URL handling
- **JSON Import/Export**: Complete trinket data backup and restore
- **Local Storage**: Persistent trinket data storage

## 📁 File Structure

```
wow-loot-manager/
├── index.html              # Main application interface
├── admin.html              # Main loot management admin panel
├── trinket-admin.html      # Trinket DPS management admin panel
├── script.js               # Main application JavaScript
├── admin.js                # Admin panel JavaScript
├── styles.css              # Shared CSS styles
├── loot-data.json          # Raid loot data (JSON)
├── trinket-dps-data.json   # Trinket DPS data (JSON)
├── README.md               # This documentation
└── .gitattributes         # Git configuration
```

## 🚀 Quick Start

1. **Download/Clone** the project files
2. **Open `index.html`** in a modern web browser
3. **Start managing loot** with the intuitive interface

### For Administrators

1. **Access Admin Panel**: Open `admin.html` for loot management
2. **Access Trinket Admin**: Open `trinket-admin.html` for trinket DPS management
3. **Import/Export Data**: Use the JSON import/export functionality for data backup

## 🎯 Core Functionality

### Main Application Features

#### Filtering System
- **Boss Filter**: Select specific bosses or view all bosses
- **Slot Filter**: Filter by item slot (Head, Neck, Shoulder, etc.)
- **Spec Filter**: Advanced dropdown with search functionality for all 36 specs
- **Reset Button**: One-click filter reset

#### Loot Display
- **Boss Grouping**: When "All Bosses" is selected, items are grouped by boss
- **BIS Spec Icons**: Visual representation of BIS specs with class icons
- **Item Information**: Complete item details including slot, icon, and spec assignments
- **Responsive Grid**: Adaptive layout for different screen sizes

### Trinket DPS Analysis

#### Popup Interface
- **Modal Design**: Overlay popup with backdrop
- **Custom Dropdown**: Trinket selection with icons
- **Version Selection**: Radio buttons for Champion/Heroic/Mythic
- **Role Filtering**: All/DPS/Healer/Tank role-based filtering

#### DPS Visualization
- **Bar Charts**: Visual representation of DPS values
- **Spec Icons**: Class and spec icons for each entry
- **Sorted Display**: Highest to lowest DPS ordering
- **Real-time Updates**: Dynamic chart updates

### Administrative Features

#### Data Management
- **CRUD Operations**: Create, Read, Update, Delete for all data
- **Local Storage**: Persistent data storage in browser
- **JSON Import/Export**: Complete data backup and restore
- **Icon URL Conversion**: Automatic WoWhead URL processing

#### User Interface
- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Works on all device sizes
- **Intuitive Controls**: Easy-to-use forms and buttons
- **Error Handling**: Graceful error management

## 📊 Data Structure

### Loot Data (`loot-data.json`)
```json
{
  "raidName": "Omega Manaforge 11.2",
  "bosses": {
    "boss1": {
      "name": "Boss Name",
      "items": [
        {
          "name": "Item Name",
          "slot": "head",
          "iconUrl": "https://wow.zamimg.com/...",
          "bisSpecs": ["warrior-arms", "paladin-retribution"],
          "goodsFor": ["warrior-fury"]
        }
      ]
    }
  }
}
```

### Trinket DPS Data (`trinket-dps-data.json`)
```json
{
  "trinkets": {
    "trinket1": {
      "name": "Trinket Name",
      "iconUrl": "https://wow.zamimg.com/...",
      "champion": {
        "dpsValues": {
          "warrior-arms": 387015,
          "warrior-fury": 374226
        }
      },
      "heroic": { "dpsValues": { ... } },
      "mythic": { "dpsValues": { ... } }
    }
  }
}
```

## 🎨 Supported Specs

### All 36 Specializations
- **Warrior**: Arms, Fury, Protection
- **Paladin**: Holy, Protection, Retribution
- **Hunter**: Beast Mastery, Marksmanship, Survival
- **Rogue**: Assassination, Outlaw, Subtlety
- **Priest**: Discipline, Holy, Shadow
- **Shaman**: Elemental, Enhancement, Restoration
- **Mage**: Arcane, Fire, Frost
- **Warlock**: Affliction, Demonology, Destruction
- **Monk**: Brewmaster, Mistweaver, Windwalker
- **Druid**: Balance, Feral, Guardian, Restoration
- **Demon Hunter**: Havoc, Vengeance
- **Death Knight**: Blood, Frost, Unholy
- **Evoker**: Devastation, Preservation, Augmentation

### Item Slots
- Head, Neck, Shoulder, Back, Chest, Wrist, Hands, Waist, Legs, Feet, Finger, Trinket, Main Hand, Off Hand

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS gradients and animations
  - Responsive design principles
  - Custom scrollbars and UI elements
- **Vanilla JavaScript (ES6+)**:
  - Modern JavaScript features
  - DOM manipulation
  - Event handling
  - Local Storage API
  - File API for JSON import/export
- **JSON**: Data storage and exchange format
- **Google Fonts**: Inter font family for modern typography

## 🔧 Customization

### Adding New Bosses
1. Edit `loot-data.json`
2. Add new boss entry with items
3. Assign BIS specs and goods for specs

### Adding New Trinkets
1. Use `trinket-admin.html`
2. Add trinket with DPS values for all specs
3. Include Champion, Heroic, and Mythic versions

### Styling Changes
- Modify `styles.css` for visual customizations
- Update color schemes, layouts, and animations

### Functionality Extensions
- Add new features in `script.js`
- Extend admin functionality in `admin.js`

## 📱 Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🚨 Important Notes

- **Client-Side Only**: No server required, runs entirely in browser
- **Local Storage**: Data persists in browser localStorage
- **No Internet Required**: Works offline after initial load
- **Modern Browsers**: Requires ES6+ support
- **File Size**: Large JSON files may take time to load initially

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify JSON file syntax
3. Ensure modern browser compatibility
4. Clear browser cache if needed

---

**Version**: 11.2  
**Last Updated**: 2024  
**Raid**: Omega Manaforge 