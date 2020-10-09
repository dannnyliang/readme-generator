import {
  Container,
  Divider,
  Grid,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  append,
  equals,
  filter,
  ifElse,
  includes,
  isEmpty,
  isNil,
  reject,
} from "ramda";

import ArtistTable from "./components/ArtistTable";
import Preview from "./components/Preview";
import TopBar from "./components/TopBar";
import TrackTable from "./components/TrackTable";
import generator from "./utils/generator";
import { getLocalStorageToken } from "./utils";
import putReadme from "./apis/putReadme";
import styled from "styled-components";
import useArtists from "./hooks/useArtists";
import useGithubUser from "./hooks/useGithubUser";
import { useMutation } from "react-query";
import useReadme from "./hooks/useReadme";
import useTracks from "./hooks/useTracks";

function App(props) {
  const { className } = props;
  const { githubToken } = getLocalStorageToken();

  const [selectedTrackIds, setSelectedTrackIds] = useState([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState([]);
  const [intro, setIntro] = useState("");

  const handleSetTrackIds = (trackIds) => setSelectedTrackIds(trackIds);
  const handleSetArtistIds = (artistIds) => setSelectedArtistIds(artistIds);
  const handleChangeIntro = (intro) => setIntro(intro);

  const { tracks } = useTracks({ handleSetTrackIds });
  const { artists } = useArtists({ handleSetArtistIds });
  const { user } = useGithubUser();
  const { readme } = useReadme({ user, handleChangeIntro });

  const [updateReadme] = useMutation(putReadme);

  const getSelectHandler = (setState) => (id) =>
    setState(ifElse(includes(id), reject(equals(id)), append(id)));
  const handleSubmit = async () => {
    await updateReadme({
      token: githubToken,
      readme: readmeContent,
      sha: readme.sha,
      user,
    });
  };

  const needAuthSpotify = isEmpty(tracks) || isEmpty(artists);
  const needAuthGithub = isNil(user);

  const selectedTracks = filter(
    (track) => includes(track.id, selectedTrackIds),
    tracks
  );
  const selectedArtists = filter(
    (artist) => includes(artist.id, selectedArtistIds),
    artists
  );
  const readmeContent = generator({
    tracks: selectedTracks,
    artists: selectedArtists,
    intro,
  });

  return (
    <div className={className}>
      <TopBar handleSubmit={handleSubmit} />
      <Container className="container">
        <Typography variant="h4">Top Tracks & Artists</Typography>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={6}>
            <TrackTable
              tracks={tracks}
              selectedIds={selectedTrackIds}
              handleSelect={getSelectHandler(setSelectedTrackIds)}
            />
          </Grid>
          <Grid item xs={6}>
            <ArtistTable
              artists={artists}
              selectedIds={selectedArtistIds}
              handleSelect={getSelectHandler(setSelectedArtistIds)}
            />
          </Grid>
        </Grid>

        <Divider className="divider" />

        <Typography variant="h4">Personal Introduction</Typography>
        {needAuthGithub ? (
          <Typography className="warning" color="error">
            Please auth github account first!
          </Typography>
        ) : (
          <>
            <Typography variant="body1">
              (Current user: <u>{user.login}</u>)
            </Typography>
            <div className="textarea-wrapper">
              <TextareaAutosize
                value={intro}
                rowsMin={4}
                onChange={(e) => handleChangeIntro(e.target.value)}
              />
            </div>
          </>
        )}

        <Divider className="divider" />

        <Typography variant="h4">Preview</Typography>
        {needAuthSpotify || needAuthGithub ? (
          <Typography className="warning" color="error">
            Please auth github or spotify account first!
          </Typography>
        ) : (
          <Preview readmeContent={readmeContent} />
        )}
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

  .divider {
    margin: 32px 0;
  }

  .textarea-wrapper {
    display: flex;
    margin: 16px 0;
    textarea {
      flex: 1;
      padding: 16px;
    }
  }

  .actions-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
`;

export default StyledApp;
