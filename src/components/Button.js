import React from 'react';
import {Button, IconButton} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const DEFAULT_BORDER_RADIUS = 5;

const CustomButton = props => {
  // Change default mode to contained unless specified
  const {
    title = 'Click Here',
    mode = 'contained',
    type,
    style,
    onlyIcon,
    contentContainerStyle,
    ...rest
  } = props;

  const typePropsMap = {
    danger:
      mode === 'outlined'
        ? {
            textColor: 'red',
          }
        : {},
  };

  return (
    <View style={contentContainerStyle}>
      {onlyIcon ? (
        <IconButton
          mode={mode}
          style={{...styles.button, ...style}}
          {...rest}
        />
      ) : (
        <Button
          mode={mode}
          style={{...styles.button, ...style}}
          {...(type ? typePropsMap[type] : {})}
          {...rest}>
          {title}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: DEFAULT_BORDER_RADIUS,
  },
});

export default CustomButton;
