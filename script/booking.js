function getBookingDiv(date, sessionInfo) {
    return `
    <h3>Booking</h3>
    <p>${sessionInfo.name}</p>
    <p>${getLocaleDateTime(date)}</p>
    <hr>
    <span>screen</span>
    <hr>
    ${getHallDiv(sessionInfo.booked).outerHTML}
    <button onclick="save()">save</button>
    <button onclick="cancel()">cancel</button>
    </footer>
    `;
}

function getHallDiv(booked) {
    let hallDiv = document.createElement("div");
    hallDiv.id = "hall";
    for (let row = 0; row < booked.length; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        rowDiv.setAttribute("data-number", row + 1);
        rowDiv.innerHTML += `<span>${row + 1}</span>`;
        for (let place = 1; place <= booked[row].length; place++) {
            let placeDiv = document.createElement("div");
            placeDiv.className = "place";
            placeDiv.setAttribute("data-place", place);
            placeDiv.setAttribute("data-state", booked[row][place] ? placeState.booked : placeState.free);
            placeDiv.innerText = place;
            rowDiv.appendChild(placeDiv);
        }
        hallDiv.appendChild(rowDiv);
    }
    return hallDiv;
}

function cancel() {
    let booking = document.getElementById("booking");
    document.body.removeChild(booking);
}