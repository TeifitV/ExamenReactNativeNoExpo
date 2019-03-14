/**
 * Examen App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import CurrentWeight from './components/CurrentWeight';
import AddRecord from './components/AddRecord';
import RecordItem from './components/RecordItem.js';


export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      records: [
        { id: 0, weight: 95.3, date: 1518449400000 },
        { id: 1, weight: 96.1, date: 1518362400000 },
        { id: 2, weight: 98, date: 1514995200000 },
        { id: 3, weight: 94.5, date: 1512925200000 },
        { id: 4, weight: 94, date: 1512147600000 },
        { id: 5, weight: 93.5, date: 1512147600000 },
        { id: 6, weight: 87.5, date: 1508770800000 }
      ],
      orderByDate: true,
      orderDateAsc: false,
      orderWeightAsc: false,
    }
  }

      sortByDate(array, ascending = false){
        const arrayCopy = [...array];

        //sorting by ascending order puts more recent records last and the first ones last
        if(ascending){

          arrayCopy.sort(function(a,b){
            return a.date - b.date;
            });
        }
        else{

          arrayCopy.sort(function(a,b){
            return b.date - a.date;
            });
        }
        return arrayCopy;
      }

      sortByWeight(array, ascending = false){
        const arrayCopy = [...array];
        if(ascending){

          arrayCopy.sort(function(a,b){
            return a.weight - b.weight;
            });
        }
        else{

          arrayCopy.sort(function(a,b){
            return b.weight - a.weight;
            });
        }
        return arrayCopy;
      }


      renderRecordItems(renderByDate = true, ascending = false){

        records = renderByDate ? this.sortByDate(this.state.records,ascending) : this.sortByWeight(this.state.records,ascending);

        return records.map(record => {
            return (
              <RecordItem
                key={record.id}
                weight={record.weight}
                date={record.date} />
              )
            }

          )
      }

      componentDidMount(){

        let  records = this.sortByDate(this.state.records);
        this.setState({records});
      }


  addNewRecordToState(weight){
    const records = [...this.state.records];
    const currentDate = new Date();
    records.push({id:records.length, weight: weight, date:currentDate.getTime() });
    this.setState({records});
  }

    orderRecordsByDate(){
      let {orderByDate,orderDateAsc,orderWeightAsc} = this.state;
      if(orderByDate){
        orderDateAsc = !orderDateAsc;
      }
      else{
        orderByDate = !orderByDate;
        orderDateAsc = false;
        orderWeightAsc = false;
      }
      this.setState({orderByDate,orderDateAsc,orderWeightAsc});
    }


      orderRecordsByWeight(){
        let {orderByDate,orderDateAsc,orderWeightAsc} = this.state;
        if(!orderByDate){
          orderWeightAsc = !orderWeightAsc;
        }
        else{
          orderByDate = !orderByDate;
          orderDateAsc = false;
          orderWeightAsc = false;
        }
        this.setState({orderByDate,orderDateAsc,orderWeightAsc});
      }

  render() {
    let  records = this.sortByDate(this.state.records);
    const currentWeight = records[0].weight;
    const {orderByDate,orderDateAsc, orderWeightAsc} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Registros de Peso</Text>
        </View>
        <View style={styles.currentWeight}>


          <CurrentWeight currentWeight={currentWeight}/>



        </View>
        <View style={styles.newRecord}>
          <AddRecord addNewRecordToState = {this.addNewRecordToState.bind(this)}/>
        </View>
        <View style={styles.records}>
          <View style={styles.recordsBar}>
            <TouchableHighlight>
              <Text style={styles.touchableBarText}
              onPress={this.orderRecordsByWeight.bind(this)}
              >PESO</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.touchableBarText}

              onPress={this.orderRecordsByDate.bind(this)}>FECHA</Text>
          </TouchableHighlight>
          </View>

          <ScrollView style={styles.recordsContent}>

          {orderByDate ? this.renderRecordItems(orderByDate,orderDateAsc):this.renderRecordItems(orderByDate,orderWeightAsc)}


          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#000000',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: '#ffffff',
    fontSize: 21
  },
  currentWeight: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 20
  },
  newRecord: {
    height: 142,
    padding: 20
  },
  records: {
    flex: 1
  },
  recordsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 30,
    backgroundColor: '#f76d1d'
  },
  touchableBarText: {
    fontSize: 15,
    color: 'white'
  },
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
