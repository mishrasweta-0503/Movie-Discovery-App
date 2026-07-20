# 🎬 Film Finder

A dynamic web application that connects directly to The Movie Database (TMDB) API to help users instantly discover movies across different genres.

## 🚀 Features
- **Live API Integration:** Synchronously fetches real-time genre lists directly from TMDB servers.
- **Dynamic Content Generation:** Generates responsive visual cards containing titles, descriptions, and official movie posters for all matching results.
- **Modern Flexbox Layout:** Displays results in a clean, centered grid format optimized for readability.
- **Secure Key Archiving:** Implements defensive variable structures to prevent API key exposure in shared environments.

## 🛠️ Built With
- **HTML5:** Semantic structure and interface controls.
- **CSS3:** Dark-theme styling utilizing CSS Flexbox layout tools.
- **JavaScript (ES6+):** Asynchronous DOM programming using `async/await` and the Native Fetch API.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mishrasweta-0503/Movie-Discovery-App.git

2. Acquire an API Key:

    Head over to The Movie Database (TMDB) and sign up for a free account.

    Navigate to your account settings to request an API key.

3. Configure Environment Keys:

    Locate the config.example.js file in the root folder.

    Duplicate or rename the file to config.js.

    Open config.js and replace the placeholder text with your real TMDB API key:
    const tmdbKey = 'your_actual_api_key_here';

4. Open index.html directly inside any modern web browser to start exploring!