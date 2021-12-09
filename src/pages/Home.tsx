import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //checks if the tasks already contains one with the same title
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
    } else {
      //add new task
      setTasks((prev) => [
        ...prev,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        },
      ]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //toggle task done if it exists
    //const toggledTask = tasks.find((task) => task.id === id);

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : { ...task },
    );

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //First checks if the user really want to delete the task
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          //remove task from state
          onPress: () => {
            const filtered = tasks.filter((item) => item.id !== id);
            setTasks(filtered);
          },
        },
      ],
    );
  }

  function handleEditTask(id: number, newTitle: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : { ...task },
    );

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTasks={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
