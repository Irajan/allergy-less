import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {Avatar} from 'react-native-paper';

const CustomAvatar = props => {
  const {icon, imageUrl, label = '', ...rest} = props;

  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  if (imageUrl && !isError) {
    return (
      <Avatar.Image
        source={{
          uri: imageUrl,
        }}
        onError={handleError}
        {...rest}
      />
    );
  }

  if (icon) {
    return <Avatar.Icon icon={icon} {...rest} />;
  }

  return <Avatar.Text label={label} {...rest} />;
};

export default CustomAvatar;
