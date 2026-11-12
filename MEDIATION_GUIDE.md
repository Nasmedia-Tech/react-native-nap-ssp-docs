# 미디에이션 설정

미디에이션은 nap mx 네이티브 SDK가 서버 설정에 따라 여러 광고 네트워크의 수요를 순서대로 요청하는 기능입니다. React Native 앱은 광고 단위를 요청하며 네트워크별 waterfall을 직접 구현하지 않습니다.

## 세 가지 설정이 함께 필요합니다

1. 파트너 콘솔에서 앱과 광고 단위를 등록하고 해당 네트워크 수요를 설정합니다.
2. 앱 바이너리에 해당 네트워크 어댑터와 SDK를 포함합니다.
3. 네트워크가 요구하는 App ID, publisher code, 저장소, 권한 및 동의 설정을 갖춥니다.

JS `mediations`를 지정하는 것만으로 네이티브 의존성이 설치되거나 서버 waterfall에 네트워크가 추가되지는 않습니다.

## 플랫폼별 선택 설치

| 네트워크 | Android `napSsp.mediations` 값 | iOS subspec 이름 |
| --- | --- | --- |
| Google Ad Manager | `admanager` | `GAM` |
| Kakao AdFit | `adfit` | `AdFit` |
| Pangle | `pangle` | `Pangle` |
| AppLovin | `applovin` | `AppLovin` |
| Unity Ads | `unity` | `UnityAds` |
| Naver Ad Manager | `naveradmanager` | `NAM` |
| Teads | `teads` | `Teads` |

iOS subspec 이름은 [Podfile의 단일 로컬 Pod 선언](IOS_SETUP.md#cocoapods-및-어댑터)의 `:subspecs` 배열에 넣습니다. path 없는 개별 Pod 선언을 autolinking과 섞지 마세요.

Android 속성 미지정과 iOS 추가 subspec 미지정은 Core만 설치합니다. Android의 `all`은 모든 네트워크 설정을 준비한 경우 사용하세요. [Android 설치 절](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-1-choose-mediation-adapters) · [iOS 설치 절](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-1-cocoapods)

## 초기화 시 키 전달

통상 media-conf 서버가 네트워크 키를 내려줍니다. JS 설정은 서버에 없는 키를 보완하며 서버 값이 우선합니다. 다음은 설정 일부이며 실제 `mediaKey`, 전체 `adUnitIds`, privacy 결정과 함께 초기화에 전달합니다.

```ts
const mediations = {
  pangle: {appId: 'YOUR_PANGLE_APP_ID'},
  appLovin: {sdkKey: 'YOUR_APPLOVIN_SDK_KEY'},
  unityAds: {appId: 'YOUR_UNITY_APP_ID'}, // iOS
  naverAdManager: {publisherCd: 'YOUR_PUBLISHER_CD'}, // iOS
};
```

Android Unity는 서버 설정으로 지연 초기화하고 Android NAM publisher code는 AAR에 포함됩니다. Google App ID는 Android Manifest 또는 iOS Info.plist에도 설정해야 합니다. [초기화와 키 예제](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#5-initialize) · [설정 타입 원문](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/src/types.ts)

## 네트워크를 추가할 때 확인할 조건

Android는 어댑터별 Maven 저장소와 minSdk를 확인하고 compileSdk 35 이상을 유지하세요. Kotlin은 플러그인 기본값 2.1.21과 호스트 설정의 호환성을 확인해야 하며 플러그인 0.6.0의 React Native 네이티브 빌드는 미검증입니다. AppLovin은 minSdk 24, GAM/NAM은 23이 필요합니다. GAM의 Android Google Mobile Ads 상한은 25.2.0입니다. iOS는 iOS 14 이상을 기준으로 하되 Teads는 Xcode 26 이상을 사용합니다. [Android 조건](ANDROID_SETUP.md) · [iOS 조건](IOS_SETUP.md)

동의 값은 SDK 시작 전에 확정해야 합니다. 일부 네트워크는 시작 시점에만 값을 읽습니다. [개인정보 설정](PRIVACY_GUIDE.md)

## 특정 네트워크만 노출되지 않을 때

설치한 어댑터 → 키 및 저장소 → 서버 waterfall → 해당 네트워크 응답 순으로 확인하세요. 전체 요청이 성공해도 특정 네트워크가 항상 선택되는 것은 아닙니다. `nap_ssp_no_ads`는 단독으로 설치 오류를 증명하지 않습니다. [진단 순서](TROUBLESHOOTING.md#런타임-진단)

버전 기준은 플러그인 0.6.0입니다. 모든 어댑터 조합의 네이티브 빌드 및 실광고 fill은 이번 문서 정비에서 검증하지 않았습니다.
