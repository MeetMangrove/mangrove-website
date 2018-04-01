$(document).ready(function () {
  $('.bottom-arrow').click(function () {
    $(window).scrollTo($('#head'), 500)
  })
  $('.member-item').click(function () {
    $(this)
      .find('.member-item-full')
      .toggle()
    $(this)
      .find('.member-item-beta')
      .toggle()
  })
})
