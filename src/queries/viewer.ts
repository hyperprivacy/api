import { QueryResolvers } from "../types";

export const viewer: QueryResolvers.ViewerResolver = (
  parent,
  args,
  context,
  info
) => {
  return new Promise(resolve => {
    resolve({
      email: "",
      firstname: "",
      id: "",
      lastname: "",
      username: "sdf"
    });
  });
};
