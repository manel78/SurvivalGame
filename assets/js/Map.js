
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



const offset = {
  x: -785,
  y: -650
}

class Map {
    constructor(position, image){
        this.position = position;
        this.image = image;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
      this.position = position
      this.width = 48
      this.height = 48
    }
  
    draw() {
      c.fillStyle = 'rgba(255, 0, 0, 0.3)'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

function getcollision(){
      
  const collisionsMap = []
  if (player.mapindex == 0) {
    for (let i = 0; i < Island1Collison.length; i += 90) {
      collisionsMap.push(Island1Collison.slice(i, 90 + i))
    }

  } else if (player.mapindex == 1) {
    for (let i = 0; i < Island2Collison.length; i += 90) {
      collisionsMap.push(Island2Collison.slice(i, 90 + i))
    }

  } else if (player.mapindex == 2) {
    for (let i = 0; i < Island3Collison.length; i += 90) {
      collisionsMap.push(Island3Collison.slice(i, 90 + i))
    }

  } else if (player.mapindex == 3) {
    for (let i = 0; i < Island4Collison.length; i += 90) {
      collisionsMap.push(Island4Collison.slice(i, 90 + i))
    }

  } else if (player.mapindex == 4) {
    for (let i = 0; i < Island5Collison.length; i += 90) {
      collisionsMap.push(Island5Collison.slice(i, 90 + i))
    }

  } else if (player.mapindex == 5) {
    for (let i = 0; i < Island6Collison.length; i += 90) {
      collisionsMap.push(Island6Collison.slice(i, 90 + i))
    }

  } else if (player.mapindex == 6) {
    for (let i = 0; i < IslandFinalCollison.length; i += 90) {
      collisionsMap.push(IslandFinalCollison.slice(i, 90 + i))
    }

  } 
  console.log(collisionsMap)
  const boundaries = []

  collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol != 0)
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
              }
            })
          )
      })
    })

    console.log(boundaries)
    return boundaries
}


// for (let i = 0; i < Island1Collison.length; i += 90) {
//   collisionsMap.push(Island1Collison.slice(i, 90 + i))
// }

