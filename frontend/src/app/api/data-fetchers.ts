import { DefaultApi } from "../generated-sources/openapi";

const API = new DefaultApi();

export const validateStatements = async (fileType: string) => {
  return await API.validateFileTypeGet({ fileType });
};
