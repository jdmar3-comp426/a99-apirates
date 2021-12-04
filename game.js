// Need to be initialized via DB GET request
var counter = 0;
var multiplier = 1;
var passive_multiplier = 0;
var req_active_points = 25;
var req_passive_points = 25;


function load_game() {
    // Here is where a GET request is needed from the DB for the player's current click counter,
    // their current multiplier value, and possibly their team
    const sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "http://localhost:5000/app/user/" + localStorage.getItem("id"),false)
    sendRequest.send();
    var accountArray = JSON.parse(sendRequest.responseText);
    // If new players are registered before game is loaded, may be no need for a new_game() function;
    // Should be able to just pull newly-initialized DB data for player
    update_reqmt_lock();
    counter = accountArray["points"];
    multiplier = accountArray["active"];
    passive_multiplier = accountArray["passive"];
    req_active_points = accountArray["activeCost"];
    req_passive_points = accountArray["passiveCost"];
    document.getElementById("click_counter").innerHTML = counter;
    document.getElementById("next_active_upgrade").innerHTML = req_active_points;
    document.getElementById("next_passive_upgrade").innerHTML = req_passive_points;
    // document.getElementById("active_upgrade_value").innerHTML = multiplier+1;
    //document.getElementById("passive_upgrade_value").innerHTML = passive_multiplier+1;
    //document.getElementById("multiplier").innerHTML = multiplier;
    //document.getElementById("passive_multiplier").innerHTML = passive_multiplier;
};

function increase_active_reqmt() {
    req_active_points = req_active_points * 3;
    update_reqmt_lock();
    document.getElementById("next_active_upgrade").innerHTML = req_active_points;
};

function increase_passive_reqmt() {
    req_passive_points = req_passive_points * 3;
    update_reqmt_lock();
    document.getElementById("next_passive_upgrade").innerHTML = req_passive_points;
};

function update_reqmt_lock() {
    if(counter < req_active_points) {
        document.getElementById("active_click_upgrade").disabled = true;
        document.getElementById("active_click_upgrade").title = `Must have more than ${req_active_points-1} points for this upgrade!`;
    } else {
        document.getElementById("active_click_upgrade").disabled = false;
        document.getElementById("active_click_upgrade").title = `Buy Active Upgrade?`;
    }

    if(counter < req_passive_points) {
        document.getElementById("passive_click_upgrade").disabled = true;
        document.getElementById("passive_click_upgrade").title = `Must have more than ${req_passive_points-1} points for this upgrade!`;
    } else {
        document.getElementById("passive_click_upgrade").disabled = false;
        document.getElementById("passive_click_upgrade").title = `Buy Passive Upgrade?`;
    }
}
function saveGame(){ //currently updates only email, will change to game variables we want to pass to update

    const sendRequest = new XMLHttpRequest();
    const updateInfo = new URLSearchParams();
    updateInfo.append("user",localStorage.getItem("user"));        
    updateInfo.append("pass",localStorage.getItem("pass"));
    updateInfo.append("email",localStorage.getItem("email"));
    updateInfo.append("points",counter);
    updateInfo.append("active",multiplier);
    updateInfo.append("passive",passive_multiplier);
    updateInfo.append("activeCost",req_active_points);
    updateInfo.append("passiveCost",req_passive_points);
    sendRequest.addEventListener( "load", function(event){
        alert( "Your account was updated!" );
    });

    sendRequest.addEventListener( "error", function(event){
        alert( "Update unsuccesfull. Please try again." );
    });

    sendRequest.open( "PATCH", "http://localhost:5000/app/update/user/" + localStorage.getItem("id"));
    sendRequest.send(updateInfo);
    const sendRequestasd = new XMLHttpRequest();

//check all accounts for debug
    sendRequestasd.open("GET", "http://localhost:5000/app/users",false)
                
    sendRequestasd.send();
    ////////////console.log(sendRequestasd.responseText);
 
    var accountArray = JSON.parse(sendRequestasd.responseText);
    ////////////console.log(accountArray);
    
};
function pirate_click(x) {
    counter += x;
    ////////////console.log(counter);
    document.getElementById("click_counter").innerHTML = counter;
};

function active_click() {
    pirate_click(multiplier);
}

function passive_click() {
    pirate_click(passive_multiplier);
}

function buy_active_upgrade() {
    multiplier += 1;
    //document.getElementById("active_upgrade_value").innerHTML = multiplier+1;
    //document.getElementById("multiplier").innerHTML = multiplier;
    increase_active_reqmt();
};

function buy_passive_upgrade() {
    passive_multiplier += 1;
    //document.getElementById("passive_upgrade_value").innerHTML = passive_multiplier+1;
    //document.getElementById("passive_multiplier").innerHTML = passive_multiplier;
    increase_passive_reqmt();
};

window.setInterval(function() {
    passive_click();
    update_reqmt_lock();
}, 1000);

load_game();