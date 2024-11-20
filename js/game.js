let config = {
    type: Phaser.AUTO,
    width: 611,
    height: 980,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload : preload,     
        create: create,     
        update : update  
    }
};

let game = new Phaser.Game(config);

let blinkingStarImage;
let snowflakes;
let snowTimer;
let snowIconImage, ribbonIconImage, soundIconImage;
let christmasSong;
let merryChristmasText;
let ribbonTween;
let t = 0;

function preload() {
    this.load.image('background' , './assets/images/back_2.png');
    this.load.image('tree' , './assets/images/tree_2.png');
    this.load.image('purplebulb' , './assets/images/obj/obj_08.png');
    this.load.image('star' , './assets/images/obj/star.png');
    this.load.image('snowflake' , './assets/images/snowflake.png');
    this.load.image('ribbon' , './assets/images/ribbon.png');
    this.load.image('ribbonclear' , './assets/images/ribbonClear.png');
    this.load.image('snowIcon' , './assets/images/obj/obj_10.png');
    this.load.image('soundIcon' , './assets/images/obj/obj_02.png');
    this.load.image('ribbonIcon' , './assets/images/obj/obj_03.png');
    this.load.image('gift' , './assets/images/obj/obj_09.png');

    this.load.audio('christmasSong', './assets/audio/christmasMusic.mp3');
}

function create() {
    // dessiner le fond de l'écran
    let backgroundImage = this.add.image(0, 0, 'background');
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(0.5);

    //dessiner plein d'étoiles dans le ciel
    // for(let i=0; i<50; i++){
    //     let starImage = this.add.image(Phaser.Math.Between(20, 600), Phaser.Math.Between(20, 500), 'star');
    //     starImage.alpha = Phaser.Math.Between(30, 100)/100;
    //     starImage.setScale(Phaser.Math.Between(40, 100)/100);
    // }
    
    // dessiner le sapin
    let treeImage = this.add.image(config.width/2, config.height/2, 'tree');
    treeImage.setScale(0.5);

    // dessiner le ribbon et le ribbonclear
    let ribbonImage = this.add.image(config.width/2 - 15, 500, 'ribbon');
    ribbonImage.setScale(0.5);
    let ribbonClearImage = this.add.image(config.width/2 - 15, 500, 'ribbonclear');
    ribbonClearImage.setScale(0.5);
    ribbonClearImage.alpha = 0;

    // dessiner deux boules mauves
    let purpleBulbImage1 = this.add.image(400, 700, 'purplebulb');
    purpleBulbImage1.setScale(0.6);
    let purpleBulbImage2 = this.add.image(250, 480, 'purplebulb');
    purpleBulbImage2.setScale(0.5);

    // dessiner l'icone du flocon
    snowIconImage = this.add.image(550, 880, 'snowIcon').setInteractive();
    snowIconImage.setScale(0.5);
    snowIconImage.on('pointerdown', snowButtonDown);

    // dessiner l'icone du son
    soundIconImage = this.add.image(50, 880, 'soundIcon').setInteractive();
    soundIconImage.setScale(0.5);
    soundIconImage.on('pointerdown', soundButtonDown);
    soundIconImage.alpha = 0.3;

    // dessiner l'icone du ribbon
    ribbonIconImage = this.add.image(300, 880, 'ribbonIcon').setInteractive();
    ribbonIconImage.setScale(0.5);
    ribbonIconImage.on('pointerdown', ribbonButtonDown);

    // dessiner le cadeau
    giftImage = this.add.image(550, 770, 'gift').setInteractive();
    giftImage.setScale(0.9);
    giftImage.on('pointerdown', giftButtonDown);

    blinkingStarImage = this.add.image(200, 100, 'star');

    this.tweens.add({
        targets: blinkingStarImage,     // objet ciblé
        alpha: 0.2,                       // valeur à atteindre
        duration: 2000,                 // en mS
        ease: 'Power2',                 // fonction de easing
        yoyo: true,      
        loop: -1
        });

    ribbonTween = this.tweens.add({ 
        targets: ribbonClearImage,     // objet ciblé
        alpha: 1,                       // valeur à atteindre
        duration: 1000,                 // en mS
        ease: 'Power2',                 // fonction de easing
        yoyo: true,      
        loop: -1
        });

    snowflakes = this.physics.add.group({
        defaultKey: 'snowflake',
        maxSize: 50
        });

    snowTimer= this.time.addEvent({
        delay: 200, // ms
        callback: letItSnow,
        callbackScope: this,
        repeat: -1
        });

    christmasSong = this.sound.add('christmasSong');

    merryChristmasText = this.add.text(230, 80, 'Joyeux Noël', { fontFamily: 'Arial', fontSize: 24, color: '#ff0000' });
    merryChristmasText.alpha = 0;
}

function update() {
    // t += 0.03;
    // blinkingStarImage.alpha = Math.abs(Math.sin(t));

    let snowflakeList = snowflakes.getChildren();
    
    snowflakeList.forEach(
        function(snowflake) {
            if (snowflake.y>config.height) snowflake.destroy();
            }, this);
}


function letItSnow(){
    let snowflake = snowflakes.get();
    if (snowflake) {
        snowflake.setPosition(Phaser.Math.Between(0, 611), 0);
        snowflake.setVelocity(0, 100);
    }
}

function snowButtonDown() {
    snowTimer.paused = ! snowTimer.paused;
    if(snowTimer.paused) snowIconImage.alpha = 0.3;
    else snowIconImage.alpha = 1;
}

function soundButtonDown() {
    if(christmasSong.isPlaying) {
        christmasSong.pause();
        soundIconImage.alpha = 0.3;
    }
    else {
        christmasSong.play();   
        soundIconImage.alpha = 1;
    }
}

function ribbonButtonDown() {
    if (ribbonTween.isPlaying())
            {
                ribbonTween.pause();
                ribbonIconImage.alpha = 0.3;
            }
            else
            {
                ribbonTween.resume();
                ribbonIconImage.alpha = 1;
            }
}

function giftButtonDown() {
    merryChristmasText.alpha = 1;
}