import UIKit
import SceneKit
import ARKit

@objc(MASVirtualTryOnViewController)
class MASVirtualTryOnViewController: UIViewController {
  private var faceUvGenerator: FaceTextureGenerator!
  private var scnFaceGeometry: ARSCNFaceGeometry!
  private var previewSceneView: SCNView!
  private var previewFaceNode: SCNNode!
  private var previewFaceGeometry: ARSCNFaceGeometry!
  /// Size of the generated face texture
  private let faceTextureSize = 1024 //px


  // MARK: - State Changes
  @IBOutlet var sceneView: ARSCNView!

  var anchorNode: SCNNode?
  var makeup: Makeup?
  var makeupType = MakeupType.none
  var hideTexture = false 

  override func viewDidLoad() {
    super.viewDidLoad()
    createFaceGeometry()
    setupScene()
  }

  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    UIApplication.shared.isIdleTimerDisabled = true
    resetTracking()
  }
  
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    UIApplication.shared.isIdleTimerDisabled = false
    sceneView.session.pause()
  }

  func setColor(_ color: String) {
    hideTexture = false
    makeup?.setColor(color)
    resetTracking()
  }

  // Assumes one texture per product
  func setMaterialTransparency(_ alpha: String) -> () {
    makeup?.changeTransparency(alpha: CGFloat(Double(alpha)!))
  }

  func setProductType(_ productType: String) -> () {
    hideTexture = true
    switch productType {
      case "lipstick":
        makeupType = .lipstick
      case "blush":
        makeupType = .blush 
      case "eyeshadow":
        makeupType = .eyeshadow 
      default:
        makeupType = .none
    }
    makeup?.swapMaterials(makeupType: makeupType)
    resetTracking()
  }

  

}

// MARK: - Extensions
extension ARFaceAnchor {
  @available(iOS 12.0, *)
  var isTongueOut: Bool {
    return blendShapes[ARFaceAnchor.BlendShapeLocation.tongueOut]!.floatValue > 0.05
  }
  @available(iOS 12.0, *)
  var isMouthRollLower: Bool {
    return blendShapes[ARFaceAnchor.BlendShapeLocation.mouthRollLower]!.floatValue > 0.50
  }
  @available(iOS 12.0, *)
  var isMouthRollUpper: Bool {
    return blendShapes[ARFaceAnchor.BlendShapeLocation.mouthRollUpper]!.floatValue > 0.30
  }
}

extension MASVirtualTryOnViewController: ARSCNViewDelegate {
  // MARK: - Error Handling
  func session(_ session: ARSession, didFailWithError error: Error) {
    guard error is ARError else { return }
    
    let errorWithInfo = error as NSError
    let messages = [
      errorWithInfo.localizedDescription,
      errorWithInfo.localizedFailureReason,
      errorWithInfo.localizedRecoverySuggestion
    ]
    let errorMessage = messages.compactMap({ $0 }).joined(separator: "\n")
    
    DispatchQueue.main.async { [weak self] in
      self?.displayError(errorMessage, withTitle: NSLocalizedString("The AR session failed.", comment: "Alert title"))
    }
  }
  
  /// Present an alert informing about the error that has occurred.
  private func displayError(_ message: String, withTitle title: String) {
    let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
    let actionTitle = NSLocalizedString("Restart Session", comment: "Alert action title")
    let restartAction = UIAlertAction(title: actionTitle, style: .default) { [weak self] _ in
      alertController.dismiss(animated: true, completion: nil)
      self?.resetTracking()
    }
    alertController.addAction(restartAction)
    present(alertController, animated: true, completion: nil)
  }

  // MARK: SceneKit Renderer
  // Tag: ARNodeTracking
  func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
    node.isHidden = hideTexture

    if hideTexture {
      return
    }

    anchorNode = node
    // Adds dynamic texture to anchorNode
    setupFaceNodeContent()
  }


  // Tag: ARFaceGeometryUpdate
  // This continuously updates when a face is detected
  func renderer(_ renderer: SCNSceneRenderer, didUpdate node: SCNNode, for anchor: ARAnchor) {
    guard let faceAnchor = anchor as? ARFaceAnchor,
        let frame = sceneView.session.currentFrame
    else {
      return
    }

    // Prevents flashing a newly selected makeup with the color of the previously 
    // selected makeup.
    if hideTexture {
      return
    }

    // continuously updates the face anchor texture 
    self.previewFaceGeometry.update(from: faceAnchor.geometry)
    faceUvGenerator.update(
      frame: frame,
      scene: self.sceneView.scene,
      headNode: node,
      geometry: previewFaceGeometry
    )
  }
  
}

// MARK: - Private methods
private extension MASVirtualTryOnViewController {

  // Tag: SceneKit Setup
  func setupScene() {
    // Set the view's delegate
    sceneView.delegate = self

    // Show statistics such as fps and timing information
    sceneView.showsStatistics = false

    // Setup environment
    sceneView.automaticallyUpdatesLighting = true /* default setting */
    sceneView.autoenablesDefaultLighting = false /* default setting */
    sceneView.scene.lightingEnvironment.intensity = 1.0 /* default setting */

    self.faceUvGenerator = FaceTextureGenerator(
      device: self.sceneView.device!,
      library: self.sceneView.device!.makeDefaultLibrary()!,
      viewportSize: self.view.bounds.size,
      face: self.scnFaceGeometry,
      textureSize: self.faceTextureSize)

    
    self.makeup = Makeup(geometry:  self.previewFaceGeometry, makeupType: makeupType)
    self.previewFaceGeometry.firstMaterial!.diffuse.contents = faceUvGenerator.texture
  }

  // Tag: ARFaceTrackingConfiguration
  func resetTracking() {
    guard ARFaceTrackingConfiguration.isSupported else { return }

    let configuration = ARFaceTrackingConfiguration()
    configuration.isLightEstimationEnabled = true /* default setting */
    configuration.providesAudioData = false /* default setting */
    
    // New options available in iOS 13+
    if #available(iOS 13.0, *) {
        configuration.isWorldTrackingEnabled = false /* default setting */
        configuration.maximumNumberOfTrackedFaces = 1 /* default setting */
    }

    sceneView.session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
  }

  // Tag: CreateARSCNFaceGeometry
  func createFaceGeometry() {
    self.scnFaceGeometry = ARSCNFaceGeometry(device: self.sceneView.device!, fillMesh: true)
    self.previewFaceGeometry = ARSCNFaceGeometry(device: self.sceneView.device!, fillMesh: true)
  }

  // Tag: Setup Face Content Nodes
  func setupFaceNodeContent() {
    guard let node = anchorNode else { return }

    node.childNodes.forEach { $0.removeFromParentNode() }

    if let content = makeup {
      node.addChildNode(content)
    }
  }
}
