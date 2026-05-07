# Advanced Usage & Best Practices

이 문서는 `react-native-nap-ssp`를 사용하여 광고 수익을 극대화하고 앱 성능을 최적화하기 위한 고급 활용 방법을 안내합니다.

---

## 1. 광고 미리 불러오기 (Pre-loading)

사용자가 광고를 보게 될 시점보다 조금 일찍 광고를 로드하면 대기 시간을 줄이고 사용자 경험을 향상시킬 수 있습니다.

```tsx
const interstitial = new InterstitialAd('INTER_ID');

// 전면 광고가 필요한 화면에 진입할 때 미리 load()
useEffect(() => {
  interstitial.load();
}, []);

const handleFinishStage = async () => {
  // 실제 표시 시점에는 이미 로드되어 있어 즉시 표시됨
  await interstitial.show();
};
```

---

## 2. 광고 상태 관리

배너 광고나 네이티브 광고의 경우, 앱이 백그라운드로 갈 때 로딩을 멈추거나 화면에서 사라질 때 리소스를 해제하는 것이 좋습니다.

- **배너 광고**: 화면이 언마운트될 때 컴포넌트가 자동으로 정리되지만, 복잡한 네비게이션 환경에서는 조건부 렌더링을 통해 명시적으로 관리하는 것이 좋습니다.
- **전면 광고**: `closed` 이벤트를 수신한 후 다음 광고를 위해 미리 다시 `load()` 해두는 패턴을 추천합니다.

---

## 3. 에러 핸들링 전략

네트워크 상황이나 광고 물량 부족(No Fill)으로 광고 로드가 실패할 수 있습니다.

```tsx
<BannerAd
  onAdFailedToLoad={(error) => {
    console.warn(error.message);
    // 팁: 실패 시 즉시 재시도하기보다, 지수 백오프(Exponential Backoff)를 사용하거나 
    // 일정 시간(예: 30초) 후에 재시도하는 것을 권장합니다.
  }}
/>
```

---

## 4. 메모리 관리

특히 동영상 광고나 이미지 자산이 많은 네이티브 광고를 자주 사용하는 경우, 더 이상 필요하지 않은 광고 객체는 리스너를 제거하고 참조를 해제하여 메모리 누수를 방지하십시오.

---

## 5. 보상형 광고 S2S 파라미터

보상형 광고를 서버-to-서버(S2S) 방식으로 검증할 때, 사용자 식별값을 SDK에 함께 전달할 수 있습니다.

```tsx
const rewarded = new RewardedAd('보상형_광고_ID', {
  // S2S 콜백 시 서버로 전달될 사용자 식별 파라미터
  userId: 'user_unique_id',     // 유저 식별자
  name: '홍길동',               // (선택) 유저 이름
  phone: '010-0000-0000',       // (선택) 유저 연락처
});
```

> S2S 보상 방식에서는 클라이언트의 `onRewarded` 콜백보다 서버 콜백이 더 신뢰성이 높습니다. 클라이언트 콜백은 보조 수단으로만 활용하세요.

---

## 6. 전면 광고 팝업 옵션 (InterstitialAd)

`InterstitialAd`를 팝업 배너 형식으로 사용할 때 종료 버튼 및 카운트다운을 커스터마이징할 수 있습니다.

```tsx
const interstitial = new InterstitialAd('전면_광고_ID', {
  // 종료 버튼 텍스트 (기본값: '광고종료')
  closeButtonTitle: '닫기',
  // 자동 종료 카운트다운 (초, 기본값: 5)
  countdownSeconds: 5,
});
```

---

## 7. 디버그 vs 릴리즈 빌드 동작 차이

v0.1.5부터 빌드 타입에 따라 광고 실패 시 동작이 달라집니다. 이를 인지하고 개발/검증 계획을 세우는 것이 중요합니다.

### DEBUG 빌드 (개발/시뮬레이터 환경)

SDK 광고 로드 실패 또는 응답 없음 시 **플레이스홀더 성공 이벤트**를 발행합니다.

- `onAdLoaded` / `onAdImpression` 이 발행됨 (실제 광고 소재 없음)
- 12초 이내 SDK 응답이 없으면 타임아웃 폴백으로 플레이스홀더 이벤트 발행
- 전면/보상형 광고는 `show()` 호출 시 플레이스홀더 경로로 즉시 성공 처리
- iOS 전면 광고는 `show()` 직후 `onAdOpened` / `onAdImpression` 즉시 발행

이벤트 payload의 `source` 필드로 실제 광고와 플레이스홀더를 구분할 수 있습니다.

```tsx
<BannerAd
  onAdLoaded={(e) => {
    if (e?.source?.startsWith('debug') || e?.source === 'placeholder') {
      console.log('플레이스홀더 — 실제 광고 아님');
    } else {
      console.log('실제 광고 로드 성공');
    }
  }}
/>
```

### RELEASE 빌드 (프로덕션 환경)

- SDK 광고 로드 실패 시 `onAdFailedToLoad` 이벤트 발행 (실제 에러 코드/메시지 포함)
- 전면/보상형 광고는 SDK를 통해 실제 광고를 표시
- 플레이스홀더 폴백 없음

> **검증 원칙**: RN 이벤트 연결은 디버그 빌드로 확인하고, 실제 광고 소재 노출 및 수익 집계는 반드시 **RELEASE 빌드 + 실기기**로 최종 확인하세요.
