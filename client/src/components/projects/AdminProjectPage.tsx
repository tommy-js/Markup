import React, { useEffect } from "react";
import { Navbar } from "../navigation/Navbar";

interface Props {
  id: number;
  title: string;
  content: string;
}

export const AdminProjectPage: React.FC<Props> = props => {
  useEffect(() => {
    console.log(props.id);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="under_header">
        <p>Project Page</p>
        <p>You're contributing to this project</p>
      </div>
    </div>
  );
};
