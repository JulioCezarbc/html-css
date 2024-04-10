const turnOnOff = document.getElementById('turnOnOff');
const lamp = document.getElementById('lamp');


function isLampBroken(){
    return lamp.src.indexOf('quebrada' ) > -1
}

function lampOn(){
    if (!isLampBroken ()){
        lamp.src = 'https://github.com/fernandoleonid/mini-projetos-js/blob/master/01-lamp/img/ligada.jpg?raw=true';
        turnOnOff.textContent = 'Desligar'
    }

    
}
function lampOff(){
    if (!isLampBroken()){
        lamp.src = 'https://github.com/fernandoleonid/mini-projetos-js/blob/master/01-lamp/img/desligada.jpg?raw=true';
        turnOnOff.textContent = 'Ligar'

    }
}
function lampBroken(){
    lamp.src = 'https://github.com/fernandoleonid/mini-projetos-js/blob/master/01-lamp/img/quebrada.jpg?raw=true';
}

function lampOnOff(){
    if (turnOnOff.textContent == 'Ligar' ){
        lampOn();
        turnOnOff.textContent = 'Desligar'
    }else{
        lampOff();
        turnOnOff.textContent = 'Ligar'
    }
}


turnOnOff.addEventListener('click', lampOnOff);
lamp.addEventListener('mouseover', lampOn);
lamp.addEventListener('mouseleave' , lampOff);
lamp.addEventListener('dblclick', lampBroken);