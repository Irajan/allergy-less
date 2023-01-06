import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {Card, Appbar, Portal, List} from 'react-native-paper';
import Avatar from '../../components/Avatar';
import {getAbbreviation} from '../../utils/string';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
const LeftContent = props => (
  <Avatar {...props} label={getAbbreviation('Irajan Dhakal')} />
);

const LogoutModal = props => {
  const {authenticate} = props;

  return (
    <Modal
      TriggerBtn={p => (
        <Button mode="outlined" title="Log Out" {...p} {...props} />
      )}
      title="Are you sure ?"
      buttons={[
        {
          title: 'Confirm',
          type: 'danger',
          handlePress: () => authenticate(false),
        },
        {
          title: 'Cancel',
          close: true,
          mode: 'outlined',
        },
      ]}
    />
  );
};

const EditIcon = props => {
  const {onPress, ...rest} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <List.Icon icon="pencil" {...rest} />
    </TouchableOpacity>
  );
};

const Profile = props => {
  const [fields, setFields] = useState({
    firstName: 'Irajan',
    lastName: 'Dhakal',
    email: 'irajan.dhakal@gmail.com',
    address: 'Naikap, Chandragiri',
  });

  const [edit, setEdit] = useState({
    name: false,
    email: false,
    address: false,
  });

  const handleFieldChange = (field, value) => {
    setFields(fieldSet => ({...fieldSet, [field]: value}));
  };

  const handleEdit = (field, shouldEdit) => {
    setEdit(edit => ({...edit, [field]: shouldEdit}));
  };

  const lastNameRef = useRef(null);

  return (
    <View style={styles.wrapper}>
      <Appbar elevated>
        <Appbar.Content title="Profile" />
      </Appbar>

      <Card>
        <Card.Title
          title="Irajan Dhakal"
          subtitle="Doctor"
          left={LeftContent}
          right={prop => <LogoutModal {...props} {...prop} />}
          style={{marginRight: 10}}
        />
      </Card>

      {edit.name ? (
        <View style={styles.rowWrapper}>
          <Input
            autoFocus
            label="First Name"
            onChange={value => handleFieldChange('firstName', value)}
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameRef.current?.focus();
            }}
            blurOnSubmit={false}
            value={fields.firstName}
            style={styles.input}
          />
          <Input
            innerRef={lastNameRef}
            label="Last Name"
            onChange={value => handleFieldChange('lastName', value)}
            value={fields.lastName}
            onBlur={() => handleEdit('name', false)}
          />
        </View>
      ) : (
        <List.Item
          title="Name"
          description={`${fields.firstName} ${fields.lastName}`}
          right={props => (
            <EditIcon {...props} onPress={() => handleEdit('name', true)} />
          )}
        />
      )}

      {edit.email ? (
        <View style={styles.rowWrapper}>
          <Input
            label="Email"
            autoFocus
            onChange={value => handleFieldChange('email', value)}
            onBlur={() => handleEdit('email', false)}
            value={fields.email}
            style={styles.input}
          />
        </View>
      ) : (
        <List.Item
          title="Email"
          description={fields.email}
          right={props => (
            <EditIcon {...props} onPress={() => handleEdit('email', true)} />
          )}
        />
      )}

      {edit.address ? (
        <View style={styles.rowWrapper}>
          <Input
            autoFocus
            label="Address"
            onChange={value => handleFieldChange('address', value)}
            value={fields.address}
            style={styles.input}
            onBlur={() => handleEdit('address', false)}
          />
        </View>
      ) : (
        <List.Item
          title="Address"
          description={fields.address}
          right={props => (
            <EditIcon {...props} onPress={() => handleEdit('address', true)} />
          )}
        />
      )}

      <List.Item title="Recorded Allergies" description="45" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
  },

  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },

  input: {
    marginHorizontal: 10,
  },
});

export default Profile;
