
import React from "react";
import {Box, Typography, Card, CardMedia, CardContent, CardActions, Chip, Button} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from "@mui/material/Rating";

import useStyles from "./styles";
import { green, grey } from "@mui/material/colors";

const PlaceDetails = ({ place, selected, refProp}) => {
  const classes = useStyles();

  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <Card elevation={6}>
      <CardMedia style={{height:350}}
                 image = {place.photo ? place.photo.images?.large.url : "https://burst.shopifycdn.com/photos/table-for-two.jpg?width=1000&format=pjpg&exif=0&iptc=0"}
                 title = {place.name}/>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display={"flex"} flexDirection={'column'} justifyContent="space-between" alignItems="start">
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={"5px"}>
            {Number(place.rating)}
          <Rating name="read-only" value={ Number(place.rating)} readOnly precision={0.1} />
          </Box>
          
        </Box>
        
        </Box>
        <Box display="flex"  marginTop={'15px'} justifyContent="space-between" gap={"20px"} alignItems="center">
          <Typography variant="subtitle1" color="textSecondary">
            <LocationOnIcon /> {place.location_string}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <PhoneIcon/>{place.phone}
          </Typography>
          </Box>

        <Box display="flex"  marginTop={'35px'} justifyContent="space-between">
          <Typography variant="subtitle1">
            Price
          </Typography>
          <Typography variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">
            Ranking
          </Typography>
          <Typography variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt="award" />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        <CardActions>
          <button style = {{borderRadius: '10px', backgroundColor: "#f8f8f8", padding: '10px', borderStyle: 'none', color: "#0080ff"}}  onClick={() => window.open(place.web_url, '_blank')}>
            TRIP ADVISOR
          </button>
          <button style = {{borderRadius: '10px', backgroundColor: "#f8f8f8", padding: '10px', borderStyle: 'none', color: "#0080ff"}}  onClick={() => window.open(place.website, '_blank')}>
           WEBSITE
          </button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
export default PlaceDetails;