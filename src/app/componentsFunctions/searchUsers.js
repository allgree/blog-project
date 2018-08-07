export function searchUsers(form_value, obj, fetch, id = null) {
    if (!form_value) {
        obj.setState({
            val1: '',
            val2: ''
        });
        obj.props.dispatch(fetch(0, '', '', id));
        return;
    }
    let values = form_value.split(' ').map((value, i) => {
        if (value !== '') return value;
    });
    obj.setState({
        val1: values[0] || null,
        val2: values[1] || null
    });
    obj.props.dispatch(fetch(0, obj.state.val1, obj.state.val2, id))
}