let scoreglobal = 0;
let nuc = 10;
let speedmutant = 0;


class Weapon {
    constructor(degats, portee, delay, image) {
        this.degats = degats;
        this.portee = portee;
        this.delay = delay;
        this.image = image;
    }

    attack() {
        for (let i = 0; i < mutants.length; i++) {
            if (mutants[i].distanceToPlayer < 200)
            mutants[i].takeDamage(this.degats); // Correction ici
        if (mutants[i].health <= 0) {
            speedmutant += 0.02  
            scoreglobal++;
            nuc--;
            document.getElementById('score').textContent = `Score: ${scoreglobal}`;
            document.getElementById('nuc').textContent = `Nuc: ${nuc}`;
            console.log(scoreglobal)
        } 
        if (nuc <= 0) {
            for (let j = 0; j < 25; j++) {
            mutants[j].takeDamage(100000000);
            scoreglobal++;

            }
            nuc = 10;
        }
            mutants = mutants.filter(deadmutant => deadmutant.health > 0);
        }
    }
    
}

