import React, { useEffect, useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { userContext } from "../App";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { AdminProjectListing } from "./AdminProjectListing";
import { useHistory } from "react-router-dom";

interface Props {
  adminDriller: (userProjects: any) => void;
}

const Profile: React.FC<Props> = props => {
  const [projects, setProjects] = useState();
  const { userVal, setUserVal } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    if (!userVal.username) {
      let path = "/";
      history.push(path);
    }
  });

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

  console.log(data);
  console.log(projects);

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

  return (
    <div>
      <Navbar />
      <div className="under_header profile_block">
        <h2>Your Profile</h2>
        <h3>
          {userVal.username} #{userVal.id}
        </h3>
        <div>{currentProjects()}</div>
      </div>
    </div>
  );
};

export default compose(graphql(userQuery, { name: "userQuery" }))(Profile);
