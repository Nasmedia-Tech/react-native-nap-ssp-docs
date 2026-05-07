/**
 * 배너 광고 예제
 * BannerAd 컴포넌트를 사용해 화면 하단에 배너를 고정합니다.
 */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BannerAd } from 'react-native-nap-ssp';
import { AD_UNITS } from './App';

export default function BannerExample() {
  const [status, setStatus] = useState('대기 중...');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.status}>{status}</Text>
      </View>

      {/* 화면 하단에 배너 고정 */}
      <BannerAd
        adUnitId={AD_UNITS.banner}
        size="BANNER_320x50"
        style={styles.banner}
        onAdLoaded={() => setStatus('광고 로드 성공')}
        onAdFailedToLoad={(e) => setStatus(`로드 실패: ${e.message}`)}
        onAdClicked={() => console.log('배너 클릭')}
        onAdImpression={() => console.log('배너 노출')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { flex: 1, justifyContent: 'center', alignItems: 'center' },
  status:    { fontSize: 16, color: '#333' },
  banner:    { width: '100%', height: 50, alignSelf: 'center' },
});
