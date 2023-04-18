var events = [{
	event: "ComicCon",
	city: "New York",
	state: "New York",
	attendance: 240000,
	date: "06/01/2017",
},
{
	event: "ComicCon",
	city: "New York",
	state: "New York",
	attendance: 250000,
	date: "06/01/2018",
},
{
	event: "ComicCon",
	city: "New York",
	state: "New York",
	attendance: 257000,
	date: "06/01/2019",
},
{
	event: "ComicCon",
	city: "San Diego",
	state: "California",
	attendance: 130000,
	date: "06/01/2017",
},
{
	event: "ComicCon",
	city: "San Diego",
	state: "California",
	attendance: 140000,
	date: "06/01/2018",
},
{
	event: "ComicCon",
	city: "San Diego",
	state: "California",
	attendance: 150000,
	date: "06/01/2019",
},
{
	event: "HeroesCon",
	city: "Charlotte",
	state: "North Carolina",
	attendance: 40000,
	date: "06/01/2017",
},
{
	event: "HeroesCon",
	city: "Charlotte",
	state: "North Carolina",
	attendance: 45000,
	date: "06/01/2018",
},
{
	event: "HeroesCon",
	city: "Charlotte",
	state: "North Carolina",
	attendance: 50000,
	date: "06/01/2019",
},
];

// dropdown for specific cities

function buildDropDown() {
	let dropdownMenu = document.getElementById('eventDropDown');
	dropdownMenu.innerHTML= '';

	let currentEvents = getEventData(); // TODO - get these from storage

	let cityNames = currentEvents.map(event => event.city);
	let citiesSet = new Set(cityNames);
	let distictCities = [...citiesSet];

	const dropdownTemplate = document.getElementById('dropdownItemTemplate');

	//copy the template
	let dropdownItemNode = document.importNode(dropdownTemplate.content, true);

	//make our changes
	let dropdownItemLink = dropdownItemNode.querySelector('a');
	dropdownItemLink.innerText = 'All Cities';
	dropdownItemLink.setAttribute('data-string', 'All')

	//add our copy to the page
	dropdownMenu.appendChild(dropdownItemNode);


	for (let i = 0; i < distictCities.length; i += 1) {
		// get city name
		let cityName = distictCities[i];

		// generate drop down element
		let itemNode = document.importNode(dropdownTemplate.content, true);
		let anchorTag = itemNode.querySelector('a');
		anchorTag.innerText = cityName;
		anchorTag.setAttribute('data-string', cityName);

		// append to drop down menu
		dropdownMenu.appendChild(itemNode);
	}

	displayEventData(currentEvents);
	displayStats(currentEvents);
	document.getElementById('location').innerText = 'All Events';
}


function displayEventData(currentEvents) {
	

	const eventTable = document.getElementById('eventTable');
	const template = document.getElementById('tableRowTemplate');

	eventTable.innerHTML = '';

	for (let i = 0; i < currentEvents.length; i++) {
		let event = currentEvents[i];
		let tableRow = document.importNode(template.content, true);

		tableRow.querySelector('[data-id="event"]').textContent = event.event;
		tableRow.querySelector('[data-id="city"]').textContent = event.city;
		tableRow.querySelector('[data-id="state"]').textContent = event.state;
		tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance.toLocaleString();
		tableRow.querySelector('[data-id="date"]').textContent = new Date(event.date).toLocaleDateString();

		eventTable.appendChild(tableRow);

	}
}



function calculateStats(currentEvents) {
	let total = 0;
	let average = 0;
	let most = 0;
	let least = currentEvents[0].attendance;
	
	for (let i = 0; i < currentEvents.length; i++) {
		let currentAttendance = currentEvents[i].attendance;

		total += currentAttendance;

		if (currentAttendance > most) {
			most = currentAttendance;
		}
		 if (currentAttendance < least){
			least = currentAttendance;
		}
		 
	}

		average = total / currentEvents.length;

		let stats = {
			total: total,
			average: average,
			most: most,
			least: least,

		}

		return stats;
}


function displayStats(currentEvents) {
	let statistics = calculateStats(currentEvents);

	//get elemetns where the stats go
	// set their text to be the correct stat from statistics

	document.getElementById('total').textContent = statistics.total.toLocaleString();
	document.getElementById('average').textContent = Math.round(statistics.average).toLocaleString();
	document.getElementById('most').textContent = statistics.most.toLocaleString();
	document.getElementById('least').textContent = statistics.least.toLocaleString();


}


function getEventData() {
	let data = localStorage.getItem('ghSuperDogEventData');

	if (data == null) {
		localStorage.setItem('ghSuperDogEventData', JSON.stringify(events));
	}

	let currentEvents = data == null ? events : JSON.parse(data);

	return currentEvents;
}


function viewFilteredEvents(dropdownItem) {
	let cityName = dropdownItem.getAttribute('data-string');

	//get all events
	let allEvents = getEventData();

	if (cityName == 'All') {
		displayStats(allEvents);
		displayEventData(allEvents);
		document.getElementById('location').innerText = 'All Events'

		return;
	}

	//filter those events to just the selected city
	let filteredEvents = allEvents.filter(event => event.city.toLowerCase() == cityName.toLowerCase());

	//display the stats for those events
	displayStats(filteredEvents);

	// change the stats header
	document.getElementById('location').innerText = cityName;

	// display only those events in the table
	displayEventData(filteredEvents);
}


function saveNewEvent() {
	// get form input values
	let name = document.getElementById('newEventName').value;
	let city = document.getElementById('NewEventCity').value;
	let attendance = parseInt(document.getElementById('newEventAttendance').value);

	let dateValue = document.getElementById('newEventDate').value;
	dateValue = new Date(dateValue);

	let date = dateValue.toLocaleString();

	let stateSelect = document.getElementById('newEventState');
	let stateIndex = stateSelect.selectedIndex;
	let state = stateSelect.options[stateIndex].text;
	
	//create a new event object
	let newEvent = {
		event: name,
		city: city,
		state: state,
		attendance: attendance,
		date: date,
	};

	// add it to the array of current events
	let events = getEventData();
	events.push(newEvent);

	//then, save the array with the new event
	localStorage.setItem('ghSuperDogEventData', JSON.stringify(events));

	buildDropDown();
}


function ClearFields() {

	document.getElementById("newEventName").value = "";
	document.getElementById("NewEventCity").value = "";
	document.getElementById("newEventState").value = "";
	document.getElementById("newEventAttendance").value = "";
	document.getElementById("newEventDate").value = "";
}





