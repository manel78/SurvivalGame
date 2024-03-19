const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth - (window.innerWidth / 4);
canvas.height = window.innerHeight - (window.innerHeight / 8);

const scaledCanvas = {
    width: canvas.width / 1,
    height: canvas.height / 1,
};
const wallsize = canvas.height / 20


const player = new Player({
    x: canvas.width/2,
    y: canvas.height/2,
}, canvas);

const mutants = [
    [new Mutant({ x: 100, y: 100 }),
    new Mutant({ x: 200, y: 300 })],
    [new Mutant({ x: 100, y: 100 }),
    new Mutant({ x: 200, y: 300 })]
]

function drawMutants(mapIndex) {
    if (mapIndex >= 0 && mapIndex < mutants.length) {
        const mutantSet = mutants[mapIndex];
        mutantSet.forEach(mutant => {
            mutant.update();
        });
    } else {
        console.error("Index de carte invalide pour les mutants.");
    }
}

const backgroundlvl1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    }
});


let menuVisible = true;
let selectedClass = '';

function startGame() {
    backgroundlvl1.update();
    drawMutants(player.mapindex);
    player.update();
    playerMove();
}

function playerMove() {
    if (keys.d.pressed && ((player.position.x + 2 + player.width / 2) < canvas.width)) player.position.x += player.velocity;
    if (keys.z.pressed && ((player.position.y - 2 - player.height / 2) > 0)) player.position.y -= player.velocity;
    if (keys.q.pressed && ((player.position.x - 2 - player.width / 2) > 0)) player.position.x -= player.velocity;
    if (keys.s.pressed && ((player.position.y + 2 + player.height / 2) < canvas.height)) player.position.y += player.velocity;
}

const keys = {
    d: {
        pressed: false,
    },
    q: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    z: {
        pressed: false,
    },
};

function animate() {
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (menuVisible) {
        drawMenu();
    } else {
        startGame();
    }
}

animate();

function drawMenu() {
    c.fillStyle = 'rgba(0, 0, 0, 0.5)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'white';
    c.font = '24px Arial';
    c.textAlign = 'center';
    c.fillText('Choisissez une classe :', canvas.width / 2, canvas.height / 2 - 50);

    c.fillStyle = 'blue';
    c.fillRect(canvas.width / 4-5, canvas.height / 2, 160, 50);
    c.fillStyle = 'white';
    c.fillText('Classe Melee', canvas.width / 4 + 75, canvas.height / 2 + 30);

    c.fillStyle = 'red';
    c.fillRect(canvas.width / 4 * 3 - 165, canvas.height / 2, 180, 50);
    c.fillStyle = 'white';
    c.fillText('Classe Shooter', canvas.width / 4 * 3 - 75, canvas.height / 2 + 30);
}

function chooseClass(className) {
    selectedClass = className;
    menuVisible = false;
    player.setStats(selectedClass);
    startGame();
}

canvas.addEventListener('click', function(event) {
    if (menuVisible) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (mouseX >= canvas.width / 4 && mouseX <= canvas.width / 4 + 150 &&
            mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 50) {
            chooseClass('melee');
        }

        if (mouseX >= canvas.width / 4 * 3 - 150 && mouseX <= canvas.width / 4 * 3 &&
            mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 50) {
            chooseClass('shooter');
        }
    }
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            break;

        case 'q':
            keys.q.pressed = true;
            break;

        case 'z':
            keys.z.pressed = true;
            break;

        case 's':
            keys.s.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;

        case 'q':
            keys.q.pressed = false;
            break;

        case 'z':
            keys.z.pressed = false;
            break;

        case 's':
            keys.s.pressed = false;
            break;
    }
});
