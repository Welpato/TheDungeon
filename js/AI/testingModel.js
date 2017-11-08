var timeOutControl = []

function startAutoPlay(){
  var player = new playerSpecimen
  player.construct( 0, 0 )
  player.useModel()

  var i = 0;
  while ( i < 10000 ) {
    (function( i ) {
      timeOutControl.push( setTimeout( function() {
        alive = celClick( player.returnMove() )
        if( alive == false ){
          stopAutoPlay()
        }
    }, 1000 * i ))
    })( i++ )
  }
}

function stopAutoPlay(){
  for( var time in timeOutControl ){
    clearTimeout( time )
  }
}
