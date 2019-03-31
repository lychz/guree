import React from "react";

import "./Button.scss";

/**
 * The only true button.
 */

export interface Props {
  children: string;
}

export default function Button({ children }: Props) {
  return <button className="button">{children}</button>;
}
