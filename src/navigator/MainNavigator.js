import * as React from 'react';
import Profile from '../screens/profile';
import HomeNavigator from './HomeNavigator';
import {BottomNavigation, Text} from 'react-native-paper';
import {buttonNavigationKeys} from '../constants/navigation';

const ROUTES = [
  {
    key: buttonNavigationKeys.HOME,
    title: 'Home',
    focusedIcon: 'home',
    unfocusedIcon: 'home-outline',
  },
  {
    key: buttonNavigationKeys.PROFILE,
    title: 'Profile',
    focusedIcon: 'account',
    unfocusedIcon: 'account-outline',
  },
];

const MainNavigator = props => {
  const [index, setIndex] = React.useState(0);

  const renderScene = BottomNavigation.SceneMap({
    [buttonNavigationKeys.HOME]: HomeNavigator,
    [buttonNavigationKeys.PROFILE]: p => <Profile {...p} {...props} />,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes: ROUTES}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainNavigator;
