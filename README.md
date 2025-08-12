# WoW Loot Manager - Omega Manaforge 11.2

A comprehensive World of Warcraft mythic raid loot management web application with advanced filtering, trinket DPS analysis, spec information system, 2p-4p set bonus tracking, and administrative tools.

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
- **Secondary Stats Display**: Item secondary stats (e.g., "Haste / Mastery", "Crit / Versatility")
- **Spec Information System**: Comprehensive spec stats, off-set information, and sim data
- **2p-4p Set Bonus System**: Dedicated popup for set bonus tracking with percentage values
- **Responsive Design**: Mobile and desktop optimized interface
- **Modern UI**: Gradient backgrounds, smooth animations, and professional styling
- **Clean Interface**: Admin buttons removed from main page for cleaner user experience
- **Organized Button Layout**: Separate action buttons (Trinkets, Specs, 2p-4p) with background area

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

### Spec Information System
- **Interactive Spec Info Popup**: Modal-based spec information interface
- **Comprehensive Spec Data**: Secondary stats, off-set information, and sim data for all specs
- **Search Functionality**: Real-time filtering of specs by name
- **Organized Display**: Clean table format with spec icons, stats, off-set items, and sim values
- **Sim Data Integration**: 7-digit single-target simulation data for each spec
- **Sorted Display**: Specs sorted by sim value (highest to lowest)
- **Direct JSON Loading**: Loads data directly from JSON file without localStorage
- **Responsive Layout**: Fixed popup size with scrollable content

### 2p-4p Set Bonus System
- **Dedicated Set Bonus Popup**: Separate modal interface for set bonus tracking
- **Percentage-based Values**: 2-piece and 4-piece set bonus percentages for each spec
- **Search Functionality**: Real-time filtering of specs by name
- **Organized Display**: Clean table format with spec icons, sim values, and set bonus percentages
- **Sim Data Integration**: 7-digit single-target simulation data for each spec
- **Sorted Display**: Specs sorted by sim value (highest to lowest)
- **Direct JSON Loading**: Loads data directly from JSON file without localStorage
- **Responsive Layout**: Fixed popup size with scrollable content
- **Proper Column Alignment**: Sim values centered, set bonus values right-aligned

### Administrative Tools

#### Main Admin Panel (`admin.html`)
- **Complete Loot Management**: Add, edit, and delete raid bosses and items
- **BIS Spec Management**: Assign and manage BIS specs for each item
- **Goods For Management**: Additional spec assignments
- **Secondary Stats Management**: Add and manage item secondary stats with preset buttons
- **Preset Secondary Stats**: Quick selection buttons for common stat combinations
  - Primary Stats: Agility, Intellect, Strength
  - Individual Secondary Stats: Haste, Crit, Mastery, Versatility
  - Combined Stats: Haste/Mastery, Crit/Mastery, Haste/Crit, etc.
  - Primary Stat (All Classes): Agility / Intellect / Strength
- **JSON Import/Export**: Full data backup and restore functionality
- **Icon URL Management**: Automatic conversion of WoWhead icon URLs
- **Local Storage**: Persistent data storage in browser
- **Simplified Export**: Clean export success message

#### Trinket Admin Panel (`trinket-admin.html`)
- **Trinket DPS Management**: Add, edit, and delete trinket DPS data
- **Multi-Version Support**: Manage Champion, Heroic, and Mythic versions
- **Spec-specific DPS Values**: Individual DPS values for all 36 specs
- **Icon Management**: Trinket icon URL handling
- **JSON Import/Export**: Complete trinket data backup and restore
- **Local Storage**: Persistent trinket data storage

#### Spec Info Admin Panel (`spec-info-admin.html`)
- **Spec Information Management**: Add, edit, and delete spec stat, off-set, and sim data
- **2p-4p Set Bonus Management**: Add, edit, and delete 2-piece and 4-piece set bonus percentages
- **Secondary Stats Management**: Manage secondary stat priorities for each spec
- **Off-Set Item Management**: Single off-set item assignment per spec
- **Sim Data Management**: 7-digit single-target simulation values for each spec
- **Icon Management**: Spec icon URL handling with proper class icon format
- **JSON Import/Export**: Complete spec info data backup and restore
- **Local Storage**: Persistent spec info data storage
- **Simplified Interface**: Single-line display for each spec with edit/delete options

## 📁 File Structure

```
wow-loot-manager/
├── index.html              # Main application interface
├── admin.html              # Main loot management admin panel
├── trinket-admin.html      # Trinket DPS management admin panel
├── spec-info-admin.html    # Spec information management admin panel
├── script.js               # Main application JavaScript
├── admin.js                # Admin panel JavaScript
├── styles.css              # Shared CSS styles
├── loot-data.json          # Raid loot data (JSON)
├── trinket-dps-data.json   # Trinket DPS data (JSON)
├── spec-info-data.json     # Spec information data (JSON)
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
3. **Access Spec Info Admin**: Open `spec-info-admin.html` for spec information and set bonus management
4. **Import/Export Data**: Use the JSON import/export functionality for data backup

## 🎯 Core Functionality

### Main Application Features

#### Filtering System
- **Boss Filter**: Select specific bosses or view all bosses
- **Slot Filter**: Filter by item slot (Head, Neck, Shoulder, etc.)
- **Spec Filter**: Advanced dropdown with search functionality for all 36 specs
- **Reset Button**: One-click filter reset (positioned next to filters)

#### Action Button Layout
- **Organized Button Group**: Trinkets, Specs, and 2p-4p buttons grouped together
- **Background Area**: Buttons centered within a dedicated background container
- **Consistent Styling**: All action buttons use the same color scheme
- **Proper Alignment**: Reset button aligned with filter inputs

#### Loot Display
- **Boss Grouping**: When "All Bosses" is selected, items are grouped by boss
- **BIS Spec Icons**: Visual representation of BIS specs with class icons
- **Secondary Stats**: Display of item secondary stats (e.g., "Haste / Mastery")
- **Item Information**: Complete item details including slot, icon, stats, and spec assignments
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Color-coded Labels**: Stats (red), BIS Specs (gold), Goods For (green)

#### Spec Information System
- **Spec Info Button**: Access spec information via popup modal
- **Search Interface**: Real-time search through all specs
- **Table Format**: Organized display with spec, stats, off-set, and sim columns
- **Sim Data**: 7-digit simulation values for each spec
- **Sorted Display**: Specs sorted by sim value (highest to lowest)
- **Fixed Layout**: Consistent popup size with scrollable content

#### 2p-4p Set Bonus System
- **2p-4p Button**: Access set bonus information via dedicated popup modal
- **Search Interface**: Real-time search through all specs
- **Table Format**: Organized display with spec, sim, and 2P/4P columns
- **Sim Data**: 7-digit simulation values for each spec
- **Set Bonus Data**: 2-piece and 4-piece percentage values
- **Sorted Display**: Specs sorted by sim value (highest to lowest)
- **Fixed Layout**: Consistent popup size with scrollable content
- **Proper Alignment**: Sim values centered, set bonus values right-aligned

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

### Spec Information System

#### Popup Interface
- **Modal Design**: Overlay popup with backdrop
- **Search Input**: Real-time filtering of specs
- **Table Header**: Fixed header with column labels (Spec, Stats, Off-Set, Sim)
- **Scrollable Content**: Fixed popup size with scrollable list

#### Data Display
- **Spec Icons**: Class and spec icons for visual identification
- **Secondary Stats**: Priority order of secondary stats (Crit, Haste, Mastery, Versatility)
- **Off-Set Items**: Single off-set item or "None" indication
- **Sim Values**: 7-digit single-target simulation data
- **Responsive Layout**: Proper column alignment and spacing

### 2p-4p Set Bonus System

#### Popup Interface
- **Modal Design**: Overlay popup with backdrop
- **Search Input**: Real-time filtering of specs
- **Table Header**: Fixed header with column labels (Spec, Sim, 2P/4P)
- **Scrollable Content**: Fixed popup size with scrollable list
- **Independent Styling**: Separate CSS classes to prevent conflicts with spec info popup

#### Data Display
- **Spec Icons**: Class and spec icons for visual identification
- **Sim Values**: 7-digit single-target simulation data (centered)
- **Set Bonus Values**: 2-piece and 4-piece percentage values (right-aligned)
- **Responsive Layout**: Proper column alignment and spacing
- **Custom Spacing**: Optimized column spacing using margin properties

### Administrative Features

#### Data Management
- **CRUD Operations**: Create, Read, Update, Delete for all data
- **Local Storage**: Persistent data storage in browser
- **JSON Import/Export**: Complete data backup and restore
- **Icon URL Conversion**: Automatic WoWhead URL processing
- **Secondary Stats**: Comprehensive secondary stats management with presets
- **Set Bonus Data**: 2-piece and 4-piece percentage management

#### User Interface
- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Works on all device sizes
- **Intuitive Controls**: Easy-to-use forms and buttons
- **Error Handling**: Graceful error management
- **Preset Buttons**: Quick selection for common secondary stat combinations

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
          "secondaryStats": "Haste / Mastery",
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

### Spec Information Data (`spec-info-data.json`)
```json
{
  "specs": {
    "evoker-devastation": {
      "name": "Devastation",
      "class": "Evoker",
      "role": "dps",
      "iconUrl": "https://wow.zamimg.com/images/wow/icons/large/classicon_evoker_devastation.jpg",
      "stats": {
        "secondary": ["Haste", "Mastery", "Critical Strike", "Versatility"]
      },
      "offSet": {
        "item": "Meta Gem"
      },
      "sim": 1234567,
      "setBonus2p": 0,
      "setBonus4p": 0
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

### Secondary Stats
- **Primary Stats**: Agility, Intellect, Strength
- **Secondary Stats**: Critical Strike, Haste, Mastery, Versatility
- **Combined Formats**: Haste / Mastery, Crit / Versatility, etc.

### Set Bonus Data
- **2-piece Set Bonus**: Percentage values for 2-piece set bonus effects
- **4-piece Set Bonus**: Percentage values for 4-piece set bonus effects
- **Data Format**: Numeric percentage values (e.g., 0, 5, 10, 15)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS gradients and animations
  - Responsive design principles
  - Custom scrollbars and UI elements
  - Fixed positioning and backdrop filters
  - Independent styling for multiple popups
- **Vanilla JavaScript (ES6+)**:
  - Modern JavaScript features
  - DOM manipulation
  - Event handling
  - Local Storage API
  - File API for JSON import/export
  - Fetch API for JSON data loading
  - ClassList management for popup visibility
- **JSON**: Data storage and exchange format
- **Google Fonts**: Inter font family for modern typography

## 🔧 Customization

### Adding New Bosses
1. Edit `loot-data.json`
2. Add new boss entry with items
3. Assign BIS specs, goods for specs, and secondary stats

### Adding New Trinkets
1. Use `trinket-admin.html`
2. Add trinket with DPS values for all specs
3. Include Champion, Heroic, and Mythic versions

### Adding New Spec Information
1. Use `spec-info-admin.html`
2. Add spec with secondary stat priorities
3. Assign off-set item or mark as "None"
4. Add sim data (7-digit number)
5. Add 2-piece and 4-piece set bonus percentages
6. Ensure proper class icon URL format

### Managing Secondary Stats
1. Use `admin.html` for item management
2. Use preset buttons for common stat combinations
3. Manually enter custom stat combinations
4. Format: "Stat1 / Stat2" (capitalized with spaces around /)

### Managing Set Bonus Data
1. Use `spec-info-admin.html` for set bonus management
2. Add percentage values for 2-piece and 4-piece set bonuses
3. Values can range from 0 to any positive number
4. Format: Numeric values (e.g., 0, 5, 10, 15)

### Styling Changes
- Modify `styles.css` for visual customizations
- Update color schemes, layouts, and animations
- Adjust popup sizes and positioning
- Use independent CSS classes for different popups

### Functionality Extensions
- Add new features in `script.js`
- Extend admin functionality in `admin.js`
- Implement new data sources and displays
- Create new popup systems with independent styling

## 📱 Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🚨 Important Notes

- **Client-Side Only**: No server required, runs entirely in browser
- **Local Storage**: Data persists in browser localStorage (except Spec Info which loads from JSON)
- **No Internet Required**: Works offline after initial load
- **Modern Browsers**: Requires ES6+ support
- **File Size**: Large JSON files may take time to load initially
- **Spec Info Data**: Loads directly from `spec-info-data.json` file
- **Secondary Stats**: Formatted as "Stat1 / Stat2" with proper capitalization
- **Sim Data**: 7-digit numbers representing single-target simulation values
- **Set Bonus Data**: Percentage values for 2-piece and 4-piece set bonuses
- **Independent Popups**: Spec Info and 2p-4p popups use separate CSS classes to prevent conflicts
- **Button Layout**: Action buttons (Trinkets, Specs, 2p-4p) are grouped together with background area

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
5. Verify spec icon URLs are in correct format
6. Check secondary stats formatting (capitalized with spaces around /)
7. Verify set bonus data is numeric
8. Check for CSS conflicts between popups

---

**Version**: 11.2  
**Last Updated**: 2025 
**Raid**: Omega Manaforge 
