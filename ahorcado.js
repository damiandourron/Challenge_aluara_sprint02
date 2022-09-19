
ancho = screen.width;
alto = screen.height;
let letraspresionadaincorrecta = [];
let letraspresionadacorrecta = [];
let palabra = "";
let countglobal = 0;
let recibir = true;
let incorrecto = 0;
let puntomedio = ancho / 2;
color = "rgb(99, 124, 236)";

var pantalla = document.getElementById('panelDibujo');
var pincel = pantalla.getContext('2d');

function mostrarVictoria(resultado){
    var labelresultado = document.getElementById("label-resultado");

    switch(resultado){
        case 'victoria':
            labelresultado.color = "green";
            labelresultado.textContent = "Ganaste";
            labelresultado.style.visibility = "visible";
            break;
        case 'derrota':
            labelresultado.textContent = "Perdiste";
            labelresultado.color = "Red";
            labelresultado.style.visibility = "visible";
            break;
        default:
            document.getElementById("label-resultado").style.visibility = "hidden";
            break;
    }
}
function limpiarVariables(){
    palabra = "";
    letraspresionadaincorrecta = [];
    letraspresionadacorrecta = [];
    countglobal = 0;
    recibir = true;
    incorrecto= 0;
}

function limpiarjorgito(){
    pincel.clearRect(puntomedio + 55,25,40,100);
}

function dibujarOrca(){

    /*linea base*/
    pincel.moveTo(puntomedio - 75,235);
    pincel.lineTo(puntomedio + 75,235);
    pincel.lineWidth = 5;
    pincel.strokeStyle = "black";
    pincel.stroke();

    /*mastil*/
    pincel.moveTo(puntomedio - 25 ,235);
    pincel.lineTo(puntomedio - 25 ,20);
    pincel.lineWidth = 5;
    pincel.strokeStyle = "black";
    pincel.stroke();

    /*
    pincel.moveTo(132.5,20);
    pincel.lineTo(112.5,40);
    pincel.lineWidth = 5;
    pincel.strokeStyle = "black";
    pincel.stroke();
    */

    /*tabla superior*/
    pincel.moveTo(puntomedio - 25,20);
    pincel.lineTo(puntomedio + 75,20);
    pincel.lineWidth = 5;
    pincel.strokeStyle = "black";
    pincel.stroke();

}

function dibujarGuiones(cantidad){
    pincel.clearRect(0,0,ancho,alto);
    medio = cantidad / 2;
    medio = medio * 55;
    console.log("medio " + medio);
    ubicacionx =(ancho/2) - medio;

    /*bucle que dibuja los guiones dependiendo del length de la palabra*/
    for(i = 1; i <= cantidad; i++){
    pincel.fillStyle = "black";
    pincel.fillRect(ubicacionx, 300, 50, 4);
    ubicacionx = ubicacionx + 60;
    }
}

function dibujarMunheco(paso){
    console.log("dibuja muñeco " + paso);
    
    //pincel.clearRect(0,0,ancho,alto);
    //dibujarOrca();
    switch (paso) {
        case 1:
            pincel.moveTo(puntomedio + 75,20);
            pincel.lineTo(puntomedio + 75,30);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 2:
            pincel.beginPath();
            pincel.arc(puntomedio + 75,40,10,0,Math.PI*2,true); 
            pincel.closePath;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 3:
            pincel.moveTo(puntomedio + 75,50);
            pincel.lineTo(puntomedio + 75,90);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 4:
            pincel.moveTo(puntomedio + 75,50);
            pincel.lineTo(puntomedio + 58,75);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 5:
            pincel.moveTo(puntomedio + 75,50);
            pincel.lineTo(puntomedio + 92,75);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
            break;
        case 6: 
            pincel.moveTo(puntomedio + 75,90);
            pincel.lineTo(puntomedio + 92,115);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke(); 
            
            console.log("dibujo una pierna");
            break;
        case 7:
            pincel.moveTo(puntomedio + 75,90);
            pincel.lineTo(puntomedio + 58,115);
            pincel.lineWidth = 5;
            pincel.strokeStyle = color;
            pincel.stroke();
        default:
          console.log('No hay mas movimientos.');
          break;
      }
}

function sortearPalabra(){
    let palabras = ["pajaro" , "torta", "abogado", "gato","pez", "kiwi", "mandarina"];
    let indicePalabra = Math.floor(Math.random()*palabras.length);
    palabra = palabras[indicePalabra].toUpperCase();
}

function jugar(){
    mostrarVictoria();
    limpiarVariables();
    sortearPalabra();
    color = "black";
    dibujarGuiones(palabra.length);  
    
    dibujarOrca();
    limpiarjorgito();
    esperarLetras();
}

function esperarLetras(){
    document.addEventListener('keyup', (event) => {
        var keyName = event.key;
        var KeyCode = event.keyCode; 
        const pattern = new RegExp('^[A-Z]+$', 'i');

        if(KeyCode >= 65 && KeyCode <=90){
            console.log(keyName);
            if(pattern.test(keyName)){
                if(recibir){
                    recibirLetras(keyName.toUpperCase());
                }
            }
        }
      }, false);
}

function recibirLetras(letra){      
    let countincorrecta = false;
    let countcorrecta = false;

    if(letraspresionadacorrecta.length != 0){
        for(var i = 0;i < letraspresionadacorrecta.length; i++){
            if(letra == letraspresionadacorrecta[i]){
                countcorrecta = true;
            }
        }
    }

    if(countcorrecta == true){return;}

    if(countcorrecta == false){
        for(var i = 0; i < palabra.length; i++){
            if(letra == palabra[i]){
                countincorrecta = true;
                letraspresionadacorrecta.push(letra);
                dibujarLetras(letra,i,true,palabra.length);
                if(letraspresionadacorrecta.length == palabra.length){
                    for(var i = 0; i<palabra.length; i++){
                        dibujarLetras(palabra[i],i,true,palabra.length);
                    }

                    mostrarVictoria("victoria");
                    recibir = false;
                    return;
                }
            }
        }
    }
    if(countincorrecta  == false){
        let countaux = false;
        if(letraspresionadaincorrecta.length!=0){
            for(var i = 0; i<letraspresionadaincorrecta.length; i++){
                if(letra==letraspresionadaincorrecta[i]){
                    countaux = true;
                }
            }
            if(countaux == false){
                dibujarLetras(letra,i,false);
                letraspresionadaincorrecta.push(letra);
                incorrecto = letraspresionadaincorrecta.length;
                console.log("dibujo")
                dibujarMunheco(incorrecto);
                
                if(letraspresionadaincorrecta.length>6){
                    for(var i = 0; i<palabra.length; i++){
                        dibujarLetras(palabra[i],i,true);  
                    }

                    mostrarVictoria('derrota');
                    recibir = false;
                    return;
                } 
            }
        }
        else{
            letraspresionadaincorrecta.push(letra);
            dibujarLetras(letra,i,false,"white");
            console.log("primer dibujo");
            dibujarMunheco(incorrecto);
            incorrecto = letraspresionadaincorrecta.length;
            console.log(incorrecto);
        }
    }
}

function dibujarLetras(letra, posicion, enlinea,cantidad){

    if(enlinea){
        pincel.font="bold 70px Rubik, serif";
        pincel.fillStyle = "white";
        if(letra != "i"){
            medio = cantidad / 2;
            medio = medio * 55;
            console.log("medio " + medio);
            ubix =(ancho/2) - medio;
            pincel.fillText(letra.toUpperCase(),(60*posicion)+ubix,300,60);
            return;
        }
        else{
            pincel.fillText(letra.toUpperCase(),(37.5*posicion)+10,80,10);
            return;
        }
    }
    else{
        pincel.font="bold 25px Rubik, serif";
        pincel.fillStyle = "white";      
        pincel.fillText(letra.toUpperCase(),(15*countglobal)+200,148,10);
        countglobal++;
        return
    }
}

function nuevojuego(){
    pincel.clearRect(0,0,ancho,alto);
    jugar();
}

function iniciar(){
    limpiarVariables();
    document.getElementById("btniniciar").style.visibility = "hidden";
    document.getElementById("btnnueva").style.visibility = "hidden";
    document.getElementById("nuevojuegoid").style.visibility = "visible";
    document.getElementById("desistirid").style.visibility = "visible";
    jugar();
}

function rendirse(){
    mostrarVictoria();
    pincel.clearRect(0,0,1200,1000);
    document.getElementById("btniniciar").style.visibility = "visible";
    document.getElementById("btnnueva").style.visibility = "visible";
    document.getElementById("nuevojuegoid").style.visibility = "hidden";
    document.getElementById("desistirid").style.visibility = "hidden";
}

