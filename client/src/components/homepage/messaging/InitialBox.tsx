import React from "react";

export const InitialBox: React.FC = () => {
  return (
    <div>
      <div className="message_box_information_header">
        Welcome to <span className="info_header_span">Saturnia!</span>
      </div>
      <div className="message_box_under_info">
        <span className="info_header_span">Saturnia</span> is a website aimed at
        providing new software engineers with the experience they need in order
        to get into the job market. To get started, add a friend to your left,
        or a task to your right. If you're interested in seeing currently
        available projects, check out the "projects page" above.
      </div>
    </div>
  );
};
