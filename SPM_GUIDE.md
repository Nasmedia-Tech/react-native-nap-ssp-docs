# Swift Package Manager

React Native 브리지는 CocoaPods로 설치합니다. 이전 `ios/Package.swift`는 React 의존성과 혼합 언어 타깃 문제로 0.6.0에서 제거됐으며 독립 SPM 설치는 지원하지 않습니다.

- [iOS 설치 및 어댑터](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-2-swift-package-manager)
- [네이티브 iOS SDK의 SPM 안내](https://napmx.github.io/#/ios/native/getting-started)

네이티브 iOS 앱에서 SDK만 SPM으로 쓰는 방법을 React Native 브리지 설치에 그대로 적용하지 마세요. React 의존성 연결과 브리지 빌드는 CocoaPods 경로를 사용합니다. [로컬 Pod와 어댑터 선택 예제](IOS_SETUP.md#cocoapods-및-어댑터)

이번 문서 정비에서 iOS Xcode 빌드는 검증하지 않았습니다.
