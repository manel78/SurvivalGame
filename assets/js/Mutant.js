const MutantImage =  new Image()
MutantImage.src = 'assets/img/mutant/mutant.png'

let speedmutant = 0;
class Mutant {
    constructor(position) {
        this.position = position;
        this.width = Math.random() * (30 - 20) + 20;
        this.height = Math.random() * (35 - 20) + 20;
        this.color = 'red';
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; 
        this.shadowRadius = 14;
        this.image = MutantImage;
        this.imageWidth = 10000;
        this.imageHeight = 10000;
        this.distanceToPlayer;
0
        const size = this.width * this.height;

        this.speed = Math.min(0.40+speedmutant, 0.20+speedmutant/2 + (0.40+speedmutant - 0.20+speedmutant/2) * (1 - ((this.width / 2) * (this.height * 2)) / 1225));

        this.maxHealth = Math.round(25 * size / 1225);
        this.health = this.maxHealth;

        this.damage = Math.round(15 * size / 1225);
        this.lastAttackTime = 0; 
        this.attackCooldown = 2000; 
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x - this.width / 2,
            this.position.y - this.height / 2,
        );

    }
    takeDamage(damage) {
        if ((this.health-damage)<0) {
            this.health = 0;
            //this.delete();
        } else {
            this.health -= damage;
        }
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

    touchPlayer() {
        // Player corners
        let playerTopLeft = { x: player.position.x - player.width / 2, y: player.position.y - player.height / 2 };
        let playerBotRight = { x: player.position.x + player.width / 2, y: player.position.y + player.height / 2 };
    
        // Object corners
        let thisTopLeft = { x: this.position.x - this.width / 2, y: this.position.y - this.height / 2 };
        let thisBotRight = { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 };
    
        // Collision check
        if (
            (thisTopLeft.x <= playerBotRight.x && thisTopLeft.y <= playerBotRight.y) &&
            (thisBotRight.x >= playerTopLeft.x && thisBotRight.y >= playerTopLeft.y)
        ) {
            return true;
        }
    
        return false;
    }

    moveTowardsPlayer() {
        const playerFootPositionY = player.position.y + player.height / 2;
    
        const dx = player.position.x - this.position.x;
        const dy = playerFootPositionY - this.position.y - this.height/2;
    
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);
        this.distanceToPlayer = distanceToPlayer;
    
        if (distanceToPlayer > 0) {
            const vx = (dx / distanceToPlayer) * this.speed;
            const vy = (dy / distanceToPlayer) * this.speed;
    
            this.position.x += vx;
            this.position.y += vy;
        }
    }
    
    attackPlayer() {
        const currentTime = Date.now();
        const timeSinceLastAttack = currentTime - this.lastAttackTime;
    
        // Check if cooldown is over
        if (timeSinceLastAttack >= this.attackCooldown) {
            const distanceToPlayer = Math.sqrt(
                Math.pow(player.position.x - this.position.x, 2) +
                Math.pow(player.position.y - this.position.y, 2)
            );
    
            if (this.touchPlayer()) {
                player.takeDamage(this.damage);
                this.lastAttackTime = currentTime;
            }
        }
    }

    update() {
        this.draw();
        this.drawHealthBar();
        this.moveTowardsPlayer();
        this.attackPlayer();
    }
}

function drawMutants(mapIndex) {
    mutants.forEach(mutant => {
        mutant.update();
    });
}

// Function to generate random positions on the map
function generateRandomPosition() {
    const minX = -500;
    const maxX = 500;
    const minY = -500;
    const maxY = 500;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return { x: randomX, y: randomY };
}

// Function to create and add three new mutants
function createMutants() {
    for (let i = 0; i < 3; i++) {
        const randomPosition = generateRandomPosition();
        const newMutant = new Mutant(randomPosition);
        mutants.push(newMutant);
    }
}

// Create mutants every 3s
setInterval(createMutants, 3000);


let mutants = []

const mutant1 = new Mutant({ x: 200, y: 100 })
const mutant2 = new Mutant({ x: 200, y: 300 })
mutants.push(mutant1)
mutants.push(mutant2)





