import React, {useEffect} from 'react';

import Button from '../../../components/Button';
import TextInput from '../../../components/Input';

import {View, StyleSheet} from 'react-native';
import {severityTextColor} from '../../../constants/ui';
import {ScrollView} from 'react-native-gesture-handler';
import {Switch, HelperText, Text} from 'react-native-paper';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {allergySeverityOptions} from '../../../constants/appConstants';

const AllergyForm = props => {
  const {control, handleSubmit} = useForm({
    mode: 'all',
    defaultValues: {
      name: null,
      symptoms: [{title: null}],
      severity: 1,
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'symptoms',
  });

  console.log(fields);

  const submitHandler = data => {
    console.log(data);
  };

  useEffect(() => {
    props.showFabIcon(false);

    return () => props.showFabIcon(true);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.row} variant="titleMedium">
        Please fill up following allergy information
      </Text>

      <Controller
        control={control}
        name="name"
        render={({field}) => (
          <TextInput label="Allergy name" required {...field} />
        )}
      />

      <Controller
        control={control}
        name="severity"
        render={({field}) => (
          <TextInput
            required
            type="radio"
            label="Severity"
            options={allergySeverityOptions}
            propsGenerator={value => {
              return {
                color: severityTextColor[value],
                uncheckedColor: severityTextColor[value],
              };
            }}
            {...field}
          />
        )}
      />

      <View style={styles.fieldSet}>
        <Text style={styles.legend}>Symptoms</Text>
        {fields.map((field, index) => (
          <Controller
            name={`symptoms.${index}.title`}
            control={control}
            render={({field}) => {
              return (
                <View key={index} style={styles.row}>
                  <TextInput
                    {...field}
                    label={`symptom-${index + 1}`}
                    contentContainerStyle={{
                      flexBasis: '80%',
                    }}
                  />

                  <Button
                    contentContainerStyle={{flexBasis: '10%', marginRight: 20}}
                    icon={index === fields.length - 1 ? 'plus' : 'delete'}
                    onlyIcon
                    onPress={() =>
                      index === fields.length - 1
                        ? append({title: null})
                        : remove(index)
                    }
                  />
                </View>
              );
            }}
          />
        ))}
      </View>

      <TextInput type="image" label="Tap to upload allergy image" />

      <Button onPress={handleSubmit(submitHandler)} title="Submit" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  fieldSet: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  legend: {
    paddingHorizontal: 5,
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#FFFFFF',
  },
});

export default AllergyForm;
