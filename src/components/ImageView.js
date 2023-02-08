import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import normalize from 'react-native-normalize';

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

const styles = StyleSheet.create({
  fieldSet: {
    padding: normalize(10),
    borderRadius: normalize(5),
    marginBottom: normalize(10),
    borderWidth: 1,
  },

  image: {
    width: normalize(150, 'width'),
    height: normalize(150, 'height'),
  },

  dropzone: {
    height: normalize(150, 'height'),
    borderStyle: 'dashed',
    borderColor: '#888',
    backgroundColor: 'white',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ImageView;
