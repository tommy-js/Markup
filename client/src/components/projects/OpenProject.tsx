import React, { useEffect, useState } from "react";
import ProjectPage from "./ProjectPage";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { getOpenProjectsQuery } from "../../queries/queries";

interface Props {
  searchSettings: any;
  routeDriller: (projects: object) => void;
}

const OpenProject: React.FC<Props> = props => {
  const [projects, setProjects] = useState([]);
  const [placeholder, setPlaceholder] = useState();
  const [callProjects, { loading, data }] = useLazyQuery(getOpenProjectsQuery, {
    pollInterval: 500
  });

  useEffect(() => {
    setPlaceholder(props.searchSettings);
  }, [props.searchSettings]);

  useEffect(() => {
    if (props.searchSettings) {
      callProjects({
        variables: {
          stack: placeholder.stack.toUpperCase()
        }
      });
    }
  }, [placeholder]);

  useEffect(() => {
    if (data) {
      let foundData = data.projects;
      foundData.length = 100;
      setProjects(foundData);
      props.routeDriller(foundData);
      console.log(foundData);
    }
  }, [data]);

  if (!loading) {
    if (projects.length > 0) {
      return (
        <div className="project_opening">
          {projects.map((el: any) => (
            <ProjectPage
              key={el.id}
              title={el.title}
              description={el.content}
              id={el.id}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="project_opening">
          <p className="none_found">None found</p>
        </div>
      );
    }
  } else {
    return <div className="project_opening">Loading</div>;
  }
};

export default compose(
  graphql(getOpenProjectsQuery, { name: "getOpenProjectsQuery" })
)(OpenProject);
