const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],l=["A","J","Q","K"],r=[],a=document.querySelector("#btnPedir"),n=document.querySelector("#btnDetener");document.querySelector("#btnNuevo");let s=document.querySelectorAll(".divCartas"),d=document.querySelectorAll("small"),o=(t=2)=>{e=i(),r=[];for(let l=0;l<t;l++)r.push(0);d.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),a.disabled=!1,n.disabled=!1},i=()=>{e=[];for(let r=2;r<=10;r++)for(let a of t)e.push(r+a);for(let n of t)for(let s of l)e.push(s+n);return _.shuffle(e)},c=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},u=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},$=(e,t)=>(r[t]=r[t]+u(e),d[t].innerText=r[t],r[t]),f=(e,t)=>{let l=document.createElement("img");l.src=`./assets/cartas/${e}.png`,l.classList.add("carta"),s[t].append(l)},h=()=>{let[e,t]=r;setTimeout(()=>{t===e?alert("Nadie gan\xf3 :("):e>21?alert("Gan\xf3 la computadora"):t>21?alert("Ganaste"):alert("Gan\xf3 la computadora")},100)},b=e=>{let t=0;do{let l=c();if(t=$(l,r.length-1),f(l,r.length-1),e>=21)break}while(t<e&&e<=21);h()};return a.addEventListener("click",()=>{let e=c(),t=$(e,0);f(e,0),t>21?(console.warn("Lo siento mucho, perdiste"),a.disabled=!0,n.disabled=!0,b(t)):21===t&&(console.warn("21, genial!"),a.disabled=!0,n.disabled=!0,b(t))}),n.addEventListener("click",()=>{a.disabled=!0,n.disabled=!0,b(r[0])}),{nuevoJuego:o}})();