import axios from 'axios';

const ENDPOINT_PATH = 'api/movimiento'
export default {
    listaMovimientos() {
        return axios.get(ENDPOINT_PATH + '/Read');
    }
}