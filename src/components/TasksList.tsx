import React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import TaskItem from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTasks: (id: number, newTitle: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  editTasks,
  removeTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
              editTasks={editTasks}
              task={item}
              index={index}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
