# Firebase Setup Instructions

## Setting Up Firestore for Snake Game Leaderboard

The Snake game uses Firebase Firestore to store and retrieve global leaderboard scores. Follow these steps to configure your own Firebase project:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or use your existing project (cocoa-rave-store)
3. Follow the setup wizard

### 2. Enable Firestore

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** or **test mode** (test mode for development)
4. Select a location for your database

### 3. Create Firestore Collection

The app will automatically create the `snakeScores` collection when the first score is saved. No manual setup needed!

### 4. Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a name (e.g., "Cocoa Rave")
5. Copy the `firebaseConfig` object

### 5. Update the Firebase Config

Edit `lib/firebase.js` and replace the placeholder config with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 6. Set Up Firestore Security Rules (Optional but Recommended)

In Firebase Console, go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to leaderboard
    match /snakeScores/{scoreId} {
      allow read: if true;
      // Only allow writes with valid data
      allow create: if request.resource.data.keys().hasAll(['playerName', 'score', 'timestamp', 'createdAt'])
        && request.resource.data.playerName is string
        && request.resource.data.playerName.size() > 0
        && request.resource.data.playerName.size() <= 20
        && request.resource.data.score is int
        && request.resource.data.score >= 0;
      // Don't allow updates or deletes
      allow update, delete: if false;
    }
  }
}
```

This ensures:
- Anyone can read the leaderboard
- Only valid scores can be submitted
- Player names are 1-20 characters
- Scores are non-negative integers
- Scores cannot be modified or deleted after submission

### 7. Test the Integration

1. Run the app: `npm run dev`
2. Navigate to the Snake game
3. Play a game and enter your name when prompted
4. Check Firebase Console → Firestore Database to see your score!

### 8. Deploy Updates

After updating the Firebase config:

```bash
npm run build
npm run tauri:build  # For desktop builds
firebase deploy --only hosting  # For web deployment
```

## Troubleshooting

### "Firebase not initialized" error
- Double-check your Firebase config values
- Ensure you've enabled Firestore in your Firebase project

### Scores not saving
- Check browser console for errors
- Verify Firestore security rules allow writes
- Ensure you're connected to the internet

### Can't see leaderboard
- Check that scores exist in your Firestore collection
- Verify the collection name is `snakeScores`
- Check browser console for any errors

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env` file in the project root (already in .gitignore)
2. Add your Firebase config:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Update `lib/firebase.js` to use environment variables:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
```

## Support

For more information, see:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

