var datos = ["img/The_phatom_Menace.jpg", "img/Attack_of_the_clones.jpg","img/Revange_of_the_Sith.jpg","img/A_new_hope.jpg","img/The_empires_strikes_back.jpg","img/Return_of_the_Jedi.jpg","img/The_force_awakens.jpg" ];
var salida = "", film, busqueda, pelicula,texto;

//  LLamada al Json general con las 7 peliculas con la que muestro la sección general de la página.
$(document).ready(function(){
	$.getJSON('https://swapi.co/api/films/').done(function(data){
		film = data.results.map(function(item){
			item["imagen"] = datos[item.episode_id - 1]
			return item;
		});
		film.sort(function(item1, item2){
			return item1.episode_id > item2.episode_id;
		});
		console.log(film);
		imprimir();
	});	
});	

// Aquí imprimo la sección principal con la portada de las 7 películas creando un div row cada 4 películas
function imprimir (){

	document.getElementById("info").style.display ="none"

	for(i=0; i < film.length; i++){
		if( i == 0){
			salida+= '<div class="row">';
		} else if( (i % 4) == 0){
			salida += '</div> <div class="row mt-2">';
		}
		salida+='<div class="col-md-6 col-lg-3 text-center" style="height:30em"><img alt="Star Wars film" src='+film[i].imagen+' class="img-rounded imagenes"><h3 class="text-center titles" style="height:2em">'+film[i].title+'</h3><button id="boton" type="button" class="btn btn-outline-success" onclick= info('+i+')>+ Info</button></div>';
	};
	if (i!=0){
		salida += "</div>";
	};
	document.getElementById("contenedor").innerHTML = salida;
};

// En esta función hago la llamada al Json de la película que el usuario haya buscado y oculto las demás secciones para mostrar las caratulas y el botón de info de las películas que coincidan con la buqueda del usuario.
function search(){
	busqueda = document.getElementById("search").value

	$.getJSON('https://swapi.co/api/films/?search='+busqueda).done(function(data){
		pelicula = data.results.map(function(item){
			item["imagen"] = datos[item.episode_id - 1]
			return item;
		});;
		
		// Aqui ordeno el array película segun el episode_id
		pelicula.sort(function(item1, item2){
			return item1.episode_id > item2.episode_id;
		});
		 console.log(pelicula)
		if(busqueda == ""){
		$("#contenedor").show();
		$("#info").hide();
		$("#filmSearch").hide();
	}else {
		$("#contenedor").hide();
		$("#info").hide();
		$("#filmSearch").show();
		
		salida ="";
		for(i=0; i < pelicula.length; i++){
			// var texto = pelicula[i].title.toLowerCase();
			if( i == 0){
			salida+= '<div class="row">';
			}
			else if( (i % 4) == 0){
			salida += '</div> <div class="row mt-2">';
			}

				salida +='<div class="col-md-6 col-lg-3 text-center" style="height:30em"><img alt="Star Wars film" src='+pelicula[i].imagen+' class="img-rounded imagenes"><h3 class="text-primary text-center" style="height:2em">'+pelicula[i].title+'</h3><button id="boton" type="button" class="btn btn-outline-success" onclick= info('+i+')>+ Info</button></div>';
			console.log("prueba");
		}
		if (i!=0){
		salida += "</div>";
		}
		document.getElementById("filmSearch").innerHTML = salida;
	}
    });

	
}

// Función para mostrar la tabla de información de cada película
function info (indice){
	
	document.getElementById("infoImg").innerHTML ="<img src="+film[indice].imagen+">"

	console.log(indice);
	document.getElementById("tabla").innerHTML = "<tr><td>"+film[indice].director+"</td><td>"+film[indice].title+"</td><td>"+film[indice].release_date+"</td><td>"+film[indice].opening_crawl+"</td></tr>"
toggle();
}

// Código jQuery para que al presionar enter en el buscador sea como hacer click en el boton de busqueda.
$("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#buscador").click();
    }
});

// función para volver al página principal
function back(){
	$("#info").hide(1000);
	$("#contenedor").show(2000);
	$("#filmSearch").hide(1000);
}

// función para esconder la página principal y la de busqueda para mostrar la de info
function toggle (){

        $("#contenedor").hide(1000);    
        $("#info").show(2000);
        $("#filmSearch").hide(1000);
}
