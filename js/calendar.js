
let loaded = "year";
//function to get the day of the week starting from monday instead of sunday
function getWeekDay(d) {
    if (d < 0) {
        return 6;
    } else {
        return d - 1;
    }
}

function next() {
    if (loaded == "month") {
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        addDaysToMonth(monthCalendarName, currentDay, currentMonth, currentYear);
    } else if (loaded == "year") {

    } else if (loaded == "day") {
        if(getDaysInMonth(currentMonth,currentYear) == currentDay ){
            currentDay = 1;
            if(currentMonth == 11){
                currentMonth = 0;
                currentYear++;
            }else{
                currentMonth++;
            }
        }else{
            currentDay++;
        }
        createRooms();
    }
}
function previous() {
    if (loaded == "month") {
        if (currentMonth == 0) {
            currentYear--;
            currentMonth = 11;
        } else {
            currentMonth--;
        }
        addDaysToMonth(monthCalendarName, currentDay, currentMonth, currentYear);
    } else if (loaded == "year") {

    } else if (loaded == "day") {
        if(currentDay == 1 ){
            if(currentMonth == 0){
                currentYear--;
                currentMonth = 11;
                currentDay = getDaysInMonth(currentMonth,currentYear);
            }else{
                currentMonth--;
                currentDay = getDaysInMonth(currentMonth,currentYear);
            }
        }else{
            currentDay--;
        }
        createRooms();
    }
}

function getDaysInMonth(month, year) {
    let val = new Date(year, month, 0).getDate();
    return val;
}

function addDaysToMonth(elementName, day, month, year) {
    try{
        console.log(elementName, day, month, year);
        let newDate = new Date(year, month, day);
        let previousMonth = getDaysInMonth(month, year);
        let daysInMonth = getDaysInMonth(month + 1, year);
        let element = document.getElementById(elementName);
        let beginDay = getWeekDay(new Date(year, month, 1).getDay());
        let childNodes = element.childNodes;
        let dayCounter = 0;
        previousMonth -= beginDay;
        let endMonthGrid = daysInMonth + beginDay;
        if(elementName == monthCalendarName){
            document.getElementById("month-name").innerText = monthNames[month] + " - " + year;
        }
        
        console.log(childNodes);
        for (let i = 0; i < beginDay; i++) {

            let div = childNodes[i];
            
            
            previousMonth++;
            if (true) {
                div.innerText = previousMonth;
                div.className = "other-month";
            }

        }
        for (let i = beginDay; i < endMonthGrid; i++) {

            let div = childNodes[i];
            dayCounter++;
            if (div.ELEMENT_NODE) {
                div.className = "";
                div.innerText = dayCounter;
                div.setAttribute("onclick","currentDay = "+dayCounter+";currentMonth = "+month+"; currentYear = "+year+";calendarShow('day');")
            }

        }
        for (let i = endMonthGrid; i < boxCount; i++) {
            let div = childNodes[i];
            if (div.ELEMENT_NODE) {
                div.innerText = i - endMonthGrid + 1;
                div.className = "other-month";
            }
        }
    }catch(err){
        console.log(err);
    }
}

function resetPlan() {
    document.getElementById("day-grid").innerHTML = null;
    
}

function planRooms() {
    dayTitle.innerText = currentDay + " - " + monthNames[currentMonth] + " - " + currentYear;
    reservations.forEach(reservation => {
        if(reservation.day == currentDay && reservation.month - 1 == currentMonth && reservation.year == currentYear){
        let start = reservation.from;
        let end = reservation.end;
        let room = reservation.room
        let planContainer = document.getElementById("room" + room + "-hour" + start);
        let warning = document.createElement("span");
        planContainer.innerText = reservation.name + " - " + reservation.plan;
        planContainer.style.backgroundColor = plannerColor;
        planContainer.style.border = "none";
        planContainer.style.color = "white";
        if (start == end) {
            warning.className = "warning";
            if (reservation.warning != undefined && reservation.warning != null && reservation.warning != "") {
                warning.innerText = "Waarschuwing " + reservation.warning;
            }

            warning.style.marginTop = "10px";
            planContainer.appendChild(warning);
        } else {
            for (let i = 0; i < end - start + 0.5; i += 0.5) {
                let fullPlan = document.getElementById("room" + room + "-hour" + (start + i));
                fullPlan.style.backgroundColor = plannerColor;

                if ((start + i) < end) {
                    fullPlan.style.border = "none";
                } else if ((start + i) >= end) {

                    warning.className = "warning";
                    if (reservation.warning != undefined && reservation.warning != null && reservation.warning != "") {
                        warning.innerText = "Waarschuwing " + reservation.warning;
                        fullPlan.appendChild(warning);
                    }

                }
            }
        }
    }

    });
}

function createRooms() {
    resetPlan();
    for (let i = 0; i < rooms; i++) {
        let roomContainer = document.createElement("div");
        roomContainer.id = "room-container"
        let roomName = document.createElement("h2");
        let room = document.createElement("div");
        room.id = "room" + (i + 1);
        room.className = "room";
        for (let x = 0; x <= (endTime - beginTime); x += 0.5) {
            let tempTime = ((beginTime) + (x));
            let hour = document.createElement("span");
            let planner = document.createElement("span");
            planner.id = "room" + (i + 1) + "-hour" + tempTime;;
            planner.className = "reservation";
            let hourEnding = ((tempTime) > Math.floor(tempTime)) ? "30" : "00";

            if (tempTime < 10) {
                hour.innerText = "0" + Math.floor(tempTime) + ":" + hourEnding;
            } else {
                hour.innerText = Math.floor(tempTime) + ":" + hourEnding;
            }

            room.appendChild(hour);
            room.appendChild(planner);
        }
        roomName.innerText = roomtext + " " + (i + 1);
        dayCalendar.appendChild(roomContainer);
        roomContainer.appendChild(roomName);
        roomContainer.appendChild(room);
        
    }
    planRooms();
}
function createMonth() {
    let monthName = document.createElement("h2");
    monthName.innerText = monthNames[currentMonth];
    monthName.id = "month-name";
    monthCalendar.appendChild(monthName);
    let monthGrid = document.createElement("div");
    monthGrid.id = "month-calendar-big";
    monthGrid.className = "month-grid";
    let nameContainer = document.createElement("div");
    nameContainer.className = "name-grid";
    for (let i = 0; i < dayNames.length; i++) {
        let dayName = document.createElement("div");
        dayName.className = "names";
        dayName.innerText = dayNames[i];
        nameContainer.appendChild(dayName);

    }
    monthCalendar.appendChild(nameContainer);
    for (let i = 0; i < boxCount; i++) {
        let dayDiv = document.createElement('div');
        dayDiv.id = "month-day-" + i;
        monthGrid.appendChild(dayDiv);
    }
    monthCalendar.appendChild(monthGrid);
    addDaysToMonth(monthCalendarName, currentDay, currentMonth, currentYear);
}
function calendarShow(type) {

    if (type == "month") {
        //month calendar
        loaded = "month";
        // week.style.display = "none";
        month.style.display = "block";
        day.style.display = "none";
        year.style.display = "none";
    }
    else if (type == "year") {
        loaded = "year";
        // week.style.display = "none";
        month.style.display = "none";
        day.style.display = "none";
        year.style.display = "block";

    }
    else if (type == "day") {
        loaded = "day";
        createRooms();
        // week.style.display = "none";
        month.style.display = "none";
        day.style.display = "block";
        year.style.display = "none";
    }
}

function createYear() {

    for (let i = 0; i < monthNames.length; i++) {
        let monthYear = document.createElement("div");
        monthYear.id = "month-" + monthNames[i];
        monthYear.className = "month-year";
        let title = document.createElement("h1");
        title.id = "year-month-name";
        title.innerText = monthNames[i];
        monthYear.appendChild(title);
        let nameGrid = document.createElement("div");
        nameGrid.className = "name-grid";
        for (let i = 0; i < 7; i++) {
            let name = document.createElement("div");
            name.innerText = dayNames[i];
            name.className = "names";
            nameGrid.appendChild(name);
        }
        monthYear.appendChild(nameGrid);
        let monthCalendar = document.createElement("div");
        monthCalendar.id = "month-calendar-"+monthNames[i];
        monthCalendar.className = "month-grid";
        for (let i = 0; i < boxCount; i++) {
            let box = document.createElement("div");
            monthCalendar.appendChild(box);

        }
        monthYear.appendChild(monthCalendar);

        yearCalendar.appendChild(monthYear);

    }
    for (let i = 0; i < monthNames.length; i++) {
        addDaysToMonth(("month-calendar-"+(monthNames[i])),0,i,2022);
        
    }

}
myInterval = setInterval(warningAlert, 500);

function warningAlert() {
    let warning = document.getElementsByClassName("warning");
    for (let i = 0; i < warning.length; i++) {
        warning[i].style.backgroundColor = warning[i].style.backgroundColor == blinkColorOne ? blinkColorTwo : blinkColorOne;

    }

}
