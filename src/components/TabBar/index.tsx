import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constant";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { MyAnimatedText, MyText } from "../Text";
import { Inline, inlineStyle } from "../Inline";
import hexToRgba from "hex-to-rgba";
import Animated, { FadeInDown } from "react-native-reanimated";

const ICON_SIZE = heightPercentageToDP(3.4);
export const TAB_BAR_HEIGHT = heightPercentageToDP(7);

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isRadar = index == 2;

          const renderIcon = options.tabBarIcon;
          const tintColor = isFocused ? activeTintColor : inactiveTintColor;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Animated.View
              entering={FadeInDown.springify().delay(index * 140)}
              style={[
                styles.tab,

                isRadar
                  ? {
                      paddingHorizontal: widthPercentageToDP(11),
                      borderRadius: 17,
                    }
                  : null,
              ]}
              key={index}
            >
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onPress}
              >
                <Text
                  style={[
                    {
                      color: isFocused ? "#673ab7" : "#222",
                      textAlign: "center",
                    },
                  ]}
                >
                  {renderIcon && (
                    <View style={[styles.iconWrapper]}>
                      <View
                        style={[
                          isRadar
                            ? {
                                backgroundColor: isFocused
                                  ? hexToRgba(Colors.primary, 0.2)
                                  : undefined,

                                padding: 10,
                                paddingHorizontal: 30,
                                ...inlineStyle,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 17,
                                overflow: "hidden",
                              }
                            : null,
                        ]}
                      >
                        {renderIcon({
                          focused: isFocused,
                          color: tintColor || "#000",
                          size: ICON_SIZE,
                          ...(isRadar ? { color: Colors.primary } : {}),
                        })}
                      </View>
                    </View>
                  )}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 3,
  },
  container: {
    height: TAB_BAR_HEIGHT, // se non è specificato un valore in ios non funziona
    backgroundColor: Colors.backgroundDark,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
