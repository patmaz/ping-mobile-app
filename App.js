/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import JSONTree from 'react-native-json-tree';

const PING_URL = 'https://api.codebooyah.com/ping';

const App = () => {
  const [pingData, setPingData] = useState();

  const doPing = async () => {
    const ping = await axios.get(PING_URL);
    setPingData(ping.data);
  };

  useEffect(() => {
    doPing();
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          {pingData ? (
            <View style={styles.body}>
              <JSONTree data={pingData} shouldExpandNode={() => true} />
            </View>
          ) : (
            <View style={styles.body}>
              <Text>loading...</Text>
            </View>
          )}
          <Button onPress={doPing} title="Refresh" />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  body: {
    height: 500
  },
});

export default App;
