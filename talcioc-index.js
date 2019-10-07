var lista =  [];

async function draw() {
	var response = await fetch("https://talcioc-115b7.firebaseio.com/.json");
	window.lista = await response.json();

	var str = "";
	for(var i in lista) {
		str+= `
			<div class="col-xs-12 col-md-6 col-lg-3 product">
			<img src="${lista[i].imagine}">
			<div class="descriere">
			<span><h1>${lista[i].nume}</h1></span> </br>
			<span> ${lista[i].pret} </span> </br>
			</div>
			<a href="Detalii.html?id=${i}">
				<input type="button" name="" value="DETALII" class="button" href="detalii.html">  
			</a>
			</div>
		`;
	}
	document.querySelector("#produse").innerHTML = str;
}