var general, radioButtons, planet, films, nameFilms = [];
var salida = "", numPeople, maxPeople;
 $(document).ready(function () {
         // Función onClick en el botón de busqueda donde guardo el radiobutton y el valor del input que ha introducido el usuario. 
         $("#go").on('click', function (e) {
         	numPeople = 0;
             // Guardo en una variable el radiobutton que este checkeado y lo convertimos en un array
             var radioButtons = $(":checked").toArray();
             //console.log(radioButtons);
             // Guardamos el valor del input de busqueda en una variable
             var textoBusqueda = $("#buscador").val();
             //console.log(textoBusqueda);
             // Guardamos en una variable el string de busqueda con los parámetros que ha introducido el usuario
             var llamada = 'https://swapi.co/api/' + radioButtons[0].id + '/?search=' + textoBusqueda + '&format=json';
             //console.log(llamada);
             // Utilzamos la variable con el string de busqueda para llamar al JSON que necesitamos para la busqueda del usuario
             $.getJSON(llamada).done(function (data) {
                 general = data;
                 console.log(general);
                 if(radioButtons[0].id == "people"){
                 	maxPeople = general.results.length;
                    cabecera();
                    general.results.forEach(buscaPeople);
                   
                 }else if(radioButtons[0].id == "films"){
                    imprimeFilms(); 
                 }
                 
             });
         });
 });

 function buscaPeople(persona) {
   
         // Apartir del JSON anterior utilzamos el link que nos da en el apartado homeworld para imprimir el nombre del planeta. Esta llamada a este JSON esta dentro de la anterior asegurarnos que la primera llamada este hecha
         $.getJSON(persona.homeworld).done(function (data) {
             planet = data;
             //console.log(planet);
             // la variable numero será la cantidad de llamadas que tendrá que hacer el for
             var numero = persona.films.length;
             // nameFilms es el array donde añadiremos los titulos de las peliculas
             nameFilms = [];
             // Esta variable sera el contador para asegurarnos de que haga todas las llamadas antes de imprimir
             var cuenta = 0;
             numPeople++;
             // Aqui recorremos el JSON tantas veces como posiciones tenga utilizando la variable numero. Y añadimos los titulos al array nameFilms y sumamos 1 al contador cuenta.
             for (i = 0; i < numero; i++) {
                 $.getJSON(persona.films[i]).done(function (data) {
                     films = data;
                     nameFilms.push(films.title)
                     //console.log(films);
                     cuenta++;

                     // Aqui comprobamos que la cantidad de llamadas que tiene que hacer sea igual al contador para imprimir na vez haya hecho todas las llamadas.
                     if (numero == cuenta) {
                         imprimePeople(persona);
                         if(numPeople == maxPeople){
                         	 pie(); 
                         };
                     };
                 });
             };
         });
     };
function cabecera(){
salida = "<thead><tr><th>Name</th><th>Birth Year</th><th>Gender</th><th>HomeWorld</th><th>Films</th></tr></thead>";
     
}
function pie(){
	salida += "</td></tr></tbody>";
	//console.log(salida);
     document.getElementById("tabla").innerHTML = salida;

}
 
 function imprimePeople(persona) {
     
     // Aqui comprobamos el radio button que ha clicado el usuario para imprimir la tabla correspondiente
     
         
             salida += "<tbody><tr><td>" + persona.name + "</td><td>" + persona.birth_year + "</td><td>" + persona.gender + "</td><td>" + planet.name + "</td><td>";
             
         nameFilms.forEach(function (nameFilm) {
             
            
             salida += nameFilm + "<br>"
             
         });

     };
function imprimeFilms(){
    var salida="";
    
    salida = "<thead><tr><th>Title</th><th>Director</th><th>Description</th><th>Date Release</th></tr></thead><tbody><tr><td>" + general.results[0].title + "</td><td>"+ general.results[0].director +"</td><td>"+general.results[0].opening_crawl+"</td><td>"+ general.results[0].release_date +"</td></tr></tbody>";
    
     document.getElementById("tabla").innerHTML = salida;
     
 };