/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import gaussian from 'gaussian';
import {LineGraph} from './src/LineGraph';
import {useSharedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

interface Point {
  value: number;
  date: Date;
}

function weightedRandom(mean: number, variance: number): number {
  var distribution = gaussian(mean, variance);
  // Take a random sample using inverse transform sampling method.
  return distribution.ppf(Math.random());
}

export function generateRandomGraphData(length: number): any[] {
  return Array<number>(length)
    .fill(0)
    .map((_, index) => ({
      date: new Date(index),
      value: weightedRandom(10, Math.pow(index + 1, 2)),
    }));
}

const App = () => {
  const animatedText = useSharedValue('Hello');
  const points = generateRandomGraphData(1000);

  const onPointSelect = (point: Point) => {
    // alert(point.value);
    // console.log(444, point);
    animatedText.value = `${point.value}`;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <ReText text={animatedText} />

        <LineGraph
          onPointSelected={onPointSelect}
          style={styles.graph}
          animated={true}
          color="#3B9AD0"
          points={points}
          enablePanGesture={true}
          // enableFadeInMask={true}
          // onGestureStart={() => console.log('helllo')}
          selectionDotShadowColor={'#000000'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    height: 300,
  },
  graph: {
    height: 300,
  },
});

export default gestureHandlerRootHOC(App);
