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
  ]
}
];
export default data;
