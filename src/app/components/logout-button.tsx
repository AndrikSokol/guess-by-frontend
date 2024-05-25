import React from "react";
import { UiButton } from "./ui/ui-button";
import { useLogout } from "../hooks/useLogout";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useQueryClient } from "@tanstack/react-query";

export const LogoutButton = () => {
  const { isPending, logout } = useLogout();

  const { data: user } = useAuthQuery();

  if (user) {
    return (
      <UiButton
        variant="outlined"
        disabled={isPending}
        onClick={() => logout()}
      >
        Logout
      </UiButton>
    );
  }
};
