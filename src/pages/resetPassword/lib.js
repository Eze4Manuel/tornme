import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.resetpassword = async (token, builder) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));

            uri = `/auth/init-password-reset`;

        return await (await request.post(uri, builder, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
 

export default lib;