import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Link, TextareaProps } from "@chakra-ui/react";
import { isNil, split, tail } from "ramda";

import { useGetReadmeQuery } from "../apis/githubApi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectReadme, selectUser, setReadme } from "../redux/reducers/github";
import AutoResizeTextarea from "./AutoResizeTextarea";

const splitReadmeContent = (rawContent: string) => {
  const content = decodeURIComponent(escape(atob(rawContent)));
  if (content.includes("<!--  Intro Section -->")) {
    return tail(split("<!--  Intro Section -->", content));
  }
  return [content];
};

function SectionIntro() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const readme = useAppSelector(selectReadme);
  const { data } = useGetReadmeQuery(user?.login, {
    skip: isNil(user),
  });

  const splitedContent = splitReadmeContent(readme?.content ?? "");
  const intro = splitedContent[0];

  if (!readme && data) {
    dispatch(
      setReadme({
        sha: data.sha,
        content: data.content,
      })
    );
  }

  const handleChange: TextareaProps["onChange"] = (e) => {};

  return (
    <Box p={4}>
      <HStack mb={4}>
        <Heading size="md">Personal Introduction</Heading>
        {!user && <Box>Not auth Github yet!</Box>}
        {user && (
          <Link href={user.html_url} isExternal>
            (Current User: {user.login})
            <ExternalLinkIcon mx="2px" />
          </Link>
        )}
      </HStack>
      <AutoResizeTextarea value={intro} onChange={handleChange} />
    </Box>
  );
}

export default SectionIntro;
