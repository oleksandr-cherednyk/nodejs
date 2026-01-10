export type Admin = {
  name: string;
  permissions: string[];
};

export type User = {
  name: string;
  email: string;
};

export type AdminUser = Admin & User;

export const adminUser: AdminUser = {
  name: "Ivan Pupkin",
  permissions: ["read", "write"],
  email: "ivan@e.com",
};
