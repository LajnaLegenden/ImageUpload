$(document).ready(function() { 
    $('.thumbnail').click(function(){
        if($( window ).width() > 992){
            $('.modal-body').empty();
            var title = $(this).parent('a').attr("title");
            $('.modal-title').html(title);
            $($(this).parents('div').html()).appendTo('.modal-body');
            $('#myModal').modal({show:true});
        }
          
    });
    });
