import axios from "axios";

// base_url for auth services
const uri = 'https://tornme-auth-service.apiservices.xyz/v1' // staging
const Axios = axios.create({baseURL: uri});

// base_url for user services
const uri_users = 'https://tornme-user-service.apiservices.xyz/v1' // staging
export const Axios_users = axios.create({baseURL: uri_users});



// base_url for user services
const uri_wallet = 'https://tornme-wallet-service.apiservices.xyz/v1' // staging
export const Axios_wallet = axios.create({baseURL: uri_wallet});

export default Axios;

