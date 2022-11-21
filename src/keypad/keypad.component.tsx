import { memo } from "react";
import { useKeypadContext } from "./keypad.context";

type KeyPad = { value: string; labelSrc: string }[][];

/**
 * labelSrc should point at an image to display that
 * resembles the keypad
 */
const keypad: KeyPad = [
  [
    { labelSrc: "", value: "1" },
    { labelSrc: "", value: "2" },
    { labelSrc: "", value: "3" },
  ],
  [
    { labelSrc: "", value: "4" },
    { labelSrc: "", value: "5" },
    { labelSrc: "", value: "6" },
  ],
  [
    { labelSrc: "", value: "7" },
    { labelSrc: "", value: "8" },
    { labelSrc: "", value: "9" },
  ],
  [
    { labelSrc: "", value: "*" },
    { labelSrc: "", value: "0" },
    { labelSrc: "", value: "#" },
  ],
];

type KeyPropsView = { press: (value: string) => void };

const KeyPadView = memo(({ press }: KeyPropsView) => {
  return (
    <article>
      {keypad.map((row, i) => (
        <div className="row" key={row[0].value}>
          {row.map((key) => (
            <button
              onClick={() => press(key.value)}
              className="key"
              key={key.value}
            >
              {key.value}
            </button>
          ))}
        </div>
      ))}
    </article>
  );
});

export const KeyPad = () => {
  const { press } = useKeypadContext();

  /**
   * We isolate the View from accessing the Context so we can correctly
   * memoize the press callback, and avoid re-render from changes in history
   */
  return <KeyPadView press={press} />;
};
