import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput
} from 'react-native';

import { Task } from '../components/TasksList';
import { EditingTask } from '../pages/Home';

import editIcon from '../assets/icons/edit/edit.png'
import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/Feather';

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId,taskNewTitle }: EditingTask) => void;
  }

export function TaskItem({task, toggleTaskDone, removeTask, editTask}: TasksItemProps ) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskNewTitle, setEditedTaskNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null) 

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditedTaskNewTitle(task.title);
        setIsEditing(false);
    }

    function handleSubimitEditing() {
        editTask({ taskId: task.id, taskNewTitle: editedTaskNewTitle });
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    return(
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View 
                        style={[task.done ? styles.taskMarkerDone : styles.taskMarker]}
                    >
                        { task.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput
                       value={editedTaskNewTitle}
                       onChangeText={setEditedTaskNewTitle}
                       editable={isEditing}
                       onSubmitEditing={handleSubimitEditing}
                       style={task.done ? styles.taskTextDone : styles.taskText}
                       ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerIcons}>
                { isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                         <Icon 
                            name="x"
                            size={24}
                            color="#B2B2B2"
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View style={styles.iconDivider}/>

                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleSubimitEditing}
                    >
                         <Icon 
                            name="check"
                            size={24}
                            color="#B2B2B2"
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => removeTask(task.id)}
                    >
                        <Image source={trashIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    infoContainer: {
        flex: 1
    },
    containerIcons: {
        flexDirection: 'row',
        marginRight: 15
    },
    iconDivider:{
        width: 1,
        height: 24,
        marginHorizontal: 14,
        backgroundColor: '#C4C4C4'
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 10,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })