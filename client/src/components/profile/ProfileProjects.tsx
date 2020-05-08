import React, { useState, useEffect, useContext } from "react";
import { AdminProjectListing } from "../projects/AdminProjectListing";
import { userQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { userContext } from "../../App";

interface Props {
  adminDriller: (userProjects: any) => void;
}

const ProfileProjects: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const [projects, setProjects] = useState();

  const { loading, data } = useQuery(userQuery, {
    variables: {
      username: userVal.username
    }
  });

  useEffect(() => {
    if (data) {
      setProjects(data.user.userprojects);
      props.adminDriller(data.user.userprojects);
    }
  }, [data]);

  function currentProjects() {
    if (projects) {
      return (
        <div>
          {projects.map((el: any) => (
            <AdminProjectListing key={el.id} title={el.title} id={el.id} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p>Join a project to see it here</p>
        </div>
      );
    }
  }

  return <div>{currentProjects()}</div>;
};

export default compose(graphql(userQuery, { name: "userQuery" }))(
  ProfileProjects
);
