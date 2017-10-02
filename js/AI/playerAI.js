//-------- PLAYER AI SCRIPT --------------------------
var timeOutControl = []
var generations = 10
var population = 50
var speed = 1000

createTable() //Put this here to not be needed read the rules and click on the play button

function startAutoPlay(){
  player = new playerSpiece
  player.construct( 0,0,0 )
  var i = 0
  while ( i < 10000 ) {
    (function( i ) {
      timeOutControl.push( setTimeout( function() {
        alive = celClick( player.returnMove() )
        if( alive == false ){
          stopAutoPlay()
        }
    }, speed * i ))
    })( i++ )
  }
}

function stopAutoPlay(){
  for( var time in timeOutControl ){
    clearTimeout( time )
  }
}

function getEnviroment(){
    enviroment = []
    x = 1
    while( x <= 9 ){
      y = 1
      arrY = []
      while( y <= 9 ){
        cel = x + '' + y
        arrY.push( $( document.getElementById( cel ).innerHTML ).attr( "id" ) )
        y++
      }
      enviroment.push( arrY )
      x++
    }
    return enviroment
}

class playerSpiece{
  construct( generation, specie, genome ){
    this.gen = generation
    this.specie = specie
    this.genome = genome
    this.fitness = 0
    this.enviroment = getEnviroment()
    this.alive = true
  }

  addFitness( addedValue ){
    this.fitness +=  addedValue
  }

  warriorPosition(){
    x = 0
    while( x <= 8 ){
      y = 0
      while( y <= 8 ){
        if( this.enviroment[x][y] == "warrior" ){
           return ( x + 1 ) + "" + ( y + 1 )
        }
        y++
      }
      x++
    }
  }

  returnMove(){
    this.enviroment = getEnviroment()
    var posWarrior = this.warriorPosition()
    var s = Math.random()
    if( s >= 0 && s < 0.25 ){ // up
      cel = String( parseInt( posWarrior ) - 10 )
    }else if(s >= 0.25 && s < 0.5){ // down
      cel = String( parseInt( posWarrior ) + 10 )
    }else if(s >= 0.5 && s < 0.75){ //left
      cel = String( parseInt( posWarrior ) - 1 )
    }else if(s >= 0.75 && s < 1){ //right
      cel = String( parseInt( posWarrior ) + 1 )
    }/*else if(s >= 0.8 && s < 1){ //pass turn
      cel = String( parseInt( posWarrior ) )
    }*/
    return cel
  }

  sigmoid( x, deriv = false ){
    if( deriv == true ){
      return ( x * ( 1 - x ) )
    }
    return 1 / ( 1 + pow ( -x ) )
  }
}
