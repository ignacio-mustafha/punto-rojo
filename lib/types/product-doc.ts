export type ProductDocMeta = {
  title: string;
  method: string;
  endpoint: string;
};

export type ProductDocResponse = {
  meta: ProductDocMeta;
  description: string;
  useCase: string;
  params: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  snippets: {
    curl?: string;
    javascript?: string;
    python?: string;
  } | null;
  responseExample: string | null;
};

