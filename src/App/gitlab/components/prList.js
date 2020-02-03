import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
};

export const PRTemplate = ({
  project = "fluffy unicorns",
  author = "fluffy",
  title = "unicorns rule",
  url = "#"
}) => {
  return (
    <ListItemLink href={url}>
      <ListItemText
        primary={title}
        secondary={
          <>
            <span>Author:{author}</span>
            <br />
            <span>Project:{project}</span>
          </>
        }
      />
    </ListItemLink>
  );
};

const PRList = ({ list }) => {
  const classes = useStyles();
  console.log(("new list", list));
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main">
        {list.map(item => (
          <PRTemplate {...item} key={item.title} />
        ))}
      </List>
    </div>
  );
};

export default PRList;
