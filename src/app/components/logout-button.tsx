"use client";

import React from "react";
import { UiButton } from "./ui/ui-button";
import { useLogout } from "../hooks/useLogout";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useIntl } from "react-intl";

export const LogoutButton = () => {
  const intl = useIntl();
  const { isPending, logout } = useLogout();

  const { data: user } = useAuthQuery();

  if (user) {
    return (
      <UiButton
        variant="outlined"
        disabled={isPending}
        onClick={() => logout()}
      >
        {intl.formatMessage({ id: "logout" })}
      </UiButton>
    );
  }
};
