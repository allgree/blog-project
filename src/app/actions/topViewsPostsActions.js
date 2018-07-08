import axios from 'axios';

export function fetchTopViewsPosts() {
    return {
        type: 'FETCH_TOP_VIEWS_POSTS',
        payload: axios.get('api/posts/top_views/')
    }
}
