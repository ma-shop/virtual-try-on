require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "ma-shop-virtual-try-on"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://MAMobileTeam@dev.azure.com/MAMobileTeam/ma-shop-virtual-try-on/_git/ma-shop-virtual-try-on" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.resource_bundles = {
      'MakeupAssets' => ['ios/Makeup.scnassets'],
      'MASVirtualTryOn' => ['ios/MASVirtualTryOn.storyboard']
   }

  s.dependency "React-Core"
end
