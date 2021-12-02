// Need to be initialized via DB GET request
var counter = 0;
var multiplier = 1;
var passive_multiplier = 0;
var req_active_points = 25;
var req_passive_points = 25;

function load_game() {
    // Here is where a GET request is needed from the DB for the player's current click counter,
    // their current multiplier value, and possibly their team


    // If new players are registered before game is loaded, may be no need for a new_game() function;
    // Should be able to just pull newly-initialized DB data for player
    update_reqmt_lock();
    document.getElementById("click_counter").innerHTML = counter;
    document.getElementById("active_upgrade_value").innerHTML = multiplier+1;
    document.getElementById("passive_upgrade_value").innerHTML = passive_multiplier+1;
    document.getElementById("multiplier").innerHTML = multiplier;
    document.getElementById("passive_multiplier").innerHTML = passive_multiplier;
};

function increase_active_reqmt() {
    req_active_points = req_active_points * 2;
    update_reqmt_lock();
};

function increase_passive_reqmt() {
    req_passive_points = req_passive_points * 2;
    console.log(req_passive_points);
    update_reqmt_lock();
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

function pirate_click(x) {
    counter += x;
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
    document.getElementById("active_upgrade_value").innerHTML = multiplier+1;
    document.getElementById("multiplier").innerHTML = multiplier;
    increase_active_reqmt();
};

function buy_passive_upgrade() {
    passive_multiplier += 1;
    document.getElementById("passive_upgrade_value").innerHTML = passive_multiplier+1;
    document.getElementById("passive_multiplier").innerHTML = passive_multiplier;
    increase_passive_reqmt();
};

window.setInterval(function() {
    passive_click();
    update_reqmt_lock();
}, 1000);

load_game();