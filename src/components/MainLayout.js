import {View, StyleSheet} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';

const MainLayout = props => {
  return <View style={styles.mainWrapper}>{props.children}</View>;
};

const styles = StyleSheet.create({
  mainWrapper: {
    padding: normalize(5),
    marginHorizontal: normalize(5),
  },
});

export default MainLayout;
