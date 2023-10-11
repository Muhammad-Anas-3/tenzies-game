import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <small>
        Coded with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <a
          className="footer--link underline-animation"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Muhammad Anas
        </a>
      </small>
    </footer>
  );
}