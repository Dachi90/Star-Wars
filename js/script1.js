var llamada = [];
llamada [0] = ["A new Hope"]
llamada [1] = ["Attack of the clones"]
llamada [2] = ["Return of the jedi"]
llamada [3] = ["Revange of the Sith"]
llamada [4] = ["The empires strikes back"]
llamada [5] = ["The force awakens"]
llamada [6] = ["The phatom Menace"]

var film,datos,salida;


$("#1").on("click",function(e){
	
	$.getJSON('https://swapi.co/api/films/?search=' + llamada[0] + '&format=json').done(function(data){
		film = data;
		console.log(film);
		tabla();
	
	});
	
});


$("#2").on("click",function(e){
	
	$.getJSON('https://swapi.co/api/films').done(function(data){
		film = data;
		console.log(film);
		tabla1();
	
	});
	
});

function tabla(){
	document.getElementById("films").style.display = "none";
	document.getElementById("film2").style.display = "none";
	document.getElementById("film1").style.display = "block";
	datos = film.results[0];
	salida ="";

	salida = "<tr><td>"+datos.director+"</td><td>"+datos.title+"</td><td>"+datos.release_date+"</td><td>"+datos.opening_crawl+"</td></tr>"

	document.getElementById("tabla").innerHTML = salida;
}

function tabla1(){
	document.getElementById("films").style.display = "none";
	document.getElementById("film1").style.display = "none";
	document.getElementById("film2").style.display = "block";
	datos = film.results[0];
	salida="";

	salida = "<tr><td>"+datos.director+"</td><td>"+datos.title+"</td><td>"+datos.release_date+"</td><td>"+datos.opening_crawl+"</td></tr>"

	document.getElementById("tabla1").innerHTML = salida;
}