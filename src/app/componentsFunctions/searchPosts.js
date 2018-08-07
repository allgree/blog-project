export function searchPosts(form_value, obj, fetch, id = null) {
    if (!form_value) {
        obj.setState({
            search_value: ''
        });
        obj.props.dispatch(fetch(0, '', id));
        return;
    }
    obj.setState({
        search_value: form_value || null
    });
    obj.props.dispatch(fetch(0, obj.state.search_value, id))
}