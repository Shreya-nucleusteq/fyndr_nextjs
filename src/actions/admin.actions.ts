import { API_BASE_URL } from "@/environment";
import { _get, _post } from "@/lib/handlers/fetch";
import { GetCountryListParams } from "@/types/api-params/others.params";
import {
  GetActivePromoProps,
  GetExpiredPromos,
} from "@/types/api-params/promo-code.params";
import { GetUsersParams } from "@/types/api-params/user.params";
import { ExpiredList } from "@/types/api-response/promocode.response";

export const getActivePromos: GetActivePromoProps = async ({ search }) => {
  const endpoint = `${API_BASE_URL}/admin/promocode/list?text=${search}`;
  return _get(endpoint, {});
};
export const getExpiredPromos: GetExpiredPromos = async ({
  search,
  pgStart,
  pgSize,
}) => {
  const endpoint = `${API_BASE_URL}/admin/promocode/expired?text=${search}&pgStart=${pgStart}&pgSize=${pgSize}`;
  return _get<ExpiredList>(endpoint, { requireAuth: true });
};

export const onGetUsers: GetUsersParams = async (params, payload) => {
  const { page, pageSize, dateOrder } = params;
  let endpoint = `${API_BASE_URL}/admin/user/search?pgStart=${page}&pgSize=${pageSize}`;

  if (dateOrder) {
    endpoint = `${endpoint}&dateOrder=${dateOrder}`;
  }

  return _post(endpoint, payload, {
    requireAuth: true,
    cache: "force-cache",
    next: {
      revalidate: 600000,
    },
  });
};

export const onGetCountryList: GetCountryListParams = async () => {
  const endpoint = `${API_BASE_URL}/admin/country/list`;
  return _get(endpoint, {
    cache: "force-cache",
  });
};
