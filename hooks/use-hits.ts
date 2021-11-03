import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetcher } from "@/lib/helpers";
import { PAGE_HITS_KEY } from "@/lib/constants";

const useHits = (id: string) => {
  const QUERY_KEY = PAGE_HITS_KEY(id);

  const queryClient = useQueryClient();

  const { data: hits } = useQuery<number, Error>(
    QUERY_KEY,
    () => fetcher(`/api/hit/${id}`),
    {
      placeholderData: 0,
    }
  );

  const mutation = useMutation(
    () =>
      fetch(`/api/hit/${id}`, { method: "POST" }).then((response) =>
        response.json()
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );

  return { hits, increment: mutation.mutate };
};

export default useHits;
