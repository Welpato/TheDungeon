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
      updateGenerationInfo( genControl, popControl, 0, 0, 0)
      arrPopulation[genControl].push( new playerSpecimen )
      arrPopulation[genControl][popControl].construct( genControl, popControl, [] )
      arrPopulation[genControl][popControl] = specimenPlay( arrPopulation[genControl][popControl] )
      console.log( "Generation : "+ genControl + " Specimen Number: " + popControl + " Fitness: " + arrPopulation[genControl][popControl].fitness )
    }
  }
}

function specimenPlay( specimen ){
  var notMove = 0
  for ( var i = 0; i < 10000; i++ ) {
      specimen.fitness = score + moves
      if( notMove == 6 ){ //Doing this to control if the speciemen does nothing
        specimen.alive = false
        console.log('Died by not move')
        return specimen
      }
      var move = specimen.returnMove()
      if( move == 0 ){
        notMove++
      }else{
        specimen.alive = celClick( specimen.returnMove() )
        if( specimen.alive == false ){
          return specimen
        }
      }
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
        switch( $( document.getElementById( cel ).innerHTML ).attr( "id" ) ){
          case 'warrior':
            arrY.push( 1 )
          break
          case 'skeleton':
            arrY.push( 2 )
          break
          default:
            arrY.push( 0 )
          break
        }
        y++
      }
      enviroment.push( arrY )
      x++
    }
    return enviroment
}

function updateGenerationInfo( generation, specimen, fitnessGeneration, fitnessSpecimen, fitness ){
  $( "#generationInfo" ).text( "Generation: " + generation + " Specimen: " + specimen )
  $( "#bestFitnessInfo" ).text( "Best Fitness: "+ fitness + " Generation: " + fitnessGeneration + " Specimen: " + fitnessSpecimen )
}

class playerSpecimen{
  construct( generation, specimen, genome = [] ){
    this.gen = generation
    this.specimen = specimen
    this.neuralNetwork = new NeuralNetwork()

    /*
    Don't need this for now
    if( genome != [] ){
      //I will need to increase the number of synaptics but for now this is ok
      //Incressing the random generated number of the neural network to the better genomes of the last generation
      this.neuralNetwork.synaptic_weights += genome[ 0 ]
      this.neuralNetwork.synaptic_weights2 += genome[ 1 ]
      this.neuralNetwork.synaptic_weights3 += genome[ 2 ]
    }*/

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
        if( this.enviroment[x][y] == 1 ){
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
    var movement = this.neuralNetwork.think( this.enviroment )
    console.log( movement )//Discover why this is not working

    if( movement >= 0 && movement < 0.25 ){ // up
      cel = String( parseInt( posWarrior ) - 10 )
      if( posWarrior >= 11 && posWarrior < 20 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) + 10 )
      }
    }else if(movement >= 0.25 && movement < 0.5){ // down
      cel = String( parseInt( posWarrior ) + 10 )
      if( posWarrior >= 90 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) - 10 )
      }
    }else if(movement >= 0.5 && movement < 0.75){ //left
      cel = String( parseInt( posWarrior ) - 1 )
      if( posWarrior.substring( 1, 2 ) == 1 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) + 1 )
      }
    }else if(movement >= 0.75 && movement < 1){ //right
      cel = String( parseInt( posWarrior ) + 1 )
      if( posWarrior.substring( 1, 2 ) == 9 ){ // Adding this to prevent innerHTML errors
        cel = String( parseInt( posWarrior ) - 1 )
      }
    }/*else if(s >= 0.8 && s < 1){ //pass turn
      cel = String( parseInt( posWarrior ) )
    }*/
    return cel
  }
}
