import React, { useContext, useEffect, useState } from "react";
import { Member } from "./Member";
import { userQuery } from "../../../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { userContext, teammateContext } from "../../../App";

const TeamTab: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const { userTeammates, setUserTeammates } = useContext(teammateContext);
  const { loading, data } = useQuery(userQuery, {
    variables: { username: userVal.username }
  });

  if (!loading) {
    if (userTeammates.length > 0) {
      return (
        <div className="friend_class_container">
          {userTeammates.map((members: any) => (
            <Member name={members.name} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="friend_class_container task_box">
          <p className="load_if_empty">Add teammates to start...</p>
        </div>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default compose(graphql(userQuery, { name: "userQuery" }))(TeamTab);
