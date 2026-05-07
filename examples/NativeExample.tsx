/**
 * 네이티브 광고 예제
 * NativeAd 컴포넌트를 피드 형태로 삽입합니다.
 */
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeAd } from 'react-native-nap-ssp';
import { AD_UNITS } from './App';

export default function NativeExample() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 피드 아이템 */}
        <View style={styles.feedItem}><Text>콘텐츠 1</Text></View>
        <View style={styles.feedItem}><Text>콘텐츠 2</Text></View>

        {/* 네이티브 광고 삽입 */}
        <NativeAd
          adUnitId={AD_UNITS.native}
          style={styles.nativeAd}
          onAdLoaded={() => setLoaded(true)}
          onAdFailedToLoad={(e) => console.warn('네이티브 광고 실패', e)}
        />

        <View style={styles.feedItem}><Text>콘텐츠 3</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  feedItem:  { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  nativeAd:  { width: '100%', height: 250 },
});
