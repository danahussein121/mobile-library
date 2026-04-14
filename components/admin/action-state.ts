export type AdminActionState = {
  status: "idle" | "success" | "error";
  message: string;
  liveMessage?: string;
};

export const initialAdminActionState: AdminActionState = {
  status: "idle",
  message: "",
};
