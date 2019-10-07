function deseneazaProduse() {
  var divProduse = document.getElementById('produse');
  while (divProduse.firstChild) {
    divProduse.removeChild(divProduse.firstChild);
  }
  var produse = obtineProduse();
  produse.forEach(function (produsCarucior) {
    divProduse.appendChild(creazaHTMLProdus(produsCarucior));
  });
}

function obtineProduse() {
  var produse = localStorage.getItem('cart');
  if (produse) {
    return JSON.parse(produse);
  }
  return [];
}

function salveazaProduse(listaProduse) {
  localStorage.setItem('cart', JSON.stringify(listaProduse));
}

function creazaHTMLProdus(produsCarucior) {
  var produs = produsCarucior.produs;

  var div = document.createElement('div');
  div.setAttribute('class', 'product col-xs-12');
  div.setAttribute('id', 'produs-' + produs.nume.replace(' ', '-'));

  var divImagine = document.createElement('div');
  divImagine.setAttribute('class', 'col-xs-3');
  var imagine = document.createElement('img');
  imagine.setAttribute('src', produs.imagine);
  divImagine.appendChild(imagine);

  var divDetalii = document.createElement('div');
  divDetalii.setAttribute('class', 'col-xs-9');
  var nume = document.createElement('p');
  nume.innerText = produs.nume;

  var cantitate = document.createElement('input');
  cantitate.setAttribute('type', 'number');
  cantitate.setAttribute('class', 'pret-produs');
  cantitate.setAttribute('value', produsCarucior.cantitate);
  cantitate.addEventListener('change', function (e) {
    var cant = e.target.value;
    if (isNaN(cant)) {
      return;
    }
    modificareCantitate(parseInt(cant), produs);
  });

  var subtotal = document.createElement('span');
  subtotal.setAttribute('class', 'subtotal');
  subtotal.innerText = 'Total: ' + parseInt(produs.pret) * parseInt(produsCarucior.cantitate) + ' Lei';

  var sterge = document.createElement('button');
  sterge.innerText = 'Sterge produs';
  sterge.setAttribute('class', 'buton-sterge');
  sterge.addEventListener('click', function () {
    stergeProdus(produs);
  });

  divDetalii.appendChild(nume);
  divDetalii.appendChild(cantitate);
  divDetalii.appendChild(subtotal);
  divDetalii.appendChild(sterge);

  div.appendChild(divImagine);
  div.appendChild(divDetalii);
  return div;
}

function modificareCantitate(cantitate, produs) {
  if (cantitate > produs.stoc || cantitate < 1) {
    deseneazaProduse();
    return;
  }

  var listaProduse = obtineProduse();
  var index = listaProduse.findIndex(function (produsCos, i) {
    return produsCos.produs.nume === produs.nume;
  });
  if (index === -1) {
    return;
  }

  var produsActualizat = {
    cantitate: cantitate,
    produs: produs
  };
  listaProduse.splice(index, 1, produsActualizat);
  salveazaProduse(listaProduse);
  deseneazaProduse();
}

function stergeProdus(produs) {
  var listaProduse = obtineProduse();
  var index = listaProduse.findIndex(function (produsCos) {
    return produsCos.produs.nume === produs.nume;
  });
  if (index === -1) {
    return;
  }
  listaProduse.splice(index, 1);
  salveazaProduse(listaProduse);
  deseneazaProduse();
}
