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
  // formulaire.style.visibility = "visible";
  formulaire.classList.remove("hidden");
  formulaire.classList.add("flex");
  console.log("clicked");
})

const cancel_button = document.getElementById("cancel");
cancel_button.addEventListener('click', () => {
  let formulaire = document.getElementById("player");
  formulaire.style.visibility = "hidden";
})
// l'ajout d'un joueurs
let player = {};
const form = document.getElementById("id_form");
form.addEventListener('submit', (event)=>{
  event.preventDefault();
  // console.log(event);
  const p_name = document.getElementById("name").value;
  const p_photo = document.getElementById("photo").value;
  const p_position = document.getElementById("position").value;
  const p_nationality = document.getElementById("nationality").value;
  const p_flag = document.getElementById("flag").value;
  const p_club = document.getElementById("club").value;
  const p_rating= document.getElementById("rating").value;
  const p_shooting = document.getElementById("shooting").value;
  const p_passing = document.getElementById("passing").value;
  const p_dribbling = document.getElementById("dribbling").value;
  const p_defending = document.getElementById("defending").value;
  const p_physical = document.getElementById("physical").value;
  player.name = p_name;
  player.photo = p_photo;
  player.nationality = p_nationality;
  player.flag = p_flag;
  player.club = p_club;
  player.position = p_position;
  player.rating = p_rating;
  player.shooting = p_shooting;
  player.passing = p_passing;
  player.dribling = p_dribbling;
  player.defending = p_defending;
  player.physical = p_physical;
  console.log(player);

  const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  players.push(player);
  localStorage.setItem("ObjetPlayers", JSON.stringify(players));
  location.reload();
})

const container_card = document.getElementById("container_card");

if(!JSON.parse(localStorage.getItem("ObjetPlayers"))){
  fetch('./players.json')
  .then(response => response.json())
  
  .then(data => {
    console.log("players",data);
    localStorage.setItem("ObjetPlayers", JSON.stringify(data.players));
  })
  
}
document.addEventListener("DOMContentLoaded",reloadPage());

function reloadPage(){
  const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  console.log("ObjetPlayers : ",players);
  players.forEach(player=> { 
    let card = document.createElement("div");
    card.classList.add('style_card');
    card.innerHTML = `
    <div>
        <img class="player_image" src="${player.photo}" alt="${player.name}">
        <div class="card_content">
            <div class="player_name">${player.name}</div>
            <div class="player_position">${player.position}</div>
            <div class="player_details">
                Nationalité: ${player.nationality}<br>
                Club: ${player.club}
            </div>
            <div class="player_rating">Note: ${player.rating}</div>
        </div>
    </div>
    `;
    container_card.appendChild(card);
  });

       
}

// fetch('./players.json')
// .then(response => response.json())

// .then(data => {
//   console.log("players",data);

//     data.players.forEach(player=> { 
//         let card = document.createElement("div");
//         card.classList.add('style_card');
//         card.innerHTML = `
//         <div>








//             <img class="player_image" src="${player.photo}" alt="${player.name}">
//             <div class="card_content">
//                 <div class="player_name">${player.name}</div>
//                 <div class="player_position">${player.position}</div>
//                 <div class="player_details">
//                     Nationalité: ${player.nationality}<br>
//                     Club: ${player.club}
//                 </div>
//                 <div class="player_rating">Note: ${player.rating}</div>
//             </div>
//         </div>
//         `;
//         container_card.appendChild(card);

// });
// })
