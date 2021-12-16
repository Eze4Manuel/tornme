import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.changePassword = async (token, builder) => {
    console.log(builder);
    console.log(token);
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
            uri = `/auth/reset-user-password`;
        return await (await request.post(uri, builder, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
 

export default lib;