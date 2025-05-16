import HeaderBar from "@/components/HeaderBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
      <HeaderBar />

      <Tabs screenOptions={{ headerShown: false  }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
          }}
        />
        <Tabs.Screen
          name="plans"
          options={{
            title: "Plans",
          }}
        />
      </Tabs>
    </>
  );
}
