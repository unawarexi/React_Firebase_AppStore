import React from "react";
import { Route } from "react-router-dom";
import DeviceInfo from "../libraries_devices/DeviceInfo";

// Placeholder components for each menu item (replace with actual components as needed)
const PaymentsSubscriptions = () => <div>Payments & Subscriptions Page</div>;
const MyPlayActivity = () => <div>My Play Activity Page</div>;
const Offers = () => <div>Offers Page</div>;
const PlayPass = () => <div>Play Pass Page</div>;
const Family = () => <div>Family Page</div>;
const Personalization = () => <div>Personalization in Play Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const SwitchAccount = () => <div>Switch Account Page</div>;
const MyProfile = () => <div>My Profile Page</div>;
const MyFavourites = () => <div>My Favourites Page</div>;

const HeaderRoutes = () => (
  <>
    <Route path="/library-devices" element={<DeviceInfo />} />
    <Route path="/payments-subscriptions" element={<PaymentsSubscriptions />} />
    <Route path="/my-play-activity" element={<MyPlayActivity />} />
    <Route path="/offers" element={<Offers />} />
    <Route path="/play-pass" element={<PlayPass />} />
    <Route path="/family" element={<Family />} />
    <Route path="/personalization" element={<Personalization />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/switch-account" element={<SwitchAccount />} />
    <Route path="/profile" element={<MyProfile />} />
    <Route path="/favourites" element={<MyFavourites />} />
  </>
);

export default HeaderRoutes;
