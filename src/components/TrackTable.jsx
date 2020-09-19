import {
  Avatar,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { memo } from "react";
import { equals, includes } from "ramda";

export function trackDataTransformer(items) {
  return items.map((item, index) => ({
    id: item.id,
    rank: index + 1,
    name: item.name,
    preview: item.preview_url,
    image: item.album.images[0].url,
    url: item.external_urls.spotify,
    artists: item.artists.map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
  }));
}

function TrackRow(props) {
  const { row, isSelected, handleSelect } = props;

  return (
    <TableRow selected={isSelected} onClick={() => handleSelect(row.id)}>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell>{row.rank}</TableCell>
      <TableCell>
        <Avatar variant="square" alt={row.name} src={row.image} />
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        {row.artists.map((artist) => (
          <Chip
            key={artist.name}
            label={artist.name}
            href={artist.url}
            component="a"
            variant="outlined"
            size="medium"
            clickable
          />
        ))}
      </TableCell>
    </TableRow>
  );
}

function TrackTable(props) {
  const { tracks, selectedIds, handleSelect } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          <TableCell>Rank</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Artists</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {tracks.map((row) => (
          <TrackRow
            key={row.id}
            row={row}
            isSelected={includes(row.id, selectedIds)}
            handleSelect={handleSelect}
          />
        ))}
      </TableBody>
    </Table>
  );
}

TrackTable.propTypes = {};

export default memo(TrackTable, (prevProps, nextProps) =>
  equals(prevProps, nextProps)
);
