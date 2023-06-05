let w;
let h;
let s_ang;
let m_ang;
let h_ang;
let md = 15;

let bubble;

let bubbles = [];

let maxOnScreen;

function preload() {
    bubble = loadImage("assets_bubbles/CITYPNG_COMBubble_Blue_Circle_HD_Transparent_Background_1199x1199-trimmy.png");
}

function setup() {
    w = window.innerWidth;
    h = window.innerHeight;

    createCanvas(w, h);
    textStyle(NORMAL)

    bubbles = [{
        x: w/2,
        y: 400,
        d: 400
    }, {
        x: 200, 
        y: 500, 
        d: 150
    }, {
        x: w-150,
        y: 650,
        d: 100
    }, {
        x: random(210, w-210),
        y: random(300, h-210),
        d: random(75, 350)
    }, {
        x: random(210, w-210),
        y: random(300, h-210),
        d: random(75, 350)
    }];

    // The first maxOnScreen bubbles will loop through the screen,
    // the rest will disappear when above the screen
    maxOnScreen = bubbles.length;
}

function draw() {
    background(200, 225, 255);
    textAlign(CENTER, CENTER);

    s_ang = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    m_ang = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    h_ang = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    for (let i=0; i<bubbles.length; i++) {
        ix = bubbles[i].x;
        iy = bubbles[i].y;
        id = bubbles[i].d;
        iV = (4/3)*PI*(id/2)^3;
        iSpeed = 200/iV;
        // Yes, I am actually calculating the speed in relation to volume
        // Yes, I am going a little bit overboard

        createClock(ix, iy, id, s_ang, m_ang, h_ang);

        bubbles[i].y -= iSpeed;

        // Collision with the left and right borders
        if (ix+id/2 > width) {
            bubbles[i].x -= ix+id/2-width;
        } else if (ix-id/2 < 0) {
            bubbles[i].x -= ix-id/2;
        }

        // Loops or deletes the bubbles depending on maxOnScreen
        if (iy < -id/2) {
            if (i < maxOnScreen) {
                bubbles[i].y = height + id/2
            } else {
                bubbles.splice(i, 1);
            }
        }

        // Collision calculation
        for (let j=0; j<bubbles.length; j++) {
            jx = bubbles[j].x;
            jy = bubbles[j].y;
            jd = bubbles[j].d;
            jV = (4/3)*PI*(jd/2)^3;
            ijDist = dist(ix, iy, jx, jy);

            if (j != i && jd < id && ijDist <= id/2+jd/2) {
                // (cx, cy) - point of the J bubble,
                // closest to the centre of the I bubble
                cx = jx - (jd/(2*ijDist)) * (jx-ix);
                cy = jy - (jd/(2*ijDist)) * (jy-iy);
                dx = ix - (id/(2*ijDist)) * (ix-jx);
                dy = iy - (id/(2*ijDist)) * (iy-jy);
                if (bubbles[i] != undefined && dist(cx, cy, ix, iy) < id/2) {
                    // Calculate the x and y difference between
                    // (cx, cy) and (dx, dy) and proportionally
                    // divide it between the two bubbles
                    offsetx = cx-dx;
                    offsetx_i = jV*offsetx/(iV+jV);
                    offsetx_j = iV*offsetx/(iV+jV);
                    bubbles[i].x += offsetx_i;
                    bubbles[j].x -= offsetx_j;
                    offsety = (cy-dy);
                    offsety_i = jV*offsety/(iV+jV);
                    offsety_j = iV*offsety/(iV+jV);
                    bubbles[i].y += offsety_i;
                    bubbles[j].y -= offsety_j;
                }
            } 
        }
    }

    if (mouseIsPressed) {
        mx = mouseX;
        my = mouseY;
        if (md < min(width, height)) {md ++;}
        createClock(mx, my, md, s_ang, m_ang, h_ang);
    } else {
        createClock(mouseX, mouseY, md, s_ang, m_ang, h_ang);
    }

    textSize(20);
    textAlign(LEFT, CENTER);
    text("Permanent clocks: "+maxOnScreen+". Try pressing Space or Backspace!", 35, height-35);
}

function createClock(x, y, d, s, m, h) {
    rs = d/200 * 80;
    rm = d/200 * 65;
    rh = d/200 * 50;
    legendsRadius = d/2 - (d/2-rs)/2;

    stroke(0);
    noFill();
    textSize(d/200*8);
    
    strokeWeight(d/300);
    circle(x, y, d);

    for (let i=0; i<60; i++) {
        legendsAngle = map(i, 0, 60, 0, TWO_PI) - HALF_PI;
        legX = x + cos(legendsAngle)*legendsRadius;
        legY = y + sin(legendsAngle)*legendsRadius;

        if (i % 15 === 0) {
            let hour = i / 5;
            if (hour === 0) {hour = 12;}
            strokeWeight(d/400);
            fill(0);
            text(hour, legX, legY);
        } else if (i % 5 === 0) {
            strokeWeight(d/200 * 2.7);
            point(legX, legY);
        } else {
            strokeWeight(d/200);
            point(legX, legY);
        }
    }

    line(x, y, x + cos(s) * rs, y + sin(s) * rs);
    strokeWeight(d/200*2.5)
    line(x, y, x + cos(m) * rm, y + sin(m) * rm);
    strokeWeight(d/200*4.5);
    line(x, y, x + cos(h) * rh, y + sin(h) * rh);
    noStroke()
    fill(0);
    circle(x, y, d/200*10);
    image(bubble, x -d/2, y-d/2, d, d);
    tint(195, 210, 230);
}

function mouseReleased() {
    // Adds the newly created bubble to the list
    bubbles.push({
        x: mx,
        y: my,
        d: md
    });

    md = 15;
}

function keyPressed() {
    if (key === " ") {
        maxOnScreen ++;
    } else if (keyCode === BACKSPACE && maxOnScreen > 0) {
        maxOnScreen --;
    }
}