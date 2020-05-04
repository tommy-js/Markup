import React from "react";
import { Link } from "react-router-dom";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeFriendMutation } from "../queries/queries";
import "../App.scss";

interface Props {
  name: string;
  id: number;
  userId: number;
  removeFriendMutation: (variables: object) => void;
}

const Friend: React.FC<Props> = props => {
  function takeAwayFriend() {
    props.removeFriendMutation({
      variables: {
        userId: props.userId,
        id: props.id
      }
    });
  }

  return (
    <div className="person_container">
      <Link className="link_to_person" to={`/home/${props.id}`}>
        <div className="person">
          <span>
            {props.name} #{props.id}
          </span>
        </div>
      </Link>
      <button className="remove_friend_button" onClick={() => takeAwayFriend()}>
        x
      </button>
    </div>
  );
};

export default compose(
  graphql(removeFriendMutation, { name: "removeFriendMutation" })
)(Friend);
