// ==================== НАСТРОЙКИ ====================
let settings = {
    startBalance: 10000,
    priceMin: 50,
    priceMax: 100
};

// Загрузка настроек
function loadSettings() {
    const saved = localStorage.getItem('finTrainerSettings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            settings = { ...settings, ...parsed };
        } catch(e) {}
    }
}

function saveSettings() {
    localStorage.setItem('finTrainerSettings', JSON.stringify(settings));
}

// ==================== САЛЮТЫ ====================
function fireConfetti() {
    const colors = ['#ff4d4d', '#ffaa00', '#4caf50', '#667eea', '#f093fb', '#ffd700'];
    for (let i = 0; i < 50; i++) {
        createParticle(window.innerWidth / 2 + (Math.random() - 0.5) * 100, window.innerHeight - 50, colors);
    }
}

function fireBigConfetti() {
    const colors = ['#ff4d4d', '#ffaa00', '#4caf50', '#667eea', '#f093fb', '#ff6b6b', '#ffd700', '#ff8800', '#ff3399', '#33ff99'];
    
    for (let i = 0; i < 70; i++) {
        createParticle(window.innerWidth / 2 + (Math.random() - 0.5) * 100, window.innerHeight - 50, colors);
    }
    
    setTimeout(() => {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 65%)`;
            particle.style.left = window.innerWidth / 2 + (Math.random() - 0.5) * 200 + 'px';
            particle.style.top = window.innerHeight - 80 + (Math.random() - 0.5) * 100 + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.transition = 'all 0.8s ease-out';
            document.body.appendChild(particle);
            
            const xOffset = (Math.random() - 0.5) * 300;
            const yOffset = (Math.random() - 0.5) * 200 - 100;
            
            setTimeout(() => {
                particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                particle.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                particle.remove();
            }, 900);
        }
    }, 800);
}

function createParticle(x, y, colors) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 10 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 1s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    document.body.appendChild(particle);
    
    const xOffset = (Math.random() - 0.5) * 250;
    const yOffset = -150 - Math.random() * 250;
    
    setTimeout(() => {
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 1200);
}

// ==================== ТОСТЫ ====================
function showToast(message, isError = false, theme = 'green') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = isError ? '#dc3545' : (theme === 'blue' ? '#2c6e9e' : '#28a745');
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}

// ==================== НАСТРОЙКИ МОДАЛКА ====================
function openSettingsModal(onSaveCallback) {
    loadSettings();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Настройки</h3>
            
            <div class="settings-group">
                <label>💰 Начальный баланс</label>
                <input type="number" id="modalStartBalance" value="${settings.startBalance}" step="500" min="500">
            </div>
            
            <div class="settings-group">
                <label>📉 Минимальная цена</label>
                <input type="number" id="modalPriceMin" value="${settings.priceMin}" step="50" min="10">
            </div>
            
            <div class="settings-group">
                <label>📈 Максимальная цена</label>
                <input type="number" id="modalPriceMax" value="${settings.priceMax}" step="100" min="100">
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-secondary" id="cancelSettingsBtn">Отмена</button>
                <button class="btn btn-primary" id="saveSettingsBtn">Сохранить</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const saveBtn = modal.querySelector('#saveSettingsBtn');
    const cancelBtn = modal.querySelector('#cancelSettingsBtn');
    
    saveBtn.onclick = () => {
        const newStartBalance = parseInt(modal.querySelector('#modalStartBalance').value);
        const newPriceMin = parseInt(modal.querySelector('#modalPriceMin').value);
        const newPriceMax = parseInt(modal.querySelector('#modalPriceMax').value);
        
        if (newPriceMin >= newPriceMax) {
            showToast('Минимальная цена должна быть меньше максимальной', true);
            return;
        }
        
        settings = {
            startBalance: newStartBalance,
            priceMin: newPriceMin,
            priceMax: newPriceMax
        };
        
        saveSettings();
        modal.remove();
        
        if (onSaveCallback) {
            onSaveCallback(settings);
        }
        
        showToast('Настройки сохранены');
    };
    
    cancelBtn.onclick = () => modal.remove();
}
