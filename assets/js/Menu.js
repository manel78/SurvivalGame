// Class Menu
function drawClassMenu() {
    c.fillStyle = 'rgba(0, 0, 0, 0.5)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'white';
    c.font = '24px Arial';
    c.textAlign = 'center';
    c.fillText('Choisissez une classe :', canvas.width / 2, canvas.height / 2 - 50);

    c.fillStyle = 'blue';
    c.fillRect(canvas.width / 4-5, canvas.height / 2, 160, 50);
    c.fillStyle = 'white';
    c.fillText('Classe Melee', canvas.width / 4 + 75, canvas.height / 2 + 30);

    c.fillStyle = 'red';
    c.fillRect(canvas.width / 4 * 3 - 165, canvas.height / 2, 180, 50);
    c.fillStyle = 'white';
    c.fillText('Classe Shooter', canvas.width / 4 * 3 - 75, canvas.height / 2 + 30);
}

// Death Menu
function drawDeathMenu(){
    c.fillStyle = 'rgba(165,38,10)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'white';
    c.font = '100px Arial';
    c.textAlign = 'center';
    c.fillText('Tu as Perdu 😨', canvas.width / 2, canvas.height / 2 - 50);



    c.fillStyle = 'blue';
    c.fillRect(canvas.width / 2-90, canvas.height / 2, 180, 60);
    c.fillStyle = 'white';
    c.font = '40px Arial';
    c.fillText('Rejouer', canvas.width / 2, canvas.height / 2 + 43);

}