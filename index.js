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


ctx.fillStyle = "white";
ctx.fillRect(0,0, w, h);

class Sprite {
    constructor({position, map}){
        this.position = position
        this.map = map
    }
    draw(){
        ctx.drawImage(this.map, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -200,
        y: -630
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

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
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
    if (keys.w.pressed && lastKey === 'w') background.position.y = background.position.y += 3
    else if(keys.a.pressed && lastKey === 'a') background.position.x = background.position.x += 3
    else if(keys.d.pressed && lastKey === 'd') background.position.x = background.position.x -= 3
    else if(keys.s.pressed && lastKey === 's') background.position.y = background.position.y -= 3
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