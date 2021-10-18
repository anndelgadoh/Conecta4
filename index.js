//Mis datos
var tablaRow = document.getElementsByTagName("tr");
var tablaCell = document.getElementsByTagName("td");
var tablaBtn = document.querySelectorAll(".btn");

const playerTurno = document.querySelector(".playerTurno");
const borrar = document.querySelector(".borrar");

//Código
for(let i=0; i < tablaCell.length; i++){
    tablaCell[i].addEventListener("click", (e) =>{
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    })
}
//Jugador Uno
while(!player1){
    var player1 = prompt('Jugador Uno: Ingresa tu nombre. Serás color rojo');
}
player1Color ='red';

//Jugador Dos
while(!player2){
    var player2 = prompt('Jugador Dos: Ingresa tu nombre. Serás color Azul');
}
player2Color ='blue';


var jugadorActual = 1; 
playerTurno.textContent = `${player1}, Es tu Turno!`;

//Para cambiar el color
Array.prototype.forEach.call(tablaCell, (cell) =>{
    cell.addEventListener('click', cambiarColor);
    cell.style.backgroundColor ="rgb(181, 181, 181)";
});

function cambiarColor(e){
    let columna = e.target.cellIndex;
    let row =[];

    for(let i = 5; i > -1; i--){
        if (tablaRow[i].children[columna].style.backgroundColor == "rgb(181, 181, 181)"){
            row.push(tablaRow [i].children[columna]);
            if(jugadorActual === 1){
                row[0].style.backgroundColor = player1Color; 
                //Validación horizontal | Vertical | Diagonal
                if(horizontal() || vertical() || diagonal1() || diagonal2()){
                    playerTurno.textContent = `${player1} Ganador!`;
                    playerTurno.style.color = player1Color;
                    return (alert(`${player1}, Eres el ganador`));
                }else if(checador()){
                    playerTurno.textContent ='Juego Empatado';
                    return alert('Empatado');
                }else{
                    playerTurno.textContent =`${player2}'Es tu turno!'`;
                return jugadorActual = 2;
                }
                
            }else{
                row[0].style.backgroundColor = player2Color;
                playerTurno.textContent =`${player1}'Es tu turno!'`;
                if(horizontal() || vertical() || diagonal1() || diagonal2()){
                    playerTurno.textContent = `${player2} Ganador!`;
                    playerTurno.style.color = player2Color;
                    return (alert(`${player2}, Eres el ganador`));
                }else if(checador()){
                    playerTurno.textContent ='Juego Empatado';
                    return alert('Empatado');
                }else{
                    playerTurno.textContent =`${player2}'Es tu turno!'`;
                return jugadorActual = 1;
            }
        }
    }
}

//Verificación Horizontal

function checarColor(uno, dos, tres, cuatro){
    return(uno === dos && uno == tres && uno == cuatro && uno !== 'rgb(181, 181, 181)');
}

function horizontal(){
    for(let row = 0; row < tablaRow.length; row++){
        for(let col = 0; col < 4; col++){
            if(checarColor (tablaRow[row].children[col].style.backgroundColor, tablaRow[row].children[col+1].style.backgroundColor, tablaRow[row].children[col+2].style.backgroundColor, tablaRow[row].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
}

//Verificación Vertical

function vertical(){
    for(let col =0; col<7; col++){
        for(let row =0; row < 3; row++){
            if(checarColor(tablaRow[row].children[col].style.backgroundColor,tablaRow[row+1].children[col].style.backgroundColor,tablaRow[row+2].children[col].style.backgroundColor,tablaRow[row+3].children[col].style.backgroundColor)){
                return true;
            }
        }
    }
}

//Verificación Diagonal

function diagonal1(){
    for( let col =0; col <4; col++){
        for(row = 0; row <3; row ++){
            if (checarColor(tablaRow[row].children[col].style.backgroundColor, tablaRow[row+1].children[col+1].style.backgroundColor,tablaRow[row+2].children[col+2].style.backgroundColor, tablaRow[row+3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
}

function diagonal2(){
    for( let col =0; col <4; col++){
        for(row = 5; row <2; row--){
            if (checarColor(tablaRow[row].children[col].style.backgroundColor, tablaRow[row-1].children[col+1].style.backgroundColor,tablaRow[row-2].children[col+2].style.backgroundColor, tablaRow[row-3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
}

//Checarcador de que todo este en orden
function checador(){
    let tope =[];
    for(let i=0; i<tablaCell.length; i++){
        if(tablaCell[i].style.backgroundColor !=='rgb(181, 181, 181)'){
            tope.push(tablaCell[i]);
        }
    }
    if(tope.length ===tablaCell.length){
        return true;
    }
}
}

//Boton de borrar

borrar.addEventListener('click',() =>{
    tablaBtn.forEach(borrar =>{
        borrar.style.backgroundColor ="rgb(181, 181, 181)";

    });
    playerTurno.style.Color = 'black';
    return (jugadorActual === 1 ? playerTurno.textContent = `${player1}, es tu turno`: playerTurno.textContent = `${player2}, es tu turno`);
});