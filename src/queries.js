import gql from 'graphql-tag';

const FETCH_TODOS = gql`
  query fetch_todos{
    todos {
      id
      task
      completed
      user_id
    }
  }
`;

const INSERT_TODO = gql`
  mutation insert_todos ($objects: [todos_input!]){
    insert_todos(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

const UPDATE_TODO = gql`
  mutation update_todos{
    update_todos(where: {id: {_eq: $todo_id}} _set: {completed: $completed}) {
      affected_rows
    }
  }
`;

const DELETE_TODO = gql`
  mutation delete_todos{
    delete_todos(where: {id: {_eq: $todo_id}}) {
      affected_rows
    }
  }
`;

export {
  INSERT_TODO,
  FETCH_TODOS,
  UPDATE_TODO,
  DELETE_TODO
}
