let hours;
let minutes;
let seconds;
let distance;
let unit;
let race;
let phr;
let pmin;
let psec;
let punit;
let rawtime;
let rawpace;

//saves all of the variables on screen
function saveVariables(){
    hours = Number(document.getElementById('hr').value);
    minutes = Number(document.getElementById('min').value);
    seconds = Number(document.getElementById('sec').value);
    distance = Number(document.getElementById('dist').value);
    unit = document.getElementById('unit').value;
    race = document.getElementById('event').value;
    phr = Number(document.getElementById('phr').value);
    pmin = Number(document.getElementById('pmin').value);
    psec = Number(document.getElementById('psec').value);
    punit = document.getElementById('punit').value;
}
saveVariables();

//converts HH:MM:SS to seconds
function convertToSeconds(){
    rawtime = hours*3600 + minutes*60 + seconds;
}

// converts seconds to HH:MM:SS
function convertToTime(){
    hours = Math.floor(rawtime / 3600);
    rawtime %= 3600;
    minutes = Math.floor(rawtime / 60);
    seconds = rawtime % 60;
}

// converts seconds per unit to HH:MM:SS
function rawpaceToPace(){
    phr = Math.floor(rawpace / 3600);
    rawpace %= 3600;
    pmin = Math.floor(rawpace / 60);
    psec = rawpace % 60;
}

//converts HH:MM:SS pace to seconds per unit
function paceToRawpace(){
    rawpace = phr*3600 + pmin*60 + psec;
}

//substitutes distance and units for selected race
function pickEventSub(){
    if (race == "5k"){
        distance = 5;
        unit = "km";
    }
    if (race == "mile"){
        distance = 1;
        unit = "mi";
    }
    if (race == "800"){
        distance = 800;
        unit = "m";
    }
    if (race == "400"){
        distance = 400;
        unit = "m";
    }
    if (race == "200"){
        distance = 200;
        unit = "m";
    }
    if (race == "half"){
        distance = 13.109;
        unit = "mi";
    }
    if (race == "full"){
        distance = 26.219;
        unit = "mi";
    }
    if (race != "none"){
        document.getElementById('dist').value = distance;
        document.getElementById('unit').value = unit;
    }
}

function calcTime(){
    saveVariables();
    paceToRawpace();
    pickEventSub();
    if ((punit=="pkm" && unit=="km")||(punit=="pmile" && unit=="mi")){
        rawtime = rawpace * distance;
    }
    if (punit == "pkm" && unit =="mi"){
        rawtime = rawpace * distance * 1.609;
    }
    if (punit == "pkm" && unit =="m"){
        rawtime = rawpace * distance * 0.001;
    }
    if (punit == "pmile" && unit =="km"){
        rawtime = rawpace * distance * 0.621;
    }
    if (punit == "pmile" && unit =="m"){
        rawtime = rawpace * distance * 0.000621;
    }
    convertToTime();

    document.getElementById('hr').value = hours;
    document.getElementById('min').value = minutes;
    seconds = Math.round(seconds*100)/100
    document.getElementById('sec').value = seconds;
}

function calcDistance(){
    saveVariables();
    convertToSeconds();
    paceToRawpace();
    if ((unit == "mi" && punit == "pmile")||(unit == "km" && punit == "pkm")){
        distance = rawtime/rawpace;
    }
    if (unit == "km" && punit == "pmile"){
        distance = rawtime*1.609/rawpace;
    }
    if (unit == "mi" && punit == "pkm"){
        distance = rawtime/(rawpace*1.609);
    }
    if (unit == "m" && punit == "pkm"){
        distance = rawtime*1000/rawpace;
        console.log(1000);
    }
    if (unit == "m" && punit == "pmile"){
        distance = rawtime*1609/rawpace;
    }
    //round the distance to two decimanl places
    distance = Math.round(distance*100)/100
    document.getElementById('dist').value = distance;

}

//converts time and distance/event to pace
function calcPace(){
    saveVariables();
    convertToSeconds();
    pickEventSub();
    //converts to seconds per mile
    if (punit == "pmile"){
        if (unit == "m") {
            rawpace = rawtime/(distance/1609);
        }
        if (unit == "km") {
            rawpace = rawtime/(distance/1.609);
        }
        if (unit == "mi") {
            rawpace = rawtime/distance;
        }
    }
    //converts to seconds per km
    if (punit == "pkm"){
        if (unit == "m") {
            rawpace = rawtime/(distance/1000);
        }
        if (unit == "km") {
            rawpace = rawtime/distance;
        }
        if (unit == "mi") {
            rawpace = rawtime/(distance*1.609);
        }
    }
    // converts seconds to HH:MM:SS then prints
    rawpaceToPace();
    document.getElementById('phr').value = phr;
    document.getElementById('pmin').value = pmin;
    psec = Math.round(psec*100)/100
    document.getElementById('psec').value = psec;

}

if ((window.innerHeight > window.innerWidth)&&(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
    alert("Please use Landscape!");
}
