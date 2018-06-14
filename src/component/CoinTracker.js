import React, { Component } from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import {getCoinsData} from '../networking/getCoinsData';
import Spinner from 'react-native-loading-spinner-overlay';
import CoinCard from './CoinCard';

export default class CoinTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      coinData: [],
    }
  }

  getData = () => {
    getCoinsData()
      .then(coinData => {
        this.setState({
          isLoading: false,
          coinData: coinData,
        });
      })
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={{color: 'black'}}
            animation="fade"
          />
        </View>
      );
    }
    return (
      <View style={{flex: 1, backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
        <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 10}}>Coin Tracker</Text>
        <FlatList
          data={this.state.coinData}
          renderItem={({item, index}) => {
            return (
              <CoinCard
                coin_name={item.name}
                symbol={item.symbol}
                price_usd={item.price_usd}
                percent_change_24h={item.percent_change_24h}
                percent_change_7d={item.percent_change_7d}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}