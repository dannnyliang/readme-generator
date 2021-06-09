import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Link, TextareaProps } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectIntroduction,
  selectUser,
  setIntroduction,
} from "../redux/reducers/github";
import AutoResizeTextarea from "./AutoResizeTextarea";

function SectionIntro() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const introduction = useAppSelector(selectIntroduction);

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
