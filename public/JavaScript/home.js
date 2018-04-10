function formvalidate(number, idname, elementname){
    var v= document.getElementById(elementname).value;
    console.log(v);
    alert(v);
}
document.getElementById("togglebtn").addEventListener("click", () => {

    document.getElementById("navbar-hide").classList.toggle("navbar-hide");
    document.getElementById("navbar-hide").classList.remove("removeanimation");
    document.getElementById("navbar-hide").classList.add("addanimation");


});
//ECS key for getting out of navigation
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        cancelfun();
    }
};
var cancelfun = () => {
    document.getElementById("navbar-hide").classList.add("removeanimation");
 document.getElementById("navbar-hide").classList.remove("addanimation");
 setTimeout(alertFunc, 280);


}

function alertFunc() {
  document.getElementById("navbar-hide").classList.toggle("navbar-hide");
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
