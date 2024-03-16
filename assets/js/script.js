const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth - (window.innerWidth / 4);
canvas.height = window.innerHeight - (window.innerHeight / 8);

const scaledCanvas = {
    width: canvas.width / 1,
    height: canvas.height / 1,
};
const wallsize = canvas.height / 20



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

class Player {
    constructor(position) {
        this.mapindex = 0;
        this.position = position;
        this.pourcentpos = {
            x: (this.position.x/canvas.width)*100,
            y: (this.position.y/canvas.height)*100,
        }
        this.classes = "";

        this.maxHealth = 150;
        this.health = this.maxHealth;
        this.stamina = 100;
        this.weapon = new Weapon;

        this.velocity = 1.35;
        this.width = 20;
        this.height = 40;

        this.color = 'white';
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
    }

    setStats(className){
        this.classes = className;
        if (this.classes == "shooter") {
            this.maxHealth = 150;
            this.health = this.maxHealth;
            this.stamina = 100;
            this.weapon = new Weapon;

            this.velocity = 1.35;
            this.width = 20;
            this.height = 40;
        } else if (this.classes == "melee") {
            this.maxHealth = 250;
            this.health = this.maxHealth;
            this.stamina = 150;
            this.weapon = new Weapon;

            this.velocity = 1.25;
            this.width = 30;
            this.height = 40;
        }
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    drawHealthBar() {
        const barWidth = 100;
        const barHeight = 10;
        const currentHealthWidth = (this.health / this.maxHealth) * barWidth;

        c.fillStyle = 'green';
        c.fillRect(this.position.x - currentHealthWidth / 4, this.position.y - 35, currentHealthWidth / 2, barHeight);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x - currentHealthWidth / 4, this.position.y - 35, barWidth / 2, barHeight);
    }

    drawStaminaBar() {
        const barWidth = 10; // Largeur de la barre de stamina
        const currentStaminaHeight = (this.stamina / 100) * this.height;

        c.fillStyle = 'yellow';
        c.fillRect(this.position.x + this.width / 2 + 5, this.position.y - this.height / 2, barWidth, currentStaminaHeight);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x + this.width / 2 + 5, this.position.y - this.height / 2, barWidth, this.height);
    }

    drawShadow() {
        c.save();
        c.beginPath();
        c.arc(this.position.x, this.position.y - 5 + this.height / 2, this.width / 2, 0, Math.PI * 2);
        c.fillStyle = this.shadowColor;
        c.fill();
        c.restore();
    }

    minimap(){
        this.pourcentpos = {
            x: (this.position.x/canvas.width)*100,
            y: (this.position.y/canvas.height)*100,
        }

        c.fillStyle = 'grey';
        c.fillRect(canvas.width-wallsize-canvas.width/6, wallsize, canvas.width/6, canvas.height/6);

        c.strokeStyle = 'black';
        c.strokeRect(canvas.width-wallsize-canvas.width/6, wallsize, canvas.width/6, canvas.height/6);

        c.fillStyle = 'red';
        c.fillRect(canvas.width-wallsize-canvas.width/6 + this.pourcentpos.x, wallsize+ this.pourcentpos.y, this.width/6, this.height/6);
    }

    update() {
        this.minimap();
        this.drawShadow();
        this.draw();
        this.drawHealthBar();
        this.drawStaminaBar();
    }
}

class Weapon {

}

class Mutant {
    constructor(position) {
        this.position = position;
        this.width = Math.random() * (30 - 20) + 20;
        this.height = Math.random() * (35 - 20) + 20;
        this.color = 'red';
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
        this.shadowRadius = 14; // Rayon de l'ombre

        const size = this.width * this.height;

        this.speed = Math.min(1.5, 0.75 + (1.5 - 0.75) * (1 - ((this.width / 2) * (this.height * 2)) / 1225));

        this.maxHealth = Math.round(25 * size / 1225);

        this.damage = Math.round(15 * size / 1225);

        this.health = this.maxHealth;
    }

    draw() {
        // Dessiner l'ombre
        c.save();
        c.beginPath();
        c.arc(this.position.x, this.position.y - 5 + this.height / 2, this.width / 2, 0, Math.PI * 2);
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
        c.fillRect(this.position.x - currentHealthWidth / 6, this.position.y - this.height, currentHealthWidth / 3, barHeight);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x - currentHealthWidth / 6, this.position.y - this.height, barWidth / 3, barHeight);
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

const backgroundlvl1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    }
});

const player = new Player({
    x: canvas.width/2,
    y: canvas.height/2,
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
