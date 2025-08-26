"use server";
import { createServerFn } from "@tanstack/react-start";
import { managerLoginRetrieve } from "~/services/api";

const Authentication = createServerFn().handler(async () => {
  const { data, error } = await managerLoginRetrieve();
  console.log(data, error);
  return data;
});

export default Authentication;
