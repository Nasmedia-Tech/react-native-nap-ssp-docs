# 광고 생명주기와 고급 사용

이 문서는 초기화 이후 화면 전환, 재요청, 보상 처리 시 지켜야 할 순서를 다룹니다. 광고 뷰 마운트 전 초기화는 [시작하기](GETTING_STARTED.md#3-초기화-완료-후-광고-마운트)에서 확인하세요.

## 인라인 광고와 reload

`BannerAd`, `NativeAd`, `VideoAd`는 네이티브 광고 뷰입니다. ref의 `AdViewHandle.reload()`로 새 광고를 요청할 수 있습니다. 서버 creative 크기와 부모 레이아웃을 맞추고 화면 재렌더마다 불필요하게 뷰를 재생성하지 마세요. [인라인 API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#inline-ad-views)

## 전면 광고 순서

`InterstitialAd`, `InterstitialVideoAd`, `RewardedAd`는 인스턴스를 생성하고 listener를 먼저 등록한 뒤 `load()`를 호출합니다. load 성공 후 사용자 흐름에 맞는 시점에 `show()`를 호출하세요. show 버튼은 로드 완료 상태에서 활성화하며 실패 Promise도 처리합니다.

```ts
const ad = new InterstitialAd(adUnitId);
const unsubscribe = ad.addAdEventListener('loadFailed', error => {
  console.warn(error.code, error.message);
});
try {
  await ad.load();
  // 여기서 앱의 준비 상태를 갱신하고, 이후 적절한 사용자 동작에서 show()
} catch (error) {
  // 실패 상태를 표시하고 앱 정책에 따라 재시도
}
// 화면/소유자가 해제될 때
unsubscribe();
ad.destroy();
```

위 코드는 생성/해제 순서 예시입니다. 실제 화면에서는 광고 인스턴스를 ref 등으로 유지하고 화면 cleanup에 해제 코드를 둡니다. `destroy()` 후 인스턴스를 재사용하지 마세요. [전면 광고 API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#full-screen-ads)

## 보상과 이벤트

보상은 `rewarded`와 `RewardPayload`를 기준으로 지급합니다. 종료 이벤트는 지급 근거가 아닙니다. listener 해제를 누락해 중복 콜백이 생기지 않도록 하고 앱 거래 단위로 중복 보상을 방지하세요. iOS에서 `skipped`가 전달되지 않는 제한도 고려합니다. [이벤트](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#events) · [RewardPayload](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#rewardpayload)

## 오류와 플랫폼 차이

문자열 `AdError.code`를 사용하고 숫자 native 오류를 고정 분기하지 마세요. Android 테스트 모드와 iOS의 네트워크별 테스트 설정은 다릅니다. 개인정보 변경은 일부 네트워크에서 다음 시작까지 반영되지 않을 수 있습니다. [오류 코드](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#aderror) · [개인정보](PRIVACY_GUIDE.md)

전체 실행 흐름은 [ExampleHostApp](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/example/ExampleHostApp)을 참고하세요. 이번 문서 정비에서 실제 기기 생명주기나 광고 fill은 검증하지 않았습니다.
