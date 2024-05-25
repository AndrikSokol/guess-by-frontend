import { ROUTES } from "@/app/constants/routes";
import { useAuthQuery } from "@/app/hooks/useAuthQuery";
import { useRouter } from "next/navigation";
import { PropsWithChildren, ReactElement } from "react";

export function protectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter();

    const { isError, isLoading } = useAuthQuery();

    if (isLoading) {
      return <div>loading</div>;
    }

    if (isError) {
      router.replace(ROUTES.LOGIN);
    }

    return <Component {...props} />;
  };
}
