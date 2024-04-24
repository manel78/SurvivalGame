const playerDownImage = new Image()
playerDownImage.src = 'assets/img/player/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = 'assets/img/player/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = 'assets/img/player/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = 'assets/img/player/playerRight.png'

class Player {
    constructor(position, frames, animate = false) {
        this.mapindex = -1;
        this.position = position;
        this.pourcentpos = {
            x: (this.position.x/canvas.width)*100,
            y: (this.position.y/canvas.height)*100,
        }
        this.classes = "";

        this.maxHealth = -1;
        this.health = this.maxHealth;
        this.maxStamina = 100;
        this.stamina = this.maxStamina;
        this.weapon = new Weapon;

        this.velocity = 0;

        this.frames = { max :frames, val: 0, elapsed: 0 }

        this.playerDownImage = playerDownImage;
        this.playerUpImage = playerUpImage;
        this.playerLeftImage = playerLeftImage;
        this.playerRightImage = playerRightImage;
        this.playerImage = this.playerDownImage;
        this.animate =animate
        this.playerImage.onload = () => {
            this.width = (this.playerImage.width / this.frames.max)
            this.height = this.playerImage.height * (3/5)
        }
        this.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Couleur de l'ombre
    }

    draw() {
        c.drawImage(
            this.playerImage, 
            this.playerImage.width/4 * this.frames.val,
            0,
            this.playerImage.width / this.frames.max ,
            this.playerImage.height,
            this.position.x,
            this.position.y - this.playerImage.height * (2/5),
            this.playerImage.width / this.frames.max ,
            this.playerImage.height
        )

        if (!this.animate) return

        if (this.frames.max > 1){
            this.frames.elapsed++
        }
        
        if (this.frames.elapsed % 20 === 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }


    setStats(className){
        this.classes = className;
        if (this.classes == "shooter") {
            this.maxHealth = 2;
            this.health = this.maxHealth;
            this.maxStamina = 100;
            this.stamina = this.maxStamina;
            this.weapon = new Weapon;

            this.velocity = 3.4;

        } else if (this.classes == "melee") {
            this.maxHealth = 250;
            this.health = this.maxHealth;
            this.maxStamina = 150;
            this.stamina = this.maxStamina;
            this.weapon = new Weapon;

            this.velocity = 3.20;
        }
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


    minimap(map){
        this.pourcentpos = {
            x: ((map.position.x + offset.x)*-1/map.image.width),
            y: ((map.position.y+ offset.y)*-1/map.image.height),
        }

        map.image.onload = function() {
            c.drawImage(map.image, canvas.width - canvas.width / 6, 1, canvas.width / 6, canvas.height / 6);
        };

        c.strokeStyle = 'black';
        c.strokeRect(canvas.width-canvas.width/6-1, 1, canvas.width/6, canvas.height/6);

        c.fillStyle = 'white';
        c.fillRect(canvas.width-canvas.width/6 + this.pourcentpos.x*canvas.width/6,  this.pourcentpos.y*canvas.height/6, this.width/6, this.height/6);
    }

    takeDamage(damage){
        if ((this.health-damage)<0) {
            this.health = 0;
        } else {
            this.health -= damage;
        }
    }

    update() {
        // this.minimap();
        this.drawHealthBar();
        this.drawStaminaBar();
        this.draw();
    }
}

