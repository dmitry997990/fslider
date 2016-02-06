var interval = 3000;//интервал между показом слайдов
var speed = 1000;//скорость смены слайдов
var current = 0;//текущрий слайд
var autoSlide = false;//автопрокрутка
var leftControl = 'left';//левая стрелка
var rightControl = 'right';//правая стрелка
var pointWrapper = 'points';//блок с 'точками'

function enableSlider() {
   $('.slide').css({'position':'absolute', 'top':0, 'left':0}).hide().eq(0).show();
   if(autoSlide) 
   {
       var timer = setInterval(nextSlide, interval);
       $('.wrapper').hover( function() {
           clearInterval(timer);   
       }, function() {
           timer = setInterval(nextSlide, interval);
       });
   }
   if(leftControl != '' && rightControl  != '')
   {
       $('.' + leftControl).click( function() {
          nextSlide(); 
       });
       $('.' + rightControl).click( function() {
          previousSlide(); 
       });
   }
   if(pointWrapper != '') 
   {
       $('.' + pointWrapper + ' li').click( function() {
           controlByPoints($(this).index(), this);
       });
   }
   $('.slide').on('changed', function(event, param) {
       $('.' + pointWrapper + ' li').css({'background':'grey'});
       $('.' + pointWrapper + ' li').eq(param).css({'background':'black'});
   });
};

function nextSlide() {
   if(current < ($('.wrapper').children().length - 1)) 
   {
       $('.slide').eq(current).fadeOut(speed);
       $('.slide').eq(current + 1).fadeIn(speed);  
       current++;
       $('.slide').trigger('changed', [current]);
   }
   else
   {
       $('.slide').eq(current).fadeOut(speed);
       $('.slide').eq(0).fadeIn(speed); 
       current = 0;
       $('.slide').trigger('changed', [current]);
   }
}

function previousSlide() {
   if(current > 0) 
   {
       $('.slide').eq(current).fadeOut(speed);
       $('.slide').eq(current - 1).fadeIn(speed);  
       current--;
       $('.slide').trigger('changed', [current]);
   }
   else
   {
       $('.slide').eq(current).fadeOut(speed);
       $('.slide').eq($('.wrapper').children().length - 1).fadeIn(speed); 
       current = $('.wrapper').children().length - 1;
       $('.slide').trigger('changed', [current]);
   }
}

function controlByPoints(num, elem) {    
    $('.slide').eq(current).fadeOut(speed); 
    $('.slide').eq(num).fadeIn(speed);
    current = num;
    $('.slide').trigger('changed', [current]);
}