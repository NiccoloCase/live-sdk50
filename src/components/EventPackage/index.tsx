import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EventPackage as IEventPackage } from "../../generated/graphql";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constant";
import { MyText } from "../Text";
import { formatCurrency } from "../../helper/format";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Inline } from "../Inline";
import { getPackageTypeText } from "../../helper/ticketing/packages";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MIN_HEIGHT = heightPercentageToDP(18);

export const EventPackageCard: React.FC<{
  package: IEventPackage;
  hideButton?: boolean;
}> = ({ package: item, hideButton }) => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        style={styles.gradient}
      />
      <View style={styles.cardContent}>
        <Inline
          style={{
            justifyContent: "flex-start",
          }}
        >
          <View style={{ flex: 1, marginRight: 20 }}>
            <MyText bold size="big">
              {item.name}
            </MyText>
            {item.type && (
              <MyText bold mediumEmphasis size="small" style={{ marginTop: 5 }}>
                {getPackageTypeText(item.type).toUpperCase()}
              </MyText>
            )}

            <Inline>
              {!!(item.drinks && item.drinks > 0) && (
                <Inline style={styles.tagLine}>
                  <MaterialCommunityIcons
                    name="glass-cocktail"
                    size={heightPercentageToDP(2.4)}
                    color={Colors.mediumGrey}
                    style={{ marginRight: 5 }}
                  />
                  <MyText mediumEmphasis bold>
                    {item.drinks}
                  </MyText>
                </Inline>
              )}

              {!!item.skipLine && (
                <Inline style={styles.tagLine}>
                  <MaterialCommunityIcons
                    name="human-queue"
                    size={heightPercentageToDP(2.4)}
                    color={Colors.mediumGrey}
                    style={{ marginRight: 5 }}
                  />
                  <MyText mediumEmphasis size="small">
                    Saltafila
                  </MyText>
                </Inline>
              )}
            </Inline>
          </View>

          <View>
            {item.minAge && (
              <MyText
                bold
                mediumEmphasis
                size="title"
                style={{ textAlign: "right" }}
              >
                {item.minAge}+
              </MyText>
            )}
            {item.sex && (
              <MyText size="small" bold mediumEmphasis>
                {item.sex === "M" ? "Uomo" : item.sex === "F" ? "Donna" : ""}
              </MyText>
            )}
          </View>
        </Inline>

        <Inline style={{ paddingTop: heightPercentageToDP(1.6) }}>
          <View style={{ flex: 1 }}>
            {item.userPrice === 0 ? (
              <MyText bold color={Colors.whiteSmoke}>
                GRATUITO
              </MyText>
            ) : (
              <MyText
                style={{ fontSize: heightPercentageToDP(3.4) }}
                bold
                color={Colors.whiteSmoke}
              >
                {formatCurrency(item.currency)} {item.userPrice}
              </MyText>
            )}
          </View>
          {!hideButton && (
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 10,
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(1.4),
              }}
            >
              <MyText size="small" bold color={Colors.whiteSmoke}>
                Seleziona
              </MyText>
            </LinearGradient>
          )}
        </Inline>

        {item.soldout && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            ]}
          >
            <MyText bold size="big">
              SOLDOUT
            </MyText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 15,
    width: "85%",
    alignSelf: "center",
  },
  cardContent: {
    backgroundColor: Colors.backgroundLight,
    padding: heightPercentageToDP(2),
    margin: heightPercentageToDP(0.4),
    borderRadius: 15,
    minHeight: MIN_HEIGHT,
    justifyContent: "space-evenly",
  },
  tagLine: {
    marginRight: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(1.5),
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
  },
});
