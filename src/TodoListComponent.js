import React, { Component } from 'react';
import {FETCH_TODOS} from './queries';
import { graphql, Query } from 'react-apollo';
import {FlatList, StyleSheet, Alert, Text, View} from 'react-native';
import DeleteButton from './DeleteButton';
import TodoTextItem from './TodoTextItem'


const TodoListComponent = () => (
  <Query query={FETCH_TODOS}>
    {({loading, error, data}) => {
      if (error) {
        Alert.alert("Error", "Could not fetch todos");
        console.log(error);
        return null;
      }

      if (loading) {
        return (
          <Text>Please Wait</Text>
        )
      }

      return (
        <FlatList
          data={data.todos}
          keyExtractor = {(item, index) => index}
          renderItem={(todoItem) => {
            return (
              <View style={styles.todoItem} key={todoItem.index}>
                <TodoTextItem todo={todoItem.item} />
                <DeleteButton todo={todoItem.item} />
              </View>
            );
          }}
        />
      );
    }}
  </Query>
)

const styles = StyleSheet.create({
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
  }
})

export default TodoListComponent;
