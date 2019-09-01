import React from "react";
import ReactDOM from "react-dom";
import "./importIcons.tsx";
import "./Icon.scss";

interface Props {
  name: string;
}

const Icon: React.FunctionComponent<Props> = props => {
  return (
    <svg className="icon">
      <use xlinkHref={`#${props.name}`} />
    </svg>
  );
};

export default Icon;
