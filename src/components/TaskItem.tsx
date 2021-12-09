import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Task, TasksListProps } from './TasksList';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit.png';

interface IItem {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTasks: (id: number, newTitle: string) => void;
  task: Task;
  index: number;
}

const TaskItem = ({
  task,
  toggleTaskDone,
  editTasks,
  removeTask,
  index,
}: IItem) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedValue, setEditedValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  function handleCancelEditing() {
    setEditedValue(task.title);
    setIsBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTasks(task.id, editedValue);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //use style prop
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editedValue}
            onChangeText={setEditedValue}
            editable={isBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            //use style prop
          />
        </TouchableOpacity>
      </View>
      {/* Ternary to show X or pen icon */}
      <View style={styles.iconsContainer}>
        {isBeingEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.spacer} />
        <TouchableOpacity
          disabled={isBeingEdited}
          onPress={() => removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingRight: 24,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  spacer: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 6,
  },
});

export default TaskItem;
