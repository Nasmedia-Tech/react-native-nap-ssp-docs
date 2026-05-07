/**
 * react-native-nap-ssp — Android 미디에이션 어댑터 등록 예제
 *
 * android/app/src/main/java/<패키지>/MainApplication.kt 의
 * onCreate() 에 아래 코드를 추가하세요.
 */

import com.nasmedia.admixerssp.common.AdMixer

class MainApplication : Application(), ReactApplication {

    override fun onCreate() {
        super.onCreate()

        // 사용할 미디에이션 어댑터만 등록 (순서 무관)
        AdMixer.registerAdapter(AdMixer.ADAPTER_ADMANAGER)   // Google Ad Manager
        AdMixer.registerAdapter(AdMixer.ADAPTER_ADFIT)       // Kakao AdFit
        AdMixer.registerAdapter(AdMixer.ADAPTER_PANGLE)      // Pangle (TikTok)
        AdMixer.registerAdapter(AdMixer.ADAPTER_APPLOVIN)    // AppLovin
        AdMixer.registerAdapter(AdMixer.ADAPTER_UNITY)       // Unity Ads
        AdMixer.registerAdapter(AdMixer.ADAPTER_MOBWITH)     // Mobwith

        // React Native 초기화 (기존 코드 유지)
        // ...
    }
}
