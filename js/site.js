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

	let currentEvents = events; // TODO - get these from storage

	// let cityNames = currentEvents.map(
	// 	function (event) {
	// 		return event.city;
	// 	}
	// );

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
	tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance;
	tableRow.querySelector('[data-id="date"]').textContent = event.date;

	eventTable.appendChild(tableRow);

	}
}
