$(document).ready(function() {
  const myAmenities = {};
  $('.amenities input[type=checkbox]').change(function() {
    if (this.checked) {
      myAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete myAmenities[$(this).attr('data-id')];
    }
    const amenityList = Object.values(myAmenities);
    if (amenityList.length > 0) {
      $('.amenities > h4').text(amenityList.join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });

  const myStates = {};
  $('.locations > ul > h2 > input[type="checkbox"]').change(function() {
    if (this.checked) {
      myStates[$(this).attr('data-id') = $(this).attr('data-name');
    } else {
      delete myStates[$(this).attr('data-id')];
    }
    const stateList = Object.values(myStates);
    if (stateList.length > 0) {
      $('.locations h4').text(stateList.join(', '));
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });

  const myCities = {};
  $('.locations > ul > ul > li input[type="checkbox"]').change(function() {
    if (this.checked) {
      myCities[$(this).attr('data-id') = $(this).attr('data-name');
    } else {
      delete myCities[$(this).attr('data-id')];
    }
    const cityList = Object.values(myCities);
    if (cityList.length > 0) {
      $('.locations h4').text(cityList.join(', '));
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });
	
  $(".filters button").bind("click", () => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        'amenities': Object.keys(myAmenities),
        'cities': Object.keys(myCities),
        'states': Object.keys(myStates)}
        ),
      success: (data) => {
        $(".places").empty();
        $.each(data, (i, place) => {
          let sectionPlace = `
          <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
          </article>` 
        $(".places").append(sectionPlace);
        });
      }
    });
  });
});

$(function() {
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: (data) => {
      if (data.status === "OK") {
        $("div#api_status").addClass("available");
      }$
    }
  });
  
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: "{}",
    success: (data) => {
      $(".places").empty();
      $.each(data, (i, place) => {
        let sectionPlace = `
        <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
        </article>
        ` 
        $(".places").append(sectionPlace);
      });
    }
  });
});
