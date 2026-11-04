declare module "@ega/beacon-cookie-consent" {
  import type { FC } from "react";

  interface CookieConfig {
    enabled?: boolean;
    message?: string;
    buttonText?: string;
    links?: {
      label: string;
      url: string;
    }[];
  }

  export const CookieBanner: FC<{
    config?: CookieConfig;
  }>;
}
