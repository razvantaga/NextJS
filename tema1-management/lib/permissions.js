export const permissionsByRole = {
  admin: {
    allowed: [
      "View all contracts across the workspace",
      "Create new contracts",
      "Edit contracts",
      "Delete contracts",
      "Manage team members and roles",
      "Export contracts to PDF and Excel",
    ],
    denied: ["Manage billing and subscription"],
  },

  manager: {
    allowed: [
      "View all contracts across the workspace",
      "Create new contracts",
      "Edit contracts",
      "Export contracts to PDF and Excel",
    ],
    denied: [
      "Delete contracts",
      "Manage team members and roles",
      "Manage billing and subscription",
    ],
  },

  user: {
    allowed: ["View contracts assigned to you"],
    denied: [
      "Create new contracts",
      "Edit contracts",
      "Delete contracts",
      "Manage team members and roles",
      "Export contracts to PDF and Excel",
      "Manage billing and subscription",
    ],
  },
};
