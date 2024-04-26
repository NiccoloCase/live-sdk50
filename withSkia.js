const plugins = require("expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");
const path = require("path");
const fs = require("fs");

module.exports = function withSkia(config) {
  return plugins.withDangerousMod(config, [
    "ios",
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      const contents = fs.readFileSync(filePath, "utf-8");

      const preinstallSkia = mergeContents({
        tag: "skia",
        src: contents,
        newSrc: [
          `pre_install do |installer|`,
          `Pod::Installer::Xcode::TargetValidator.send(:define_method, :verify_no_static_framework_transitive_dependencies) {}`,
          `installer.pod_targets.each do |pod|`,
          `bt = pod.send(:build_type)`,
          `if ['React','react-native-skia/Api','react-native-skia/Jsi','react-native-skia/RNSkia','react-native-skia/SkiaHeaders','react-native-skia/Utils','react-native-skia','hermes-engine','React-hermes', 'hermes/hermes'].include?(pod.name)`,
          `puts "Overriding the build_type to static_library from static_framework for #{pod.name}"`,
          `def pod.build_type;`,
          `Pod::BuildType.static_library`,
          `end`,
          `end`,
          `end`,
          `installer.pod_targets.each do |pod|`,
          `bt = pod.send(:build_type)`,
          `puts "#{pod.name} (#{bt})"`,
          `puts "  linkage: #{bt.send(:linkage)} packaging: #{bt.send(:packaging)}"`,
          `end`,
          `end`,
        ].join("\n"),
        anchor: "flags = get_default_flags()",
        offset: 0,
        comment: "#",
      });

      fs.writeFileSync(filePath, preinstallSkia.contents);

      return config;
    },
  ]);
};
