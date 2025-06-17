import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { apiUrl } from "@/util/urls";
import { getServerSession } from "next-auth";

export const getReviews = async (id: string) => {
  const res = await fetch(`${apiUrl}/review/${id}?page=0&limit=0`, {
    next: {
      tags: ["reviews", id],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as IReview[];
  }

  return [];
};
export const getMentorByName = async (name: string) => {
  const res = await fetch(`${apiUrl}/mentor/by/${name}`, {
    next: {
      tags: ["mentor-name", name],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as TMentorInfo;
  }
  return null;
};
export const getProfile = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${apiUrl}/user`, {
    headers: {
      Authorization: `Bearer ${session?.backendTokens.accessToken}`,
    },
    next: {
      tags: ["profile"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as IProfile;
  }

  return undefined;
};

export const getGoogleReviews = async () => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_API_KEY}`,
    {
      next: {
        tags: ["google-reviews"],
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    const reviews: IGoogleReview[] = data.result?.reviews;
    return reviews?.filter((item) => item?.rating > 3) || [];
  }

  return [];
};

export const serverSignout = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const userRes = await fetch(apiUrl + "/user", {
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });
    if (userRes.status === 401) {
      await fetch(process.env.NEXTAUTH_URL + "/api/sign-out");
      return null;
    }
  }

  return null;
};

export const getCustomerReviews = async () => {
  const res = await fetch(`${apiUrl}/customer-review?page=0&limit=0`, {
    next: {
      tags: ["customer-reviews"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as ICustomerReview[];
  }

  return [];
};
