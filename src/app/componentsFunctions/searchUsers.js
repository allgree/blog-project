export function searchUsers(form_value, dispatch, sch_values, fetch, id = null) {
    if (!form_value) {
        dispatch(fetch(0, '', '', id));
        return {
            val1: '',
            val2: ''
        };
    }
    let values = form_value.split(' ').map((value, i) => {
        if (value !== '') return value;
    });
    sch_values = {
        val1: values[0] || null,
        val2: values[1] || null
    };
    dispatch(fetch(0, sch_values.val1, sch_values.val2, id));
    return sch_values;
}