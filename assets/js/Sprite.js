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