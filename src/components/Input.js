import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {RadioButton, TextInput, Text} from 'react-native-paper';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {isObjectEmpty} from '../utils/object';

const ImageView = props => {
  const {label, value} = props;

  const [imageSource, setImageSource] = useState(null);

  const openImagePicker = async () => {
    const response = await launchImageLibrary();

    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      return;
    }

    const source = {uri: response.assets[0].uri};

    setImageSource(source);
  };

  return (
    <TouchableOpacity onPress={openImagePicker}>
      <View style={[styles.dropzone, styles.fieldSet]}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <Text>{label || 'Tap to upload image'} </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const InputView = props => {
  const {
    mode = 'outlined',
    options,
    label,
    onChange,
    value,
    type,
    propsGenerator = () => {},
    errored = true,
    required,
    innerRef,
    ...rest
  } = props;

  if (type === 'radio') {
    if (!options?.length) {
      return null;
    }

    return (
      <View
        style={[
          styles.fieldSet,
          errored ? styles.fieldSetInvalid : styles.fieldSetValid,
        ]}>
        <Text style={styles.legend}>{`${label} ${required ? '*' : ''}`}</Text>
        {options.map(({label, value: optValue}) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RadioButton
              value={optValue}
              status={optValue === value ? 'checked' : 'unchecked'}
              onPress={() => onChange(optValue)}
              {...propsGenerator(optValue)}
            />
            <Text onPress={() => onChange(optValue)}>{label}</Text>
          </View>
        ))}
      </View>
    );
  }

  if (type === 'image') {
    return (
      <ImageView
        label={label}
        value={value}
        onChange={onChange}
        errored={errored}
        required={required}
        {...rest}
      />
    );
  }

  return (
    <TextInput
      mode={mode}
      ref={innerRef}
      error={errored}
      value={value}
      onChangeText={latestText => {
        onChange(latestText);
      }}
      label={`${label} ${required ? '*' : ''}`}
      {...rest}
    />
  );
};

const Input = props => {
  const {required, contentContainerStyle, error, innerRef, ...rest} = props;

  return (
    <View style={[styles.container, contentContainerStyle]}>
      <InputView
        placeholder="Enter something . . ."
        required={required}
        errored={!isObjectEmpty(error)}
        innerRef={innerRef}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldSet: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
  fieldSetValid: {
    borderColor: 'black',
  },
  fieldSetInvalid: {
    borderWidth: 2,
    borderColor: 'red',
  },
  legend: {
    paddingHorizontal: 5,
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#ddd',
  },
  label: {
    backgroundColor: '#ddd',
  },
  required: {
    color: 'red',
  },
  dropzone: {
    height: 150,
    borderStyle: 'dashed',
    borderColor: '#888',
    backgroundColor: 'white',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  image: {
    width: 150,
    height: 150,
  },

  container: {
    marginVertical: 10,
    flex: 1,
    display: 'flex',
  },
});

export default Input;
