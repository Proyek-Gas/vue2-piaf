import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
{
  id: "datatable",
  icon: "iconsminds-shop",
  label: "menu.datatable",
  to: `${adminRoot}/datatable`,
  subs: [{
    icon: "simple-icon-paper-plane",
    label: "menu.customerTable",
    to: `${adminRoot}/datatable/customerTable`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: "simple-icon-paper-plane",
    label: "menu.projectTable",
    to: `${adminRoot}/datatable/projectTable`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: "simple-icon-paper-plane",
    label: "menu.schemeTable",
    to: `${adminRoot}/datatable/schemeTable`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: "simple-icon-paper-plane",
    label: "menu.itemTable",
    to: `${adminRoot}/datatable/itemTable`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: "simple-icon-paper-plane",
    label: "menu.quoteTable",
    to: `${adminRoot}/datatable/quoteTable`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: "simple-icon-paper-plane",
    label: "menu.userTable",
    to: `${adminRoot}/datatable/userTable`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  ]
}
];
export default data;
