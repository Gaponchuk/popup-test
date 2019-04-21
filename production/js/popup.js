var openButton = document.querySelector('.open-popup');
var popUp = document.querySelector('.form');
var closeButton = popUp.querySelector('.btn-close');
var overlay = document.querySelector('.overlay');


openButton.addEventListener('click', function(){
    popUp.classList.add('form-open');
    overlay.classList.add('overlay-open');

    if(popUp.classList.contains('form-open')) {
        document.addEventListener('keydown', function(evt) {
            if(evt.keyCode === 27) {
                popUp.classList.remove('form-open');
                overlay.classList.remove('overlay-open');
            }
        });
    }
});

closeButton.addEventListener('click', function(){
    popUp.classList.remove('form-open');
    overlay.classList.remove('overlay-open');
});
