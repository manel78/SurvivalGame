class Npc {
    constructor(position) {
        this.position = position;
        this.width = 25;
        this.height = 40;
        this.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.color = "#023020"
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);

        c.strokeStyle = 'black';
        c.strokeRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    update(){
        this.draw();
    }
}


function drawNpc(mapIndex) {
    if (mapIndex >= 0 && mapIndex < npc.length) {
        const npcSet = npc[mapIndex];
        npcSet.forEach(npc => {
            npc.update();
        });
    } else {
        console.error("Invalid map index for NPCs.");
    }
}

const npc = [
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
    [new Npc({ x: canvas.width*0.8, y: canvas.height/2 })],
    
];
