import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

// PAREI NA TOGGLE TASK DONE COM A TASKLIST

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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

  function handleToggleTaskDone(id: number) {
    //toggle task done if it exists
    const toggledTask = tasks.find((task) => task.id === id);

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : { ...task },
    );

    setTasks(updatedTasks);

    console.log(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //remove task from state
    const filtered = tasks.filter((item) => item.id !== id);
    setTasks(filtered);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
