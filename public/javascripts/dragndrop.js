function allowDrop(ev) {
    ev.preventDefault();
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    console.log('ELement dropped');
    var data = ev.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);
    var dropTarget = ev.target;
    
    if ( hasClass(dropTarget,"player") || hasClass(dropTarget,"coach") ) {
        // drop in parent node
        //console.log('droppedElement: '+droppedElement.id+" hasClass(player) dropTarget:"+dropTarget.id);
        dropTarget = dropTarget.parentNode;
    }
    if (hasClass(dropTarget,"playerdrop")){
        dropTarget = dropTarget.parentNode;
    }
    if (hasClass(dropTarget,"coachdrop")){
        dropTarget = dropTarget.parentNode;
    }
    
    // two categories we want to prevent
    // dropping people on coachdiv and dropping coaches on players
    if( false ){
    }
    else if ( dropTarget.id == "coaches" && hasClass(droppedElement,"player")) {
        console.log('attempting to drop player on coaches');
    }
    else if ( hasClass(dropTarget,"players") && hasClass(droppedElement,"coach")) {
        console.log('attempting to drop coach on players');
    }
    else if ( hasClass(dropTarget,"nodrop") ){
    }
    else {
        console.log(dropTarget.id);
        dropTarget.appendChild(droppedElement);
    }
    ev.preventDefault();
}

function checkAlert(){
    alert("hey there");
}
