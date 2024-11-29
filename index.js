const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const map = new Image();
map.src = "./images/little-town.png";
const player = new Image();
player.src = "./images/playerDown.png";
const w = canvas.width = 1024;
const h = canvas.height = 576;
let mapWidth = -200;
let mapHeight = -630;

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=54){
    collisionsMap.push(collisions.slice(i, 54 + i))
}

class Boundary{
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -295,
    y: -130
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1742)
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

class Sprite {
    constructor({position, velocity, map}){
        this.position = position
        this.map = map
    }
    
    draw() {
        ctx.drawImage(this.map, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
     map: map
})

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }

}

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})

const movables = [background, testBoundary]
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    //boundaries.forEach((boundary) =>{
    //    boundary.draw()
    //})
    testBoundary.draw()
    ctx.drawImage(
        player,
        0,
        0,
        player.width/6,
        player.height,
        w/2 - player.width/8, 
        h/2 + player.height,
        player.width/6,
        player.height
    )
    //if (player.position.x + player.width)
    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach((movable) => {
            movable.position.y +=3
        })
    }else if(keys.a.pressed && lastKey === 'a') {
        movables.forEach((movable) => {
            movable.position.x +=3
        })
    }else if(keys.d.pressed && lastKey === 'd') {
        movables.forEach((movable) => {
            movable.position.x -=3
        })
    }
    else if(keys.s.pressed && lastKey === 's') {
        movables.forEach((movable) => {
            movable.position.y -=3
        })
    }
}
animate()

let lastKey = ''

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
    }
})