export function searchPosts(form_value, dispatch, sch_value, fetch, id = null) {
    if (!form_value) {
        dispatch(fetch(0, '', id));
        return '';
    }
    sch_value = form_value || null;
    dispatch(fetch(0, sch_value, id));
    return sch_value;
}