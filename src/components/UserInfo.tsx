import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PeopleIcon } from "@primer/octicons-react";

import { useAppSelector } from "../hooks";
import selectors from "../redux/selectors";

const Divider = () => <>・</>;

function UserInfo() {
  const user = useAppSelector(selectors.github.selectUser);

  if (!user) return null;

  return (
    <Flex direction="column">
      <Image borderRadius="full" src={user.avatar_url} alt={user.login} />
      <Box py={4}>
        <Heading fontSize={26}>{user.name}</Heading>
        <Text fontSize={20}>{user.login}</Text>
      </Box>
      <VStack spacing={4} alignItems="flex-start" fontSize={14}>
        <Button width="100%" variant="outline">
          Follow
        </Button>
        <HStack divider={<Divider />}>
          <HStack spacing="2px">
            <PeopleIcon size={16} />
            <b>{user.followers}</b>
            <span>followers</span>
          </HStack>
          <HStack spacing="2px">
            <b>{user.following}</b>
            <span>following</span>
          </HStack>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default UserInfo;
