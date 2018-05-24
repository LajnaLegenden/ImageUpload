var $nav = $('nav');
var $html = $('html');
var $container = $('.container');
var $footer = $('.footer');
var $col = $('.col');

var pathname = window.location.pathname;
var x = document.getElementById("myTopnav");


function myFunction() {

        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
 
}

$( document ).ready(function() {

    console.log('Path: '+pathname);
    $home = $('#home');
    $gallery = $('#gallery');
    $upload = $('#upload');
    if(pathname == '/'){
        $home.addClass('active');
    } else if (pathname == '/gallery'){
        $gallery.addClass('active');
    } else if (pathname == '/upload'){
        $upload.addClass('active');
    }
    adjustNav();
    adjustFooter();
});

$( window ).resize(function() {
    adjustFooter();
    adjustNav();
  });

function adjustFooter(){

     $html.css('padding-bottom', $footer.css('height'));
     if($( window ).width() > 992){
        $col.css('width',parseInt($footer.css('width'))/4);
    }
    if($( window ).width()<992){
        $col.css('width',$( window ).width());
      $col.center();
    }
}

function adjustNav(){
    $html.css('padding-bottom',parseInt($nav.css('height')));
}