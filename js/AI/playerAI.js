var timeOutControl = []
UsingAI = true // Setting this to not show alerts
//I believe that variables will become maybe a field to be configuered by the user
var generations = 2
var population = 5
var speed = 1000



createTable() //Put this here to not be needed read the rules and click on the play button

function startAutoPlay(){
  var arrPopulation = []
  for( var genControl = 0; genControl < generations; genControl++ ){
    arrPopulation.push([])
    for( var popControl = 0; popControl < population; popControl++ ){
      arrPopulation[genControl].push( new playerSpecimen )
      arrPopulation[genControl][popControl].construct( genControl, popControl, 0 )
      arrPopulation[genControl][popControl] = specimenPlay( arrPopulation[genControl][popControl] )
      console.log( "Generation : "+ genControl + " Specimen Number: " + population + " Fitness: " + arrPopulation[genControl][popControl].fitness )
    }
  }
  console.log(arrPopulation)
}


function specimenPlay( specimen ){
  for ( var i = 0; i < 10000; i++ ) {
    timeOutControl = setInterval(function(){
      specimen.fitness = score + moves
      var alive = celClick( specimen.returnMove() )
      if( alive == false ){
        stopAutoPlay()
        return specimen
      }
    }, speed)
  }
  return specimen
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

class playerSpecimen{
  construct( generation, specimen, genome ){
    this.gen = generation
    this.specimen = specimen
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
      if( posWarrior >= 11 && posWarrior < 20 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) + 10 )
      }
    }else if(s >= 0.25 && s < 0.5){ // down
      cel = String( parseInt( posWarrior ) + 10 )
      if( posWarrior >= 90 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) - 10 )
      }
    }else if(s >= 0.5 && s < 0.75){ //left
      cel = String( parseInt( posWarrior ) - 1 )
      if( posWarrior.substring( 1, 2 ) == 1 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) + 1 )
      }
    }else if(s >= 0.75 && s < 1){ //right
      cel = String( parseInt( posWarrior ) + 1 )
      if( posWarrior.substring( 1, 2 ) == 9 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) - 1 )
      }
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
