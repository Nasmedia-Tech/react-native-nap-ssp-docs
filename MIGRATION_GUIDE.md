# 0.6.0 마이그레이션

업데이트는 JS 패키지와 Android/iOS 네이티브 의존성을 함께 변경합니다. 네이티브 재빌드 없이 번들만 배포하지 마세요.

## 0.5.x에서 업데이트

Android Core 2.5.1 / BOM 2026.11.02, iOS Mediation 2.6.1 이상 3.0 미만 / Core 1.5.1 이상을 기준으로 합니다. React Native 0.76 이상, compileSdk 35 이상, iOS 14 이상을 확인하세요. Kotlin은 플러그인 기본값 2.1.21과 실제 호스트 설정의 호환성을 확인하세요. Android 라이브러리 CI의 단일 구성 성공이 일괄 최소 Kotlin 버전이나 모든 호스트 앱 호환성을 검증하는 것은 아닙니다.

iOS 어댑터는 필요한 subspec을 명시적으로 선택하며 React Native 브리지는 CocoaPods를 사용합니다. 독립 SPM manifest는 제거되었습니다. [iOS 설치](IOS_SETUP.md) · [SPM 범위](SPM_GUIDE.md)

Android SDK 숫자 오류 값이 바뀌었으므로 앱 분기에는 문서화된 문자열 코드를 사용하고 네이티브 앱을 다시 빌드하세요. [AdError](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#aderror)

## 0.4.x에서 업데이트

디버그 placeholder 및 실패를 성공으로 보고하던 동작이 제거되었습니다. 실제 키와 네트워크가 필요하며 실패 콜백을 처리해야 합니다. deprecated setCoppa 대신 실제 개인정보 신호를 initialize의 privacy로 전달하세요.

`napSsp.enableVendorSdk`는 제거되었습니다. 이전 모든 어댑터 설치 동작을 유지하려면 `napSsp.mediations=all`이 필요하지만 실제 사용하는 네트워크만 선택하는 것을 권장합니다. [어댑터 선택](MEDIATION_GUIDE.md)

전체 변경 이력: [CHANGELOG](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/CHANGELOG.md), [기존 마이그레이션 상세](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/MIGRATION.md). [v0.6.0 CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43151333114)에서 커밋 `3b02149`의 Android 라이브러리 `assembleDebug`가 GAM+AdFit 기본 예제 설정으로 성공했습니다. 7개 전체 어댑터, 호스트 앱 APK, 실기기 광고 수신 및 iOS Xcode 빌드 검증을 의미하지 않습니다.
