# react-native-nap-ssp — Android ProGuard / R8 규칙
# android/app/proguard-rules.pro 에 추가하세요

# Nap SSP Core
-keep class com.nasmedia.admixerssp.** { *; }
-dontwarn com.nasmedia.admixerssp.**

# Google Ads (AdManager 미디에이션)
-keep class com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Kakao AdFit
-keep class com.kakao.adfit.** { *; }
-dontwarn com.kakao.adfit.**

# Pangle
-keep class com.pangle.** { *; }
-dontwarn com.pangle.**

# AppLovin
-keep class com.applovin.** { *; }
-dontwarn com.applovin.**

# Mobwith
-keep class kr.co.mobwith.** { *; }
-dontwarn kr.co.mobwith.**
