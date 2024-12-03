
  loadData();
  let global_formation = localStorage.getItem("formation");
  global_formation = (global_formation)? JSON.parse(global_formation): {formation:"4-3-3", positions: {}};
// console.log(global_formation);
change_formation(global_formation.formation);
const pitch = document.getElementById("pitch");
let formation_select = document.getElementById("formation_select");
const container_card = document.getElementById("container_card");
let selectedCardDivId = "";

formation_select.addEventListener("change", (event) => {
  const formation_selected = event.target.value;
  change_formation(formation_selected);
  localStorage.setItem("formation", JSON.stringify({formation:formation_selected, positions:{}}));
  })

const add_button = document.getElementById("add_button")
add_button.addEventListener('click', () => {
  console.log("clicked");
  let formulaire = document.getElementById("player");
  formulaire.style.display = "block";
})

const cancel_button = document.getElementById("cancel");
cancel_button.addEventListener('click', () => {
  let formulaire = document.getElementById("player");
  formulaire.style.display = "none";
})

const form = document.getElementById("id_form");
form.addEventListener('submit', (event)=>{
  event.preventDefault();
  // console.log(event);
  addPlayer();
})

//FUNCTIONS
function get_player_byname(name, players){
  for (let player of players){
    if (player.name === name) {
      return player;
    }
  }
}

function player_html(player){
  return `
     <div id="player_card_${player.position} "class="player_card">
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

function goolKeeper_html(player){
  return  `
  <div class="player_card">
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
            console.log(global_formation.positions);
            
            if(global_formation.positions){ // hadi khsseha tbdell
              console.log("id " + global_formation.positions);
              let p = get_player_byname(global_formation.positions[player_position.player_id], players);
              console.log(p);
              if (p) {
                mydiv.innerHTML = (p.position !== "GK") ? player_html(p) : goolKeeper_html(p);
              }
            }
            // let button = document.createElement("button");
            // button.textContent = "+";
            // mydiv.appendChild(button);
            mydiv.addEventListener('click', (event)=>{
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

function addPlayer(){
  let player = {};
  
  player.name = document.getElementById("name").value;
  player.photo = document.getElementById("photo").value;
  player.position = document.getElementById("select_position").value;
  player.nationality = document.getElementById("nationality").value;
  player.logo = document.getElementById("logo").value;
  player.flag = document.getElementById("flag").value;
  player.club = document.getElementById("club").value;
  player.rating = document.getElementById("rating").value;

  if(player.position !== "GK"){
  player.pace = document.getElementById("pace").value;
  player.shooting = document.getElementById("shooting").value;
  player.passing = document.getElementById("passing").value;
  player.dribbling = document.getElementById("dribbling").value;
  player.defending = document.getElementById("defending").value;
  player.physical = document.getElementById("physical").value;
  }
  else{
    player.diving =document.getElementById("diving").value;
    player.handling =document.getElementById("handling").value;
    player.kicking =document.getElementById("kicking").value;
    player.reflexes=document.getElementById("reflexes").value;
    player.speed =document.getElementById("speed").value;
    player.positioning =document.getElementById("positioning").value;
  }
  console.log(player);
  
  const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  players.push(player);
  localStorage.setItem("ObjetPlayers", JSON.stringify(players));
  location.reload();
}

function loadData(){
  if(!localStorage.getItem("ObjetPlayers")){
    return fetch('./players.json')
    .then(response => response.json())
    .then(data => {
      console.log("players",data);
      localStorage.setItem("ObjetPlayers", JSON.stringify(data.players));
    })
}
  
}
document.addEventListener("DOMContentLoaded",reloadPlayers());

function reloadPlayers(){
  loadData();
  const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  console.log("ObjetPlayers : ",players);
  displayPlayers(players);
}
function displayPlayers(players){
  container_card.innerHTML = "";
  players.forEach(player=> { 
    let card = document.createElement("div");
    let card_html;
  if(player.position !== "GK"){
    card_html = player_html(player);
    }
    else{
      card_html = goolKeeper_html(player);
    }
    card.innerHTML = card_html;

    card.addEventListener('click', () => {
      console.log("clicked");
      let selected_card = document.getElementById(selectedCardDivId);
      selected_card.innerHTML = card_html;
      container_card.removeChild(card);
      let player_id = parseInt(selected_card.id.substr(selected_card.id.indexOf('_')+1));
      // achanger
      // global_formation.positions[selected_card.dataset.role] = player.name;
      global_formation.positions[selected_card.id] = player.name;
      localStorage.setItem("formation", JSON.stringify(global_formation));
      const filteredPlayers = filterPlayers(selected_card.dataset.role);
      displayPlayers(filteredPlayers);
      // location.reload();
      console.log(global_formation);
    })
    for (const [key, player_name] of Object.entries(global_formation.positions)) {
      if(player_name === player.name) {
        return
      }
    }
    container_card.appendChild(card);
  });
}

function player_exists(player){
  for(let [role, player_name] of Object.entries(global_formation.positions)){
    if(player.name === player_name){
      return true;
    }
  }
  return false;
}
function filterPlayers (role){
  const players = JSON.parse(localStorage.getItem("ObjetPlayers"));
  return players.filter(player => {return (player.position === role && !player_exists(player))});
}

// function remplaçant(){
//   selectedCardDivId = document.getElementById(selectedCardDivId);
//     if(selectedCardDivId.innerHTML === ""){
//       console.log(selectedCardDivId.innerHTML === "")
//       selectedCardDivId.innerHTML = card_html;
//     }
//     else{
//       console.log("inside else")
//       let temp = selectedCardDivId.innerHTML;
//       container_card.appendChild(card);
//       selectedCardDivId.innerHTML = card_html;
//       card_html = temp;
//     }
// }

const formulaire = document.getElementById("id_form");
formulaire.addEventListener("change", () => {
  const select_position = document.getElementById("select_position");
  if(select_position.value === "GK"){
    let goalkeeper = document.getElementById("goalkeeper");
    goalkeeper.classList.remove("hidden");
    let statistique_div = document.getElementById("statistique");
    statistique_div.classList.add("hidden");
  }
  else{
    let goalkeeper = document.getElementById("goalkeeper");
    goalkeeper.classList.add("hidden");
    let statistique_div = document.getElementById("statistique");
    statistique_div.classList.remove("hidden");
  }
})