"use server"
import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { UpdateLocationProps } from "@/types/location/location.action.type";
import { UpdateLocationResponse } from "@/types/location/location.response";

export const onUpdateLocation: UpdateLocationProps = async ({objid}) => {
  const endpoint = `${API_BASE_URL}/identity/locationByid?objid=${objid}`;

  return _get<UpdateLocationResponse>(endpoint, {
    requireAuth: true,
  });
};
