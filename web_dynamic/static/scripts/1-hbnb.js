$('document').ready(function () {
  let save = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      save[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete save[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(save).join(', '));
  });
});
