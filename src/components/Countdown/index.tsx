import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { isDate } from "lodash";
import { timeBetweenDates } from "../../helper/format";

export interface CoutdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  startDate: Date;
  endDate?: Date;
  onEnd?: () => void;
  render?: (
    state: CoutdownState,
    isStarted: boolean,
    isEnded: boolean
  ) => React.ReactElement | null;
}

export const Countdown: React.FC<CountdownProps> = ({
  startDate,
  endDate,
  render,
  onEnd,
}) => {
  const [coutdown, setCoutdown] = useState<CoutdownState | null>(null);

  useEffect(() => {
    // cowntdown
    updateCoutdown();
    const interval = setInterval(() => {
      updateCoutdown();
    }, 500);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const updateCoutdown = () => {
    if (!isDate(new Date(startDate))) return;
    const res = timeBetweenDates(startDate, true);

    if (
      res.days <= 0 &&
      res.hours <= 0 &&
      res.minutes <= 0 &&
      res.seconds <= 0
    ) {
      onEnd && onEnd();
    }

    setCoutdown(res);
  };

  const isStarted = Number(startDate) - Number(new Date()) <= 0;
  const isEnded =
    (!!endDate && Number(endDate) - Number(new Date()) <= 0) ||
    Number(new Date()) - Number(new Date(startDate)) >= 60 * 60 * 3 * 1000;

  if (!coutdown) return null;

  return (
    (typeof render === "function"
      ? render(coutdown, isStarted, isEnded)
      : null) || null
  );
};

const styles = StyleSheet.create({});
