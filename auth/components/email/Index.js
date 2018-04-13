import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Text, Header, Left, Right, Body, Button, Icon, Tab, Tabs } from 'native-base';
import EmailLogin from './Login';
import EmailSignup from './Signup';
import {index} from '../../stylesheet';

const styles = StyleSheet.create(index);

export default class IndexEmail extends React.Component {

  goToLoginScreen = () => {
    this.tabView.goToPage(1);
  }

  render() {
    const backButton = () => {
      if (this.props.shouldShowBackButton) {
        return (
          <Button transparent onPress={this.props.homeCallback}>
            <Icon name="arrow-back" />
          </Button>
        );
      }
      return null;
    }
    return (
      <Container>
        <Header>
          <Left>
            {backButton()}
          </Left>
          <Body>
            <Text style={styles.headerText}>Email</Text>
          </Body>
          <Right />
        </Header>
        <Tabs ref={(tabView) => {this.tabView=tabView}}>
          <Tab heading="Signup">
            <EmailSignup loginCallback={this.props.loginCallback} loginScreenCallback={this.goToLoginScreen}/>
          </Tab>
          <Tab heading="Login">
            <EmailLogin loginCallback={this.props.loginCallback}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
