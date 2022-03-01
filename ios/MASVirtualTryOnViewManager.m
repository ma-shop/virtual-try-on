#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MASVirtualTryOnViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(status, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(productColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(productType, NSString)
RCT_EXPORT_VIEW_PROPERTY(nativeProps, NSDictionary)
@end
