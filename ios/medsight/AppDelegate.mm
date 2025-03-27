#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <RNAppAuthAuthorizationFlowManager.h>
#import <React/RCTLinkingManager.h>

@interface AppDelegate () 

@end

@implementation AppDelegate

@synthesize authorizationFlowManagerDelegate = _authorizationFlowManagerDelegate;

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

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options
{
  if ([self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url]) {
    return YES;
  }
  return [RCTLinkingManager application:app openURL:url options:options];
}

// ✅ Setter method to avoid "unrecognized selector" error
- (void)setAuthorizationFlowManagerDelegate:(id<RNAppAuthAuthorizationFlowManagerDelegate>)authorizationFlowManagerDelegate {
  _authorizationFlowManagerDelegate = authorizationFlowManagerDelegate;
}

@end
