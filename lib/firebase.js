import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBjZv8Zx5Y-_2QXCx9y0w1KqJmNrLpOiHg",
  authDomain: "cocoa-rave-store.firebaseapp.com",
  projectId: "cocoa-rave-store",
  storageBucket: "cocoa-rave-store.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const saveScore = async (playerName, score) => {
  try {
    const docRef = await addDoc(collection(db, 'snakeScores'), {
      playerName,
      score,
      timestamp: new Date().toISOString(),
      createdAt: Date.now()
    })
    console.log('Score saved with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving score:', error)
    return null
  }
}

export const getTopScores = async (limitCount = 10) => {
  try {
    const scoresRef = collection(db, 'snakeScores')
    const q = query(scoresRef, orderBy('score', 'desc'), limit(limitCount))
    const querySnapshot = await getDocs(q)
    
    const scores = []
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() })
    })
    
    return scores
  } catch (error) {
    console.error('Error getting scores:', error)
    return []
  }
}

export { db }

