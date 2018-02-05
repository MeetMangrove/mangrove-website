$(document).ready(function () {
  $('.bottom-arrow').click(function () {
    $(window).scrollTo($('#head'), 500)
  })
  $('.hellobar-clear').click(function () {
    $('.banner').fadeOut('fast')
  })
})