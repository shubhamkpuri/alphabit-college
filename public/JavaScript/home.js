document.getElementById("togglebtn").addEventListener("click", () => {

    document.getElementById("navbar-hide").classList.toggle("navbar-hide");


});
//ECS key for getting out of navigation
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        cancelfun();
    }
};
//for hiding navbar
var cancelfun = () => {
    document.getElementById("navbar-hide").classList.add("navbar-hide");
}



//Full page .js

$("#wrapper").fullpage({
    sectionsColor: ['#006266', 'rgb(133, 193, 242)', '#006266', '#4ABDAC', '#000'],
    scrollOverflow:true,
    fadingEffect: true,
    navigation: true,

});

// $("#togglebtn").click(function() {
//   alert( "Handler for .click() called." );
// });
