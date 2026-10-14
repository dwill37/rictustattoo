import { Fragment } from "react";

/**
 * Renders copy and highlights any "[PLACEHOLDER: ...]" inside it,
 * so unfilled facts are impossible to miss on the page.
 */
export function Fill({ text }: { text: string }) {
  const parts = text.split(/(\[PLACEHOLDER:[^\]]*\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[PLACEHOLDER") ? (
          <span key={i} className="ph">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
