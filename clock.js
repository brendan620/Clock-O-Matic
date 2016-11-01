/*
Author: Brendan Lilly
Last Update: 10/31/2016
Filename: clock.js
*/

//Digits array holds the Clocks array for each of the 4 digits
var Digits=[];

//Clocks array holds the Clock objects that make up the time
var Clocks=[];

//Colon array holds the Clock objects that make up the colon
var Colon=[];

var toggle = false;
/*
Name: setup()
Description: Is called when the page is loaded
Parameters: None
Return: None
*/
function setup() {

  //Create the canvas based on the window size
  c = createCanvas(windowWidth, windowHeight);

  //Set the stroke for the lines
  strokeWeight(1.7);

  //Set the background to black and the fill color to white
  background(0, 0, 0);
  fill(255);

  //Set the spacing variable
  var spacing = 300;

  //Loop 4 times for the 4 digits that need to be created
  for(var d =0; d<4;d++)
  {
    //Loop 6 times for the 6 Clocks needed per column in a digit
    for (var i = 2; i < 8; i++)
      {
        //Loop 4 times for the 4 Clocks needed per row in a digit
      	for(var j =0; j < 4; j++)
      	{
          //Push a new Clock object into the Clocks array
          //The X and Y are calculated based on the Clock being
          //pushed and the digit it is being added to.
      		Clocks.push(new Clock((j*60+(spacing*d)),(i*60)));
      	}
      }
  //Added the completed Clocks array to the Digits array
  Digits.push(Clocks);
  //Clear out the Clocks array before creating the next digit
  Clocks=[];
  }
}

/*
Name: draw()
Description: Is called every frame. Default is 60 fps.
Parameters: None
Return: None
*/
function draw() {

  //Sets the orgin of the canvas in order to center the Digits
  if(windowWidth > 1280)
  {
  	translate(windowWidth/4.5,windowHeight/4.5);
  }
  else
  {
  	translate(windowWidth/10,windowHeight/10);
  }

  //If the mouse is not being pressed
  //the clocks will just spin normally
	if(!mouseIsPressed && toggle==false)
	{
    //Loop through the Digits on the screen
  		for(var i =0;i<Digits.length;i++)
  		{
        //Loop through the current Digits length
        for(var j =0; j < Digits[i].length; j++)
        {
            //Set the fill color to white for the clock background
  			    fill(255);
            //Draw the Clock, the hands, and then rotate them
            Digits[i][j].drawClock();
  			    Digits[i][j].drawHands();
  			    Digits[i][j].rotateHands();
        }
  		}
    }

  //If the mouse is being pressed
  //rotate the clock hands to form the current time
	else
	{
    //Draw the colon on the screen
    drawColon();

    //Get the current date
    var d = new Date();

    //Get the hour from the date
    hours = d.getHours();

    //Convert the hours from a 24 hour clock to a 12 hours clock
    if(hours>12)
    {
      hours=hours-12;
    }

    //Get the current minutes from the date
    minutes = d.getMinutes();

    //Convert both value to a string
    sHours = hours.toString();
    sMinutes = minutes.toString();

    //Create an array numbers to hold all of the digits
    var numbers=[];

    //If there is a single hour ie : 2pm
    //then push a 0 to the array first
    if(sHours.length == 1)
    {
      numbers.push(0);
    }

    //Iterate through the hours string
    //and push the characters onto the
    //numbers array.
    for(var i = 0;i<sHours.length;i++)
    {
      numbers.push(sHours.charAt(i));
    }

    //If there is a single minute ie : 2:01pm
    //then push a 0 to the array first
    if(sMinutes.length == 1)
    {
      numbers.push(0);
    }

    //Iterate through the minutes string
    //and push the characters onto the
    //numbers array.
    for(var i = 0;i<sMinutes.length;i++)
    {
      numbers.push(sMinutes.charAt(i));
    }

    //Loop through the digits on the screen
		for(var i=0;i<Digits.length;i++)
		{
      //Loop through the clocks in each digit
      for(var j =0;j<Digits[i].length;j++)
      {
          //Set the fill color to white for the clocks
			    fill(255);
          //Draw each of the clocks in the digit
			    Digits[i][j].drawClock();
          //Then draw their hands on top
			    Digits[i][j].drawHands();
          //Finally align their hands to match the time
			    Digits[i][j].alignHands(j,numbers[i]);
      }
		}
  }
}

/*
Name: mouseReleased()
Description: Is called every time the mouse button is released
Parameters: None
Return: None
*/
function mouseReleased(){
  //Clear the canvas
  clear();
  //Reset the Digits array
  Digits = [];
  //Call setup again
  setup();
}

/*
Name: keyPressed()
Description: Is called every time a key is pressed
Parameters: None
Return: None
*/
function keyPressed() {
  if(keyCode == 32)
  {
    //Space bar has been hit
    toggle = !toggle;
    if(toggle==false)
    {
      mouseReleased();
    }

  }
}

/*
Name: windowResized()
Description: Is called every time the window is resized
Parameters: None
Return: None
*/
function windowResized() {
  //Call resizeCanvas
  resizeCanvas(windowWidth, windowHeight);

  //Call mouseReleased to reset the canvas
  mouseReleased();
}


function drawHelp(){

  loadImage("help.png", function(img) {
    image(img, windowWidth-100, windowHeight-100);
  });

}

/*
Name: drawColon()
Description: Draws the colon to the screen when the time is being shown.
Parameters: None
Return: None
*/
function drawColon()
{
  //Push two clocks to the Colon array
  Colon.push(new Clock((540),(180)));
  Colon.push(new Clock((540),(360)));
  //Set the fill color to red
  fill(255,0,0);
  //Draw both of the clocks
  Colon[0].drawClock();
  Colon[1].drawClock();
}

/*
Name: Clock()
Description: Clock object
Parameters: x : x coordinate of the clock
            y : y coordinate of the clock
Return: None
*/
function Clock(x,y)
{
  //Set the coordinates of the clock
	this.x=x;
	this.y=y;

  //Set the starting degree of each hand at random
	var hand1 = random(0,360);
	var hand2 = random(0,360);

  /*
  Name: drawClock()
  Description: Draws the clock at the proper coordinates
  Parameters: None
  Return: None
  */
	this.drawClock=function()
	{
    //Draw the elipse
		ellipse(x, y, 60, 60);
	}

  /*
  Name: drawHands()
  Description: Draws the hands on the clock face
  Parameters: None
  Return: None
  */
	this.drawHands = function()
	{
      //Set fill color to black
			fill(0);

      //Draw the lines for each hand
			line(x,y,x+(cos(radians(hand1))*(60*.4)),y+(sin(radians(hand1))*(60*.4)));
			line(x,y,x+(cos(radians(hand2))*(60*.4)),y+(sin(radians(hand2))*(60*.4)));
	}

  /*
  Name: rotateHands()
  Description: Rotates the hands on the clock face
  Parameters: None
  Return: None
  */
	this.rotateHands = function()
	{
    //If the first hand is not at 360 degrees
	 	if(hand1 != 360)
	 	{
      //Add two degrees to it
	 		hand1 = hand1 + 2;
	 	}
	 	else
	 	{
      //Once it reaches 360 degrees set it to zero
	 		hand1 = 0;
	 	}

    //If the second hand is not at 360 degrees
		if(hand2 != 360)
		{
      //Add one degree to it
			hand2 = hand2 + 1;
		}
		else
		{
      //Once it reaches 360 degrees set it to zero
			hand2 = 0;
		}

	}

  /*
  Name: alignHands()
  Description: Aligns hands on the clocks to create the correct digit
  Parameters: clock : int The clock index
              digit : int The number this digit will be forming
  Return: None
  */
	this.alignHands = function(clock,digit)
	{
    //Sets the appearance of each clock if the digit is 0
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
    //Sets the appearance of each clock if the digit is 1
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

    //Sets the appearance of each clock if the digit is 2
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

    //Sets the appearance of each clock if the digit is 3
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

    //Sets the appearance of each clock if the digit is 4
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

    //Sets the appearance of each clock if the digit is 5
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

    //Sets the appearance of each clock if the digit is 6
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

    //Sets the appearance of each clock if the digit is 7
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

    //Sets the appearance of each clock if the digit is 8
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

    //Sets the appearance of each clock if the digit is 9
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


  /*
  Name: horizontalHands()
  Description: Rotates the hands form a horizontal line
  Parameters: None
  Return: None
  */
	this.horizontalHands = function()
	{

		if(hand1>0)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<0)
		{
			hand1 = hand1 + 2;
		}

		if(hand2 >180)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<180)
		{
			hand2 = hand2 + 2;
		}

	}

  /*
  Name: verticalHands()
  Description: Rotates the hands form a vertical line
  Parameters: None
  Return: None
  */
	this.verticalHands = function()
	{
		if(hand1>90)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<90)
		{
			hand1 = hand1 + 2;
		}

		if(hand2 >270)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<270)
		{
		hand2 = hand2 + 2;
		}

	}

  /*
  Name: topLeftHands()
  Description: Rotates the hands to the top and left of the clock face
  Parameters: None
  Return: None
  */
	this.topLeftHands = function()
	{
		if(hand1>180)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<180)
		{
			hand1 = hand1 + 2;
		}

		if(hand2 >270)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<270)
		{
		hand2 = hand2 + 2;
		}

	}

  /*
  Name: topRightHands()
  Description: Rotates the hands to the top and right of the clock face
  Parameters: None
  Return: None
  */
	this.topRightHands = function()
	{
		if(hand1>270)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<270)
		{
			hand1 = hand1 + 2;
		}

		if(hand2 >0)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<0)
		{
		hand2 = hand2 + 2;
		}

	}

  /*
  Name: bottomLeftHands()
  Description: Rotates the hands to the bottom and left of the clock face
  Parameters: None
  Return: None
  */
	this.bottomLeftHands = function()
	{
		if(hand1>180)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<180)
		{
			hand1 = hand1 + 2;
		}

		if(hand2 >90)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<90)
		{
		hand2 = hand2 + 2;
		}

	}

  /*
  Name: bottomRightHands()
  Description: Rotates the hands to the bottom and right of the clock face
  Parameters: None
  Return: None
  */
	this.bottomRightHands = function()
	{
		if(hand1>0)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<0)
		{
			hand1 = hand1 + 2;
		}

		if(hand2 >90)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<90)
		{
		hand2 = hand2 + 2;
		}
	}

  /*
  Name: noHands()
  Description: Rotates both hands to 135 degrees. This is called when
               a clock is not used when forming a digit.
  Parameters: None
  Return: None
  */
	this.noHands = function()
	{

		if(hand1>135)
		{
			hand1 = hand1 - 2;
		}
		else if(hand1<135)
		{
		  hand1 = hand1 + 2;
		}

		if(hand2 >135)
		{
			hand2 = hand2 - 2;
		}
		else if(hand2<135)
		{
		hand2 = hand2 + 2;
		}

	}

}
