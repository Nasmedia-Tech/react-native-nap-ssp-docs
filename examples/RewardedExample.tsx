/**
 * 보상형 광고 예제
 * 광고 시청 완료 시 사용자에게 보상을 지급합니다.
 * 보안이 중요한 서비스에서는 S2S 콜백을 사용하세요.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RewardedAd } from 'react-native-nap-ssp';
import { AD_UNITS } from './App';

export default function RewardedExample() {
  const adRef = useRef<RewardedAd | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    // S2S 콜백 사용 시 customParams에 유저 식별값 전달
    const ad = new RewardedAd(AD_UNITS.rewarded, {
      customParams: {
        useid: 'user_unique_id',  // 유저 식별자
      },
    });
    adRef.current = ad;

    ad.addAdEventListener('loaded', () => setIsLoaded(true));
    ad.addAdEventListener('loadFailed', (e) => console.warn('로드 실패', e));
    ad.addAdEventListener('rewarded', () => {
      // S2S 미사용 시 클라이언트에서 직접 보상 처리
      setCoins((prev) => prev + 100);
      Alert.alert('보상 지급!', '코인 100개가 지급되었습니다.');
    });
    ad.addAdEventListener('closed', () => {
      setIsLoaded(false);
      ad.load(); // 다음 광고 미리 로드
    });

    ad.load();
    return () => { adRef.current = null; };
  }, []);

  const handleShowAd = useCallback(async () => {
    if (!adRef.current || !isLoaded) return;
    try {
      await adRef.current.show();
    } catch (e) {
      console.warn('보상형 광고 표시 실패', e);
    }
  }, [isLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.coins}>보유 코인: {coins}</Text>
        <TouchableOpacity
          style={[styles.button, !isLoaded && styles.buttonDisabled]}
          onPress={handleShowAd}
          disabled={!isLoaded}>
          <Text style={styles.buttonText}>
            {isLoaded ? '광고 시청하고 +100 코인 받기' : '광고 로드 중...'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  content:        { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 },
  coins:          { fontSize: 24, fontWeight: 'bold' },
  button:         { backgroundColor: '#FF9500', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 32 },
  buttonDisabled: { backgroundColor: '#aaa' },
  buttonText:     { color: '#fff', fontSize: 16, fontWeight: '600' },
});
