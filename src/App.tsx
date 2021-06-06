import { Container } from "@chakra-ui/react";
import { isNil } from "ramda";

import { useGetUserQuery } from "./apis/githubApi";
import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  selectAccessToken,
  selectUser,
  setUser,
} from "./redux/reducers/github";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const user = useAppSelector(selectUser);
  const { data } = useGetUserQuery(undefined, {
    skip: isNil(accessToken),
  });

  if (!user && data) {
    dispatch(setUser(data));
  }

  return (
    <div>
      <NavBar />
      <Container maxW="container.xl">
        <SectionIntro />
      </Container>
    </div>
  );
}

export default App;
