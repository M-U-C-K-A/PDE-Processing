float phase=0;
float zoff=0;
void setup() {
  size(900, 900);
  surface.setLocation(1000,10);
}

void draw() {
  background(20);
  translate(width/2, height/2);
  stroke(255);
  noFill();
  beginShape();
  float noiseMax = 10;
  for (float a = 0; a < TWO_PI; a+=0.03) {
    float xoff =map(cos(a+phase),-1,1,0,noiseMax);
    float yoff =map(sin(a+phase),-1,1,0,noiseMax);
    float r = map(noise(xoff,yoff,zoff),0,1,200,400);
    float x = r *cos(a);
    float y = r *sin(a);
    vertex(x*1.02, y*1.02);
    vertex(x*1.04, y*1.04);
    println(x,y);
  }
  endShape(CLOSE);
  zoff+=.1;
}