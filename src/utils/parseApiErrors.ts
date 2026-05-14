import { AxiosError } from "axios";
import { GenericErrorModel } from "types";

export function parseApiErrors(err: unknown): string[] {
  const axiosErr = err as AxiosError<GenericErrorModel>;
  const body = axiosErr.response?.data?.errors?.body;
  return body?.length ? body : ["Something went wrong. Please try again."];
}
