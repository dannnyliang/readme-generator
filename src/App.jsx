import { Container, TextareaAutosize, Typography } from "@material-ui/core";
import React, { useState } from "react";

import Preview from "./components/Preview";
import Section from "./components/Section";
import TopBar from "./components/TopBar";
import generator from "./utils/generator";
import { isNil } from "ramda";
import styled from "styled-components";
import useArtists from "./hooks/useArtists";
import useGithubUser from "./hooks/useGithubUser";
import useReadme from "./hooks/useReadme";
import useTracks from "./hooks/useTracks";

function App(props) {
  const { className } = props;

  const [intro, setIntro] = useState("");

  const handleChangeIntro = (intro) => setIntro(intro);

  const { tracks } = useTracks();
  const { artists } = useArtists();
  const { user } = useGithubUser();
  const { readme } = useReadme({ user, handleChangeIntro });

  const needAuthGithub = isNil(user);
  const readmeContent = generator({
    tracks,
    artists,
    intro,
  });

  const getCommitInfo = () => ({
    readme: readmeContent,
    sha: readme?.sha,
    user,
  });

  return (
    <div className={className}>
      <TopBar getCommitInfo={getCommitInfo} submitDisabled={needAuthGithub} />
      <Container className="container">
        <Section title="Personal Introduction">
          <Typography variant="body1">
            (Current user: <u>{user?.login}</u>)
          </Typography>
          <div className="textarea-wrapper">
            <TextareaAutosize
              value={intro}
              rowsMin={4}
              onChange={(e) => handleChangeIntro(e.target.value)}
            />
          </div>
        </Section>

        <Section title="Preview" showDivider={false}>
          <Preview readmeContent={readmeContent} />
        </Section>
      </Container>
    </div>
  );
}

const StyledApp = styled(App)`
  .container {
    padding: 0 32px;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .textarea-wrapper {
    display: flex;
    margin: 16px 0;
    textarea {
      flex: 1;
      padding: 16px;
    }
  }
`;

export default StyledApp;
