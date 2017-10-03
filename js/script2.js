var datos = [];

datos [0] = ["A new Hope","img/A_new_hope.jpg"]
datos [1] = ["Attack of the clones", "img/Attack_of_the_clones.jpg"]
datos [2] = ["The phantom Menace","img/The_phatom_Menace.jpg"]
datos [3] = ["Revange of the Sith", "img/Revange_of_the_Sith.jpg"]
datos [4] = ["Return of the jedi", "img/Return_of_the_Jedi.jpg"]
datos [5] = ["The empires strikes back","img/The_empires_strikes_back.jpg"]
datos [6] = ["The force awakens","img/The_force_awakens.jpg"]


var salida = "", film, busqueda;


$(document).ready(function(){
	$.getJSON('https://swapi.co/api/films').done(function(data){
		film = data;
		console.log(film);
		imprimir();
	});

	
});	




function imprimir (){

	document.getElementById("info").style.display ="none"
	for(i=0; i < datos.length; i++){
		

		if( i == 0){
			salida+= '<div class="row">';
		}
		else if( (i % 4) == 0){
			salida += '</div> <div class="row mt-2">';
		}

		salida+='<div class="col-md-6 col-lg-3 text-center" style="height:30em"><img alt="Star Wars film" src='+datos[i][1]+' class="img-rounded imagenes"><h3 class="text-primary text-center" style="height:2em">'+datos[i][0]+'</h3><button id="boton" type="button" class="btn btn-primary active btn-default" onclick= info('+i+')>+ Info</button></div>';
		
	
	};

	if (i!=0){
		salida += "</div>";
	}

	document.getElementById("contenedor").innerHTML = salida;
};


function search(){
	busqueda = document.getElementById("search").value

	if(busqueda == ""){
		$("#contenedor").show();
		$("#info").hide();
		$("#filmSearch").hide();
	}else {
		$("#contenedor").hide();
		$("#info").hide();
		$("#filmSearch").show();
		for(i=0; i < film.results.length; i++){
			if(busqueda == film.results[i].title){
				salida='<div class="col-md-6 col-lg-3 text-center" style="height:30em"><img alt="Star Wars film" src='+datos[i][1]+' class="img-rounded imagenes"><h3 class="text-primary text-center" style="height:2em">'+datos[i][0]+'</h3><button id="boton" type="button" class="btn btn-primary active btn-default" onclick= info('+i+')>+ Info</button></div>';
			}
		}
		document.getElementById("filmSearch").innerHTML = salida;
	}
}


function info (indice){
	
	// document.getElementById("contenedor").style.display = "none"
	// document.getElementById("info").style.display = "block"

	document.getElementById("infoImg").innerHTML ="<img src="+datos[indice][1]+">"

	console.log(indice);
	document.getElementById("tabla").innerHTML = "<tr><td>"+film.results[indice].director+"</td><td>"+film.results[indice].title+"</td><td>"+film.results[indice].release_date+"</td><td>"+film.results[indice].opening_crawl+"</td></tr>"
toggle();
}

function back(){
	$("#info").hide(1000);
	$("#contenedor").show(2000);
	$("#filmSearch").hide(1000);
}

function toggle (){

        $("#contenedor").hide(1000);    
        $("#info").show(2000);
        $("#filmSearch").hide(1000);
}
