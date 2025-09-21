import { ControllerApi } from "../generated-sources/openapi";

const API = new ControllerApi();

export const validateStatements = async (fileType: string) => {
  return await API.validateFileTypeGet({ fileType });
};
