var lang = 'pt-BR'
var floor = '<img height="30" width="30" src="img/floor.png">'
var warrior = '<img id="warrior" height="30" width="30" src="img/warrior.png">'
var tree = '<img id="tree" height="30" width="30" src="img/tree.png">'
var skeleton = '<img id="skeleton" height="30" width="30" src="img/skeleton.png">'
var turnCount = 3
var breakCount = 3
var moves = 0
var enemies = 4
var enemiesCount = 5
var level = 1
var score = 0
var UsingAI = false

function createTable( restart = true ){
	if( restart ){
		moves = 0
		level = 1
		refreshScore( score = 0, turnCount = 3, breakCount = 3 )
	}else{
		level++
		refreshScore( score, turnCount = 3, breakCount = 3 )
	}
	enemiesCount = enemies + level
	var xc = 1
	var yc = 1
	HTML = "<table class='table table-bordered row'>"
	while( yc <= 9 ){
		HTML= HTML.concat("<tr>")
		xc = 1
		while( xc <= 9 ){
			HTML = HTML.concat( '<td href="#" onClick="celClick(this.id);" style="background-image:url(img/floor.png);background-size:47px 47px; width: 47px; height: 47px;" id="' )
			HTML = HTML.concat( yc )
			HTML = HTML.concat( xc )
			HTML = HTML.concat( '"></td>' )
			xc++
		}
		HTML = HTML.concat( "</tr>" )
		yc++;
	}
	HTML = HTML.concat( "</table>" )
	$( "#gameArea" ).text( '' )
	$( "#gameArea" ).append(HTML)
	fillTable()
	beginningText = false
	changeTexts()
}

function celClick( cel ){
	var celValue = $( document.getElementById( cel ).innerHTML ).attr( "id" )
	var moveRealized = false
	if( celValue == 'warrior' ){
		if( passTurn() ){
			moveRealized = true
		}
	}else if( celValue == 'tree' ){
		var pos = verifyPos( cel,'warrior' )
		if( pos != false && treeBreak() ){
			$( "#" + cel ).text( "" )
			moveRealized = true
		}
	}else if( celValue == undefined || celValue == 'skeleton' ){
		var posOri = verifyPos( cel, 'warrior' )
		if( posOri != false ){
			if( celValue == 'skeleton' ){
				refreshScore( score += 50, turnCount, breakCount )
				enemiesCount--
			}
			$( "#" + posOri ).text( "" )
			$( "#" + cel ).html( warrior )

			moveRealized = true
		}
	}
	if( moveRealized ){
		return moveEnemies()
	}
	return false
}

function verifyPos( cel, verifyValue ){
	if( $( $( "#" + cel[0].toString() + ( parseInt( cel[1] ) - 1 ).toString() ).html() ).attr( "id" ) == verifyValue ){
		return cel[0].toString() + ( parseInt( cel[1] ) - 1 ).toString()
	}else if( $( $( "#" + cel[0].toString() + ( parseInt( cel[1] ) + 1 ).toString() ).html() ).attr( "id" ) == verifyValue ){
		return cel[0].toString() + ( parseInt( cel[1] ) + 1 ).toString()
	}else if( $( $( "#" + ( parseInt( cel[0] ) - 1 ).toString() + cel[1].toString() ).html() ).attr( "id" ) == verifyValue ){
		return (parseInt( cel[0] ) - 1 ).toString() + cel[1].toString()
	}else if( $( $( "#" + ( parseInt( cel[0] ) + 1 ).toString() + cel[1].toString() ).html() ).attr( "id" ) == verifyValue ){
		return ( parseInt( cel[0]) + 1 ).toString() + cel[1].toString()
	}else{
		return false
	}
}

function passTurn(){
	if( turnCount > 0 ){
		turnCount--
		refreshScore( score-= 30, turnCount, breakCount )
		return true
	}
	else{
		alert( textMessages.usedTurns )
		return false
	}
}

function treeBreak(){
	if( breakCount > 0 ){
		breakCount--
		refreshScore( score, turnCount, breakCount )
		return true
	}
	else{
		alert( textMessages.usedTrees )
		return false
	}
}

function fillTable(){
	$( '#14' ).html( warrior )
	i = 0
	var rand = 0
	while( i < enemiesCount ){
		rand = Math.floor( ( Math.random() * 100 ) + 1 )
		if( rand >= 30 && rand < 100 && rand.toString()[1] != '0' ){
			if( $( "#" + rand ).html() == "" ){
				$( "#" + rand ).html( skeleton )
				i++
			}
		}
	}
	var treeTotal = 30 - enemiesCount
	treeTotal = 0 //Only for the early development of the AI
	c = 0
	while( c < treeTotal ){
		rand = Math.floor( ( Math.random() * 100 ) + 1 )
		if( rand >= 20 && rand < 100 && rand.toString()[1] != '0' ){
			if( $( "#" + rand ).html() == "" ){
				$( "#" + rand ).html( tree )
				c++
			}
		}
	}
}

function moveEnemies(){
	if( enemiesCount == 0 ){
		createTable( false )
	}else{
		var yc = 1
		moves++
		var alreadyMoved = []
		var rand = 0
		while( yc <= 9 ){
			var xc = 1
			while( xc <= 9 ){
				if( $( $( "#" + yc.toString() + xc.toString() ).html() ).attr( "id" ) == 'skeleton' && alreadyMoved.indexOf( yc.toString() + xc.toString() ) == -1 ){
					if( verifyPos( yc.toString() + xc.toString(), 'warrior' ) ){
						if( UsingAI == false ){
							alert( textMessages.youlose )
						}
						createTable()
						return false
						break
					}else{
						rand = Math.floor( ( Math.random() * 100 ) + 1 )
						if( rand >= 0 && rand <= 25 ){//Down
							if( yc != 9 && $( $( "#" + ( yc + 1 ).toString() + xc.toString() ).html() ).attr( "id" ) != 'skeleton'
										&& $( $( "#" + ( yc + 1 ).toString() + xc.toString() ).html() ).attr( "id" ) != 'tree' ){
								$( "#" + yc.toString() + xc.toString() ).text("")
								$( "#" + ( yc + 1 ).toString() + xc.toString() ).html( skeleton )
								alreadyMoved.push( ( yc + 1 ).toString() + xc.toString() )
							}
						}else if( rand > 25 && rand <= 50 ){//Up
							if( yc != 1 && $( $( "#" + ( yc - 1 ).toString() + xc.toString() ).html() ).attr("id") != 'skeleton'
										&& $( $( "#" + ( yc - 1 ).toString() + xc.toString() ).html() ).attr( "id" ) != 'tree' ){
								$( "#" + yc.toString() + xc.toString() ).text( "" )
								$( "#" + ( yc - 1 ).toString() + xc.toString() ).html( skeleton )
								alreadyMoved.push( ( yc - 1 ).toString() + xc.toString() )
							}
						}else if( rand > 50 && rand <= 75 ){//Right
							if( xc != 9 && $( $( "#" + yc.toString() + ( xc + 1 ).toString() ).html() ).attr( "id" ) != 'skeleton'
										&& $( $( "#" + yc.toString() + ( xc + 1 ).toString() ).html() ).attr( "id" ) != 'tree' ){
								$( "#" + yc.toString() + xc.toString() ).text("")
								$( "#" + ( yc ).toString() + ( xc + 1 ).toString() ).html( skeleton )
								alreadyMoved.push( ( yc ).toString() + ( xc + 1 ).toString() )
							}
						}else if( rand > 75 && rand <= 100 ){//Left
							if( xc != 1 && $( $( "#" + yc.toString() + ( xc - 1 ).toString() ).html() ).attr( "id" ) != 'skeleton'
										&& $( $( "#" + yc.toString() + ( xc - 1 ).toString() ).html() ).attr("id" ) != 'tree' ){
								$( "#" + yc.toString() + xc.toString() ).text( "" )
								$( "#" + yc.toString() + ( xc - 1 ).toString() ).html( skeleton )
								alreadyMoved.push( ( yc ).toString() + ( xc - 1 ).toString() )
							}
						}
					}
				}
				xc++
			}
			yc++
		}
		refreshScore( score, turnCount, breakCount )
		return true
	}

}

function refreshScore( valueScore, valueTurn, valueTreeBreak ){
	$( "#score" ).text( textMessages.score + valueScore + textMessages.level + level + textMessages.moves + moves +
					 textMessages.pTurn + valueTurn + textMessages.bTree + valueTreeBreak )
}
