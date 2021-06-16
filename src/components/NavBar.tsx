import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { useClipboard } from "@chakra-ui/react";
import { Button, Flex, HStack, Heading } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { isNil, not } from "ramda";
import { useState } from "react";

import { useAppSelector } from "../hooks";
import useReadme from "../hooks/useReadme";
import selectors from "../redux/selectors";
import AuthGithub from "./AuthGithub";
import AuthSpotify from "./AuthSpotify";
import ModalCommit from "./ModalCommit";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { readme } = useReadme();
  const { onCopy } = useClipboard(readme);
  const rawReadme = useAppSelector(selectors.github.selectReadme);
  const user = useAppSelector(selectors.github.selectUser);

  const canCommit = not(isNil(rawReadme)) && not(isNil(user));

  const handleExport = () => {
    const blob = new Blob([readme], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "README.md");
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      mb={8}
      p={4}
      boxShadow="base"
      bgColor="white"
    >
      <Heading size="md">Readme Generator</Heading>
      <HStack spacing={4}>
        <AuthSpotify />
        <AuthGithub />
        <Button variant="outline" cursor="pointer" onClick={onCopy}>
          <span>Copy</span>
          <CopyIcon ml={2} />
        </Button>
        <Button variant="outline" cursor="pointer" onClick={handleExport}>
          <span>Export Markdown</span>
          <DownloadIcon ml={2} />
        </Button>
        <Button
          variant="outline"
          cursor="pointer"
          colorScheme="red"
          onClick={handleOpen}
        >
          Commit
        </Button>
      </HStack>
      <ModalCommit isOpen={isOpen && canCommit} onClose={handleClose} />
    </Flex>
  );
}

export default NavBar;
