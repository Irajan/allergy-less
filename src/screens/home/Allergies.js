import React, {useState, useEffect} from 'react';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import {allergySeverity} from '../../constants/appConstants';
import {severityTextColor} from '../../constants/ui';
import * as allergyService from '../../services/allergy';
import Avatar from '../../components/Avatar';

import {ScrollView} from 'react-native-gesture-handler';
import {allergyRoutes} from '../../navigator/HomeNavigator';
import MainLayout from '../../components/MainLayout';

const Allergies = props => {
  const {
    navigation: {navigate},
  } = props;
  const [allergies, setAllergies] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await allergyService.fetchAllergies();

      setAllergies(data);
    })();
  });

  if (!allergies) {
    return null;
  }

  return (
    <MainLayout>
      <ScrollView>
        {allergies.map(({id, name, user, severity}) => {
          return (
            <Card
              key={id}
              elevation={4}
              mode="elevated"
              style={{
                borderRightColor: severityTextColor[severity],
                borderRightWidth: 10,
                marginBottom: 5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onPress={() =>
                navigate({
                  name: allergyRoutes.ALLERGY,
                  params: {
                    id,
                  },
                })
              }>
              <Card.Title
                title={name}
                subtitle={user.firstName + ' ' + user.lastName}
                left={props => <Avatar imageUrl={user.avatarUrl} {...props} />}
              />
            </Card>
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default Allergies;
