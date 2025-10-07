import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function App() {
  const [task, setTask] = useState('');
  const [work, setWork] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [nextId, setNextId] = useState(1);

  
  const addTask = () => {
    if (task.trim().length > 0 && work.trim().length > 0) {
      const newTask = {
        id: nextId,
        title: task.trim(),
        work: work.trim(),
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setNextId(nextId + 1);
      setTask(''); 
      setWork('');
    }
  };

  
  const completeTask = (id) => {
    setTaskList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  
  const deleteTask = (id) => {
    setTaskList((prevList) => prevList.filter((item) => item.id !== id));
  };

  
  const clearAll = () => setTaskList([]);

  
  const sortTasksByCompletion = () => {
    const sorted = [...taskList].sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
    setTaskList(sorted);
  };

  
  const sortTasksByDate = () => {
    const sorted = [...taskList].sort((a, b) => b.id - a.id);
    setTaskList(sorted);
  };

  
  const moveTaskUp = (index) => {
    if (index === 0) return; 
    const newList = [...taskList];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setTaskList(newList);
  };

  const moveTaskDown = (index) => {
    if (index === taskList.length - 1) return; 
    const newList = [...taskList];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setTaskList(newList);
  };

  
  const renderItem = ({ item, index }) => (
    <View style={styles.taskItem}>
      
      <Text style={styles.taskNumber}>{index + 1}</Text>

      <View style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.title}
        </Text>
        <Text style={styles.taskWork}>Work: {item.work}</Text>
        <Text
          style={[
            styles.taskStatus,
            { color: item.completed ? 'green' : 'red' },
          ]}
        >
          Status: {item.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>

      
      <View style={styles.arrows}>
        <TouchableOpacity onPress={() => moveTaskUp(index)} style={styles.arrowBtn}>
          <Text style={styles.arrowText}>⬆️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveTaskDown(index)} style={styles.arrowBtn}>
          <Text style={styles.arrowText}>⬇️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  
  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backBtn, styles.doneBtn]}
        onPress={() => completeTask(data.item.id)}
      >
        <Text style={styles.backTextWhite}>
          {data.item.completed ? 'Undo' : 'Done'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backBtn, styles.deleteBtn]}
        onPress={() => deleteTask(data.item.id)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 My To-Do List</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Enter task title..."
        value={task}
        onChangeText={setTask}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter work/category..."
        value={work}
        onChangeText={setWork}
      />

      <Button title="Add Task" onPress={addTask} />

      
      <Text style={styles.taskCount}>
        Tasks left: {taskList.filter((t) => !t.completed).length} / {taskList.length}
      </Text>

      
      <View style={styles.topButtons}>
        <Button title="Sort by Status" onPress={sortTasksByCompletion} color="blue" />
        <Button title="Sort by Date" onPress={sortTasksByDate} color="purple" />
        <Button title="Clear All" onPress={clearAll} color="orange" />
      </View>

      
      <SwipeListView
        data={taskList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        disableRightSwipe
        previewRowKey={'1'}
        previewOpenValue={-40}
        previewOpenDelay={2000}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#888', marginBottom: 10, paddingVertical: 5, fontSize: 16 },
  taskCount: { fontSize: 16, marginVertical: 10, textAlign: 'center' },
  topButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  taskItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  taskNumber: { fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  taskText: { fontSize: 18, fontWeight: '600' },
  taskWork: { fontSize: 14, color: '#666' },
  taskStatus: { fontSize: 14, fontWeight: '500', marginTop: 2 },
  completedTask: { textDecorationLine: 'line-through', color: '#888' },
  rowBack: { alignItems: 'center', backgroundColor: '#DDD', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', borderRadius: 10, marginBottom: 10 },
  backBtn: { alignItems: 'center', bottom: 0, justifyContent: 'center', position: 'relative', width: 75, height: '100%' },
  doneBtn: { backgroundColor: 'green' },
  deleteBtn: { backgroundColor: 'red', borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  backTextWhite: { color: '#FFF', fontWeight: 'bold' },
  arrows: { flexDirection: 'column', marginLeft: 10 },
  arrowBtn: { paddingVertical: 2 },
  arrowText: { fontSize: 18 },
});
