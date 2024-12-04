const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

audio.Map.play()

const image = new Image();
image.src = "./images/little-town.png";
const playerDownImage = new Image();
playerDownImage.src = "./images/playerDown.png";
const playerUpImage = new Image();
playerUpImage.src = "./images/playerUp.png";
const playerLeftImage = new Image();
playerLeftImage.src = "./images/playerLeft.png";
const playerRightImage = new Image();
playerRightImage.src = "./images/playerRight.png";
const foregroundImage = new Image();
foregroundImage.src = "./images/foregroundObjects.png";
const lifeImage = new Image();
lifeImage.src = "./images/life.png";
const animalsImage = new Image();
animalsImage.src = "./images/animals.png";
const playerLeftAttackImage = new Image();
playerLeftAttackImage.src = "./images/playerAtkLeft.png";
const playerRightAttackImage = new Image();
playerRightAttackImage.src = "./images/playerAtkRight.png";
const playerUpAttackImage = new Image();
playerUpAttackImage.src = "./images/playerAtkUp.png";
const playerDownAttackImage = new Image();
playerDownAttackImage.src = "./images/playerAtkDown.png";
const npc1Image = new Image();
npc1Image.src = "./images/npc1.png";
const npc2Image = new Image();
npc2Image.src = "./images/npc2.png";
const npc3Image = new Image();
npc3Image.src = "./images/npc3.png";
const dialogBox = document.querySelector(".dialog");
const head = document.querySelector(".content img");
const text = document.querySelector(".content p");
const enter = document.querySelector(".content strong");
let isNPC = false;
let index = 0;
let counter = 0;
const monsterImage = new Image();
monsterImage.src = "./images/monster.png";
canvas.width = 1024;
canvas.height = 576;
let i = 0, j = 0, k = 0, contador = 0;
let marcadorA = false, marcadorS = true, marcadorD = false, marcadorW = false;
let marcador1, marcador2, marcador3;
let ultimaExecucao = 0;

const collisionsMap = []
for (let i = 0; i < collisions.length; i+=54){
    collisionsMap.push(collisions.slice(i, 54 + i))
}

const boundaries = []
const offset = {
    x: -295,
    y: -150
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

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const monster = new monsterSprite({
    position :{
        x: canvas.width - 500,
        y: canvas.height + 200
    },
    image: monsterImage,
    frames: {
        max: 4
    },
    colision : { //Para definir a posicao do dano
        x: range(-355, -306),
        y: range(-626, -550)
    }
})

const attackLeft = new attackSprite({
    position: {
        x: canvas.width / 2 - 156 / 8,  // Ajuste da posição X
        y: canvas.height / 2 + 46      // Posição Y
    },
    image: playerLeftAttackImage,      // Imagem do sprite
    frames: { max: 4 }                 // Número máximo de frames
});

const attackUp = new attackSprite({
    position: {
        x: canvas.width / 2 - 156 / 8,  // Ajuste da posição X
        y: canvas.height / 2 + 46      // Posição Y
    },
    image: playerUpAttackImage,      // Imagem do sprite
    frames: { max: 4 }                 // Número máximo de frames
});

const attackDown = new attackSprite({
    position: {
        x: canvas.width / 2 - 156 / 8,  // Ajuste da posição X
        y: canvas.height / 2 + 46      // Posição Y
    },
    image: playerDownAttackImage,      // Imagem do sprite
    frames: { max: 4 }                 // Número máximo de frames
});

const attackRight = new attackSprite({
    position: {
        x: canvas.width / 2 - 156 / 8,  // Ajuste da posição X
        y: canvas.height / 2 + 46      // Posição Y
    },
    image: playerRightAttackImage,      // Imagem do sprite
    frames: { max: 4 }                 // Número máximo de frames
});

const life1 = new lifeSprite({
    position :{
        x: canvas.width - 1000,
        y: canvas.height - 550
    },
    image: lifeImage,
    frames: {
        max: 2
    }
})

const life2 = new lifeSprite({
    position :{
        x: canvas.width - 960,
        y: canvas.height - 550
    },
    image: lifeImage,
    frames: {
        max: 2
    }
})

const life3 = new lifeSprite({
    position :{
        x: canvas.width - 920,
        y: canvas.height - 550
    },
    image: lifeImage,
    frames: {
        max: 2
    }  
})

const chicken = new Animal({
    position: { x: -50, y: 350 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const chicken1 = new Animal({
    position: { x: 20, y: 385 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width:  64, height: 96 }
});

const chicken2 = new Animal({
    position: { x: -40, y: 410 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const pig = new Animal({
    position: { x: 700, y: 210 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 } 
});

const pig1 = new Animal({
    position: { x: 750, y: 158 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const cow = new Animal({
    position: { x: -190, y: 580 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});

const cow1 = new Animal({
    position: { x: -100, y: 550 },
    image: animalsImage,
    frames: { max: 2 },
    size: { width: 64, height: 96 }
});
const npc1 = new Sprite({
    position : { 
        x: 100,
        y: 480
    },
    image: npc1Image,
    frames: { max: 4 }
});
npc1.moving = true;
const npc2 = new Sprite({
    position : {
        x: 760,
        y: 800
    },
    image: npc2Image,
    frames: { max: 4 }
});
npc2.moving = true;
const npc3 = new Sprite({
    position: {
        x: 1810,
        y: 750
    },
    image: npc3Image,
    frames: { max: 4 }
});
npc3.moving = true;
const player = new Sprite({
    position :{
        x: canvas.width/2 - 156/8,
        y: canvas.height/2 + 46
    },
    image: playerDownImage,
    frames: {
        max: 6
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
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
    },
    space: {
        pressed: false
    },
    q: {
        pressed: false
    }

}

const movables = [background, ...boundaries, foreground, chicken, chicken1, chicken2, pig, pig1, cow, cow1, npc1, npc2, npc3, monster]

const npcs = [npc1, npc2, npc3];
function rectangularCollision ({rectangle1, rectangle2}){
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) =>{
        boundary.draw()
   
    })

    if (keys.space.pressed && marcadorA == true){
        attackLeft.draw()
    }else if (keys.space.pressed && marcadorW == true){
        attackUp.draw()    
    }else if (keys.space.pressed && marcadorS == true){
        attackDown.draw()    
    }else if (keys.space.pressed && marcadorD == true){
        attackRight.draw()    
    }else{
        player.draw()
    }
    foreground.draw()
    monster.draw()
    chicken.draw(0, 25)
    chicken1.draw(0, 35)
    chicken2.draw(0, 30)
    pig.draw(32, 30)
    pig1.draw(32, 35)
    cow.draw(64, 30)
    cow1.draw(64, 35)
    life1.draw(marcador1)
    life2.draw(marcador2)
    life3.draw(marcador3)
    npc1.draw();   
    npc2.draw();
    npc3.draw();

    let moving = true
    player.moving = false

    if (keys.w.pressed && lastKey === 'w') {
        marcadorA = false;
        marcadorS = false;
        marcadorD = false;
        marcadorW = true;
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 2
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        for (let i = 0; i < npcs.length; i++) {
            const npc = npcs[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...npc, position: {
                        x: npc.position.x,
                        y: npc.position.y + 2
                    }}
                }) 
            ) {
                isNPC = true;
                index = i;
                break;
            } else {
                isNPC = false;
            }
        }
        if (!isNPC) {
            dialogBox.style.visibility = "hidden";
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y +=2
            });
        }
    }else if(keys.a.pressed && lastKey === 'a') {
        marcadorA = true;
        marcadorS = false;
        marcadorD = false;
        marcadorW = false;
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x + 2,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        for (let i = 0; i < npcs.length; i++) {
            const npc = npcs[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...npc, position: {
                        x: npc.position.x + 2,
                        y: npc.position.y 
                    }}
                }) 
            ) {
                isNPC = true;
                index = i;
                break;
            } else {
                isNPC = false;
            }
        }
        if (!isNPC) {
            dialogBox.style.visibility = "hidden";
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x +=2
        })
    }else if(keys.d.pressed && lastKey === 'd') {
        marcadorA = false;
        marcadorS = false;
        marcadorD = true;
        marcadorW = false;
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x - 2,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        for (let i = 0; i < npcs.length; i++) {
            const npc = npcs[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...npc, position: {
                        x: npc.position.x - 2,
                        y: npc.position.y
                    }}
                }) 
            ) {
                isNPC = true;
                index = i;
                break;
            } else {
                isNPC = false;
            }
        }
        if (!isNPC) {
            dialogBox.style.visibility = "hidden";
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x -=2
        })
    }
    else if(keys.s.pressed && lastKey === 's') {
        marcadorA = false;
        marcadorS = true;
        marcadorD = false;
        marcadorW = false;
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 2
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        for (let i = 0; i < npcs.length; i++) {
            const npc = npcs[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...npc, position: {
                        x: npc.position.x,
                        y: npc.position.y - 2
                    }}
                }) 
            ) {
                isNPC = true;
                index = i;
                break;
            } else {
                isNPC = false;
            }
        }
        if (!isNPC) {
            dialogBox.style.visibility = "hidden";
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y -=2
        })

    }
    if (Date.now() - ultimaExecucao >= 200) {  //Logica perder corações
        if ((monster.colision.x.includes(background.position.x)) && (monster.colision.y.includes(background.position.y))){ //Para definir posicao do dano
            console.log ("Dano")
            contador++
            console.log (contador)
            if (contador == 1){
                marcador3 = true
            }else if (contador == 2){
                marcador2 = true
            }else if (contador == 3){
                marcador1 = true
                console.log("Game Over")
            }
        }
    ultimaExecucao = Date.now();
    }
}
animate()

let lastKey = ''

let dialogs = {
    npc1: [
        "Olá, como anda essa cidade?",
        "Estamos em guerra, monstros estão saqueando nossa cidade, por favor nos ajude!",
        "Deixa comigo!"
    ],
    npc2: [
        "Oi, o senhor é bem alto em? De qualquer forma preciso me apressar descobri que monstros assombram essa cidade",
        "Haha, é porque comi bastante quando era pequeno. Sim, nos salve dessa tormenta, esses monstros são cruéis",
        "Agora eles vão ver o que é bom para tosse!"
    ],
    npc3: [
        "Minha senhora, o que faz por aqui? aqui é perigoso, de qualquer forma não se preocupe, pois irei salvar o dia",
        "Monstros destruíram minha casa que fica ali em cima, por favor me vingue",
        "Não se preocupe, irei ajudar a construir uma nova casa para você!"
    ]
}

function displayDialog(index, counter, dialogs) {
    text.innerText = dialogs[`npc${index+1}`][counter];
}

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            console.log(e.key);
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            console.log(e.key);
            break;
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            console.log(e.key);
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
        case ' ':
            keys.space.pressed = true
            lastKey = ' '
            break;
        case 'Enter': 
            counter++;
            head.src = counter === 1 ? `./images/headnpc${index+1}.png`: "./images/headplayer.png";
            if (counter === 2) {
                enter.innerText = "";
            }
            
            if (isNPC && dialogBox.style.visibility === 'visible' && counter < 3) {
                displayDialog(index, counter, dialogs);
            }
            break;
        case 'q':
            if (isNPC) {
                counter = 0;
                enter.innerText = "[ENTER]";
                dialogBox.style.visibility = "visible";
                displayDialog(index, 0, dialogs);
            }
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
        case ' ':
            keys.space.pressed = false
            break;
    }
})


let clicked = false
addEventListener('click', () => {
    if(!clicked){
        audio.Map.play()
        clicked = true
    }
})