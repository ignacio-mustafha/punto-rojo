import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const buildStorageKey = (locale: string, country: string | null) =>
  `onboarding_steps_${locale}_${country ?? "ALL"}`;

const buildQueryKey = (locale: string, country: string | null) => [
  "onboarding-steps",
  locale,
  country ?? "ALL",
];

export function useOnboardingSteps(
  locale: string,
  country: string | null,
  stepIds: string[],
) {
  const queryClient = useQueryClient();
  const storageKey = buildStorageKey(locale, country);

  const { data: completed = [] } = useQuery<string[]>({
    queryKey: buildQueryKey(locale, country),
    queryFn: async () => {
      if (typeof window === "undefined") {
        return [];
      }
      try {
        const raw = window.localStorage.getItem(storageKey);
        return raw ? (JSON.parse(raw) as string[]) : [];
      } catch {
        return [];
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      // Simula una operación async (por ejemplo, persistencia en backend)
      await new Promise((resolve) => setTimeout(resolve, 150));
      return id;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: buildQueryKey(locale, country),
      });

      const previous = queryClient.getQueryData<string[]>(
        buildQueryKey(locale, country),
      );

      const next =
        previous && previous.includes(id)
          ? previous.filter((x) => x !== id)
          : [...(previous ?? []), id];

      queryClient.setQueryData(buildQueryKey(locale, country), next);

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        }
      } catch {
        // ignoramos errores de storage
      }

      return { previous, next };
    },
  });

  const toggleComplete = (id: string) => {
    mutation.mutate(id);
  };

  const progress =
    stepIds.length === 0
      ? 0
      : Math.round((completed.length / stepIds.length) * 100);

  return {
    completed,
    toggleComplete,
    progress,
    isUpdating: mutation.isPending,
  };
}

