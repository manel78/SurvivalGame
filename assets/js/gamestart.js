const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = window.innerWidth-(window.innerWidth/4);
canvas.height = window.innerHeight-(window.innerHeight/8);

const scaledCanvas = {
    width: canvas.width / 1,
    height: canvas.height / 1,
};


// Fonction pour dessiner en fonction de la classe choisie
function drawCharacter(selectedClass) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (selectedClass === "melee") {
        // Dessiner un personnage de mêlée
        ctx.fillStyle = "blue";
        ctx.fillRect(50, 50, 100, 100); // Exemple simple
    } else if (selectedClass === "shooter") {
        // Dessiner un personnage de tir
        ctx.fillStyle = "red";
        ctx.fillRect(200, 50, 100, 100); // Exemple simple
    }
}

// Sélection de la classe
var selectedClass = prompt("Choisissez une classe : melee ou shooter").toLowerCase();

// Vérification de la classe choisie
if (selectedClass === "melee" || selectedClass === "shooter") {
    // Si une classe valide est choisie, dessiner le personnage correspondant
    drawCharacter(selectedClass);
} else {
    // Si une classe invalide est choisie, afficher un message d'erreur
    alert("Classe invalide. Veuillez choisir entre 'melee' et 'shooter'.");
}