// автоподгрузка контента с поиском
export function autoloadWithSearch(is_fetching, is_empty, dispatch, fetch, lenght, val1 = '', val2 = '') {
    let $point = $('.point');
    if (!$point[0]) {
        return;
    }
    let point = $point.offset().top;          // точка где заканчиваются новые записи
    let scroll_top = $(document).scrollTop(); //Насколько прокручена страница сверху (без учета высоты окна)
    let height = $(window).height();   // Высота окна
    let load_flag = scroll_top + height >= point;   // Флаг подгружаем ли данные
    if (load_flag && !is_fetching && !is_empty) {
        dispatch(fetch(lenght, val1, val2));
    }
}