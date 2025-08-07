import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 100,
    padding: '16px',
    boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
    flex: 1,
  },
  lastControl: {
    marginRight: 0,
  },
  scrollableList: {
    overflowY: 'auto',
    flexGrow: 1,
    padding: '16px',
  },
  list: {
    paddingBottom: '16px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  placeCard: {
    padding: '8px',
  },
}));
