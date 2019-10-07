var lista = [];

function produseCos () {
	var cos = JSON.parse(localStorage.getItem('cart'));
	if (!cos) {
		cos = [];
	}
var str = "";
for( var i in cos) {
	str+= `
	<div class ="produseCos col-xs-12 col-md-6 col-lg-3"> 
		<span class="nume-produse">${cos[i].produs.nume}</span>
		<span class="pret-produse">${cos[i].produs.pret}</span><span>Lei</span>
		<span>
		<input type="number" name="cantitateCos" value="${cos[i].cantitate}" onclick="modificaCantitate()">Cantitate</input>
		</span>
		<span class="subtotal">${cos[i].produs.pret*cos[i].cantitate}</span>
		<span class="buton-sterge">
		<input type="button" value"sterge" onclick="stergeDinCos(${i})"></input>
		</span>

	</div>
	`
}
document.querySelector("#produsecarucior").innerHTML = str;

}

