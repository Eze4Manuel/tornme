import {Axios_wallet } from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}

lib.getWalletSttings = async (token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
            uri = `/wallets/settings`;
        return await (await Axios_wallet.get(uri, cfg)).data
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
  

lib.updateWallet = async (token, percentage) => {
    let uri = '';
    try {
        console.log(percentage);
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
            uri = `/wallets/settings`;
        return await (await Axios_wallet.post(uri, percentage, cfg)).data
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
  

export default lib;