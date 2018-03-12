

	var getJSON = function(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.responseType = 'json';
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status);
				}
			};
			xhr.send();
		});
	};



	document.addEventListener("load", getLocation());

	var x = document.getElementById("demo");
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	function showPosition(position) {
		console.log(position)
		var urlWeather="http://api.openweathermap.org/data/2.5/forecast?lat="+ position.coords.latitude +"&lon="+ position.coords.longitude + "&appid=14fe9989ca36d46bacd247989900d8d5";
		getJSON(urlWeather).then( function(data) {
			var city=document.getElementById("city");
			var ciudad=data.city.name;
			city.innerHTML="<h1> Tiempo en " + ciudad +"</h1>";
			var tiempo=document.getElementById('tiempo');
			var dia=document.getElementById('dia');
			for (var i = 0; i < data.list.length; i++) {
				
				var tiempo2=data.list[i].weather[0].main;
				var dia2=data.list[i].dt_txt;
				tiempo.innerHTML+="<h3>"+ "Día: "+  dia2 + "==>"+tiempo2 +" </h3><br>";
				
			}
			

		});

	}