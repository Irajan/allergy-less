import {View, Text, StyleSheet} from 'react-native';
import {Card, Checkbox, List, Tooltip} from 'react-native-paper';
import React, {useState, useEffect} from 'react';

import {isObjectEmpty} from '../../../utils/object';
import {getAbbreviation} from '../../../utils/string';

import Input from '../../../components/Input';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';

import * as allergyService from '../../../services/allergy';
import {ScrollView} from 'react-native-gesture-handler';
import {severityBgColor, severityTextColor} from '../../../constants/ui';
import {allergySeverityLabel} from '../../../constants/appConstants';

const SeverityIndicator = props => {
  const {severity, ...rest} = props;
  return (
    <View style={[styles.pills, {backgroundColor: severityBgColor[severity]}]}>
      <View
        style={[
          styles.pillsBulb,
          {backgroundColor: severityTextColor[severity]},
        ]}></View>
      <Text style={{color: severityTextColor[severity]}}>
        {allergySeverityLabel[severity]}
      </Text>
    </View>
  );
};

const AllergyDetails = props => {
  const {route} = props;
  const [allergy, setAllergy] = useState({});
  const [addedData, setAddedData] = useState({
    symptoms: '',
    suggestions: '',
  });

  const [isButtonPressed, setIsButtonPressed] = useState({
    symptoms: false,
    suggestions: false,
  });

  const allergyId = route.params?.id;

  const validateAddedField = field => {
    const trimmedAddedData = addedData[field].trim();

    if (!Boolean(trimmedAddedData)) {
      return {
        isValid: false,
      };
    }

    return {
      isValid: true,
      sanitizedValue: trimmedAddedData,
    };
  };

  const clearFields = field => {
    setAddedData(addedData => ({...addedData, [field]: ''}));
    setIsButtonPressed(btnPressed => ({...btnPressed, [field]: false}));
  };

  const toggleInput = field => {
    setIsButtonPressed(btnPressed => ({
      ...btnPressed,
      [field]: !btnPressed[field],
    }));
  };

  useEffect(() => {
    console.log(allergy);
  }, [allergy]);

  const toggleApplySuggestion = id => {
    setAllergy(allergy => ({
      ...allergy,
      suggestions: allergy.suggestions.map(suggestion =>
        suggestion.id === id
          ? {...suggestion, isApplied: !suggestion.isApplied}
          : suggestion,
      ),
    }));
  };

  const handleAddSymptom = () => {
    const {isValid, sanitizedValue: addedSymptom} =
      validateAddedField('symptoms');

    if (!isValid) {
      return;
    }

    setAllergy(allergy => ({
      ...allergy,
      symptoms: [
        ...allergy.symptoms,
        {id: (allergy.symptoms?.length || 0) + 1, description: addedSymptom},
      ],
    }));

    clearFields('symptoms');
  };

  useEffect(() => {
    (async function () {
      const data = await allergyService.fetchAllergy(allergyId);

      setAllergy(data);
    })();
  }, []);

  if (isObjectEmpty(allergy)) {
    return null;
  }

  const user = allergy.user;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <ScrollView>
      <Card>
        <Card.Cover source={{uri: allergy.imageUrl}} />
        <Card.Content>
          <Card.Title
            title={allergy.name}
            subtitle={fullName}
            left={props => (
              <Avatar
                {...props}
                imageUrl={user.avatarUrl}
                label={getAbbreviation(fullName)}
              />
            )}
            right={props => (
              <SeverityIndicator severity={allergy.severity} {...props} />
            )}
          />
        </Card.Content>
      </Card>
      {allergy.symptoms?.length && (
        <List.Accordion title="Symptoms">
          <>
            {allergy.symptoms.map(({description, id}) => (
              <List.Item title={description} key={id} />
            ))}
            {isButtonPressed.symptoms && (
              <Input
                value={addedData.symptoms}
                onChangeText={text =>
                  setAddedData(addedData => ({...addedData, symptoms: text}))
                }
                autoFocus
                label="New symptom"
                onBlur={handleAddSymptom}
              />
            )}
            <View style={styles.btnWrapper}>
              {isButtonPressed.symptoms ? (
                <Button
                  title="Cancel"
                  onPress={() => clearFields('symptoms')}
                />
              ) : (
                <Button
                  title={'Add New'}
                  onPress={() => toggleInput('symptoms')}
                />
              )}
            </View>
          </>
        </List.Accordion>
      )}
      {allergy.suggestions?.length && (
        <List.Accordion title="Suggestions">
          {allergy.suggestions.map(({description, isApplied, id}) => (
            <List.Item
              title={description}
              key={id}
              right={props => (
                <Tooltip title="Mark as done">
                  <Checkbox
                    status={isApplied ? 'checked' : 'unchecked'}
                    onPress={() => toggleApplySuggestion(id)}
                    {...props}
                  />
                </Tooltip>
              )}
            />
          ))}
        </List.Accordion>
      )}
      <Button title="Mark as Cured" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },

  pills: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  pillsBulb: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default AllergyDetails;
