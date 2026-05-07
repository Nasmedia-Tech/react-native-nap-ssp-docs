/**
 * react-native-nap-ssp — 전체 연동 예제
 * 앱 시작 시 SDK를 초기화하고 각 광고 유형별 화면으로 이동합니다.
 */
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NapSspAd } from 'react-native-nap-ssp';

// ⚠️ 아래 키를 나스미디어 파트너 운영팀에서 발급받은 값으로 교체하세요
const MEDIA_KEY = 'YOUR_MEDIA_KEY';

const AD_UNITS = {
  banner:            'YOUR_BANNER_AD_UNIT_ID',
  native:            'YOUR_NATIVE_AD_UNIT_ID',
  video:             'YOUR_VIDEO_AD_UNIT_ID',
  interstitial:      'YOUR_INTERSTITIAL_AD_UNIT_ID',
  interstitialVideo: 'YOUR_INTERSTITIAL_VIDEO_AD_UNIT_ID',
  rewarded:          'YOUR_REWARDED_AD_UNIT_ID',
};

export default function App() {
  useEffect(() => {
    NapSspAd.initialize({
      mediaKey: MEDIA_KEY,
      adUnitIds: Object.values(AD_UNITS),
      logLevel: __DEV__ ? 'debug' : 'warn',
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>react-native-nap-ssp 예제</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <NavButton label="배너 광고 (Banner)" />
        <NavButton label="네이티브 광고 (Native)" />
        <NavButton label="동영상 광고 (Video)" />
        <NavButton label="전면 광고 (Interstitial)" />
        <NavButton label="전면 동영상 (Interstitial Video)" />
        <NavButton label="보상형 광고 (Rewarded)" />
      </ScrollView>
    </SafeAreaView>
  );
}

function NavButton({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title:     { fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 20 },
  content:   { padding: 16, gap: 12 },
  button:    { backgroundColor: '#007AFF', borderRadius: 10, padding: 16 },
  buttonText:{ color: '#fff', fontSize: 16, textAlign: 'center' },
});

export { AD_UNITS };
