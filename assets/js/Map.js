const map1image = new Image()
map1image.src = 'assets/img/map/Island1.png'

const foreground1 = new Image()
foreground1.src = 'assets/img/map/foreground1.png'

const map2image = new Image()
map2image.src = 'assets/img/map/Island2.png'

const foreground2 = new Image()
foreground2.src = 'assets/img/map/foreground2.png'

const map3image = new Image()
map3image.src = 'assets/img/map/Island3.png'

const foreground3 = new Image()
foreground3.src = 'assets/img/map/foreground3.png'

const map4image = new Image()
map4image.src = 'assets/img/map/Island4.png'

const foreground4 = new Image()
foreground4.src = 'assets/img/map/foreground4.png'

const map5image = new Image()
map5image.src = 'assets/img/map/Island5.png'

const foreground5 = new Image()
foreground5.src = 'assets/img/map/foreground5.png'

const map6image = new Image()
map6image.src = 'assets/img/map/Island6.png'

const foreground6 = new Image()
foreground6.src = 'assets/img/map/foreground6.png'

const mapfinalimage = new Image()
mapfinalimage.src = 'assets/img/map/IslandFinal.png'

const foregroundfinal = new Image()
foregroundfinal.src = 'assets/img/map/foreground7.png'


class Map {
  constructor(position, image, boundaries, startpos, endpos){
      this.position = position;
      this.image = image;
      this.boundaries = boundaries
      this.startpos = startpos
      this.endpos= endpos
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

const offset = {
  x: -785,
  y: -650
}

const maps = [
  new Map({ x: offset.x, y: offset.y }, map1image, getcollision(0),{ x: -offset.x, y: -1180}, -3249), // -3454.0764966054508 -1084.3271465194036
  new Map({ x: offset.x, y: offset.y }, map2image, getcollision(1),{ x: -offset.x, y: -920 }, -3249),
  new Map({ x: offset.x, y: offset.y }, map3image, getcollision(2),{ x: -offset.x, y: -785 }, -3249),
  new Map({ x: offset.x, y: offset.y }, map4image, getcollision(3),{ x: -offset.x, y: -1140 }, -3249),
  new Map({ x: offset.x, y: offset.y }, map5image, getcollision(4),{ x: -offset.x, y: -1080 }, -3249),
  new Map({ x: offset.x, y: offset.y }, map6image, getcollision(5),{ x: -offset.x, y: -840 }, -3249),
  new Map({ x: offset.x, y: offset.y }, mapfinalimage, getcollision(6),{ x: -offset.x, y: -980 }, -3249)
];
const foreground = [
  new Map({ x: offset.x, y: offset.y }, foreground1, getcollision(0)),
  new Map({ x: offset.x, y: offset.y }, foreground2, getcollision(0)),
  new Map({ x: offset.x, y: offset.y }, foreground3, getcollision(0)),
  new Map({ x: offset.x, y: offset.y }, foreground4, getcollision(0)),
  new Map({ x: offset.x, y: offset.y }, foreground5, getcollision(0)),
  new Map({ x: offset.x, y: offset.y }, foreground6, getcollision(0)),
  new Map({ x: offset.x, y: offset.y }, foregroundfinal, getcollision(0)),
]


function changemap(changingmap) {
  currentMap = maps[player.mapindex];
  currentfore = foreground[player.mapindex];
  next = currentMap.startpos;
  old = currentMap.position
  diff = {
      x: next.x - old.x,
      y: next.y - old.y
  }
  currentMap.position.x  += diff.x
  currentMap.position.y  += diff.y

  currentfore.position.x += diff.x
  currentfore.position.y += diff.y

  currentMap.boundaries.forEach(elements =>{
      elements.position.x += diff.x
      elements.position.y += diff.y
  })
  changingmap = false;

  return currentMap,currentfore,changingmap
}

function verificationmap(currentMap){
  if (currentMap.position.x < currentMap.endpos){
    console.log(currentMap.position.x , currentMap.endpos)
    return true
  }
  return false
}

function rectangleCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function playerMove(map,foreground) {
    const diagonalVelocity = player.velocity / Math.sqrt(2);
    const movables = [map, ...map.boundaries,foreground]
    
    let moving = true
    player.animate = false

    if (keys.d.pressed && ((player.position.x + 2 + player.width / 2) < canvas.width)) {
        if (keys.z.pressed || keys.s.pressed) {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x - player.velocity,
                    y: boundary.position.y 
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerRightImage
            movables.forEach((movable)=>{
              movable.position.x -= diagonalVelocity;
            })}

        } else {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x - player.velocity,
                    y: boundary.position.y 
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerRightImage
            movables.forEach((movable)=>{
              movable.position.x -= player.velocity;
            })}
        }

    }   
    if (keys.z.pressed && ((player.position.y - 2 - player.height / 2) > 0)) {
        if (keys.q.pressed || keys.d.pressed) {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + player.velocity
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerUpImage;
            movables.forEach((movable)=>{
              movable.position.y += diagonalVelocity;
            })}
          
        } else {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y + player.velocity
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerUpImage;
            movables.forEach((movable)=>{
              movable.position.y += player.velocity;
            })}
        }
    }
    if (keys.q.pressed && ((player.position.x - 2 - player.width / 2) > 0)) {
        if (keys.z.pressed || keys.s.pressed) {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x + player.velocity,
                    y: boundary.position.y 
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerLeftImage;
            movables.forEach((movable)=>{
              movable.position.x += diagonalVelocity;
            })}
          
        } else {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x + player.velocity,
                    y: boundary.position.y
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerLeftImage;
            movables.forEach((movable)=>{
              movable.position.x += player.velocity;
            })}
        }
    }
    if (keys.s.pressed && ((player.position.y + 2 + player.height / 2) < canvas.height)) {
        if (keys.q.pressed || keys.d.pressed) {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y - player.velocity
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerDownImage;
            movables.forEach((movable)=>{
              movable.position.y -= diagonalVelocity;
            })}
        } else {
          player.animate = true
          for (let i = 0; i < map.boundaries.length; i++) {
            const boundary = map.boundaries[i]
            if (
              rectangleCollision({
                rectangle1: player,
                rectangle2: {...boundary,
                  position: {
                    x: boundary.position.x,
                    y: boundary.position.y - player.velocity
                  }}
              })
            ) {
              moving = false
              break
            }
          }
          
          if (moving) {
            player.playerImage = playerDownImage;
            movables.forEach((movable)=>{
              movable.position.y -= player.velocity;
            })}
        }
    }
}

function getcollision(map){
  const collisionsMap = []
  if (map == 0) {
    for (let i = 0; i < Island1Collison.length; i += 90) {
      collisionsMap.push(Island1Collison.slice(i, 90 + i))
    }

  } else if (map == 1) {
    for (let i = 0; i < Island2Collison.length; i += 90) {
      collisionsMap.push(Island2Collison.slice(i, 90 + i))
    }

  } else if (map == 2) {
    for (let i = 0; i < Island3Collison.length; i += 90) {
      collisionsMap.push(Island3Collison.slice(i, 90 + i))
    }

  } else if (map == 3) {
    for (let i = 0; i < Island4Collison.length; i += 90) {
      collisionsMap.push(Island4Collison.slice(i, 90 + i))
    }

  } else if (map == 4) {
    for (let i = 0; i < Island5Collison.length; i += 90) {
      collisionsMap.push(Island5Collison.slice(i, 90 + i))
    }

  } else if (map == 5) {
    for (let i = 0; i < Island6Collison.length; i += 90) {
      collisionsMap.push(Island6Collison.slice(i, 90 + i))
    }

  } else if (map == 6) {
    for (let i = 0; i < IslandFinalCollison.length; i += 90) {
      collisionsMap.push(IslandFinalCollison.slice(i, 90 + i))
    }

  } 
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
    return boundaries
}
