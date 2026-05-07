/**
 * 전면 광고 예제
 * 스테이지 클리어 등 자연스러운 전환 시점에 전면 광고를 표시합니다.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { InterstitialAd } from 'react-native-nap-ssp';
import { AD_UNITS } from './App';

export default function InterstitialExample() {
  const adRef = useRef<InterstitialAd | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState('광고 로드 중...');

  useEffect(() => {
    const ad = new InterstitialAd(AD_UNITS.interstitial);
    adRef.current = ad;

    ad.addAdEventListener('loaded', () => {
      setIsLoaded(true);
      setStatus('광고 준비 완료');
    });
    ad.addAdEventListener('loadFailed', (e) => {
      setStatus(`로드 실패: ${e.message}`);
    });
    ad.addAdEventListener('closed', () => {
      setIsLoaded(false);
      setStatus('다음 광고 로드 중...');
      // 닫힌 후 다음 광고 미리 로드
      ad.load();
    });

    ad.load();
    return () => { adRef.current = null; };
  }, []);

  const handleShowAd = useCallback(async () => {
    if (!adRef.current || !isLoaded) {
      Alert.alert('광고 준비 중', '잠시 후 다시 시도하세요.');
      return;
    }
    try {
      await adRef.current.show();
    } catch (e) {
      console.warn('전면 광고 표시 실패', e);
    }
  }, [isLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.status}>{status}</Text>
        <TouchableOpacity
          style={[styles.button, !isLoaded && styles.buttonDisabled]}
          onPress={handleShowAd}
          disabled={!isLoaded}>
          <Text style={styles.buttonText}>전면 광고 표시</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  content:        { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  status:         { fontSize: 16, color: '#555' },
  button:         { backgroundColor: '#007AFF', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 32 },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonText:     { color: '#fff', fontSize: 16, fontWeight: '600' },
});
