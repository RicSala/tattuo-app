import React from "react";

export const DisplayText = ({ text, maxLength = 300 }) => {
  let formattedText;
  if (maxLength)
    formattedText =
      text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const formatText = (inputText) => {
    return inputText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return formatText(formattedText);
};
