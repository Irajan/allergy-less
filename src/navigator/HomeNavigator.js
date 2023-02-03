import React, {useState} from 'react';
import {Appbar, FAB} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import Allergies from '../screens/home/Allergies';
import AllergyForm from '../screens/home/AllergyForm';
import AllergyDetails from '../screens/home/AllergyDetails';

import {navigate} from '../utils/ui';

export const navigationRef = createNavigationContainerRef();

const Stack = createStackNavigator();

export const allergyRoutes = {
  ALLERGIES: 'allergies',
  ALLERGY: 'allergy',
  CREATE_ALLERGY: 'create-allergy',
};

const CustomNavigationBar = props => {
  const {back, navigation, route} = props;

  const title = route.params?.title || route.name;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default function HomeNavigator() {
  const [showFabIcon, setShowFabIcon] = useState(true);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={allergyRoutes.ALLERGIES}
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen
          name={allergyRoutes.ALLERGIES}
          component={Allergies}
          initialParams={{
            title: 'Allergies',
          }}
        />
        <Stack.Screen
          name={allergyRoutes.ALLERGY}
          component={AllergyDetails}
          initialParams={{
            title: 'Allergy Details',
          }}
        />
        <Stack.Screen
          name={allergyRoutes.CREATE_ALLERGY}
          component={props => (
            <AllergyForm
              {...props}
              showFabIcon={show => setShowFabIcon(show)}
            />
          )}
          initialParams={{
            title: 'Create Allergy',
          }}></Stack.Screen>
      </Stack.Navigator>
      {showFabIcon && (
        <FAB
          icon="plus"
          label="Add Allergy"
          size="small"
          onPress={() => navigate(navigationRef, allergyRoutes.CREATE_ALLERGY)}
        />
      )}
    </NavigationContainer>
  );
}
