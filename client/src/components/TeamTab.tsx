import React, { useContext, useEffect, useState } from "react";
import { Member } from "./Member";
import { userQuery } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { userContext } from "../App";

const TeamTab: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const { loading, data } = useQuery(userQuery, {
    variables: { username: userVal.username }
  });

  if (!loading) {
    return (
      <div>
        {data.user.teammates.map((members: any) => (
          <Member name={members.name} />
        ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default compose(graphql(userQuery, { name: "userQuery" }))(TeamTab);
