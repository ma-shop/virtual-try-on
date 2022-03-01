// Based on https://pspdfkit.com/blog/2017/native-view-controllers-and-react-native/
// Might not be needed as part of a native ui component module
//import Foundation

@objc(MASVirtualTryOnView)
class MASVirtualTryOnView: UIView {
  var virtualTryOnViewController: MASVirtualTryOnViewController?

  @objc var productColor: String = "" {
    didSet {
      self.virtualTryOnViewController?.setColor(productColor)
    }
  }

  @objc var productType: String = "" {
    didSet {
      self.virtualTryOnViewController?.setProductType(productType)
    }
  }

  var config: NSDictionary = [:] {
    didSet {
      setNeedsLayout()
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
  }

  required init?(coder aDecoder: NSCoder) { fatalError("nope") }

  override func layoutSubviews() {
    super.layoutSubviews()

    if virtualTryOnViewController == nil {
      embed()
    }
  }

  private func fromStoryboard() -> MASVirtualTryOnViewController {
      let myBundle = Bundle(for: Self.self)

      guard let resourceBundleUrl = myBundle.url(forResource: "MASVirtualTryOn", withExtension: "bundle") 
        else { fatalError("MASVirtualTryOn.bundle not found!") }

      guard let resourceBundle = Bundle(url: resourceBundleUrl)
        else { fatalError("Cannot access MASVirtualTryOn.bundle") }
      
      let storyboard = UIStoryboard(name: "MASVirtualTryOn", bundle: resourceBundle)
      let viewController = storyboard.instantiateInitialViewController() as! MASVirtualTryOnViewController
          
      return viewController
  } 

  private func embed() {
    guard
      let parentVC = parentViewController else {
        return
      }
    var vc: MASVirtualTryOnViewController = fromStoryboard() 
    parentVC.addChild(vc)
    addSubview(vc.view)
    vc.didMove(toParent: parentVC)
    vc.setProductType(productType)
    self.virtualTryOnViewController = vc
  }
}

extension UIView {
  var parentViewController: UIViewController? {
    var parentResponder: UIResponder? = self
    while parentResponder != nil {
      parentResponder = parentResponder!.next
      if let viewController = parentResponder as? UIViewController {
        return viewController
      }
    }
    return nil
  }
}

@objc (MASVirtualTryOnViewManager)
class MASVirtualTryOnViewManager: RCTViewManager {
 
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return MASVirtualTryOnView()
  }
}
