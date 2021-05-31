import { Container } from "@chakra-ui/react";
import { useEffect } from "react";

import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";
import { useAppDispatch } from "./hooks";
import { initializeToken } from "./redux/reducers/token";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeToken());
  }, [dispatch]);

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
