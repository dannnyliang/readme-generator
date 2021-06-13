import { join } from "ramda";

import selectors from "../redux/selectors";
import { artistDataTransformer, trackDataTransformer } from "../utils";
import {
  getArtistContent,
  getIntroductionContent,
  getTrackContent,
} from "../utils/generator";
import { useAppSelector } from ".";

function useReadme() {
  const introduction = useAppSelector(selectors.github.selectIntroduction);
  const tracks = useAppSelector(selectors.spotify.selectTracks);
  const artists = useAppSelector(selectors.spotify.selectArtists);

  const trackContent = getTrackContent(trackDataTransformer(tracks ?? []));
  const artistContent = getArtistContent(artistDataTransformer(artists ?? []));
  const introductionContent = getIntroductionContent(introduction);

  const readme = join("", [introductionContent, trackContent, artistContent]);

  return { readme, trackContent, artistContent, introductionContent };
}

export default useReadme;
