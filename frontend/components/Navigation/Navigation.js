import React, {useState} from 'react';
import clsx from 'clsx';
import AddressesPage from 'pages/AddressesPage';
import SettingsPage from 'pages/SettingsPage';
import styles from './Navigation.css';

function Navigation() {
  const [activeTab, setActiveTab] = useState(0);

  const tabOptions = [
    {title: 'Addresses', component: AddressesPage},
    {title: 'Settings', component: SettingsPage},
  ];

  const tabs = tabOptions.map(({title}, index) => (
    <button
      key={title}
      className={clsx({
        'nav-tab': true,
        [styles.button]: true,
        'nav-tab-active': index === activeTab,
      })}
      onClick={() => setActiveTab(index)}
    >
      {title}
    </button>
  ));

  const ActiveContent = tabOptions[activeTab].component;

  return (
    <React.Fragment>
      <nav className="nav-tab-wrapper">{tabs}</nav>
      <ActiveContent />
    </React.Fragment>
  );
}

export default Navigation;
