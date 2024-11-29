change_formation("4-3-3")
const pitch = document.getElementById("pitch");
let formation_select = document.getElementById("formation_select");

function change_formation(id_formation) {
  fetch('./formations.json')
    .then(response => response.json())
    .then(data => {
      // console.log("data formation");
      data.formations.forEach(formation => {
        if (formation.id === id_formation) {
          pitch.innerHTML = "";
          formation.players_pos.forEach(player => {
            // console.log(player.role)
            let mydiv = document.createElement("div");
            mydiv.textContent = player.role;
            mydiv.style.top = player.position.y;
            mydiv.style.left = player.position.x;
            mydiv.style.position = "absolute";
            // mydiv.style.border = "2px solid black";
            mydiv.style.backgroundColor = "white";
            // mydiv.style.backgroundImage = "url('img/badge_gold.webp')";
            // mydiv.style.backgroundSize = "100%"
            // mydiv.style.backgroundRepeat = "no-repeat"
            // mydiv.style.width = "100px";
            // mydiv.style.height = "150px";
            // let button = document.createElement("button");
            // button.textContent = "+";
            // mydiv.appendChild(button);
            mydiv.classList.add("p_card");
            pitch.appendChild(mydiv);
            // button.addEventListener('click', ()=>{
            // });
          });
        }
      })
    })
}
formation_select.addEventListener("change", (event) => {
  const formation_selected = event.target.value;
  console.log(formation_selected);
  change_formation(formation_selected);
  }
)

const add_button = document.getElementById("add_button")
add_button.addEventListener('click', () => {
  console.log("clicked");
  let formulaire = document.getElementById("player");
  formulaire.style.visibility = "visible";
})

const cancel_button = document.getElementById("cancel");
cancel_button.addEventListener('click', () => {
  let formulaire = document.getElementById("player");
  formulaire.style.visibility = "hidden";
})
// // l'ajout d'un joueurs
// const form = document.getElementById("id_form");
// form.addEventListener('submit', (event)=>{
//   event.preventDefault();
//   console.log(event);
//   const p_name = document.getElementById("name").value;
//   const p_photo = document.getElementById("photo").value;
//   const p_nationality = document.getElementById("nationality").value;
//   const p_flag = document.getElementById("flag").value;
//   const p_club = document.getElementById("club").value;
//   const p_ = document.getElementById("name").value;
//   const p_name = document.getElementById("name").value;
//   const p_name = document.getElementById("name").value;
//   const p_name = document.getElementById("name").value;
//   const p_name = document.getElementById("name").value;
//   console.log(p_name);
// })
