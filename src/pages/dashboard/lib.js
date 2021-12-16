import {Axios_users } from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.get = async (token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
            uri = `/users/admin-users-analytics`;
        return await (await Axios_users.get(uri, cfg)) 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
 

export default lib;