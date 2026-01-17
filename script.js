const gamesData = [
    { id: 'cuphead', name: 'Cuphead', image: 'images/cuphead.jpg', description: 'Run and gun action game', tags: ['Action', 'Boss Rush'] },
    { id: 'bob-the-robber-2', name: 'Bob the Robber 2', image: 'images/bob-the-robber-2.png', description: 'Sneak through levels and steal treasures', tags: ['Stealth', 'Puzzle'] },
    { id: 'vex7', name: 'VEX 7', image: 'images/vex7.jpeg', description: 'Intense stickman platformer action', tags: ['Platformer', 'Action'] },
    { id: 'vex6', name: 'VEX 6', image: 'images/vex6.jpeg', description: 'Navigate deadly obstacle courses', tags: ['Platformer', 'Action'] },
    { id: 'tomb-of-the-mask', name: 'Tomb of the Mask', image: 'images/tomb-of-the-mask.jpg', description: 'Arcade maze runner adventure', tags: ['Arcade', 'Puzzle'] },
    { id: 'space-waves', name: 'Space Waves', image: 'images/space-waves.jpg', description: 'Dodge obstacles in space', tags: ['Arcade', 'Rhythm'] },
    { id: 'fnf-sonic-exe', name: 'FNF vs Sonic.EXE', image: 'images/fnf-sonic-exe.jpg', description: 'Rhythm battle against Sonic.EXE', tags: ['Rhythm', 'Music'] },
    { id: 'pokemon-red', name: 'Pokemon Red', image: 'images/pokemon-red.jpg', description: 'Classic Pokemon adventure', tags: ['RPG', 'Adventure'] },
    { id: 'moto-x3m', name: 'Moto X3M', image: 'images/moto-x3m.jpg', description: 'Extreme motorcycle racing stunts', tags: ['Racing', 'Sports'] },
    { id: 'retro-bowl', name: 'Retro Bowl', image: 'images/retro-bowl.jpg', description: 'Retro-style football management', tags: ['Sports', 'Strategy'] },
    { id: 'drive-mad', name: 'Drive Mad', image: 'images/drive-mad.jpg', description: 'Physics-based driving challenges', tags: ['Racing', 'Puzzle'] },
    { id: 'slope', name: 'Slope', image: 'images/slope.jpg', description: 'Roll down endless slopes', tags: ['Arcade', 'Endless'] },
    { id: 'motox3m2', name: 'Moto X3M 2', image: 'images/motox3m2.jpg', description: 'More extreme bike stunts', tags: ['Racing', 'Sports'] },
    { id: 'minecraft-1-8-8', name: 'Minecraft 1.8.8', image: 'images/minecraft.webp', description: 'Classic Minecraft in your browser', tags: ['Sandbox', 'Adventure'] },
    { id: 'minecraft-1-12-2', name: 'Minecraft 1.12.2', image: 'images/minecraft.webp', description: 'Minecraft with more features', tags: ['Sandbox', 'Adventure'] },
    { id: 'minecraft-1-21-4', name: 'Minecraft 1.21.4', image: 'images/minecraft.webp', description: 'Latest Minecraft web client', tags: ['Sandbox', 'Adventure'] },
    { id: 'vex3', name: 'VEX 3', image: 'images/vex3.jpg', description: 'Classic stickman platforming', tags: ['Platformer', 'Action'] },
    { id: 'vex4', name: 'VEX 4', image: 'images/vex4.jpg', description: 'More challenging obstacles', tags: ['Platformer', 'Action'] },
    { id: 'vex5', name: 'VEX 5', image: 'images/vex5.jpg', description: 'Ultimate platform challenge', tags: ['Platformer', 'Action'] },
    { id: '1v1lol', name: '1v1.LOL', image: 'images/1v1lol.jpg', description: 'Build and shoot battle royale', tags: ['Shooter', 'Battle Royale'] },
    { id: '2048', name: '2048', image: 'images/2048.png', description: 'Addictive number puzzle', tags: ['Puzzle', 'Casual'] },
    { id: 'sonic-r', name: 'Sonic R', image: 'images/sonic-r.jpg', description: 'Race for the goal with Sonic', tags: ['Racing', 'Sonic'] },
    { id: 'sonic-colors', name: 'Sonic Colors', image: 'images/sonic-colors.webp', description: 'Colorful Sonic adventure', tags: ['Platformer', 'Sonic'] },
    { id: 'sonic-classic-collection', name: 'Sonic Classic Collection', image: 'images/sonic-classic-collection.jpg', description: '4 classic Sonic games in one', tags: ['Platformer', 'Sonic'] },
    { id: 'fnf-luis', name: 'FNF vs Luis', image: 'images/fnf-luis.jpg', description: 'Rhythm battle vs Luis', tags: ['Rhythm', 'Music'] },
    { id: 'celeste-2', name: 'Celeste 2', image: 'images/celeste-2.png', description: 'Challenging precision platformer', tags: ['Platformer', 'Indie'] },
    { id: 'cookie-clicker', name: 'Cookie Clicker', image: 'images/cookie-clicker.webp', description: 'Click cookies, build an empire', tags: ['Idle', 'Clicker'] },
    { id: 'geometry-dash-lite', name: 'Geometry Dash Lite', image: 'images/geometry-dash-lite.webp', description: 'Jump and fly through danger', tags: ['Rhythm', 'Arcade'] },
    { id: 'fnf-rewrite', name: 'FNF vs Rewrite', image: 'images/fnf-sonic-exe.jpg', description: 'Rhythm battle vs Rewrite', tags: ['Rhythm', 'Music'] }
];

const RECENTLY_PLAYED_KEY = 'shindohub_recently_played';
const PLAY_COUNT_KEY = 'shindohub_play_counts';
const MAX_RECENT_GAMES = 8;
const TOP_PLAYED_COUNT = 6;

function getPlayCounts() {
    try {
        const stored = localStorage.getItem(PLAY_COUNT_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        return {};
    }
}

function savePlayCounts(counts) {
    try {
        localStorage.setItem(PLAY_COUNT_KEY, JSON.stringify(counts));
    } catch (e) {
        console.warn('Could not save play counts');
    }
}

function incrementPlayCount(gameId) {
    const counts = getPlayCounts();
    counts[gameId] = (counts[gameId] || 0) + 1;
    savePlayCounts(counts);
}

function getTopPlayedGames() {
    const counts = getPlayCounts();
    const gamesWithCounts = gamesData.map(game => ({
        ...game,
        playCount: counts[game.id] || 0
    }));
    
    gamesWithCounts.sort((a, b) => b.playCount - a.playCount);
    
    if (gamesWithCounts.every(g => g.playCount === 0)) {
        return gamesData.slice(0, TOP_PLAYED_COUNT);
    }
    
    return gamesWithCounts.slice(0, TOP_PLAYED_COUNT);
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) ||
           ('ontouchstart' in window);
}

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

function getRecentlyPlayed() {
    try {
        const stored = localStorage.getItem(RECENTLY_PLAYED_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveRecentlyPlayed(games) {
    try {
        localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(games));
    } catch (e) {
        console.warn('Could not save recently played games');
    }
}

function trackGame(id, name, image) {
    incrementPlayCount(id);
    renderTopPlayed();
    
    const recentGames = getRecentlyPlayed();
    const existingIndex = recentGames.findIndex(g => g.id === id);
    
    if (existingIndex !== -1) {
        recentGames.splice(existingIndex, 1);
    }
    
    recentGames.unshift({ id, name, image, timestamp: Date.now() });
    
    if (recentGames.length > MAX_RECENT_GAMES) {
        recentGames.pop();
    }
    
    saveRecentlyPlayed(recentGames);
}

function renderRecentlyPlayed() {
    const recentGames = getRecentlyPlayed();
    const section = document.getElementById('recently-played-section');
    const container = document.getElementById('recently-played-games');
    
    if (recentGames.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    container.innerHTML = recentGames.map(game => `
        <div class="game-card" onclick="openGame('${game.id}', '${game.name.replace(/'/g, "\\'")}')">
            <img src="${game.image}" alt="${game.name}" onerror="this.src='images/placeholder.png'">
            <div class="game-info">
                <span class="game-title">${game.name}</span>
            </div>
        </div>
    `).join('');
}

function formatPlayCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
}

function renderTopPlayed() {
    const container = document.getElementById('top-played-grid');
    const topGames = getTopPlayedGames();
    const counts = getPlayCounts();
    
    container.innerHTML = topGames.map((game, index) => {
        const playCount = counts[game.id] || 0;
        const rankClass = index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : '';
        
        return `
            <div class="game-card top-card" onclick="openGame('${game.id}', '${game.name.replace(/'/g, "\\'")}')" data-rank="${index + 1}">
                <div class="rank-badge ${rankClass}">#${index + 1}</div>
                <img src="${game.image}" alt="${game.name}" onerror="this.style.display='none'">
                <div class="play-button"><i class="fa-solid fa-play"></i></div>
                <div class="game-info">
                    <span class="game-title">${game.name}</span>
                    <span class="play-count"><i class="fas fa-gamepad"></i> ${formatPlayCount(playCount)} plays</span>
                </div>
            </div>
        `;
    }).join('');
}

function createGameCard(game) {
    const tagsHTML = game.tags ? game.tags.map(tag => 
        `<span class="game-tag">${tag}</span>`
    ).join('') : '';
    
    return `
        <div class="game-card" onclick="openGame('${game.id}', '${game.name.replace(/'/g, "\\'")}')" data-name="${game.name.toLowerCase()}" data-description="${(game.description || '').toLowerCase()}" data-tags="${(game.tags || []).join(' ').toLowerCase()}">
            <img src="${game.image}" alt="${game.name}" onerror="this.style.display='none'">
            <div class="play-button"><i class="fa-solid fa-play"></i></div>
            <div class="game-info">
                <span class="game-title">${game.name}</span>
                <span class="game-description">${game.description || ''}</span>
                ${tagsHTML ? `<div class="game-tags">${tagsHTML}</div>` : ''}
            </div>
        </div>
    `;
}

function renderGames() {
    const container = document.getElementById('games-grid');
    container.innerHTML = gamesData.map(createGameCard).join('');
}

function searchGames() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const gameCards = document.querySelectorAll('#games-grid .game-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;
    
    gameCards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        const description = card.getAttribute('data-description') || '';
        const tags = card.getAttribute('data-tags') || '';
        
        const matches = name.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
        if (matches) visibleCount++;
    });
    
    noResults.style.display = visibleCount === 0 && searchTerm ? 'block' : 'none';
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-menu-btn')) {
            closeMobileMenu();
        }
    });
}

function init() {
    renderGames();
    renderTopPlayed();
    renderRecentlyPlayed();
    initMobileMenu();
    
    if (isMobile()) {
        document.body.classList.add('is-mobile');
    }
    
    if (!supportsWebGL()) {
        document.body.classList.add('no-webgl');
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchGames);
    }
}

const SETTINGS_KEY = 'shindohub_settings';

function getSettings() {
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        return stored ? JSON.parse(stored) : {
            uiVersion: '0.75',
            musicEnabled: false,
            musicVolume: 65,
            fpsEnabled: false,
            webglEnabled: true,
            mobileUIEnabled: false
        };
    } catch (e) {
        return {
            uiVersion: '0.75',
            musicEnabled: false,
            musicVolume: 65,
            fpsEnabled: false,
            webglEnabled: true,
            mobileUIEnabled: false
        };
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
        console.warn('Could not save settings');
    }
}

function openSettings() {
    document.getElementById('settingsModal').classList.add('active');
    loadSettingsState();
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function loadSettingsState() {
    const settings = getSettings();
    
    document.getElementById('musicToggle').checked = settings.musicEnabled;
    document.getElementById('fpsToggle').checked = settings.fpsEnabled;
    document.getElementById('webglToggle').checked = settings.webglEnabled;
    document.getElementById('mobileUIToggle').checked = settings.mobileUIEnabled;
    
    const volume = settings.musicVolume || 65;
    document.getElementById('volumeSlider').value = volume;
    document.getElementById('volumeValue').textContent = volume + '%';
    
    document.querySelectorAll('.ui-version-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.version === settings.uiVersion);
    });
}

function setVolume(value) {
    const settings = getSettings();
    const audio = document.getElementById('menuMusic');
    settings.musicVolume = parseInt(value);
    saveSettings(settings);
    
    audio.volume = value / 100;
    document.getElementById('volumeValue').textContent = value + '%';
}

function openAboutBlank() {
    const win = window.open();
    if (win) {
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Google</title>
                <link rel="icon" href="https://www.google.com/favicon.ico">
            </head>
            <body style="margin:0;overflow:hidden;">
                <iframe src="${window.location.href}" style="width:100vw;height:100vh;border:none;"></iframe>
            </body>
            </html>
        `);
        win.document.close();
    }
    closeSettings();
}

function setUIVersion(version) {
    const settings = getSettings();
    settings.uiVersion = version;
    saveSettings(settings);
    
    document.querySelectorAll('.ui-version-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.version === version);
    });
    
    applyUIVersion(version);
}

function toggleMusic() {
    const settings = getSettings();
    const audio = document.getElementById('menuMusic');
    settings.musicEnabled = document.getElementById('musicToggle').checked;
    saveSettings(settings);
    
    if (settings.musicEnabled) {
        audio.volume = (settings.musicVolume || 65) / 100;
        audio.play().catch(() => {
            console.log('Audio autoplay blocked');
        });
    } else {
        audio.pause();
    }
}

let fpsFrameId = null;
let lastTime = performance.now();
let frameCount = 0;

function updateFPS() {
    const now = performance.now();
    frameCount++;
    
    if (now - lastTime >= 1000) {
        const fps = Math.round(frameCount * 1000 / (now - lastTime));
        document.getElementById('fpsValue').textContent = fps;
        frameCount = 0;
        lastTime = now;
    }
    
    fpsFrameId = requestAnimationFrame(updateFPS);
}

function toggleFPS() {
    const settings = getSettings();
    const fpsCounter = document.getElementById('fpsCounter');
    settings.fpsEnabled = document.getElementById('fpsToggle').checked;
    saveSettings(settings);
    
    if (settings.fpsEnabled) {
        fpsCounter.style.display = 'block';
        lastTime = performance.now();
        frameCount = 0;
        updateFPS();
    } else {
        fpsCounter.style.display = 'none';
        if (fpsFrameId) {
            cancelAnimationFrame(fpsFrameId);
            fpsFrameId = null;
        }
    }
}

function toggleWebGL() {
    const settings = getSettings();
    settings.webglEnabled = document.getElementById('webglToggle').checked;
    saveSettings(settings);
}

function toggleMobileUI() {
    const settings = getSettings();
    settings.mobileUIEnabled = document.getElementById('mobileUIToggle').checked;
    saveSettings(settings);
    
    if (settings.mobileUIEnabled) {
        document.body.classList.add('force-mobile-ui');
    } else {
        document.body.classList.remove('force-mobile-ui');
    }
}

function applyStoredSettings() {
    const settings = getSettings();
    
    if (settings.fpsEnabled) {
        document.getElementById('fpsCounter').style.display = 'block';
        lastTime = performance.now();
        frameCount = 0;
        updateFPS();
    }
    
    if (settings.mobileUIEnabled) {
        document.body.classList.add('force-mobile-ui');
    }
    
    if (settings.musicEnabled) {
        const audio = document.getElementById('menuMusic');
        audio.volume = (settings.musicVolume || 65) / 100;
        audio.play().catch(() => {});
    }
}

const RATINGS_KEY = 'shindohub_ratings';
const USER_RATINGS_KEY = 'shindohub_user_ratings';
const USER_AVATAR_KEY = 'shindohub_user_avatars';
let currentGameId = null;

const AVATARS = [
    'images/cuphead.jpg',
    'images/vex7.jpeg',
    'images/vex6.jpeg',
    'images/sonic-r.jpg',
    'images/sonic-colors.webp',
    'images/minecraft.webp',
    'images/fnf-sonic-exe.jpg',
    'images/moto-x3m.jpg',
    'images/retro-bowl.jpg',
    'images/slope.jpg',
    'images/geometry-dash-lite.webp',
    'images/cookie-clicker.webp'
];

function getRatings() {
    try {
        return JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveRatings(ratings) {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

function getUserRatings() {
    try {
        return JSON.parse(localStorage.getItem(USER_RATINGS_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveUserRatings(ratings) {
    localStorage.setItem(USER_RATINGS_KEY, JSON.stringify(ratings));
}

function rateGame(gameId, rating) {
    const user = getCurrentUser();
    if (!user) return;
    
    const userRatings = getUserRatings();
    const ratings = getRatings();
    
    if (!ratings[gameId]) {
        ratings[gameId] = { total: 0, count: 0 };
    }
    
    if (userRatings[gameId]) {
        ratings[gameId].total -= userRatings[gameId];
    } else {
        ratings[gameId].count++;
    }
    
    ratings[gameId].total += rating;
    userRatings[gameId] = rating;
    
    saveRatings(ratings);
    saveUserRatings(userRatings);
    updateStarDisplay(gameId, rating);
    updateAvgRating(gameId);
}

function updateStarDisplay(gameId, userRating) {
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach((star, i) => {
        star.classList.toggle('active', i < userRating);
    });
}

function updateAvgRating(gameId) {
    const ratings = getRatings();
    const avgEl = document.getElementById('avgRating');
    
    if (ratings[gameId] && ratings[gameId].count > 0) {
        const avg = (ratings[gameId].total / ratings[gameId].count).toFixed(1);
        avgEl.textContent = `(${avg}/5 from ${ratings[gameId].count} ratings)`;
    } else {
        avgEl.textContent = '';
    }
}

function openGame(gameId, gameName) {
    currentGameId = gameId;
    const modal = document.getElementById('gameModal');
    const frame = document.getElementById('gameFrame');
    const title = document.getElementById('gameModalTitle');
    
    title.textContent = gameName;
    frame.src = `games/${gameId}/`;
    modal.classList.add('active');
    
    trackGame(gameId, gameName, gamesData.find(g => g.id === gameId)?.image || '');
    
    const userRatings = getUserRatings();
    updateStarDisplay(gameId, userRatings[gameId] || 0);
    updateAvgRating(gameId);
    
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach(star => {
        star.onclick = () => rateGame(gameId, parseInt(star.dataset.rating));
    });
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    const frame = document.getElementById('gameFrame');
    modal.classList.remove('active');
    frame.src = '';
    currentGameId = null;
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function toggleFullscreen() {
    const modal = document.getElementById('gameModal');
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

function getUserAvatars() {
    try {
        return JSON.parse(localStorage.getItem(USER_AVATAR_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveUserAvatars(avatars) {
    localStorage.setItem(USER_AVATAR_KEY, JSON.stringify(avatars));
}

function openAvatarPicker() {
    const user = getCurrentUser();
    if (!user) return;
    
    const modal = document.getElementById('avatarModal');
    const grid = document.getElementById('avatarGrid');
    const userAvatars = getUserAvatars();
    
    grid.innerHTML = AVATARS.map((avatar, i) => `
        <div class="avatar-option ${userAvatars[user] === avatar ? 'selected' : ''}" onclick="selectAvatar('${avatar}')">
            <img src="${avatar}" alt="Avatar ${i + 1}">
        </div>
    `).join('');
    
    modal.classList.add('active');
}

function closeAvatarPicker() {
    document.getElementById('avatarModal').classList.remove('active');
}

function selectAvatar(avatar) {
    const user = getCurrentUser();
    if (!user) return;
    
    const avatars = getUserAvatars();
    avatars[user] = avatar;
    saveUserAvatars(avatars);
    
    updateAccountUI();
    closeAvatarPicker();
}

function simulateLoading() {
    const progress = document.getElementById('loadingProgress');
    const loadingScreen = document.getElementById('loadingScreen');
    let width = 0;
    
    const interval = setInterval(() => {
        width += Math.random() * 15 + 5;
        if (width >= 100) {
            width = 100;
            progress.style.width = width + '%';
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 300);
        } else {
            progress.style.width = width + '%';
        }
    }, 100);
}

function applyUIVersion(version) {
    document.body.classList.remove('ui-old', 'ui-02', 'ui-05', 'ui-075');
    if (version === 'old') {
        document.body.classList.add('ui-old');
    } else if (version === '0.2') {
        document.body.classList.add('ui-02');
    } else if (version === '0.5') {
        document.body.classList.add('ui-05');
    } else if (version === '0.75') {
        document.body.classList.add('ui-075');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    simulateLoading();
    init();
    applyStoredSettings();
    updateAccountUI();
    
    const settings = getSettings();
    applyUIVersion(settings.uiVersion || '0.75');
    
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeSettings();
        }
    });
    
    document.getElementById('avatarModal').addEventListener('click', (e) => {
        if (e.target.id === 'avatarModal') {
            closeAvatarPicker();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('gameModal').classList.contains('active')) {
            closeGameModal();
        }
    });
});

window.trackGame = trackGame;
window.searchGames = searchGames;
window.closeMobileMenu = closeMobileMenu;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.openAboutBlank = openAboutBlank;
window.setUIVersion = setUIVersion;
window.toggleMusic = toggleMusic;
window.toggleFPS = toggleFPS;
window.toggleWebGL = toggleWebGL;
window.toggleMobileUI = toggleMobileUI;
window.setVolume = setVolume;

const ACCOUNTS_KEY = 'shindohub_accounts';
const CURRENT_USER_KEY = 'shindohub_current_user';
const ADMIN_USER = 'Shindo957';
const ADMIN_HASH = 'a1b2c3d4e5f6';

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

function getAccounts() {
    try {
        return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getCurrentUser() {
    return localStorage.getItem(CURRENT_USER_KEY) || null;
}

function setCurrentUser(username) {
    if (username) {
        localStorage.setItem(CURRENT_USER_KEY, username);
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

function showAccountTab(tab) {
    document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.account-tab[onclick*="${tab}"]`).classList.add('active');
    document.getElementById('loginForm').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'flex' : 'none';
    document.getElementById('accountError').textContent = '';
}

function loginAccount() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('accountError');
    
    if (!username || !password) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }
    
    if (username === ADMIN_USER && password === 'LinuxmasterSonicR') {
        setCurrentUser(ADMIN_USER);
        updateAccountUI();
        errorEl.textContent = '';
        return;
    }
    
    const accounts = getAccounts();
    if (!accounts[username]) {
        errorEl.textContent = 'Account not found';
        return;
    }
    
    if (accounts[username].hash !== simpleHash(password)) {
        errorEl.textContent = 'Incorrect password';
        return;
    }
    
    setCurrentUser(username);
    updateAccountUI();
    errorEl.textContent = '';
}

function registerAccount() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    const errorEl = document.getElementById('accountError');
    
    if (!username || !password || !confirm) {
        errorEl.textContent = 'Please fill in all fields';
        return;
    }
    
    if (username.length < 3) {
        errorEl.textContent = 'Username must be at least 3 characters';
        return;
    }
    
    if (password.length < 4) {
        errorEl.textContent = 'Password must be at least 4 characters';
        return;
    }
    
    if (password !== confirm) {
        errorEl.textContent = 'Passwords do not match';
        return;
    }
    
    if (username.toLowerCase() === ADMIN_USER.toLowerCase()) {
        errorEl.textContent = 'This username is reserved';
        return;
    }
    
    const accounts = getAccounts();
    if (accounts[username]) {
        errorEl.textContent = 'Username already taken';
        return;
    }
    
    accounts[username] = { hash: simpleHash(password), created: Date.now() };
    saveAccounts(accounts);
    setCurrentUser(username);
    updateAccountUI();
    errorEl.textContent = '';
}

function logoutAccount() {
    setCurrentUser(null);
    updateAccountUI();
}

function updateAccountUI() {
    const user = getCurrentUser();
    const loggedOut = document.getElementById('accountLoggedOut');
    const loggedIn = document.getElementById('accountLoggedIn');
    
    if (user) {
        loggedOut.style.display = 'none';
        loggedIn.style.display = 'block';
        document.getElementById('displayUsername').textContent = user;
        const badge = document.getElementById('accountBadge');
        if (user === ADMIN_USER) {
            badge.textContent = 'Admin';
            badge.className = 'account-badge admin';
            document.getElementById('adminPanel').style.display = 'block';
        } else {
            badge.textContent = 'Member';
            badge.className = 'account-badge member';
            document.getElementById('adminPanel').style.display = 'none';
        }
        
        const avatars = getUserAvatars();
        const avatarImg = document.getElementById('avatarImage');
        const avatarIcon = document.getElementById('avatarIcon');
        if (avatars[user]) {
            avatarImg.src = avatars[user];
            avatarImg.style.display = 'block';
            avatarIcon.style.display = 'none';
        } else {
            avatarImg.style.display = 'none';
            avatarIcon.style.display = 'block';
        }
    } else {
        loggedOut.style.display = 'block';
        loggedIn.style.display = 'none';
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerConfirm').value = '';
    }
}

function isAdmin() {
    return getCurrentUser() === ADMIN_USER;
}

function adminResetPlayCounts() {
    if (!isAdmin()) return;
    if (confirm('Reset all play counts to 0?')) {
        localStorage.removeItem(PLAY_COUNT_KEY);
        renderTopPlayed();
        alert('All play counts have been reset!');
    }
}

function adminViewUsers() {
    if (!isAdmin()) return;
    const accounts = getAccounts();
    const userList = document.getElementById('adminUserList');
    const usernames = Object.keys(accounts);
    
    if (usernames.length === 0) {
        userList.innerHTML = '<div style="color:var(--text-secondary);font-size:12px;">No registered users yet</div>';
    } else {
        userList.innerHTML = usernames.map(username => {
            const date = new Date(accounts[username].created).toLocaleDateString();
            return `
                <div class="admin-user-item">
                    <div>
                        <span class="username">${username}</span>
                        <span class="date"> - Joined ${date}</span>
                    </div>
                    <button class="delete-user" onclick="adminDeleteUser('${username}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
    
    userList.style.display = userList.style.display === 'none' ? 'block' : 'none';
}

function adminDeleteUser(username) {
    if (!isAdmin()) return;
    if (confirm(`Delete account "${username}"?`)) {
        const accounts = getAccounts();
        delete accounts[username];
        saveAccounts(accounts);
        adminViewUsers();
    }
}

function adminClearAllAccounts() {
    if (!isAdmin()) return;
    if (confirm('Delete ALL user accounts? This cannot be undone!')) {
        localStorage.removeItem(ACCOUNTS_KEY);
        document.getElementById('adminUserList').style.display = 'none';
        alert('All user accounts have been deleted!');
    }
}

window.showAccountTab = showAccountTab;
window.loginAccount = loginAccount;
window.registerAccount = registerAccount;
window.logoutAccount = logoutAccount;
window.adminResetPlayCounts = adminResetPlayCounts;
window.adminViewUsers = adminViewUsers;
window.adminDeleteUser = adminDeleteUser;
window.adminClearAllAccounts = adminClearAllAccounts;
window.openGame = openGame;
window.closeGameModal = closeGameModal;
window.toggleFullscreen = toggleFullscreen;
window.openAvatarPicker = openAvatarPicker;
window.closeAvatarPicker = closeAvatarPicker;
window.selectAvatar = selectAvatar;
