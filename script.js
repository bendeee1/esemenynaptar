const monthYearDisplay = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const eventInput = document.getElementById("eventInput");
let currentDate = new Date();
let events = {};  

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYearDisplay.innerText = `${month + 1}/${year}`;
    daysContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const adjustedFirstDay = firstDay === 0 ? 7 : firstDay; 

    for (let i = 1; i < adjustedFirstDay; i++) {
        daysContainer.innerHTML += `<div class="day"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        const dateKey = `${year}-${month + 1}-${day}`;
        
        daysContainer.innerHTML += `
            <div class="day ${isToday ? 'today' : ''}" data-date="${dateKey}">
                ${day}
                <div class="event-container" id="events-${dateKey}"></div>
            </div>`;

        if (events[dateKey]) {
            const eventContainer = document.getElementById(`events-${dateKey}`);
            events[dateKey].forEach(eventText => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.innerText = eventText;
                eventContainer.appendChild(eventDiv);
            });
        }
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
        if (!events[date]) {
            events[date] = [];  
        }
        
        events[date].push(eventText);  
        const eventContainer = document.getElementById(`events-${date}`);
        
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerText = eventText;
        
        eventContainer.appendChild(eventDiv);
        eventInput.value = ''; 
    }
});

renderCalendar();
