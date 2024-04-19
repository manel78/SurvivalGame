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