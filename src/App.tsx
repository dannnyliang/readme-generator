import { Box, Container } from "@chakra-ui/react";
import { isNil } from "ramda";
import { useEffect } from "react";

import { useGetReadmeQuery, useGetUserQuery } from "./apis/githubApi";
import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";
import SectionPreview from "./components/SectionPreview";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setReadme, setUser } from "./redux/reducers/github";
import selectors from "./redux/selectors";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectors.github.selectAccessToken);
  const user = useAppSelector(selectors.github.selectUser);
  const readme = useAppSelector(selectors.github.selectReadme);

  const { data: dataUser } = useGetUserQuery(undefined, {
    skip: isNil(accessToken),
  });
  const { data: dataReadme } = useGetReadmeQuery(user?.login, {
    skip: isNil(user),
  });

  useEffect(() => {
    if (!user && dataUser) {
      dispatch(setUser(dataUser));
    }
  }, [dataUser, dispatch, user]);

  useEffect(() => {
    if (!readme && dataReadme) {
      dispatch(
        setReadme({
          sha: dataReadme.sha,
          content: dataReadme.content,
        })
      );
    }
  }, [dataReadme, dispatch, readme]);

  return (
    <Box bgColor="gray.50">
      <NavBar />
      <Container maxW="container.xl">
        <SectionIntro />
        <SectionPreview />
      </Container>
    </Box>
  );
}

export default App;
