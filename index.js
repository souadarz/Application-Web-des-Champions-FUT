//chargement de la formation du locale storage
let global_formation = localStorage.getItem("formation");
if (global_formation) {
  global_formation = JSON.parse(global_formation)
}
else {
  global_formation = { formation: "4-3-3", positions: {} };
  localStorage.setItem("formation", JSON.stringify(global_formation));
}
console.log(global_formation);
// chargement du joueur a partir du local storage ou du json
let players_promise = loadData()
// attendre l'execution de loadData et en suite afficher la formation
if (players_promise) {
  players_promise.then(players => { change_formation(global_formation.formation) })
}
// afficher la formation
else {
  change_formation(global_formation.formation);
}

const pitch = document.getElementById("pitch");
let formation_select = document.getElementById("formation_select");
const container_card = document.getElementById("container_card");
let selectedCardDivId = "";
//changement de formation  
formation_select.addEventListener("change", (event) => {
  const formation_selected = event.target.value;
  change_formation(formation_selected);
  localStorage.setItem("formation", JSON.stringify({ formation: formation_selected, positions: global_formation.positions }));
})

const add_button = document.getElementById("add_button")
add_button.addEventListener('click', () => {
  console.log("clicked");
  let formulaire = document.getElementById("player");
  formulaire.style.display = "block";
})

const all_button = document.getElementById("all_btn")
all_button.addEventListener('click', () => {
  let players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  let filteredP = players.filter(player => !player_exists(player));
  displayPlayers(filteredP);
})

const cancel_button = document.getElementById("cancel");
cancel_button.addEventListener('click', () => {
  let formulaire = document.getElementById("player");
  formulaire.style.display = "none";
})
// l'ajout d'un joueur
const form = document.getElementById("id_form");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log(event);
  addPlayer();
})

function get_player_byname(name, players) {
  for (let player of players) {
    if (player.name === name) {
      return player;
    }
  }
}

function player_html(player, clss) {
  return `
     <div id="player_card_${player.position} "class="${clss}">
        <div class="player_card_top">
            <div class="player_info1">
                <div class="player_rating">
                    <span>${player.rating}</span>
                </div>
                <div class="player_position">
                    <span>${player.position}</span>
                </div>
                <div class="player_flag">
                    <img src="${player.flag}" alt="">
                </div>
                <div class="player_logo">
                    <img src="${player.logo}" alt="">
                </div>
            </div>
            <div class="player_photo">
                <img src="${player.photo}" alt="">
            </div>
        </div>
        <div class="player_card_bottom">
            <div class="player_info2">
                <div class="player_name">
                    <span>${player.name}</span>
                </div>
                <div class="player_statistique">
                    <div class="player_stat1">
                        <div>
                            <span class="stat_value">${player.pace}</span>
                            <span class="stat_title">PAC</span>
                        </div>
                        <div>
                            <span class="stat_value">${player.shooting}</span>
                            <span class="stat_title">SHO</span>
                        </div>
                        <div>
                            <span class="stat_value">${player.passing}</span>
                            <span class="stat_title">PAS</span>
                        </div>
                    </div>
                    <div class="player_stat2">
                        <div>
                            <span class="stat_value">${player.dribbling}</span>
                            <span class="stat_title">DRI</span>
                        </div>
                        <div>
                            <span class="stat_value">${player.defending}</span>
                            <span class="stat_title">DEF</span>
                        </div>
                        <div>
                            <span class="stat_value">${player.physical}</span>
                            <span class="stat_title">PHY</span>
                        </div>
                    </div>
    </div>
    `
}

function goolKeeper_html(player, clss) {
  return `
  <div class="${clss}">
     <div class="player_card_top">
         <div class="player_info1">
             <div class="player_rating">
                 <span>${player.rating}</span>
             </div>
             <div class="player_position">
                 <span>${player.position}</span>
             </div>
             <div class="player_flag">
                 <img src="${player.flag}" alt="">
             </div>
             <div class="player_logo">
                 <img src="${player.logo}" alt="">
             </div>
         </div>
         <div class="player_photo">
             <img src="${player.photo}" alt="">
         </div>
     </div>
     <div class="player_card_bottom">
         <div class="player_info2">
             <div class="player_name">
                 <span>${player.name}</span>
             </div>
             <div class="player_statistique">
                 <div class="player_stat1">
                     <div>
                         <span class="stat_value">${player.diving}</span>
                         <span class="stat_title">DIV</span>
                     </div>
                     <div>
                         <span class="stat_value">${player.handling}</span>
                         <span class="stat_title">HAD</span>
                     </div>
                     <div>
                         <span class="stat_value">${player.kicking}</span>
                         <span class="stat_title">KIC</span>
                     </div>
                 </div>
                 <div class="player_stat2">
                     <div>
                         <span class="stat_value">${player.reflexes}</span>
                         <span class="stat_title">REF</span>
                     </div>
                     <div>
                         <span class="stat_value">${player.speed}</span>
                         <span class="stat_title">SPD</span>
                     </div>
                     <div>
                         <span class="stat_value">${player.positioning}</span>
                         <span class="stat_title">POS</span>
                     </div>
                 </div>
 </div>
 `
}

function change_formation(id_formation) {
  console.log(id_formation);

  let players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  fetch('./formations.json')
    .then(response => response.json())
    .then(data => {
      data.formations.forEach(formation => {
        if (formation.id === id_formation) {
          pitch.innerHTML = "";
          formation.players_pos.forEach(player_position => {
            let mydiv = document.createElement("div");
            mydiv.id = "player_" + player_position.id;
            mydiv.dataset.role = player_position.role;
            mydiv.textContent = player_position.role;
            mydiv.style.top = player_position.position.y;
            mydiv.style.left = player_position.position.x;
            mydiv.style.position = "absolute";
            if (global_formation.positions[player_position.id]) {
              console.log("role " + global_formation.positions[player_position.id]);
              let p = get_player_byname(global_formation.positions[player_position.id], players);
              console.log(p);
              if (p) {
                mydiv.innerHTML = (p.position !== "GK") ? player_html(p, "player_card") : goolKeeper_html(p, "player_card");
              }
            }
            // let button = document.createElement("button");
            // button.textContent = "+";
            // mydiv.appendChild(button);
            mydiv.addEventListener('click', (event) => {
              console.log(event);
              selectedCardDivId = "player_" + player_position.id;
              const filteredPlayers = filterPlayers(player_position.role);
              displayPlayers(filteredPlayers);
            })
            mydiv.classList.add("p_card");
            pitch.appendChild(mydiv);
            // button.addEventListener('click', ()=>{
            // });
          });
        }
      })
    })
}

function valid_Statistique(Input_value) {
  let valueInput = parseInt(Input_value);

  if (valueInput < 0 || valueInput > 100) {
    // alert("Veuillez entrer un nombre compris entre 0 et 100");
    return false;
  }
  return true;
}

function addPlayer() {
  let player = {};
  const msg_validation = document.getElementById("validation");
  let is_Valid = true;
  const p_name = document.getElementById("name").value;
  let regex = /^[a-zA-Z]{2,}([ -][a-zA-Z]{2,})$/;
  if (!regex.test(p_name)) {
    is_Valid = false;
    document.getElementById("name").style.borderColor = "red";
    // alert("le nom du joueur est non valid !!!!");
  }
  const p_photo = document.getElementById("photo").value;
  if (p_photo.trim().length < 10) {
    is_Valid = false;
    document.getElementById("photo").style.borderColor = "red";
    // alert("photo non valid !!!!");
  }

  const p_nationality = document.getElementById("nationality").value;
  if (!regex.test(p_nationality)) {
    is_Valid = false;
    document.getElementById("nationality").style.borderColor = "red";
    // alert("nationality non valid !!!!");
  }

  const p_rating = document.getElementById("rating").value;
  if (!valid_Statistique(p_rating)) {
    is_Valid = false;
    document.getElementById("rating").style.borderColor = "red";

  }
  const p_shooting = document.getElementById("shooting").value;
  if (!valid_Statistique(p_shooting)) {
    is_Valid = false;
    document.getElementById("shooting").style.borderColor = "red";
  }

  if (is_Valid) {
    // const p_name = document.getElementById("name").value;
    // const p_photo = document.getElementById("photo").value;
    const p_position = document.getElementById("select_position").value;
    // const p_nationality = document.getElementById("nationality").value;
    const p_flag = document.getElementById("flag").value;
    const p_club = document.getElementById("club").value;
    const p_logo = document.getElementById("logo").value;
    // const p_rating= document.getElementById("rating").value;
    const p_pace = document.getElementById("pace").value;
    // const p_shooting = document.getElementById("shooting").value;
    const p_passing = document.getElementById("passing").value;
    const p_dribbling = document.getElementById("dribbling").value;
    const p_defending = document.getElementById("defending").value;
    const p_physical = document.getElementById("physical").value;

    player.name = p_name
    player.photo = p_photo
    player.position = p_position
    player.nationality = p_nationality
    player.logo = p_logo
    player.flag = p_flag
    player.club = p_club
    player.rating = p_rating

    if (player.position !== "GK") {
      player.pace = p_pace
      player.shooting = p_shooting
      player.passing = p_passing
      player.dribbling = p_dribbling
      player.defending = p_defending
      player.physical = p_physical
    }
    else {
      player.diving = document.getElementById("diving").value;
      player.handling = document.getElementById("handling").value;
      player.kicking = document.getElementById("kicking").value;
      player.reflexes = document.getElementById("reflexes").value;
      player.speed = document.getElementById("speed").value;
      player.positioning = document.getElementById("positioning").value;
    }
    // console.log(player);
    const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
    players.push(player);
    localStorage.setItem("ObjetPlayers", JSON.stringify(players));
    location.reload();
  }
  else {
    msg_validation.style.display = "block";
  }
}

function loadData() {
  if (!localStorage.getItem("ObjetPlayers")) {
    return fetch('./players.json')
      .then(response => response.json())
      .then(data => {
        console.log("players", data);
        localStorage.setItem("ObjetPlayers", JSON.stringify(data.players));
        return data.players;
      })
  }

}
document.addEventListener("DOMContentLoaded", reloadPlayers);

function reloadPlayers() {
  let players_promise = loadData()
  if (players_promise) {
    players_promise.then(players => { displayPlayers(players) })
  }
  else {
    const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
    console.log("ObjetPlayers : ", players);
    displayPlayers(players);
  }
}
function displayPlayers(players) {
  container_card.innerHTML = "";
  players.forEach((player,index) => {
    let card = document.createElement("div");
    let card_html;
    if (player.position !== "GK") {
      card_html = player_html(player, "player_card");
    }
    else {
      card_html = goolKeeper_html(player, "player_card");
    }
    card.innerHTML = card_html;

    const delete_button = document.createElement('button');
    delete_button.classList.add("delete_btn")
    delete_button.innerHTML = '×';
    delete_button.onclick = (event) => {
      event.stopPropagation();
      players.splice(index, 1);
      displayPlayers(players);
      localStorage.setItem("ObjetPlayers", JSON.stringify(players));
    };
    card.prepend(delete_button);
    

    card.addEventListener('click', () => {
      console.log("clicked");
      let selected_card = document.getElementById(selectedCardDivId);
      let position_id = parseInt(selected_card.id.substr(selected_card.id.indexOf('_') + 1));
      selected_card.innerHTML = card_html;
      container_card.removeChild(card);
      // global_formation.positions[selected_card.dataset.role] = player.name;
      global_formation.positions[position_id] = player.name;
      localStorage.setItem("formation", JSON.stringify(global_formation));
      const filteredPlayers = filterPlayers(selected_card.dataset.role);
      displayPlayers(filteredPlayers);
      // location.reload();
      console.log(global_formation);
    })

    // si le joueur est affecté return pour ne pas l'afficher a la liste des joueurs
    if (!player_exists(player)) {
      container_card.appendChild(card);
    }
  });
}

function player_exists(player) {
  for (let [role, player_name] of Object.entries(global_formation.positions)) {
    if (player.name === player_name) {
      return true;
    }
  }
  return false;
}
function filterPlayers(role) {
  const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  return players.filter(player => { return (player.position === role && !player_exists(player)) });
}

const formulaire = document.getElementById("id_form");
formulaire.addEventListener("change", () => {
  const select_position = document.getElementById("select_position");
  if (select_position.value === "GK") {
    let goalkeeper = document.getElementById("goalkeeper");
    goalkeeper.classList.remove("hidden");
    let statistique_div = document.getElementById("statistique");
    statistique_div.classList.add("hidden");
  }
  else {
    let goalkeeper = document.getElementById("goalkeeper");
    goalkeeper.classList.add("hidden");
    let statistique_div = document.getElementById("statistique");
    statistique_div.classList.remove("hidden");
  }
})









let joueurs;
let container = document.getElementById("container_card");
container.forEach(player=>{
  player.addEventListener('click', ()=>{
    console.log(player.name);
  })
})

























