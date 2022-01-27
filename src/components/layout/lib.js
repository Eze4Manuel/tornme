import request, {Axios_messsage} from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.logout = async (token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));

            uri = `/auth/logout`;
            console.log(cfg);

        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
 

// Sends request to update supports
lib.getNotifications = async (auth_id, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_messsage.get(`/messages/notifications?auth_id=${auth_id}`, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}
 
export default lib;