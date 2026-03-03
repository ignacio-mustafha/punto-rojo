declare module "tailwind-merge" {
  import type { ClassValue } from "clsx";

  export function twMerge(...classLists: ClassValue[]): string;
}

