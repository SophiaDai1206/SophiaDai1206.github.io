function myMoveRed() {
  let id = null;
  const elem = document.getElementById("animateRed");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    const speed = document.getElementById("speedSelectRed").value;
    console.log(speed);
    if (speed === "slow"){
        if (pos == 350) {
        clearInterval(id);
        } else {
        pos++; 
        elem.style.top = pos + "px"; 
        elem.style.left = pos + "px"; 
        }
    }
    else if (speed ==="medium"){
        if (pos == 175) {
        clearInterval(id);
        } else {
        pos++; 
        elem.style.top = 2*pos + "px"; 
        elem.style.left = 2*pos + "px"; 
        }
    }
    else if (speed ==="fast"){
        if (pos == 50) {
        clearInterval(id);
        } else {
        pos++; 
        elem.style.top = 7*pos + "px"; 
        elem.style.left = 7*pos + "px"; 
        }
    }
  }
}
    
function myMoveBlue() {
    let id = null;
    const elem = document.getElementById("animateBlue");   
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        const speed = document.getElementById("speedSelectBlue").value;
        console.log(speed);
        if (speed === "slow"){
            if (pos == 350) {
            clearInterval(id);
            } else {
            pos++; 
            elem.style.top = pos + "px"; 
            elem.style.right = pos + "px"; 
            }
        }
        else if (speed ==="medium"){
            if (pos == 175) {
            clearInterval(id);
            } else {
            pos++; 
            elem.style.top = 2*pos + "px"; 
            elem.style.right = 2*pos + "px"; 
            }
        }
        else if (speed ==="fast"){
            if (pos == 50) {
            clearInterval(id);
            } else {
            pos++; 
            elem.style.top = 7*pos + "px"; 
            elem.style.right = 7*pos + "px"; 
            }
        }
    }
}
