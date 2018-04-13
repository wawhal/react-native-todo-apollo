import React, { Component } from 'react';
import {UPDATE_TODO, FETCH_TODOS} from './queries';
import {StyleSheet, Text} from 'react-native';
import { graphql, Mutation } from 'react-apollo';

const TodoTextItem = (props) => {
  const textStyle = props.todo.completed ? styles.completedText : styles.incompleteText;
  return (
    <Mutation
      mutation={UPDATE_TODO}
      update={(cache) => {
        const data = cache.readQuery({ query: FETCH_TODOS});
        cache.writeQuery({
          query: FETCH_TODOS,
          data: {
            ...data,
            todos: data.todos.map((todo) => {
              if (todo.id === props.todo.id) {
                return {
                  ...todo,
                  completed: !todo.completed
                }
              }
              return todo;
            })
          }
        })
      }}
    >
      {
        (update_todos) => (
          <Text
            style={textStyle}
            onPress={() => {
              update_todos({
                variables: {
                  todo_id: props.todo.id,
                  completed: !props.todo.completed
                }
              })
            }}
          >
            {props.todo.task}
          </Text>
        )
      }
    </Mutation>
  )
}

const styles = StyleSheet.create({
  completedText: {
    flex:1,
    textDecorationLine: 'line-through'
  },
  incompleteText: {
    flex: 1
  }
})

export default TodoTextItem;
