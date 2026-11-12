# 용어집

| 용어 | 의미와 확인 위치 |
| --- | --- |
| mediaKey | 파트너 사이트가 앱별 발급하는 숫자 미디어 키. JS에는 문자열로 전달. [초기화 API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#napsspad) |
| adUnitId | 광고 형식과 지면별 숫자 ID. 초기화의 전체 adUnitIds에 포함하고 해당 형식에서 요청 |
| Core | nap mx 기본 SDK. 외부 네트워크 어댑터를 설치하지 않아도 포함됨 |
| Adapter | 외부 광고 SDK와 nap mx를 연결하는 네이티브 모듈. [네트워크별 설치](MEDIATION_GUIDE.md#플랫폼별-선택-설치) |
| Mediation / waterfall | 서버 설정에 따라 광고 수요를 요청하는 네이티브 SDK 동작. 어댑터 설치만으로 서버 수요가 생성되지는 않음 |
| media-conf | 앱과 네트워크 설정을 전달하는 서버 설정. 네트워크 키는 서버 값이 우선하며 JS 값은 누락을 보완 |
| fill / no fill | 광고 소재 수신 성공 / 요청에 반환할 광고 없음. 초기화 성공과 구분. [오류 진단](TROUBLESHOOTING.md#런타임-진단) |
| compileSdk / minSdk | Android 컴파일 API / 실행 가능한 최소 API. 각각 35 이상 / 선택 어댑터의 최대 요구값 적용 |
| subspec | CocoaPods에서 선택 설치하는 하위 패키지. [iOS 설정](IOS_SETUP.md#cocoapods-및-어댑터) |
| ATT | iOS 추적 권한. GDPR/CCPA 동의와 별도 흐름. [ATT 절](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-3-app-tracking-transparency) |
| CMP / privacy signal | 동의 관리 도구 / 앱이 SDK로 전달하는 동의 값. [삼상태 의미](PRIVACY_GUIDE.md#false와-미지정) |
| RewardedAd / rewarded | 보상 광고 클래스 / 실제 보상 획득 이벤트. closed와 구분. [payload](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#rewardpayload) |
| native ad | SDK의 소재 asset을 앱 네이티브 레이아웃에 배치하는 광고. [asset 구성](NATIVE_ASSETS_GUIDE.md) |
| NativeModule / ViewManager | React Native JS와 플랫폼 SDK/뷰 사이 브리지. 패키지 설치 후 네이티브 재빌드 필요 |

이 문서의 버전 조건은 플러그인 0.6.2 기준이며 상세 [버전표](VERSION_MATRIX.md)와 함께 확인하세요.
