//
//  SpotLive.swift
//
//
//  Created by Gabriele Romoli on 13/03/23.
//

import Foundation
import CoreBluetooth
import CoreLocation
import UserNotifications
import BackgroundTasks
import Herald
import os
import NearbyConnections

@objc(NearbyMessages)
class Example : RCTEventEmitter, CLLocationManagerDelegate {
  
  @objc(checkNetworkPermission:rejecter:)
  func checkNerworkPermission(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    
  }
  
  @objc(askNerworkPermission:rejecter:)
  func askNerworkPermission(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    
  }
  
  
  
  @objc(checkBluetoothAvailability:rejecter:)
  func checkBluetoothAvailability(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    print("CONTROLLO BLE DISPONIBILE")
    
    
    
    let notificationCenter = UNUserNotificationCenter.current();
    notificationCenter.requestAuthorization(options: [.badge, .alert, .sound]) {
      (granted, error) in
      if(error == nil)
      {
        print("Accettate notifiche: \(granted)")
      }
    }
    locationManager.requestAlwaysAuthorization()
    if (self.tempBluetoothManager != nil || self.tempBluetoothManagerDelegate != nil) {
      let error = GoogleNearbyMessagesError.runtimeError(message: "Another Bluetooth availability check is already in progress!")
      reject("GOOGLE_NEARBY_MESSAGES_CHECKBLUETOOTH_ERROR", error.localizedDescription, error)
      return
    }
    self.didCallback = false
    class BluetoothManagerDelegate : NSObject, CBCentralManagerDelegate {
      private var promiseResolver: RCTPromiseResolveBlock
      private weak var parentReference: Example?
      init(resolver: @escaping RCTPromiseResolveBlock, parentReference: Example) {
        self.promiseResolver = resolver
        self.parentReference = parentReference
      }
      
      func centralManagerDidUpdateState(_ central: CBCentralManager) {
        guard let parent = parentReference else {
          return
        }
        if (!parent.didCallback) {
          parent.didCallback = true
          print("GNM_BLE: CBCentralManager did update state with \(central.state.rawValue)")
          self.promiseResolver(central.state == .poweredOn)
          if(central.state == .poweredOn){
            print("PERMESSI OTTENUTI BLE ATTIVO")
          }
          parent.tempBluetoothManager = nil
          parent.tempBluetoothManagerDelegate = nil
        }
      }
    }
    tempBluetoothManagerDelegate = BluetoothManagerDelegate(resolver: resolve, parentReference: self)
    tempBluetoothManager = CBCentralManager(delegate: tempBluetoothManagerDelegate, queue: nil)
    
    DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(10)) {
      if (!self.didCallback) {
        self.didCallback = true
        let error = GoogleNearbyMessagesError.runtimeError(message: "The CBCentralManager (Bluetooth) did not power on after 10 seconds. Cancelled execution.")
        reject("GOOGLE_NEARBY_MESSAGES_CHECKBLUETOOTH_TIMEOUT", error.localizedDescription, error)
        self.tempBluetoothManager = nil
        self.tempBluetoothManagerDelegate = nil
      }
    }
  }
  
  @objc(checkPermission:rejecter:)
  func checkPermission(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    print("Checking Permissions...")
    if #available(iOS 9.0, *) {
      locationManager.allowsBackgroundLocationUpdates = true
    }
    let hasBluetoothPermission = self.hasBluetoothPermission()
    resolve(hasBluetoothPermission)
  }

  @objc
  func clearMessages(){
    self.Messages = Array();
  }
  
  
  var lastNotify:Date
  
  @objc
  func addLikes(_ likes:Array<String>){
    for like in likes{
      if(!self.Likes.contains(like)){
        self.Likes.append(like)
      }
    }
  }
  
  func likeControl(id: String) {
      let fiveMinutesAgo = Date().addingTimeInterval(-300) // 300 secondi = 5 minuti
    print(id)
    if UIApplication.shared.applicationState == .background && id.contains("SPL::") && !self.Likes.isEmpty &&
          self.Likes.contains(id.replacingOccurrences(of: "SPL::", with: "")) && self.lastNotify < fiveMinutesAgo {
          self.sendNotification("SpotLive", message: "Ci sono delle persone a cui hai messo like nelle vicinanze")
          self.lastNotify = Date()
      }
  }

  
  @objc
  func sendNotification(_ title: String, message: String) {
    DispatchQueue.main.async {
      let center = UNUserNotificationCenter.current()
      center.removeAllDeliveredNotifications()
      let content = UNMutableNotificationContent()
      content.title = title
      content.body = message
      //let soundName = UNNotificationSoundName("silence.mp3")
      //content.sound = UNNotificationSound(named: soundName)
      let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: nil)
      center.add(request)
    }
  }
  
  var Messages: Array<String>;
  var Likes: Array<String>;
  
  
  //CONNECTIONS
  var connectionManager: ConnectionManager!
  var advertiser: Advertiser?
  var discoverer: Discoverer?
  
  
  //HERALD
  var araldo: Araldo?;
  
  func startHerald(message: String){
    if(self.araldo == nil){
      self.araldo = Araldo(resolver: self, message: message);
    }
    self.araldo!.start(message: message);
  }
  
  func stopHerald(){
    self.araldo!.stop();
    //self.araldo = nil;
  }
  
  private var backgroundTask: UIBackgroundTaskIdentifier = UIBackgroundTaskIdentifier.invalid
  private var threadStarted = false
  private var threadShouldExit = false
  
  
  @objc
  func start(_ message: String){
    //if(self.arePermissionsGranted()){
      self.threadShouldExit = false
      DispatchQueue.main.async {
        
        NotificationCenter.default.addObserver(forName: UIApplication.didBecomeActiveNotification, object: nil, queue: .main) { _ in
          self.active = true
        }
        NotificationCenter.default.addObserver(forName: UIApplication.didEnterBackgroundNotification, object: nil, queue: .main) { _ in
          self.active = false
        }
      }
      print("PARTITO")
      print(self.Messages)
      self.startConnections(name: message);
      self.startHerald(message:message);
      
      
      locationManager.pausesLocationUpdatesAutomatically = false
      locationManager.desiredAccuracy = kCLLocationAccuracyThreeKilometers
      locationManager.distanceFilter = 3000.0
      locationManager.showsBackgroundLocationIndicator = true;
      if #available(iOS 9.0, *) {
        locationManager.allowsBackgroundLocationUpdates = true
      } else {
        // not needed on earlier versions
      }
      // start updating location at beginning just to give us unlimited background running time
      self.locationManager.startUpdatingLocation()
      
      periodicallySendScreenOnNotifications(message:message)
      extendBackgroundRunningTime()
      self.sendEvent(withName: EventType.onActivityStart.rawValue, body: "Success")
  }
  
  @objc(stop)
  func stop(){
    self.Messages = Array()
    self.locationManager.stopUpdatingLocation();
    self.threadShouldExit = true
    self.active = false
    UIApplication.shared.endBackgroundTask(self.backgroundTask)
    self.advertiser!.stopAdvertising()
    self.discoverer!.stopDiscovery()
    self.stopHerald();
    self.sendEvent(withName: EventType.onActivityStop.rawValue, body: "Success")
  }
  
  private func extendBackgroundRunningTime() {
    if (threadStarted) {
      // if we are in here, that means the background task is already running.
      // don't restart it.
      return
    }
    threadStarted = true
    NSLog("Attempting to extend background running time")
    
    self.backgroundTask = UIApplication.shared.beginBackgroundTask(withName: "Task1", expirationHandler: {
      NSLog("Background task expired by iOS.")
      UIApplication.shared.endBackgroundTask(self.backgroundTask)
    })
    
    
    var lastLogTime = 0.0
    DispatchQueue.global().async {
      let startedTime = Int(Date().timeIntervalSince1970) % 10000000
      NSLog("*** STARTED BACKGROUND THREAD")
      while(!self.threadShouldExit) {
        DispatchQueue.main.async {
          let now = Date().timeIntervalSince1970
          let backgroundTimeRemaining = UIApplication.shared.backgroundTimeRemaining
          if abs(now - lastLogTime) >= 2.0 {
            lastLogTime = now
            if backgroundTimeRemaining < 10.0 {
              NSLog("About to suspend based on background thread running out.")
            }
            if (backgroundTimeRemaining < 200000.0) {
              NSLog("Thread \(startedTime) background time remaining: \(backgroundTimeRemaining)")
            }
            else {
              //NSLog("Thread \(startedTime) background time remaining: INFINITE")
            }
          }
        }
        sleep(1)
      }
      self.threadStarted = false
      NSLog("*** EXITING BACKGROUND THREAD")
    }
    
  }
  
  private func periodicallySendScreenOnNotifications(message: String) {
    DispatchQueue.global().asyncAfter(deadline: DispatchTime.now()+30.0) {
      //Refresh in background
      if(!self.threadShouldExit){
        self.advertiser?.stopAdvertising()
        self.discoverer?.stopDiscovery()
        //self.stopHerald()
        self.startConnections(name: message)
        //self.startHerald(message: message)
        print("NOSTOP")
        self.periodicallySendScreenOnNotifications(message: message)
      }
    }
  }
  
  
  
  enum EventType: String, CaseIterable {
    case onMessageFound
    case onMessageLost
    case onActivityStart
    case onActivityStop
    case onPermissionsRejected
  }
  
  enum GoogleNearbyMessagesError: Error, LocalizedError {
    case permissionError(permissionName: String)
    case runtimeError(message: String)
    
    
    public var errorDescription: String? {
      switch self {
      case .permissionError(permissionName: let permissionName):
        return "Permission has been denied! Denied Permission: \(permissionName). Make sure to include NSBluetoothPeripheralUsageDescription in your Info.plist!"
      case .runtimeError(message: let message):
        return message
      }
    }
  }
  
  override func supportedEvents() -> [String]! {
    return EventType.allCases.map { (event: EventType) -> String in
      return event.rawValue
    }
  }
  override static func requiresMainQueueSetup() -> Bool {
    // init on main thread, audio doesn't work on background thread.
    return true
  }
  private var active = true
  private var tempBluetoothManager: CBCentralManager? = nil
  private var tempBluetoothManagerDelegate: CBCentralManagerDelegate? = nil
  private var _locationManager: CLLocationManager?
  private var didCallback = false
  public var locationManager: CLLocationManager {
    get {
      if let l = _locationManager {
        return l
      }
      else {
        let l = CLLocationManager()
        l.delegate = self
        _locationManager = l
        return l
      }
    }
  }
  override init() {
    Messages = Array()
    Likes = Array()
    connectionManager = ConnectionManager(serviceID: "SPOTLIVE", strategy: .cluster)
    advertiser = Advertiser(connectionManager: connectionManager)
    discoverer = Discoverer(connectionManager: connectionManager)
    self.lastNotify = Date().addingTimeInterval(-300)
    super.init();
    connectionManager.delegate = self
    discoverer?.delegate = self
    advertiser?.delegate = self
  }
  
  private func startConnections(name:String) {
    self.advertiser?.startAdvertising(using: name.data(using: .utf8)!)
    self.discoverer?.startDiscovery()
  }
  
  @objc(askPermissions)
  func askPermissions(){
    if #available(iOS 9.0, *) {
      locationManager.allowsBackgroundLocationUpdates = true
    }
    let notificationCenter = UNUserNotificationCenter.current();
    notificationCenter.requestAuthorization(options: [.badge, .alert, .sound]) {
      (granted, error) in
      if(error == nil)
      {
        print("Accettate notifiche: \(granted)")
      }
    }
    locationManager.requestAlwaysAuthorization()
    print("concessi")
  }
  
  
  @objc(arePermissionsGranted)
  func arePermissionsGranted()->Bool{
    print("Checking Permissions...")
    let hasLocationPermission:Bool
    if #available(iOS 14.0, *) {
      hasLocationPermission = locationManager.authorizationStatus == .authorizedAlways
    } else {
      hasLocationPermission = true
    }
    if(!hasLocationPermission){
      print("permessi: posizione")
      sendEvent(withName: EventType.onPermissionsRejected.rawValue, body: "posizione")
    }
    if(!hasBluetoothPermission()){
      print("permessi: bluetooth")
      sendEvent(withName: EventType.onPermissionsRejected.rawValue, body: "bluetooth")
    }
    /*if(checkNerworkPermission(<#T##RCTPromiseResolveBlock#>, rejecter: <#T##RCTPromiseRejectBlock#>)){
      print("permessi: network")
      sendEvent(withName: EventType.onPermissionsRejected.rawValue, body: "bluetooth")
    }*/
    return hasLocationPermission && hasBluetoothPermission() //&& self.flags.contains(.reachable)
  }
  
  func hasBluetoothPermission() -> Bool {
    if #available(iOS 13.1, *) {
      return CBCentralManager.authorization == .allowedAlways
    } else if #available(iOS 13.0, *) {
      return CBCentralManager().authorization == .allowedAlways
    }
    // Before iOS 13, Bluetooth permissions are not required
    return true
  }
  
 
}


extension Example: AdvertiserDelegate {
  func advertiser(
    _ advertiser: Advertiser, didReceiveConnectionRequestFrom endpointID: EndpointID,
    with context: Data, connectionRequestHandler: @escaping (Bool) -> Void) {
      let endpoint = DiscoveredEndpoint(
          id: endpointID,
          endpointName: String(data: context, encoding: .utf8)!
      )
      print("TROVATO E LETTO DA:", endpoint.endpointName)
    connectionRequestHandler(true)
  }
}

extension Example: DiscovererDelegate {
  func discoverer(
    _ discoverer: Discoverer, didFind endpointID: EndpointID, with context: Data) {
      let endpoint = DiscoveredEndpoint(
          id: endpointID,
          endpointName: String(data: context, encoding: .utf8)!
      )
    print("An endpoint was found.")
      print(endpoint.endpointName)
      //if(!self.Messages.contains(endpoint.endpointName) && endpoint.endpointName.contains("SPL")){
        //self.Messages.append(endpoint.endpointName);
        self.likeControl(id:endpoint.endpointName);
        self.sendEvent(withName: EventType.onMessageFound.rawValue, body: endpoint.endpointName)
      //}
  }

  func discoverer(_ discoverer: Discoverer, didLose endpointID: EndpointID) {
    print("A previously discovered endpoint has gone away.")
  }
  
}

extension Example: ConnectionManagerDelegate {
  func connectionManager(
    _ connectionManager: ConnectionManager, didReceive verificationCode: String,
    from endpointID: EndpointID, verificationHandler: @escaping (Bool) -> Void) {
      print(" Optionally show the user the verification code. Your app should call this handler")
      // with a value of `true` if the nearby endpoint should be trusted, or `false`
      // otherwise.
      
      verificationHandler(true)
    }
  
  func connectionManager(
    _ connectionManager: ConnectionManager, didReceive data: Data,
    withID payloadID: PayloadID, from endpointID: EndpointID) {
      print("A simple byte payload has been received. This will always include the full data.")
      print(endpointID)
      print(payloadID)
    }
  
  func connectionManager(
    _ connectionManager: ConnectionManager, didReceive stream: InputStream,
    withID payloadID: PayloadID, from endpointID: EndpointID,
    cancellationToken token: CancellationToken) {
      print(endpointID)
      
      print(" We have received a readable stream.")
    }
  
  func connectionManager(
    _ connectionManager: ConnectionManager,
    didStartReceivingResourceWithID payloadID: PayloadID,
    from endpointID: EndpointID, at localURL: URL,
    withName name: String, cancellationToken token: CancellationToken) {
      print(" We have started receiving a file. We will receive a separate transfer update event when complete.")
    }
  
  func connectionManager(
    _ connectionManager: ConnectionManager,
    didReceiveTransferUpdate update: TransferUpdate,
    from endpointID: EndpointID, forPayload payloadID: PayloadID) {
      print(endpointID)
      print(payloadID)
      // A success, failure, cancelation or progress update.
    }
  
  func connectionManager(
    _ connectionManager: ConnectionManager, didChangeTo state: ConnectionState,
    for endpointID: EndpointID) {
      switch state {
      case .connecting:
        print("A connection to the remote endpoint is currently being established.")
      case .connected:
        print("We're connected! Can now start sending and receiving data.")
      case .disconnected:
        print("We've been disconnected from this endpoint. No more data can be sent or received.")
      case .rejected:
        print("The connection was rejected by one or both sides.")
      }
    }
}


struct DiscoveredEndpoint: Identifiable {
    let id: EndpointID
    let endpointName: String
}

class MySupplier: PayloadDataSupplier{
  var message: String
  init(message:String) {
    self.message = message
  }
  func payload(_ timestamp: Herald.PayloadTimestamp, device: Herald.Device?) -> Herald.PayloadData? {
    let buf = message.data(using: .utf8)
    let payload: PayloadData = PayloadData(buf!)
    return payload
  }
}

class Araldo: SensorDelegate{
  //HERALD
  var sensor: SensorArray?
  let automatedTestServer: String? = nil
  var payloadDataSupplier: PayloadDataSupplier?
  private var foreground: Bool = true
  private var resolver: Example;
  
  
  
  // MARK:- Events
  private var didDetect = 0
  private var didRead = 0
  private var didMeasure = 0
  private var didShare = 0
  private var didReceive = 0
  
  init(resolver: Example, message: String) {
    self.resolver = resolver;
    self.payloadDataSupplier = MySupplier(message: message);
    self.sensor = SensorArray(payloadDataSupplier!);
    self.sensor!.add(delegate: self)
  }
 
  
  func start(message: String){
    self.sensor!.start();
  }
  
  func stop(){
    self.sensor!.stop();
  }
  
  func sensor(_ sensor: SensorType, didDetect: TargetIdentifier) {
    let newDevice = String(decoding:didDetect.data(using: String.Encoding.utf8)!,  as: UTF8.self);
  //if(!self.resolver.Messages.contains(newDevice) && newDevice.contains("SPL")){
    //self.resolver.Messages.append(newDevice);
    print("HERALD: ", newDevice)
    self.resolver.likeControl(id:newDevice);
    self.resolver.sendEvent(withName: Example.EventType.onMessageFound.rawValue, body: newDevice)
  }

  func sensor(_ sensor: SensorType, didRead: PayloadData, fromTarget: TargetIdentifier) {
      self.didRead += 1
    let newDevice = String(decoding: didRead.data, as: UTF8.self);
    print("HERALD: ", newDevice)
    //if(!self.resolver.Messages.contains(newDevice) && newDevice.contains("SPL")){
      //self.resolver.Messages.append(newDevice);
      self.resolver.likeControl(id:newDevice);
      self.resolver.sendEvent(withName: Example.EventType.onMessageFound.rawValue, body: newDevice)
    //}
  }

  func sensor(_ sensor: SensorType, didShare: [PayloadData], fromTarget: TargetIdentifier) {
    for share in didShare {
      let newDevice = String(decoding: share.data, as: UTF8.self);
      print("HERALD: ", newDevice)
      //if(!self.resolver.Messages.contains(newDevice) && newDevice.contains("SPL")){
        //self.resolver.Messages.append(newDevice);
        self.resolver.likeControl(id:newDevice);
        self.resolver.sendEvent(withName: Example.EventType.onMessageFound.rawValue, body: newDevice)
      //}
    }
  }

  func sensor(_ sensor: SensorType, didMeasure: Proximity, fromTarget: TargetIdentifier) {
    //let newDevice = String(decoding: didMeasure, as: UTF8.self);
    print("HERALD: ", didMeasure);
  }
  // Immediate send data (text in demo app), NOT payload data
  func sensor(_ sensor: SensorType, didReceive: Data, fromTarget: TargetIdentifier) {
    let newDevice = String(decoding: didReceive, as: UTF8.self);
    print("HERALD: ", newDevice)
    //if(!self.resolver.Messages.contains(newDevice) && newDevice.contains("SPL")){
      //self.resolver.Messages.append(newDevice);
      self.resolver.likeControl(id:newDevice);
      self.resolver.sendEvent(withName: Example.EventType.onMessageFound.rawValue, body: newDevice)
    //}
  }
  
  func sensor(_ sensor: SensorType, didVisit: Location?) {
    print("HERALD: ", didVisit!)
  }
  
  func sensor(_ sensor: SensorType, didMeasure: Proximity, fromTarget: TargetIdentifier, withPayload: PayloadData) {
    print("HERALD: ", didMeasure)
  }
  
  func sensor(_ sensor: SensorType, didUpdateState: SensorState) {
    print("HERALD: ", didUpdateState)
  }
}
