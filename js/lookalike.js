var board=document.querySelector('#board')
var colors=document.querySelector('#colors')
var gameover=document.querySelector('#game-over')
var tally=document.querySelector('.moves')
var total=document.querySelector('.total')
var colorArray=['a','b','c','d','e','f','g','h','i','j']
var running=!1
var cell='-x'
var skill=7
var moves=0
var cap=30
var color
var shuffle=function(collection){for(var i=collection.length;i;i--){var j=Math.floor(Math.random()*i);[collection[i-1],collection[j]]=[collection[j],collection[i-1]]}
    return collection}
var setColors=function(collection,n){console.log(collection)
    return n<8?shuffle(collection).slice(0,n):collection}
var checkWin=function(moves){let n=0
    let msg=''
    if(moves<=cap){if(board.childNodes[63].className.indexOf(cell)>-1){for(var i=0;i<64;i++){if(board.childNodes[i].className.indexOf(cell)>-1){n++}}}
        if(n===64){msg='<div class="new-game">You Win!</div>'
            running=!1}else if(n<64&&moves>=cap){msg='<div class="new-game">Try Again !</div>'
            running=!1}}
    if(!running){gameover.innerHTML=msg}}
var checkColor=function(color){var tiles=board.childNodes
    for(var x=0;x<64;x++){if(tiles[x].className.indexOf(cell)>-1){tiles[x].className=color+cell
        if(x+1<64&&tiles[x+1].className===color){tiles[x+1].className+=cell}
        if(x+8<64&&tiles[x+8].className===color){tiles[x+8].className+=cell}
        if(x-1>=0&&x%8>0&&tiles[x-1].className===color){tiles[x-1].className+=cell}
        if(x-8>=0&&x%8>0&&tiles[x-8].className===color){tiles[x-8].className+=cell}}}}
var builder=function(container,element,collection,count,randomize){container.innerHTML=''
    count=count||collection.length
    randomize=randomize||!1
    for(var i=0;i<count;i++){var child=document.createElement(element)
        child.className=randomize?collection[Math.floor((Math.random()*collection.length))]:collection[i]
        container.appendChild(child)}}
var newGame=function(){var options=setColors(colorArray.slice(),skill)
    console.log(options)
    moves=0
    tally.innerText=moves
    total.innerText=cap
    gameover.innerHTML=''
    running=!0
    builder(colors,'chip',options)
    builder(board,'tile',options,64,!0)
    color=board.childNodes[0].className
    board.className=''
    board.childNodes[0].className=color+cell
    checkColor(color)}
var play=function(chip){if(running&&color!==chip){color=chip
    if(board.className!=='started'){board.className='started'}
    moves++
    tally.innerText=moves
    checkColor(chip)
    checkWin(moves)}}
document.addEventListener("DOMContentLoaded",function(){newGame()},!1)
document.addEventListener('click',function(event){var css=Array.from(event.target.classList)
    console.log(event.target.tagName)
    if(event.target.tagName==='CHIP'){play(event.target.className)}
    else if(css.includes('new-game')){newGame()}})