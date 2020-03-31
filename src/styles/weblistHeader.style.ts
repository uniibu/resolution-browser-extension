import {createStyles, Theme} from '@material-ui/core';

const weblistHeaderStyles = ({spacing}: Theme)  => createStyles({
  main: {
    display: "flex",
    flexDirection: "column"
  },
  link: {
    textDecoration: "none",
  },
  header: {
    display: "flex",
    paddingBottom: spacing(3),
    justifyContent: "space-between",
  },
  title: {
    color: "#5a44f0",
    fontFamily: "OpenSans",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.17,
    letterSpacing: "normal",
  },
  control: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "56px",
  },
  rectangle: {
    borderRadius: "4px",
    border: "solid 1px rgba(70, 155, 255, 0.2)",
    backgroundColor: "rgba(70, 155, 255, 0.06)",
    padding: spacing(0, 0.5, 0, 0.5),
  },
  flex: {
    display: 'flex',
    width: "180px",
    height: "36px",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingLeft: spacing(1),
  },
  addButton: {
    height: "40px",
<<<<<<< HEAD
    color: "white",
    backgroundColor: "#4c47f7"
=======
>>>>>>> 335e675fe3a42e2fa5dac86e75dab91950f0d5ae
  },
  controlText: {
    color: "#2d64ff",
    cursor: "pointer"
  },
});

export default weblistHeaderStyles;