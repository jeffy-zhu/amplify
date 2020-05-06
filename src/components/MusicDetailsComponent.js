import React from "react";

const MusicDetailsComponent = (props) => (
  <div>
    <h1>Music Details Component</h1>
    <div>{props.match.params.songTitle}</div>
    <div>{props.match.params.artistName}</div>
  </div>
);

export default MusicDetailsComponent;
