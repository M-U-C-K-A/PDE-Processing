float dstPow = 2;//maginetic distance factor, we generary use 2 for magnetic field but 4 is good for this situation
float magR = 2;//magnet radius
float partiR = 0.5;//particle radius
int spf = 1;//particle spawn per frame
int nm = 10;//number of magnet 100
float pS = 2;//point size
float lS = 1;//line size
boolean useSecondNearest = false;//use second nearest magnet
//if it true we can get curved good trail and some interesting clack.
//if it false we can get accurate and simple one.
class Magnet{
  PVector pos;
  float power;
  color col;
  
  Magnet(PVector pos, float power, color col){
    this.pos = pos;
    this.power = power;
    this.col = col;
  }
  
  void genParticles(float power){
    particles.add(new Particle(pos.copy().add(PVector.random2D().mult(magR-partiR)), power, col)); 
  }
  
  void show(){
    fill(col);
    ellipse(pos.x, pos.y, magR*2, magR*2);
  }
}
class Particle{
  PVector pos;
  float power;
  color col;
  
  Particle(PVector pos, float power, color col){
    this.pos = pos;
    this.power = power;
    this.col = col;
  }
  
  void update(ArrayList<Magnet> magnets){
    PVector sum = new PVector();
    Magnet mag1 = null;//nearest magnet
    Magnet mag2 = null;//second nearest magnet
    float minSqDst1 = Float.POSITIVE_INFINITY;//nearest square distance
    float minSqDst2 = Float.POSITIVE_INFINITY;//second nearest square distance
    for(Magnet magnet : magnets){
      PVector diff = PVector.sub(magnet.pos, pos);
      float sqDst = diff.x*diff.x + diff.y*diff.y;//for high speed processing
      if(minSqDst1 > sqDst){
        minSqDst1 = sqDst;
        mag1 = magnet;
      }else if(minSqDst2 > sqDst){
        minSqDst2 = sqDst;
        mag2 = magnet;
      }
    }
    if(mag1 == null || mag2 == null)return;
    ArrayList<Magnet> selectedMag = new ArrayList<Magnet>();
    selectedMag.add(mag1);
    if(useSecondNearest){
      selectedMag.add(mag2);
    }
    for(Magnet magnet : selectedMag){
      PVector diff = PVector.sub(pos, magnet.pos);
      float poweredDst = pow(diff.x, dstPow) + pow(diff.y, dstPow);
      diff.mult(power*magnet.power/poweredDst);//for easy visualize
      sum.add(diff);
    }
    pos.add(sum.setMag(partiR*2));//for efficient visualize
  }
  
  boolean valid(ArrayList<Magnet> magnets){
    boolean inWindow = pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height;
    boolean collide = false;
    for(Magnet magnet : magnets){
      PVector diff = PVector.sub(pos, magnet.pos);
      float sqrDst = diff.x*diff.x + diff.y*diff.y;
      if(sqrDst<magR*2*magR*2 && power*magnet.power < 0)collide = true;
    }
    return inWindow && (!collide);
  }
  
  void show(){
    fill(col);
    ellipse(pos.x, pos.y, partiR*2, partiR*2);
  }
}
ArrayList<Particle> particles = new ArrayList<Particle>();
ArrayList<Magnet> magnets = new ArrayList<Magnet>();

void setup(){
  blendMode(ADD);
  fullScreen();
  colorMode(HSB, 200, 100, 100);
  //ortho();
  background(0);
  translate(width/2, height/2);
  stroke(50);
  //noFill();
  //voronoi2D.voronoi.delaunay.show();
  for(int i=0; i<nm; i++){                      
    magnets.add(new Magnet(new PVector(random(0, width), random(0, height)), 1, color(100+random(50), 100, 100, 30)));
  }
}

void keyPressed(){
  if(key == 'r'){
  }
}

void draw(){
  noStroke();
  for(Magnet magnet : magnets){
    if(magnet.power>0)magnet.genParticles(magnet.power);
  }
  for(Particle particle : particles){
    particle.update(magnets);
  }
  for(Particle particle : particles){
    particle.show();
  }
  for(Magnet magnet : magnets){
    magnet.show();
  }
  for(int i=particles.size()-1; i>=0; i--){
    Particle particle = particles.get(i);
    if(!particle.valid(magnets)){
    particles.remove(i);
    }
  }
}