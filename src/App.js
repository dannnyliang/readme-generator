import ArtistTable, { artistDataTransformer } from "./components/ArtistTable";
import {
  Button,
  Container,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TrackTable, { trackDataTransformer } from "./components/TrackTable";
import {
  append,
  equals,
  filter,
  ifElse,
  includes,
  isEmpty,
  reject,
  split,
} from "ramda";
import { getDefaultSelection, getLocalStorageToken } from "./utils";
import { useMutation, useQuery } from "react-query";

import AuthGithub from "./components/AuthGithub";
import AuthSpotify from "./components/AuthSpotify";
import Preview from "./components/Preview";
import generator from "./utils/generator";
import getArtists from "./apis/getArtists";
import getGithubUser from "./apis/getGithubUser";
import getReadme from "./apis/getReadme";
import getTracks from "./apis/getTracks";
import putReadme from "./apis/putReadme";

function App() {
  const [username, setUsername] = useState("");
  const [selectedTrackIds, setSelectedTrackIds] = useState([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState([]);
  const [intro, setIntro] = useState("");

  const { spotifyToken, githubToken } = getLocalStorageToken();
  const { data: user } = useQuery(
    ["getGithubUser", githubToken],
    getGithubUser
  );
  const { data: trackData } = useQuery(
    ["getTracks", { token: spotifyToken, params: { limit: 10 } }],
    getTracks
  );
  const { data: artistData } = useQuery(
    ["getArtists", { token: spotifyToken, params: { limit: 10 } }],
    getArtists
  );
  const { data: readme, refetch } = useQuery(
    ["getReadme", username],
    getReadme
  );
  const [updateReadme] = useMutation(putReadme);

  const tracks =
    trackData && !trackData.error ? trackDataTransformer(trackData.items) : [];
  const artists =
    artistData && !artistData.error
      ? artistDataTransformer(artistData.items)
      : [];
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

  const handleChangeUsername = (value) => setUsername(value);
  const handleChangeIntro = (intro) => setIntro(intro);
  const handleGetReadme = () => refetch();
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

  useEffect(() => {
    if (!username && user) {
      setUsername(user.login);
    }
  }, [user, username]);

  useEffect(() => {
    if (isEmpty(selectedTrackIds) && !isEmpty(tracks)) {
      setSelectedTrackIds(getDefaultSelection(tracks));
    }
  }, [selectedTrackIds, tracks]);

  useEffect(() => {
    if (isEmpty(selectedArtistIds) && !isEmpty(artists)) {
      setSelectedArtistIds(getDefaultSelection(artists));
    }
  }, [artists, selectedArtistIds]);

  useEffect(() => {
    if (readme && !intro) {
      const introSection = split(
        "<!--  Intro Section -->",
        decodeURIComponent(escape(atob(readme.content)))
      )[1];

      setIntro(introSection);
    }
  }, [readme, intro]);

  return (
    <Container>
      <AuthSpotify />
      <AuthGithub />
      <TextField
        variant="outlined"
        value={username}
        onChange={(e) => handleChangeUsername(e.target.value)}
        label="使用者名稱"
      />
      <Button onClick={handleGetReadme}>get readme</Button>
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
