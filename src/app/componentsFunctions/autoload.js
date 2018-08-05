// автоподгрузка контента
export function autoload(is_fetching, is_empty, dispatch, fetch, lenght, id) {
        let $point = $('.point');
        if (!$point[0]) {
            return;
        }
        let point = $point.offset().top;          // точка где заканчиваются новые записи
        let scroll_top = $(document).scrollTop(); //Насколько прокручена страница сверху (без учета высоты окна)
        let height = $(window).height();   // Высота окна
        let load_flag = scroll_top + height >= point;   // Флаг подгружаем ли данные
        if (load_flag && !is_fetching && !is_empty) {
            dispatch(fetch(lenght, id));
        }
}