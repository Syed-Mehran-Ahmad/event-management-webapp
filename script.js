let events = [
    {
        name: "Tech Conference",
        date: "2026-07-15",
        description: "Latest technology trends."
    },
    {
        name: "Music Festival",
        date: "2025-01-10",
        description: "Live music performances."
    },
    {
        name: "AI Workshop",
        date: "2026-06-25",
        description: "Learn Artificial Intelligence."
    }
];

const eventList = document.getElementById("event-list");
const form = document.getElementById("event-form");
const warning = document.getElementById("warning");
const search = document.getElementById("search");

function displayEvents(filteredEvents = events) {

    eventList.innerHTML = "";

    filteredEvents.forEach((event, index) => {

        const card = document.createElement("div");
        card.classList.add("event-card");

        const today = new Date();
        const eventDate = new Date(event.date);

        if(eventDate < today){
            card.classList.add("past");
        } else {
            card.classList.add("upcoming");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${index})">
                Delete
            </button>
        `;

        eventList.appendChild(card);
    });
}

function deleteEvent(index){
    events.splice(index,1);
    displayEvents();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const description =
        document.getElementById("eventDescription").value;

    if(!name || !date || !description){
        warning.textContent =
            "Please fill all fields!";
        return;
    }

    warning.textContent = "";

    events.push({
        name,
        date,
        description
    });

    events.sort((a,b)=>
        new Date(a.date) - new Date(b.date)
    );

    displayEvents();

    form.reset();
});

search.addEventListener("keyup", () => {

    const value =
        search.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(value) ||
        event.date.includes(value)
    );

    displayEvents(filtered);
});

events.sort((a,b)=>
    new Date(a.date) - new Date(b.date)
);

displayEvents();