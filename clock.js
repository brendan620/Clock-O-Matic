
var Digits=[];
var Clocks=[];


function setup() {

  c = createCanvas(windowWidth, windowHeight);

  background(0, 0, 0);
  fill(255);
  var spacing = 200;
  for(var d =0; d<4;d++)
  {
    for (var i = 2; i < 8; i++)
      {
      	for(var j =2; j < 6; j++)
      	{
      		Clocks.push(new Clock((j*40+(spacing*d)),(i*40)));
      	}

      }

  Digits.push(Clocks);
  Clocks=[];



}


}

function draw() {
    translate(windowWidth/4,windowHeight/4);
	if(!mouseIsPressed)
	{

  		for(var i =0;i<Digits.length;i++)
  		{
        for(var j =0; j < Digits[i].length; j++)
        {
  			     fill(255);
  		       Digits[i][j].drawClock();
  			     Digits[i][j].drawHands();
  			     Digits[i][j].rotateHands();
        }


  		}
    }

	else
	{
    var d = new Date(); // for now
    hours = d.getHours(); // => 9
    if(hours>12)
    {
      hours=hours-12;
    }
    minutes = d.getMinutes(); // =>  30

    sHours = hours.toString();
    sMinutes = minutes.toString();
    var numbers=[];
    if(sHours.length == 1)
    {
      numbers.push(0);
    }
    for(var i = 0;i<sHours.length;i++)
    {

      numbers.push(sHours.charAt(i));

    }

    if(sMinutes.length == 1)
    {
      numbers.push(0);
    }
    for(var i = 0;i<sMinutes.length;i++)
    {
      numbers.push(sMinutes.charAt(i));
    }

		for(var i=0;i<Digits.length;i++)
		{
      for(var j =0;j<Digits[i].length;j++)
      {
			     fill(255);
			     Digits[i][j].drawClock();
			     Digits[i][j].drawHands();
			     Digits[i][j].alignHands(j,numbers[i]);
      }
		}

	}


}

function mouseReleased(){
  redraw();
}

function Clock(x,y)
{
	this.x=x;
	this.y=y;

	var hand1 = random(0,360);
	var hand2 = random(0,360);


	this.drawClock=function()
	{
		ellipse(x, y, 40, 40);
	}


	this.drawHands = function()
	{
			fill(0);

			line(x,y,x+(cos(radians(hand1))*(40*.4)),y+(sin(radians(hand1))*(40*.4)));
			line(x,y,x+(cos(radians(hand2))*(40*.4)),y+(sin(radians(hand2))*(40*.4)));

	}

	this.rotateHands = function()
	{
	 	if(hand1 != 360)
	 	{
	 		hand1 = hand1 + 2;
	 	}
	 	else
	 	{
	 		hand1 = 0;
	 	}

		if(hand2 != 360)
		{
			hand2 = hand2 + 1;
		}
		else
		{
			hand2 = 0;
		}

	}

	this.alignHands = function(clock,digit)
	{
		if(digit==0)
		{
			if(clock==0 || clock==5)
			{
				this.bottomRightHands();
			}
			if(clock==1 || clock==2 || clock==21 || clock==22)
			{
				this.horizontalHands();

			}
			if(clock ==3 || clock==6)
			{
				this.bottomLeftHands();
			}
			if(clock == 4 || clock == 7 || clock == 8 || clock == 11 || clock == 12 ||
			   clock == 15 || clock == 16 || clock == 19 || clock == 9 || clock == 10 ||
			   clock == 13 || clock == 14)
			{
				this.verticalHands();
			}
			if(clock == 17 || clock == 20)
			{
				this.topRightHands();
			}
			if(clock == 18 || clock ==23)
			{
				this.topLeftHands();
			}
		}

		if(digit==1)
		{
			if(clock == 0 ||clock == 1 || clock == 4 || clock == 5 || clock == 8
				|| clock == 9 || clock == 12 || clock == 13 || clock == 16 ||
				clock == 17 || clock == 20 || clock == 21)
			{
				this.noHands();
			}

			if(clock == 6|| clock == 7 || clock == 10 ||clock == 11 ||clock == 14 ||
				clock == 15 || clock == 18 || clock == 19)
			{
				this.verticalHands();
			}
			if(clock == 2)
			{
				this.bottomRightHands();
			}
			if(clock == 3)
			{
				this.bottomLeftHands();
			}
			if(clock == 22)
			{
				this.topRightHands();
			}
			if(clock == 23)
			{
				this.topLeftHands();
			}
		}

		if(digit==2)
		{
			if(clock == 0 || clock == 8 || clock == 13)
			{
				this.bottomRightHands();
			}
			if(clock == 1 ||clock == 2 ||clock == 5 ||clock == 9 ||clock == 14 ||
				clock == 18 ||clock == 22 ||clock == 21)
			{
				this.horizontalHands();
			}
			if(clock == 7 ||clock == 11 ||clock == 12 || clock == 16)
			{
				this.verticalHands();
			}
			if(clock == 3 || clock == 6 || clock == 19)
			{
				this.bottomLeftHands();
			}
			if(clock == 4 || clock == 20 || clock == 17)
			{
				this.topRightHands();
			}
			if(clock == 10 || clock == 23 || clock == 15)
			{
				this.topLeftHands();
			}
		}

		if(digit==3)
		{
			if(clock == 1 || clock == 2 || clock == 5 ||clock == 17 ||
				clock == 21 || clock == 22)
			{
				this.horizontalHands();
			}
			if(clock == 0 || clock == 9 || clock == 16)
			{
				this.bottomRightHands();
			}
			if(clock == 7 || clock == 11 || clock == 15 || clock == 19)
			{
				this.verticalHands();
			}
			if(clock == 12 ||clock == 8)
			{
				this.noHands();
			}
			if(clock == 4 ||clock == 13 ||clock == 20)
			{
				this.topRightHands();
			}
			if(clock == 3 || clock == 14 || clock == 6)
			{
				this.bottomLeftHands();
			}
			if(clock == 18 || clock == 10 ||clock == 23)
			{
				this.topLeftHands();
			}
		}

		if(digit==4)
		{
			if(clock == 4 || clock == 5 || clock == 6 || clock == 7 ||
				clock == 8  || clock == 11 || clock == 15 || clock == 18
				|| clock == 19)
			{
				this.verticalHands();
			}
			if(clock == 16 || clock == 17 ||
				clock == 20 || clock == 21)
			{
				this.noHands();
			}
			if(clock == 0 || clock == 2)
			{
				this.bottomRightHands();
			}
			if(clock == 1 ||clock == 3 || clock == 14)
			{
				this.bottomLeftHands();
			}

			if(clock == 9 || clock == 12 || clock == 22)
			{
				this.topRightHands();
			}
			if(clock == 23 || clock == 10)
			{
				this.topLeftHands();
			}
			if(clock == 13)
			{
				this.horizontalHands();
			}
		}

    if(digit==5)
    {
      if(clock == 1 || clock == 2 || clock == 6 || clock == 10 ||
      clock == 13 || clock == 17 || clock == 21 || clock == 22)
      {
        this.horizontalHands();
      }
      if(clock == 4 || clock == 8 || clock == 15 || clock == 19)
      {
        this.verticalHands();
      }
      if(clock == 0 || clock == 5 ||clock == 16)
      {
        this.bottomRightHands();
      }
      if(clock == 3 || clock == 11 || clock == 14)
      {
        this.bottomLeftHands();
      }
      if(clock == 9 || clock == 12 || clock == 20)
      {
        this.topRightHands();
      }
      if(clock == 7 || clock == 18 || clock == 23)
      {
        this.topLeftHands();
      }
    }

    if(digit==6)
    {
      if(clock == 1 || clock == 2 || clock == 6 || clock == 10 ||
      clock == 21 || clock == 22)
      {
        this.horizontalHands();
      }
      if(clock == 4 || clock == 8 || clock == 15 || clock == 19 ||
      clock == 12 || clock == 16)
      {
        this.verticalHands();
      }
      if(clock == 0 || clock == 5 || clock == 13)
      {
        this.bottomRightHands();
      }
      if(clock == 3 || clock == 11 || clock == 14)
      {
        this.bottomLeftHands();
      }
      if(clock == 9 || clock == 20 || clock == 17)
      {
        this.topRightHands();
      }
      if(clock == 7 || clock == 18 || clock == 23)
      {
        this.topLeftHands();
      }
    }
    if(digit==7)
    {
      if(clock == 8 || clock == 9 || clock == 12 || clock == 13 || clock == 16 ||
        clock == 17 || clock == 20 || clock == 21)
      {
        this.noHands();
      }

      if(clock == 7 || clock == 10 ||clock == 11 ||clock == 14 ||
        clock == 15 || clock == 18 || clock == 19)
      {
        this.verticalHands();
      }
      if(clock == 0)
      {
        this.bottomRightHands();
      }
      if(clock == 3 || clock == 6)
      {
        this.bottomLeftHands();
      }
      if(clock == 22 || clock == 4)
      {
        this.topRightHands();
      }
      if(clock == 1 || clock == 5 || clock == 2)
      {
        this.horizontalHands();
      }
      if(clock == 23)
      {
        this.topLeftHands();
      }
    }

    if(digit==8)
    {
      if(clock == 1 || clock == 2  ||
      clock == 21 || clock == 22)
      {
        this.horizontalHands();
      }
      if(clock == 4 || clock == 8 || clock == 15 || clock == 19 ||
      clock == 12 || clock == 16 || clock == 7 || clock == 11)
      {
        this.verticalHands();
      }
      if(clock == 0 || clock == 5 || clock == 13)
      {
        this.bottomRightHands();
      }
      if(clock == 3  || clock == 14|| clock == 6 )
      {
        this.bottomLeftHands();
      }
      if(clock == 9 || clock == 20 || clock == 17)
      {
        this.topRightHands();
      }
      if( clock == 18 || clock == 23|| clock == 10)
      {
        this.topLeftHands();
      }
    }


    if(digit==9)
    {
      if(clock == 16 || clock == 17 || clock == 20 || clock == 21)
      {
        this.noHands();
      }

      if(clock == 7 || clock == 4 || clock == 8 ||clock == 11 ||
        clock == 15 || clock == 18 || clock == 19)
      {
        this.verticalHands();
      }
      if(clock == 0 || clock == 5)
      {
        this.bottomRightHands();
      }
      if(clock == 3 || clock == 6 || clock == 14)
      {
        this.bottomLeftHands();
      }
      if(clock == 22 || clock == 12 || clock == 9)
      {
        this.topRightHands();
      }
      if(clock == 1 || clock == 13 || clock == 2)
      {
        this.horizontalHands();
      }
      if(clock == 23 || clock == 10)
      {
        this.topLeftHands();
      }
    }

	}



	this.horizontalHands = function()
	{

		if(hand1>0)
		{
			hand1--;
		}
		else if(hand1<0)
		{
			hand1++;
		}

		if(hand2 >180)
		{
			hand2--;
		}
		else if(hand2<180)
		{
			hand2++;
		}

	}


	this.verticalHands = function()
	{
		if(hand1>90)
		{
			hand1--;
		}
		else if(hand1<90)
		{
			hand1++;
		}

		if(hand2 >270)
		{
			hand2--;
		}
		else if(hand2<270)
		{
			hand2++;
		}

	}


	this.topLeftHands = function()
	{
		if(hand1>180)
		{
			hand1--;
		}
		else if(hand1<180)
		{
			hand1++;
		}

		if(hand2 >270)
		{
			hand2--;
		}
		else if(hand2<270)
		{
			hand2++;
		}

	}


	this.topRightHands = function()
	{
		if(hand1>270)
		{
			hand1--;
		}
		else if(hand1<270)
		{
			hand1++;
		}

		if(hand2 >0)
		{
			hand2--;
		}
		else if(hand2<0)
		{
			hand2++;
		}

	}

	this.bottomLeftHands = function()
	{
		if(hand1>180)
		{
			hand1--;
		}
		else if(hand1<180)
		{
			hand1++;
		}

		if(hand2 >90)
		{
			hand2--;
		}
		else if(hand2<90)
		{
			hand2++;
		}

	}

	this.bottomRightHands = function()
	{
		if(hand1>0)
		{
			hand1--;
		}
		else if(hand1<0)
		{
			hand1++;
		}

		if(hand2 >90)
		{
			hand2--;
		}
		else if(hand2<90)
		{
			hand2++;
		}
	}

	this.noHands = function()
	{

		if(hand1>135)
		{
			hand1--;
		}
		else if(hand1<135)
		{
			hand1++;
		}

		if(hand2 >135)
		{
			hand2--;
		}
		else if(hand2<135)
		{
			hand2++;
		}

	}

}
