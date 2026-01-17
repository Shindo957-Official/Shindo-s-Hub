const gamesData = [
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
    { id: 'minecraft-1-8-8', name: 'Minecraft 1.8.8', image: 'images/minecraft.jpg', description: 'Classic Minecraft in your browser', tags: ['Sandbox', 'Adventure'] },
    { id: 'minecraft-1-12-2', name: 'Minecraft 1.12.2', image: 'images/minecraft.jpg', description: 'Minecraft with more features', tags: ['Sandbox', 'Adventure'] },
    { id: 'minecraft-1-21-4', name: 'Minecraft 1.21.4', image: 'images/minecraft.jpg', description: 'Latest Minecraft web client', tags: ['Sandbox', 'Adventure'] },
    { id: 'vex3', name: 'VEX 3', image: 'images/vex3.jpg', description: 'Classic stickman platforming', tags: ['Platformer', 'Action'] },
    { id: 'vex4', name: 'VEX 4', image: 'images/vex4.jpg', description: 'More challenging obstacles', tags: ['Platformer', 'Action'] },
    { id: 'vex5', name: 'VEX 5', image: 'images/vex5.jpg', description: 'Ultimate platform challenge', tags: ['Platformer', 'Action'] }
];

const RECENTLY_PLAYED_KEY = 'blazer_recently_played';
const MAX_RECENT_GAMES = 8;

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
        <a href="games/${game.id}/" class="game-card" onclick="trackGame('${game.id}', '${game.name.replace(/'/g, "\\'")}', '${game.image}')">
            <img src="${game.image}" alt="${game.name}" onerror="this.src='images/placeholder.png'">
            <div class="game-info">
                <span class="game-title">${game.name}</span>
            </div>
        </a>
    `).join('');
}

function createGameCard(game) {
    const tagsHTML = game.tags ? game.tags.map(tag => 
        `<span class="game-tag">${tag}</span>`
    ).join('') : '';
    
    return `
        <a href="games/${game.id}/" class="game-card" onclick="trackGame('${game.id}', '${game.name.replace(/'/g, "\\'")}', '${game.image}')" data-name="${game.name.toLowerCase()}" data-description="${(game.description || '').toLowerCase()}" data-tags="${(game.tags || []).join(' ').toLowerCase()}">
            <img src="${game.image}" alt="${game.name}" onerror="this.style.display='none'">
            <div class="play-button"><i class="fa-solid fa-play"></i></div>
            <div class="game-info">
                <span class="game-title">${game.name}</span>
                <span class="game-description">${game.description || ''}</span>
                ${tagsHTML ? `<div class="game-tags">${tagsHTML}</div>` : ''}
            </div>
        </a>
    `;
}

function renderGames() {
    const container = document.getElementById('games');
    container.innerHTML = gamesData.map(createGameCard).join('');
}

function searchGames() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const gameCards = document.querySelectorAll('#games .game-card');
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

document.addEventListener('DOMContentLoaded', init);

window.trackGame = trackGame;
window.searchGames = searchGames;
window.closeMobileMenu = closeMobileMenu;
