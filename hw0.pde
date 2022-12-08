float angle;
float x=width/2;
float y=height/2;
void setup() {
  size(900,900);
  surface.setLocation(1000,10);
  strokeWeight(.01);
  noFill();
}
float e=1;
void draw() {
  background(240);
  translate(width/2,height/2);
  rotate(-angle);
  angle +=TWO_PI/720;
    for (int c = 0; c < 160; c+=10) { // hauteur
      for (int i = 0; i < 160; i+=1) { //largeur
      ellipse(i, c, i, c);
      }
  }
}
