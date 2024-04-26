import React, { useEffect, useMemo } from "react";
import {
  Button,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Colors } from "../../constant";
import { MyText } from "..//Text";
import { Inline } from "../Inline";
import Feather from "@expo/vector-icons/Feather";
import { formatShortDay, formatTime } from "../../helper/format";
import { Event, EventType, useWhoamiQuery } from "../../generated/graphql";
import { PulseSpinner } from "../../components/Spinner/PulseSpinner";
import { mediumEmphasisOpacity } from "../../constant/typography";
import { Ticket } from "../../generated/graphql";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";
import { DottedLine } from "../DottedLine";
import { getPackageTypeText } from "../../helper/ticketing";
import AnimatedLottieView from "lottie-react-native";
import { getSocket } from "../../helper/socket";
import { cache } from "../../graphql/cache";
import { store } from "../../store";

interface TicketCardProps {
  ticket?: Ticket;
}

const HOLE_RADIUS = heightPercentageToDP(2.7);

const _MyQrCode: React.FC<{
  code: string;
  revoked?: boolean;
  used?: boolean;
}> = ({ code, revoked, used }) => {
  return (
    <QRCode
      value={code}
      size={widthPercentageToDP(40)}
      linearGradient={
        used || revoked
          ? [Colors.mediumGrey, Colors.mediumGrey]
          : [Colors.primary, Colors.secondary]
      }
      enableLinearGradient={true}
      backgroundColor="#fff"
      logo={require("../../../assets/images/rounded.png")}
    />
  );
};

const MyQrCode = React.memo(_MyQrCode, (prev, next) => {
  return (
    prev.code === next.code &&
    prev.revoked === next.revoked &&
    prev.used === next.used
  );
});

const _TicketPreviewCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { data: me } = useWhoamiQuery({});
  const [success, setSuccess] = React.useState(false);

  const event = ticket?.eventInfo?.event;

  const generateTicketCode = (ticketId: string, ticketCode: string) => {
    return `ticketId=${ticketId}&ticketCode=${ticketCode}`;
  };

  const code = useMemo(() => {
    if (ticket?.code && ticket?.id)
      return generateTicketCode(ticket?.id, ticket?.code);
    else return null;
  }, [ticket]);

  const renderQR = () => {
    if (code && ticket?.code && ticket.id)
      return (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 20,
                padding: widthPercentageToDP(3),
              }}
            >
              <MyQrCode
                code={code}
                revoked={ticket.revoked || false}
                used={ticket.used || false}
              />
            </View>
            {ticket.revoked ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MyText size="small" chainprinter color={Colors.red}>
                  BIGLIETTO REVOCATO
                </MyText>
              </View>
            ) : ticket.used ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MyText size="small" chainprinter color={Colors.red}>
                  BIGLIETTO USATO
                </MyText>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MyText size="small" chainprinter dark mediumEmphasis>
                  {ticket?.code}
                </MyText>
              </View>
            )}

            {me?.whoami.lastName && me?.whoami.firstName && (
              <Inline style={{ marginTop: heightPercentageToDP(1.5) }}>
                <Feather
                  name="user-check"
                  size={heightPercentageToDP(2.5)}
                  color={Colors.darkGrey}
                />
                <MyText
                  chainprinter
                  dark
                  size="small"
                  style={{ marginLeft: 10 }}
                >
                  {me?.whoami.firstName + " " + me?.whoami.lastName}
                </MyText>
              </Inline>
            )}
          </View>
        </>
      );
    else
      return (
        <View
          style={{
            padding: widthPercentageToDP(4),
            backgroundColor: "#fff",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: widthPercentageToDP(75),
              aspectRatio: 1,
              backgroundColor: Colors.backgroundPrimary,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!ticket ? (
              <PulseSpinner />
            ) : (
              <>
                <MyText size="small" bold dark>
                  Biglietto non trovato
                </MyText>

                <MyText
                  size="small"
                  dark
                  style={{
                    marginTop: heightPercentageToDP(1.5),
                    paddingHorizontal: widthPercentageToDP(10),
                  }}
                  mediumEmphasis
                >
                  E' possibile che il biglietto non sia ancora stato generato o
                  sia stato revocato dell'organizzatore
                </MyText>
              </>
            )}
          </View>
        </View>
      );
  };

  const renderSuccess = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedLottieView
          source={require("../../../assets/lottie/dark-success.json")}
          autoPlay
          loop={false}
          style={{
            width: widthPercentageToDP(60),
            aspectRatio: 1,
            marginBottom: heightPercentageToDP(5),
          }}
        />

        <Animated.View
          entering={FadeInUp.springify().duration(500)}
          exiting={FadeOutDown}
        >
          <MyText size="title" bold dark>
            Benvenuto!
          </MyText>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.springify().duration(500).delay(200)}
          exiting={FadeOutDown}
          style={{ marginTop: heightPercentageToDP(1.5) }}
        >
          <MyText size="big" dark>
            Ti stavamo aspettando
          </MyText>
        </Animated.View>
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <MyText chainprinter size="title" dark>
          {event?.title}
        </MyText>
        <View style={{}}>
          {event?.eventType === EventType.Private && (
            <Inline style={{ marginTop: heightPercentageToDP(1.5) }}>
              <Feather
                name="alert-circle"
                size={heightPercentageToDP(2.5)}
                color={Colors.darkGrey}
                style={{ opacity: mediumEmphasisOpacity }}
              />
              <MyText
                chainprinter
                color={Colors.red}
                mediumEmphasis
                style={{ marginLeft: 10 }}
              >
                Evento privato
              </MyText>
            </Inline>
          )}

          {event?.location?.locationText && (
            <Inline style={{ marginTop: heightPercentageToDP(1.5) }}>
              <Feather
                name="map-pin"
                size={heightPercentageToDP(2.5)}
                color={Colors.darkGrey}
                style={{ opacity: mediumEmphasisOpacity }}
              />
              <MyText
                chainprinter
                dark
                mediumEmphasis
                style={{ marginLeft: 10 }}
              >
                {event.location?.locationText}
              </MyText>
            </Inline>
          )}
          {event?.date && (
            <Inline style={{ marginTop: heightPercentageToDP(1.5) }}>
              <Feather
                name="clock"
                size={heightPercentageToDP(2.5)}
                color={Colors.darkGrey}
                style={{ opacity: mediumEmphasisOpacity }}
              />
              <MyText
                dark
                chainprinter
                mediumEmphasis
                style={{ marginLeft: 10 }}
              >
                {formatShortDay(event.date, true)} - {formatTime(event.date)}
              </MyText>
            </Inline>
          )}
        </View>

        <View>
          <DottedLine />

          <View
            style={{
              paddingVertical: heightPercentageToDP(4),
            }}
          >
            {ticket?.eventInfo?.package && (
              <>
                {ticket?.eventInfo?.package?.type && (
                  <MyText
                    dark
                    size="small"
                    mediumEmphasis
                    chainprinter
                    style={{ marginBottom: 5 }}
                  >
                    {getPackageTypeText(ticket?.eventInfo?.package?.type)}
                  </MyText>
                )}
                <MyText dark chainprinter>
                  {ticket?.eventInfo?.package?.name}
                </MyText>
              </>
            )}
          </View>

          <View>
            <DottedLine />

            <View
              style={{
                position: "absolute",
                backgroundColor: Colors.backgroundDark,
                top: -HOLE_RADIUS,
                left: -HOLE_RADIUS * 2 - heightPercentageToDP(0.8),
                height: HOLE_RADIUS * 2,
                aspectRatio: 1,
                borderRadius: HOLE_RADIUS,
              }}
            />

            <View
              style={{
                position: "absolute",
                backgroundColor: Colors.backgroundDark,
                top: -HOLE_RADIUS,
                right: -HOLE_RADIUS * 2 - heightPercentageToDP(0.8),
                height: HOLE_RADIUS * 2,
                aspectRatio: 1,
                borderRadius: HOLE_RADIUS,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (success) return renderSuccess();

    return (
      <>
        {renderInfo()}

        {renderQR()}
      </>
    );
  };

  return (
    <>
      <View style={styles.card}>{renderContent()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,

    paddingHorizontal: Math.max(widthPercentageToDP(6), HOLE_RADIUS),
    paddingVertical: heightPercentageToDP(5),
  },
});

export const TicketPreviewCard = React.memo(
  _TicketPreviewCard,
  (prev, next) => {
    return (
      prev.ticket?.id === next.ticket?.id &&
      prev.ticket?.used === next.ticket?.used &&
      prev.ticket?.revoked === next.ticket?.revoked
    );
  }
);
