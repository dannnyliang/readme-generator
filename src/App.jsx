import {
  Container,
  Grid,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import {
  all,
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
import styled from "styled-components";
import useArtists from "./hooks/useArtists";
import useGithubUser from "./hooks/useGithubUser";
import useReadme from "./hooks/useReadme";
import useTracks from "./hooks/useTracks";
import Section from "./components/Section";

function App(props) {
  const { className } = props;

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

  const getSelectHandler = (setState) => (id) =>
    setState(ifElse(includes(id), reject(equals(id)), append(id)));

  const needAuthSpotify = isEmpty(tracks) || isEmpty(artists);
  const needAuthGithub = isNil(user);
  const invalidSelection =
    selectedTrackIds.length !== 5 || selectedArtistIds.length !== 5;
  const showPreview = all(equals(false), [
    needAuthSpotify,
    needAuthGithub,
    invalidSelection,
  ]);

  const selectedTracks = filter(
    (track) => includes(track.id, selectedTrackIds),
    tracks
  );
  const selectedArtists = filter(
    (artist) => includes(artist.id, selectedArtistIds),
    artists
  );
  const readmeContent = useCallback(
    () =>
      generator({
        tracks: selectedTracks,
        artists: selectedArtists,
        intro,
      }),
    [intro, selectedArtists, selectedTracks]
  )();

  const getCommitInfo = () => ({
    readme: readmeContent,
    sha: readme?.sha,
    user,
  });

  return (
    <div className={className}>
      <TopBar getCommitInfo={getCommitInfo} submitDisabled={!showPreview} />
      <Container className="container">
        {/* Top Tracks & Artists */}
        <Section title="Top Tracks & Artists">
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
        </Section>

        {/* Personal Introduction */}
        <Section title="Personal Introduction">
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
        </Section>

        {/* Preview */}
        <Section title="Preview" showDivider={false}>
          {(needAuthSpotify || needAuthGithub) && (
            <Typography className="warning" color="error">
              Please auth github or spotify account first!
            </Typography>
          )}
          {invalidSelection && (
            <Typography className="warning" color="error">
              Please select 5 tracks and 5 artists!
            </Typography>
          )}
          {showPreview && <Preview readmeContent={readmeContent} />}
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
