export const roles = {
  user: {
    canAccessDashboard: true,
    canCreateProperty: false,
    canEditProperty: false,
  },
  host: {
    canAccessDashboard: true,
    canCreateProperty: true,
    canEditProperty: true,
  },
  admin: {
    canAccessDashboard: true,
    canCreateProperty: true,
    canEditProperty: true,
  },
};

// Una función que toma el nombre del rol y el permiso deseado como parámetros y devuelve si el rol tiene el permiso
export const hasPermission = (role, permission) => {
  return roles[role][permission];
};
