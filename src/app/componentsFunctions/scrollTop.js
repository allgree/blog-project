// автоматическая прокрутка в верх страницы
export function scrollTop() {
    $('html, body').animate({scrollTop:0}, 'slow')
}