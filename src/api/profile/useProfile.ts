import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "react-query";
import { fetchProfileByUsername, fetchArticlesByAuthor, toggleFollowUser } from "./profilesApi";
import { Profile, MultipleArticlesResponse } from "../../types";

interface UseProfileResult {
  profile: Profile | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface UseProfileArticlesResult {
  articlesData: MultipleArticlesResponse | undefined;
  isLoading: boolean;
}

interface UseToggleFollowResult {
  toggleFollow: UseMutateFunction<Profile, Error, boolean>;
  isLoading: boolean;
}

export function useProfile(username: string): UseProfileResult {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<Profile, Error>(["profile", username], (): Promise<Profile> => fetchProfileByUsername(username));

  return { profile, isLoading, isError };
}

export function useProfileArticles(username: string): UseProfileArticlesResult {
  const { data: articlesData, isLoading } = useQuery<MultipleArticlesResponse, Error>(
    ["profileArticles", username],
    (): Promise<MultipleArticlesResponse> => fetchArticlesByAuthor(username)
  );

  return { articlesData, isLoading };
}

export function useToggleFollow(username: string): UseToggleFollowResult {
  const queryClient = useQueryClient();

  const { mutate: toggleFollow, isLoading } = useMutation<Profile, Error, boolean>(
    (isFollowing: boolean): Promise<Profile> => toggleFollowUser(username, isFollowing),
    {
      onSuccess: (updatedProfile: Profile): void => {
        queryClient.setQueryData<Profile>(["profile", username], updatedProfile);
      },
    }
  );

  return { toggleFollow, isLoading };
}
