/**
 * Examen App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View} from 'react-native';
import Helper from './../shared/Helper.js';
export default class RecordItem extends Component<Props>  {
  render(){
    const {weight, date} = this.props;
    const h = new Helper();
    return (
      <View style={styles.recordContainer}>
        <Text style={styles.recordWeightText}>{weight}</Text>
        <Text style={styles.recordDateText}>{h.formatDate(date)}</Text>
      </View>
    )
  }
}

  const styles = StyleSheet.create({
  recordContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    paddingLeft: 20,
    paddingRight: 20
  },
  recordWeightText: {
    fontSize: 21,
    color: '#f76d1d'
  },
  recordDateText: {
    fontSize: 21,
    color: 'gray'
  }

  });
