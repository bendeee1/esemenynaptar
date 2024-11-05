const monthYearDisplay = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const eventInput = document.getElementById("eventInput");
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYearDisplay.innerText = `${month + 1}/${year}`;
    daysContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay() || 7; // Vasarnap eseten 7-re allitva
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i < firstDay; i++) daysContainer.innerHTML += `<div class="day"></div>`;
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        daysContainer.innerHTML += `
            <div class="day ${isToday ? 'today' : ''}" data-date="${year}-${month + 1}-${day}">
                ${day}
                <div class="event-container" id="events-${year}-${month + 1}-${day}"></div>
            </div>`;
    }

    document.querySelectorAll('.day').forEach(day => {
        day.addEventListener('click', () => {
            clearSelection();
            day.classList.add('selected');
        });
    });
}

function clearSelection() {
    document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
}

document.getElementById("prev").addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById("next").addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

document.getElementById("addEvent").addEventListener('click', () => {
    const selectedDay = document.querySelector('.day.selected');
    const eventText = eventInput.value;
    
    if (selectedDay && eventText) {
        const date = selectedDay.getAttribute('data-date');
        const eventContainer = document.getElementById(`events-${date.replace(/-/g, '-')}`);
        
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerText = eventText;
        
        eventContainer.appendChild(eventDiv);
        eventInput.value = ''; 
    }
});

renderCalendar();
