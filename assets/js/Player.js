class Player {
    constructor(position) {
        this.mapindex = 0;
        this.position = position;
        this.pourcentpos = {
            x: (this.position.x/canvas.width)*100,
            y: (this.position.y/canvas.height)*100,
        }
        this.classes = "";

        this.alive = true;
        this.maxHealth = 0;
        this.health = this.maxHealth;
        this.maxStamina = 100;
        this.stamina = this.maxStamina;
        this.weapon = new Weapon;

        this.velocity = 0;
        this.width = 0;
        this.height = 0;

        this.color = 'white';
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
    }

    setStats(className){
        this.classes = className;
        if (this.classes == "shooter") {
            this.maxHealth = 150;
            this.health = this.maxHealth;
            this.maxStamina = 100;
            this.stamina = this.maxStamina;
            this.weapon = new Weapon;

            this.velocity = 1.25;
            this.width = 20;
            this.height = 40;
        } else if (this.classes == "melee") {
            this.maxHealth = 250;
            this.health = this.maxHealth;
            this.maxStamina = 150;
            this.stamina = this.maxStamina;
            this.weapon = new Weapon;

            this.velocity = 1.15;
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
        const barWidth = canvas.width/6;
        const barHeight = 10;
        const currentHealthWidth = (this.health / this.maxHealth) * barWidth;
        const lifePourcent = (this.health / this.maxHealth)*100
        c.fillStyle = 'green';
        if (lifePourcent <= 33){
        c.fillStyle = 'red';
        } else if (lifePourcent <= 66 && lifePourcent > 33){
            c.fillStyle = 'orange';
        }
        c.fillRect(canvas.width-canvas.width/6-1, canvas.height/6+1, currentHealthWidth, barHeight);

        c.strokeStyle = 'black';
        c.strokeRect(canvas.width-canvas.width/6-1, canvas.height/6+1, canvas.width/6, barHeight);
    }

    drawStaminaBar() {
        const barHeight = 10;
        const barWidth = canvas.width/6;
        const currentStaminaWidth = (this.stamina / this.maxStamina) * barWidth;

        c.fillStyle = 'yellow';
        c.fillRect(canvas.width-canvas.width/6-1, canvas.height/6+11, currentStaminaWidth, barHeight);

        c.strokeStyle = 'black';
        c.strokeRect(canvas.width-canvas.width/6-1, canvas.height/6+11, canvas.width/6, barHeight);
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
            x: (this.position.x/canvas.width),
            y: (this.position.y/canvas.height),
        }

        c.fillStyle = 'grey';
        c.fillRect(canvas.width-canvas.width/6, 1, canvas.width/6, canvas.height/6);

        c.strokeStyle = 'black';
        c.strokeRect(canvas.width-canvas.width/6-1, 1, canvas.width/6, canvas.height/6);

        c.fillStyle = 'red';
        c.fillRect(canvas.width-canvas.width/6 + this.pourcentpos.x*canvas.width/6,  this.pourcentpos.y*canvas.height/6, this.width/6, this.height/6);
    }

    takeDamage(damage){
        if ((this.health-damage)<0) {
            this.alive = false;
            this.health = 0;
        } else {
            this.health -= damage;
        }
    }

    update() {
        this.minimap();
        this.drawShadow();
        this.drawHealthBar();
        this.drawStaminaBar();
        this.draw();
    }
}
function playerMove() {
    if (keys.d.pressed && ((player.position.x + 2 + player.width / 2) < canvas.width)) player.position.x += player.velocity;
    if (keys.z.pressed && ((player.position.y - 2 - player.height / 2) > 0)) player.position.y -= player.velocity;
    if (keys.q.pressed && ((player.position.x - 2 - player.width / 2) > 0)) player.position.x -= player.velocity;
    if (keys.s.pressed && ((player.position.y + 2 + player.height / 2) < canvas.height)) player.position.y += player.velocity;
}

