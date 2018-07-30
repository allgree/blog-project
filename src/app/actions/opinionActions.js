import axios from 'axios';

export function fetchOpinionsSample(offset) {
    return {
        type: 'FETCH_OPINIONS_SAMPLE',
        payload: axios.get(`/api/opinions/sample/?offset=${offset}`)
    }
}