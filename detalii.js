var i = window.location.search.substring(4);
var produs;

async function draw () {
	var response = await fetch ("https://talcioc-115b7.firebaseio.com/.json");
	var produse = await response.json();
	produs = produse[i];
	var str = "";
			str=`<div class="col-xs-12 col-md-6 col-lg-3 product"> 
						<img src="${produs.imagine}"> 
						<div class="descriere">
							<span> <h1>${produs.nume}</h1> </span> <br/>
							<span> ${produs.descriere} </span>
							<span> ${produs.pret} </span>
							<span> ${produs.stoc} </span>
						</div>
						<div>
							Cantitate <input type="number" value="0" name="cantitate" id="cantitate">
						</div>
						<div>
						<input type="button" value="Adauga in cos" onclick="adauga()">
						</div>
		
				</div>`;
				document.querySelector("#detalii").innerHTML = str;
}

function adauga() {
	var cos = JSON.parse(localStorage.getItem('cart'));
	if (!cos) {
		cos = [];
	}
	var cantitateUser = document.getElementById("cantitate").value;
	cantitateUser = parseInt(cantitateUser);

	var indexProdus;
	var produsCos = cos.find(function(produsCos, index) {
		if (produs.nume === produsCos.produs.nume) {
			indexProdus = index;
			return true;
		}
			return false;
	});
	/*var produsCos = cos.find(function(produsCos){
		return produs.nume === produsCos.produs.nume;
	});*/

	if (produsCos) {
		produsCos.cantitate += cantitateUser;
		cos.splice(indexProdus, 1);
	} else {
		produsCos = {
			produs: produs,
			cantitate: cantitateUser
		};
	}

	if(produsCos.cantitate > 0 && produsCos.cantitate <= produs.stoc) {
		alert ("Prosusul a fost adaugat in cos"); 
		cos.push(produsCos);
		localStorage.setItem('cart', JSON.stringify(cos));
	} else {
		if (produsCos.cantitate <= 0 ) {
			alert ("Cantitate incorecta");
		} else {
			if ( produsCos.cantitate > produs.stoc) {
				alert ("Stoc insuficient");
			}
		}
	}

}
