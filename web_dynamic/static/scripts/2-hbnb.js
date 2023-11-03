$('document').ready(function () {
  const save = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      save[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete save[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(save).join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
