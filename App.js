import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task && task.trim()) {
        const newTask = {
            text: task.trim(),
            dateTime: date.toLocaleString()
        };
        setTaskItems([...taskItems, newTask]);
        setTask(null);
        setModalVisible(false);
    } else {
        Alert.alert("Kegiatan tidak boleh kosong!", "Mohon untuk masukkan nama kegiatan dengan benar.");
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1c1d22" barStyle="light-content" />
      <Text style={styles.sectionTitle}>To Do list.</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.taskWrapper}>
          <View style={styles.items}>
            {taskItems.length === 0 ? (
              <Text style={styles.emptyTask}>Tidak ada yang harus dilakukan, atau mungkin semuanya sudah diselesaikan!</Text>
            ) : (
              taskItems.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item.text} dateTime={item.dateTime} />
                </TouchableOpacity>
            ))
            
            )}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(!isModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.inputWrapper}>
              <TextInput
              style={styles.input}
              placeholder='Tambahkan kegiatan'
              placeholderTextColor='#c6c6ce'
              value={task}
              onChangeText={(text) => setTask(text)}
              />
            </View>
            
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.datePickerText}>Pilih Tanggal dan Waktu</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity onPress={handleAddTask}>
              <View style={styles.addTaskButton}>
                <Text style={styles.addTaskButtonText}>Tambahkan Kegiatan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1d22',
  },
  sectionTitle: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 20,
    fontSize: 24,
    color: '#c8c9d1',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    backgroundColor: '#1c1d22',
  },
  taskWrapper: {
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1c1d22',
    borderColor: '#333238',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    paddingVertical: 10,
    backgroundColor: '#43414f',
    borderRadius: 10,
    width: 290,
    marginBottom: 20,
    textAlign: 'center',
    color: '#c6c6ce',
  },
  addWrapper: {
    width: 70,
    height: 70,
    paddingBottom: 5,
    backgroundColor: '#27262f',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 40,
    textAlign: 'center',
    color: '#c6c6ce',
  },
  emptyTask: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '80%',
    opacity: 0.4,
    color: '#c8c9d1',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    minHeight: 400,  // Set maximum height for the modal
    backgroundColor: '#27262f',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  datePickerText: {
    color: '#c6c6ce',
    backgroundColor: '#43414f',
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginBottom: 15,
    borderRadius: 10,
  },
  addTaskButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#43414f',
    borderRadius: 60,
  },
  addTaskButtonText: {
    color: '#c6c6ce',
  },
});
