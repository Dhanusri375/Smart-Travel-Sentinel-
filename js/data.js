// Smart Travel Sentinel - Mock Data Repository
// Realistic mock datasets for GPS, BLE, Emergency Services, Tourist Safety & AI

const STS_DATA = {
  // Current active user destination (default)
  currentDestinationId: "ooty",

  // Destinations with detailed Safety Index & Risk Metrics
  destinations: [
    {
      id: "ooty",
      name: "Ooty (Udhagamandalam)",
      state: "Tamil Nadu",
      tagline: "Queen of Hill Stations",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
      overallSafetyScore: 89,
      status: "Safe Zone",
      statusColor: "emerald",
      subScores: {
        womenSafety: 91,
        nightSafety: 78,
        medicalAccess: 84,
        scamRisk: 92, // higher = lower scam risk
        naturalHazard: 82
      },
      weatherStatus: {
        temp: "17°C",
        condition: "Misty & Mild",
        alert: "Moderate evening fog on Doddabetta Ghat Road; avoid two-wheeler rides after 8 PM."
      },
      safeZones: [
        { name: "Charring Cross & Commercial Road", type: "High Police Patrol", note: "CCTV monitored 24/7, busy pedestrian hub." },
        { name: "Government Botanical Garden Area", type: "Family Safe Area", note: "Security kiosks and park rangers stationed." },
        { name: "Ooty Lake Boathouse Promenade", type: "Regulated Tourist Zone", note: "Life guards and tourist helpdesk present." }
      ],
      cautionZones: [
        { name: "Upper Doddabetta Forest Slopes", risk: "Wild Elephant Movement & Dense Fog", advice: "Do not venture after sunset without local forest guide." },
        { name: "Avalanche Forest Unpaved Track", risk: "Zero Cellular Signal in Ravines", advice: "Ensure offline map download and file trail itinerary with forest checkpoint." }
      ],
      safetyTips: [
        "Carry warm layered clothing; sudden temperature drop can trigger hypothermia.",
        "Rely only on prepaid taxi counters at Ooty Railway Station to prevent fare gouging.",
        "Store Ooty District Tourist Police helpline (+91 423 244 4040) in speed dial.",
        "Strict anti-plastic ban in the Nilgiris; carry reusable stainless steel flasks."
      ],
      coordinates: { lat: 11.4102, lng: 76.6950 }
    },
    {
      id: "munnar",
      name: "Munnar",
      state: "Kerala",
      tagline: "Emerald Tea Gardens of the Western Ghats",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
      overallSafetyScore: 92,
      status: "Very Safe",
      statusColor: "emerald",
      subScores: {
        womenSafety: 94,
        nightSafety: 81,
        medicalAccess: 86,
        scamRisk: 95,
        naturalHazard: 80
      },
      weatherStatus: {
        temp: "19°C",
        condition: "Light Showers",
        alert: "Slippery hairpin bends along Gap Road; maintain low gears."
      },
      safeZones: [
        { name: "Old Munnar Town & Post Office Rd", type: "Town Hub", note: "Continuous local presence and pharmacy availability." },
        { name: "KDHP Tea Museum Enclave", type: "Guided Tourism Area", note: "Security staff and organized parking." }
      ],
      cautionZones: [
        { name: "Lockhart Gap Viewpoint Edge", risk: "Steep Unfenced Cliffs", advice: "Keep safe distance from gravel edge during photography." }
      ],
      safetyTips: [
        "Wear leech socks when taking nature walks inside tea plantations during monsoon.",
        "High quality medical care available at Tata General Hospital Munnar.",
        "Dial 108 for round-the-clock hilly terrain ambulance rescue."
      ],
      coordinates: { lat: 10.0889, lng: 77.0595 }
    },
    {
      id: "jaipur",
      name: "Jaipur",
      state: "Rajasthan",
      tagline: "The Royal Pink City",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      overallSafetyScore: 81,
      status: "Moderate Caution",
      statusColor: "amber",
      subScores: {
        womenSafety: 79,
        nightSafety: 74,
        medicalAccess: 94,
        scamRisk: 72,
        naturalHazard: 96
      },
      weatherStatus: {
        temp: "31°C",
        condition: "Sunny & Dry",
        alert: "High UV index between 11 AM - 3 PM; stay hydrated and carry sun protection."
      },
      safeZones: [
        { name: "C-Scheme & Civil Lines", type: "Diplomatic & Elite Quarter", note: "Heavily patrolled, excellent nightlife safety." },
        { name: "City Palace & Jantar Mantar Campus", type: "Heritage Security Zone", note: "Rajasthan Tourist Assistance Force (TAF) on duty." }
      ],
      cautionZones: [
        { name: "Bapu Bazaar Alleyways after 9 PM", risk: "Persistent Touts & Gem Scams", advice: "Politely decline unsolicited gem dealer invitations." },
        { name: "Amber Fort Elephant Pathway", risk: "Extreme Crowd Congestion", advice: "Secure wallets in front pockets." }
      ],
      safetyTips: [
        "Use government-approved RTDC guides wearing official photo badges only.",
        "Always request metered rides or use app-based cabs (Uber/Ola) at Jaipur Junction.",
        "SMS 'HELP' to Rajasthan Police Women Cell at 1090 for rapid response."
      ],
      coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    {
      id: "goa",
      name: "Goa (North & South)",
      state: "Goa",
      tagline: "Sun, Sand & Heritage Coastline",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      overallSafetyScore: 85,
      status: "Safe Zone",
      statusColor: "emerald",
      subScores: {
        womenSafety: 86,
        nightSafety: 84,
        medicalAccess: 88,
        scamRisk: 80,
        naturalHazard: 87
      },
      weatherStatus: {
        temp: "29°C",
        condition: "Tropical Breeze",
        alert: "Strong red-flag rip currents at Baga and Calangute beaches; swimming strictly prohibited."
      },
      safeZones: [
        { name: "Fontainhas Latin Quarter, Panaji", type: "Heritage Walk", note: "Peaceful, well-lit heritage streets." },
        { name: "Palolem Beach Front", type: "Calm Family Bay", note: "Active Lifeguards (Drishti Marine) stationed." }
      ],
      cautionZones: [
        { name: "Anjuna Rocky Coast after midnight", risk: "Isolated trails, low illumination", advice: "Avoid unaccompanied walking on deserted cliffs." }
      ],
      safetyTips: [
        "Never swim past red warning flags placed by Drishti Lifeguard services.",
        "Check vehicle condition and helmet laws before renting two-wheelers.",
        "Goa Tourist Police Assistance Kiosk is active 24/7 at Calangute Circle."
      ],
      coordinates: { lat: 15.2993, lng: 74.1240 }
    },
    {
      id: "manali",
      name: "Manali",
      state: "Himachal Pradesh",
      tagline: "Himalayan Gateway & Valley of the Gods",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      overallSafetyScore: 84,
      status: "Moderate Caution",
      statusColor: "amber",
      subScores: {
        womenSafety: 88,
        nightSafety: 72,
        medicalAccess: 78,
        scamRisk: 89,
        naturalHazard: 75
      },
      weatherStatus: {
        temp: "11°C",
        condition: "Chilly & Clear",
        alert: "Rohtang Pass high altitude sickness risk; acclimatize before travel."
      },
      safeZones: [
        { name: "The Mall Road, Manali", type: "Pedestrian Zone", note: "CCTV coverage, no motor vehicles, high tourist police density." }
      ],
      cautionZones: [
        { name: "Solang Valley River Bed", risk: "Flash Floods & Swift Currents", advice: "Do not step into Beas riverbed rocks." }
      ],
      safetyTips: [
        "Verify snow chain compliance when traveling via Atal Tunnel during sub-zero mornings.",
        "Carry prescribed Diamox for altitude sickness if ascending above 3000m.",
        "Register your trek with HP Tourism Police before departing Solang."
      ],
      coordinates: { lat: 32.2432, lng: 77.1892 }
    },
    {
      id: "varanasi",
      name: "Varanasi (Kashi)",
      state: "Uttar Pradesh",
      tagline: "The Spiritual Capital of India",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      overallSafetyScore: 78,
      status: "Moderate Caution",
      statusColor: "amber",
      subScores: {
        womenSafety: 76,
        nightSafety: 70,
        medicalAccess: 89,
        scamRisk: 68,
        naturalHazard: 91
      },
      weatherStatus: {
        temp: "26°C",
        condition: "Clear Sky",
        alert: "Extremely heavy pedestrian crush during evening Dashashwamedh Ganga Aarti."
      },
      safeZones: [
        { name: "Assi Ghat Cultural Plaza", type: "Student & Cultural Hub", note: "Pleasant ambiance, lit walkways, morning yoga security." }
      ],
      cautionZones: [
        { name: "Narrow Galis behind Manikarnika", risk: "Easy to get disoriented, aggressive cow movement", advice: "Use GPS offline pins and stick to main bazaar paths." }
      ],
      safetyTips: [
        "Fix boat ride prices beforehand at the official government fixed rate board.",
        "Beware of unofficial 'Ganga Aarti VIP pass' sellers; viewing from public ghats is free.",
        "Keep backpack strapped to front in narrow temple alleys."
      ],
      coordinates: { lat: 25.3176, lng: 82.9739 }
    }
  ],

  // Attractions with Simulated QR Codes, audio guides, pricing and emergency facilities
  attractions: [
    {
      id: "ooty-mountain-railway",
      destinationId: "ooty",
      name: "Nilgiri Mountain Railway (Toy Train)",
      tag: "UNESCO World Heritage Site",
      qrCodeId: "QR-NMR-UNESCO-01",
      city: "Ooty",
      state: "Tamil Nadu",
      builtIn: "1908 (British Engineering Marvel)",
      image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
      history: "Built in 1908 by the British, this 46 km meter-gauge railway uses the Abt alternate racking system to climb the steepest track in Asia from Mettupalayam to Ooty. It passes through 208 curves, 16 tunnels, and 250 bridges, offering panoramic views of Nilgiri shola forests and tea estates.",
      openingHours: "Daily: 07:10 AM - 06:00 PM (Subject to weather and track safety)",
      bestTimeToVisit: "Morning 9:00 AM departure for crystal mountain panoramas",
      entryFee: {
        domestic: "₹30 (Second Class) / ₹205 (First Class)",
        foreign: "₹600 (Foreign Tourist Quota Ticket)",
        student: "₹20 (with valid College ID)",
        camera: "Free for smartphone; ₹50 for professional DSLR"
      },
      emergencyServices: {
        firstAidStation: "Station Master's Medical First Response Room (Platform 1)",
        policePost: "Railway Protection Force (RPF) Kiosk, Phone: +91 423 244 2246",
        nearestHospital: "Government Headquarter Hospital Ooty (1.2 km away)"
      },
      audioScript: "Welcome to the Nilgiri Mountain Railway, an honored UNESCO World Heritage site. Operating on unique Swiss rack and pinion mechanics, this train scales steep Nilgiri slopes reaching an elevation of 2,203 meters. Please remain seated and keep cameras safely secured within carriage windows.",
      safetyTips: "Do not lean out of windows or open footboards while passing through narrow rock tunnels."
    },
    {
      id: "ooty-botanical-garden",
      destinationId: "ooty",
      name: "Government Botanical Garden",
      tag: "Exotic Flora Sanctuary",
      qrCodeId: "QR-GBG-OOTY-02",
      city: "Ooty",
      state: "Tamil Nadu",
      builtIn: "1848 by William Graham McIvor",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
      history: "Spanning 55 hectares across the lower Doddabetta slopes, this world-renowned garden houses over a thousand species of indigenous and exotic plants, ferns, orchids, and a 20-million-year-old fossilized tree trunk discovered in the Cuddalore formation.",
      openingHours: "07:00 AM - 06:30 PM (All 365 Days)",
      bestTimeToVisit: "08:30 AM to 11:30 AM before tourist crowds surge",
      entryFee: {
        domestic: "₹40 (Adults) / ₹20 (Children)",
        foreign: "₹100 (Adults)",
        student: "₹15 (Group concession available)",
        camera: "₹50 (Still) / ₹100 (Video camera)"
      },
      emergencyServices: {
        firstAidStation: "Horticulture Department First Aid Post (Main Entrance Gate)",
        policePost: "Botanical Garden Police Outpost, Phone: +91 423 244 3840",
        nearestHospital: "SM Hospital, Charring Cross (800m away)"
      },
      audioScript: "You are standing inside the Government Botanical Garden of Ooty, curated originally in 1848. The terraced lawns feature Italianate parterres, rare cork trees, and ancient monkey-puzzle pines. Follow the cobblestone walkways and maintain environmental discipline.",
      safetyTips: "Cobblestone trails can become slippery during morning dew; rubber-soled shoes recommended."
    },
    {
      id: "jaipur-amber-palace",
      destinationId: "jaipur",
      name: "Amber Palace & Fort",
      tag: "UNESCO Hill Forts of Rajasthan",
      qrCodeId: "QR-AMBER-JPR-03",
      city: "Jaipur",
      state: "Rajasthan",
      builtIn: "1592 AD by Raja Man Singh I",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      history: "Constructed of red sandstone and marble, Amber Palace overlooks Maota Lake. Known for its distinct Rajput-Mughal architectural synthesis, the fortress is famed for the exquisite Sheesh Mahal (Mirror Palace), Diwan-e-Aam, and advanced secret underground escape tunnels leading to Jaigarh Fort.",
      openingHours: "08:00 AM - 05:30 PM & Night Tourism: 06:30 PM - 09:15 PM",
      bestTimeToVisit: "08:00 AM for early morning cool breeze and fewer queues",
      entryFee: {
        domestic: "₹100 (Composite pass ₹300)",
        foreign: "₹550 (Composite pass ₹1000)",
        student: "₹20 (Indian Students with ID) / ₹100 (Foreign)",
        camera: "₹100 (Still) / ₹200 (Video)"
      },
      emergencyServices: {
        firstAidStation: "Rajasthan Tourism Development Corp (RTDC) First Aid Room near Jaleb Chowk",
        policePost: "Amber Fort Tourist Assistance Police (TAP) Kiosk, Phone: +91 141 253 0264",
        nearestHospital: "Kishori Raman Hospital & Trauma Care, Amer (1.5 km)"
      },
      audioScript: "Welcome to Amber Palace, seat of the Kachwaha clan. Admire the Sheesh Mahal where a solitary candle flame reflected across thousands of Belgian convex mirrors illuminates the entire royal hall. Ensure you keep your ticket barcode handy at access turnstiles.",
      safetyTips: "Steep ramparts have low safety parapets; supervise children closely at upper balconies."
    },
    {
      id: "munnar-tea-museum",
      destinationId: "munnar",
      name: "KDHP Tea Museum & Factory",
      tag: "Historic Plantation Heritage",
      qrCodeId: "QR-TEAKDHP-MNR-04",
      city: "Munnar",
      state: "Kerala",
      builtIn: "2005 (Preserving 1880s plantation artifacts)",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
      history: "Set up at the Nallathanni Estate of Tata Tea, this museum curates the legacy of the pioneers who transformed the wilderness of Munnar into an orderly tea plantation corridor starting in the 1880s. Exhibits feature the 1905 Pelton wheel water turbine and antique tea rollers.",
      openingHours: "09:00 AM - 05:00 PM (Closed on Mondays)",
      bestTimeToVisit: "10:30 AM for live CTC tea tasting and factory demonstration",
      entryFee: {
        domestic: "₹150 (Adults) / ₹75 (Children)",
        foreign: "₹250",
        student: "₹100 (College verified)",
        camera: "₹50 (Still camera)"
      },
      emergencyServices: {
        firstAidStation: "KDHP Health & Safety Dispensary on ground level",
        policePost: "Munnar Town Police Station, Phone: +91 4865 230 321",
        nearestHospital: "Tata General Hospital Munnar (1.8 km)"
      },
      audioScript: "Experience the history of Kerala tea making at KDHP Tea Museum. Observe antique manual rollers, orthodox processing chambers, and historical black-and-white portraits of colonial planter expeditions across high ranges.",
      safetyTips: "Keep your hands away from moving conveyor belts and hot drying ovens during factory walk-through."
    },
    {
      id: "agra-taj-mahal",
      destinationId: "agra",
      name: "Taj Mahal",
      tag: "UNESCO World Wonder",
      qrCodeId: "QR-TAJ-AGRA-05",
      city: "Agra",
      state: "Uttar Pradesh",
      builtIn: "1631 - 1648 by Mughal Emperor Shah Jahan",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      history: "An immense mausoleum of pure white Makrana marble, built in Agra between 1631 and 1648 by order of Shah Jahan in memory of his beloved wife Mumtaz Mahal. It represents the jewel of Muslim art in India and an universally admired masterpiece of world heritage.",
      openingHours: "30 minutes before sunrise to 30 minutes before sunset (Closed Fridays)",
      bestTimeToVisit: "Sunrise (05:45 AM) for serene reflections in the Yamuna",
      entryFee: {
        domestic: "₹50 (+ ₹200 for main mausoleum)",
        foreign: "₹1100 (+ ₹200 for main mausoleum)",
        student: "Free below 15 years",
        camera: "Free (Drone/Tripods strictly banned)"
      },
      emergencyServices: {
        firstAidStation: "ASI Medical Dispensary at Western Gate Entry",
        policePost: "Central Industrial Security Force (CISF) & Tourist Police, 112",
        nearestHospital: "SN Medical College Hospital, Agra (3.5 km)"
      },
      audioScript: "Welcome to the Taj Mahal. Designed by Ustad Ahmad Lahori, the symmetry of minarets, calligraphy, and pietra dura gemstone inlays stands as the world's most poetic architectural tribute.",
      safetyTips: "Smoking, chewing gum, lighters, tripods and commercial food items are forbidden inside."
    }
  ],

  // Registered BLE Belongings for Lost Item Tracking with live RSSI
  bleDevices: [
    {
      id: "ble-01",
      name: "Samsonite Hard-Shell Suitcase",
      category: "Luggage",
      tagNumber: "STS-BLE-9901",
      icon: "briefcase",
      rssi: -54, // dBm: -30 to -60 is strong, -61 to -80 is medium, < -80 is weak
      signalQuality: "Strong Signal",
      distanceMeters: 1.4,
      proximityState: "Immediate Proximity",
      batteryPercent: 88,
      lastSeenLocation: "Hotel Lakeview Room 204, Ooty",
      lastSeenTimestamp: "2 minutes ago",
      isLost: false,
      coordinates: { lat: 11.4110, lng: 76.6961 }
    },
    {
      id: "ble-02",
      name: "Travel Passport & Card Wallet",
      category: "Personal Documents",
      tagNumber: "STS-BLE-9902",
      icon: "credit-card",
      rssi: -42,
      signalQuality: "Very Strong",
      distanceMeters: 0.6,
      proximityState: "With You (Handbag)",
      batteryPercent: 94,
      lastSeenLocation: "Within 1 meter of your phone",
      lastSeenTimestamp: "Just now",
      isLost: false,
      coordinates: { lat: 11.4102, lng: 76.6950 }
    },
    {
      id: "ble-03",
      name: "Sony Alpha A7 IV Camera Case",
      category: "Electronics",
      tagNumber: "STS-BLE-9903",
      icon: "camera",
      rssi: -84,
      signalQuality: "Weak Signal",
      distanceMeters: 14.8,
      proximityState: "Far (Out of Room)",
      batteryPercent: 62,
      lastSeenLocation: "Hotel Cloak Room / Reception Desk",
      lastSeenTimestamp: "18 minutes ago",
      isLost: false,
      coordinates: { lat: 11.4105, lng: 76.6958 }
    },
    {
      id: "ble-04",
      name: "Osprey Mountain Trek Backpack",
      category: "Outdoor Gear",
      tagNumber: "STS-BLE-9904",
      icon: "shield",
      rssi: -96,
      signalQuality: "Out of Range",
      distanceMeters: 45.2,
      proximityState: "Disconnected",
      batteryPercent: 35,
      lastSeenLocation: "Ooty Tea Factory Souvenir Parking",
      lastSeenTimestamp: "1 hour ago",
      isLost: true,
      coordinates: { lat: 11.4230, lng: 76.7112 }
    },
    {
      id: "ble-05",
      name: "Rental Scooter Smart Key Fob",
      category: "Vehicle Keys",
      tagNumber: "STS-BLE-9905",
      icon: "key",
      rssi: -62,
      signalQuality: "Moderate Signal",
      distanceMeters: 3.1,
      proximityState: "Near (In Jacket Pocket)",
      batteryPercent: 78,
      lastSeenLocation: "Current Tourist Lounge Table",
      lastSeenTimestamp: "Just now",
      isLost: false,
      coordinates: { lat: 11.4102, lng: 76.6950 }
    }
  ],

  // Emergency contacts and Directory per Destination
  emergencyDirectory: {
    national: [
      { name: "National Unified Emergency Hotline", number: "112", desc: "All-in-one Police, Fire & Ambulance response across India", icon: "phone-call", badge: "24/7 Universal" },
      { name: "Police Rapid Control Room", number: "100", desc: "Direct law enforcement dispatch", icon: "shield-alert", badge: "Immediate" },
      { name: "Medical Emergency Ambulance (EMS)", number: "108", desc: "Government emergency medical transport", icon: "activity", badge: "Free 24/7" },
      { name: "National Women Helpline (All India)", number: "1091", desc: "Dedicated emergency response for women tourists", icon: "user-check", badge: "Confidential" },
      { name: "Ministry of Tourism Helpline", number: "1363", desc: "Multi-language tourist support (12 languages)", icon: "compass", badge: "Toll-Free" },
      { name: "Disaster Management Cell", number: "1077", desc: "Landslides, floods, weather extreme advisories", icon: "alert-triangle", badge: "Civil Defense" }
    ],
    byCity: {
      ooty: [
        {
          type: "hospital",
          name: "Government Headquarter Hospital (GH Ooty)",
          phone: "+91 423 244 2212",
          address: "Hospital Road, Upper Bazaar, Ooty, Tamil Nadu 643001",
          distance: "1.1 km",
          beds: "24/7 ICU & Trauma Care",
          lat: 11.4125,
          lng: 76.7032
        },
        {
          type: "hospital",
          name: "SM Hospital & Emergency Clinic",
          phone: "+91 423 244 3801",
          address: "Charring Cross, Commercial Rd, Ooty 643001",
          distance: "0.8 km",
          beds: "Private Emergency & Pharmacy",
          lat: 11.4140,
          lng: 76.7088
        },
        {
          type: "police",
          name: "Ooty Town B1 Police Station",
          phone: "+91 423 244 2222",
          address: "Near Collectorate Office, Ooty",
          distance: "1.4 km",
          beds: "Tourist Support Desk Active",
          lat: 11.4082,
          lng: 76.6991
        },
        {
          type: "police",
          name: "Nilgiris District Tourist Police Cell",
          phone: "+91 423 244 4040",
          address: "SP Office Complex, Ooty",
          distance: "1.9 km",
          beds: "Special Tourist Escort Force",
          lat: 11.4060,
          lng: 76.7050
        }
      ],
      munnar: [
        {
          type: "hospital",
          name: "Tata General Hospital Munnar",
          phone: "+91 4865 230 223",
          address: "KDHP Colony, Munnar, Kerala 685612",
          distance: "1.8 km",
          beds: "Comprehensive Hill Trauma Care",
          lat: 10.0820,
          lng: 77.0610
        },
        {
          type: "police",
          name: "Munnar Tourist Police Station",
          phone: "+91 4865 230 321",
          address: "Old Munnar Market Junction",
          distance: "0.9 km",
          beds: "Bilingual Officers (Eng/Malayalam/Tamil)",
          lat: 10.0895,
          lng: 77.0570
        }
      ],
      jaipur: [
        {
          type: "hospital",
          name: "Sawai Man Singh (SMS) Medical Hospital",
          phone: "+91 141 251 8224",
          address: "JLN Marg, Jaipur, Rajasthan 302004",
          distance: "3.2 km",
          beds: "Premier Level-1 Trauma Center",
          lat: 26.8920,
          lng: 75.8190
        },
        {
          type: "police",
          name: "Jaipur Police Commissionerate & Tourist Cell",
          phone: "+91 141 238 8435",
          address: "MI Road, Jaipur",
          distance: "2.1 km",
          beds: "Dedicated Tourist Assistance Force (TAF)",
          lat: 26.9180,
          lng: 75.8010
        }
      ]
    }
  },

  // Smart Travel Timeline - Initial Visited Places Log
  timelineEntries: [
    {
      id: "tl-01",
      placeName: "Nilgiri Mountain Railway Station",
      location: "Ooty Railway Junction",
      timestamp: "Today, 09:30 AM",
      badge: "Safe Check-in",
      badgeColor: "emerald",
      notes: "Boarded the UNESCO Toy Train. Baggage verified and BLE beacon STS-BLE-9901 active.",
      coordinates: "11.4102° N, 76.6950° E",
      photo: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "tl-02",
      placeName: "Government Botanical Garden",
      location: "Vannarapettai, Ooty",
      timestamp: "Today, 12:15 PM",
      badge: "Scanned QR Guide",
      badgeColor: "cyan",
      notes: "Scanned monument QR code. Listened to audio guide on McIvor 1848 heritage collection.",
      coordinates: "11.4168° N, 76.7115° E",
      photo: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "tl-03",
      placeName: "Ooty Boathouse & Lake Promenade",
      location: "Lake Road, Ooty",
      timestamp: "Today, 03:45 PM",
      badge: "Safe Check-in",
      badgeColor: "emerald",
      notes: "Pedal boating completed. Safety lifejackets verified with Tourist Safety Sentinel.",
      coordinates: "11.4055° N, 76.6872° E",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
    }
  ],

  // AI Assistant Knowledge Base & Fallback Response Engine
  aiResponses: {
    greetings: [
      "Hello! I am your Smart Travel Sentinel AI Assistant. How can I help secure or plan your journey today?",
      "Greetings traveler! Sentinel AI is active and monitoring destination safety, travel advisories, and local tips for you. What would you like to know?",
      "Welcome! Need an itinerary recommendation, local safety check, or emergency guidance? Just ask me!"
    ],
    emergency: "🚨 **EMERGENCY ADVISORY**: If you are in immediate danger, trigger the red **Offline SOS** button at the top right of this screen or dial **112** (Universal) or **100** (Police) directly. For medical trauma, dial **108**. Stay in well-lit public zones and share your live GPS coordinates with family.",
    lostBelongings: "If you have lost an item:\n1. Open our **BLE Lost Item Tracking** tab to inspect signal strength and its last recorded GPS pin.\n2. Tap **'Ring Item'** to trigger high-frequency audible chirp beeps.\n3. If out of range, toggle **'Mark as Lost'** to broadcast its BLE beacon ID.\n4. File a Property Lost Article Report at the nearest police station or tourist kiosk.",
    soloSafety: "Top Solo Traveler Safety Protocol:\n• Always check our **Tourist Safety Score** before venturing after sunset.\n• Keep emergency contacts populated in your Sentinel profile.\n• Share your live trip timeline with a trusted friend.\n• Keep your passport and cash tagged with BLE beacons.\n• Prefer prepaid taxi stands or verified ride-hailing services over unmetered private rides.",
    scamAdvice: "Common Tourist Traps to Avoid:\n• **Fake Gem / Antique Shops**: Never buy expensive stones recommended by auto drivers.\n• **Unauthorized Tour Guides**: Look for official government badges (RTDC / TTDC / KTDC).\n• **Broken Taxi Meter excuse**: Insist on meter or negotiate the rate before sitting.",
    budgetPlan: "For a budget of ₹2,500 - ₹4,000 per day in hill stations:\n• **Stay**: Verified Zostel, Hosteller, or government guest houses (₹800 - ₹1,400).\n• **Food**: Authentic local messes & South Indian thalis (₹400 - ₹600/day).\n• **Transit**: State RTC buses or shared cabs (₹300 - ₹500).\n• **Sightseeing**: Pre-book UNESCO toy train & botanical tickets online.",
    ootyTips: "Ooty Sentinel Highlights:\n• Safety Score: **89/100 (Safe Zone)**.\n• Best sunset spot: Wenlock Downs 9th Mile.\n• Evening note: Heavy fog after 7:30 PM on Coonoor Ghats; keep headlights on low beam.\n• Nearest 24/7 Hospital: GH Hospital Ooty (+91 423 244 2212)."
  }
};

// Export to window for global access
window.STS_DATA = STS_DATA;
