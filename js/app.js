var CandyGame = {
  columnas: $('div[class^="col"]'),
  filas: 7,
  dulces: [],
  candyRows: [],
  movimientos: 0,
  check: true,
  init: function(){
    var img1 = '';
    var img2 = '';
    CandyGame.blink();
    $('.btn-reinicio').on('click',function(){
      var textBoton = $('.btn-reinicio').html();
      if(textBoton == 'Iniciar'){
        CandyGame.temporizador();
        CandyGame.cargarTablero();
        $('.btn-reinicio').html('Reiniciar');
        $('.elemento').on('mousedown',function(){
          img1 = $(this);
          img1SRC = $(this).attr('src');
        });
        $('.elemento').on('mouseup',function(){
          imgReserva = img1SRC;
          img2 = $(this).attr('src');
          $(this).attr('src',imgReserva);
          img1.attr('src',img2);
          CandyGame.verticalCheck();
        });
      }
      if(textBoton == 'Reiniciar'){
        alert('Funcion en construccion');
      }
    });
  },
  blink: function(){
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
  },
  temporizador: function(){
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
        CandyGame.gameOver();
      }
      segundos--;
      if(segundos < 0){
        segundos = 59;
        minutos--;
      }
    }
  },
  cargarTablero: function(){
    for (var c = 1; c <= 7; c++) { // Repetimos el proces descrito abajo en cada una de las 7 columnas
      for (var f = 1; f <= 7; f++) { //recorremos las 7 filas de cada columna buscando img
        if ($(".col-"+f).children("img:nth-child("+c+")").html() == null) { //buscamos nodos que no contengan una img
          var num = Math.floor((Math.random() * 4) + 1);
          $(".col-"+f).prepend("<img class= 'elemento fila"+c+"' src='image/"+num+".png'>"); //Si se encuentran nodos agregamos el elmento usando prepend, pues append no funciona bien en este caso
        }
      }
    }
    $('.elemento').draggable({
      revert: true,
      zIndex: 1,
      cancel: false
    });
    setTimeout(function(){
      CandyGame.verticalCheck();
    },1000);
  },
  gameOver: function(){
    alert('Game Over Function');
  },
  verticalCheck: function(){
    var candy;
    var candyPrev;
    var contador = 0;
    var destruir = [];
    var coincidencias = [];
    CandyGame.columnas.each(function(){
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
    setTimeout(function(){
      for(i=0;i<destruir.length;i++){
        destruir[i].remove();
      }
    },500);
    setTimeout(function(){
      CandyGame.cargarTablero();
    },1000);
  },
  horizontalCheck: function(){
  }
}
CandyGame.init();
