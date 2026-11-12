# Android 설정 (플러그인 0.6.2)

이 문서는 Android 호스트 앱의 빌드 설정을 다룹니다. iOS 설정은 [별도 가이드](IOS_SETUP.md), 네트워크 선택은 [미디에이션 가이드](MEDIATION_GUIDE.md)를 참고하세요.

## 호스트 요구 사항

| 항목 | 요구 사항 |
| --- | --- |
| React Native | 0.76 이상 |
| compileSdk | 35 이상 |
| Kotlin | 플러그인 기본 2.1.21, 실제 호스트 설정 및 의존성 호환성 확인 |
| Java / Kotlin JVM target | 기본 17, 앱과 플러그인의 target 일치 |
| minSdk | Core 21, 선택한 어댑터 중 가장 높은 요구 버전 적용 |
| 네이티브 SDK | Core 2.5.1 / BOM 2026.11.02 |

React Native 버전만으로 Kotlin 호환성을 판단하지 마세요. 기존 프로젝트의 `android/build.gradle`, 버전 카탈로그 및 Kotlin 플러그인 선언을 확인하세요. React Native 0.79 템플릿은 Kotlin 2.0.21, 0.80 템플릿은 2.1.20을 사용하지만 실제 프로젝트는 다를 수 있습니다. 호환되지 않는 metadata 오류가 있으면 호스트 Kotlin 플러그인을 호환 버전으로 조정하세요. 플러그인 기본값은 `2.1.21`이며 `napSsp.kotlinVersion`으로 변경할 수 있습니다. 호스트 Gradle 설정 및 최종 의존성을 함께 확인하고 전체 앱을 빌드하세요.

공식 SDK 가이드는 Flutter 호스트(AGP 8.10.1, Java 17, debug 및 R8 release)에서 Kotlin 2.1.0과 2.2.10을 검증했고 2.2.10을 권장합니다. 이 결과는 React Native 검증이 아닙니다. 플러그인 0.6.0의 Android 라이브러리 CI 빌드는 성공했지만, 단일 구성의 결과를 일괄 최소 Kotlin 버전이나 모든 RN 호스트 호환성 보증으로 해석하지 마세요.

[정확한 Kotlin 설정과 JVM target 조정](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-3-kotlin-compatibility)

## 패키지 및 어댑터 설치

```bash
npm install react-native-nap-ssp
```

```properties
# android/gradle.properties: 실제 사용하는 네트워크만 선택
napSsp.mediations=admanager,adfit
```

속성을 생략하면 Core만 포함합니다. `all`은 모든 어댑터와 종속 SDK를 추가하므로 각 네트워크의 저장소, minSdk, 키 설정도 모두 충족해야 합니다. JS의 `mediations` 객체는 네이티브 어댑터 설치를 대신하지 않습니다.

## 앱의 Maven 저장소

Gradle은 소비자인 앱의 저장소에서 전이 의존성을 찾습니다. 선택한 네트워크에 필요한 저장소를 앱의 `android/settings.gradle` 저장소 블록에 병합하세요.

```groovy
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        // AdFit을 선택한 경우
        maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/' }
        // Pangle을 선택한 경우
        maven { url 'https://artifact.bytedance.com/repository/pangle/' }
    }
}
```

Teads는 별도 저장소가 추가로 필요합니다. [어댑터별 Maven 저장소 전체 목록](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-2-declare-the-adapter-maven-repositories--required)을 사용하세요.

## minSdk 및 Manifest

| 선택한 네트워크 | 최소 Android API |
| --- | --- |
| Core, AdFit, Pangle, Unity Ads, Teads | 21 |
| Google Ad Manager, Naver Ad Manager | 23 |
| AppLovin | 24 |

Google Ad Manager를 선택하면 `AndroidManifest.xml`의 `<application>` 안에 발급받은 App ID를 넣습니다.

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="YOUR_GOOGLE_APP_ID" />
```

Android Naver Ad Manager의 publisher code는 어댑터 AAR에 포함되어 있으므로 수동 선언하지 않습니다. 앱이 자체 `networkSecurityConfig`를 갖고 있을 때만 병합 충돌 해결 설정을 검토하세요. [Manifest와 충돌 처리](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-5-manifest)

## 버전 충돌과 릴리스 확인

Google Mobile Ads `play-services-ads`는 25.2.0 이하를 사용합니다. 다른 라이브러리가 25.3.0 이상을 가져오는지 의존성 트리에서 확인하세요. [Google Ad Manager 버전 상한](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-6-google-ad-manager-version-ceiling)

Core, 어댑터, 플러그인의 consumer ProGuard 규칙은 자동 병합됩니다. 임의의 전체 keep 규칙을 추가하기 전에 실제 R8 오류와 선택한 어댑터를 확인하세요. [R8 설명](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-7-proguard--r8)

설정 후 네이티브 앱을 다시 빌드하고 [초기화 완료 후 광고 표시](GETTING_STARTED.md)를 확인하세요. [0.6.2 Android CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230196)에서 GAM+AdFit 구성의 라이브러리 빌드가 통과했습니다. [iOS CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230182)는 브리지 소스 포함, GAM+AdFit 시뮬레이터 앱 빌드 및 코어 전용 자동 연결을 확인했습니다. 전체 어댑터와 실기기 광고·보상 흐름은 검증하지 않았습니다. 로컬 재검증은 의존성 다운로드 실패로 완료하지 못했습니다.
