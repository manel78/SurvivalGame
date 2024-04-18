
const map1image = new Image()
map1image.src = 'assets/img/map/Island1.png'

const map2image = new Image()
map2image.src = 'assets/img/map/Island2.png'

const map3image = new Image()
map3image.src = 'assets/img/map/Island3.png'

const map4image = new Image()
map4image.src = 'assets/img/map/Island4.png'

const map5image = new Image()
map5image.src = 'assets/img/map/Island5.png'

const map6image = new Image()
map6image.src = 'assets/img/map/Island6.png'

const mapfinalimage = new Image()
mapfinalimage.src = 'assets/img/map/IslandFinal.png'

class Map {
    constructor(position, image){
        this.position = position;
        this.image = image;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}