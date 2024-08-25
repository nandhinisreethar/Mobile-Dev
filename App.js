import { StatusBar } from 'expo-status-bar';
import { Alert, View } from 'react-native';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form/Form';
import styles from './src/styles/main';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { load as databaseLoad } from './src/database';



const Tab = createBottomTabNavigator();

export default function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    databaseLoad()
      .then((data) => {
        setTasks(data);
      })
      .catch(() => {
        Alert.alert('Database Load', 'There was an error loading the database. Please, try again later.');
      })
  }, []);


  const handleAddTask = (data) => {
    const updatedTasks = [...tasks];
    updatedTasks.push(data);
    setTasks(updatedTasks);
  }

  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const handleTaskRemoval = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(updatedTasks);
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header />

        <Tab.Navigator>
          <Tab.Screen name='List' options={{
            headerShown: false,
            title: 'List Tasks',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='list-ul' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Tasks {...props} tasks={tasks} onStatusChange={handleStatusChange} onTaskRemoval={handleTaskRemoval} />
            )}
          </Tab.Screen>
          <Tab.Screen name='Add' options={{
            title: 'Add Task',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#001010'
            },
            tabBarIcon: ({ color, size }) => (
              <Entypo name='add-to-list' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Form {...props} onAddTask={handleAddTask} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
