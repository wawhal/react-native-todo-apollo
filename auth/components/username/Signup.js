import React from 'react';
import { Text, Button, Form, Item, Input } from 'native-base';
import {username} from '../../stylesheet';
import {trySignup} from './actions';
import {storeSession} from '../../actions';

import {StyleSheet, View, TextInput, Alert, Platform} from 'react-native';

const styles = StyleSheet.create(username);

export default class UsernameSignup extends React.Component {
  state = {
    loading: false,
    username: '',
    password: '',
    cPassword: ''
  }

  handleUsernameChange = (text) => {
    this.setState({
      ...this.state,
      username: text
    });
  }

  handlePasswordChange = (text) => {
    this.setState({
      ...this.state,
      password: text
    });
  }

  handleCPasswordChange = (text) => {
    this.setState({
      ...this.state,
      cPassword: text
    });
  }

  setLoading = () => {
    this.setState({...this.state, loading: true});
  }

  unsetLoading = () => {
    this.setState({...this.state, loading: false});
  }

  handleSignupPress = async () => {
    const { username, password, cPassword} = this.state;
    if (username.length === 0 || password.length === 0 || cPassword.length === 0) {
      Alert.alert('Invalid Request', 'All fields are mandatory');
      return;
    }
    if (password !== cPassword) {
      Alert.alert('Invalid Request', 'Inputs of "password" and "confirm password" do not match');
      return;
    }
    this.setLoading();
    const signupResp = await trySignup(username, password);
    if (signupResp.success) {
      await storeSession({id: signupResp.hasura_id, token: signupResp.auth_token, type: "username"});
      Alert.alert('Success', 'Signup Complete');
      this.unsetLoading();
      this.props.loginCallback({id: signupResp.hasura_id, token: signupResp.auth_token, type: "username"});
    } else {
      Alert.alert('Request failed', signupResp.message);
      this.unsetLoading();
    }
  }

  render() {
    const platform = Platform.OS;
    return (
      <View style={styles.container}>
        <Form>
          <Item style={styles.textbox}>
            <Input
              placeholder="Username"
              value={this.state.username}
              onChangeText={this.handleUsernameChange}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </Item>
          <Item style={styles.textbox}>
            <Input
              placeholder="Password"
              secureTextEntry
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              autoCapitalize="none"
            />
          </Item>
          <Item style={styles.textbox}>
            <Input
              secureTextEntry
              placeholder="Confirm Password"
              value= {this.state.cPassword}
              onChangeText={this.handleCPasswordChange}
              autoCapitalize="none"
            />
          </Item>
        </Form>
        <Button full dark={platform === "ios"} onPress={this.handleSignupPress} style={styles.button} disabled={this.state.loading}>
          <Text>{this.state.loading ? "Please wait" : "Signup"}</Text>
        </Button>
      </View>
    );
  }
}
