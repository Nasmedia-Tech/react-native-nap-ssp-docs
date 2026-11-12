# 버전 정보

| 항목 | 플러그인 0.6.0 기준 |
| --- | --- |
| Android Core / BOM | 2.5.1 / 2026.11.02 |
| iOS Mediation / Core | Mediation 2.6.1 이상 3.0 미만 / Core 1.5.1 이상 |
| React Native / iOS | 0.76 이상 / iOS 14 이상 |
| Android compileSdk / Kotlin | 35 이상 / 플러그인 기본 2.1.21, 호스트 호환성 별도 확인 |
| Android minSdk | Core 21, GAM/NAM 23, AppLovin 24 |
| Xcode | 기본 16 이상, Teads 26 이상 |

Android 어댑터별 버전과 호스트 요구 사항은 [설치 가이드](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md)를 확인하세요. iOS CocoaPods는 어댑터를 선택 설치합니다.

Android 네이티브 전체 빌드와 iOS Xcode 빌드는 이번 변경에서 아직 검증되지 않았습니다.

공식 SDK 가이드는 Flutter 호스트에서 Kotlin 2.1.0과 2.2.10을 검증하고 2.2.10을 권장합니다. 플러그인 기본값 2.1.21은 React Native 전체 앱의 호환성 검증 결과가 아니며, 실제 호스트 설정과 의존성을 확인하고 빌드해야 합니다. [Kotlin 검증 범위와 설정](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-3-kotlin-compatibility)
