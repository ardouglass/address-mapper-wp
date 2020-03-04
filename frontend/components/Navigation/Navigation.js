import React, {useState} from 'react';
import clsx from 'clsx';
import UploadPage from 'pages/UploadPage';
import SettingsPage from 'pages/SettingsPage';
import styles from './Navigation.css';

function Navigation() {
  const [activeTab, setActiveTab] = useState(0);

  const tabOptions = [
    {title: 'Upload Data', component: UploadPage},
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
      <h3 className="nav-tab-wrapper">{tabs}</h3>
      <ActiveContent />
    </React.Fragment>
  );
}

export default Navigation;
