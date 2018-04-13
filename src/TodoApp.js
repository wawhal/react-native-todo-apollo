import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, View} from 'react-native';
import { Constants } from 'expo';
import AddButton from './AddButton';
import TodoListComponent from './TodoListComponent';

export default class App extends Component {

  state = {
    text: ''
  }

  handleTextChange = (text) => {
    this.setState({
      text
    })
  }

  logout = async () => {
    try {
      await this.props.client.resetStore();
    } catch (e) {
      console.log(e);
    }
    this.props.logoutCallback();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formView}>
          <TextInput
            style={styles.inputForm}
            value={this.state.text}
            onChangeText={this.handleTextChange}
            placeholder="Input todo"/>
          <AddButton task={this.state.text} userId={this.props.session.id} handleTextChange={this.handleTextChange}/>
        </View>
        <TodoListComponent />
        <Button title="Logout" onPress={this.props.logoutCallback}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    backgroundColor: '#eee',
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8,
  }
});
