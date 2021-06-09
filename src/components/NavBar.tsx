import { Button, Flex, FlexProps, HStack, Heading } from "@chakra-ui/react";

import AuthGithub from "./AuthGithub";
import AuthSpotify from "./AuthSpotify";

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
      bgColor="white"
      {...restProps}
    >
      <Heading size="md">Readme Generator</Heading>
      <HStack spacing={4}>
        <AuthSpotify />
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
