# Name Game - Component & Firebase Guide

## Overview

This is a baby name visualization game built with SvelteKit 5, D3.js for charts, and Firebase Realtime Database for multiplayer features. The app includes several game modes where users compare and guess baby name trends over time.

## Project Structure

```
src/
├── components/
│   ├── Versus.svelte                    # Two-name comparison game
│   ├── GuessLineChart.svelte            # Single-player guess the name game
│   ├── GuessLineChartMultiplayer.svelte # Multiplayer guess the name game
│   ├── GuessLineChartSimple.svelte      # Simplified guess the name
│   ├── LineChart.svelte                 # Basic line chart component
│   ├── Index.svelte                     # Home page component
│   ├── MultiplayerButton.svelte         # Multiplayer UI controls
│   └── VersusMultiplayer.svelte         # Multiplayer versus mode
├── lib/
│   └── firebase.js                # Firebase configuration
└── routes/
    ├── +page.svelte               # Home page route
    ├── multiplayer/+page.svelte   # Multiplayer game route
    └── versus-multiplayer/        # Versus multiplayer route

static/data/
└── ssa_babynames_filtered.csv     # Filtered baby names dataset
```

---

## Components Explained

### 1. Versus.svelte (`src/components/Versus.svelte`)

**Purpose**: A two-name comparison game where users drag name buttons to matching chart lines.

**How it Works**:

1. **Data Loading**:
   - Loads SSA baby names from CSV
   - Filters to names with ≥1000 total occurrences
   - Creates a top 1000 names list for random selection

2. **Chart Rendering**:
   - Uses D3.js to create time-series line charts
   - Two lines (purple and pink) show birth trends for two names
   - Names are hidden initially; users must guess which is which

3. **Drop Zone Positioning** (Advanced Feature):
   - Purple box: Positioned at the END of line 1, offset to the right with left arrow (←)
   - Pink box: Positioned at the PEAK of line 2, offset to the left with right arrow (→)
   - **Smart positioning**:
     - Detects if opposite line would overlap the box
     - Automatically switches to side positioning when needed
     - Prevents overlap with chart edges

4. **Drag & Drop Interaction**:
   - Desktop: Native HTML5 drag and drop
   - Mobile: Custom touch handlers with 30ms long-press activation
   - Visual feedback: Ghost element follows finger, haptic vibration on drop

5. **Game Flow**:
   ```
   Start → Names Hidden → Drag Names to Lines → Auto-submit →
   Correct? → Confetti + Reveal : Try Again
   ```

6. **Key State Variables**:
   - `isHidden`: Controls whether names are revealed
   - `guess1`, `guess2`: Current guesses for each line
   - `draggedName`: Name currently being dragged
   - `dropZone1Position`, `dropZone2Position`: Calculated positions

**Code Location**: Lines 303-404 (drop zone positioning logic)

---

### 2. GuessLineChartMultiplayer.svelte (`src/components/GuessLineChartMultiplayer.svelte`)

**Purpose**: Multiplayer game where players guess which marker represents their assigned name.

**How it Works**:

1. **Multiplayer Setup**:
   - Creates or joins a Firebase game session
   - Each player gets assigned a unique name
   - Game state synced via Firebase Realtime Database

2. **Chart**:
   - Shows 4-6 markers representing different names
   - One marker per player (randomly assigned)
   - Players click the marker they think represents their name

3. **Firebase Integration**:
   - Listens to `games/{gameId}/players` for player updates
   - Updates player guesses in real-time
   - Tracks correct/incorrect answers

4. **Scoring**:
   - Tracks attempts and correct guesses
   - Shows results when all players finish

**Game State Structure**:
```javascript
{
  gameId: "abc123",
  players: {
    player1: {
      name: "Emma",
      guess: "dot2",
      correct: true,
      attempts: 1
    }
  }
}
```

---

### 3. GuessLineChart.svelte (`src/components/GuessLineChart.svelte`)

**Purpose**: Single-player version of the guess the name game.

**How it Works**:

1. User selects a name from autocomplete
2. Chart shows their name as one marker among several others
3. User guesses which marker is their name
4. Immediate feedback (correct/wrong)
5. No Firebase - all local state

**Simpler than multiplayer**:
- No game sessions
- No player synchronization
- Instant results

---

### 4. Index.svelte (`src/components/Index.svelte`)

**Purpose**: Home page with game mode selection.

**Features**:
- Links to different game modes
- Explains how each game works
- Visual cards for each game type

---

### 5. MultiplayerButton.svelte (`src/components/MultiplayerButton.svelte`)

**Purpose**: Reusable UI for multiplayer game controls.

**Features**:
- "Create Game" button → generates unique game ID
- "Join Game" input → enter friend's game ID
- "Copy Link" → share game URL
- Shows current players in session
- Start game button (when all ready)

**Firebase Interaction**:
- Creates game session at `/games/{gameId}`
- Adds player to `/games/{gameId}/players/{playerId}`
- Listens for player updates

---

## Firebase Setup & Usage

### Configuration (`src/lib/firebase.js`)

```javascript
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { env } from '$env/dynamic/public';

const firebaseConfig = {
  apiKey: env.PUBLIC_FIREBASE_API_KEY,
  authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_FIREBASE_APP_ID,
  measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
```

**Environment Variables** (`.env`):
```
PUBLIC_FIREBASE_API_KEY=your-key
PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
PUBLIC_FIREBASE_DATABASE_URL=https://your-app.firebaseio.com
PUBLIC_FIREBASE_PROJECT_ID=your-project
PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
PUBLIC_FIREBASE_APP_ID=1:123456:web:abc123
PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Database Structure

```
games/
  {gameId}/
    players/
      {playerId}/
        name: "Charlotte"
        guess: "dot3"
        correct: false
        attempts: 2
        timestamp: 1234567890

    settings/
      maxPlayers: 6
      startTime: 1234567890
      status: "playing" | "waiting" | "finished"
```

### Firebase Operations

**1. Create Game Session**:
```javascript
import { ref, set } from 'firebase/database';

const gameId = generateUniqueId(); // e.g., random 6-char string
const gameRef = ref(db, `games/${gameId}`);

await set(gameRef, {
  settings: {
    maxPlayers: 6,
    status: 'waiting',
    created: Date.now()
  },
  players: {}
});
```

**2. Join Game**:
```javascript
import { ref, set } from 'firebase/database';

const playerId = generatePlayerId();
const playerRef = ref(db, `games/${gameId}/players/${playerId}`);

await set(playerRef, {
  name: assignedName,
  guess: null,
  correct: null,
  attempts: 0,
  joined: Date.now()
});
```

**3. Listen for Updates**:
```javascript
import { ref, onValue } from 'firebase/database';

const playersRef = ref(db, `games/${gameId}/players`);

onValue(playersRef, (snapshot) => {
  const data = snapshot.val();
  // Update UI with player data
  players = Object.values(data || {});
});
```

**4. Update Player Guess**:
```javascript
import { ref, update } from 'firebase/database';

const playerRef = ref(db, `games/${gameId}/players/${playerId}`);

await update(playerRef, {
  guess: "dot3",
  attempts: attempts + 1
});
```

### Security Notes

**Firebase API Keys**:
- API keys in Firebase are PUBLIC by design
- Security comes from Firebase Security Rules, not hidden keys
- Rules control who can read/write specific data paths

**Recommended Security Rules**:
```json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": "!data.exists() || !data.child('settings/locked').val()",
        "players": {
          "$playerId": {
            ".write": true
          }
        }
      }
    }
  }
}
```

---

## Data Flow

### Single Player Game (Versus Mode)

```
1. User loads page
2. Load CSV data → Filter to 1000+ occurrences
3. User clicks "Random Names"
4. Pick two names within 5k total births of each other
5. Render chart with lines hidden
6. Calculate drop zone positions:
   - Find purple line endpoint
   - Find pink line peak
   - Check for overlaps
   - Position boxes with arrows
7. User drags names to drop zones
8. Auto-submit on both filled
9. Check correctness → Show feedback
10. Reveal names with confetti if correct
```

### Multiplayer Game (Dot Plot)

```
1. User creates game → Generate gameId
2. Firebase creates /games/{gameId}
3. User shares link with friends
4. Friends join → Added to /games/{gameId}/players
5. Host starts game
6. Each player assigned random name
7. Firebase syncs all player states
8. Players make guesses
9. Firebase updates in real-time
10. Game ends when all correct or max attempts
11. Show results to all players
```

---

## Key Technologies

**SvelteKit 5**:
- `$state()` - Reactive state management
- `$effect()` - Side effects (like React useEffect)
- `$props()` - Component props

**D3.js**:
- `d3.scaleTime()` - Time scale for X-axis
- `d3.scaleLinear()` - Linear scale for Y-axis
- `d3.line()` - Path generator for line charts
- `d3.csv()` - CSV data loading

**Firebase Realtime Database**:
- Real-time data synchronization
- NoSQL JSON database
- WebSocket-based live updates
- Offline support built-in

---

## Performance Optimizations

1. **Data Filtering**: Only load names with 1000+ occurrences (reduces from 2.1M to 1M rows)
2. **CSV Parsing**: D3.csv with custom parser to validate/filter on load
3. **Reactive Rendering**: Charts only re-render when dependencies change
4. **Firebase**: Only subscribe to specific game sessions, not entire database

---

## Mobile Optimizations

**Touch Handling** (Versus.svelte):
- 30ms long-press to activate drag
- Haptic feedback on press and drop
- Custom ghost element follows touch
- Cancels drag if finger moves too much during long-press
- Prevents page scrolling during active drag

**Responsive Design**:
- Charts resize based on container width
- Different tick intervals on mobile (20 years vs 10)
- Touch-friendly button sizes (min 44x44px)
- Simplified UI on small screens

---

## Common Issues & Solutions

**Issue**: Firebase data not updating
- **Solution**: Check Firebase rules, ensure proper refs, verify gameId exists

**Issue**: Charts not rendering
- **Solution**: Ensure CSV loaded, check data format, verify D3 scales

**Issue**: Mobile drag not working
- **Solution**: Check touch event listeners, ensure `touch-action: none` in CSS

**Issue**: Drop zones overlapping lines
- **Solution**: Adjust threshold in overlap detection (currently 18% buffer)

---

## Future Enhancements

- [ ] Add authentication for persistent player profiles
- [ ] Leaderboards with Firebase
- [ ] More game modes (guess the year, rank names by popularity)
- [ ] Multiplayer Versus mode
- [ ] Voice chat integration
- [ ] Mobile app (Capacitor/Ionic)

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run build
make github

# Filter names data
python filter_names.py
```

---

## Questions?

For more details on specific implementations, check the inline code comments in each component file.
