import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
{
  id: "datatable",
  icon: "iconsminds-shop",
  label: "menu.datatable",
  to: `${adminRoot}/datatableCustomer`,
  subs: [
    {
      icon: "simple-icon-paper-plane",
      label: "menu.customerTable",
      to: `${adminRoot}/datatableCustomer/customerTable`,
      // roles: [UserRole.Admin, UserRole.Editor],
    },
    {
      icon: "simple-icon-paper-plane",
      label: "menu.projectTable",
      to: `${adminRoot}/datatableCustomer/projectTable`,
      // roles: [UserRole.Admin, UserRole.Editor],
    },
  ]
}
];
export default data;
