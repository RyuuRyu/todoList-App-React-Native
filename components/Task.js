import  React  from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Task = ({ text, dateTime }) => {
    return (
        <View style={styles.items}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{text}</Text>
            </View>
            {/* <View style={styles.circular}></View> */}
            <View style={styles.dateTime}>
                <Text style={styles.dateTimeText}>{dateTime}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    items: {
        backgroundColor: '#26262e',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#cacad1',
        opacity: 0.5,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
        color: '#82828d',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#cacad1',
        borderWidth: 2,
        borderRadius: 7,
    },
    dateTimeText: {
        color: '#c6c6ce',
        fontSize: 12, // Adjust size as needed
    }
    

});

export default Task;
