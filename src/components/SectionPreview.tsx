import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import marked from "marked";

import { useAppSelector } from "../hooks";
import selectors from "../redux/selectors";

function SectionPreview() {
  const introduction = useAppSelector(selectors.github.selectIntroduction);
  const user = useAppSelector(selectors.github.selectUser);

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Preview
      </Heading>
      <Grid gap={0} templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1} px={4}>
          profile
        </GridItem>
        <GridItem colSpan={3} px={4}>
          <Box p={6} border="1px" borderColor="#e1e4e8">
            {user && (
              <Box mb={4}>
                <Text as="kbd" size="xs">
                  {user.login}/README.md
                </Text>
              </Box>
            )}
            <Box
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: marked(introduction) }}
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default SectionPreview;
