// src/components/Map/styles.js
import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100px',
  },
  mapContainer: {
  height: '100%',
  width: '100%',
  position: 'relative', // Needed for GoogleMapReact
},

  markerContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': {
      zIndex: 2,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
}));
