import config from '../assets/utils/config';
import Dashboard from "./dashboard";
import Finance from "./finance";
import Users from "./users";
import Settings from "./settings";
import Support from "./support";
import Login from "./login";
import ResetPassword from "./resetPassword";
import ChangePassword from "./changePassword";
import VerifyPhone from "./verifyPhone";
import UsersPosts from './users/users_post';
import UsersPostDetail from './users/users_post_detail';
 
import Profile from './profile/profile';

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;

export const routes = [
    {link: pages.finance, Component: Finance },
    {link: pages.login, Component: Login },
    {link: pages.users, Component: Users },
    {link: pages.userpost, Component: UsersPosts },
    {link: pages.userpostdetail, Component: UsersPostDetail },
    {link: pages.support, Component: Support },
    {link: pages.resetpassword, Component: ResetPassword },
    {link: pages.changepassword, Component: ChangePassword },
    {link: pages.verifyphone, Component: VerifyPhone },
    {link: pages.profile, Component: Profile },
    {link: pages.settings, Component: Settings }
    
] 