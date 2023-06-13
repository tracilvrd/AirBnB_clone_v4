$(document).ready(function() {
  const myAmenities = {};
  $('input[type=checkbox]').change(function() {
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
});

$(function() {
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: (data) => {
      if (data.status === "OK") {
        $("div#api_status").addClass("available");
      }
    }
  });
});
