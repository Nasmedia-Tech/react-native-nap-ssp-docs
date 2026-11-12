# iOS 설정 (플러그인 0.6.0)

React Native 브리지는 CocoaPods로 설치합니다. 네이티브 nap mx SDK의 SPM 지원과 React Native 플러그인 설치 지원은 별개입니다. [SPM 범위](SPM_GUIDE.md)

## 요구 사항

React Native 0.76 이상, iOS deployment target 14.0 이상을 기준으로 합니다. 플러그인은 iOS Mediation 2.6.1 이상 3.0 미만과 Core 1.5.1 이상을 사용합니다. 기본 Xcode 요구 사항은 16 이상이며 Teads 어댑터는 Xcode 26 이상이 필요합니다.

## CocoaPods 및 어댑터

```bash
npm install react-native-nap-ssp
```

기존 앱 target에서 `use_native_modules!` 호출 전에 기본 Pod와 선택 subspec을 동일한 로컬 경로로 한 번 선언하세요. path 없이 별도 `NapSspPlugin/GAM` 등을 선언하면 autolinking의 로컬 Pod와 소스가 충돌할 수 있습니다.

```ruby
# ios/Podfile의 기존 앱 target 내부, use_native_modules! 앞
pod 'NapSspPlugin',
    :path => '../node_modules/react-native-nap-ssp',
    :subspecs => ['GAM', 'AdFit']
config = use_native_modules!
# 이어서 기존 use_react_native! 등 앱 설정 유지
```

```bash
cd ios
pod install --repo-update
```

설치 경로는 프로젝트 구조에 맞게 조정하세요. 기존 `use_native_modules!`를 중복 호출하지 않습니다. 추가 subspec은 `Pangle`, `AppLovin`, `UnityAds`, `NAM`, `Teads`입니다. CocoaPods AdFit은 1.1.x 어댑터를 사용합니다. AdFit 2.x의 SPM 및 iOS 15 요구 사항을 이 CocoaPods 경로에 그대로 적용하지 마세요. 기존 Podfile의 React Native 설정과 target을 보존하고 [공식 플러그인 CocoaPods 설정](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-1-cocoapods)을 대조하세요.

## ATT 요청 순서

앱이 추적 권한을 요청하려면 `Info.plist`에 실제 앱 용도에 맞는 설명을 추가합니다.

```xml
<key>NSUserTrackingUsageDescription</key>
<string>맞춤형 광고 제공을 위해 기기 식별자를 사용합니다.</string>
```

앱이 ATT 흐름을 담당하며 SDK가 자동으로 팝업을 띄우지 않습니다. 필요한 경우 광고 요청 전에 아래 호출 결과를 처리하세요.

```ts
const status = await NapSspAd.requestTrackingAuthorization();
// authorized | denied | restricted | notDetermined | unavailable
```

ATT 결과는 GDPR/CCPA 동의와 별개입니다. 앱의 동의 흐름에서 결정한 privacy 값을 초기화에 전달하세요. [ATT 설정](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-3-app-tracking-transparency) · [개인정보 신호](PRIVACY_GUIDE.md)

## 네트워크 키와 네이티브 레이아웃

Google Ad Manager 사용 시 `Info.plist`의 `GADApplicationIdentifier`에 발급받은 Google App ID가 필요합니다. 키가 있을 때 플러그인이 초기화 중 Google Mobile Ads 시작을 호출합니다. [GAM 설정](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-4-google-ad-manager)

Naver Ad Manager의 iOS publisher code 등 서버에서 내려오지 않는 키는 초기화 설정으로 전달합니다. 설치한 subspec과 서버 waterfall도 일치해야 합니다. [키 설정 구분](MEDIATION_GUIDE.md)

네이티브 광고 디자인은 앱 번들의 `AMMNativeAdView.xib`로 변경할 수 있습니다. [필수 outlet 및 fallback](NATIVE_ASSETS_GUIDE.md)

## 확인 범위

Pods 변경 후 앱을 다시 빌드하세요. JS 번들 새로고침으로 네이티브 어댑터가 추가되지는 않습니다. 이번 문서 정비에서 macOS/Xcode 빌드, ATT 팝업 및 실광고 수신은 검증하지 않았습니다.
