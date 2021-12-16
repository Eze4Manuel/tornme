import {Axios_users } from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.get = async (token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
            uri = `/users/admin-get-users`;
        return await (await Axios_users.get(uri, cfg)).data
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}


lib.getUserDetail = async (token, auth_id) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
            uri = `/users/admin-get-users?auth_id=${auth_id}`;
        return await (await Axios_users.get(uri, cfg)).data
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

export default lib;