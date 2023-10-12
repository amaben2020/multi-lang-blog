import { Directus } from "@directus/sdk";

const directus = new Directus(process.env.NEXT_PUBLIC_API_URL!, {
  auth: {
    staticToken: process.env.DIRECTUS_ADMIN_API,
  },
});

export default directus;
