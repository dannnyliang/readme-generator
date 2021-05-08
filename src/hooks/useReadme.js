import { isNil, split } from "ramda";

import getReadme from "../apis/getReadme";
import { useQuery } from "react-query";

export default (params) => {
  const { user, handleChangeIntro } = params;

  const response = useQuery(["getReadme", user?.login], getReadme, {
    enabled: !isNil(user?.login),
    onSuccess: (data) => {
      if (data) {
        const readmeContent = decodeURIComponent(escape(atob(data.content)));

        if (readmeContent.includes("<!--  Intro Section -->")) {
          const introSection = split(
            "<!--  Intro Section -->",
            decodeURIComponent(escape(atob(data.content)))
          )[1];

          handleChangeIntro(introSection);
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { ...response, readme: response.data };
};
