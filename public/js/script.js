console.log("Here in JS")


  $('#tabs li').on('click', function() {
    var tab = $(this).data('tab');

    $('#tabs li').removeClass('is-active');
    $(this).addClass('is-active');

    $('#tab-content p').removeClass('is-active');
    $('#tab-content div').hide();
    $('p[data-content="' + tab + '"]').addClass('is-active');
    $('div[data-content="' + tab + '"]').show();
  });
