import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Heading,
  Link,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useState } from "react";

import { useAppSelector } from "../hooks";
import { selectUser } from "../redux/reducers/github";

function SectionIntro() {
  const [intro, setIntro] = useState("");

  const user = useAppSelector(selectUser);

  const handleChange: TextareaProps["onChange"] = (e) =>
    setIntro(e.target.value);

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
      <Textarea value={intro} onChange={handleChange} />
    </Box>
  );
}

export default SectionIntro;
