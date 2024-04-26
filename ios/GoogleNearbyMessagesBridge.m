//
//  GoogleNearbyMessagesBridge.m
//  SpotMe
//
//  Created by Gabriele Romoli on 13/03/23.
//
#import <Foundation/Foundation.h>
#import "SpotLive-Bridging-Header.h"
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_REMAP_MODULE(GoogleNearbyMessages, NearbyMessages, NSObject)
RCT_EXTERN_METHOD(start:(NSString)message);
RCT_EXTERN_METHOD(stop);
RCT_EXTERN_METHOD(askPermissions);
RCT_EXTERN_METHOD(sendNotification:(NSString *)title message:(NSString *)message);
RCT_EXTERN_METHOD(addLikes:(NSArray<NSString *> *)likes);
RCT_EXTERN_METHOD(clearMessages);
RCT_EXTERN_METHOD(checkNetworkPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(askNerworkPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(checkBluetoothAvailability:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
@end
