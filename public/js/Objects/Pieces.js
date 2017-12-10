//////////////////////////////////////////////////////
// Class: Piece										//
// Description: Using the javascript prototype, you //
// can make faux classes. This allows objects to be //
// made which act like classes and can be referenced//
// by the game.										//
//////////////////////////////////////////////////////
// Piece constructor
// creates and initializes each Piece object
function Piece(board,player,cellRow,cellCol,type,color){
    /*this.board = board;			// piece needs to know the svg board object so that it can be attached to it.
    this.player = player;		// piece needs to know what player it belongs to.
    this.type = type;			// piece needs to know what type of piece it is. (put in so it could be something besides a checker!)
    this.current_cell = null    //game.boardArr[cellRow][cellCol];	// piece needs to know what its current cell/location is.
    //id looks like 'piece_0|3' - for player 0, the third piece
    this.id = "piece_" + this.player + "|" + this.number;	// the piece also needs to know what it's id is.
    this.x=cellRow//this.current_cell.getCenterX();						// the piece needs to know what its x location value is.
    this.y=cellCol//this.current_cell.getCenterY();						// the piece needs to know what its y location value is as well.
    //this.object = eval("new " + type + "(this)");	//eval I wrote in class because I was lazy - better on next line
    this.pieceColor = color;

    this.object=new window[type](this);				// based on the piece type, you need to create the more specific piece object (Checker, Pawn, Rook, etc.)
    this.piece = this.object.piece;					// a shortcut to the actual svg piece object
    this.setAtt("id",this.id);						// make sure the SVG object has the correct id value (make sure it can be dragged)
    if(this.player == 'playerId'){
        this.piece.addEventListener('mousedown',function(){ drag.setMove(this.id);},false);	// add a mousedown event listener to your piece so that it can be dragged.
    }else{
        this.piece.addEventListener('mousedown',util.nypwarning,false);	//tell the user that isn't his piece!
    }
    //this.piece.addEventListener('mousedown',function(){ document.getElementById('output2').firstChild.nodeValue=this.id;},false); 	//for testing purposes only...
    document.getElementsByTagName('svg')[0].appendChild(this.piece);

    // return this piece object
    return this;*/


    this.board = board;			// piece needs to know the svg board object so that it can be attached to it.
    this.player = player;		// piece needs to know what player it belongs to.
    this.type = type; // piece needs to know what type of piece it is. (put in so it could be something besides a checker!)
    if(cellRow > 20){ this.current_cell = game.boardArr[0][0];	// piece needs to know what its current cell/location is.
    }else{
        this.current_cell = game.boardArr[cellRow][cellCol];	// piece needs to know what its current cell/location is.
    }
    //this.number = num;			// piece needs to know what number piece it is.
    //this.isCaptured = false;	// a boolean to know whether the piece has been captured yet or not.
    this.pieceColor = color;
    //id looks like 'piece_0|3' - for player 0, the third piece
    this.id = "piece_" + this.player;	// the piece also needs to know what it's id is.
    this.current_cell.isOccupied(this.id);			//set THIS board cell to occupied
    this.x= (cellRow>20) ? cellRow : this.current_cell.getCenterX();						// the piece needs to know what its x location value is.
    this.y= (cellRow>20) ? cellCol : this.current_cell.getCenterY();						// the piece needs to know what its y location value is as well.

    //this.object = eval("new " + type + "(this)");	//eval I wrote in class because I was lazy - better on next line
    this.object=new window[type](this);				// based on the piece type, you need to create the more specific piece object (Checker, Pawn, Rook, etc.)
    this.piece = this.object.piece;					// a shortcut to the actual svg piece object
    this.setAtt("id",this.id);						// make sure the SVG object has the correct id value (make sure it can be dragged)


    console.log("this player id :" + this.player, game.thisPlayer.id);
    if(this.player == game.thisPlayer.id){
        this.piece.addEventListener('mousedown',function(){ drag.setMove(this.id);},false);	// add a mousedown event listener to your piece so that it can be dragged.
      }else{
          this.piece.addEventListener('mousedown',util.warning,false);	//tell the user that isn't his piece!
    }
    //this.piece.addEventListener('mousedown',function(){ document.getElementById('output2').firstChild.nodeValue=this.id;},false); 	//for testing purposes only...
    document.getElementsByTagName('svg')[0].appendChild(this.piece);

    // return this piece object
    return this;
}

Piece.prototype={
    //change cell (used to move the piece to a new cell and clear the old)
    changeCell:function(newCell,row,col){
        this.current_cell.notOccupied();
        // document.getElementById('output').firstChild.nodeValue='dropped cell: '+newCell;
        this.current_cell = game.boardArr[row][col];
        this.current_cell.isOccupied(this.id);
    },
    //when called, will remove the piece from the document and then re-append it (put it on top!)
    putOnTop:function(){
        console.log('I got called.', this.piece);
        document.getElementsByTagName('svg')[0].removeChild(this.piece);
        document.getElementsByTagName('svg')[0].appendChild(this.piece);
    },
    //will record that I'm now a king and change the one on the screen
    kingMe:function(id){
        this.isKing=true;
        document.getElementById(this.id+'K').setAttributeNS(null,'opacity','0.7');
    },
    // function that allows a quick setting of an attribute of the specific piece object
    setAtt:function(att,val){
        this.piece.setAttributeNS(null,att,val);
    }
}

// Checker constructor
function Checker(parent) {
    this.parent = parent;		//I can now inherit from Piece class												// each Checker should know its parent piece object
    this.parent.isKing = false;														// each Checker should know if its a 'King' or not (not a king on init)
    this.piece = document.createElementNS(game.svgns,"g");	// each Checker should have an SVG group to store its svg checker in
    if(this.parent.player == 'playerId'){
        this.piece.setAttributeNS(null,"style","cursor: pointer;");						// change the cursor
    }
    this.piece.setAttributeNS(null,"transform","translate("+this.parent.x+","+this.parent.y+")");

    // create the svg 'checker' piece.
    var circ = document.createElementNS(game.svgns,"circle");
    circ.setAttributeNS(null,"r",'25');
    circ.setAttributeNS(null,"class",'player' + this.parent.player);					// change the color according to player
    this.piece.appendChild(circ);												// add the svg 'checker' to svg group
    //create more circles to prove I'm moving the group (and to make it purty)
    var circ = document.createElementNS(game.svgns,"circle");
    circ.setAttributeNS(null,"r",'18');
    circ.setAttributeNS(null,"fill",'white');
    circ.setAttributeNS(null,"opacity",'0.3');
    this.piece.appendChild(circ);
    var circ = document.createElementNS(game.svgns,"circle");
    circ.setAttributeNS(null,"r",'10');
    circ.setAttributeNS(null,"fill",'white');
    circ.setAttributeNS(null,"opacity",'0.3');
    this.piece.appendChild(circ);
    var K = document.createElementNS(game.svgns,"polygon");
    K.setAttributeNS(null,"points",'-15,-10 -8,10 8,10 15,-10 7,0 0,-18 -7,0');
    K.setAttributeNS(null,"stroke",'black');
    K.setAttributeNS(null,"fill",'gold');
    K.setAttributeNS(null,"stroke-width",'3px');
    K.setAttributeNS(null,"opacity",'0');
    K.setAttributeNS(null,"id",this.parent.id+'K');
    this.piece.appendChild(K);

    // return this object to be stored in a variable
    return this;
}

//to king me:
//getPiece('piece_1|0').kingMe()

function SnakeLadder(parent) {
    this.parent = parent;
    this.piece = document.createElementNS(game.svgns, 'g');
    if(this.parent.player == 'playerId'){
        this.piece.setAttributeNS(null, 'style','cursor: pointer');
    }
    this.newCord1 = this.parent.x;
    this.newCord2 = this.parent.y;

    this.piece.setAttributeNS(null, 'transform', 'translate('+ this.newCord1+','+this.newCord2+')');
    //this.piece.setAttributeNS(null,"opacity",'0.5');

    //create the svg snakeLadder piece.
    var circ = document.createElementNS(game.svgns,"circle");
    circ.setAttributeNS(null,"r",'20');
    circ.setAttributeNS(null,"fill", this.parent.pieceColor);
    console.log(this.parent.pieceColor);
    circ.setAttributeNS(null,"opacity",'0.8');
    this.piece.appendChild(circ);
    var circ = document.createElementNS(game.svgns,"circle");
    circ.setAttributeNS(null,"r",'10');
    circ.setAttributeNS(null,"fill",'#D93636');
    circ.setAttributeNS(null,"opacity",'0.4');
    this.piece.appendChild(circ);
    var circ = document.createElementNS(game.svgns,"circle");
    circ.setAttributeNS(null,"r",'5');
    circ.setAttributeNS(null,"fill",'#EA9090');
    circ.setAttributeNS(null,"opacity",'0.2');
    this.piece.appendChild(circ);
    return this;
}