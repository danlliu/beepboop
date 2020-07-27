/*
If you're looking in here for details about how the language works, you should first check the documentation!
 */

let beep_boop = document.querySelector('#code');
let beeps = document.querySelector('#beep');
let boops = document.querySelector('#boop');

let beepbeepbeepboopboopboop = document.querySelector('#compy');
let beepbeepbeepboopboopbeep = document.querySelector('#step');
let beepbeepbeepboopbeepboop = document.querySelector('#end');

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

function beepboop(beep, boop) {
    beep = beep.toLowerCase();
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
        beeps.append("<b>Halting!</b>");
        beepbeepbeepbeep = true;
        return;
    }
    if (beep === "boop beep boop") {
        let boopbeepboop = boopboop(boop);
        if (boopboopboop.length != 0 && boopboopboop[boopboopboop.length - 1] != 0) {
            return boopbeepboop;
        }
    }
    let badbeep = beep;
    beeps.innerHTML += `<span style='color: red'>Syntax error at line ${badbeep}</span>`;
}

let currentbeep_boop = 0;
let beeps_and_boops = [];

function compile() {
    boopboopboop = [];
    beeps_and_boops = beep_boop.value.split('\n');
    console.log(beeps_and_boops);
    currentbeep_boop = 0;
    beepbeepbeepboopboopboop.disabled = true;
    beepbeepbeepboopboopbeep.disabled = false;
    beepbeepbeepboopbeepboop.disabled = false;
    beeps.innerHTML = "";
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
        }
    }
}

function end() {
    beepbeepbeepboopboopboop.disabled = false;
    beepbeepbeepboopboopbeep.disabled = true;
    beepbeepbeepboopbeepboop.disabled = true;
}
