# Expo 환경

이 플러그인은 Android/iOS 네이티브 SDK와 브리지 코드를 포함하므로 Expo Go에서 실행되지 않습니다. 네이티브 프로젝트를 생성하고 수정할 수 있는 커스텀 개발 빌드가 필요합니다.

## 설치 시 확인할 사항

Expo 프로젝트가 사용하는 React Native 버전이 0.76 이상인지 확인하고 Android compileSdk 35 이상, iOS 14 이상을 충족하세요. Kotlin은 플러그인 기본값 2.1.21과 실제 호스트 설정의 호환성을 확인하세요. [Android 설정](ANDROID_SETUP.md)과 [iOS 설정](IOS_SETUP.md)의 어댑터, 저장소, Pods, Manifest/Info.plist 변경이 네이티브 생성 이후에도 유지되어야 합니다.

prebuild로 네이티브 파일을 다시 생성할 경우 수동 변경을 잃을 수 있으므로 프로젝트의 config plugin 또는 네이티브 관리 전략에 반영하세요. 이 저장소는 검증된 Expo config plugin이나 즉시 사용 가능한 EAS 설정을 제공한다고 보장하지 않습니다.

## 검증 범위

Expo 개발 빌드, EAS 및 config plugin 연동은 이번 변경에서 검증하지 않았습니다. 우선 네이티브 빌드 및 초기화 성공을 확인한 후 각 형식의 광고 요청을 테스트하세요. [플러그인 호환성 안내](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/FAQ.md#does-it-work-with-expo)
