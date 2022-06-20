import { EditProfilePage,ProfilePage,Layout } from './';


export default {
  path: 'profile',
  component: Layout,
  childRoutes: [
    { path: ':username',  component:ProfilePage},
    { path: 'edit', component: EditProfilePage }
  ],
};
