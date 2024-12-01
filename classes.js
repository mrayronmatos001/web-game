class Sprite {
    constructor({position, velocity, image, frames = {max: 1} , sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    
    draw() {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width/ this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/ this.frames.max,
            this.image.height
        )
        if (!this.moving) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 15 === 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }

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
        ctx.fillStyle = 'rgba(255, 0, 0, 0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class lifeSprite {
    constructor({position, image, frames = {max: 1}, sprites}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.sprites = sprites
    }

    draw(i) {
        if (i === 0){
        ctx.drawImage(
            this.image,
            32, // Ponto de início no eixo x da imagem
            0, // Ponto de início no eixo y da imagem
            this.image.width/ this.frames.max, // Apenas 34 pixels de largura da imagem serão desenhados
            this.image.height, // Altura completa da imagem
            this.position.x,
            this.position.y,
            this.image.width/ this.frames.max, // Define 34 pixels como largura na tela
            this.image.height // Altura completa na tela
        )
    } else {
        ctx.drawImage(
            this.image,
            0,
            0, 
            32, 
            this.image.height,
            this.position.x,
            this.position.y,
            32,
            this.image.height
        )
    }
}
}