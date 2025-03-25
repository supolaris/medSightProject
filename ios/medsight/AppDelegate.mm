#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <RNAppAuthAuthorizationFlowManager.h> 

@interface AppDelegate () <RNAppAuthAuthorizationFlowManager> 
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"medsight";
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  if (self.authorizationFlowManagerDelegate) {
    return [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url];
  }
  return [super application:app openURL:url options:options];
}

@end
