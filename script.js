
const pitch = document.getElementById("pitch");
fetch('./formations.json')
  .then(response => response.json())
  .then(data => {
    data.formations[0].players_pos.forEach(player => {
        console.log(player.position.x)
        let mydiv = document.createElement("div");
        mydiv.textContent = player.role;
        mydiv.style.bottom = player.position.y;
        mydiv.style.left = player.position.x;
        mydiv.style.position = "absolute";
        pitch.appendChild(mydiv);
    });
  })