import React from 'react';
import Layout from '../_shared/layout.interface';

const HomeView = () => {
  return <div>Home Layout</div>;
};

const Home: Layout = {
  name: 'Home',
  enable: true,
  showInNav: false,
  routeProps: {
    path: '/',
    exact: true,
    component: HomeView,
  },
};

export default Home;
