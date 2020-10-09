import {
  Avatar,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { memo } from "react";
import { equals, includes, isEmpty } from "ramda";

import PropTypes from "prop-types";
import { grey } from "@material-ui/core/colors";
import styled from "styled-components";

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
  const { className, artists, selectedIds, handleSelect } = props;

  return (
    <div className={className}>
      <Paper>
        <Typography className="title" variant="h6">
          Top Artists
        </Typography>
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
        {isEmpty(artists) && (
          <Typography className="warning" color="error">
            Please auth spotify account first!
          </Typography>
        )}
      </Paper>
    </div>
  );
}

ArtistTable.propTypes = {
  className: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  artists: PropTypes.arrayOf(PropTypes.object),
  handleSelect: PropTypes.func,
};

const StyledArtistTable = styled(ArtistTable)`
  .title,
  .warning {
    padding: 8px 16px;
  }

  thead {
    background-color: ${grey[700]};
    * {
      color: white;
    }
  }
`;

export default memo(StyledArtistTable, (prevProps, nextProps) =>
  equals(prevProps, nextProps)
);
