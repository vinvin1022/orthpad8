// import { StatusBar } from "expo-status-bar";

// import { Slot, useNavigation } from "expo-router";
// import { Stack } from "expo-router/stack";

// export default function RootLayout() {

//   return (
//     <>
//       <Stack
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: "#ccceee",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//         }}
//       >
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="details"
//           options={{
//             headerStyle: {
//               backgroundColor: "#11221e",
//             },
//           }}
//         />
//         <Stack.Screen
//           name="content"
//           options={{
//             headerStyle: {
//               backgroundColor: "#19921e",
//             },
//           }}
//         />

//         <Stack.Screen
//           name="modal"
//           options={{
//             // Set the presentation mode to modal for our modal route.
//             presentation: "modal",
//           }}
//         />
//       </Stack>
//       <StatusBar style="light" />
//     </>
//   );
// }

import {
  Redirect,
  Slot,
  Stack,
  useLocalSearchParams,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import {Text} from "react-native"
import { SessionProvider } from "./ctx";
import TopBars from "../components/TopBars";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";

export default function Root() {
  console.log("Root");

  // const route = useRoute();
  // console.log(`route: ${route}`); // 获取当前路由名
  // const navigation = useNavigation();
  // console.log(`navigation: ${JSON.stringify(navigation)}`); // 获取当前路由名

  // const currentIndex = useNavigationState((state) => state);
  // console.log(`Current route index: ${JSON.stringify(currentIndex)}`);


  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, []);
  // const pathname = usePathname();
  // console.log(`pathnamelayout: ${pathname}`);

  // Set up the auth context and render our layout inside of it.
  return (
    <>
      {/* <Redirect href="/login" /> */}
      {/* {pathname !== "/login" &&  <TopBars />} */}
      <TopBars />
      <Slot />
      {/* <Stack /> */}
      {/* <Stack screenOptions={{animation: "none"}}>
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            animation: "none"
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="homePage/index"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="systemScreen/index"
          options={{
            headerShown: false,
            headerTitle: "系统设置",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="queryScreen/index"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="locationFastScreen/index"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="locationScreen/index"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack> */}
      <StatusBar hidden={true} style="light" />
    </>
    // <Redirect href="/login" />
    // <SessionProvider>
    //   {/* <Slot /> */}
    //   <Stack>
    //   <Stack.Screen
    //       name="(app)"
    //       options={{
    //         // Set the presentation mode to modal for our modal route.
    //         headerShown: false,
    //       }}
    //     />

    //   </Stack>
    // </SessionProvider>
  );
}
