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