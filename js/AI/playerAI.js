UsingAI = true // Setting this to not show alerts
//I believe that variables will become maybe a field to be configuered by the user
var generations = 100
var population = 20 //Try to use only pair numbers

var bestFit = 0
var bestGen = 0
var bestSpeciemen = 0

createTable() //Put this here to not be needed read the rules and click on the play button

function startEvolution(){
  var arrPopulation = []
  for( var genControl = 0; genControl < generations; genControl++ ){
    if( genControl != 0 ){
      arrPopulation.push( evolve( arrPopulation[ genControl - 1 ] ) )
    }else{
      arrPopulation.push([])
    }
    for( var popControl = 0; popControl < population; popControl++ ){
      if( genControl == 0 ){
        arrPopulation[ genControl ].push( new playerSpecimen )
        arrPopulation[ genControl ][ popControl ].construct( genControl, popControl )
      }
      arrPopulation[ genControl ][ popControl ] = specimenPlay( arrPopulation[ genControl ][ popControl ] )
      console.log( "Generation : "+ genControl + " Specimen Number: " + popControl + " Fitness: " + arrPopulation[ genControl ][ popControl ].fitness )
    }
  }
  bestOfGeneration( arrPopulation[ generations-1 ] )
  console.log( "Generation: " + bestGen + " Specimen: " + bestSpeciemen + " Fitness: "+ bestFit)
  saveModel( arrPopulation[ bestGen ][ population - 1 ] )
  console.log(arrPopulation)
}

function evolve( generation ){
  var newGeneration = new Array()
  var halfPop = population / 2
  var bestSpeciemens = bestOfGeneration( generation )
  var specControl = 0
  for( var i = 0; i < halfPop; i++ ){
    var newPlus = Object.assign( new playerSpecimen, generation[ i ] )
    newPlus.fitness = 0
    newPlus.gen += 1
    newPlus.alive = true
    newPlus.neuralNetwork.evolveSynaptics( true )

    var newMinus = Object.assign( new playerSpecimen, generation[ i ] )
    newMinus.fitness = 0
    newMinus.gen += 1
    newMinus.alive = true
    newMinus.neuralNetwork.evolveSynaptics( false )

    newPlus.specimen = specControl
    specControl++
    newMinus.specimen = specControl
    specControl++
    newGeneration.push( newPlus )
    newGeneration.push( newMinus )
  }
  return newGeneration
}

function bestOfGeneration( generation ){
  var control = population -1
  while( control >= 0 ){
    past = control - 1
    while( past >= 0 ){
      if( generation[ control ].fitness < generation[ past ].fitness ){
        var x = generation[ control ]
        generation[ control ] = generation[ past ]
        generation[ past ] = x
      }
      past -= 1
    }
    control -= 1
  }

  var bestOfGeneration = new Array()
  var bestNumber = population / 2
  for( var i = 0; i < bestNumber; i++ ){
    bestOfGeneration.push( generation[ population - 1 - i ] )
    if( generation[ population - 1 - i ].fitness > bestFit ){
      bestFit = generation[ population - 1 - i ].fitness
      bestGen = generation[ population - 1 - i ].gen
      bestSpeciemen = generation[ population - 1 - i ].specimen
    }
  }
  return Object.assign( new playerSpecimen , bestOfGeneration )
}

function specimenPlay( specimen ){
  var notKill = 0
  var enemies = enemiesCount
  for ( var i = 0; i < 10000; i++ ) {
      specimen.fitness = score
      specimen.alive = celClick( specimen.returnMove() )

      //All this process is to prevent the network to learn that is better to just run from the enemies
      if( enemies == enemiesCount ){
        notKill++
        if( notKill == 10 ){
          specimen.alive = false
          console.log('Died for not killing')
          return specimen
        }
      }else{
        notKill = 0
        enemies = enemiesCount
        if( specimen.alive == false ){
          return specimen
        }
      }
  }
  return specimen
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

function matrixToLine( array ){
  var arrayResult = new Array()
  for( var x in array ){
    for( var y in array ){
      arrayResult.push( array[ x ][ y ] )
    }
  }
  return arrayResult
}

/*TODO: I need to find a better way to save the best model, saving it directly on the models folder*/
function saveModel( model ) {
  var textModel = 'var model_synaptic_weight = [ '
  var first = true
  for( var line in model.neuralNetwork.synaptic_weights ){
    if( first == true ){
      first = false
    }else{
      textModel += ','
    }
    textModel += '['+model.neuralNetwork.synaptic_weights[ line ]+']\n \n'
  }
  textModel += '] \n \n'

  textModel += 'var model_synaptic_weight2 = [ '
  first = true
  for( var line in model.neuralNetwork.synaptic_weights2 ){
    if( first == true ){
      first = false
    }else{
      textModel += ','
    }
    textModel += '['+model.neuralNetwork.synaptic_weights2[ line ]+']\n \n'
  }
  textModel += '] \n \n'

  textModel += 'var model_synaptic_weight3 = [ '
  first = true
  for( var line in model.neuralNetwork.synaptic_weights3 ){
    if( first == true ){
      first = false
    }else{
      textModel += ','
    }
    textModel += '['+model.neuralNetwork.synaptic_weights3[ line ]+']\n \n'
  }
  textModel += '] \n \n'

  textModel += 'var model_synaptic_weight4 = [ '
  first = true
  for( var line in model.neuralNetwork.synaptic_weights4 ){
    if( first == true ){
      first = false
    }else{
      textModel += ','
    }
    textModel += '['+model.neuralNetwork.synaptic_weights4[ line ]+']\n \n'
  }
  textModel += '] \n \n'

  var blob = new Blob([ textModel ], { type: "text/plain;charset=utf-8" } )
  var a = document.createElement( "a" )
  var url = URL.createObjectURL( blob )
  a.href = url
  a.download = 'model.js'
  document.body.appendChild( a )
  a.click()
  setTimeout( function() {
      document.body.removeChild( a )
      window.URL.revokeObjectURL( url )
  }, 0 )

 }

class playerSpecimen{
  construct( generation, specimen){
    this.gen = generation
    this.specimen = specimen

    this.neuralNetwork = new NeuralNetwork()

    this.fitness = 0
    this.enviroment = getEnviroment()
    this.alive = true
  }

  useModel(){
    this.neuralNetwork.synaptic_weights = model_synaptic_weight
    this.neuralNetwork.synaptic_weights2 = model_synaptic_weight2
    this.neuralNetwork.synaptic_weight3 = model_synaptic_weight3
    this.neuralNetwork.synaptic_weight4 = model_synaptic_weight4
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
    var movement = this.neuralNetwork.think( matrixToLine( this.enviroment ) )

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
