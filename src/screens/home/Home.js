import React, {useState} from 'react';
import {Appbar, FAB} from 'react-native-paper';
import Allergies from './components/Allergies';
import AllergyDetails from './components/AllergyDetails';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AllergyForm from './components/AllergyForm';

// RootNavigation.js

import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 *
 * @param {string} name
 * @param {Object} params
 */
export function navigate(name, params) {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.navigate(name, params);
}

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

export default function Home() {
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
          onPress={() => navigate(allergyRoutes.CREATE_ALLERGY)}
        />
      )}
    </NavigationContainer>
  );
}
