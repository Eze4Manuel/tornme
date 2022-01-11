import { Axios_users, Axios_support } from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}


lib.get = async (search, token, user_type) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/users/admin-get-users?user_type=${user_type}`;
        } else {
            uri = `/users/admin-get-users?user_type=${user_type}`;
        }
        return await (await Axios_users.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.createAdmin = async (values, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/users/admin-create-user`;
        return await (await Axios_users.post(uri, values, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.update = async (data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_users.put(`/users/admin-update-user`, data, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.delete = async (token, auth_id) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/users/admin-delete-user/${auth_id}`;
        return await (await Axios_users.delete(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.resetUserPassword = async (data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_users.put(`/users/admin-change-user-password`, data, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


// Sends request to create Faq setting
lib.createFaq = async (values, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/supports`;
        return await (await Axios_support.post(uri, values, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

// Sends request to get supports
lib.getFaq = async (token, search) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/supports&q=${search}`;
        } else {
            uri = `/supports`;
        }
        return await (await Axios_support.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

// Sends request to update supports
lib.updateFaq = async (data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_support.put(`/supports`, data, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


// Sends request to update supports
lib.deleteFaq = async (_id, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await Axios_support.delete(`/supports/${_id}`, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}






// Assign Support
lib.assignSupport = async (admin_id, support_id, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7));
        uri = `/supports/admin-assign-support`;
        return await (await Axios_support.post(uri, { admin_id, support_id }, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


// Sends request to get supports
lib.getSupport = async (token, auth_id, search) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/supports/admin-get-supports`
        } else {
            uri = `/supports/admin-get-supports`;
        }
        return await (await Axios_support.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

// Get chats
lib.getAdminChats = async (admin_id, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
         
            uri = `supports/admin-get-supports?admin_id=${admin_id}`;
        
        return await (await Axios_support.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


// Get chats
lib.getUserSupportChats = async (admin_id, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
         
            uri = `supports/admin-get-support-messages/${admin_id}`;
        
        return await (await Axios_support.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


//  
lib.sendSupportMessages = async (token, message) => {
    let uri = '';
    try {
        console.log(message);
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
            uri = `supports/admin-send-support-message`;
        return await (await Axios_support.post(uri, message, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



export default lib;