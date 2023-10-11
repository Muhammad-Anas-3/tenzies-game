import React from "react";

export default function Scoreboard(props) {
  return (
    <div className="Scoreboard">
      <div className="rolls-best">
        <p className="scoreBoard">Best rolls: {props.bestRolls}</p>
      </div>
    </div>
  );
}
