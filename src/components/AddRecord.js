/**
 * AddRecord Component
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';



export default class AddRecord extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      userText:""
    }
  }

  validateText(userText){
      const regexValidation = /^(\d)+\.*\d{0,2}$/;
      regexValidation.test(userText) ? this.setState({userText}) : null;

      //Add Validation here, you can investigate hot to test a Regular Expression on JavaScript.
    }

  addNewRecord(){
    weight = parseFloat(this.state.userText);
    this.props.addNewRecordToState(weight);
    this.setState({userText: ""});
  }

  render() {
    let {userText} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <TextInput
              style={styles.inputText}
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder={'Peso'}
              onChangeText = {(text) => text == "" ?  null : this.validateText(text) }
              value ={userText}
              />
          <TextInput
              style={styles.inputText}
              placeholder={'Ene. 02/2018'}
              editable={false}/>
        </View>
        <View style={styles.actionContainer}>
          <TouchableHighlight style={styles.addButton}
            onPress={this.addNewRecord.bind(this)}
            >
            <Text style={styles.addButtonText}>AGREGAR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  inputsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  inputText: {
    fontSize: 19,
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  addButton:{
    width: 298,
    height: 43,
    borderWidth: 2,
    borderColor: '#f76d1d',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  addButtonText: {
    fontSize: 17,
    color: '#f76d1d',
  }

});
