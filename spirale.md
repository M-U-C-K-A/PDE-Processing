color [] colArray = {
  color(25,165,190),
  color(95,170,200),
  color(120,190,210),
  color(170,210,230),
  color(205,225,245),
  color(220,240,250)
};
int colArrayCounter=0;
void setup() {
  fullScreen();
    mouseX = 10;
    noStroke();
    frameRate(10);
}

void draw() {
    background(0);
    translate(width / 2,height / 2);
    float rStep = 30;
    float rMax = 1920;
    float rMin = mouseX;
    for (float r = rMin; r < rMax; r += rStep) {
        float c = 2 * PI * r;
        float csegment = map(r,0,rMax,rStep * 3 / 4,rStep / 2);
        float asegment = floor(c / csegment);
        float ellipseSize = map(r, 0, rMax, rStep * 3 / 4 - 1, rStep / 4);
        for (float a = 0; a < 360; a += 360 / asegment) {
          colArrayCounter++;
          if(colArrayCounter>5) colArrayCounter=0;
          fill(colArray[colArrayCounter]);
            pushMatrix();
            rotate(radians(a));
            ellipse(r, 0, ellipseSize, ellipseSize);
            popMatrix();
        }
    }
}