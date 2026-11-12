# 시작하기

플러그인 0.6.2는 React Native 0.76 이상을 기준으로 합니다. Android는 compileSdk 35 이상, iOS는 deployment target 14.0 이상이 필요합니다. Kotlin은 플러그인 기본값 2.1.21이며 실제 호스트 설정과 의존성 호환성을 확인해야 합니다. 네트워크별 추가 조건은 [Android](ANDROID_SETUP.md) 및 [iOS](IOS_SETUP.md)에서 확인하세요.

## 1. 발급받을 값

파트너 사이트에서 앱을 등록하고 앱별 숫자 `mediaKey`와 광고 형식별 숫자 `adUnitId`를 발급받으세요. 문자열 형태로 전달하되 예제 ID를 실제 서비스 키로 사용하지 마세요. 배너와 전면 광고 등 서로 다른 형식은 해당 형식으로 생성된 광고 단위를 사용합니다.

## 2. 설치와 네이티브 재빌드

```bash
npm install react-native-nap-ssp
```

[미디에이션 선택](MEDIATION_GUIDE.md) 후 Android 저장소 또는 iOS Pods를 설정하고 앱을 다시 빌드합니다. Expo Go에는 이 네이티브 모듈이 포함되어 있지 않습니다. [Expo 환경](EXPO_GUIDE.md)

## 3. 초기화 완료 후 광고 마운트

동의 흐름에서 결정한 privacy와 필요한 iOS ATT 처리를 먼저 마친 뒤 초기화합니다. 아래 함수에 앱의 부팅 흐름에서 확정한 값을 전달하세요. `initialize`가 완료되기 전에 광고 화면을 렌더링하면 자동 광고 요청과 초기화가 경쟁합니다.

```tsx
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {BannerAd, NapSspAd, type NapSspConfig} from 'react-native-nap-ssp';

// 앱 부팅 시 한 번 생성한 동일한 Promise를 화면들에서 공유합니다.
let startup: Promise<unknown> | undefined;
function startAds(config: NapSspConfig) {
  return (startup ??= NapSspAd.initialize(config));
}

export function AdScreen({config}: {config: NapSspConfig}) {
  const [phase, setPhase] = useState('loading');
  useEffect(() => {
    let active = true;
    startAds(config).then(
      () => { if (active) setPhase('ready'); },
      () => { if (active) setPhase('failed'); },
    );
    return () => { active = false; };
  }, [config]);

  if (phase === 'failed') return <Text>광고 초기화에 실패했습니다.</Text>;
  if (phase !== 'ready') return null;
  return <BannerAd adUnitId={config.adUnitIds[0]} size="BANNER_320x50"
    onAdFailedToLoad={error => console.warn(error.code, error.message)} />;
}
```

`config`에는 앱 부팅에서 안정적으로 생성한 `mediaKey`, 배너 ID를 첫 항목으로 포함한 `adUnitIds`, 동의 결과 `privacy`를 전달합니다. 위 예제는 초기화 실패 시 자동 재시도하지 않습니다. 재시도 정책이 필요하면 앱 부팅 계층에서 실패 상태와 공유 Promise를 함께 관리하세요. [초기화 옵션](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#napsspad) · [개인정보 값](PRIVACY_GUIDE.md)

`size`는 레이아웃 힌트이며 실제 광고 크기는 서버의 광고 단위 설정으로 결정됩니다. 배너 reload, 전면 광고와 보상 광고 생명주기는 [고급 사용](ADVANCED_USAGE.md)을 참고하세요.

## 4. 확인

초기화 성공과 광고 fill 성공은 별개입니다. 발급 ID, 서버 수요, 네트워크 설정을 확인하고 실패 콜백의 `code`와 `message`를 기록하세요. 디버그에서도 실제 SDK를 사용하며 실패를 성공으로 바꾸지 않습니다. Android 테스트 모드는 iOS에 적용되지 않습니다. [FAQ](FAQ.md) · [실행 가능한 예제](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/example/ExampleHostApp)

[0.6.2 Android CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230196)에서 GAM+AdFit 구성의 라이브러리 빌드가 통과했습니다. [iOS CI](https://github.com/glenn-yu/NapSspReactNativePluginSample/actions/runs/43158230182)는 브리지 소스 포함, GAM+AdFit 시뮬레이터 앱 빌드 및 코어 전용 자동 연결을 확인했습니다. 전체 어댑터와 실기기 광고·보상 흐름은 검증하지 않았습니다. 로컬 의존성 다운로드 실패와 CI 성공은 [검증 범위](VERSION_MATRIX.md#빌드-검증-범위)에서 구분합니다.
