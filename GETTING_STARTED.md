# React Native Nap SSP — 시작 가이드

> **react-native-nap-ssp** — KT 나스미디어 Nap SSP SDK를 React Native 앱에 5분 만에 연동하는 플러그인입니다.

---

## 목차

1. [사전 준비](#1-사전-준비)
2. [설치](#2-설치)
3. [Android 설정](#3-android-설정)
4. [iOS 설정](#4-ios-설정)
5. [SDK 초기화](#5-sdk-초기화)
6. [광고 유형별 사용법](#6-광고-유형별-사용법)
   - [배너 광고 (Banner)](#61-배너-광고-banner)
   - [네이티브 광고 (Native)](#62-네이티브-광고-native)
   - [동영상 광고 (Video)](#63-동영상-광고-video)
   - [전면 광고 (Interstitial)](#64-전면-광고-interstitial)
   - [전면 동영상 광고 (Interstitial Video)](#65-전면-동영상-광고-interstitial-video)
   - [보상형 광고 (Rewarded)](#66-보상형-광고-rewarded)
7. [디버그 vs 릴리즈 빌드 동작 차이](#7-디버그-vs-릴리즈-빌드-동작-차이)
8. [자주 발생하는 문제](#8-자주-발생하는-문제)
9. [문의 및 지원](#9-문의-및-지원)

---

## 1. 사전 준비

시작하기 전에 아래 항목을 준비해 주세요.

| 항목 | 요구 사항 |
| :--- | :--- |
| React Native | 0.72.0 이상 |
| Android minSdk | 21 이상 |
| Android targetSdk | 34 이상 권장 |
| iOS | 13.0 이상 |
| JDK | 17 (Android 빌드 시) |
| **미디어 키 (Media Key)** | 나스미디어 파트너 운영팀에서 발급 |
| **광고 단위 ID (Ad Unit ID)** | 나스미디어 파트너 운영팀에서 발급 |

> 미디어 키와 광고 단위 ID가 없으면 광고가 로드되지 않습니다. 연동 전 반드시 발급 받으세요.  
> **문의**: nap_adx@nasmedia.co.kr

---

## 2. 설치

### 2.1 npm 패키지 설치

```bash
npm install react-native-nap-ssp
```

또는 yarn을 사용하는 경우:

```bash
yarn add react-native-nap-ssp
```

---

## 3. Android 설정

### 3.1 Maven 리포지토리 추가

`android/build.gradle` (프로젝트 루트 레벨) 에 나스미디어 리포지토리를 추가합니다.

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        // 나스미디어 및 미디에이션 리포지토리 (필수)
        maven { url "https://devrepo.kakao.com/nexus/content/groups/public/" }
        maven { url "https://artifact.bytedance.com/repository/pangle" }
    }
}
```

### 3.2 앱 의존성 추가

`android/app/build.gradle` (앱 레벨) 의 `dependencies` 블록에 추가합니다.

```gradle
dependencies {
    implementation 'io.github.nasmedia-tech:admixer-ssp:1.0.23'
    implementation 'com.google.android.gms:play-services-ads-identifier:18.3.0'
}
```

### 3.3 AndroidManifest.xml 권한 추가

`android/app/src/main/AndroidManifest.xml` 에 아래 권한을 추가합니다.

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
```

### 3.4 ProGuard 설정 (릴리즈 빌드 시 필수)

`android/app/proguard-rules.pro` 파일에 아래 규칙을 추가합니다.  
이 설정이 없으면 릴리즈 빌드에서 광고가 표시되지 않을 수 있습니다.

```proguard
-keep class com.nasmedia.admixerssp.** { *; }
-keep interface com.nasmedia.admixerssp.** { *; }
-keep class com.kakao.adfit.** { *; }
-keep class com.google.android.gms.ads.** { *; }
```

---

## 4. iOS 설정

### 4.1 CocoaPods 의존성 추가

`ios/Podfile` 을 열어 아래와 같이 설정합니다.

```ruby
platform :ios, '13.0'

target 'YourAppName' do
  # Nap SSP SDK 본체 (필수)
  pod 'AdMixerMediation'
end
```

설정 후 아래 명령을 실행합니다.

```bash
cd ios && pod install
```

> 반드시 `.xcodeproj` 가 아닌 `.xcworkspace` 파일로 Xcode를 열어 빌드하세요.

### 4.2 iOS 대안: Swift Package Manager (SPM)

CocoaPods 대신 SPM을 사용할 수 있습니다.

1. Xcode → **File → Add Packages...** → **Add Local Package** 선택
2. `node_modules/react-native-nap-ssp/ios` 폴더를 선택
3. `NapSspPlugin` 타겟이 앱 타겟에 자동으로 링크됩니다.

### 4.3 Info.plist 설정

`ios/[AppName]/Info.plist` 에 광고 추적(ATT) 권한 문구를 추가합니다.

```xml
<key>NSUserTrackingUsageDescription</key>
<string>사용자 맞춤형 광고 제공을 위해 추적 권한이 필요합니다.</string>
```

### 4.4 Swift Bridging Header (구형 React Native 프로젝트)

이미 Swift를 사용하지 않는 오래된 RN 프로젝트라면:
1. Xcode에서 빈 Swift 파일 하나를 생성합니다.
2. "Create Bridging Header" 팝업이 뜨면 수락합니다.

---

## 5. SDK 초기화

앱이 시작될 때 **한 번만** SDK를 초기화해야 합니다.  
`App.tsx` 의 최상위 `useEffect` 에서 호출하는 것을 권장합니다.

```tsx
import React, { useEffect } from 'react';
import { NapSspAd } from 'react-native-nap-ssp';

export default function App() {
  useEffect(() => {
    NapSspAd.initialize({
      mediaKey: '여기에_미디어_키_입력',
      adUnitIds: [
        '배너_광고_ID',
        '네이티브_광고_ID',
        '전면_광고_ID',
        '보상형_광고_ID',
      ],
      logLevel: 'info', // 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'none'
    });
  }, []);

  return (/* ... */);
}
```

> `adUnitIds` 에는 앱에서 사용할 모든 광고 단위 ID를 미리 나열해 두세요.  
> 초기화 이후에는 `NapSspAd.getStatus()` 로 현재 상태를 확인할 수 있습니다.

---

## 6. 광고 유형별 사용법

### 6.1 배너 광고 (Banner)

화면에 고정 크기로 표시되는 배너 광고입니다.

```tsx
import { BannerAd } from 'react-native-nap-ssp';

function MyScreen() {
  return (
    <BannerAd
      adUnitId="배너_광고_ID"
      size="BANNER_320x50"
      onAdLoaded={() => console.log('배너 광고 로드 성공')}
      onAdFailedToLoad={(error) => console.warn('배너 광고 로드 실패', error)}
    />
  );
}
```

**지원하는 배너 사이즈**

| 상수 | 크기 |
| :--- | :--- |
| `BANNER_320x50` | 320 × 50 (기본 배너) |
| `BANNER_320x100` | 320 × 100 |
| `BANNER_300x250` | 300 × 250 (중형 직사각형) |
| `SMART_BANNER` | 화면 너비에 맞게 자동 조절 |

---

### 6.2 네이티브 광고 (Native)

앱 UI 스타일에 맞게 커스터마이징 가능한 네이티브 광고입니다.

```tsx
import { NativeAd } from 'react-native-nap-ssp';

function MyScreen() {
  return (
    <NativeAd
      adUnitId="네이티브_광고_ID"
      style={{ width: '100%', height: 200 }}
      onAdLoaded={() => console.log('네이티브 광고 로드 성공')}
      onAdFailedToLoad={(error) => console.warn('네이티브 광고 로드 실패', error)}
    />
  );
}
```

> 네이티브 광고는 `style` 에 반드시 `width` 와 `height` 를 명시해야 정상적으로 표시됩니다.

---

### 6.3 동영상 광고 (Video)

인라인 형태의 동영상 광고입니다.

```tsx
import { VideoAd } from 'react-native-nap-ssp';

function MyScreen() {
  return (
    <VideoAd
      adUnitId="동영상_광고_ID"
      style={{ width: '100%', height: 250 }}
      onAdLoaded={() => console.log('동영상 광고 로드 성공')}
      onAdCompleted={() => console.log('동영상 시청 완료')}
      onAdSkipped={() => console.log('동영상 스킵')}
    />
  );
}
```

---

### 6.4 전면 광고 (Interstitial)

화면 전체를 덮는 전면 광고입니다.  
광고를 미리 로드(`load`)한 뒤 원하는 시점에 노출(`show`)하는 방식입니다.

```tsx
import { InterstitialAd } from 'react-native-nap-ssp';

async function showInterstitial() {
  const interstitial = new InterstitialAd('전면_광고_ID');

  // 이벤트 리스너 등록
  interstitial.addAdEventListener('loaded', () => console.log('광고 로드 완료'));
  interstitial.addAdEventListener('closed', () => console.log('광고 닫힘'));
  interstitial.addAdEventListener('loadFailed', (error) => console.warn('로드 실패', error));

  try {
    await interstitial.load(); // 광고 미리 로드
    await interstitial.show(); // 광고 노출
  } catch (error) {
    console.warn('전면 광고 표시 실패', error);
  }
}
```

---

### 6.5 전면 동영상 광고 (Interstitial Video)

전면으로 표시되는 동영상 광고입니다. 사용 방법은 전면 광고와 동일합니다.

```tsx
import { InterstitialVideoAd } from 'react-native-nap-ssp';

async function showInterstitialVideo() {
  const video = new InterstitialVideoAd('전면동영상_광고_ID');

  video.addAdEventListener('loaded', () => console.log('광고 로드 완료'));
  video.addAdEventListener('completed', () => console.log('동영상 시청 완료'));
  video.addAdEventListener('skipped', () => console.log('동영상 스킵'));
  video.addAdEventListener('closed', () => console.log('광고 닫힘'));

  try {
    await video.load();
    await video.show();
  } catch (error) {
    console.warn('전면 동영상 광고 표시 실패', error);
  }
}
```

---

### 6.6 보상형 광고 (Rewarded)

사용자가 동영상을 끝까지 시청하면 보상을 지급하는 광고입니다.

```tsx
import { RewardedAd } from 'react-native-nap-ssp';

async function showRewarded() {
  const rewarded = new RewardedAd('보상형_광고_ID');

  rewarded.addAdEventListener('loaded', () => console.log('광고 로드 완료'));
  rewarded.addAdEventListener('onRewarded', () => {
    // 이 콜백에서 사용자에게 보상을 지급하세요
    console.log('보상 지급!');
  });
  rewarded.addAdEventListener('closed', () => console.log('광고 닫힘'));
  rewarded.addAdEventListener('loadFailed', (error) => console.warn('로드 실패', error));

  try {
    await rewarded.load();
    await rewarded.show();
  } catch (error) {
    console.warn('보상형 광고 표시 실패', error);
  }
}
```

> 보안이 중요한 서비스에서는 클라이언트 콜백 대신 **S2S(Server-to-Server) 보상 콜백**을 사용하는 것을 권장합니다.

---

## 7. 디버그 vs 릴리즈 빌드 동작 차이

v0.1.5부터 DEBUG / RELEASE 빌드에 따라 광고 실패 처리 방식이 다릅니다.

| 상황 | DEBUG 빌드 | RELEASE 빌드 |
| :--- | :--- | :--- |
| SDK 광고 로드 실패 | `onAdLoaded` (플레이스홀더) | `onAdFailedToLoad` (실제 에러) |
| SDK 12초 응답 없음 | `onAdLoaded` (타임아웃 폴백) | 해당 없음 |
| 전면/보상형 `show()` | 플레이스홀더로 즉시 성공 처리 | SDK 통해 실제 광고 표시 |

이 동작 덕분에 시뮬레이터 환경에서도 이벤트 연결 구현을 검증할 수 있습니다.  
이벤트 payload의 `source` 필드가 `"placeholder"`, `"debug-no-fill"`, `"debug-sdk-timeout"` 이면 플레이스홀더입니다.

> 실제 광고 소재 노출과 수익 집계는 반드시 **RELEASE 빌드 + 실기기**에서 검증하세요.

---

## 8. 자주 발생하는 문제

### 광고가 전혀 로드되지 않아요

- 미디어 키(`mediaKey`)와 광고 단위 ID(`adUnitId`)가 올바른지 확인하세요.
- 기기의 인터넷 연결 상태를 확인하세요. 오프라인에서는 광고가 로드되지 않습니다.
- 일부 미디에이션 SDK(Pangle 등)는 **시뮬레이터에서 광고 노출이 제한**됩니다. 실기기로 테스트해 보세요.

### Android: `NapSspXXX is not linked` 에러

Android 스튜디오에서 **Sync Project with Gradle Files** 를 실행하거나, 아래 명령을 다시 실행하세요.

```bash
npx react-native run-android
```

### Android: `Unsupported class file major version` 에러

JDK 버전 문제입니다. **JDK 17** 을 사용하도록 환경을 설정하세요.

### Android: 릴리즈 빌드에서 광고가 안 보여요

ProGuard/R8 설정이 누락된 경우입니다. [3.4 ProGuard 설정](#34-proguard-설정-릴리즈-빌드-시-필수) 섹션을 확인하세요.

### iOS: `pod install` 후에도 빌드 오류가 나요

`.xcodeproj` 가 아닌 **`.xcworkspace`** 파일로 Xcode를 열고 있는지 확인하세요.

### iOS: ATT 권한 팝업이 나오지 않아요

`Info.plist` 에 `NSUserTrackingUsageDescription` 키가 있는지 확인하세요. ([4.3 Info.plist 설정](#43-infoplist-설정) 참조)

### 배너/네이티브 광고 컴포넌트가 보이지 않아요

`style` prop에 `width` 와 `height` 를 명시적으로 지정했는지 확인하세요.

```tsx
// 잘못된 예 — 크기 미지정
<BannerAd adUnitId="..." />

// 올바른 예 — 크기 명시
<BannerAd adUnitId="..." size="BANNER_320x50" style={{ width: 320, height: 50 }} />
```

---

## 9. 문의 및 지원

| 항목 | 내용 |
| :--- | :--- |
| **기술 문의** | nap_adx@nasmedia.co.kr |
| **미디어 키 / 광고 ID 발급** | 나스미디어 파트너 운영팀 |
| **플러그인 버전** | 0.1.5 |
| **npm 패키지** | `react-native-nap-ssp` |

---

> 더 자세한 내용은 `docs/` 폴더 내 각 가이드 문서를 참고하세요.
>
> - [API Reference](./API_REFERENCE.md) — 전체 API 명세
> - [Android Setup (상세)](./ANDROID_SETUP.md) — 미디에이션 어댑터 포함 상세 설정
> - [iOS Setup (상세)](./IOS_SETUP.md) — Xcode 상세 설정
> - [Mediation Guide](./MEDIATION_GUIDE.md) — 미디에이션 네트워크 연동
> - [Troubleshooting](./TROUBLESHOOTING.md) — 문제 해결 상세 가이드
> - [FAQ](./FAQ.md) — 자주 묻는 질문
