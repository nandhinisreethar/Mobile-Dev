import { useState } from 'react';
import { View, Text, Pressable, Modal, Switch, Alert } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as database from '../../../database';

export default function Task(props) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  }

  const handleStatusChangePress = () => {
    database.update(props.task.id, { done: !props.task.done })
      .then((updated) => {
        if (updated) {
          props.onStatusChange(props.task.id);
        }
        else {
          Alert.alert('Database Update', 'There was an error updating the database. Please, try again later.');
        }
      });
  }

  const handleRemovePress = () => {
    Alert.alert(
      'Remove Task',
      'This action will permanently delete this task. This action cannot be undone!', [
      {
        text: 'Confirm',
        onPress: () => {
          database.remove(props.task.id, { done: !props.task.done })
            .then((removed) => {
              if (removed) {
                props.onTaskRemoval(props.task.id);
                setShowModal(false);
              }
              else {
                Alert.alert('Database Update', 'There was an error removing data from the database. Please, try again later.');
              }
            });
        }
      },
      {
        text: 'Cancel'
      }
    ]);
  }

  return (
    <>
      <Pressable onPress={handleModalToggle}>
        <View style={styles.container}>
          <Text style={styles.title}>Title: {props.task.title}</Text>
          {/* <Text style={styles.text}>Id: {props.task.id}</Text> */}
          <Text style={styles.text}>Status: {props.task.done ? 'Done' : 'Due'}</Text>
        </View>
      </Pressable>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal.container}>
          <View style={styles.modal.box}>

            {/* Close Modal */}
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color="#c00" />
                <Text style={styles.close.text}>Close</Text>
              </View>
            </Pressable>

            {/* Task title */}
            <Text style={styles.title}>Title:</Text>
            <Text style={styles.title}>{props.task.title}</Text>

            <View style={styles.options}>

              {/* Change Status */}
              <View style={styles.switch.container}>
                <Switch
                  value={props.task.done}
                  onValueChange={handleStatusChangePress}
                />
                <Pressable onPress={handleStatusChangePress}>
                  <Text style={styles.switch.label}>Toggle Status</Text>
                </Pressable>
              </View>

              {/* Remove Button */}
              <View style={styles.remove.container}>
                <Pressable onPress={handleRemovePress}>
                  <MaterialIcons name='delete-sweep' size={32} style={styles.remove.icon} />
                  <Text style={styles.remove.label}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}