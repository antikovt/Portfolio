let soul;
let soulX = 200;
let soulY = 150;

let shield1X = 0;
let shield1Y = 0;
let shield2X = 0;
let shield2Y = 0;

let arrow1X = -30;
let arrow1Y = -30;
let arrow2X = -30;
let arrow2Y = -30;
let arrowSpeed = 10;

let positions = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

let video;
let poseNet;
let myPoses;

let vidWidth = 800;
let vidHeight = 600;

let handLx = 0;
let handLy = 0;
let handRx = 0;
let handRy = 0;
let shderLx = 0;
let shderLy = 0;
let shderRx = 0;
let shderRy = 0;

let mainFont;
let logoFontB;
let logoFontC;
let logoFontF;

let score = 0;
let curScore = 0;
let lives = 5;

let stage = 0;

function preload() {
  soundFormats('ogg');
  menuSong = loadSound('assets_undyne/Start_Menu_music.ogg')
  song = loadSound('assets_undyne/Spear_of_Justice_music.ogg');
  menuSong.playMode('untilDone');
  song.playMode('untilDone');
  mainFont = loadFont('assets_undyne/DTM-Sans.otf');
  logoFontB = loadFont('assets_undyne/MonsterFriend2Back.otf');
  logoFontC = loadFont('assets_undyne/MonsterFriend2Center.otf');
  logoFontF = loadFont('assets_undyne/MonsterFriend2Fore.otf');

  soul = loadImage('assets_undyne/green_soul.png');

  let constraints = {
    video: {
      mandatory: {
        minWidth: vidWidth,
        maxWidth: vidWidth,
        minHeight: vidHeight,
        maxHeight: vidHeight
      },
    },
    audio: false
  };

  video = createCapture(constraints);
  video.hide();
}

function setup() {
  createCanvas(1000, 750);

  poseNet = ml5.poseNet(video, 'single', modelReady);
  poseNet.inputResolution = 321;
  poseNet.on("pose", gotPoses);
}

function modelReady() {

}

function gotPoses(poses) {
  myPoses = poses;
}

function preStart() {
  r = 35;
  x = width/2;
  y = height/2;
  fill(255);
  strokeJoin(ROUND);
  strokeWeight(7);
  stroke(255);
  triangle(r*cos(0) + x, r*sin(0) + y, r*cos(1/3*2*PI) + x, r*sin(1/3*2*PI) + y, r*cos(2/3*2*PI) + x, r*sin(2/3*2*PI) + y);
  if (mouseIsPressed) {
    stage = 1;
  }
}

function startScreen() {
  textAlign(CENTER, CENTER);

  x = width/2;
  y = height/2 - 100;
  title = 'ar unDyne simulator'

  fill(255, 255/2);
  textFont(logoFontB);
  textSize(45);
  text(title, x, y);

  fill('#00FF1B');
  textFont(logoFontC);
  text(title, x, y);

  fill(255);
  textFont(logoFontF);
  text(title, x, y);

  textFont(mainFont);
  textSize(35);
  text('Made by Anton Kovtoniuk', x, y+70);
  textSize(20);
  text('2023', x, y+125);

  textSize(35);
  textAlign(LEFT, TOP);
  text('SCORE: ' + score, 25, 70);
  textSize(20);
  fill(255, 255/2);
  text('Resourses used:\np5.js\nml5.js\nMonsterFriend2 Font\nDetermination Sans Font\noneko.js script', 25, y+300);
  textAlign(CENTER, CENTER);
  text('Press [x] to play', x, y+200);

  //rect(width/2-21, height/2+92, 25);

}

function keyTyped() {
  if ((key === 'x' || key === 'ч') && stage === 1) {
    menuSong.stop();
    stage = 2;
    song.loop();
  }
}

function mouseClicked() {
  if (stage === 1 &&
      mouseX > width/2-21 &&
      mouseX < width/2+4 &&
      mouseY > height/2+92 &&
      mouseY < height/2+117
      ) {
        menuSong.stop();
        stage = 2;
        song.loop();
      }
}

function draw() {
  background(0);

  switch (stage) {
    case 0:
      preStart();
      break;

    case 1:
      menuSong.loop();
      noStroke();
      strokeJoin(MITER);
      startScreen();
      break;

    case 2:

      translate(900, 75);
      scale(-1, 1);
      image(video, 0, 0);

      for (let i = 0; i < lives; i++) {
        image(soul, -70 + 50*i, -50, 20, 20);
      }

      noFill();
      rect(0, 0, 800, 600);

      if (video.loadedmetadata && myPoses !== undefined && myPoses.length !== 0) {
        shderLx = myPoses[0].pose.keypoints[5].position.x;
        shderLy = myPoses[0].pose.keypoints[5].position.y;
        shderRx = myPoses[0].pose.keypoints[6].position.x;
        shderRy = myPoses[0].pose.keypoints[6].position.y;
        handLx = myPoses[0].pose.keypoints[9].position.x;
        handLy = myPoses[0].pose.keypoints[9].position.y;
        handRx = myPoses[0].pose.keypoints[10].position.x;
        handRy = myPoses[0].pose.keypoints[10].position.y;
      }

      soulX = shderLx + (shderRx - shderLx)/2;
      soulY = min(shderLy, shderRy) + (max(shderLy, shderRy) - min(shderLy, shderRy))/2;

      const diffX = arrow1X - soulX;
      const diffY = arrow1Y - soulY;
      const distance = dist(arrow1X, arrow1Y, soulX, soulY);

      arrow1X -= (diffX / distance) * arrowSpeed;
      arrow1Y -= (diffY / distance) * arrowSpeed;

      /* 
        thanks oneko.js by Tatsuya Kato for the point following script,
        I couldn't figure it out myself. Copied from 
        https://www.cssscript.com/cat-follow-cursor-oneko/

        oneko.js is public domain.
      */
    
      positions.push([arrow1X, arrow1Y]);
      positions.shift();

      arrow2X = positions[5][0];
      arrow2Y = positions[5][1];

      shield1X = handLx;
      shield1Y = handLy;
      shield2X = handRx;
      shield2Y = handRy;

      line(shield1X, shield1Y, shield2X, shield2Y);

      const shieldLen = dist(shield1X, shield1Y, shield2X, shield2Y);
      const dist1 = dist(arrow1X, arrow1Y, shield1X, shield1Y);
      const dist2 = dist(arrow1X, arrow1Y, shield2X, shield2Y);

      //console.log(positions);


      // circle(-100, -75, 50);
      // circle(vidWidth+100, -75, 50);
      // circle(vidWidth+100, vidHeight+75, 50);
      // circle(-100, vidHeight+75, 50);

      if (distance <= 5) {
        lives -= 1;
        resetArrow();
      }

      if (dist1 + dist2 <= shieldLen + 1 && dist1 + dist2 >= shieldLen - 1) {
        curScore += 1;
        resetArrow();
      }

      if (lives == 0) {
        if (curScore > score) {
          score = curScore;
        }
        lives = 5;
        curScore = 0;
        song.stop();
        stage = 1;
      }

      stroke(0);
      strokeWeight(12);
      line(arrow1X, arrow1Y, arrow2X, arrow2Y);
      stroke(255);
      strokeWeight(10);
      line(arrow1X, arrow1Y, arrow2X, arrow2Y);
      image(soul, soulX - 10, soulY - 10, 20, 20);
      break;

  }
}

function resetArrow() {
  side = random([0, 1, 2, 3]);
  if (side == 0) {
    y = -75;
    x = random(-100, vidWidth + 100);
  } else if (side == 1) {
    x = vidWidth + 100;
    y = random(-75, vidHeight + 75);
  } else if (side == 2) {
    y = vidHeight + 75;
    x = random(-100, vidWidth + 100);
  } else if (side == 3) {
    x = -100;
    y = random(-75, vidHeight + 75);
  }

  arrow1X = x;
  arrow1Y = y;
  arrow2X = x;
  arrow2Y = y;
  positions = [[x, y], [x, y], [x, y], [x, y], [x, y], [x, y], [x, y], [x, y], [x, y], [x, y]];
}