gen = 0
genome = 0
species = 0

class playerSpiece(){
  construct(gen, genome, specie, enviroment){
    this.gen = gen
    this.genome = genome
    this.specie = specie
    this.fitness = 0
    this.enviroment = enviroment

  }

  function returnMove(){
    x = 0

    if(x >= 0 && x < 0.17){ // up

    }else if(x >= 0.17 && x < 0.33){ // down

    }else if(x >= 0.33 && x < 0.49){ //left

    }else if(x >= 0.49 && x < 0.65){ //right

    }else if(x >= 0.65 && x < 0.8){ //break tree
      //one problem... what is the position of the tree that we will break?
    }else if(x >= 0.8 && x < 1){ //pass turn

    }

  }


}

function sigmoid(x, deriv=false){
  if(deriv == true){
    return (x*(1-x))
  }
  return 1/(1+pow(-x))
}
