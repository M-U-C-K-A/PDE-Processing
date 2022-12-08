float angle;
float x=width/2;
float y=height/2;
void setup() {
  size(900,900);
  surface.setLocation(1000,10);
  strokeWeight(1);
  noFill();
}
float e=1;
void draw() {
  background(240);
  translate(width/2,height/2);
  rotate(-angle);
  angle +=TWO_PI/720;
  for (int a = 0; a < 360; a+=10) {
    pushMatrix();
    line(e, a, 0, 0);
    rotate(radians(a));
    for (int c = 0; c < 160; c+=10) {
      line(0,sin(c),c,a);
    }
  popMatrix();
  }
}
