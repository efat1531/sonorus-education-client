import React from "react";
import PropTypes from "prop-types";

const TextWithParagraphs = ({ text }) => {
  const words = text.split(" ");
  const paragraphs = [];

  let i = 0;
  while (i < words.length) {
    let end = Math.min(i + 130, words.length);
    while (end > i && !words[end - 1].endsWith(".")) {
      end--;
    }
    if (end === i) {
      end = Math.min(i + 200, words.length);
    }
    paragraphs.push(words.slice(i, end).join(" "));
    i = end;
  }
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

TextWithParagraphs.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithParagraphs;
