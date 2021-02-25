import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';
import Layout from '../../layouts/_shared/layout.interface';
import NavLink from './nav-link';

const Navbar: React.FC<{
  title: string;
  layouts: Layout[];
  Logo?: IconType;
}> = ({ title, Logo, layouts }) => {
  const [currentTab, setCurrentTab] = useState(layouts[0]?.name || '');

  const location = useLocation();
  React.useEffect(() => {
    const module = layouts.find(
      ({ routeProps }) => routeProps.path === location.pathname,
    );

    setCurrentTab(module?.name || '');
  }, [layouts, location]);

  return (
    <header className="flex w-full bg-gray-600 justify-between items-center px-8 py-3 shadow-md">
      <div>
        {Logo && <Logo className="App-logo" />}
        <h1 className="text-lg uppercase">{title}</h1>
      </div>
      <ul className="flex justify-evenly">
        {layouts.map((module) => (
          <NavLink
            currentTab={currentTab}
            key={module.name}
            name={module.name}
            path={module.routeProps.path}
            onClick={() => setCurrentTab(module.name)}
          />
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
