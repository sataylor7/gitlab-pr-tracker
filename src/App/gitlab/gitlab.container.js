import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PRList from "./components/prList";
import Divider from "@material-ui/core/Divider";
import { objectSort } from "./../../utils/objectSort";
import APIResource from "./../../resource/api.resource";
import { getUrlParameter } from "./../../utils/url";

const resource = new APIResource({});

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

const callResource = ({ url, version, type, perPage, privateToken }) => {
  return resource.fetch({
    url: `${url}/${version}/${type}?per_page=${perPage}&private_token=${privateToken}`
  });
};

const GitlabContainer = () => {
  const classes = useStyles();
  const [list, setList] = useState(initialData);

  const sortHandler = sortKey => {
    const sortedList = objectSort(list, sortKey);
    setList(sortedList);
  };

  useEffect(() => {
    const token = getUrlParameter("private_token");
    const newList = [];
    // this looks so ugly... need to clean up
    callResource({
      url: process.env.REACT_APP_GITLAB_URL,
      version: process.env.REACT_APP_GITLAB_API_VERSION,
      type: "merge_requests",
      perPage: 50,
      privateToken: token
    }).then(mrData => {
      console.log("MR data", mrData);
      callResource({
        url: process.env.REACT_APP_GITLAB_URL,
        version: process.env.REACT_APP_GITLAB_API_VERSION,
        type: "projects",
        perPage: 1000,
        privateToken: token
      }).then(prData => {
        console.log("PR data", prData);
        let projectMap = new Map();
        prData.forEach(pr => {
          projectMap.set(pr.id, pr.name_with_namespace);
        });
        mrData.forEach(mr => {
          newList.push({
            project: projectMap.get(mr.project_id),
            title: mr.title,
            link: mr.web_url,
            author: mr.author.name
          });
        });

        // when the two loops are done then set the list
        setList(newList);
      });
    });
  }, []);

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
