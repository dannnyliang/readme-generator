import {
  Button,
  Container,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { append, equals, filter, ifElse, includes, reject } from "ramda";

import ArtistTable from "./components/ArtistTable";
import AuthGithub from "./components/AuthGithub";
import AuthSpotify from "./components/AuthSpotify";
import Preview from "./components/Preview";
import TrackTable from "./components/TrackTable";
import generator from "./utils/generator";
import { getLocalStorageToken } from "./utils";
import putReadme from "./apis/putReadme";
import useArtists from "./hooks/useArtists";
import useGithubUser from "./hooks/useGithubUser";
import { useMutation } from "react-query";
import useReadme from "./hooks/useReadme";
import useTracks from "./hooks/useTracks";

function App() {
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
    <Container>
      <AuthGithub />
      <Typography>使用者名稱：{user?.login}</Typography>
      <AuthSpotify />
      <TrackTable
        tracks={tracks}
        selectedIds={selectedTrackIds}
        handleSelect={getSelectHandler(setSelectedTrackIds)}
      />
      <ArtistTable
        artists={artists}
        selectedIds={selectedArtistIds}
        handleSelect={getSelectHandler(setSelectedArtistIds)}
      />
      <TextareaAutosize
        value={intro}
        rowsMin={4}
        onChange={(e) => handleChangeIntro(e.target.value)}
        style={{ width: "100%", padding: 16 }}
      />
      <Preview readmeContent={readmeContent} />
      <Button onClick={handleSubmit}>submit</Button>
    </Container>
  );
}

export default App;
