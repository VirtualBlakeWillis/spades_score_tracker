/* popup testing functions */

let affectedByOverlay = ["teamNameMain", "score", "divider"]
let elements = [];
/* New Round Overlay Functions */
function on() {
    document.getElementById("newRoundOverlay").style.display = "block";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "0.5"; }
    }
  }
  
  function off() {
    document.getElementById("newRoundOverlay").style.display = "none";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "1"; }
    }  
}

function endRoundOverlayOn() {
    document.getElementById("endRoundOverlay").style.display = "block";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "0.5"; }
    }
}

function endRoundOverlayOff() {
    document.getElementById("endRoundOverlay").style.display = "none";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "1"; }
    }
}

module.exports = {
    on,
    off,
    endRoundOverlayOn,
    endRoundOverlayOff
};