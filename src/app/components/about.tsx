"use client";

import React from "react";
import { useIntl } from "react-intl";

export const About = () => {
  const intl = useIntl();
  return (
    <div className="p-2 border-yellow-300 bg-white rounded-sm">
      <h2 className="text-center text-2xl p-2 ">
        {intl.formatMessage({ id: "about_game" })}
      </h2>
      <p className="text-lg   ">{intl.formatMessage({ id: "about_text" })}</p>
    </div>
  );
};
