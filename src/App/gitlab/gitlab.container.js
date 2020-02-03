import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PRList from "./components/prList";
import Divider from "@material-ui/core/Divider";
import { objectSort } from "./../../utils/objectSort";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(2)
    }
  }
}));

const initialData = [
  {
    project: "fluffy unicorns",
    author: "fluffy",
    title: "unicorns rule",
    url: "#"
  },
  {
    project: "joker",
    author: "fluffy",
    title: "joker rule",
    url: "#"
  },
  {
    project: "harley",
    author: "shaffer",
    title: "joker sucks",
    url: "#"
  }
];

const GitlabContainer = () => {
  const classes = useStyles();
  const [list, setList] = useState(initialData);

  const sortHandler = sortKey => {
    const sortedList = objectSort(list, sortKey);
    setList(sortedList);
  };

  return (
    <div className={classes.root}>
      <h1>PR Tracker</h1>
      <Button
        variant="contained"
        onClick={e => sortHandler("project")}
        data-sort="project"
      >
        Sort by project
      </Button>
      <Button
        variant="contained"
        onClick={e => sortHandler("title")}
        data-sort="title"
      >
        Sort by title
      </Button>
      <Button
        variant="contained"
        onClick={e => sortHandler("author")}
        data-sort="author"
      >
        Sort by author
      </Button>
      <Divider />
      <PRList list={list} />
    </div>
  );
};

export default GitlabContainer;
