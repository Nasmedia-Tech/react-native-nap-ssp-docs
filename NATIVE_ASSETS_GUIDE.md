# 네이티브 광고 asset과 레이아웃

`NativeAd`는 광고 SDK가 제공한 icon, title, advertiser, description, main media, CTA를 네이티브 뷰에 연결합니다. React Native의 일반 `View`로 이미지를 그리는 방식과 구분하세요. SDK가 등록한 클릭 및 노출 처리를 유지해야 합니다.

## Android XML 변경

앱 모듈의 `res/layout/nap_ssp_native_ad.xml`이 플러그인의 같은 이름 리소스를 덮어씁니다. 필요한 ID를 유지하세요.

```text
nap_mx_iv_icon   nap_mx_tv_title   nap_mx_tv_adv
nap_mx_tv_desc   nap_mx_iv_main    nap_mx_btn_cta
```

기존 뷰 타입과 바인딩을 보존하며 크기/간격/스타일을 변경하세요. 필수 ID를 바꾸면 asset 연결이 깨질 수 있습니다. [Android 원문](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#3-8-customising-the-native-ad-layout)

## iOS XIB 변경

앱 번들에 `AMMNativeAdView.xib`를 포함합니다. File's Owner는 `AMMNativeAdView`이며 `iv_icon`, `l_headline`, `l_advertiser`, `l_description`, `media`, `b_cta` outlet을 연결합니다. 커스텀 XIB가 없으면 프로그램 방식 기본 레이아웃을 사용합니다. [iOS 원문](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/SETUP.md#4-5-customising-the-native-ad-layout)

## 확인할 항목

긴 제목, 설명 없는 creative, 다양한 media 비율, 작은 화면에서 잘림 여부를 확인하세요. 레이아웃 변경은 네이티브 재빌드가 필요합니다. 광고 표기 및 CTA 가독성, SDK 클릭 영역을 유지하고 실제 광고로 노출/클릭 동작을 검증하세요. 이번 문서 정비에서 커스텀 레이아웃의 기기 동작은 검증하지 않았습니다.

컴포넌트 prop과 reload는 [NativeAd API](https://github.com/glenn-yu/NapSspReactNativePluginSample/blob/main/docs/API.md#nativead)를 참고하세요.
