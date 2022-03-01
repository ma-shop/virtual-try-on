/**
 * Copyright (c) 2019 Razeware LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * Notwithstanding the foregoing, you may not use, copy, modify, merge, publish,
 * distribute, sublicense, create a derivative work, and/or sell copies of the
 * Software in any work that is designed, intended, or marketed for pedagogical or
 * instructional purposes related to programming, coding, application development,
 * or information technology.  Permission for such use, copying, modification,
 * merger, publication, distribution, sublicensing, creation of derivative works,
 * or sale is expressly withheld.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import ARKit
import SceneKit


enum MakeupType: String, CaseIterable {
  case lipstick 
  case blush
  case eyeshadow
  case none
}

class Makeup: SCNNode {
  var makeupType = MakeupType.none
  let frameworkBundle = Bundle(for: Makeup.self)

  var color: String? = nil
  
  init(geometry: ARSCNFaceGeometry, makeupType: MakeupType, isHidden: Bool = true) {
    super.init()
    self.geometry = geometry
    self.makeupType = makeupType
    self.swapMaterials(makeupType: makeupType)
    self.isHidden = isHidden
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("\(#function) has not been implemented")
  }

  // MARK: Materials Setup
  func changeTransparency(alpha: CGFloat) {
    guard let material = geometry?.firstMaterial! else { return }
    material.transparency = alpha 
  }

  func swapMaterials(makeupType: MakeupType) {
    guard let material = geometry?.firstMaterial! else { return }

    switch makeupType {
      case .lipstick:
        material.lightingModel = .physicallyBased
        setMakeupTextureFromFileName("lipstick")
      case .blush:
        if #available(iOS 13.0, *) {
          material.lightingModel = .shadowOnly
        } else {
          material.lightingModel = .physicallyBased
        }
        setMakeupTextureFromFileName("blush")
      case .eyeshadow:
        material.lightingModel = .physicallyBased
        setMakeupTextureFromFileName("eyeshadow")
      case .none:
        self.isHidden = true
    }
  }

  func setMakeupTextureFromFileName(_ fileName: String) {
    let filePath = (frameworkBundle
              .resourceURL?
              .appendingPathComponent("MakeupAssets.bundle/Makeup.scnassets/\(fileName).png"))!

    self.geometry?.firstMaterial?.transparent.contents = filePath
  }

  func setColor(_ color: String) {
    self.color = color
    let (red, green, blue) = rgbComponentsWithHexString(color)
    self.filters = [desaturate(), colorize(red, green, blue)]
    self.isHidden = false
  }

  func desaturate() -> CIFilter {
    let filter = CIFilter(name: "CIColorMonochrome")!
    filter.setValue(CIColor(red: 0.7, green: 0.7, blue: 0.7), forKey: "inputColor")
    filter.setValue(1.0, forKey: "inputIntensity")

    return filter
  }

  func colorize(_ red: CGFloat,_ green: CGFloat,_ blue: CGFloat) -> CIFilter {
    let filter = CIFilter(name: "CIColorMonochrome")!
    filter.setValue(CIColor(red: red, green: green, blue: blue), forKey: "inputColor")
    filter.setValue(1.0, forKey: "inputIntensity")

    return filter
  }

  func rgbComponentsWithHexString(_ hexString: String) -> (CGFloat, CGFloat, CGFloat)  {
    var cString = hexString.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

    if cString.hasPrefix("#") { cString.removeFirst() }
   
    if cString.count != 6 {
      // return red color for wrong hex input
      return (red: 1.0, green: 0.0, blue: 0.0)
    }

    var rgbValue: UInt64 = 0
    Scanner(string: cString).scanHexInt64(&rgbValue)

        
    let red = CGFloat((rgbValue & 0xff0000) >> 16) / 255.0
    let green = CGFloat((rgbValue & 0xff00) >> 8) / 255.0
    let blue = CGFloat((rgbValue & 0xff) >> 0) / 255.0

    // Create color object, specifying alpha as well
    //let color = UIColor(red: red, green: green, blue: blue, alpha: alpha)
    return (red, green, blue)
  }

  // Tag: ARFaceAnchor Update
  func update(withFaceAnchor anchor: ARFaceAnchor) {
    let faceGeometry = geometry as! ARSCNFaceGeometry
    faceGeometry.update(from: anchor.geometry)
  }
}
