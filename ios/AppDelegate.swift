/**
 * react-native-nap-ssp — iOS AppDelegate ATT 요청 예제
 *
 * ios/<프로젝트명>/AppDelegate.swift 에 아래 코드를 추가하세요.
 * ATT 권한 요청은 앱 시작 시 한 번만 수행합니다.
 */

import UIKit
import AppTrackingTransparency
import AdSupport

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

  func applicationDidBecomeActive(_ application: UIApplication) {
    // iOS 14.5 이상에서 ATT 권한 요청
    if #available(iOS 14.5, *) {
      ATTrackingManager.requestTrackingAuthorization { status in
        switch status {
        case .authorized:
          print("ATT authorized — IDFA available")
        case .denied, .restricted:
          print("ATT denied — limited ad targeting")
        case .notDetermined:
          print("ATT not determined")
        @unknown default:
          break
        }
      }
    }
  }
}
