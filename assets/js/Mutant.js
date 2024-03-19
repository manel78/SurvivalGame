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
        // Position du pied du joueur
        const playerFootPositionY = player.position.y + player.height / 2;
    
        // Calculer la direction vers le pied du joueur
        const dx = player.position.x - this.position.x;
        const dy = playerFootPositionY - this.position.y - this.height/2;
    
        // Calculer la distance totale vers le pied du joueur
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);
    
        // Vérifier si le mutant est déjà au pied du joueur
        if (distanceToPlayer > 0) {
            // Calculer les composantes de vélocité en fonction de la distance
            const vx = (dx / distanceToPlayer) * this.speed;
            const vy = (dy / distanceToPlayer) * this.speed;
    
            // Déplacer le mutant vers le pied du joueur
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
                // Réduire la santé du joueur
                player.health -= this.damage;

                // Mettre à jour le temps de la dernière attaque
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