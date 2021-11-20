import config from '../assets/utils/config';
import Dashboard from "./dashboard";

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;

export const routes = [
    {link: pages.dashboard, Component: Dashboard },
    
]