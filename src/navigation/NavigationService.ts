import { NavigationContainerRef, Route } from "@react-navigation/core";
import * as React from "react";

export const isReadyRef = React.createRef<boolean>();

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
  if (!isReadyRef.current || !navigationRef.current) return;
  navigationRef.current?.navigate(name, params);
}

export function getCurrentRoute() {
  if (!isReadyRef.current || !navigationRef.current) return;
  return navigationRef.current?.getCurrentRoute();
}

export function dispatch(payload: any) {
  if (!isReadyRef.current || !navigationRef.current) return;
  navigationRef.current?.dispatch(payload);
}
