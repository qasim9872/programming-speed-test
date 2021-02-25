import Layout from '../_shared/layout.interface';
import HomePageView from './home-page.view';

const Home: Layout = {
  name: 'Home',
  enable: true,
  showInNav: false,
  routeProps: {
    path: '/',
    exact: true,
    component: HomePageView,
  },
};

export default Home;
