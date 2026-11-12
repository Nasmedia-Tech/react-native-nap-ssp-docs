# 문제 해결

플러그인 0.6.0 기준으로 오류가 발생한 단계를 먼저 구분하세요. 설치 전 선택에 관한 질문은 [FAQ](FAQ.md)를 참고하세요.

## 빌드 진단

| 증상 | 확인 및 조치 |
| --- | --- |
| Kotlin metadata / incompatible Kotlin 오류 | 호스트 Kotlin 설정과 의존성 확인 후 호환 버전으로 조정. 플러그인 기본값 2.1.21이며 일괄 최소 버전은 미검증 |
| compile against version 35 or later | 호스트 compileSdk를 35 이상으로 변경 |
| inconsistent JVM target | Java와 Kotlin target 일치, 기본값 17 확인 |
| Could not find AdFit/Pangle/Teads SDK | 선택한 어댑터의 Maven 저장소를 소비 앱에 추가 |
| uses-sdk minSdk 오류 | 선택한 어댑터 최대 요구값 적용: GAM/NAM 23, AppLovin 24 |
| networkSecurityConfig 병합 충돌 | 앱의 자체 설정이 있는지 확인 후 tools:replace 병합 규칙 적용 |
| Google Mobile Ads 충돌 | 의존성 트리 확인, play-services-ads 25.2.0 이하 및 중복 SDK 확인 |
| Teads pod 설치 실패 | Xcode 26 이상인지 확인하거나 불필요한 Teads subspec 제거 |

설정 코드: [Android Kotlin](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-3-kotlin-compatibility), [Maven 저장소](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-2-declare-the-adapter-maven-repositories--required), [Manifest](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-5-manifest), [iOS Pods](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-1-cocoapods).

## 런타임 진단

1. `initialize()` Promise가 성공했는지 확인합니다. `nap_ssp_not_initialized`라면 광고 컴포넌트를 초기화 완료 후 마운트하세요. [안전한 시작 예제](GETTING_STARTED.md#3-초기화-완료-후-광고-마운트)
2. 광고 단위가 초기화의 `adUnitIds`에 포함되어 있고 숫자 문자열이며 요청한 형식과 일치하는지 확인합니다.
3. `onAdFailedToLoad` 또는 전면 광고 `loadFailed`에서 `AdError.code`, `message`를 확인합니다. [코드표](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#aderror)
4. `nap_ssp_no_ads`는 서버 수요/재고와 네트워크 응답을 확인합니다. 무제한 즉시 재시도는 피하고 앱의 재시도 정책을 적용하세요.
5. 특정 네트워크만 문제라면 바이너리의 어댑터, 네트워크 키, 서버 waterfall, 개인정보 값을 차례로 확인합니다. [미디에이션](MEDIATION_GUIDE.md)

## 모듈 및 화면 상태 오류

`nap_ssp_view_not_linked` / `napssp_sdk_not_linked`는 JS 번들만 업데이트한 상태인지 확인하세요. CocoaPods 설치, autolinking 및 네이티브 재빌드가 필요합니다. Expo Go에서는 모듈을 사용할 수 없습니다.

`nap_ssp_activity_required`는 Android의 표시 가능한 Activity가 필요하다는 뜻입니다. 앱이 foreground이고 화면이 살아 있는 시점에 표시하세요. 전면 광고는 `load()` 완료 후 `show()`를 호출하고 화면 해제 시 listener 해제와 `destroy()`를 수행합니다. [생명주기](ADVANCED_USAGE.md)

배너가 잘리면 부모 width/height와 서버 광고 크기를 확인하세요. `size`는 서버 creative 크기를 강제하지 않습니다. 네이티브 광고 asset 누락은 커스텀 XML ID 또는 XIB outlet을 확인합니다. [네이티브 asset](NATIVE_ASSETS_GUIDE.md)

## 보상 및 이벤트 문제

보상은 `rewarded`에서 처리하며 `closed`에서 지급하지 않습니다. 중복 listener 또는 재마운트 시 미해제 listener를 확인하세요. iOS SDK에서 전달되지 않는 `skipped` 이벤트를 반드시 기다리는 흐름은 사용하지 마세요. [이벤트 정의](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#events)

## 지원 요청에 포함할 정보

플러그인/RN 버전, OS/기기, 선택한 어댑터, 실제 Kotlin/compileSdk 또는 Xcode/Pods 버전, 발생 단계와 최소 재현 순서, 오류 코드와 비식별 로그를 정리하세요. 테스트 기기 GAID와 사용자 식별자는 로그/티켓에서 제거합니다. 개발 중 `setLogLevel('verbose')`로 확인하고 배포 설정은 `error` 등 적절한 수준으로 낮추세요.

이번 문서 정비에서 Android 전체 네이티브 빌드, iOS Xcode 빌드, 모든 어댑터 조합 및 실광고 수신은 검증하지 않았습니다.
