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
        
        this.maxHealth = 100;
        this.health = 100
        this.stamina = 100
        this.mapindex = 0
        
        this.color = 'white';
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
        this.shadowRadius = 20; // Rayon de l'ombre
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

    drawStaminaBar() {
        const barWidth = 10; // Largeur de la barre de stamina
        const currentStaminaHeight = (this.stamina / 100) * this.height;

        c.fillStyle = 'yellow';
        c.fillRect(this.position.x + this.width / 2 + 5, this.position.y - this.height / 2, barWidth, currentStaminaHeight);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x + this.width / 2 + 5, this.position.y - this.height / 2, barWidth, this.height);
    }

    drawShadow(){
        c.save();
        c.beginPath();
        c.arc(this.position.x, this.position.y-5 + this.height / 2, this.width/2, 0, Math.PI * 2);
        c.fillStyle = this.shadowColor;
        c.fill();
        c.restore();
    }

    update() {
        this.drawShadow();
        this.draw();
        this.drawHealthBar();
        this.drawStaminaBar();
    }
}

const player = new Player({
    x: canvas.width/2,
    y: canvas.height/2,
});


class Mutant {
    constructor(position) {
        this.position = position;
        this.width = Math.random() * (30 - 20) + 20;
        this.height = Math.random() * (35 - 20) + 20;
        this.color = 'red';
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
        this.shadowRadius = 14; // Rayon de l'ombre
    
        const size = this.width * this.height;

        this.speed = Math.min(1.5, 0.75 + (1.5 - 0.75) * (1 - ((this.width/2)*(this.height*2)) / 1225));

        this.maxHealth = Math.round(25 * size / 1225);
    
        this.damage = Math.round(15 * size / 1225); 

        this.health = this.maxHealth;
    }

    draw() {
        // Dessiner l'ombre
        c.save();
        c.beginPath();
        c.arc(this.position.x, this.position.y-5 + this.height / 2, this.width/2, 0, Math.PI * 2);
        c.fillStyle = this.shadowColor;
        c.fill();
        c.restore();

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
    
}

function playerMove(){
    if (keys.d.pressed && ((player.position.x + 2+player.width/2)<canvas.width-wallsize)  ) player.position.x += 1.25;
    if (keys.z.pressed && ((player.position.y - 2-player.height/2)>wallsize )) player.position.y -= 1.25;
    if (keys.q.pressed && ((player.position.x - 2-player.width/2)>wallsize)) player.position.x -= 1.25;
    if (keys.s.pressed && ((player.position.y + 2+player.height/2)<canvas.height-wallsize )) player.position.y += 1.25;
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