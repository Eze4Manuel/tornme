import { Axios_users } from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}


lib.get = async (token, auth_id) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))

        uri = `/users/admin-get-users?auth_id=${auth_id}`;

        return await (await Axios_users.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

// lib.createAdmin = async (values, token) => {
//     let uri = '';
//     try {
//         let cfg = helpers.getHeaderConfig(String(token).substr(7));
//             uri = `/users/admin-create-user`;
//         return await (await Axios_users.post(uri, values, cfg)).data
//     } catch (e) {
//         return {status: 'error', msg: e?.response?.data?.msg || e?.message}
//     }
// }

lib.update = async ( data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_users.put(`/users/admin-update-user`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}


lib.updatePassword = async ( data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_users.put(`/users/admin-change-user-password`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}


// lib.delete = async (token, auth_id) => {
//     let uri = '';
//     try {
//         let cfg = helpers.getHeaderConfig(String(token).substr(7));
//             uri = `/users/admin-delete-user/${auth_id}`;
//         return await (await Axios_users.delete(uri, cfg)).data
//     } catch (e) {
//         return {status: 'error', msg: e?.response?.data?.msg || e?.message}
//     }
// }

export default lib;