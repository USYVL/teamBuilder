var dragCounter = 0;

function allowDrop(ev) {
    //ev.target.style.opacity = '0.2';
    ev.preventDefault();
}

function hasAnyClass(element,classlist){
  // loop over classlist
  var arrayLength = classlist.length;
  for(var i = 0; i < arrayLength; i++){
    //
    if ( hasClass(element,classlist[i])) return (true);
  }
  return (false);
}
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function drag(ev) {
    ev.target.style.opacity = '0.5';  // this / e.target is the source node.
    ev.dataTransfer.setData("text", ev.target.id);
}

function handleDragEnd(ev){  // the dragged item has been dropped
  ev.target.style.opacity = '1.0';  // this / e.target is the source node.
}
function handleDragEnter(ev){  // dragged item has entered dropZone
  dragCounter++;
  var myFuncStr = 'handleDragEnter: ';
  var myTarget;
  // hmmm, actually need some of the same logic as in the drop
  if (hasAnyClass(ev.target,['player','coach','playerdrop','coachdrop','nodrop'])){
    myTarget = ev.target.parentNode;
    console.log(myFuncStr+' '+ev.target.id+' has one of the classes. dragCounter: '+dragCounter);
    console.log(myTarget);
  }
  else {
    console.log(myFuncStr+' '+ev.target.id+' doesnt have one of the classes. dragCounter: '+dragCounter);
    myTarget = ev.target;
  }
  if (dragCounter !== 0 ) { myTarget.style.borderStyle = 'dashed'; }// this / e.target is the source node.
}
function handleDragLeave(ev){   // dragged item has left dropZone
  dragCounter--;
  var myFuncStr = 'handleDragLeave ';
  var myTarget;
  // hmmm, actually need some of the same logic as in the drop
  if (hasAnyClass(ev.target,['player','coach','playerdrop','coachdrop','nodrop'])){
    myTarget = ev.target.parentNode;
    console.log(myFuncStr+' '+ev.target.id+' has one of the classes. dragCounter: '+dragCounter);
    console.log(myTarget);
  }
  else {
    console.log(myFuncStr+' '+ev.target.id+' doesnt have one of the classes. dragCounter: '+dragCounter);
    myTarget = ev.target;
  }
  if (dragCounter === 0) { myTarget.style.borderStyle = 'solid'; } // this / e.target is the source node.
}
function drop(ev) {
    var myTarget;
    dragCounter = 0;
    console.log('ELement dropped.  dragCounter: '+dragCounter);
    var data = ev.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);
    //ev.target.style.opacity = '1.0';  // return the drop zone to full opacity
    ev.target.style.borderStyle = 'solid';  // this / e.target is the source node.
    console.log('droppedElement');
    console.log(droppedElement);
    // we could likely do this more cleanly with a dragEnd handler
    //droppedElement.style.opacity = '1.0';

    // possibly generalize this so that we crawl up the tree till we get a node
    // that has the correct class
    var dropTarget = ev.target;

    // inverse function of below, trying to find parent of the desired drop type
    while (! hasAnyClass(dropTarget,['team','players','coaches'])){
        dropTarget = dropTarget.parentNode;
    }
    myTarget = dropTarget;

    // if (hasAnyClass(dropTarget,['player','coach','playerdrop','coachdrop','nodrop'])){
    //   myTarget = dropTarget.parentNode;
    //   // console.log(myFuncStr+' '+dropTarget.id+' has one of the classes. dragCounter: '+dragCounter);
    //   // console.log(myTarget);
    // }
    // else {
    //   // console.log(myFuncStr+' '+dropTarget.id+' doesnt have one of the classes. dragCounter: '+dragCounter);
    //   myTarget = dropTarget;
    // }

    // two categories we want to prevent
    // dropping people on coachdiv and dropping coaches on players
    if( false ){
    }
    else if ( hasClass(myTarget,"coaches") && hasClass(droppedElement,"player")) {
        console.log('attempting to drop player on coaches');
    }
    else if ( hasClass(myTarget,"players") && hasClass(droppedElement,"coach")) {
        console.log('attempting to drop coach on players');
    }
    else if ( hasClass(myTarget,"nodrop") ){
    }
    else {
        console.log(myTarget.id);
        // want to insert coaches at top of the list
        // we use appendChild, but we may want to order the drops (ie: coaches at top,
        // players below).  insertBefore(firstChild) works, but puts the coaches
        // above the Team label.  Need to insert after the team-gender, or before first player
        if ( hasClass(droppedElement,"coach")){
            // hmmmm, if we don't have a player element, this still seems to work, not sure why though
            myTarget.insertBefore(droppedElement,myTarget.getElementsByClassName('player')[0]);
        }
        else {
            myTarget.appendChild(droppedElement);
        }
        // ideally should count coach and player children and update text to reflect that
        // ummmm, this works ONLY if it's a team node
        updateTeamInfo(myTarget);
    }
    myTarget.style.borderStyle = 'solid';
    ev.preventDefault();
}

function checkAlert(){
    alert("hey there");
}

function handleDragStart(e) {
  //alert('Firing Off DragStart');
  this.style.opacity = '0.4';  // this / e.target is the source node.
}

function updateTeamInfo(target){
    if ( ! hasClass(target,'team')) return 1;
  var numKids = target.children.length;
  var numPlayers = 0;
  var numCoaches = 0;
  var numM = 0;
  var numF = 0;
  console.log('  numKids: '+numKids);
  for (var i = 0; i < numKids; i++){
    child = target.children[i];
    if (hasClass(child,'player'))          numPlayers++;
    if (hasClass(child,'coach'))           numCoaches++;
    if (hasClass(child,'player-gender-F')) numF++;
    if (hasClass(child,'player-gender-M')) numM++;
  }
  console.log('    '+target.id+' numCoaches: '+numCoaches+', numPlayers: '+numPlayers);
  console.log(target);
  //target.innerHTML = "Yo, dude";
  // want to find a specific div below the target
  target.getElementsByClassName('team-info')[0].innerHTML = "Coaches: "+numCoaches+', Players: '+numPlayers;
  target.getElementsByClassName('team-gender')[0].innerHTML = numF+'F, '+numM+'M';

  //infoTarget.innerHTML = "Yo Dude";
}

// var coachesQSA = document.querySelectorAll('.coach');
// [].forEach.call(cols, function(col) {
//   col.addEventListener('dragstart', handleDragStart, false);
// });
// var playersQSA = document.querySelectorAll('.player');
// [].forEach.call(cols, function(col) {
//   col.addEventListener('dragstart', handleDragStart, false);
// });
