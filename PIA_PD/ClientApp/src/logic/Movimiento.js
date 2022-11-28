import axios from 'axios';

const ENDPOINT_PATH = 'api/movimiento'
export default {
    listaMovimientos() {
        return axios.get(ENDPOINT_PATH + '/Read');
    },

    registrarMovimiento(objeto){
        return axios.post(ENDPOINT_PATH+'/Create', {
            IdTipoMovimiento : objeto.nombre,
            CantDolares : objeto.aPaterno,
            CostoTotal : objeto.costoTotal,
            Pago : objeto.pago,
            Cambio : objeto.cambio,
            IdUsuario : objeto.idUsuario
        });
    }
}