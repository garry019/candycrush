$(document).ready(function(){

  var mov=0;
  var img1= '';
  var img2 = '';
  var img1SRC = '';
  var img2SRC = '';
  var cont = 0;

  blink(); //Titulo efecto blink

  $('.btn-reinicio').on('click',function(){
    init();
  })

  function init(){
    temporizador();
    cargarTablero();
    verticalCheck();
  }

  function blink(){
    function tituloBlink(){
      $('.main-titulo').delay(1000).animate({
        color: '#FFFFFF'
      },0,function(){
        tituloAmarillo();
      });
    }
    function tituloAmarillo(){
      $('.main-titulo').delay(1000).animate({
        color: '#DCFF0E'
      },0,function(){
        tituloBlink();
      });
    }
    tituloBlink();
  }

  function temporizador(){
    var reloj = setInterval(mostrarReloj, 1000);
    var minutos = 1;
    var segundos = 59;
    function mostrarReloj() {
      if(segundos < 10){
        $('#timer').html('0' + minutos + ':' + '0' + segundos);
        if(minutos < 1){
          $('#timer').toggleClass('warning');
        }
      }else{
        $('#timer').html('0' + minutos + ':' + segundos);
      }
      if(minutos == 0 && segundos == 0){
        window.clearInterval(reloj);
        gameOver();
      }
      segundos--;
      if(segundos < 0){
        segundos = 59;
        minutos--;
      }
    }
  }

  function cargarTablero(){
    for (var c = 1; c <= 7; c++) { // Repetimos el proces descrito abajo en cada una de las 7 columnas
      for (var f = 1; f <= 7; f++) { //recorremos las 7 filas de cada columna buscando img
        if ($(".col-"+f).children("img:nth-child("+c+")").html() == null) { //buscamos nodos que no contengan una img
          var num = Math.floor((Math.random() * 4) + 1);
          $(".col-"+f).prepend("<img class= 'elemento' src='image/"+num+".png'>"); //Si se encuentran nodos agregamos el elmento usando prepend, pues append no funciona bien en este caso
        }
      }
    }
    $('.elemento').draggable({
      disabled: false,
      containment: '.panel-tablero',
      revert: true,
      revertDuration: 0,
      snap: '.elemento',
      snapMode: 'inner',
      snapTolerance: 40,
      start: function(event, ui){
        mov=mov+1;
        $("#movimientos-text").html(mov)
      },
      zIndex: 1
    });
    verticalCheck();
  }

  function gameOver(){
    alert('Game Over Function');
  }

  function verticalCheck(){
    var candy;
    var candyPrev;
    var contador = 0;
    var destruir = [];
    var coincidencias = [];
    var columnas = $('div[class^="col-"]');
    columnas.each(function(){
      var candysPerColumn = $(this).find('.elemento');
      for(i=1;i<candysPerColumn.length;i++){
        candy = candysPerColumn.eq(i);
        prevCandy = candysPerColumn.eq(i-1);
        if(candy.attr('src') == prevCandy.attr('src')){
          if(contador == 0){
            coincidencias.push(candy);
            coincidencias.push(prevCandy);
          }
          if(contador > 0){
            coincidencias.push(candy);
            destruir = $.merge(destruir,coincidencias);
            coincidencias = [];
          }
          contador++;
        }else{
          coincidencias = [];
          contador = 0;
        }
      }
      contador = 0;
    });
    if(destruir.length > 0){
      setTimeout(function(){
        for(i=0;i<destruir.length;i++){
          destruir[i].detach();
        }
      },500);
      setTimeout(function(){
        cargarTablero();
      },500);
      setTimeout(function(){
        verticalCheck();
      },500);
    }
    if(destruir.length == 0){
      $('.elemento').mousedown(function(){
        img1 = $(this);
        img1SRC = img1.attr('src');
        cont = 1;
      });
      $('.elemento').mouseup(function(){
        if(cont == 1){
          img2 = $(this);
          img2SRC = img2.attr('src');
          img2.attr('src',img1SRC);
          img1.attr('src',img2SRC);
          console.log(img1.attr('src')+' '+img2.attr('src'));
          cont = 0;
          verticalCheck();
        }
      });
    }
  }
});
