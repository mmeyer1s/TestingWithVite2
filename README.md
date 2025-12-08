# Cocoa Rave Store 🍫

A beautiful chocolate storefront built with Vite, Bootstrap 5, and deployed on Firebase Hosting, featuring an interactive police reports analysis dashboard.

## 🚀 Live Site

**Deployed URL:** https://cocoa-rave-store.web.app

**Police Reports Page:** https://cocoa-rave-store.web.app/reports.html

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **Bootstrap 5** - Responsive CSS framework
- **HTML/JavaScript** - Vanilla JS for interactivity
- **Plotly.js** - Interactive data visualizations
- **PapaParse** - CSV parsing library
- **Firebase Hosting** - Fast and secure web hosting

## 📦 Features

### Storefront
- 6 premium chocolate products with unique "Cocoa Rave" branding
- Shopping cart functionality
- Responsive design for mobile and desktop
- Beautiful gradient hero section
- Smooth animations and transitions
- Add to cart with quantity tracking
- Checkout functionality

### Police Reports Analysis Dashboard
- Interactive visualizations of Electronic Police Reports 2025 data
- 10 different chart types using Plotly.js:
  - Incidents by District (bar chart)
  - Disposition Status (pie chart)
  - Top 15 Signal Types (horizontal bar chart)
  - Incidents Over Time (time series)
  - Offender Demographics - Gender (bar chart)
  - Offender Demographics - Race (bar chart)
  - Victim Demographics - Gender (bar chart)
  - Victim Demographics - Race (bar chart)
  - Offender Age Distribution (histogram)
  - Victim Age Distribution (histogram)
- Real-time filtering by:
  - District
  - Disposition (OPEN/CLOSED)
  - Signal Type
  - Date range
- Summary statistics cards
- Real-time CSV data parsing
- Responsive charts for all devices

## 🏃‍♂️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔥 Firebase Deployment

### Deploy to Firebase
```bash
firebase deploy --only hosting
```

### View in Firebase Console
https://console.firebase.google.com/project/cocoa-rave-store/overview

## 📁 Project Structure

```
TestingWithVite2/
├── dist/                    # Production build output
├── public/                  # Static assets
│   └── police-reports.csv  # Police report dataset
├── index.html              # Storefront page
├── reports.html            # Police reports visualization page
├── main.js                 # Storefront JavaScript
├── reports.js              # Police reports visualization JavaScript
├── style.css               # Shared styles with Bootstrap
├── package.json            # Dependencies
├── vite.config.js          # Multi-page Vite config
├── firebase.json           # Firebase hosting config
├── .firebaserc             # Firebase project config
└── Electronic_Police_Report_2025.csv  # Original dataset
```

## 🎨 Color Scheme

- Primary: `#4A2C2A` (Dark Brown)
- Secondary: `#8B4A3C` (Medium Brown)
- Accent: `#D4A574` (Light Brown)
- Background: `#FFF5E6` (Cream)

## 📝 License

ISC
