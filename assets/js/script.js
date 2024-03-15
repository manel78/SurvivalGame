const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth-(window.innerWidth/4);
canvas.height = window.innerHeight-(window.innerHeight/8);

const scaledCanvas = {
    width: canvas.width / 1,
    height: canvas.height / 1,
};
const wallsize = canvas.height/20

class Sprite {
    constructor({ position }) {
        this.position = position;
    }

    draw() {
        c.fillStyle = 'lightblue'; 
        c.fillRect(this.position.x, this.position.y, canvas.width, canvas.height);
    }

    update() {
        this.draw();
    }
}

const backgroundlvl1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    }
});

class Player {
    constructor(position) {
        this.width = 30;
        this.height = 40;
        this.position = position
        
        this.velocity = {
            x: 0,
            y: 1.0,
        };
        this.maxHealth = 100;
        this.health = 100
        this.mapindex = 0
        
        this.color = 'white';
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
        c.strokeStyle = 'black';
        c.strokeRect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
    }

    drawHealthBar() {
        const barWidth = 100; 
        const barHeight = 10; 
        const currentHealthWidth = (this.health / this.maxHealth) * barWidth;

        c.fillStyle = 'green';
        c.fillRect(this.position.x-currentHealthWidth/4, this.position.y - 35, currentHealthWidth/2, barHeight);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x-currentHealthWidth/4, this.position.y - 35, barWidth/2, barHeight);
    }

    update() {
        this.draw();
        this.drawHealthBar();
    }
}

const player = new Player({
    x: canvas.width/2,
    y: canvas.height/2,
});


class Mutant {
    constructor(position) {
        this.position = position;
        this.maxHealth = 20
        this.health = 20;
        this.width = Math.random() * (35 - 20) + 20;
        this.height = Math.random() * (35 - 20) + 20;
        this.color = 'red';
        this.speed = Math.random() * (1.5 - 0.75) + 0.75;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    drawHealthBar() {
        const barWidth = 100; 
        const barHeight = 5; 
        const currentHealthWidth = (this.health / this.maxHealth) * barWidth;

        c.fillStyle = 'red';
        c.fillRect(this.position.x-currentHealthWidth/6, this.position.y - this.height, currentHealthWidth/3, barHeight);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x-currentHealthWidth/6, this.position.y - this.height, barWidth/3, barHeight);
    }

    update() {
        this.draw();
        this.drawHealthBar();
        this.moveTowardsPlayer();
    }

    moveTowardsPlayer() {
        const dx = player.position.x - this.position.x;
        const dy = player.position.y - this.position.y;

        const length = Math.sqrt(dx * dx + dy * dy);
        const vx = (dx / length) * this.speed;
        const vy = (dy / length) * this.speed;

        this.position.x += vx;
        this.position.y += vy;
    }
}

const mutants = [
    [new Mutant({x: 100, y: 100}),
    new Mutant({x: 200, y: 300})],
    [new Mutant({x: 100, y: 100}),
    new Mutant({x: 200, y: 300})]
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



class Wall {
    constructor(position, width, height, color) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const walls = [
    [new Wall({x: 0, y: 0}, canvas.width, canvas.height/20, 'black'), 
    new Wall({x: 0, y: 0}, canvas.height/20, canvas.height, 'black'), 
    new Wall({x: canvas.width-canvas.height/20, y: 0}, canvas.height/20, canvas.height, 'black'),
    new Wall({x: 0, y: canvas.height-canvas.height/20}, canvas.width, canvas.height/20, 'black')],

    [topwall2 = new Wall({x: 0, y: 0}, canvas.width, canvas.height/20, 'black'),
    leftwall2 = new Wall({x: 0, y: 0}, canvas.height/20, canvas.height, 'black'),
    rightwall2 = new Wall({x: canvas.width-canvas.height/20, y: 0}, canvas.height/20, canvas.height, 'black')]
];

function drawWalls(mapIndex) {
    if (mapIndex >= 0 && mapIndex < walls.length) {
        const wallSet = walls[mapIndex];
        wallSet.forEach(wall => {
            wall.draw();
        });
    } else {
        console.error("Index de carte invalide.");
    }
}

function willCollide(x,y){
    let willCollide = false;
    const currentMapObstacles = obstacles[currentMapIndex+1];
    currentMapObstacles.forEach(obstacle => {
        if (
            x-20 < obstacle.x + obstacle.width &&
            x+20 > obstacle.x &&
            y-20 < obstacle.y + obstacle.height &&
            y+20 > obstacle.y
        ) {
            willCollide = true;
        }
    });
    return willCollide;
}

function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgroundlvl1.update();
    drawWalls(player.mapindex);
    drawMutants(player.mapindex);
    player.update();
    playerMove();
    playerAttack()
    
}

function playerMove(){
    if (keys.d.pressed && ((player.position.x + 2+player.width/2)<canvas.width-wallsize)  ) player.position.x += 2;
    if (keys.z.pressed && ((player.position.y - 2-player.height/2)>wallsize )) player.position.y += -2;
    if (keys.q.pressed && ((player.position.x - 2-player.width/2)>wallsize)) player.position.x += -2;
    if (keys.s.pressed && ((player.position.y + 2+player.height/2)<canvas.height-wallsize )) player.position.y += 2
}

function playerAttack(mouseX, mouseY) {
    let direction = "";

    // Comparer les coordonnées du clic avec celles du joueur
    if (mouseX < player.position.x && mouseY < player.position.y) {
        direction = "NW";
    } else if (mouseX > player.position.x && mouseY < player.position.y) {
        direction = "NE";
    } else if (mouseX < player.position.x && mouseY > player.position.y) {
        direction = "SW";
    } else if (mouseX > player.position.x && mouseY > player.position.y) {
        direction = "SE";
    } else if (mouseX === player.position.x && mouseY < player.position.y) {
        direction = "N";
    } else if (mouseX === player.position.x && mouseY > player.position.y) {
        direction = "S";
    } else if (mouseX < player.position.x && mouseY === player.position.y) {
        direction = "W";
    } else if (mouseX > player.position.x && mouseY === player.position.y) {
        direction = "E";
    }

    console.log("Direction du clic de souris par rapport au joueur :", direction);
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

canvas.addEventListener('mousedown', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    console.log('Position du clic de souris :', mouseX, mouseY);
    if (mouseX != null && mouseY == null) {
        playerAttack(mouseX, mouseY);
    }
    
});

animate();

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