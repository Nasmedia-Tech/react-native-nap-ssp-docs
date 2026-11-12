# 버전 정보

| 항목 | 플러그인 0.6.2 기준 |
| --- | --- |
| Android Core / BOM | 2.5.1 / 2026.11.02 |
| iOS Mediation / Core | Mediation 2.6.1 이상 3.0 미만 / Core 1.5.1 이상 |
| React Native / iOS | 0.76 이상 / iOS 14 이상 |
| Android compileSdk / Kotlin | 35 이상 / 플러그인 기본 2.1.21, 호스트 호환성 별도 확인 |
| Android minSdk | Core 21, GAM/NAM 23, AppLovin 24 |
| Xcode | 기본 16 이상, Teads 26 이상 |

Android 어댑터별 버전과 호스트 요구 사항은 [설치 가이드](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md)를 확인하세요. iOS CocoaPods는 어댑터를 선택 설치합니다.

## 빌드 검증 범위

[0.6.2 Android CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230196)에서 GAM+AdFit 구성의 라이브러리 빌드가 통과했습니다. [iOS CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230182)는 브리지 소스 포함, GAM+AdFit 시뮬레이터 앱 빌드 및 코어 전용 자동 연결을 확인했습니다. 전체 어댑터와 실기기 광고·보상 흐름은 검증하지 않았습니다.

| 확인 항목 | 상태 |
| --- | --- |
| Android 라이브러리 assembleDebug | v0.6.2 CI 성공, 기본 예제 GAM+AdFit 구성 |
| 로컬 Android 재검증 | 의존성 다운로드 실패로 완료하지 못함; 컴파일 실패로 단정하지 않음 |
| 전체 7개 어댑터 및 모든 RN/Kotlin 조합 | 미검증 |
| 호스트 앱 APK 빌드 / 설치 / 광고 수신 | 미검증 |
| iOS 시뮬레이터 앱 빌드 | v0.6.2 CI 성공, GAM+AdFit 구성 및 브리지 소스 포함 확인 |
| iOS Core-only 자동 연결 | CI에서 브리지 소스 포함 확인 (별도 앱 빌드는 미실행) |
| iOS 실기기 / ATT / 실광고 수신 | 미검증 |

공식 SDK 가이드는 Flutter 호스트에서 Kotlin 2.1.0과 2.2.10을 검증하고 2.2.10을 권장합니다. 플러그인 기본값 2.1.21은 React Native 전체 앱의 호환성 검증 결과가 아니며, 실제 호스트 설정과 의존성을 확인하고 빌드해야 합니다. [Kotlin 검증 범위와 설정](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-3-kotlin-compatibility)
