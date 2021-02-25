import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Footer } from '../../components';
import { useGlobalConstantsHook } from '../../constants';
import Layout from './layout.interface';

const LayoutBuilder: React.FC<{ layouts: Layout[] }> = ({ layouts }) => {
  const [constants] = useGlobalConstantsHook();
  const { myGlobalConfig } = constants;
  const { title, show, author } = myGlobalConfig;

  const enabledLayouts = layouts.filter((module) => module.enable);
  const showInNav = enabledLayouts.filter((module) => module.showInNav);

  return (
    <div className="flex flex-col mx-auto min-w-0 h-screen">
      {show.navbar && <Navbar title={title} layouts={showInNav} />}
      <div className="h-full flex-grow text-black">
        {enabledLayouts.map((module) => (
          <Route {...module.routeProps} key={module.name} />
        ))}
      </div>
      {show.footer && <Footer {...author} />}
    </div>
  );
};

export default LayoutBuilder;
