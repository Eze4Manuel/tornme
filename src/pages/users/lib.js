import { Axios_users } from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.get = async (token, user_type, search) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        if(search){
            uri = `/users/admin-get-users?user_type=${user_type}&q=${search}`;
        }else{
            uri = `/users/admin-get-users?user_type=${user_type}`;
        }
        return await (await Axios_users.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}
 


lib.getUserDetail = async (token, auth_id) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/users/admin-get-users?auth_id=${auth_id}`;
        return await (await Axios_users.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.deleteUser = async (token, auth_id) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/users/admin-delete-user/${auth_id}`;
        console.log(uri);
        return await (await Axios_users.delete(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



lib.resetUserPassword = async (data, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/users/admin-change-user-password`;
        return await (await Axios_users.put(uri, data, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


export default lib;