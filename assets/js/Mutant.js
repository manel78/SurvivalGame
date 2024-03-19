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


        this.health = this.maxHealth;

        this.damage = Math.round(15 * size / 1225);
        this.lastAttackTime = 0; 
        this.attackCooldown = 2000; 
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

    

    moveTowardsPlayer() {
        const playerFootPositionY = player.position.y + player.height / 2;
    
        const dx = player.position.x - this.position.x;
        const dy = playerFootPositionY - this.position.y - this.height/2;
    
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);
    
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

        // Vérifier si le cooldown est écoulé
        if (timeSinceLastAttack >= this.attackCooldown) {
            const distanceToPlayer = Math.sqrt(
                Math.pow(player.position.x - this.position.x, 2) +
                Math.pow(player.position.y - this.position.y, 2)
            );

            // Si le joueur est à moins de la moitié de la taille du mutant en distance
            if (distanceToPlayer < this.width / 2) {
                player.takeDamage(this.damage)
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
    if (mapIndex >= 0 && mapIndex < mutants.length) {
        const mutantSet = mutants[mapIndex];
        mutantSet.forEach(mutant => {
            mutant.update();
        });
    } else {
        console.error("Index de carte invalide pour les mutants.");
    }
}

const mutants = [
    [new Mutant({ x: 100, y: 100 }),
    new Mutant({ x: 200, y: 300 })],
    [new Mutant({ x: 100, y: 100 }),
    new Mutant({ x: 200, y: 300 })]
]