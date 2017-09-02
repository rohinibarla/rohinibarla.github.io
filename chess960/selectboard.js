var list

// The initial method called on page load
function init() {
    // load details from data file
    loadDataAndParse('Chess960BoardStates.json');
    loadBoard();
    // window.alert('loaded');
}

function getGameWithId(event) {
    
    event.preventDefault()
    
    // read the board id, and clear it from UI
    var boardId = document.getElementById("chess960id").value
    document.getElementById("chess960id").value = ''
    
    var details;// = "Not Found" 

    var position = findWithBoardId(boardId)
    if (position != -1) {
        // found the item
        // update details
        details = detailsOfChessBoard(position)
    }
    //$('.cbdiagram').attr('data-fen', list[position].fen);

    document.getElementById("chessGamePlay").innerHTML = details;
    loadBoard();

}

function loadDataAndParse(fileName) {

    function parseContents(fileContents) {
        // Parse JSON string into object
        list = JSON.parse(fileContents)
        console.log(list)
    }

    loadContents(fileName, parseContents)
}

// To load contents of a file
function loadContents(fileName, callback){

    var httpRequest = new XMLHttpRequest()

    function onStateChange() {
        if(httpRequest.readyState === 4 ){
            callback(httpRequest.responseText)
        }
    }

    httpRequest.onreadystatechange = onStateChange
    httpRequest.open('GET', fileName, true)
    httpRequest.send()
}

// To find the board with id in the list
// return
//   position when found
//   -1 when not found
function findWithBoardId(boardId) {
    for (var i = 0; i < list.length; i++) {
        if (boardId == list[i].sp) {
            // found the board 
            return i
        }
    }
    return -1
}

function detailsOfChessBoard(index) {
   var details = '<div class="cbdiagram" data-size="800" data-fen="';
   details += list[index].fen;
   details += '" data-legend="960 Moves."';
   details += ' data-title="Mine Finally">';
   details += '</div>';
   
   return details
}
