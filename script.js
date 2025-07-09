const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const loveContainer = document.getElementById('loveContainer');
const container = document.querySelector('.container');

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // evita que ejecute click
    moveNoButton();
}, { passive: false });

yesBtn.addEventListener('click', () => {
    container.style.display = 'none';
    document.body.classList.remove('question-phase');
    document.body.classList.add('love-phase');
    createCenterLove();
    createInitialFallingGrid();
    setTimeout(() => {
        startFallingLove();
    }, 3000);
});


function moveNoButton() {
    const yesRect = yesBtn.getBoundingClientRect();
    const questionRect = document.querySelector('h1').getBoundingClientRect();
    const buffer = 50; // separación mínima con otros elementos
    const minMargin = 20; // para que no se pegue a los bordes

    let tries = 0;
    let randomX, randomY;

    do {
        randomX = minMargin + Math.random() * (window.innerWidth - noBtn.offsetWidth - 2 * minMargin);
        randomY = minMargin + Math.random() * (window.innerHeight - noBtn.offsetHeight - 2 * minMargin);
        tries++;
    } while (
        (
            randomX < yesRect.right + buffer && randomX + noBtn.offsetWidth > yesRect.left - buffer &&
            randomY < yesRect.bottom + buffer && randomY + noBtn.offsetHeight > yesRect.top - buffer
        ) ||
        (
            randomX < questionRect.right + buffer && randomX + noBtn.offsetWidth > questionRect.left - buffer &&
            randomY < questionRect.bottom + buffer && randomY + noBtn.offsetHeight > questionRect.top - buffer
        ) && tries < 100
    );

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}


function createCenterLove() {
    const centerLove = document.createElement('div');
    centerLove.classList.add('centerLove');
    centerLove.textContent = 'TE AMO 💓';
    loveContainer.appendChild(centerLove);
}

function createInitialFallingGrid() {
    const columns = Math.max(5, Math.floor(window.innerWidth / 100));
    const rows = Math.max(3, Math.floor(window.innerHeight / 60));


    const spacingX = window.innerWidth / columns;
    const spacingY = window.innerHeight / rows;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let text = document.createElement('div');
            text.classList.add('fallingGridLove');
            text.style.left = `${i * spacingX}px`;
            text.style.top = `${j * spacingY - window.innerHeight}px`;
            text.textContent = 'TE AMO';
            loveContainer.appendChild(text);

            setTimeout(() => {
                text.remove();
            }, 3000);
        }
    }
}

function startFallingLove() {
    setInterval(() => {
        const love = document.createElement('div');
        love.classList.add('fallingLove');
        love.textContent = 'TE AMO';
        love.style.left = `${Math.random() * 100}vw`;
        loveContainer.appendChild(love);

        setTimeout(() => {
            love.remove();
        }, 3000);
    }, 50);
}

loveContainer.addEventListener('click', (e) => {
    spawnLoveBurst(e.clientX, e.clientY);
});

loveContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    spawnLoveBurst(touch.clientX, touch.clientY);
}, { passive: false });

function spawnLoveBurst(x, y) {
    const count = 8; // cuantos TE AMO salen por toque
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 100 + Math.random() * 50;
        const love = document.createElement('div');
        love.classList.add('burstLove');
        love.textContent = 'TE AMO';
        love.style.left = `${x}px`;
        love.style.top = `${y}px`;

        loveContainer.appendChild(love);

        // anima hacia una dirección aleatoria
        love.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        love.style.opacity = '0';

        // elimina luego
        setTimeout(() => {
            love.remove();
        }, 1000);
    }
}

