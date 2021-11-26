import config from '../assets/utils/config';
import Dashboard from "./dashboard";
import Finance from "./finance";
import Users from "./users";
import Support from "./support";

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;

export const routes = [
    {link: pages.overview, Component: Dashboard },
    {link: pages.finance, Component: Finance },
    {link: pages.users, Component: Users },
    {link: pages.support, Component: Support },
    
] 