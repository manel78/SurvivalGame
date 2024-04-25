const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let f = 1;
c.fillStyle = 'rgba(0,0,0)';

// Global Variables
canvas.width = window.innerWidth - (window.innerWidth / 4);
canvas.height = window.innerHeight - (window.innerHeight / 8);

const sworddance = new Weapon(8, 100, 500, sword);
let selectedClass = '';
let changemapkey = false;
let printposkey = false;
const player = new Player({
    x: canvas.width/2,
    y: canvas.height / 2
}, 4);

let changingmap = true
let currentMap = maps[player.mapindex];
let currentfore = foreground[player.mapindex];

const keys = {
    a: {
        pressed: false,
    },
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

// Main Function
function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (player.health == 0){ // Death verification
        player.mapindex = 7
    } 
    
    if (player.mapindex == -1) {
        drawClassMenu();
    } else if (player.mapindex > -1 && player.mapindex <= 6) {  // 6 Max
        if (keys.a.pressed && f > 0) {
            sworddance.attack();
            keys.a.pressed = false;
            f--;
            // Reset the "a" key after 4s
            setTimeout(() => {
                f++;
            }, 2500); 
        }
        Game();
    } else if (player.mapindex == 7) {
        drawDeathMenu();
    } 
    
}
// Game Function
function Game() {
    // Game Variable
    currentMap = maps[player.mapindex];
    currentfore = foreground[player.mapindex];
    currentMap.draw();

    // Changing Map Verification
    if (verificationmap(currentMap)){
        if (player.mapindex == 6){
            player.mapindex = 0
        }else {
            player.mapindex += 1;
        }
        changingmap = true
    }
    if (changingmap) {
        currentMap,currentfore,changingmap = changemap(changingmap)
    }

    // Draw Boundaries 
    // currentMap.boundaries.forEach(boundary =>{
       // boundary.draw()
    // })

    playerMove(currentMap,currentfore);
    drawMutants(player.mapindex);

    // drawNpc(player.mapindex);

    mutants = mutants.filter(deadmutant => deadmutant.health > 0)

    // player + foreground update
    player.update();
    player.minimap(currentMap)
    currentfore.draw()
}

function chooseClass(className) {
    selectedClass = className;
    player.mapindex = 0;
    player.setStats(selectedClass);
    Game();
}

animate();

// get click position 
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

// key variable
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a': 
            keys.a.pressed = true;
            break;
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
