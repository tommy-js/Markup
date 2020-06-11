import React, { useEffect, useState } from "react";
import ProjectPage from "./ProjectPage";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useLazyQuery } from "@apollo/react-hooks";
import { getOpenProjectsQuery, getAllProjects } from "../../queries/queries";

function OpenProject(props) {
  const [projects, setProjects] = useState([]);
  const [callProjects, { data, loading }] = useLazyQuery(getOpenProjectsQuery, {
    pollInterval: 500
  });
  const [callAllProjects, { data: data2, loading: loading2 }] = useLazyQuery(
    getAllProjects
  );

  useEffect(() => {
    callAll();
  }, []);

  function callAll() {
    console.log("function passing");
    callAllProjects();
  }

  useEffect(() => {
    console.log("data prev");
    if (data2) {
      console.log("data called");
      let foundData = data2.getProjects;
      foundData.length = 100;
      setProjects(foundData);
      props.routeDriller(foundData);
      console.log(data2);
    }
  }, [data2]);

  useEffect(() => {
    if (props.searchSettings != "") {
      callProjects({
        variables: {
          stack: props.searchSettings.toUpperCase()
        }
      });
    } else {
      console.log("correct");
      callAll();
    }
  }, [props.searchSettings]);

  useEffect(() => {
    if (data) {
      let foundData = data.projects;
      foundData.length = 100;
      setProjects(foundData);
      props.routeDriller(foundData);
      console.log(foundData);
    }
  }, [data]);

  if (!loading || !loading2) {
    if (projects.length > 0) {
      return (
        <div className="project_opening">
          {projects.map(el => (
            <ProjectPage
              leadName={el.leadName}
              leadId={el.leadId}
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
}

export default compose(
  graphql(getOpenProjectsQuery, { name: "getOpenProjectsQuery" }),
  graphql(getAllProjects, { name: "getAllProjects" })
)(OpenProject);
