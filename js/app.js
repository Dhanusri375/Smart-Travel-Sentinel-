// Smart Travel Sentinel - Master Application Controller
// Orchestrates all 12 modules, state management, event listeners, and UI rendering

const STS_APP = {
  activeTab: "dashboard",
  currentDestination: null,
  bleDevices: [],
  timelineEntries: [],
  emergencyFilter: "all",
  sosCountdownTimer: null,
  sosCountdownCount: 5,
  isOfflineMode: false,

  currentUser: {
    name: "Dhanusri R",
    email: "tourist.dhanusri@sentinel.org",
    emergName: "Ramesh (Parent / Guardian)",
    emergPhone: "+91 98765 43210",
    bloodGroup: "O+ Positive",
    badgeId: "STS-2026-IND-9904",
    isAuthenticated: true
  },

  // 1. Initialization
  init() {
    // Initialize i18n
    if (window.STS_I18N) {
      STS_I18N.init();
      const langSelector = document.getElementById("languageSelector");
      if (langSelector) langSelector.value = STS_I18N.currentLang;
    }

    // Load persisted state or fallback to default mock data
    this.loadState();

    // Set initial destination
    const defaultDest = STS_DATA.destinations.find(d => d.id === STS_DATA.currentDestinationId) || STS_DATA.destinations[0];
    this.currentDestination = defaultDest;

    // Apply translations
    if (window.STS_I18N) {
      STS_I18N.applyTranslations();
    }

    // Render all initial screens
    this.renderHeaderAndTicker();
    this.renderDashboard();
    this.renderPlanner();
    this.renderSafetyScore();
    this.renderQrGuide();
    this.renderBleTracker();
    this.renderEmergencyDirectory();
    this.renderSosTerminal();
    this.renderTimeline();
    this.renderProfile();

    // Check user auth state
    this.checkAuthState();

    console.log("🛡️ Smart Travel Sentinel initialized successfully.");
  },

  // 2. State & Storage Management
  loadState() {
    const savedUser = localStorage.getItem("sts_user");
    if (savedUser) {
      try { this.currentUser = JSON.parse(savedUser); } catch(e){}
    }

    const savedBle = localStorage.getItem("sts_ble_devices");
    if (savedBle) {
      try { this.bleDevices = JSON.parse(savedBle); } catch(e){ this.bleDevices = [...STS_DATA.bleDevices]; }
    } else {
      this.bleDevices = [...STS_DATA.bleDevices];
    }

    const savedTimeline = localStorage.getItem("sts_timeline");
    if (savedTimeline) {
      try { this.timelineEntries = JSON.parse(savedTimeline); } catch(e){ this.timelineEntries = [...STS_DATA.timelineEntries]; }
    } else {
      this.timelineEntries = [...STS_DATA.timelineEntries];
    }
  },

  saveState() {
    localStorage.setItem("sts_user", JSON.stringify(this.currentUser));
    localStorage.setItem("sts_ble_devices", JSON.stringify(this.bleDevices));
    localStorage.setItem("sts_timeline", JSON.stringify(this.timelineEntries));
  },

  // 3. Authentication & Session Handling
  checkAuthState() {
    const authOverlay = document.getElementById("authOverlay");
    if (!authOverlay) return;

    if (!this.currentUser || !this.currentUser.isAuthenticated) {
      authOverlay.classList.add("active");
    } else {
      authOverlay.classList.remove("active");
      this.updateUserUI();
    }
  },

  toggleAuthMode(mode) {
    const loginBox = document.getElementById("loginFormContainer");
    const regBox = document.getElementById("registerFormContainer");
    if (mode === "register") {
      loginBox.style.display = "none";
      regBox.style.display = "block";
    } else {
      loginBox.style.display = "block";
      regBox.style.display = "none";
    }
  },

  handleLogin(e) {
    if (e) e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    this.currentUser = {
      name: "Dhanusri R",
      email: email,
      emergName: "Ramesh (Parent / Guardian)",
      emergPhone: "+91 98765 43210",
      bloodGroup: "O+ Positive",
      badgeId: "STS-2026-IND-9904",
      isAuthenticated: true
    };
    this.saveState();
    this.checkAuthState();
  },

  demoLogin() {
    this.currentUser = {
      name: "Dhanusri R (Demo)",
      email: "tourist.dhanusri@sentinel.org",
      emergName: "Ramesh (Parent / Guardian)",
      emergPhone: "+91 98765 43210",
      bloodGroup: "O+ Positive",
      badgeId: "STS-2026-DEMO",
      isAuthenticated: true
    };
    this.saveState();
    this.checkAuthState();
    this.showToast("⚡ Logged in with College Demo Preset!");
  },

  handleRegister(e) {
    if (e) e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const emergName = document.getElementById("regEmergName").value;
    const emergPhone = document.getElementById("regEmergPhone").value;
    const blood = document.getElementById("regBlood").value || "B+ Positive";

    this.currentUser = {
      name: name,
      email: email,
      emergName: emergName,
      emergPhone: emergPhone,
      bloodGroup: blood,
      badgeId: `STS-2026-IND-${Math.floor(1000 + Math.random() * 9000)}`,
      isAuthenticated: true
    };
    this.saveState();
    this.checkAuthState();
    this.showToast(`Welcome ${name}! Traveler profile created.`);
  },

  logout() {
    this.currentUser.isAuthenticated = false;
    this.saveState();
    this.checkAuthState();
  },

  updateUserUI() {
    const avatar = document.getElementById("userAvatarLetter");
    const name = document.getElementById("userDisplayName");
    const badge = document.getElementById("userBadgeId");
    const pName = document.getElementById("profileNameDisplay");
    const pBadge = document.getElementById("profileBadgeIdDisplay");
    const pBlood = document.getElementById("profileBloodDisplay");

    if (avatar) avatar.textContent = this.currentUser.name.charAt(0);
    if (name) name.textContent = this.currentUser.name;
    if (badge) badge.textContent = `ID: ${this.currentUser.badgeId}`;
    if (pName) pName.textContent = this.currentUser.name;
    if (pBadge) pBadge.textContent = this.currentUser.badgeId;
    if (pBlood) pBlood.textContent = this.currentUser.bloodGroup;
  },

  // 4. Navigation & Tab Switching
  navigateTo(tabId) {
    this.activeTab = tabId;

    // Update Sidebar Navigation
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-nav") === tabId) {
        link.classList.add("active");
      }
    });

    // Update Mobile Bottom Nav
    document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    // Show active view
    document.querySelectorAll(".tab-content").forEach(content => {
      content.classList.remove("active");
    });

    const activeView = document.getElementById(`view-${tabId}`);
    if (activeView) {
      activeView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Specific on-open triggers
    if (tabId === "ble") {
      this.renderBleTracker();
    } else if (tabId === "safety") {
      this.renderSafetyScore();
    }
  },

  // 5. Destination & Weather Management
  changeDestination(destId) {
    const dest = STS_DATA.destinations.find(d => d.id === destId);
    if (dest) {
      this.currentDestination = dest;
      STS_DATA.currentDestinationId = destId;
      this.renderHeaderAndTicker();
      this.renderDashboard();
      this.renderSafetyScore();
      this.renderEmergencyDirectory();
      this.renderSosTerminal();
      this.showToast(`Destination switched to ${dest.name}`);
    }
  },

  renderHeaderAndTicker() {
    const dest = this.currentDestination;
    if (!dest) return;

    const tickerText = document.getElementById("tickerText");
    const tickerWeather = document.getElementById("tickerWeather");
    const selector = document.getElementById("destinationSelector");

    if (tickerText) tickerText.textContent = `${dest.name}: ${dest.weatherStatus.alert}`;
    if (tickerWeather) tickerWeather.textContent = `⛅ ${dest.weatherStatus.temp} ${dest.weatherStatus.condition}`;
    if (selector) selector.value = dest.id;
  },

  // 6. Multilingual Language Switcher
  changeLanguage(langCode) {
    if (window.STS_I18N) {
      STS_I18N.setLanguage(langCode);
      this.showToast(`Language updated to ${langCode.toUpperCase()}`);
    }
  },

  toggleTheme() {
    const isLight = document.body.classList.toggle("light-theme");
    const icon = document.getElementById("themeIcon");
    if (icon) icon.textContent = isLight ? "🌙" : "☀️";
  },

  // 7. Dashboard Screen Rendering
  renderDashboard() {
    const dest = this.currentDestination;
    if (!dest) return;

    const heroName = document.getElementById("heroDestName");
    const heroDesc = document.getElementById("heroDestDesc");
    const heroSafetyTag = document.getElementById("heroSafetyTag");
    const gaugeVal = document.getElementById("dashboardGaugeVal");
    const gaugeFill = document.getElementById("dashboardGaugeFill");
    const statWeather = document.getElementById("statWeather");
    const statBle = document.getElementById("statBleCount");

    if (heroName) heroName.textContent = `${dest.name}, ${dest.state}`;
    if (heroDesc) heroDesc.textContent = `${dest.tagline}. Real-time safety telemetry, emergency patrol services, and climate advisories are currently active.`;
    if (heroSafetyTag) {
      heroSafetyTag.textContent = dest.status.toUpperCase();
      heroSafetyTag.style.color = dest.statusColor === "emerald" ? "#4ade80" : "#fbbf24";
    }

    if (gaugeVal) gaugeVal.textContent = dest.overallSafetyScore;
    if (gaugeFill) {
      // 283 is circle circumference. offset = 283 - (283 * score / 100)
      const offset = 283 - (283 * dest.overallSafetyScore / 100);
      gaugeFill.style.strokeDashoffset = offset;
      gaugeFill.style.stroke = dest.statusColor === "emerald" ? "#10b981" : "#f59e0b";
    }

    if (statWeather) statWeather.textContent = `${dest.weatherStatus.temp} ${dest.weatherStatus.condition}`;
    if (statBle) statBle.textContent = `${this.bleDevices.filter(d => !d.isLost).length} / ${this.bleDevices.length}`;

    // Render Safe & Caution Zones Preview
    const safeContainer = document.getElementById("dashSafeZonesList");
    const cautionContainer = document.getElementById("dashCautionZonesList");

    if (safeContainer) {
      safeContainer.innerHTML = dest.safeZones.map(zone => `
        <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <div style="font-weight: 700; font-size: 0.88rem; color: #4ade80;">${zone.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">${zone.note}</div>
        </div>
      `).join("");
    }

    if (cautionContainer) {
      cautionContainer.innerHTML = dest.cautionZones.map(zone => `
        <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <div style="font-weight: 700; font-size: 0.88rem; color: #fbbf24;">${zone.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">⚠️ ${zone.risk} - ${zone.advice}</div>
        </div>
      `).join("");
    }
  },

  // 8. AI Smart Trip Planner Screen
  renderPlanner() {
    // Initial generation for default parameters
    this.generateDefaultItinerary();
  },

  generateTripPlan(e) {
    if (e) e.preventDefault();
    const destId = document.getElementById("planDestSelect").value;
    const days = parseInt(document.getElementById("planDaysInput").value, 10);
    const budget = document.getElementById("planBudgetSelect").value;

    const dest = STS_DATA.destinations.find(d => d.id === destId) || this.currentDestination;
    this.buildItineraryUI(dest, days, budget);
    this.showToast(`✨ Generated ${days}-Day AI Plan for ${dest.name}!`);
  },

  generateDefaultItinerary() {
    this.buildItineraryUI(this.currentDestination, 3, "moderate");
  },

  buildItineraryUI(dest, days, budget) {
    const title = document.getElementById("itineraryPlanTitle");
    const sub = document.getElementById("itineraryPlanSubtitle");
    const list = document.getElementById("itineraryDaysList");

    if (title) title.textContent = `${days}-Day Curated Safe Itinerary: ${dest.name}`;
    if (sub) sub.textContent = `Optimized for ${budget.toUpperCase()} tier • Active Safety Rating: ${dest.overallSafetyScore}/100`;

    if (!list) return;

    let html = "";
    for (let day = 1; day <= days; day++) {
      html += `
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">
            <div style="font-weight: 800; font-size: 1rem; color: #38bdf8;">
              🗓️ DAY ${day}: ${day === 1 ? "Arrival & Heritage Exploration" : day === 2 ? "Scenic High-Altitude Trails" : "Cultural Landmarks & Local Markets"}
            </div>
            <span class="ticker-badge" style="background: rgba(16, 185, 129, 0.15); color: #4ade80;">Safe Hours: 07:00 - 19:30</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 14px;">
            <div style="background: rgba(0, 0, 0, 0.15); padding: 10px; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">🌅 MORNING (08:30 - 12:00)</span>
              <p style="font-size: 0.85rem; margin-top: 4px;">Visit ${day === 1 ? "Historic Heritage Walk" : day === 2 ? "Botanical Conservatory & Tea Estate" : "Lake Boathouse Walkway"}. Prepaid transit recommended.</p>
            </div>
            <div style="background: rgba(0, 0, 0, 0.15); padding: 10px; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; color: #fbbf24; font-weight: 700;">☀️ AFTERNOON (12:30 - 16:00)</span>
              <p style="font-size: 0.85rem; margin-top: 4px;">Authentic South Indian lunch at certified hygienic restaurant. Scanned QR audio tour at major monument.</p>
            </div>
            <div style="background: rgba(0, 0, 0, 0.15); padding: 10px; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; color: #a78bfa; font-weight: 700;">🌆 EVENING (16:30 - 19:30)</span>
              <p style="font-size: 0.85rem; margin-top: 4px;">Sunset panorama at safe designated viewpoints. Return to well-lit hotel zone before dense mountain fog.</p>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); background: rgba(14, 165, 233, 0.05); padding: 8px 12px; border-radius: var(--radius-sm);">
            <span>🛡️ Daily Advisory: Carry layered jackets & keep emergency speed-dial ready.</span>
            <span style="font-weight: 700; color: #cbd5e1;">Est. Daily Spend: ₹${budget === "budget" ? "1,800" : budget === "moderate" ? "4,200" : "9,500"}</span>
          </div>
        </div>
      `;
    }
    list.innerHTML = html;
  },

  saveItineraryToTimeline() {
    const newEntry = {
      id: `tl-${Date.now()}`,
      placeName: `Curated AI Trip: ${this.currentDestination.name}`,
      location: this.currentDestination.state,
      timestamp: "Today, Just now",
      badge: "AI Itinerary Added",
      badgeColor: "cyan",
      notes: `Generated safe travel itinerary. All emergency hotlines cached locally.`,
      coordinates: `${this.currentDestination.coordinates.lat}° N, ${this.currentDestination.coordinates.lng}° E`,
      photo: this.currentDestination.image
    };
    this.timelineEntries.unshift(newEntry);
    this.saveState();
    this.renderTimeline();
    this.showToast("Saved AI Itinerary to Travel Timeline!");
    this.navigateTo("timeline");
  },

  // 9. Tourist Safety Score Engine
  renderSafetyScore() {
    const dest = this.currentDestination;
    if (!dest) return;

    const bigVal = document.getElementById("safetyScoreBigVal");
    const bigGauge = document.getElementById("safetyScoreBigGauge");
    const badge = document.getElementById("safetyScoreRatingBadge");

    if (bigVal) bigVal.textContent = dest.overallSafetyScore;
    if (bigGauge) {
      const offset = 283 - (283 * dest.overallSafetyScore / 100);
      bigGauge.style.strokeDashoffset = offset;
      bigGauge.style.stroke = dest.statusColor === "emerald" ? "#10b981" : "#f59e0b";
    }
    if (badge) {
      badge.textContent = `${dest.status.toUpperCase()} (${dest.overallSafetyScore}/100)`;
      badge.style.color = dest.statusColor === "emerald" ? "#4ade80" : "#fbbf24";
    }

    // Subscores
    this.setSubscore("Women", dest.subScores.womenSafety);
    this.setSubscore("Night", dest.subScores.nightSafety);
    this.setSubscore("Medical", dest.subScores.medicalAccess);
    this.setSubscore("Scam", dest.subScores.scamRisk);
    this.setSubscore("Hazard", dest.subScores.naturalHazard);

    // Detail Grid
    const zonesGrid = document.getElementById("safetyZonesDetailGrid");
    if (zonesGrid) {
      zonesGrid.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 14px; border-radius: var(--radius-md);">
          <div style="font-weight: 700; color: #4ade80; margin-bottom: 8px;">🟢 High-Security Zones</div>
          ${dest.safeZones.map(z => `<div style="font-size: 0.82rem; margin-bottom: 6px;">• <strong>${z.name}</strong>: ${z.note}</div>`).join("")}
        </div>
        <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); padding: 14px; border-radius: var(--radius-md);">
          <div style="font-weight: 700; color: #fbbf24; margin-bottom: 8px;">🟡 Caution Corridors</div>
          ${dest.cautionZones.map(z => `<div style="font-size: 0.82rem; margin-bottom: 6px;">• <strong>${z.name}</strong>: ${z.risk} (${z.advice})</div>`).join("")}
        </div>
      `;
    }

    // Safety Tips List
    const tipsList = document.getElementById("safetyTipsDetailList");
    if (tipsList) {
      tipsList.innerHTML = dest.safetyTips.map(tip => `<li>${tip}</li>`).join("");
    }
  },

  setSubscore(key, val) {
    const valEl = document.getElementById(`sub${key}Val`);
    const barEl = document.getElementById(`sub${key}Bar`);
    if (valEl) valEl.textContent = `${val}%`;
    if (barEl) {
      barEl.style.width = `${val}%`;
      barEl.style.background = val >= 85 ? "#10b981" : val >= 70 ? "#0ea5e9" : "#f59e0b";
    }
  },

  // 10. QR Tourist Guide & Audio Narrator
  renderQrGuide() {
    const pillsContainer = document.getElementById("qrMonumentPills");
    if (!pillsContainer) return;

    pillsContainer.innerHTML = STS_DATA.attractions.map(attr => `
      <button class="chip-btn" style="padding: 6px 12px; font-weight: 600;" onclick="STS_APP.selectMonument('${attr.id}')">
        🏛️ ${attr.name}
      </button>
    `).join("");

    // Show first monument by default
    const firstMonument = STS_DATA.attractions[0];
    if (firstMonument) {
      this.displayMonumentDossier(firstMonument);
    }
  },

  selectMonument(attrId) {
    const attr = STS_DATA.attractions.find(a => a.id === attrId);
    if (attr) {
      this.displayMonumentDossier(attr);
      this.showToast(`Decoded QR Tag for ${attr.name}`);
    }
  },

  simulateQrCameraScan() {
    const randomAttr = STS_DATA.attractions[Math.floor(Math.random() * STS_DATA.attractions.length)];
    this.displayMonumentDossier(randomAttr);
    this.showToast(`📸 Camera Optical Scan Successful: ${randomAttr.name}`);
  },

  displayMonumentDossier(attr) {
    const container = document.getElementById("monumentDossierContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="sentinel-card">
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 20px; align-items: start;">
          <div>
            <img src="${attr.image}" alt="${attr.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 12px; border: 1px solid var(--border-glass);">
            <div style="background: var(--bg-card); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); text-align: center;">
              <span class="ticker-badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8;">VERIFIED QR PLAQUE</span>
              <div style="font-family: monospace; font-size: 0.8rem; margin-top: 6px; color: #94a3b8;">${attr.qrCodeId}</div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span class="ticker-badge" style="background: rgba(16, 185, 129, 0.15); color: #4ade80;">${attr.tag}</span>
                <h3 style="font-size: 1.4rem; font-weight: 800; margin: 4px 0;">${attr.name}</h3>
                <span style="color: var(--text-muted); font-size: 0.85rem;">📍 ${attr.city}, ${attr.state} • Built: ${attr.builtIn}</span>
              </div>
              <button class="btn-primary btn-sm" id="btnAudioTour" onclick="STS_APP.toggleAudioTour('${attr.id}')">
                🎧 Listen to Audio Guide
              </button>
            </div>

            <p style="margin: 14px 0; font-size: 0.9rem; line-height: 1.5; color: #cbd5e1;">${attr.history}</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px;">
              <div style="background: var(--bg-card); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">VISITING HOURS</div>
                <div style="font-weight: 700; font-size: 0.82rem; margin-top: 2px;">${attr.openingHours}</div>
              </div>
              <div style="background: var(--bg-card); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">ENTRY TICKET (INDIAN)</div>
                <div style="font-weight: 700; font-size: 0.82rem; margin-top: 2px; color: #4ade80;">${attr.entryFee.domestic}</div>
              </div>
              <div style="background: var(--bg-card); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
                <div style="font-size: 0.72rem; color: var(--text-muted);">FOREIGN NATIONALS</div>
                <div style="font-weight: 700; font-size: 0.82rem; margin-top: 2px;">${attr.entryFee.foreign}</div>
              </div>
            </div>

            <div style="padding: 12px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-sm); font-size: 0.82rem;">
              <div style="font-weight: 700; color: #f87171; margin-bottom: 4px;">🏥 On-Site Emergency & First Aid Station</div>
              <div>• ${attr.emergencyServices.firstAidStation}</div>
              <div>• ${attr.emergencyServices.policePost}</div>
              <div>• Nearest Hospital: ${attr.emergencyServices.nearestHospital}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggleAudioTour(attrId) {
    const attr = STS_DATA.attractions.find(a => a.id === attrId);
    if (!attr) return;

    const btn = document.getElementById("btnAudioTour");
    if (STS_AUDIO.isAudioGuidePlaying) {
      STS_AUDIO.stopAudioGuide();
      if (btn) btn.textContent = "🎧 Listen to Audio Guide";
      this.showToast("Audio guide stopped.");
    } else {
      if (btn) btn.textContent = "⏹ Stop Audio Guide";
      this.showToast("Playing synthesized audio narration...");
      STS_AUDIO.playAudioGuide(attr.audioScript, STS_I18N.currentLang, () => {
        if (btn) btn.textContent = "🎧 Listen to Audio Guide";
      });
    }
  },

  // 11. BLE Lost Item Radar Tracking
  renderBleTracker() {
    this.renderBleRadarBlips();
    this.renderBleList();
  },

  renderBleRadarBlips() {
    const container = document.getElementById("radarBlipsContainer");
    if (!container) return;

    // Fixed radial offsets for radar animation
    const blipPositions = [
      { top: "42%", left: "55%" },
      { top: "48%", left: "48%" },
      { top: "30%", left: "70%" },
      { top: "85%", left: "20%" },
      { top: "54%", left: "40%" },
      { top: "60%", left: "62%" }
    ];

    container.innerHTML = this.bleDevices.map((dev, idx) => {
      const pos = blipPositions[idx % blipPositions.length];
      return `
        <div class="radar-blip ${dev.isLost ? 'lost' : ''}" style="top: ${pos.top}; left: ${pos.left};" title="${dev.name} (${dev.distanceMeters}m)"></div>
      `;
    }).join("");
  },

  renderBleList() {
    const list = document.getElementById("bleItemsList");
    const badgeCount = document.getElementById("bleBadgeCount");
    if (badgeCount) badgeCount.textContent = `${this.bleDevices.length} items`;
    if (!list) return;

    list.innerHTML = this.bleDevices.map(dev => `
      <div class="ble-card ${dev.isLost ? 'lost' : ''}">
        <div class="ble-card-top">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">${dev.icon === 'briefcase' ? '🧳' : dev.icon === 'camera' ? '📷' : dev.icon === 'credit-card' ? '💳' : dev.icon === 'key' ? '🔑' : '🎒'}</span>
            <div>
              <div class="ble-card-title">${dev.name}</div>
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">${dev.tagNumber}</span>
            </div>
          </div>
          <span class="ticker-badge" style="background: ${dev.isLost ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}; color: ${dev.isLost ? '#f87171' : '#4ade80'};">
            ${dev.isLost ? 'LOST ALERT' : 'CONNECTED'}
          </span>
        </div>

        <div style="font-size: 0.8rem; color: var(--text-muted);">
          <div>📍 Last Seen: <strong style="color: #cbd5e1;">${dev.lastSeenLocation}</strong> (${dev.lastSeenTimestamp})</div>
          <div style="margin-top: 2px;">🔋 Battery: ${dev.batteryPercent}% • Proximity: <strong style="color: #38bdf8;">${dev.proximityState} (~${dev.distanceMeters}m)</strong></div>
        </div>

        <div class="ble-rssi-meter">
          <span>Signal (${dev.rssi} dBm):</span>
          <div class="rssi-bars">
            <div class="rssi-bar ${dev.isLost ? 'lost' : 'active'}" style="height: 4px;"></div>
            <div class="rssi-bar ${dev.isLost ? 'lost' : 'active'}" style="height: 7px;"></div>
            <div class="rssi-bar ${dev.rssi > -70 && !dev.isLost ? 'active' : ''}" style="height: 10px;"></div>
            <div class="rssi-bar ${dev.rssi > -55 && !dev.isLost ? 'active' : ''}" style="height: 13px;"></div>
          </div>
          <span>${dev.signalQuality}</span>
        </div>

        <div class="ble-card-actions">
          <button class="btn-primary btn-sm" style="flex: 1;" onclick="STS_APP.ringBleItem('${dev.id}', ${dev.distanceMeters})">
            🔔 Ring Item (Beep)
          </button>
          <button class="btn-secondary btn-sm" onclick="STS_APP.toggleMarkLost('${dev.id}')">
            ${dev.isLost ? '✓ Mark Found' : '⚠️ Mark as Lost'}
          </button>
        </div>
      </div>
    `).join("");
  },

  ringBleItem(devId, distance) {
    const dev = this.bleDevices.find(d => d.id === devId);
    if (!dev) return;

    this.showToast(`🔊 Emitting proximity locator chirps for ${dev.name}...`);
    STS_AUDIO.ringBleDevice(dev.name, distance, () => {
      this.showToast(`✓ Audible chirp response received from ${dev.name}`);
    });
  },

  toggleMarkLost(devId) {
    const dev = this.bleDevices.find(d => d.id === devId);
    if (dev) {
      dev.isLost = !dev.isLost;
      this.saveState();
      this.renderBleTracker();
      this.showToast(`${dev.name} marked as ${dev.isLost ? 'LOST! Community mesh alert initiated.' : 'FOUND & SECURED.'}`);
    }
  },

  rescanBleDevices() {
    this.showToast("🔄 Re-scanning Bluetooth 5.2 advertisement bands...");
    setTimeout(() => {
      this.bleDevices.forEach(d => {
        if (!d.isLost) {
          d.rssi = Math.min(-35, d.rssi + (Math.floor(Math.random() * 8) - 4));
        }
      });
      this.renderBleTracker();
      this.showToast("✓ BLE proximity telemetry synced.");
    }, 600);
  },

  openAddBleModal() {
    const modal = document.getElementById("addBleModal");
    if (modal) modal.classList.add("active");
  },

  handleAddBleDevice(e) {
    if (e) e.preventDefault();
    const name = document.getElementById("newBleName").value;
    const cat = document.getElementById("newBleCategory").value;
    const prox = document.getElementById("newBleProximity").value;

    const dist = prox === "near" ? 0.7 : prox === "room" ? 3.2 : 11.5;
    const rssi = prox === "near" ? -44 : prox === "room" ? -65 : -86;

    const newItem = {
      id: `ble-${Date.now()}`,
      name: name,
      category: cat,
      tagNumber: `STS-BLE-${Math.floor(1000 + Math.random() * 9000)}`,
      icon: cat === "Electronics" ? "camera" : cat === "Luggage" ? "briefcase" : "key",
      rssi: rssi,
      signalQuality: prox === "near" ? "Strong Signal" : "Moderate Signal",
      distanceMeters: dist,
      proximityState: prox === "near" ? "Immediate Proximity" : "In Room",
      batteryPercent: 99,
      lastSeenLocation: "Current Tourist Location",
      lastSeenTimestamp: "Just now",
      isLost: false,
      coordinates: this.currentDestination.coordinates
    };

    this.bleDevices.unshift(newItem);
    this.saveState();
    this.closeModals();
    this.renderBleTracker();
    this.showToast(`Registered new BLE tag for ${name}!`);
  },

  // 12. Emergency Assistance Directory
  renderEmergencyDirectory() {
    const container = document.getElementById("emergencyListContainer");
    if (!container) return;

    const destKey = this.currentDestination.id;
    const localServices = STS_DATA.emergencyDirectory.byCity[destKey] || STS_DATA.emergencyDirectory.byCity["ooty"] || [];
    const nationalServices = STS_DATA.emergencyDirectory.national || [];

    let combined = [];
    if (this.emergencyFilter === "all") {
      combined = [...localServices, ...nationalServices];
    } else if (this.emergencyFilter === "hospital") {
      combined = localServices.filter(s => s.type === "hospital");
    } else if (this.emergencyFilter === "police") {
      combined = localServices.filter(s => s.type === "police");
    } else if (this.emergencyFilter === "national") {
      combined = nationalServices;
    }

    container.innerHTML = combined.map(item => {
      const isNational = !item.type;
      return `
        <div class="sentinel-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div style="font-weight: 800; font-size: 1rem; color: #f8fafc;">${item.name}</div>
            <span class="ticker-badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8;">
              ${isNational ? item.badge : item.distance}
            </span>
          </div>

          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">
            ${isNational ? item.desc : item.address}
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <div style="font-size: 1.1rem; font-weight: 800; color: #38bdf8;">
              ${item.number || item.phone}
            </div>
            <button class="btn-primary btn-sm" onclick="STS_APP.callEmergency('${item.name}', '${item.number || item.phone}')">
              📞 Direct Call
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  filterEmergency(filter) {
    this.emergencyFilter = filter;
    document.querySelectorAll("#btnFilterEmergAll, #btnFilterEmergHosp, #btnFilterEmergPolice, #btnFilterEmergNat").forEach(btn => btn.classList.remove("active"));
    if (filter === "all") document.getElementById("btnFilterEmergAll").classList.add("active");
    if (filter === "hospital") document.getElementById("btnFilterEmergHosp").classList.add("active");
    if (filter === "police") document.getElementById("btnFilterEmergPolice").classList.add("active");
    if (filter === "national") document.getElementById("btnFilterEmergNat").classList.add("active");
    this.renderEmergencyDirectory();
  },

  callEmergency(name, number) {
    const modal = document.getElementById("callSimulatorModal");
    const title = document.getElementById("callSimTitle");
    const num = document.getElementById("callSimNumber");
    const desc = document.getElementById("callSimDesc");

    if (title) title.textContent = `Connecting: ${name}`;
    if (num) num.textContent = number;
    if (desc) desc.textContent = `Dispatching emergency telemetry and coordinates to ${name} command center.`;
    if (modal) modal.classList.add("active");
  },

  // 13. Offline SOS Emergency Engine
  renderSosTerminal() {
    const dest = this.currentDestination;
    if (!dest) return;

    const coordsVal = document.getElementById("sosCoordinatesVal");
    const landmarkVal = document.getElementById("sosLandmarkVal");
    const contactVal = document.getElementById("sosContactVal");
    const msgPreview = document.getElementById("sosMessagePreview");

    const coordsStr = `${dest.coordinates.lat.toFixed(4)}° N, ${dest.coordinates.lng.toFixed(4)}° E`;
    if (coordsVal) coordsVal.textContent = coordsStr;
    if (landmarkVal) landmarkVal.textContent = `Near Central Promenade, ${dest.name}`;
    if (contactVal) contactVal.textContent = `${this.currentUser.emergName} (${this.currentUser.emergPhone})`;

    const message = `🚨 EMERGENCY SOS! I need immediate help! My location: ${dest.name}, ${dest.state}. GPS: ${coordsStr} (Map: https://maps.google.com/?q=${dest.coordinates.lat},${dest.coordinates.lng}). Battery: 88%. Sent via Smart Travel Sentinel Offline Beacon.`;
    if (msgPreview) msgPreview.value = message;
  },

  triggerSosFlow() {
    const modal = document.getElementById("sosCountdownModal");
    const num = document.getElementById("sosCountdownNumber");
    if (!modal) return;

    modal.classList.add("active");
    this.sosCountdownCount = 5;
    if (num) num.textContent = "5";

    // Play siren
    STS_AUDIO.startSiren();

    if (this.sosCountdownTimer) clearInterval(this.sosCountdownTimer);
    this.sosCountdownTimer = setInterval(() => {
      this.sosCountdownCount--;
      if (num) num.textContent = this.sosCountdownCount;
      if (this.sosCountdownCount <= 0) {
        clearInterval(this.sosCountdownTimer);
        this.executeSosNow();
      }
    }, 1000);
  },

  cancelSos() {
    if (this.sosCountdownTimer) {
      clearInterval(this.sosCountdownTimer);
      this.sosCountdownTimer = null;
    }
    STS_AUDIO.stopSiren();
    this.closeModals();
    this.showToast("✓ SOS Beacon Cancelled.");
  },

  toggleSirenSound() {
    const isPlaying = STS_AUDIO.toggleSiren();
    const btn = document.getElementById("sirenMuteBtn");
    if (btn) {
      btn.textContent = isPlaying ? "🔊 Siren Active (Mute)" : "🔇 Siren Muted (Unmute)";
    }
  },

  executeSosNow() {
    if (this.sosCountdownTimer) {
      clearInterval(this.sosCountdownTimer);
      this.sosCountdownTimer = null;
    }
    this.closeModals();

    const dest = this.currentDestination;
    const sosLog = {
      id: `sos-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      destination: dest.name,
      coordinates: `${dest.coordinates.lat}° N, ${dest.coordinates.lng}° E`
    };
    localStorage.setItem("sts_last_sos", JSON.stringify(sosLog));

    alert(`🚨 SOS DISPATCH EXECUTED!\n\nEmergency dispatch packet transmitted to:\n- Universal Command Hotline 112\n- Primary Contact: ${this.currentUser.emergName} (${this.currentUser.emergPhone})\n- Telemetry: ${dest.coordinates.lat}° N, ${dest.coordinates.lng}° E\n\nRemain in a secure, visible location until responders arrive.`);
  },

  copySosMessage() {
    const msg = document.getElementById("sosMessagePreview").value;
    navigator.clipboard.writeText(msg).then(() => {
      this.showToast("📋 Emergency SMS payload copied to clipboard!");
    }).catch(() => {
      this.showToast("Failed to copy text automatically.");
    });
  },

  simulateSendSms() {
    const msg = document.getElementById("sosMessagePreview").value;
    const phone = this.currentUser.emergPhone.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, "_blank");
    this.showToast("📱 Opening emergency dispatch SMS / WhatsApp channel...");
  },

  // 14. Travel Timeline Diary
  renderTimeline() {
    const list = document.getElementById("timelineFeedList");
    if (!list) return;

    list.innerHTML = this.timelineEntries.map(entry => `
      <div class="timeline-item">
        <div class="timeline-node ${entry.badgeColor === 'emerald' ? 'safe' : 'caution'}"></div>
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <div>
              <span class="ticker-badge" style="background: ${entry.badgeColor === 'emerald' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(14, 165, 233, 0.15)'}; color: ${entry.badgeColor === 'emerald' ? '#4ade80' : '#38bdf8'};">
                ${entry.badge}
              </span>
              <h4 style="font-weight: 800; font-size: 1.05rem; margin-top: 4px;">${entry.placeName}</h4>
              <span style="font-size: 0.78rem; color: var(--text-muted);">📍 ${entry.location} • ${entry.coordinates}</span>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${entry.timestamp}</span>
          </div>

          <p style="font-size: 0.86rem; color: #cbd5e1; margin-top: 8px;">${entry.notes}</p>
        </div>
      </div>
    `).join("");
  },

  openAddTimelineModal() {
    const modal = document.getElementById("addTimelineModal");
    if (modal) modal.classList.add("active");
  },

  handleAddTimeline(e) {
    if (e) e.preventDefault();
    const place = document.getElementById("newTlPlace").value;
    const status = document.getElementById("newTlStatus").value;
    const notes = document.getElementById("newTlNotes").value;

    const newEntry = {
      id: `tl-${Date.now()}`,
      placeName: place,
      location: `${this.currentDestination.name}, ${this.currentDestination.state}`,
      timestamp: "Today, Just now",
      badge: status,
      badgeColor: status.includes("Safe") ? "emerald" : "cyan",
      notes: notes || "Visited with active Sentinel safety telemetry verified.",
      coordinates: `${this.currentDestination.coordinates.lat}° N, ${this.currentDestination.coordinates.lng}° E`
    };

    this.timelineEntries.unshift(newEntry);
    this.saveState();
    this.closeModals();
    this.renderTimeline();
    this.showToast(`Recorded check-in for ${place}!`);
  },

  exportTimelineSummary() {
    let report = `=== SMART TRAVEL SENTINEL - TRAVELER SUMMARY REPORT ===\n`;
    report += `Traveler: ${this.currentUser.name} (Badge: ${this.currentUser.badgeId})\n`;
    report += `Destination: ${this.currentDestination.name}, ${this.currentDestination.state}\n`;
    report += `Safety Rating: ${this.currentDestination.overallSafetyScore}/100\n`;
    report += `Total Verified Check-ins: ${this.timelineEntries.length}\n\n`;
    report += `CHECK-IN LOGS:\n`;
    this.timelineEntries.forEach((t, i) => {
      report += `${i + 1}. [${t.timestamp}] ${t.placeName} (${t.badge})\n   Notes: ${t.notes}\n   Coords: ${t.coordinates}\n\n`;
    });

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sentinel_Travel_Summary_${this.currentUser.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    this.showToast("📄 Exported Travel Summary text report!");
  },

  // 15. AI Travel Assistant Chatbot
  sendChatMessage() {
    const input = document.getElementById("chatInput");
    const query = input.value.trim();
    if (!query) return;

    input.value = "";
    this.appendChatBubble(query, "user");

    // Simulate smart AI typing delay
    setTimeout(() => {
      const response = this.generateAiResponse(query);
      this.appendChatBubble(response, "bot");
    }, 450);
  },

  sendQuickPrompt(text) {
    this.appendChatBubble(text, "user");
    setTimeout(() => {
      const response = this.generateAiResponse(text);
      this.appendChatBubble(response, "bot");
    }, 450);
  },

  appendChatBubble(text, sender) {
    const container = document.getElementById("chatMessages");
    if (!container) return;

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\n/g, "<br>");
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  },

  generateAiResponse(prompt) {
    const lower = prompt.toLowerCase();
    const responses = STS_DATA.aiResponses;

    if (lower.includes("sos") || lower.includes("emergency") || lower.includes("danger") || lower.includes("police") || lower.includes("help")) {
      return responses.emergency;
    }
    if (lower.includes("lost") || lower.includes("bag") || lower.includes("luggage") || lower.includes("item") || lower.includes("passport")) {
      return responses.lostBelongings;
    }
    if (lower.includes("scam") || lower.includes("cheat") || lower.includes("fraud") || lower.includes("tout")) {
      return responses.scamAdvice;
    }
    if (lower.includes("solo") || lower.includes("women") || lower.includes("girl") || lower.includes("safe")) {
      return responses.soloSafety;
    }
    if (lower.includes("budget") || lower.includes("cost") || lower.includes("plan") || lower.includes("itinerary")) {
      return responses.budgetPlan;
    }
    if (lower.includes("ooty")) {
      return responses.ootyTips;
    }

    return `Thank you for your question about **${prompt}**!\n\nAs your Sentinel AI Assistant, I recommend checking our **Tourist Safety Score** for real-time risk ratings, keeping your belongings tagged on our **BLE Radar**, and remembering that emergency helpline **112** is always available 24/7. Is there a specific destination or safety protocol you would like me to detail?`;
  },

  // 16. Profile & Demo Preloader
  renderProfile() {
    this.updateUserUI();
  },

  saveProfileSettings(e) {
    if (e) e.preventDefault();
    this.currentUser.name = document.getElementById("settingName").value;
    this.currentUser.email = document.getElementById("settingEmail").value;
    this.currentUser.emergName = document.getElementById("settingEmergName").value;
    this.currentUser.emergPhone = document.getElementById("settingEmergPhone").value;
    this.saveState();
    this.updateUserUI();
    this.showToast("✓ Sentinel Profile and Emergency Settings Saved!");
  },

  loadDemoPresetData() {
    this.bleDevices = [...STS_DATA.bleDevices];
    this.timelineEntries = [...STS_DATA.timelineEntries];
    this.currentDestination = STS_DATA.destinations[0];
    this.saveState();
    this.renderDashboard();
    this.renderBleTracker();
    this.renderTimeline();
    this.renderSafetyScore();
    this.showToast("⚡ College Viva Demo Data Preset Loaded Successfully!");
    this.navigateTo("dashboard");
  },

  toggleOfflineMode(isChecked) {
    this.isOfflineMode = isChecked;
    this.showToast(isChecked ? "📡 Simulated Offline Mode Active (Zero network fallback)" : "🌐 Online Sync Mode Restored");
  },

  // Helper Modal & Toast Methods
  closeModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  },

  showToast(message) {
    const existing = document.getElementById("stsToast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "stsToast";
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1e293b;
      color: #f8fafc;
      padding: 12px 20px;
      border-radius: 9999px;
      border: 1px solid #0ea5e9;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      font-size: 0.88rem;
      font-weight: 600;
      z-index: 999;
      animation: fadeIn 0.2s ease-in;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast) toast.remove();
    }, 3200);
  }
};

// Bootstrap when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  STS_APP.init();
});

window.STS_APP = STS_APP;
