# 자주 묻는 질문

설치 오류나 런타임 오류의 단계별 해결은 [문제 해결](TROUBLESHOOTING.md)에서 찾으세요. 이 문서는 도입 및 운영 시 자주 하는 선택을 설명합니다. 기준 버전은 플러그인 0.6.0입니다.

## 어떤 React Native 버전을 사용해야 하나요?

0.76 이상을 기준으로 합니다. Android compileSdk 35 이상을 확인하고 Kotlin은 플러그인 기본값 2.1.21과 실제 호스트 설정의 호환성을 별도로 확인하세요. GAM+AdFit 설정의 Android 라이브러리 CI 빌드는 성공했지만, 이 결과가 일괄 최소 Kotlin 버전의 검증을 뜻하지 않습니다. iOS 최소 버전은 14입니다. [버전표](VERSION_MATRIX.md)

## 어댑터를 전부 설치해야 하나요?

서버 waterfall에서 사용하는 네트워크만 설치하세요. 미지정 시 Core만 포함됩니다. 설치와 서버 수요 설정은 별도이며 JS 설정 객체는 설치를 대신하지 않습니다. [선택 설치와 키](MEDIATION_GUIDE.md#플랫폼별-선택-설치)

## 초기화 성공인데 왜 광고가 안 나오나요?

초기화 성공은 요청 준비 완료를 뜻하며 광고 재고를 보장하지 않습니다. 형식에 맞는 광고 ID, 서버 설정, 동의, 네트워크 및 실패 코드를 확인하세요. [런타임 진단](TROUBLESHOOTING.md#런타임-진단)

## 디버그에서 가짜 광고가 표시되나요?

0.5.0부터 디버그와 릴리스 모두 실제 SDK 경로를 사용합니다. 실패도 실패로 전달합니다. 실광고 ID 없이 성공 이벤트를 기대하면 안 됩니다. [마이그레이션](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/MIGRATION.md)

## 테스트 모드는 양쪽 플랫폼에서 같나요?

아닙니다. `setTestMode`와 `setTestDeviceIds`는 Android용이며 iOS에서는 지원 여부를 나타내는 `false`를 반환합니다. iOS 테스트 기기는 네트워크별 콘솔에서 등록합니다. 테스트 광고도 네트워크 설정과 수요 조건을 확인해야 합니다. [테스트 API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#settestmodeenabled-promiseboolean--settestdeviceidsids-promiseboolean)

## Expo Go와 SPM을 쓸 수 있나요?

Expo Go에는 모듈이 없으므로 커스텀 네이티브 빌드가 필요합니다. iOS React Native 브리지는 CocoaPods를 사용하며 독립 SPM 설치를 지원하지 않습니다. [Expo 안내](EXPO_GUIDE.md) · [SPM 범위](SPM_GUIDE.md)

## New Architecture를 지원하나요?

현재 브리지는 기존 NativeModule/ViewManager 구조를 사용합니다. New Architecture 환경의 호환 계층 동작과 각 광고 형식은 실제 대상 앱에서 확인해야 합니다. 네이티브 TurboModule/Fabric 전용 구현이나 모든 RN 버전의 실행 검증을 의미하지 않습니다. [호환성 원문](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/FAQ.md#does-this-support-the-new-architecture)

## 개인정보 false와 미지정은 같은가요?

다릅니다. `false`는 명시한 값이며 미지정은 SDK/CMP 기존 값을 유지하는 상태입니다. 일부 네트워크는 초기화 때만 읽으므로 동의 흐름을 먼저 완료하세요. [개인정보 설명](PRIVACY_GUIDE.md)

## 보상은 언제 지급하나요?

보상 광고의 `rewarded` 이벤트에 연결합니다. `closed`는 보상 획득을 뜻하지 않습니다. 앱의 거래/사용자 식별 기준으로 중복 지급을 방지하세요. [보상 payload](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#rewardpayload)

[v0.6.0 CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43151333114)에서 커밋 `3b02149`의 Android 라이브러리 `assembleDebug`가 GAM+AdFit 기본 예제 설정으로 성공했습니다. 7개 전체 어댑터, 호스트 앱 APK, 실기기 광고 수신 및 iOS Xcode 빌드 검증을 의미하지 않습니다. 전체 검증 범위는 [버전표](VERSION_MATRIX.md#빌드-검증-범위)를 참고하세요.
