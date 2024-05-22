var turn = 0;
var Uoption = "";
var Selection = "";
var Eoption = 0;
var Uhp = 69;
var Ehp = 20;
var UposX = 100;
var WayMove = true;




var testanim;

class HealthBar {
  constructor(hp, x, y, w, h) {
    this.hp = hp;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(hp) {
    this.hp = hp;
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER);
    fill('black');
    text(this.hp, this.x + this.w / 2, this.y + this.h / 2,);
  }
}

var UHealthbar = new HealthBar(Uhp, 80, 160, 20, 20);
var EHealthbar = new HealthBar(Ehp, 420, 160, 20, 20);


class MenuUi {
  constructor(name, x, y, w, h) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER);
    fill("black");
    text(this.name, this.x + this.w / 2, this.y + this.h / 2)
  }

  isClicked(x, y) {
    if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
      return true;
    }
    return false;
  }

}
var ATKbutton = new MenuUi("atk", 50, 0, 80, 80);
var ITEMbutton = new MenuUi("item", 135, 0, 80, 80);

var Swordbutton = new MenuUi("sword", 50, 80, 80, 40);
var Gunbutton = new MenuUi("gun", 50, 120, 80, 40);

var Piebutton = new MenuUi("pie", 135, 80, 80, 40);
var HDbutton = new MenuUi("hotdog", 135, 120, 80, 40);


class Attackers {
  constructor(name, damage, n) {
    this.name = name;
    this.damage = damage;
    this.n = n;
  }
}

class Items {
  constructor(name, heal, n) {
    this.name = name;
    this.heal = heal;
    this.n = n;
  }
}

function AttackSword() {
  UposX = 100;
  while (UposX <= 380) {
    animation(testanim, UposX, 300, 0, 0.5, 0.5);
    UposX += 20;

  }
  Ehp = Ehp - Attacker[0].damage;

  while (UposX >= 100) {
    animation(testanim, UposX, 300, 0, 0.5, 0.5);
    UposX -= 20;

  }

  sleep(2000)
  UposX = 100;
}






var Attacker = [];
var Healer = [];

function setup() {
  createCanvas(600, 400);
  testanim = loadAnimation(
    'assets/main-think01.PNG',
    'assets/main-think02.PNG',
  );
  testanim.frameDelay = 20;

  Attacker.push(new Attackers("Sword", 2, -1));
  Attacker.push(new Attackers("Gun", 5, 3));
  Healer.push(new Items("Pie", 10, 1));
  Healer.push(new Items("Hotdog", 5, 3));

}

function draw() {
  background(150);
  UHealthbar.draw(Uhp);
  EHealthbar.draw(Ehp);
  if (Uhp > 0 && Ehp > 0) {
    if (turn % 2 == 0) {
      print("наш хід")

      ATKbutton.draw();
      ITEMbutton.draw();

      // наш хід

      if (Uoption == "ATK") {
        Swordbutton.draw();
        Gunbutton.draw();
        if (Selection == "SWORD") {

          // while(UposX <= 380) {
          //   animation(testanim, UposX, 300, 0, 0.5, 0.5);
          //   UposX += 10;
          // }
          // Ehp = Ehp - Attacker[0].damage;
          // while(UposX >= 100) {
          //   animation(testanim, UposX, 300, 0, 0.5, 0.5);
          //   UposX -= 10;
          // }

          // if (UposX <= 380){
          //   animation(testanim, UposX, 300, 0, 0.5, 0.5);
          //   UposX += 10;
          // } else {
          //   Ehp = Ehp - Attacker[0].damage;
          //   animation(testanim, UposX, 300, 0, 0.5, 0.5);
          //   UposX -= 10;
          // }

          // AttackSword();

          if (UposX <= 380 && WayMove == true) {
            UposX += 20;
            animation(testanim, UposX, 300, 0, 0.5, 0.5);
            return;
          } 
          WayMove = false;

          if (UposX > 80 && WayMove == false) {
            animation(testanim, UposX, 300, 0, 0.5, 0.5);
            Uposx -= 20;
            return;
          }

          Uoption = "";
          Selection = "";
          turn++;
        }
        else if (Selection == "GUN") {
          if (Attacker[1].n > 0) {
            Ehp = Ehp - Attacker[1].damage;
            Attacker[1].n -= 1;
            Uoption = "";
            Selection = "";
            turn++;
          } else {
            print('Недостатньо патронів');
            Uoption = "";
            Selection = "";
            turn++;
          }
        }

      }
      if (Uoption == "ITEM") {
        Piebutton.draw();
        HDbutton.draw();
        if (Selection == "PIE") {
          if (Healer[0].n > 0) {
            Uhp = Uhp + Healer[0].heal;
            Healer[0].n -= 1;
            Uoption = "";
            Selection = "";
            turn++;
          } else {
            print('Недостатноь Пирогів');
            Uoption = "";
            Selection = "";
            turn++;
          }
        } else if (Selection == "HOTDOG") {
          if (Healer[1].n > 0) {
            Uhp = Uhp + Healer[1].heal;
            Healer[1].n -= 1;
            Uoption = "";
            Selection = "";
            turn++;
          } else {
            print('Недостатньо Хотдогів');
            Uoption = "";
            Selection = "";
            turn++;
          }
        }
      }
    } else {
      // хід комп'ютера
      print("хід комп'ютера")
      if (Eoption == 0) {
        Uhp = Uhp - 5;
        print("Ваше здоров'я:" + Uhp);
        print("Здоров'я ворога:" + Ehp);

        Eoption++;
      }
      else if (Eoption == 1) {
        Ehp += 5;
        print("Ваше здоров'я:" + Uhp);
        print("Здоров'я ворога:" + Ehp);

        Eoption++;
      }
      else if (Eoption == 2) {
        Eoption = 0;
        print("Ваше здоров'я:" + Uhp);
        print("Здоров'я ворога:" + Ehp);

      }
      turn++;
    }
  } else {
    if (Uhp <= 0) {
      print('Ви проиграли');
    }
    if (Ehp <= 0) {
      print('Ви перемогли');
    }
  }

  fill("white");

  animation(testanim, UposX, 300, 0, 0.5, 0.5);

  // rect(100, 200, 80, 120);
  rect(400, 300, 80, 120);



}



function mouseClicked() {
  if (ATKbutton.isClicked(mouseX, mouseY)) {
    Uoption = "ATK";
  }
  else if (ITEMbutton.isClicked(mouseX, mouseY)) {
    Uoption = "ITEM";
  }
  else if (Swordbutton.isClicked(mouseX, mouseY)) {
    Selection = "SWORD";
  }
  else if (Gunbutton.isClicked(mouseX, mouseY)) {
    Selection = "GUN";
  }
  else if (Piebutton.isClicked(mouseX, mouseY)) {
    Selection = "PIE";
  }
  else if (HDbutton.isClicked(mouseX, mouseY)) {
    Selection = "HOTDOG";
  }


}




