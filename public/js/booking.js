document.onload = function(){
    var node = document.querySelector("newEvent");
    node.onclick = function(){
        window.location = 'booking/new';
    };
};

function newEvent(){
    window.location = 'booking/new';
}