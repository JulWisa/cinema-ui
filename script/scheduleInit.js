import {dayOptions, getFormattedDate, timeOptions} from "./common";
import {storage} from "./app";
import {count} from "./generator";

let dateInput = document.getElementById("dateInput");
let currentDateParagraph = document.getElementById("currentDate");
let schedule = document.getElementById("schedule");
let today = new Date();
let currentDate = new Date();

function updateCurrentDate(date) {
    currentDate = date;
    currentDateParagraph.innerText = date.toLocaleString("ru", dayOptions);
}

function initDateInput() {
    let minDate = new Date();
    minDate.setDate(today.getDate() - 6);
    dateInput.min = getFormattedDate(minDate);

    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 6);
    dateInput.max = getFormattedDate(maxDate);

    dateInput.valueAsDate = new Date();
    dateInput.onchange = function (event) {
        updateCurrentDate(new Date(event.target.valueAsDate));
        updateSchedule();
    }
}

function getSessions(date) {
    let sessions = [];
    for (let key in storage) {
        if (new Date(key).getDate() === date.getDate())
            sessions.push({
                date: new Date(key),
                filmInfo: JSON.parse(storage.getItem(key))
            });
    }
    return sessions;
}

function updateSchedule() {
    let movies = getSessions(currentDate);
    schedule.innerHTML = "";
    for (let i = 0; i < count; i++) {
        let li = document.createElement("li");
        let name = document.createElement("p");
        let time = document.createElement("p");
        let bookButton = document.createElement("button");

        name.innerText = movies[i].filmInfo.name;
        time.innerText = "Time: " + movies[i].date.toLocaleString("ru", timeOptions);
        bookButton.innerText = "book";
        bookButton.className = "bookButton";

        bookButton.setAttribute("data-date", movies[i].date);

        li.appendChild(name);
        li.appendChild(time);
        li.appendChild(bookButton);

        schedule.appendChild(li);
    }
}

export {initDateInput, updateSchedule, updateCurrentDate}