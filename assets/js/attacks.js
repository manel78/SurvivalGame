class Arme {
    constructor(nom, type, degats) {
        this.nom = nom;
        this.type = type;
        this.degats = degats;
    }
}

class AttaquePres {
    constructor(arme) {
        this.arme = arme;
    }

    dommages(force, defense) {
        let dommages = force + this.arme.degats - defense;
        return dommages < 0 ? 0 : dommages; 
    }
}

class AttaqueLoin {
    constructor(arme) {
        this.arme = arme;
    }

    dommages(force, defense) {
        let dommages = (force * 0.5) + this.arme.degats - defense; 
        return dommages < 0 ? 0 : dommages;
    }
}

class Ennemi {
    constructor(nom, force, defense, sante, type) {
        this.nom = nom;
        this.force = force;
        this.defense = defense;
        this.sante = sante;
        this.type = type;
    }

    attaquer(joueur, attaque) {
        if ((attaque instanceof AttaquePres && this.type === 'pres') || 
            (attaque instanceof AttaqueLoin && this.type === 'loin')) {
            let dommages = attaque.dommages(this.force, joueur.defense);
            joueur.sante -= dommages;
            console.log(`${this.nom} lui inflige ${dommages} points de dommages.`);
            if (joueur.sante <= 0) {
                console.log(`${joueur.nom} est mort !`);
            }
        } else {
            console.log(`${this.nom} est trop loin ou trop proche pour cette attaque !`);
        }
    }
}

class Projectile {
    constructor(degats, vitesse, position, direction) {
        this.degats = degats;
        this.vitesse = vitesse;
        this.position = position;
        this.direction = direction;
    }

    avancer() {
        this.position.x += this.direction.x * this.vitesse;
        this.position.y += this.direction.y * this.vitesse;
    }
}

class AttaqueLoin {
    constructor(arme) {
        this.arme = arme;
    }

    tirerProjectile(direction, vitesse) {
        return new Projectile(this.arme.degats, vitesse, {x: 0, y: 0}, direction);
    }
}

class Joueur {
    constructor(nom, force, defense, sante, armePres, armeLoin) {
        this.nom = nom;
        this.force = force;
        this.defense = defense;
        this.sante = sante;
        this.armePres = armePres;
        this.armeLoin = armeLoin;
    }

    attaquerPres(ennemi) {
        let attaque = new AttaquePres(this.armePres);
        ennemi.attaquer(this, attaque);
    }

    attaquerLoin(ennemi, direction, vitesse) {
        let attaque = new AttaqueLoin(this.armeLoin);
        let projectile = attaque.tirerProjectile(direction, vitesse);

        while (true) {
            projectile.avancer();

            if (collision(projectile, ennemi)) {
                ennemi.sante -= projectile.degats;
                console.log(`${ennemi.nom} a été touché par le projectile et perd ${projectile.degats} points de vie.`);
                break;
            }

            if (limiteChampDeJeu(projectile)) {
                console.log("Le projectile a manqué sa cible.");
                break;
            }
        }
    }
}
function collision(projectile, ennemi) {
    function collision(projectile, ennemi) {
        //  attaque de pres ou a distance 
        if (projectile instanceof Projectile) { 
            // verife la distances 
             let distance = Math.sqrt(Math.pow(projectile.position.x - ennemi.position.x, 2) + Math.pow(projectile.position.y - ennemi.position.y, 2));
            
            // > alors collision
            let rayonCollisionDistance = 10; // à adapter pour les attaques à distance
            return distance <= rayonCollisionDistance;
        } else if (projectile instanceof Ennemi) {
            // attaque proche 
            let distance = Math.sqrt(Math.pow(projectile.position.x - ennemi.position.x, 2) + Math.pow(projectile.position.y - ennemi.position.y, 2));
            
            // > alors collision
            let rayonCollisionPres = 20; // à adapter pour les attaques de près
            return distance <= rayonCollisionPres;
        }
    }
    
}

function limiteChampDeJeu(projectile) {
     // limite du jeu hauteur et longeurs 
     let limiteXMin = 0;  // changer les mesures 
     let limiteXMax = 800; 
     let limiteYMin = 0;
     let limiteYMax = 600; 
     
     // projectiles en dehors du jeu ?
     return (projectile.position.x < limiteXMin || projectile.position.x > limiteXMax || projectile.position.y < limiteYMin || projectile.position.y > limiteYMax);
 
}

// Utilisation des armes 
let epee = new Arme("Épée", "pres", 20);
let arcNormal = new Arme('ArcNormal', "loin", 25);

let joueur = new Joueur("Joueur", 15, 10, 100, epee, arcNormal);

let mutantPres = new Ennemi("Mutant", 8, 3, 50, "pres"); 
let mutantLoin = new Ennemi("Mutant", 12, 5, 80, "loin"); 

joueur.attaquerPres(mutantPres); 
joueur.attaquerLoin(mutantLoin, {x: 1, y: 0.5}, 10); // ex de direction et de vitesse du projectile
message.txt