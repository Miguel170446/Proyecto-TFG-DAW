
// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");

const maxYear = new Date().getFullYear();
const minYear = maxYear - 15;

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

document.addEventListener("DOMContentLoaded", () => {
  llenarSelect();
});

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarCoche();
});
year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarCoche();
});
minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarCoche();
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarCoche();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrarCoche();
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarCoche();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarCoche();
});

function mostrarCoches(coches) {
  limpiarHTML();
  coches.forEach((coche) => {
    const col = document.createElement("div");
    col.classList.add("col-lg-3", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "card-resultado", "h-100");

    const { marca, modelo, year, precio, puertas, color: colorAuto, transmision, imagen } = coche;

    card.innerHTML = `
      <img src="${imagen}" class="card-img-top" alt="${marca} ${modelo}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-primary fw-bold texto-principal">${marca} ${modelo} - ${year}</h5>
        <p class="card-text text-muted small mb-4">
          ${precio} €<br>
          ${puertas} puertas - ${colorAuto} - ${transmision}
        </p>
        <a href="#" class="btn btn-primary mt-auto align-self-start">Ver Imagen</a>
      </div>
    `;

    card.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("modalImagen").src = imagen;
      const modal = new bootstrap.Modal(document.getElementById("modalCoche"));
      modal.show();
    });

    col.appendChild(card);
    resultado.appendChild(col);
  });
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  for (let i = maxYear; i >= minYear; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

function filtrarCoche() {
  const resultado = coches.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
  mostrarCoches(resultado);
}

function filtrarMarca(coche) {
  return datosBusqueda.marca ? coche.marca === datosBusqueda.marca : true;
}
function filtrarYear(coche) {
  return datosBusqueda.year ? coche.year === parseInt(datosBusqueda.year) : true;
}
function filtrarMinimo(coche) {
  return datosBusqueda.minimo ? coche.precio >= parseInt(datosBusqueda.minimo) : true;
}
function filtrarMaximo(coche) {
  return datosBusqueda.maximo ? coche.precio <= parseInt(datosBusqueda.maximo) : true;
}
function filtrarPuertas(coche) {
  return datosBusqueda.puertas ? coche.puertas === parseInt(datosBusqueda.puertas) : true;
}
function filtrarTransmision(coche) {
  return datosBusqueda.transmision ? coche.transmision === datosBusqueda.transmision : true;
}
function filtrarColor(coche) {
  return datosBusqueda.color ? coche.color === datosBusqueda.color : true;
}
