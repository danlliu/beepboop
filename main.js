/*
If you're looking in here for details about how the language works, you should first check the documentation!
 */

let beep_boop = document.querySelector('#code');
let beeps = document.querySelector('#beep');
let boops = document.querySelector('#boop');
let beepboopbeepboop = document.querySelector('#current_beepboop');

let beepbeepbeepboopboopboop = document.querySelector('#compy');
let beepbeepbeepboopboopbeep = document.querySelector('#step');
let beepbeepbeepboopbeepboop = document.querySelector('#end');
let beepbeepbeepboopbeepbeep = document.querySelector('#run');

const BOOP = 0;

let boopboopboop = [];
let beepbeepbeepbeep = false;

function updateboops() {
    boops.innerHTML = "";
    boopboopboop.forEach(beep => boops.innerHTML += `<li class="list-group-item">${beep}</li>`);
}

function boopboop(boop) {
    boop = boop.toLowerCase();
    let beep = boop.split(' ');
    console.log(beep);
    let beeps = Math.pow(2, beep.length - 1);
    let beepboopbeep = 0;
    for (let boopbeep = 0; boopbeep < beep.length; ++boopbeep) {
        if (beep[boopbeep] === 'beep') {
            beepboopbeep += beeps;
        } else if (beep[boopbeep] !== 'boop') {
            beeps.innerHTML += `<span style='color: red'>Syntax error at token ${beep[boopbeep]}</span>`
            beepbeepbeepbeep = true;
            return;
        }
        beeps /= 2;
    }
    console.log(beepboopbeep);
    return beepboopbeep;
}

let currentbeep_boop = 0;
let beeps_and_boops = [];

function beepboop(beep, boop) {
    beep = beep.toLowerCase();
    if (beep === "") {
        return;
    }
    if (beep.startsWith("beepboop")) {
        return;
    }
    if (beep === "beep") {
        if (boopboopboop.length === 0) {
            beeps.innerHTML += "<span style='color: red'>Error: cannot run \"beep\" when the stack is empty.</span>"
            beepbeepbeepbeep = true;
            return;
        }
        boopboopboop.pop();
        return;
    }
    if (beep === "boop") {
        boopboopboop.push(BOOP);
        return;
    }
    if (beep === "beep boop") {
        if (boopboopboop.length === 0) {
            beeps.innerHTML += "<span style='color: red'>Error: cannot run \"beep boop\" when the stack is" +
                " empty.</span>";
            beepbeepbeepbeep = true;
            return;
        }
        let boop = boopboopboop[boopboopboop.length - 1];
        if (boop > 127) {
            beeps.innerHTML += "<span style='color: red'>Error: cannot call \"beep boop\" when top of stack is" +
                " greater than 127";
            beepbeepbeepbeep = true;
            return;
        }
        if (boop < 32 && boop !== 10) {
            beeps.innerHTML += "<span style='color: red'>Error: \"beep boop\" doesn't support this character!";
            beepbeepbeepbeep = true;
            return;
        }
        beeps.innerHTML += String.fromCharCode(boop);
        return;
    }
    if (beep === "beep beep") {
        if (boopboopboop.length === 0) {
            beeps.innerHTML += "<span style='color: red'>Error: cannot run \"beep boop\" when the stack is" +
                " empty.</span>";
            beepbeepbeepbeep = true;
            return;
        }
        let boop = boopboopboop[boopboopboop.length - 1];
        beeps.innerHTML += `${boop}`;
        return;
    }
    if (beep === "boop boop") {
        if (boop == null) {
            beeps.innerHTML += "<span style='color: red'>Error: \"boop boop\" requires a number on the line" +
                " after.</span>";
            beepbeepbeepbeep = true;
            return;
        }
        boopboopboop.push(boopboop(boop));
        ++currentbeep_boop;
        return;
    }
    if (beep === "beep beep beep beep") {
        beeps.innerHTML += "<br/><b>Halting!</b></br>";
        beepbeepbeepbeep = true;
        return;
    }
    if (beep === "beep beep boop") {
        if (boopboopboop[boopboopboop.length - 1] < 1 || boopboopboop[boopboopboop.length - 1] > beeps_and_boops.length) {
            beeps.innerHTML += `<span style='color: red'>Error: cannot jump to line ${boopboopboop[boopboopboop.length - 1]}</span>`;
            beepbeepbeepbeep = true;
        }
        return boopboopboop[boopboopboop.length - 1] - 1;
    }
    if (beep === "beep beep beep") {
        if (boop == null) {
            beeps.innerHTML += "<span style='color: red'>Error: \"boop boop\" requires a number on the line" +
                " after.</span>";
            beepbeepbeepbeep = true;
            return;
        }
        let boopbeepboop = boopboop(boop);
        if (boopbeepboop < 1 || boopbeepboop > beeps_and_boops.length) {
            beeps.innerHTML += `<span style='color: red'>Error: cannot jump to line ${boopboopboop[boopboopboop.length - 1]}</span>`;
            beepbeepbeepbeep = true;
        }
        if (boopboopboop.length !== 0 && boopboopboop[boopboopboop.length - 1] !== 0) {
            return boopbeepboop - 1;
        }
    }
    if (beep === "boop boop boop") {
        if (boopboopboop.length < 2) {
            beeps.innerHTML += `<span style='color: red'>Can't run \"boop boop boop\" because there aren't two numbers on the stack!</span>`;
            beepbeepbeepbeep = true;
            return;
        }
        let boopboopboopboop = boopboopboop.pop();
        let boopboopboopbeep = boopboopboop.pop();
        boopboopboop.push(boopboopboopboop + boopboopboopbeep);
        return;
    }
    if (beep === "boop boop beep") {
        if (boopboopboop.length == 0) {
            beeps.innerHTML += `<span style='color: red'>Can't run \"boop boop boop\" because there isn't a number on the stack!</span>`;
            beepbeepbeepbeep = true;
            return;
        }
        boopboopboop[boopboopboop.length - 1] *= -1;
        return;
    }
    if (beep === "boop beep boop") {
        if (boopboopboop.length < 2) {
            beeps.innerHTML += `<span style='color: red'>Can't run \"boop boop boop\" because there aren't two numbers on the stack!</span>`;
            beepbeepbeepbeep = true;
            return;
        }
        let boopbeepboopboop = boopboopboop.pop();
        let boopbeepboopbeep = boopboopboop.pop();
        boopboopboop.push(boopbeepboopboop * boopbeepboopbeep);
        return;
    }
    if (beep === "boop beep beep") {
        if (boopboopboop.length < 2) {
            beeps.innerHTML += `<span style='color: red'>Can't run \"boop boop boop\" because there aren't two numbers on the stack!</span>`;
            beepbeepbeepbeep = true;
            return;
        }
        let boopbeepbeepboop = boopboopboop.pop();
        let boopbeepbeepbeep = boopboopboop.pop();
        boopboopboop.push(Math.floor(boopbeepbeepboop / boopbeepbeepbeep));
        boopboopboop.push(boopbeepbeepboop % boopbeepbeepbeep);
    }
    let badbeep = beep;
    beeps.innerHTML += `<span style='color: red'>Syntax error at line ${currentbeep_boop + 1}: ${badbeep}</span>`;
    beepbeepbeepbeep = true;
}

function compile() {
    boopboopboop = [];
    beeps_and_boops = beep_boop.value.split('\n');
    console.log(beeps_and_boops);
    currentbeep_boop = 0;
    beepbeepbeepbeep = false;
    beepbeepbeepboopboopboop.disabled = true;
    beepbeepbeepboopboopbeep.disabled = false;
    beepbeepbeepboopbeepboop.disabled = false;
    beepbeepbeepboopbeepbeep.disabled = false;
    beeps.innerHTML = "";
    beepboopbeepboop.innerHTML = "&gt;";
    updateboops();
}

function step() {
    if (currentbeep_boop < beeps_and_boops.length) {
        let beep = beepboop(beeps_and_boops[currentbeep_boop], currentbeep_boop === beeps_and_boops.length - 1 ? null : beeps_and_boops[currentbeep_boop + 1]);
        updateboops();
        ++currentbeep_boop;
        if (beep != null) {
            currentbeep_boop = beep;
        }
        if (currentbeep_boop >= beeps_and_boops.length || beepbeepbeepbeep) {
            beepbeepbeepboopboopbeep.disabled = true;
            beepbeepbeepboopbeepbeep.disabled = true;
        }
        beepboopbeepboop.innerHTML = "";
        for (let boop = 0; boop < currentbeep_boop; ++boop) {
            beepboopbeepboop.innerHTML += "<br/>";
        }
        beepboopbeepboop.innerHTML += "&gt;";
    }
}

function run() {
    var timer = setInterval(() => {
        step();
        if (currentbeep_boop >= beeps_and_boops.length || beepbeepbeepbeep) {
            clearInterval(timer);
        }
    }, 750);
}

function end() {
    beepbeepbeepboopboopboop.disabled = false;
    beepbeepbeepboopboopbeep.disabled = true;
    beepbeepbeepboopbeepboop.disabled = true;
    beepbeepbeepboopbeepbeep.disabled = true;
    beepboopbeepboop.innerHTML = "";
}
