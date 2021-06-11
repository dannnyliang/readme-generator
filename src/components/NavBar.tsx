import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { useClipboard } from "@chakra-ui/react";
import { Button, Flex, HStack, Heading } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { join } from "ramda";

import { useAppSelector } from "../hooks";
import selectors from "../redux/selectors";
import { getIntroductionContent } from "../utils/generator";
import AuthGithub from "./AuthGithub";
import AuthSpotify from "./AuthSpotify";

function NavBar() {
  const introduction = useAppSelector(selectors.github.selectIntroduction);
  const introductionContent = getIntroductionContent(introduction);
  const trackContent = useAppSelector(selectors.spotify.selectTrackContent);
  const artistContent = useAppSelector(selectors.spotify.selectArtistContent);

  const readme = join("", [introductionContent, trackContent, artistContent]);
  const { onCopy } = useClipboard(readme);

  const handleExport = () => {
    const blob = new Blob([readme], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "README.md");
  };

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
        <Button variant="outline" cursor="pointer" colorScheme="red">
          Commit
        </Button>
      </HStack>
    </Flex>
  );
}

export default NavBar;
