[23:25, 03/11/2023] Fiona: <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../static/styles/4-common.css">
    <link rel="stylesheet" type="text/css" href="../static/styles/3-header.css">
    <link rel="stylesheet" type="text/css" href="../static/styles/3-footer.css">
    <link rel="stylesheet" type="text/css" href="../static/styles/6-filters.css">
    <link type="text/css" rel="stylesheet" href="../static/styles/8-places.css">
    <link rel="icon" href="../static/images/icon.png" />
    <title>HBnB</title>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="static/scripts/4-hbnb.js"></script>
  </head>
  <body>
    <header>
      <div class="logo"></div>
	  <div id="api_status" class="available">

	  </div>
    </header>
    <div class="container">
      <section class="filters">
	<div class="locations">
	  <h3>States</h3>
	  <h4>&nbsp;</h4>
	  <div class="popover">
	    <ul>
	      {% for state in states %}
	      <li>
		<h2>{{ state[0].name }}:</h2>
		<ul>
		  {% for city in state[1] %}
		  <li>{{ city.name }}</li>
		  {% endfor %}
		</ul>
	      </li>
	      {% endfor %}
	    </ul>
	  </div>
	</div>
	<div class="amenities">
	  <h3>Amenities</h3>
	  <h4>&nbsp;</h4>
	  <div class="popover">
	    <ul>
	      {% for amenity in amenities %}
	      <li><input type="checkbox" data-id="{{ amenity.id }}" data-name="{{ amenity.name }}" > {{ amenity.name }}</li>
	      {% endfor %}
	    </ul>
	  </div>
	</div>
	<button type="button">Search</button>
      </section>
      <div class="placesh1"><h1>Places</h1></div>
      <section class="places">
	<!-- <h1>Places</h1> -->
	
      </section>
    </div>
    <footer>
      <p>Holberton School</p>
    </footer>
  </body>
</html>
[23:35, 03/11/2023] Fiona: document.ready(function () {
	const amenities = {};
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

	$.post({
		url: `${HOST}/api/v1/places_search`,
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});

	$(".filters button").bind("click", searchPlace);
	searchPlace();
});
