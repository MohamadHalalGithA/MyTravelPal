import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
} from "@mui/material";
import useStyles from "./styles";

const List = ({ places, childClicked, isLoading, type, rating, setType, setRating }) => {
  const classes = useStyles();
  
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  useEffect(() => {
    if (childClicked !== null && elRefs[childClicked]?.current) {
      elRefs[childClicked].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [childClicked, elRefs]);

  return (
    <div className={classes.container}>
      {/* Sticky Header */}
      <div className={classes.stickyHeader}>
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Restaurants Attractions near you
        </Typography>

        {/* Controls Row */}
        <div className={classes.formRow}>
          <FormControl variant="standard" className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            className={`${classes.formControl} ${classes.lastControl}`}
          >
            <InputLabel style={{ top: "7px", color: "rgba(0, 0, 0, 0.6)" }}>
              Rating
            </InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0 Stars</MenuItem>
              <MenuItem value={4}>Above 4.0 Stars</MenuItem>
              <MenuItem value={4.5}>Above 4.5 Stars</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Loading or Places List */}
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <div className={classes.scrollableList}>
          <Grid container direction="column" spacing={2} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item xs={12} key={i} ref={elRefs[i]}>
                <Paper elevation={2} className={classes.placeCard}>
                  <PlaceDetails
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default List;
