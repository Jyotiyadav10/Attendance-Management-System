import api from "./api";
import { Setting } from "@/types/setting";

interface GetSettingsResponse {
  success: boolean;
  settings: Setting;
}

interface UpdateSettingsResponse {
  success: boolean;
  message: string;
  settings: Setting;
}

export const getSettings =
  async (): Promise<GetSettingsResponse> => {
    const response = await api.get("/settings");
    return response.data;
  };

export const updateSettings = async (
  data: Setting
): Promise<UpdateSettingsResponse> => {
  const response = await api.put("/settings", data);
  return response.data;
};