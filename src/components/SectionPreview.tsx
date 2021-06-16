import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import marked from "marked";
import { createGlobalStyle } from "styled-components";

import { useAppSelector } from "../hooks";
import useReadme from "../hooks/useReadme";
import selectors from "../redux/selectors";
import { gfmStyles } from "../styles/gfmStyles";
import StyledFrame from "./StyledFrame";
import UserInfo from "./UserInfo";

const GFMStyle = createGlobalStyle`
  ${gfmStyles}
`;

function SectionPreview() {
  const introduction = useAppSelector(selectors.github.selectIntroduction);
  const user = useAppSelector(selectors.github.selectUser);
  const { trackContent, artistContent } = useReadme();

  const md =
    marked(introduction) + marked(trackContent) + marked(artistContent);

  return (
    <Box p={4}>
      <Heading size="lg" mb={12}>
        Preview
      </Heading>
      <Grid gap={0} templateColumns="repeat(4, 1fr)" mx={-4}>
        <GridItem colSpan={1} px={4} mt={-8}>
          <UserInfo />
        </GridItem>
        <GridItem colSpan={3} px={4}>
          <Box p={6} border="1px" borderColor="#e1e4e8" bgColor="white">
            {user && (
              <Box mb={4}>
                <Text as="kbd" fontSize="xs">
                  {user.login}/README.md
                </Text>
              </Box>
            )}
            <StyledFrame title="preview-iframe" width="100%">
              <>
                <GFMStyle />
                <Box
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ __html: md }}
                />
              </>
            </StyledFrame>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default SectionPreview;
