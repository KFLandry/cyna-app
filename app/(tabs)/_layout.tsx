import HeaderBar from "@/components/HeaderBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
      <HeaderBar />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="(home)/index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="(products)/index"
          options={{
            title: "Products",
          }}
        />

        <Tabs.Screen
          name="(plans)/index"
          options={{
            title: "Plans",
          }}
        />
      </Tabs>
    </>
  );
}
