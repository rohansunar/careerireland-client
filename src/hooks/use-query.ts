import { apiUrl } from "@/util/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import revalidateTag from "@/util/revalidate-tag";
import { failed, success } from "@/util/tools";

// ..................Auth...................................

export const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await axios.post(`${apiUrl}/user/register`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        "Your account has been registered please verify the account",
        success
      );

      router.push(`/auth/verify?token=${data.token}`);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
        ...failed,
      });
    },
  });
};
export const useRemoveAccount = () => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Your account has been removed sucessfully", success);

      signOut({
        redirect: true,
        callbackUrl: "/",
      });
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        ...failed,
      });
    },
  });
};
export const useEditPasswordAccount = () => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (data: { password: string }) => {
      const res = await axios.patch(`${apiUrl}/user`, data, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        "Password changed successfully. Please log in again with your new password",
        success
      );

      setTimeout(() => {
        signOut({
          redirect: true,
          callbackUrl: "/auth/login",
        });
      }, 5000);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        ...failed,
      });
    },
  });
};
export const useVerify = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { token: string; otp: string }) => {
      const res = await axios.post(`${apiUrl}/user/verify`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        "Your account has been successfully verified. Please log in to your account.",
        success
      );

      router.push(`/auth/login`);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        ...failed,
      });
    },
  });
};
export const useResendOTP = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { token: string }) => {
      const res = await axios.post(`${apiUrl}/otp/resend`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("New Otp send to registered email", success);

      router.push(`/auth/verify?token=${data.token}`);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        ...failed,
      });
    },
  });
};

export const useContactUs = () => {
  return useMutation({
    mutationFn: async (data: TContactUs) => {
      const res = await axios.post(`${apiUrl}/contact-us`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        "Your query has been registered we will get back to you with in 24 hours."
      );
      //   console.log(data)
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
      });
    },
  });
};

//  .......Review...................

export const useReview = () => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (data: {
      message: string;
      mentorId: string;
      rating: number;
    }) => {
      const res = await axios.post(`${apiUrl}/review`, data, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      revalidateTag(["reviews", data.mentorId]);
      toast.success("Your review has been submitted sucessfully");
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
      });
    },
  });
};

// ...............Payments .......................
// NEW UNIFIED PAYMENT ENDPOINTS

export const usePackage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { packageId: string }) => {
      const res = await axios.post(
        `${apiUrl}/v2/payment/create`,
        {
          serviceType: "service",
          serviceId: data.packageId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
      });
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const usePackageOld = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: { packageId: string }) => {
//       const res = await axios.post(`${apiUrl}/payment/package`, data, {
//         headers: {
//           Authorization: `Bearer ${session?.backendTokens.accessToken}`,
//         },
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, {
//         description: "Please try after few min",
//       });
//     },
//   });
// };
export const useMentorService = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { serviceId: string }) => {
      const res = await axios.post(
        `${apiUrl}/v2/payment/create`,
        {
          serviceType: "service",
          serviceId: data.serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
      });
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useMentorServiceOld = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: { serviceId: string }) => {
//       const res = await axios.post(`${apiUrl}/payment/mentor-service`, data, {
//         headers: {
//           Authorization: `Bearer ${session?.backendTokens.accessToken}`,
//         },
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, {
//         description: "Please try after few min",
//       });
//     },
//   });
// };
export const useImmigrationService = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { immigration_serviceId: string }) => {
      const res = await axios.post(
        `${apiUrl}/v2/payment/create`,
        {
          serviceType: "immigration",
          serviceId: data.immigration_serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
      });
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useImmigrationServiceOld = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: { immigration_serviceId: string }) => {
//       const res = await axios.post(
//         `${apiUrl}/payment/immigration-service`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${session?.backendTokens.accessToken}`,
//           },
//         }
//       );
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, {
//         description: "Please try after few min",
//       });
//     },
//   });
// };

export const useTraining = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { trainingId: string }) => {
      const res = await axios.post(
        `${apiUrl}/v2/payment/create`,
        {
          serviceType: "training",
          serviceId: data.trainingId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        description: "Please try after few min",
      });
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useTrainingOld = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: { trainingId: string }) => {
//       const res = await axios.post(`${apiUrl}/payment/training`, data, {
//         headers: {
//           Authorization: `Bearer ${session?.backendTokens.accessToken}`,
//         },
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, {
//         description: "Please try after few min",
//       });
//     },
//   });
// };
// ...............Guest .......................

export const useGuestPackage = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IGuestPurchase) => {
      const { id, mobile_no: mobileNo, ...result } = data;
      const res = await axios.post(`${apiUrl}/v2/payment/guest`, {
        name: result.name,
        email: result.email,
        mobile: mobileNo,
        serviceType: "service",
        serviceId: id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, failed);
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useGuestPackageOld = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: IGuestPurchase) => {
//       const { id, ...result } = data;
//       const res = await axios.post(`${apiUrl}/payment/guest-package`, {
//         ...result,
//         packageId: id,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, failed);
//     },
//   });
// };

export const useGuestMentorService = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IGuestPurchase) => {
      const { id, mobile_no: mobileNo, ...result } = data;
      const res = await axios.post(`${apiUrl}/v2/payment/guest`, {
        name: result.name,
        email: result.email,
        mobile: mobileNo,
        serviceType: "service",
        serviceId: id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, failed);
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useGuestMentorServiceOld = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: IGuestPurchase) => {
//       const { id, ...result } = data;
//       const res = await axios.post(`${apiUrl}/payment/guest-service`, {
//         ...result,
//         serviceId: id,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, failed);
//     },
//   });
// };
export const useGuestImmigrationService = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IGuestPurchase) => {
      const { id, mobile_no: mobileNo, ...result } = data;
      const res = await axios.post(`${apiUrl}/v2/payment/guest`, {
        name: result.name,
        email: result.email,
        mobile: mobileNo,
        serviceType: "immigration",
        serviceId: id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, failed);
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useGuestImmigrationServiceOld = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: IGuestPurchase) => {
//       const { id, ...result } = data;
//       const res = await axios.post(`${apiUrl}/payment/guest-immigration`, {
//         ...result,
//         immigration_serviceId: id,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, failed);
//     },
//   });
// };

export const useGuestTrainingService = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IGuestPurchase) => {
      const { id, mobile_no: mobileNo, ...result } = data;
      const res = await axios.post(`${apiUrl}/v2/payment/guest`, {
        name: result.name,
        email: result.email,
        mobile: mobileNo,
        serviceType: "training",
        serviceId: id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, failed);
    },
  });
};

// OLD ENDPOINT - KEPT FOR ROLLBACK (UNUSED)
// export const useGuestTrainingServiceOld = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationFn: async (data: IGuestPurchase) => {
//       const { id, ...result } = data;
//       const res = await axios.post(`${apiUrl}/payment/guest-training`, {
//         ...result,
//         trainingId: id,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       router.push(data.url);
//     },
//     onError: (error) => {
//       // @ts-ignore
//       toast.error(error.response.data.message, failed);
//     },
//   });
// };

// ............... Password.......................

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await axios.post(`${apiUrl}/password/forgot-password`, data);
      return res.data;
    },
    onSuccess: (data) => {
      // router.push(data.url);

      toast.success(data.message, success);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        ...failed,
      });
    },
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: { password: string; token: string }) => {
      const res = await axios.post(`${apiUrl}/password/reset-password`, data);
      return res.data;
    },
    onSuccess: (data) => {
      // router.push(data.url);

      toast.success(data.message, success);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, {
        ...failed,
      });
    },
  });
};

// ...............Comment .......................

export const useComment = () => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (data: {
      content: string;
      blogId: string;
      parentId?: string;
    }) => {
      const res = await axios.post(`${apiUrl}/comment`, data, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      revalidateTag(["comments", data.id]);
      toast.success("Your comment has been submitted sucessfully", success);
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error.response.data.message, failed);
    },
  });
};

// for fetch applications in immigration
export const useImmApplication = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["immigration-applications"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/applications`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      return res.data;
    },
    enabled: !!session?.backendTokens?.accessToken, // only fetch after session is ready
  });
};

export const useImmApplicationId = (id: string | undefined) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["immigration-applications", id],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      return res.data;
    },
    enabled: !!session?.backendTokens?.accessToken && !!id,
  });
};

export interface FieldData {
  fieldName: string;
  fieldValue: string;
}

export interface StepFormData {
  stageOrder: number;
  fields: FieldData[];
}

export interface SubmissionPayload {
  applicationId: string;
  formData: StepFormData[];
  currentStep: string;
}

export const useSubmitApplicationStep = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      applicationId,
      formData,
      currentStep,
    }: SubmissionPayload) => {
      const res = await axios.put(
        `${apiUrl}/applications/${applicationId}`,
        {
          formData,
          currentStep,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      return res.data;
    },
  });
};

interface Submissiondoc {
  applicationId: string;
  documentName: string;
  file: File | string;
  stageOrder: string;
}

export const useSubmitApplicationDocument = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      applicationId,
      documentName,
      file,
      stageOrder,
    }: Submissiondoc) => {
      const formData = new FormData();
      formData.append("document_name", documentName);
      formData.append("file", file);
      formData.append("stage_order", stageOrder);

      const res = await axios.put(
        `${apiUrl}/applications/${applicationId}/document`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        }
      );
      return res.data;
    },
  });
};
