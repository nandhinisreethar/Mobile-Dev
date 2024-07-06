import { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Keyboard, Alert } from 'react-native';
import { save as databaseSave } from '../../database';
import styles from './styles';

export default function Form(props) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDone, setTaskDone] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const handleAddPress = () => {
    if (taskTitle) {
      const data = {
        title: taskTitle,
        done: taskDone
      };

      databaseSave(data)
        .then((id) => {
          data.id = id;
          props.onAddTask(data);

          setTaskTitle('');
          setTaskDone(false);
          setIsEnabled(true);
          Keyboard.dismiss();
        })
        .catch(() => {
          Alert.alert('Database Save', 'There was an error saving to the database. Please, try again later.');
        });
    }
    else {
    
      setIsEnabled(true);
     
    }
  }

  const handleTitleChange = (value) => {
    if(value!=''){
      setTaskTitle(value);
      setIsEnabled(false);
    }
    else{
      setIsEnabled(true);
    }
   
  }

  const handleStatusChange = (value) => {
    setTaskDone(value);
  }


  return (
    <View style={styles.container}>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        maxLength={150}
        onChangeText={handleTitleChange}
        defaultValue={taskTitle}
        style={styles.textbox}
        
      />

      <View style={styles.switch.container}>
        <Switch
          value={taskDone}
          onValueChange={handleStatusChange}
        />
        <Text style={styles.switch.label}>Done</Text>
      </View>

      <Button
        title='Add'
        onPress={handleAddPress}
        disabled={isEnabled}
      
      />
    </View>
  );
}