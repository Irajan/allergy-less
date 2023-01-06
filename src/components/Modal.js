import {Portal, Modal, Text, IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import React, {useEffect} from 'react';
import Button from './Button';

const CustomModal = props => {
  const {
    TriggerBtn,
    showHeader = true,
    showFooter = true,
    title,
    buttons = [],
  } = props;

  const [loading, setLoading] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const isLoading = Object.values(loading).some(isLoading => isLoading);

    setModalLoading(isLoading);
  }, [loading]);

  const handleButtonPress = async (btnIndex, btnProps) => {
    setLoading(loading => ({...loading, [btnIndex]: true}));

    await btnProps.handlePress?.();

    if (btnProps.close) {
      hideModal();
    }

    setLoading(loading => ({...loading, [btnIndex]: false}));
  };

  return (
    <>
      {TriggerBtn ? (
        <TriggerBtn onPress={showModal} disabled={modalLoading} />
      ) : (
        <Button onPress={showModal} title="Click" disabled={modalLoading} />
      )}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.container}>
          {showHeader && (
            <View style={styles.header}>
              <Text variant="headlineMedium">{title}</Text>
              <IconButton
                icon="close"
                onPress={hideModal}
                disabled={modalLoading}
              />
            </View>
          )}
          {props.children}

          {showFooter && (
            <View>
              {buttons.map((btnProps, index) => (
                <Button
                  loading={loading[index]}
                  key={index}
                  style={{marginVertical: 5}}
                  disabled={modalLoading}
                  onPress={() => handleButtonPress(index, btnProps)}
                  {...btnProps}
                />
              ))}
            </View>
          )}
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: '25%',
    left: '5%',
    right: '5%',
    bottom: '40%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default CustomModal;
