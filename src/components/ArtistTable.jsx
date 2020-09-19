import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { memo } from "react";
import { equals, includes } from "ramda";

import PropTypes from "prop-types";

export function artistDataTransformer(items) {
  return items.map((item, index) => ({
    id: item.id,
    image: item.images[0].url,
    name: item.name,
    url: item.external_urls.spotify,
    rank: index + 1,
  }));
}

function ArtistRow(props) {
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
    </TableRow>
  );
}

function ArtistTable(props) {
  const { artists, selectedIds, handleSelect } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          <TableCell>Rank</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {artists.map((row) => (
          <ArtistRow
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

ArtistTable.propTypes = {};

export default memo(ArtistTable, (prevProps, nextProps) =>
  equals(prevProps, nextProps)
);
