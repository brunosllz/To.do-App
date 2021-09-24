import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditingTask = {
  taskId: number
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const verifyTask = tasks.find(tasks => tasks.title === newTaskTitle);
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    if(verifyTask){
      return(
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome"
        )
      )
    }
    
    setTasks(oldState => [...oldState, newTask])
    //TODO - add new task - PRONTO
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}));
    
    const searchTask = updatedTask.find(item => item.id === id);

    if(!searchTask){
      return;
    }

    searchTask.done = !searchTask.done;
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { 
          text: "Não", 
          style: "cancel" 
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))
        }
      ]
    )
  }

  function handleEditTask({taskId, taskNewTitle }: EditingTask) {
    const updatedTask = tasks.map(task => ({...task}));
    
    const TaskEdited = updatedTask.find(item => item.id === taskId);

    if(!TaskEdited){
      return;
    }

    TaskEdited.title = taskNewTitle
    setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})