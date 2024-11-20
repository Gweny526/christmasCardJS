let config = {
    type: Phaser.AUTO,
    width: 611,
    height: 914,
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
 
// variables globales
 
let t = 0;
let starImage;
let snowflakes;
let snowIcon;
let snowTimer;
let soundIcon;
let ribbonIcon;
let christmasSound;
let ribbonTween;
let giftIcon;
let merryChristmasText;

function preload() {
 
    //bg
    this.load.image("background", "./assets/images/back_2.png");

    //couronne du sapin
    this.load.image("couronne", "./assets/images/obj/obj_01.png");
    // sapin
    this.load.image("sapin", "./assets/images/tree_2.png");

    //boules
    this.load.image("boule1", "./assets/images/obj/obj_21.png");//jaune
    this.load.image("boule2", "./assets/images/obj/obj_08.png");//mauve
    this.load.image("boule3", "./assets/images/obj/obj_23.png");//vert
    this.load.image("boule4", "./assets/images/obj/obj_28.png");//serpentin
    
    //star
    this.load.image("star", "./assets/images/obj/star.png");
    //snowflakes
    this.load.image("snowflake", "./assets/images/snowflake.png");
    //ribbon
    this.load.image("ribbon1", "./assets/images/ribbon.png");
    this.load.image("ribbon2", "./assets/images/ribbonClear.png")
    //icon : snow, sound, ribbon, gift
    this.load.image("snowIcon", "./assets/images/obj/obj_10.png")
    this.load.image("soundIcon", "./assets/images/obj/obj_02.png")
    this.load.image("ribbonIcon", "./assets/images/obj/obj_03.png")
    this.load.image("giftIcon", "./assets/images/obj/obj_09.png")


    //son
    this.load.audio("christmasSound", "./assets/audio/christmasMusic.mp3")
   
}
 
function create() {
 
    // dessiner le fond
 
    let backgroundImage = this.add.image(0, 0, "background").setOrigin(0,0);
    backgroundImage.setScale(0.5);
 
    
    // dessiner le sapin
    
    let sapinImage = this.add.image(305.5, 462, "sapin");
    sapinImage.setScale(0.51);
    
    //couronne
    let couronneImage = this.add.image(295,110, "couronne");
    couronneImage.setScale(0.5);
    // mettre des boules
        
    let boule1Image = this.add.image(300,450, "boule1");
    boule1Image.setScale(0.38);
        
    let boule2Image = this.add.image(250,260, "boule2");
    boule2Image.setScale(0.30);
       
    let boule3Image = this.add.image(300,750, "boule3");
    boule3Image.setScale(0.48);
        
    let boule4Image = this.add.image(370,730, "boule4");
    boule4Image.setScale(0.48);
       
    let boule5Image = this.add.image(270,600, "boule1");
    boule5Image.setScale(0.46);
        
    let boule6Image = this.add.image(380,570, "boule2");
    boule6Image.setScale(0.42);
       
    let boule7Image = this.add.image(450,640, "boule3");
    boule7Image.setScale(0.43);
        
    let boule8Image = this.add.image(240,360, "boule4");
    boule8Image.setScale(0.36);

    let boule9Image = this.add.image(180,660, "boule4");
    boule9Image.setScale(0.46);


        
    //ribbon
    let ribbon1 = this.add.image(config.width/2-25, 500, "ribbon1") //config.width/2 la taille de l'écran /2 donc le milieu puis -20pixel
    ribbon1.setScale(0.55);
        
    //ribbon 2
    let ribbon2 = this.add.image(config.width/2-25, 500, "ribbon2")
    ribbon2.setScale(0.55);
    ribbon2.alpha = 0;

    ribbonTween = this.tweens.add({
            targets: ribbon2,
            alpha: 1,
            duration: 1000,
            ease: "Power2",
            yoyo: true,
            loop: -1
    })
    // ajouter une étoile
     
     
    starImage = this.add.image(100, 120, 'star');
    starImage.setScale(0.5);
    starImage.alpha=0;
     
    this.tweens.add({
            targets: starImage,
            alpha: 1, // Variation de l'opacité
            duration: 2000, // Durée de l'animation
            ease: 'Power2', // fonction de easing
            yoyo: true, // Revenir à l'état initial
            loop: -1 // Répéter à l'infini
    })
            
    // créer un groupe de snowflakes
        
    snowflakes = this.physics.add.group({
        defaultKey: "snowflake",
        maxSize: 50 // le nombre de flocons
    });
 
    //timer qui fait neiger
    snowTimer = this.time.addEvent({
        delay: 200, // ms
        callback: letItsnow,
        callbackScope: this,
        repeat: -1 //quand on met -1 ça veut dire à l'infini 
    });
           
    //image de l'icone du flocon
    snowIcon = this.add.image(550,850, "snowIcon").setInteractive();
    snowIcon.setScale(0.5);
    snowIcon.on("pointerdown", snowButtonDown);
           
    //dessiner l'icone du son 
    soundIcon = this.add.image(50, 850, "soundIcon").setInteractive();
    soundIcon.setScale(0.5);
    soundIcon.on("pointerdown", soundButtonDown);
    soundIcon.alpha = 0.3;

    //dessiner l'icone du ribbon
    //dessiner l'icone du son 
    ribbonIcon = this.add.image(300, 850, "ribbonIcon").setInteractive();
    ribbonIcon.setScale(0.5);
    ribbonIcon.on("pointerdown", ribbonButtonDown);

    //son
    christmasSound = this.sound.add("christmasSound");

    //dessiner le cadeau 
    giftIcon = this.add.image(400, 800, "giftIcon").setInteractive();
    giftIcon.setScale(0.7);
    giftIcon.on("pointerdown", giftButtonDown);
    giftIcon.alpha = 0.3;

    //texte
    merryChristmasText = this.add.text(210, 50, "Noyeux, Joël", {fontfamilly: "Comic Sans", fontSize: 24, fontWeight: "bold", color: "#ffffff"})
    merryChristmasText.alpha = 0;
       
 
}
 
function update() {
 
    snowflakes.getChildren().forEach(
        function(snowflake) {
            if (snowflake.y>config.height) snowflake.destroy();
        }, this);
 
}
function letItsnow(){
    let snowflake = snowflakes.get();
    if (snowflake) {
        snowflake.setPosition(Phaser.Math.Between(0, 611), 0);
        snowflake.setVelocity(0, 100)
    }
}

function snowButtonDown()
{
    snowTimer.paused = !snowTimer.paused; //toggle simple si il est pas vrai alors il est faux et donc il va le faire tout seul
    if(snowTimer.paused)snowIcon.alpha = 0.3;
    else snowIcon.alpha = 1;
}
function soundButtonDown()
{
    if(christmasSound.isPlaying){
        christmasSound.pause();
        soundIcon.alpha = 0.3;
    }    
    else {
        christmasSound.play();
        soundIcon.alpha = 1;
    }
}
function ribbonButtonDown()
{
    if (ribbonTween.isPlaying()){
        ribbonTween.pause();
        ribbonIcon.alpha = 0.3
    }
    else{
        ribbonTween.resume();
        ribbonIcon.alpha = 1;
    }
}

function giftButtonDown(){

        merryChristmasText.alpha = 1;
}

    