// schema.ts

import { z } from "zod";

export const baseCreateLocationSchema = z.object({
  parentLocation: z.string().optional(),
  locName: z.string().min(1, "Location is Required"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; 
        return /^\d{1,10}$/.test(val); 
      },
      {
        message:
          "Phone number must be at most 10 digits and contain only digits",
      }
    ),
  country: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  timeZone: z.string().optional(),
  ctryCode: z.string().min(1, "Country Code is Required"),
  useBusinessAddress: z.boolean().optional(),
});

export type LocationFormData = z.infer<typeof baseCreateLocationSchema>;
