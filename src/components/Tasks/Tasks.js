import { View, ScrollView, Text } from 'react-native';
import Task from './Task/Task';
import styles from './styles';

export default function Tasks(props) {
  if (props.tasks.length === 0) {
    return (
      <View style={styles.fullCenter}>
        <Text>There are no tasks in the list.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.tasks.map(
          (task, index) => (
            <Task key={index} task={task} onStatusChange={props.onStatusChange} onTaskRemoval={props.onTaskRemoval} />
          )
        )}
      </ScrollView>
    </View>
  );
}