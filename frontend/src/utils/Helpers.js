import { auth } from "../config/Firebase.config";
import {
  FaBehance,
  FaBolt,
  FaFacebook,
  FaLinkedin,
  FaListCheck,
} from "react-icons/fa6";
import { FaUserAlt, FaListAlt } from "react-icons/fa";
import { MdSportsBaseball } from "react-icons/md";
import {
  GiTrophy,
  GiTransportationRings,
  GiCardAceClubs,
} from "react-icons/gi";
import { TbTopologyStarRing3 } from "react-icons/tb";
import { BiLogoDiscordAlt, BiSolidJoystick } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";




export const baseURL = "http://127.0.0.1:5001/mobile-appstore-fce23/us-central1"



export const Menus = [
    { id: 10001, menu: "My Profile", uri: "/profile" },
    { id: 10002, menu: "My Favourites", uri: "/favourites" },
    { id: 10003, menu: "Dashboard", uri: "/admin/home", isAdmin: true },
    { id: 10004, menu: "Users", uri: "/admin/users", isAdmin: true },
    { id: 10005, menu: `App's`, uri: "/admin/apps", isAdmin: true },
  ];
  


  export const signOutUser = async (queryClient) => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);
    });
  };



  export const ClientMenus = [
    {
      title: "Sports",
      submenu: true,
      Icon: MdSportsBaseball,
      subMenuItems: [
        { title: "Free Match", Icon: GiTransportationRings },
        { title: "Live Sports", Icon: GiTrophy },
      ],
    },
    {
      title: "Casino",
      Icon: GiCardAceClubs,
      spacing: true,
    },
    {
      title: "Slot Games",
      Icon: TbTopologyStarRing3,
    },
    {
      title: "Virtual Games",
      Icon: BiSolidJoystick,
    },
    {
      title: "Mini Games",
      Icon: FaBolt,
    },
    {
      title: "Betting History",
      Icon: FaListAlt,
    },
    {
      title: "Community",
      Icon: FaUserAlt,
      spacing: true,
      submenu: true,
      subMenuItems: [
        { title: "Discord", Icon: BiLogoDiscordAlt },
        { title: "Linked In", Icon: FaLinkedin },
        { title: "Facebook", Icon: FaFacebook },
        { title: "Behnace", Icon: FaBehance },
      ],
    },
    {
      title: "Events List",
      Icon: FaListCheck,
    },
    {
      title: "Customer Services",
      Icon: RiCustomerService2Fill,
    },
  ];