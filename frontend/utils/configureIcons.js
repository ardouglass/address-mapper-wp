import {library} from '@fortawesome/fontawesome-svg-core';
import {faMapMarkerCheck} from '@fortawesome/pro-solid-svg-icons';
import {
  faCalendarAlt,
  faCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function configureIcons() {
  const icons = [faCalendarAlt, faCircle, faMapMarkerCheck, faUser];

  library.add(icons);
}

export default configureIcons;
