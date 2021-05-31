import getGithubUser from "../apis/getGithubUser";
import { getLocalStorageToken } from "../utils";
import { useQuery } from "react-query";

export default () => {
  const { githubToken } = getLocalStorageToken();
  const response = useQuery(["getGithubUser", githubToken], getGithubUser, {
    retry: false,
    onError: (error) => {
      console.error(error);
    },
  });

  return { ...response, user: response.data };
};
