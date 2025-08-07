import React from "react";
import { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Box} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import { Autocomplete } from '@react-google-maps/api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({setCoordinates}) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoc) => setAutocomplete(autoc);
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      console.log("Selected place coordinates:", { lat, lng });
      setCoordinates({ lat, lng });
      // You can add additional logic here to handle the new coordinates
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };


  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
          MyTravelPal
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Explore New Places
          </Typography>

          <Autocomplete onLoad = {onLoad} onPlaceChanged = {onPlaceChanged} >
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Autocomplete>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
