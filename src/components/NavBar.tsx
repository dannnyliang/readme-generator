import { Button, Flex, FlexProps, HStack, Heading } from "@chakra-ui/react";

import Spotify from "../icons/Spotify";
import AuthGithub from "./AuthGithub";

type NavBarProps = {} & FlexProps;

function NavBar(props: NavBarProps) {
  const { children, ...restProps } = props;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      mb={8}
      p={4}
      boxShadow="base"
      {...restProps}
    >
      <Heading size="lg">Readme Generator</Heading>
      <HStack spacing={4}>
        <Spotify boxSize={8} />
        <AuthGithub />
        <Button variant="outline">Copy</Button>
        <Button variant="outline" colorScheme="red">
          Copy
        </Button>
      </HStack>
    </Flex>
  );
}

export default NavBar;
