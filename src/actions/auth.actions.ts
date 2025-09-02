"use server";

import { Account, Profile, User } from "next-auth";

import { signIn, signOut as authSignOut } from "@/auth";
import toast from "@/components/global/toast";
import { API_BASE_URL, API_GATEWAY_URL } from "@/environment";
import handleError from "@/lib/handlers/error";
import { _get, _patch, _post, _put } from "@/lib/handlers/fetch";
import { encryptPassword } from "@/lib/utils/auth";
import {
  ConfirmIdentity,
  GenerateToken,
  GetAccount,
  GetGooglePermission,
  RefreshToken,
  ResetPassword,
  SendEmailVerificationCode,
  SendMobileVerificationCode,
  SignIn,
  SignInWithCredentials,
  SignUp,
  UpdateEmail,
  VerifyCode,
  VerifyMobile,
} from "@/types/auth/auth.action.types";
import { SignOut } from "@/types/auth/auth.params";
import {
  GetAccountResponse,
  RefreshTokenResponse,
} from "@/types/auth/auth.response";
import { ErrorResponse } from "@/types/global";

export const onSignInWithCredentials: SignInWithCredentials = async ({
  payload,
}) => {
  const { email, password } = payload;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const onSignUp: SignUp = async ({ payload }) => {
  return _post(`${API_BASE_URL}/identity/signup`, payload);
};

export const onSignOut: SignOut = async () => {
  try {
    await authSignOut({ redirectTo: "/" });
  } catch (error) {
    handleError(error);
  }
};

export const onConfirmIdentity: ConfirmIdentity = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/identity/confirmIdentity`;
  return _post(endpoint, payload);
};

export const onSendMobileVerificationCode: SendMobileVerificationCode = async ({
  payload,
}) => {
  const endpoint = `${API_BASE_URL}/identity/verify/sendVerificationCode?type=phone`;
  return _post(endpoint, payload);
};

export const onSendEmailVerificationCode: SendEmailVerificationCode = async ({
  payload,
}) => {
  console.log("SendEmailVerificationCode -> ", payload);

  const endpoint = `${API_BASE_URL}/identity/token`;
  return _post(endpoint, payload);
};

export const onVerifyMobile: VerifyMobile = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/identity/verify/verifyVerificationCode?type=phone`;
  return _post(endpoint, payload);
};

export const onVerifyCode: VerifyCode = async ({ params }) => {
  const { isBusiness, code, countryId, codeType } = params;
  const endpoint = `${API_BASE_URL}/identity/verify?isBusiness=${isBusiness}&code=${code}&countryId=${countryId}&codeType=${codeType}`;
  return _get(endpoint);
};

export const onUpdateEmail: UpdateEmail = async ({ params, payload }) => {
  console.log("UPDATE EMAIL -> ", { payload });

  const { indvId } = params;
  const endpoint = `${API_BASE_URL}/identity/user/email/${indvId}`;

  return _patch(endpoint, payload, {
    requireAuth: true,
  });
};

export const onGetGooglePermission: GetGooglePermission = async ({
  payload,
}) => {
  const endpoint = `${API_BASE_URL}/appointment/googleCalendar/permission`;
  const { googleAccessToken } = payload;

  console.log("PAYLOAD: ", googleAccessToken);

  return _get(endpoint, {
    requireAuth: true,
    headers: {
      Accept: "*",
      "Content-Type": "*",
      google_access_auth_token: `${googleAccessToken}`,
    },
  });
};

export const onGetAccount: GetAccount = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/identity/account`;

  // console.log("onGetAccount -> ", { payload });

  let newPayload: typeof payload = {
    email: payload.email,
    regMode: payload.regMode,
  };

  if (payload.isBusiness) {
    newPayload = {
      ...newPayload,
      isBusiness: payload.isBusiness,
    };
  }

  let headers = {};
  // let next;

  if (payload?.accessToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${payload.accessToken}`,
    };

    // next = {
    //   revalidate: 500000,
    // };
  }

  return _post<GetAccountResponse>(endpoint, newPayload, {
    headers,
    // cache: "force-cache",
    // next,
  });
};

export const onResetPassword: ResetPassword = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/identity/resetPassword`;

  return _put(endpoint, payload);
};

// !Don't use these functions other than auth.ts file

export const onSignIn: SignIn = async ({ payload }) => {
  const { email, password, mode } = payload;
  const endpoint = `${API_BASE_URL}/identity/signin`;

  const encryptedPassword = Array.from(
    await encryptPassword({ email, password })
  );

  const newPayload = {
    email,
    pwd: encryptedPassword,
    mode,
  };

  return _post(endpoint, newPayload);
};

export const onRefreshToken: RefreshToken = async ({ payload }) => {
  const endpoint = `${API_GATEWAY_URL}/v1/token/generateFromRefreshToken`;
  return _post<RefreshTokenResponse>(endpoint, payload);
};

export const onGenerateToken: GenerateToken = async ({ payload }) => {
  const { provider, token } = payload;
  const endpoint = `${API_GATEWAY_URL}/v1/token/generate`;

  const encodedString = Buffer.from(token || "").toString("base64");

  return _post(endpoint, {
    provider,
    token: encodedString,
  });
};

export const onGoogleOAuth = async ({
  account,
  profile,
}: {
  profile: Profile | undefined;
  account: Account | null | undefined;
}): Promise<User | null> => {
  const getAccountResponse = await onGetAccount({
    payload: {
      email: profile?.email || "",
      regMode: "google",
    },
  });

  if (getAccountResponse.status === 404) {
    return null;
  }

  const generateTokenResponse = await onGenerateToken({
    payload: {
      provider: "google",
      token: account?.access_token || "",
    },
  });

  if (!generateTokenResponse.success) {
    toast.error({
      message:
        generateTokenResponse?.error?.details?.message ||
        "Something went wrong!",
    });

    throw new Error("Failed to generate token");
  }

  const user = getAccountResponse.data;

  return {
    email: user?.email,
    entityRole: user?.entityRole,
    entityType: user?.entityType,
    id: user?.indvid.toString(),
    image: profile?.picture,
    location: {
      lat: user?.address.lat,
      lng: user?.address.lng,
    },
    name: profile?.name,
    phone: user?.address.phone,
    accountStatus: user?.accountStatus,
    accessToken: generateTokenResponse.data?.accessCode,
    refreshToken: generateTokenResponse.data?.refreshToken,
    bizid: user?.bizid,
  };
};
