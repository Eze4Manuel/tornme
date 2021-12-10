import config from '../assets/utils/config';
import Dashboard from "./dashboard";
import Finance from "./finance";
import Users from "./users";
import Support from "./support";
import Login from "./login";
import ResetPassword from "./resetPassword";
import ChangePassword from "./changePassword";
import VerifyPhone from "./verifyPhone";
import UsersPosts from './users/users_post';

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;

export const routes = [
    {link: pages.overview, Component: Dashboard },
    {link: pages.finance, Component: Finance },
    {link: pages.users, Component: Users },
    {link: pages.userpost, Component: UsersPosts },
    {link: pages.support, Component: Support },
    {link: pages.login, Component: Login },
    {link: pages.resetpassword, Component: ResetPassword },
    {link: pages.changepassword, Component: ChangePassword },
    {link: pages.verifyphone, Component: VerifyPhone },
    
] 