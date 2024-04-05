const playerDownImage = new Image()
playerDownImage.src = 'assets/img/player/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = 'assets/img/player/playerLeft.png'

const playerLeftImage = new Image()
playerLeftImage.src = 'assets/img/player/playerRight.png'

const playerRightImage = new Image()
playerRightImage.src = 'assets/img/player/playerUp.png'

class Player {
    constructor(position) {
        this.mapindex = -1;
        this.position = position;
        this.pourcentpos = {
            x: (this.position.x/canvas.width)*100,
            y: (this.position.y/canvas.height)*100,
        }
        this.classes = "";

        this.alive = true;
        this.maxHealth = -1;
        this.health = this.maxHealth;
        this.maxStamina = 100;
        this.stamina = this.maxStamina;
        this.weapon = new Weapon;

        this.velocity = 0;

        this.color = 'white';
        this.playerDownImage = playerDownImage;
        this.playerUpImage = playerUpImage;
        this.playerLeftImage = playerLeftImage;
        this.playerRightImage = playerRightImage;
        this.playerImage = this.playerDownImage;
        this.width = this.playerImage.width/4;
        this.height = this.playerImage.height;
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
    }

    setStats(className){
        this.classes = className;
        if (this.classes == "shooter") {
            this.maxHealth = 2;
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
        c.drawImage(this.playerImage, 
            0,
            0,
            this.playerImage.width/4,
            this.playerImage.height,
            this.position.x - this.playerImage.width/8,
            this.position.y - this.playerImage.height / 2,
            this.playerImage.width/4,
            this.playerImage.height
            )
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

        c.fillStyle = 'lightblue';
        c.fillRect(canvas.width-canvas.width/6, 1, canvas.width/6, canvas.height/6);

        c.strokeStyle = 'black';
        c.strokeRect(canvas.width-canvas.width/6-1, 1, canvas.width/6, canvas.height/6);

        c.fillStyle = 'white';
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
    const diagonalVelocity = player.velocity / Math.sqrt(2);

    if (keys.d.pressed && ((player.position.x + 2 + player.width / 2) < canvas.width)) {
        if (keys.z.pressed || keys.s.pressed) {
            player.position.x += diagonalVelocity;
        } else {
            player.position.x += player.velocity;
        }
    }   
    if (keys.z.pressed && ((player.position.y - 2 - player.height / 2) > 0)) {
        if (keys.q.pressed || keys.d.pressed) {
            player.position.y -= diagonalVelocity;
        } else {
            player.position.y -= player.velocity;
        }
    }
    if (keys.q.pressed && ((player.position.x - 2 - player.width / 2) > 0)) {
        if (keys.z.pressed || keys.s.pressed) {
            player.position.x -= diagonalVelocity;
        } else {
            player.position.x -= player.velocity;
        }
    }
    if (keys.s.pressed && ((player.position.y + 2 + player.height / 2) < canvas.height)) {
        if (keys.q.pressed || keys.d.pressed) {
            player.position.y += diagonalVelocity;
        } else {
            player.position.y += player.velocity;
        }
    }
}
