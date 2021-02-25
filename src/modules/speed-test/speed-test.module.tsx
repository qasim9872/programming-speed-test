import React from 'react';
import Module from '../_shared/module.interface';

const HomeView = () => {
  return <div>Home Module</div>;
};

const Home: Module = {
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
