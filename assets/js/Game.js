const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
c.fillStyle = 'rgba(0,0,0)';

canvas.width = window.innerWidth - (window.innerWidth / 4);
canvas.height = window.innerHeight - (window.innerHeight / 8);

const scaledCanvas = {
    width: canvas.width / 1,
    height: canvas.height / 1,
};
const wallsize = canvas.height / 20
let selectedClass = '';
let changemapkey = false;
let lastJKeyPressTime = 0;


const player = new Player({
    x: canvas.width/2,
    y: canvas.height/2,
}, canvas);


const maps = [
    new Map({ x: 0, y: 0 }, map1image),
    new Map({ x: 0, y: 0 }, map2image),
    new Map({ x: 0, y: 0 }, map3image),
    new Map({ x: 0, y: 0 }, map4image),
    new Map({ x: 0, y: 0 }, map5image),
    new Map({ x: 0, y: 0 }, map6image),
    new Map({ x: 0, y: 0 }, mapfinalimage)
];

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
    j: {
        pressed: false,
    },
};

function animate() {
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    if (player.health == 0){ // Verif Mort
        player.mapindex = 7
    } 
    
    if (player.mapindex == -1) {
        drawClassMenu();
    } else if (player.mapindex > -1 && player.mapindex <= 6) { // 6 Max
        Game();
    } else if (player.mapindex == 7) {
        drawDeathMenu();
    } 
    
}

function Game() {
    const currentMap = maps[player.mapindex];
    playerMove();
    currentMap.draw();
    drawMutants(player.mapindex);
    drawNpc(player.mapindex);
    player.update();
}

function chooseClass(className) {
    selectedClass = className;
    player.mapindex = 0;
    player.setStats(selectedClass);
    Game();
}

animate();

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
    } else if (player.mapindex == 7) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (mouseX >= canvas.width / 2 - 90 && mouseX <= canvas.width / 2 + 90 &&
        mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 60) {
            location.reload();
            animate();
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

        case 'j':
            if (Date.now() - lastJKeyPressTime > 500) { // 500 millisecondes de cooldown
                if (player.mapindex == 6){
                    player.mapindex = 0
                }else {
                    player.mapindex += 1;
                }
                lastJKeyPressTime = Date.now();
            }
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
        
        case 'j':
            changemapkey = false;
            break;
    

    }
});
