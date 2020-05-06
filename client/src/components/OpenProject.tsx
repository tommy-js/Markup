import React, { useEffect, useState } from "react";
import { ProjectListing } from "./ProjectListing";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getOpenProjectsQuery } from "../queries/queries";

interface Props {
  submittedStack: string;
}

export const OpenProject: React.FC<Props> = props => {
  const [stack, setStack] = useState();

  useEffect(() => {
    setStack(props.submittedStack);
  }, [props.submittedStack]);

  return <div className="project_opening">{}</div>;
};
