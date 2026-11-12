# react-native-nap-ssp 연동 문서

> **0.6.0/0.6.1 알려진 실행 문제:** Android 전면형 이벤트가 중복 전달될 수 있고, 같은 광고 단위 ID를 여러 전면 포맷에서 쓰면 다른 포맷의 상태가 바뀔 수 있습니다. iOS 전면형 `isLoading()`도 구현되지 않았습니다. 리워드는 콜백만으로 중복 지급하지 말고 서버 거래 ID로 중복을 막으세요. [상세 및 검증 상태](https://github.com/glenn-yu/NapSspReactNativePluginSample/releases/tag/v0.6.1)

**0.6.2**에서 위 이벤트·상태 문제와 iOS CocoaPods 브리지 누락을 수정했습니다. 사용 중인 앱에서 네이티브 의존성을 다시 설치하고 앱을 재빌드하세요.

이 저장소는 React Native 플러그인의 현재 가이드로 연결합니다. 최신 소스와 상세 문서는 [플러그인 저장소](https://github.com/glenn-yu/NapSspReactNativePluginSample)에서 관리합니다.

| 문서 | 내용 |
| --- | --- |
| [시작하기](GETTING_STARTED.md) | 설치, 초기화 및 사용 예제 |
| [Android 설정](ANDROID_SETUP.md) | SDK, Gradle 및 어댑터 |
| [iOS 설정](IOS_SETUP.md) | CocoaPods, 어댑터 및 ATT |
| [API 레퍼런스](API_REFERENCE.md) | 광고 형식, 이벤트 및 오류 |
| [버전 정보](VERSION_MATRIX.md) | SDK와 플러그인 버전 |
| [마이그레이션](MIGRATION_GUIDE.md) | 릴리스별 변경 사항 |
| [문제 해결](TROUBLESHOOTING.md) | 빌드 및 런타임 문제 |
| [미디에이션](MEDIATION_GUIDE.md) | 네트워크 선택, 키와 서버 설정 구분 |
| [개인정보](PRIVACY_GUIDE.md) | privacy 삼상태와 초기화 전 동의 전달 |
| [네이티브 asset](NATIVE_ASSETS_GUIDE.md) | Android XML, iOS XIB 커스텀 레이아웃 |
| [고급 사용](ADVANCED_USAGE.md) | load/show/reload, 이벤트, cleanup |
| [FAQ](FAQ.md) | 도입과 운영 관련 질문 |
| [용어집](GLOSSARY.md) | 키, waterfall, fill, ATT 등 주요 용어 |
| [Expo](EXPO_GUIDE.md) / [SPM](SPM_GUIDE.md) | 지원 범위와 검증 제한 |

0.6.2는 Android Core 2.5.1과 iOS Mediation 2.6.1 이상을 사용합니다. 어댑터는 필요한 것만 선택 설치합니다. iOS React Native 브리지는 CocoaPods를 사용합니다.

광고 로드 실패는 디버그와 릴리스 모두 실패로 전달됩니다. 실광고 연동 예제는 [ExampleHostApp](https://github.com/glenn-yu/NapSspReactNativePluginSample/tree/main/example/ExampleHostApp)을 참고하세요.

[nap mx Android 가이드](https://napmx.github.io/#/android/) · [iOS 가이드](https://napmx.github.io/#/ios/)

[0.6.2 Android CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230196)에서 GAM+AdFit 구성의 라이브러리 빌드가 통과했습니다. [iOS CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230182)는 브리지 소스 포함, GAM+AdFit 시뮬레이터 앱 빌드 및 코어 전용 자동 연결을 확인했습니다. 전체 어댑터와 실기기 광고·보상 흐름은 검증하지 않았습니다. [빌드 검증 범위](VERSION_MATRIX.md#빌드-검증-범위)에서 로컬 재검증 상태와 구분해 확인하세요.
