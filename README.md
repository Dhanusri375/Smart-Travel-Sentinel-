# 🛡️ Smart Travel Sentinel

**Smart Travel Sentinel** is an AI-powered smart tourism and travel safety web application prototype designed for college project demonstrations, final-year vivas, and cloud hosting deployments.

---

## 🌟 Key Modules & Capabilities

1. **Login & Registration (Module 1)**:
   - Registration with Traveler Name, Email, Emergency Contact Name & Phone, and Blood Group / Allergies.
   - **1-Click College Demo Login** button for immediate presentation evaluation.
   - Persistent `localStorage` session state.

2. **Home Dashboard (Module 2)**:
   - Real-time weather and travel threat advisory ticker.
   - Active destination safety rating gauge (0 to 100).
   - Quick action tiles (AI Planner, QR Scanner, BLE Radar, Emergency, AI Bot).
   - Safe zones vs. caution corridors preview.

3. **AI Smart Trip Planner (Module 3)**:
   - Configurable inputs: Destination city, duration (1 to 7 days), budget tiers (Budget / Moderate / Luxury in ₹), and travel interests.
   - Generates day-by-day morning, afternoon, and evening safe itinerary.
   - Includes daily safety tips and estimated expenditure breakdown.
   - One-click "Add to My Timeline" integration.

4. **Tourist Safety Score Engine (Module 4)**:
   - Real-time safety gauge with color indicators (Safe Zone, Moderate Caution, High Caution).
   - 5 Granular Sub-indices: Solo/Women Safety, Night Travel, Medical Density, Scam Protection, and Weather Hazard.
   - Granular breakdown of Safe Corridors vs. Caution Zones.

5. **QR Tourist Guide & Audio Narrator (Module 5)**:
   - Simulated optical camera QR reader.
   - Interactive quick-select tags for major monuments (Nilgiri Mountain Railway, Government Botanical Garden, Amber Palace, KDHP Tea Museum, Taj Mahal).
   - Displays monument history, opening hours, multi-tier ticket fee (Indian, Foreign, Student, Camera), and on-site emergency / first-aid kiosks.
   - Built-in **Text-to-Speech (TTS) Audio Guide** powered by the Web Speech API.

6. **BLE Lost Item Radar Tracking (Module 6)**:
   - Interactive 360° sweeping radar animation with live blinking beacons.
   - Tracks 5 pre-registered travel items (Suitcase, Passport Wallet, Camera Kit, Backpack, Scooter Key).
   - Displays real-time signal strength (RSSI in dBm), distance estimate in meters, and battery levels.
   - **"Ring Item" Action**: Web Audio API generates audible dual-tone proximity chirps.
   - "Mark as Lost" toggle and "Register New BLE Tag" modal.

7. **Emergency Assistance Directory (Module 7)**:
   - Filterable directory: 24/7 Trauma Hospitals, Police Stations / Tourist Police Booths, and National Helplines (112, 100, 108, 1091, 1363, 1077).
   - Simulated direct dialer modal with GPS dispatch confirmation.

8. **Offline SOS Emergency System (Module 8)**:
   - 5-Second cancelable countdown dial with cancel failsafe.
   - Web Audio API dual-oscillator emergency siren (loud alternating frequencies) with mute toggle.
   - Screen strobe alert.
   - Instant generation of pre-formatted SMS and WhatsApp dispatch message containing mock GPS coordinates, landmark, battery level, and Google Maps link.

9. **Smart Travel Timeline (Module 9)**:
   - Chronological travel memory feed showing verified check-ins, security status, and personal notes.
   - "+ Add New Check-in" modal.
   - "Export Viva Summary" text report download.

10. **Sentinel AI Travel Assistant Chatbot (Module 10)**:
    - Conversational travel assistant with suggested prompt chips.
    - Intelligent domain responses for night travel safety, scam warnings, lost items, and budget advice.

11. **Multilingual Support (Module 11)**:
    - Instant live UI translation across 6 Indian languages:
      1. English
      2. தமிழ் (Tamil)
      3. తెలుగు (Telugu)
      4. ಕನ್ನಡ (Kannada)
      5. हिन्दी (Hindi)
      6. മലയാളം (Malayalam)

12. **User Profile & Settings (Module 12)**:
    - Verified digital traveler badge with ID.
    - Medical Emergency Alert card (Blood Group, Allergies, Insurance).
    - Dark / Light theme toggle.
    - Simulated offline mode toggle to test zero-network emergency behavior.
    - **"⚡ Load Viva Demo Dataset"** button to instantly restore all sample data.

---

## 🛠️ Technology Stack

- **Frontend Core**: Semantic HTML5, Vanilla ES6+ Modular JavaScript.
- **Styling**: Modern CSS3, Custom Properties, Glassmorphism backdrop-filters, CSS Keyframe Animations.
- **Audio Synthesis**: Web Audio API (Dual-tone frequency oscillators for SOS Siren & BLE Radar beeps).
- **Voice Narration**: Web Speech API (`SpeechSynthesisUtterance`).
- **Persistence**: Browser `localStorage` state engine.
- **Application Server**: Python 3 standard library `http.server` & `socketserver` (Zero pip dependencies).
- **Cloud Deployment**: Dynamic `PORT` and `HOST` binding, Procfile, Render YAML, Dockerfile, Vercel, and Netlify configurations.

---

## ☁️ Cloud Deployment Guide

The application is pre-configured for instant deployment on any major cloud hosting platform.

### Environment Variables
| Variable | Default (Local) | Cloud Usage | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `8000` | Injected by platform | The port the HTTP server binds to (e.g. `8080`, `10000`). |
| `HOST` | `0.0.0.0` | `0.0.0.0` | Network interface to bind to (`0.0.0.0` allows public routing). |
| `DEBUG` | `0` | Optional (`1`) | Set to `1` to enable verbose request logging. |

---

### 1. Deploy to Render (Recommended Free Option)
1. Push this repository to **GitHub** or **GitLab**.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
3. Connect your repository.
4. Set the following fields:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python server.py`
5. Click **Create Web Service**. Render will automatically detect the port via the `PORT` environment variable.
*(Alternatively, use the included `render.yaml` for a 1-click Blueprint deployment.)*

---

### 2. Deploy to Railway or Heroku
1. Push the code to GitHub.
2. In Railway or Heroku, create a new project from your repository.
3. The platform will automatically read the provided `Procfile`:
   ```
   web: python server.py
   ```
4. The service will build and launch automatically, routing public HTTP traffic to the app.

---

### 3. Deploy with Docker / Google Cloud Run / AWS
A multi-platform `Dockerfile` is included in the project root:

```bash
# Build the Docker image
docker build -t smart-travel-sentinel .

# Run the container locally or in cloud
docker run -p 8000:8000 -e PORT=8000 smart-travel-sentinel
```

For **Google Cloud Run**:
```bash
gcloud run deploy smart-travel-sentinel --source . --port 8000 --allow-unauthenticated
```

---

### 4. Deploy to Vercel or Netlify (Static CDN)
Because Smart Travel Sentinel is a self-contained Single-Page Application, it can also be hosted directly on static CDN platforms:
- **Vercel**: Import repository; settings are pre-configured via `vercel.json`.
- **Netlify**: Import repository; settings are pre-configured via `netlify.toml`.

---

## 💻 How to Run Locally

### Option 1: Quick Batch File (Windows)
Double-click:
```bat
run_demo.bat
```
Starts the local server on `http://localhost:8000` and opens your browser.

### Option 2: Python Command Line
From PowerShell or Command Prompt:
```powershell
py server.py
```
or
```powershell
python server.py
```
Custom host and port options are supported:
```powershell
python server.py --host 0.0.0.0 --port 8080 --no-browser
```

### Option 3: Direct Browser Launch
Open `index.html` directly in **Microsoft Edge**, **Google Chrome**, or any modern browser.

---

## 🎓 College Viva Presentation Walkthrough

1. **Introduction**: Click `⚡ 1-Click College Demo Login` to show the authenticated traveler profile.
2. **Dashboard**: Highlight the live weather ticker, destination safety index (89/100 for Ooty), and safe vs. caution zones.
3. **Multilingual Test**: Switch the language dropdown to **Tamil**, **Hindi**, or **Telugu** to show seamless real-time translation.
4. **AI Trip Planner**: Select 3 days and "Moderate" budget, then click **Generate AI Safe Itinerary**. Click "Add to Timeline".
5. **QR Tourist Guide**: Click on "Nilgiri Mountain Railway" or "Amber Palace" to view the historical dossier, ticket pricing, and click **🎧 Listen to Audio Guide** for speech synthesis.
6. **BLE Radar**: Show the 360° radar sweep. Click **Ring Item (Beep)** to demonstrate the audible locator sound.
7. **Offline SOS**: Tap the red **EMERGENCY SOS** button. Showcase the 5-second countdown, the synthesized siren alarm, and the generated GPS SMS payload.
8. **AI Chatbot**: Tap the chip *"Night safety in Ooty?"* or type a question to show the conversational intelligence.
