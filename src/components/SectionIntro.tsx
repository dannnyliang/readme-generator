import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Link, TextareaProps } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setIntroduction } from "../redux/reducers/github";
import selectors from "../redux/selectors";
import AutoResizeTextarea from "./AutoResizeTextarea";

function SectionIntro() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectors.github.selectUser);
  const introduction = useAppSelector(selectors.github.selectIntroduction);

  const handleChange: TextareaProps["onChange"] = (e) => {
    dispatch(setIntroduction(e.target.value));
  };

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
      <AutoResizeTextarea value={introduction} onChange={handleChange} />
    </Box>
  );
}

export default SectionIntro;
