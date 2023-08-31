import * as PIXI from 'pixi.js';
import PlayAgainButton from "./assets/play_button.png";
import Bunny from './assets/bunny1.webp'
import NewGameButton from "./assets/start-new-game-button.png";

export const textureBunny = PIXI.Texture.from(Bunny);

export const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

export function getButton(app, button, width, height, onClick) {
    const playButton = PIXI.Sprite.from(button);
    playButton.anchor.set(0.5);
    playButton.x = app.screen.width / 2;
    playButton.y = app.screen.height / 2 + 50;
    playButton.width = width
    playButton.height = height
    playButton.eventMode = 'static';
    playButton.cursor = 'pointer';
    playButton.on('pointerdown', onClick);

    return playButton
}

export function setBunny(app, onButtonOver, bunny, index) {
    bunny.cursor = 'hover';
    bunny.eventMode = 'static';
    bunny.anchor.set(0.5);
    bunny.width = 70
    bunny.height = 70
    bunny.x = Math.random()*(app.screen.width - 100) + 50
    bunny.y = 0 - (index ?? 0) * 50;
    bunny.on('pointerover', onButtonOver)
    app.stage.addChild(bunny);
}

export function setEndGame(app, scoreText, onClick) {
    const playAgainButton = getButton(app, PlayAgainButton, 50, 50, onClick)
    const newBestScore = localStorage.getItem('bestScore') ?? '0'
    const bestScoreText = new PIXI.Text(`Best score: ${newBestScore}`, style);

    const failBackground = PIXI.Sprite.from('https://pixijs.com/assets/bg_button.jpg');
    failBackground.width = app.screen.width;
    failBackground.height = app.screen.height;
    bestScoreText.anchor.set(0.5);
    bestScoreText.x = app.screen.width/2
    bestScoreText.y = app.screen.height/2 - 50

    scoreText.anchor.set(0.5);
    scoreText.x = app.screen.width/2
    scoreText.y = app.screen.height/2
    failBackground.addChild(scoreText);
    failBackground.addChild(bestScoreText);
    app.stage.addChild(failBackground);
    app.stage.addChild(playAgainButton);
}

export function initialize(onClick) {
    let app = new PIXI.Application({ width: 640, height: 360 });
    document.body.appendChild(app.view);
    const background = PIXI.Sprite.from('https://pixijs.com/assets/bg_button.jpg');
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    const playButton = getButton(app, NewGameButton, 250, 50, onClick)
    app.stage.addChild(playButton);
}
