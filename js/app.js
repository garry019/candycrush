$(document).ready(function(){

  var mov=0;
  var img1= '';
  var img2 = '';
  var img1SRC = '';
  var img2SRC = '';
  var cont = 0;
  var rbh;
  var rbv;
  var score = 0;
  var reloj;

  blink(); //Titulo efecto blink

  $('.btn-reinicio').on('click',function(){
    init();
  })

  function init(){
    var buttonText = $('.btn-reinicio').html();
    if(buttonText == 'Iniciar'){
      $('.btn-reinicio').html('Reiniciar');
      temporizador();
      cargarTablero();
    }
    if(buttonText == 'Reiniciar'){
      if($("#timer").html() == '00:00'){
        $('.panel-tablero').animate({
          width: '70%',
          height: '700px',
          opacity: 1
        },1000,function(){
          $('.panel-tablero').css({
            border: '10px solid #E87306'
          });
        });
        $('.panel-score').animate({
          width: '25%'
        },1000);
        mov = 0;
        score = 0;
        $("#movimientos-text").html(mov);
        $("#score-text").html(score);
        $('.btn-reinicio').html('Iniciar');
        $("#timer").html('02:00');
      }else{
        $('.elemento').detach();
        window.clearInterval(reloj);
        mov = 0;
        score = 0;
        minutos = 1;
        segundos = 59;
        $("#movimientos-text").html(mov);
        $("#score-text").html(score);
        $("#timer").html('02:00');
        temporizador();
        cargarTablero();
      }
    }
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
    var minutos = 1;
    var segundos = 59;
    $("#timer").html('02:00');
    reloj = setInterval(mostrarReloj, 1000);
    function mostrarReloj() {
      if(segundos < 10){
        $('#timer').html('0' + minutos + ':' + '0' + segundos);
      }else{
        $('#timer').html('0' + minutos + ':' + segundos);
      }
      if(minutos == 0 && segundos == 0){
        window.clearInterval(reloj);
        gameOver();
      }
      if(minutos < 1 && segundos < 10){
        $('#timer').toggleClass('warning');
      }
      segundos--;
      if(segundos < 0){
        segundos = 59;
        minutos--;
      }
    }
  }

  function cargarTablero(){
    for (var c = 1; c <= 7; c++) {
      for (var f = 1; f <= 7; f++) {
        if ($(".col-"+f).children("img:nth-child("+c+")").html() == null) {
          var num = Math.floor((Math.random() * 4) + 1);
          $(".col-"+f).prepend("<img class= 'elemento' src='image/"+num+".png'>");
          var x = $('.elemento').position();
        }
      }
    }
    $('.elemento').draggable({
      disabled: false,
      revert: true,
      start: function(event, ui){
        mov++;
        $("#movimientos-text").html(mov);
      },
      zIndex: 1
    });
    horizontalCheck();
    verticalCheck();
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
        cont = 0;
        setTimeout(function(){
            eliminar();
        },500);
      }
    });
    setTimeout(function(){
        eliminar();
    },500);
  }

  function horizontalCheck()
  {
    var bh=0;
    for(j=1;j<8;j++)
    {
      for(k=1;k<6;k++)
      {
        var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
        var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
        var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
        if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
        {
            $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
            $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
            $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
            bh=1;
        }
      }
    }
    return bh;
  }

  function verticalCheck(){
    var bv=0;
    for(l=1;l<6;l++)
    {
      for(k=1;k<8;k++)
      {
        var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src")
        var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
        var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
        if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
        {
            $(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo")
            $(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo")
            $(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo")
            bv=1;
        }
      }
    }
    return bv;
  }

  function eliminar(){
    rbh = horizontalCheck();
    rbv = verticalCheck();
    if(rbh == 1 || rbv == 1)
    {
      $('.elemento').draggable({ disabled: true });
      $("div[class^='col']").css("justify-content","flex-end")
      $(".activo").hide("pulsate",2000,function(){
        var scoretmp = $(".activo").length;
        $(".activo").remove("img");
        setTimeout(function(){
          cargarTablero();
        },1000);
        score = score + scoretmp;
        $("#score-text").html(score);
      })
    }
  }

  function gameOver(){
    $('.elemento').draggable({ disabled: true });
    $('.elemento').detach();
    $('.panel-tablero').animate({
      width: 0,
      height: 0,
      opacity: 0,
      border: 0
    },1000);
    $('.panel-score').animate({
      width: '100%'
    },1000);
  }

});
