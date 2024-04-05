// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');

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

let selectedClass = '';

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

    if (player.mapindex == -1){
        drawMenu();
    } else {
        Game();
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
    player.mapindex = 0;
    player.setStats(selectedClass);
    Game();
}

function Game() {
    c.drawImage(map,0,0);
    drawMutants(player.mapindex);
    drawNpc(player.mapindex);
    player.update();
    playerMove();
}

canvas.addEventListener('click', function(event) {
    if (player.mapindex == -1) {
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

        case 'Shift':
            keys.shift.pressed = true;
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

        case 'Shift':
            keys.shift.pressed = false;
            break;
    }
});
