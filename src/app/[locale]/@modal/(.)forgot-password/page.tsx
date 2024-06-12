"use client";

import { ForgotPasswordForm } from "@/app/components/forgot-password-form";
import { UiModal } from "@/app/components/ui/ui-modal";

const Page = () => {
  return <UiModal content={<ForgotPasswordForm />}></UiModal>;
};

export default Page;
