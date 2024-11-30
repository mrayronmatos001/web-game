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

player.onload = () => {
    ctx.drawImage(map, mapWidth,  mapHeight);
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
    );
}