import React from 'react';
import {View, StyleSheet } from 'react-native';
import SendOtp from './SendOtp';
import Verify from './Verify';
import {username} from '../../stylesheet';

const styles = StyleSheet.create(username);

export default class IndexOtp extends React.Component {
  state = {
    otpSent: false,
    number: '',
    countryCode: ''
  }

  otpSentCallback = (countryCode, number) => {
    this.setState({
      ...this.state,
      otpSent: true,
      countryCode,
      number
    })
  }

  displayChildComponent = () => {
    if (!this.state.otpSent) {
      return <SendOtp otpSentCallback={this.otpSentCallback} task={this.props.task}/>
    }
    return <Verify countryCode={this.state.countryCode } number={this.state.number} loginCallback={this.props.loginCallback} task={this.props.task}/>;
  }

  render(){
    return (
      <View style={styles.container} >
        {this.displayChildComponent()}
      </View>
    )

  }
}
