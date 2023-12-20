import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WithAuth(Component: any) {
  return function WithAuthComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session) router.push("/auth/login"); // If not authenticated, force log in
    }, [session, status, router]);

    if (session) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
}
