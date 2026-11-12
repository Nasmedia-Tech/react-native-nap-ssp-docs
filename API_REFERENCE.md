# API 레퍼런스 안내

플러그인 0.6.0의 전체 타입과 반환값은 [공식 플러그인 API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md) 및 설치 패키지의 TypeScript 선언을 기준으로 확인하세요. 이 저장소는 API 전체 사본을 유지하는 대신 필요한 절로 연결합니다.

## 초기화와 설정

| 필요한 작업 | API 및 주의 사항 |
| --- | --- |
| SDK 초기화 | [NapSspAd](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#napsspad): 광고 요청 전 initialize 완료를 기다림 |
| 동의 전달 | [setPrivacyConsent](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#setprivacyconsentconsent-promisevoid): 가능하면 initialize의 privacy로 시작 전에 전달 |
| 테스트 모드/기기 | [테스트 API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#settestmodeenabled-promiseboolean--settestdeviceidsids-promiseboolean): Android 전용, iOS 반환 false |
| iOS ATT | [requestTrackingAuthorization](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#requesttrackingauthorization-promisestring): GDPR/CCPA 동의와 별도 |

`mediaKey`는 발급받은 숫자 미디어 키를 문자열로 전달합니다. 현재 JS 구현은 mediaKey의 비어 있지 않음을 확인하며 모든 숫자 형식을 검사한다고 가정하지 마세요. `adUnitIds`에는 사용하는 숫자 광고 단위를 포함합니다. [설정 타입](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/src/types.ts) · [구현](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/src/NapSspAd.ts)

## 광고 형식

- [BannerAd](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#bannerad): size는 레이아웃 힌트, 서버 creative 크기와 별개.
- [NativeAd](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#nativead): 네이티브 asset 레이아웃. [커스텀 방법](NATIVE_ASSETS_GUIDE.md)
- [VideoAd](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#videoad): 화면 내 동영상 광고.
- [전면 광고](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#full-screen-ads): InterstitialAd / InterstitialVideoAd / RewardedAd의 load → show → cleanup 흐름.

## 이벤트와 실패

[이벤트](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#events)와 [AdError 코드표](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#aderror)를 확인하세요. 보상은 [RewardPayload](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#rewardpayload)를 전달하는 `rewarded`에 연결합니다. `onRewarded`는 legacy alias입니다.

`normalizeAdError`는 오류 값을 공통 형태로 변환하는 공개 helper입니다. 모든 네이티브 Promise가 자동으로 동일한 정규화 경로를 거친다고 가정하지 말고 각 API의 실패 처리를 구현하세요. [helper 정의](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/src/errors.ts)

실제 사용 순서는 [시작하기](GETTING_STARTED.md)와 [광고 생명주기](ADVANCED_USAGE.md)에 설명합니다. Android 전체 빌드, iOS Xcode 빌드 및 실광고 수신은 이번 문서 정비에서 검증하지 않았습니다.
