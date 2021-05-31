import { Box, Heading, Textarea, TextareaProps } from "@chakra-ui/react";
import { useState } from "react";

function SectionIntro() {
  const [intro, setIntro] = useState("");

  const handleChange: TextareaProps["onChange"] = (e) =>
    setIntro(e.target.value);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Personal Introduction
      </Heading>
      <Textarea value={intro} onChange={handleChange} />
    </Box>
  );
}

export default SectionIntro;
