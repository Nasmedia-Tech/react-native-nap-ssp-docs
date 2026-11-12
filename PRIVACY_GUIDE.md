# 개인정보 신호 설정

앱의 동의 화면/CMP가 결정한 값을 네이티브 SDK에 전달하는 방법입니다. 플러그인이 동의 화면을 대신 표시하거나 앱의 적용 법규를 판단하지는 않습니다.

## 초기화 전에 결정할 값

`initialize({privacy})`를 권장합니다. AppLovin, Unity Ads, Pangle 등은 시작 시점에 동의 값을 읽으므로 광고 요청 직전에 값을 바꾸는 것만으로 이미 시작한 네트워크에 반영되지 않을 수 있습니다.

```ts
// 앱의 CMP/정책에서 결정한 실제 값을 전달하는 예
const privacy = {
  childDirected: false,
  gdprConsent: true,
  ccpaDoNotSell: false,
};
await NapSspAd.initialize({mediaKey, adUnitIds, privacy});
```

위 boolean은 기본값이 아닙니다. 실제 판단 없이 복사하지 마세요. `childDirected`는 아동 대상 여부, `gdprConsent`는 맞춤 광고 동의, `ccpaDoNotSell`은 판매/공유 거부 신호입니다. `usPrivacy`는 Android용 US Privacy 문자열, `underAgeOfConsent`는 iOS용 신호입니다.

## false와 미지정

모든 필드는 세 상태를 가집니다. `true`/`false`는 명시적 값이며 생략은 SDK 기본값 또는 CMP의 기존 값을 유지합니다. Unity에서 `childDirected: true`를 설정한 뒤 되돌리려면 명시적 `false`가 필요합니다. 아동 대상 inventory에서는 AppLovin이 waterfall에서 제외됩니다.

후속 변경은 `await NapSspAd.setPrivacyConsent(...)`로 전달할 수 있으나 네트워크 시작 시점 제한을 고려하세요. 기존 `setCoppa()`는 deprecated alias입니다.

## iOS ATT와 별개로 처리

ATT 추적 권한과 GDPR/CCPA 신호는 별개입니다. 앱에서 필요할 때 ATT를 광고 요청 전에 처리하고 Info.plist 사용 목적을 설정합니다. [ATT 설정 절](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-3-app-tracking-transparency)

전체 필드, 네트워크 제한 및 API: [setPrivacyConsent](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#setprivacyconsentconsent-promisevoid). 테스트 기기 GAID는 민감한 식별자이므로 공유 로그에 넣지 마세요.
