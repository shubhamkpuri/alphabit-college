function formvalidate(number, idname, elementname){
    var v= document.getElementById(elementname).value;
    console.log(v);
    alert(v);
}
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
