import axios from 'axios';

const ENDPOINT_PATH = 'api/bitacora'
export default {
    listaBitacoras() {
        return axios.get(ENDPOINT_PATH + '/Read');
    }
}