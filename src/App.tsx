import { Container } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import SectionIntro from "./components/SectionIntro";

function App() {
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
