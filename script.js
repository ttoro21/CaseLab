const WA = "573014009703"; // WhatsApp: 57 + 3014009703
const BRANDS = ["iPhone", "Samsung", "Xiaomi", "Motorola"];
// Para usar una foto real: agrega img:"fotos/rojo.jpg" a cualquier color
const P = [
 {n:"Rojo Carmín",h:"#C0141B"},{n:"Vino",h:"#6E0D12"},{n:"Coral",h:"#F2705E"},
 {n:"Naranja",h:"#F28A1E"},{n:"Mostaza",h:"#D9A21B"},{n:"Amarillo",h:"#F6D646"},
 {n:"Verde Bosque",h:"#1F5A3A"},{n:"Verde Menta",h:"#9ED9B8"},{n:"Turquesa",h:"#1FA6A0"},
 {n:"Azul Cielo",h:"#8EC5EE"},{n:"Azul Marino",h:"#14284B"},{n:"Lila",h:"#B79AE0"},
 {n:"Morado",h:"#5B2A86"},{n:"Rosa Chicle",h:"#F7A1C4"},{n:"Fucsia",h:"#D81B7A"},
 {n:"Blanco",h:"#F4F1EC"},{n:"Gris Grafito",h:"#4A4D52"},{n:"Negro",h:"#151515"},
 {n:"Chocolate",h:"#4A2A22"},{n:"Arena",h:"#E3CBA3"}
].map(x => ({...x, p: 39900}));
const fmt = v => "$" + v.toLocaleString("es-CO");
const $ = id => document.getElementById(id);
let brand = "", cart = [];

function draw(){
  $("chips").innerHTML = BRANDS.map(b => `<button class="chip" aria-pressed="${b===brand}" data-b="${b}">${b}</button>`).join("");
  $("grid").innerHTML = P.map((x,i) => `<article class="card">
    <div class="stage">${x.img ? `<img src="${x.img}" alt="Funda ${x.n}">` : `<div class="case" style="--c:${x.h}" role="img" aria-label="Funda color ${x.n}"></div>`}</div>
    <h3><span class="dot" style="background:${x.h}"></span>${x.n}</h3><small>${brand ? "Para " + brand : "Elige tu marca arriba"}</small>
    <div class="row"><span class="price">${fmt(x.p)}</span><button class="add" data-i="${i}">Agregar</button></div></article>`).join("");
}
function cartDraw(){
  $("n").textContent = cart.length;
  $("marca").textContent = brand ? "Marca: " + brand : "";
  $("items").innerHTML = cart.length ? cart.map((x,k) => `<li><span>${x.n}</span><span>${fmt(x.p)} <button data-k="${k}" aria-label="Quitar ${x.n}">Quitar</button></span></li>`).join("") : "<li>Aún no has agregado fundas.</li>";
  const t = cart.reduce((a,x) => a + x.p, 0);
  $("total").textContent = fmt(t);
  const msg = "Hola caselab, quiero pedir:\n" + cart.map(x => "- Funda " + x.n + " (" + fmt(x.p) + ")").join("\n") + "\nTotal: " + fmt(t) + "\nMarca de mi celular: " + (brand || "") + "\nModelo: ";
  $("send").href = cart.length ? `https://wa.me/${WA}?text=${encodeURIComponent(msg)}` : "#";
}
document.addEventListener("click", e => {
  const t = e.target;
  if (t.dataset.b) { brand = brand === t.dataset.b ? "" : t.dataset.b; draw(); cartDraw(); }
  if (t.dataset.i !== undefined) { cart.push(P[t.dataset.i]); cartDraw(); t.textContent = "Agregada"; setTimeout(() => t.textContent = "Agregar", 900); }
  if (t.dataset.k !== undefined) { cart.splice(t.dataset.k, 1); cartDraw(); }
});
$("open").onclick = () => $("drawer").classList.add("open");
$("close").onclick = () => $("drawer").classList.remove("open");
$("wa-custom").href = `https://wa.me/${WA}?text=${encodeURIComponent("Hola caselab, quiero una funda personalizada")}`;
draw(); cartDraw();
