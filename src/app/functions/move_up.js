export function moveUp() {
    if ($(document).scrollTop() > 200) {
        $('.link_to_up').fadeIn(300)
    } else {
        $('.link_to_up').fadeOut(300)
    }
}