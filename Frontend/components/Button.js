import { TouchableOpacity, View, Text, Image } from "react-native";
import { Colors } from "../styles";

export default function Button({
  flexDirection,
  paddingHorizontal,
  paddingVertical,
  borderColor,
  borderRadius,
  backgroundColor,
  color,
  width,
  height,
  path,
  fontWeight,
  marginTop,
  marginBottom,
  text,
  onPress
}) {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: borderColor || "white",
        alignSelf: "center",
        width: width || "fit-content",
        height: height || "fit-content",
        backgroundColor: backgroundColor || "white",
        borderRadius: borderRadius || 50,
        paddingHorizontal: paddingHorizontal || 20,
        paddingVertical: paddingVertical || 10,
        marginTop: marginTop || 0,
        marginBottom: marginBottom || 0,
        flexDirection: flexDirection || "column",
      }}
    >
      <View style = {{alignSelf:"center"}}>
        <Text
          style={{
            color: color || Colors.primayrGreen,
            fontWeight: fontWeight || 700,
          }}
        >
          {text}
        </Text>
        {path && (
          <Image
            source={path}
            style={{
              width: IconWidth || 20,
              heght: IconHeight || 20,
              resizeMode: "contain",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
