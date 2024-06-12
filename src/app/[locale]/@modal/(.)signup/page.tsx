import React from "react";
import { UiModal } from "@/app/components/ui/ui-modal";
import { SignUpForm } from "@/app/components/sign-up-form";

const page = () => {
  return <UiModal content={<SignUpForm />} />;
};

export default page;
