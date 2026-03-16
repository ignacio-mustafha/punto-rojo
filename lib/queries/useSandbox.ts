import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/http/axiosClient";

type SandboxInput = {
  productId?: string | null;
  method: string;
  endpoint: string;
  bodyRaw?: string | null;
  bodyFormat?: string | null;
};

type SandboxResult = {
  ok: boolean;
  mockResponse: Record<string, unknown>;
};

async function executeSandbox(input: SandboxInput): Promise<SandboxResult> {
  const response = await axiosClient.post<SandboxResult>(
    "/api/sandbox/execute",
    input,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}

export function useSandbox() {
  return useMutation({
    mutationFn: executeSandbox,
  });
}

