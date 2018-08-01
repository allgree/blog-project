import axios from 'axios';

export function fetchOpinionsSample(offset) {
    return {
        type: 'FETCH_OPINIONS_SAMPLE',
        payload: axios.get(`/api/opinions/sample/?offset=${offset}`)
    }
}

export function addOpinion(name, user_id, body) {
    return {
        type: "ADD_OPINION",
        payload: axios.post('/api/opinions/add', {
            name: name || null,
            user_id: user_id || null,
            body: body
        })
    }
}