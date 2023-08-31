import * as PIXI from 'pixi.js';
import { style, setBunny, setEndGame, textureBunny, initialize } from './extra'
function onClick() {
    document.body.removeChild(document.getElementsByTagName('canvas')[0])
    startGame()
}

initialize(onClick)

let startGame = () => {
    let score = 0
    const bunnies = []

    let app = new PIXI.Application({ background: '#1099bb', width: 640, height: 360 });
    document.body.appendChild(app.view);
    // Add custom cursor styles
    app.renderer.events.cursorStyles.default = `url(\'https://pixijs.com/assets/bunny.png\'),auto`;

    const scoreText = new PIXI.Text(`Score: ${score}`, style);
    app.stage.addChild(scoreText);

    const bunny = new PIXI.Sprite(textureBunny);
    bunnies.push(bunny)
    bunnies.forEach((bunny, index) => {
        setBunny(app, onButtonOver, bunny, index)
    })

    function onButtonOver() {
        this.isOver = true;
        this.texture = null
        score++
        const bestScore = localStorage.getItem('bestScore')
        if (score > parseInt(bestScore ?? 0)) {
            localStorage.setItem('bestScore', score.toString())
        }
        scoreText.text = `Score: ${score}`

        this.texture = textureBunny
        this.y = 0
        this.x = Math.random()*(app.screen.width - 100) + 50

        if (score && score % 10 === 0) {
            const newBunny = new PIXI.Sprite(textureBunny);
            bunnies.push(newBunny)
            setBunny(app, onButtonOver, newBunny)
        }
    }

    app.ticker.add((delta) =>
    {
        if (bunnies.some(bunny => bunny.y >= app.screen.height)) {
            bunnies.forEach(bunny => {
                bunny.eventMode = 'none';
                bunny.texture = null
            })
            app.renderer.events.cursorStyles.default = 'default'
            scoreText.text = `Your score: ${score}`
            setEndGame(app, scoreText, onClick)
        } else {
            bunnies.forEach(bunny => {
                bunny.y += (1 + score/100) * delta;
            })
        }
    });
}
