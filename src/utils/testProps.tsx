import { Platform } from "react-native";

export const testProps = (id: string) => {
  if (Platform.OS === "android") {
    return { accessibilityLabel: id };
  } else {
    return { testID: id };
  }
};
