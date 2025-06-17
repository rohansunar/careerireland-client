/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { apiUrl } from "@/util/urls";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const SignOut = () => {
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const userRes = await fetch(apiUrl + "/user", {
          headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        });
        if (userRes.status === 401) {
          signOut({
            redirect: true,
            callbackUrl: "/",
          });
        }
      };
      fetchData();
    }
  }, [session]);
  return <></>;
};

export default SignOut;
