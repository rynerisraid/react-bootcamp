import {AccountPage,LoginPage,SignUpPage,Layout} from "./";


export default {
    path: 'account', component: Layout,
    childRoutes: [
        { path: 'info', component: AccountPage},
        { path: 'login', component: LoginPage },
        { path: 'signup', component: SignUpPage },
    ]
};
