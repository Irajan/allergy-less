import React, {useState, useEffect} from 'react';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import {allergySeverity} from '../../../constants/appConstants';
import {severityTextColor} from '../../../constants/ui';
import * as allergyService from '../../../services/allergy';
import Avatar from '../../../components/Avatar';

import {allergyRoutes} from '../Home';
import {ScrollView} from 'react-native-gesture-handler';

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
  );
};

export default Allergies;
