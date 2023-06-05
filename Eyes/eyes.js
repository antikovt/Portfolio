eyes = [];
times = [];

function setup() {
  createCanvas(780, 780);
  background(200, 235, 225);
  
  for (i = 0; i < (int(780/100)*int(780/100)); i++) {
    eyes[i] = 0;
    times[i] = -1;
  }

}

function draw() {
  background(220, 235, 225);
  for (i = 0; i < eyes.length; i++) {
    
    rowMax = int(width/100);
    colMax = int(height/100);
    
    x = (50 + i*100 + (width-rowMax*100)/2)-(int(i/rowMax)*rowMax*100);
    y = 50 + (int(i/rowMax)*100 + (height-colMax*100)/2);
    
    if (mouseIsPressed && 
        dist(mouseX, mouseY, x, y) < 40
      ) {
        eyes[i] = 1;
        times[i] = millis();
      }
    
    if (eyes[i] == 0) {
      active(x, y);
    } else if (eyes[i] == 1) {
      popped(x, y);
      
      if (millis() - times[i] > 200) {
        eyes[i] = 2;
        times[i] = -1;
      } 
      
    } else {
        squint(x, y);
        
        if (times[i] == -1) {
          times[i] = millis();
        }
        
        if (millis() - times[i] > 1000) {
          eyes[i] = 0;
          times[i] = -1;
        }
      }
  }
  
}

function active(x, y) {
  
  fill(255);
  stroke(60, 45, 30);
  line(x, y-30, x, y-32);
  line(x+17, y-27, x+18, y-30);
  line(x-17, y-27, x-18, y-30);
  line(x+32, y-22, x+33, y-23);
  line(x-32, y-22, x-33, y-23);
  strokeWeight(3);
  stroke(240, 205, 185);
  ellipse(x, y, 85, 55);
  noStroke();
  
  map_x = pow(abs(mouseX-x), 0.43);
  map_y = pow(abs(mouseY-y), 0.275);
  
  if (mouseX-x < 0) {
    map_x = map_x * -1;
  }
  
  if (mouseY-y < 0) {
    map_y = map_y * -1;
  }
  
  fill(130, 180, 255);
  circle(x+map_x, y+map_y, 35);
  fill(0);
  di = dist(mouseX, mouseY, x, y);
  
  if (di < 100 && di*0.25 >= 12) {
    circle(x+map_x, y+map_y, di*0.25);
  } else if (di*0.25 < 12) {
    circle(x+map_x, y+map_y, 12);
  } else {
    circle(x+map_x, y+map_y, 25);
  }  
  
  fill(255);
  circle(x+12+map_x*0.4, y-12+map_y*0.4, 10);
}

function popped(x, y) {
  
  fill(240, 205, 185);
  strokeWeight(3);
  stroke(240, 205, 185);
  ellipse(x, y, 85, 55);
  stroke(60, 45, 30);
  line(x-1, y+15, x, y+25);
  line(x+1, y+15, x, y+25);
  line(x-16, y+13, x-20, y+22);
  line(x-18, y+13, x-20, y+22);
  line(x+16, y+13, x+20, y+22);
  line(x+18, y+13, x+20, y+22);
  line(x+32, y+8, x+34, y+11);
  line(x-32, y+8, x-34, y+11);
  stroke(165, 141, 127);
  arc(x, y-13, 100, 55, 25*PI/12, 35*PI/12);
  arc(x, y-19, 100, 55, 56*PI/24, 61*PI/24);
  arc(x, y-19, 100, 55, 63*PI/24, 33*PI/12);

}

function squint(x, y) {
  
  fill(255);
  strokeWeight(3);
  stroke(240, 205, 185);
  ellipse(x, y, 85, 55);
  fill(240, 205, 185);
  noStroke();
  
  map_x = pow(abs(mouseX-x), 0.43);
  map_y = pow(abs(mouseY-y), 0.275);
  
  if (mouseX-x < 0) {
    map_x = map_x * -1;
  }
  
  if (mouseY-y < 0) {
    map_y = map_y * -1;
  }
  
  fill(130, 180, 255);
  circle(x+map_x, y+map_y, 35);
  fill(0);
  di = dist(mouseX, mouseY, x, y);
  
  if (di < 100 && di*0.25 >= 12) {
    circle(x+map_x, y+map_y, di*0.25);
  } else if (di*0.25 < 12) {
    circle(x+map_x, y+map_y, 12);
  } else {
    circle(x+map_x, y+map_y, 25);
  }  
  
  fill(255);
  circle(x+12+map_x*0.4, y-12+map_y*0.4, 10);
  
  fill(240, 205, 185);
  stroke(180, 180, 255, 200);
  strokeWeight(6);
  
  noFill();
  arc(x, y+27, 110, 15, 26*PI/24, 46*PI/24);
  fill(240, 205, 185);
  noStroke();
  arc(x, y, 85, 55, 27*PI/24, 45*PI/24);
  
  strokeWeight(3);
  stroke(60, 45, 30);
  line(x, y, x, y+2);
  line(x+17, y-3, x+18, y);
  line(x-17, y-3, x-18, y);
  line(x+32, y-6, x+33, y-5);
  line(x-32, y-6, x-33, y-5);
  
  stroke(165, 141, 127);
  arc(x, y-29, 110, 55, 51*PI/24, 69*PI/24);
  arc(x, y+29, 114, 15, 13*PI/12, 23*PI/12);
  
  noFill();
  arc(x, y-35, 100, 55, 57*PI/24, 61*PI/24);
  arc(x, y-35, 100, 55, 63*PI/24, 32*PI/12);
}