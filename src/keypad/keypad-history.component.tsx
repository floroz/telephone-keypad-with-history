import { useKeypadContext } from "./keypad.context";

// type Props = {};

const KeypadHistory = () => {
  const { keypressHistory } = useKeypadContext();

  return (
    <ul>
      {keypressHistory.map((entry) => (
        <li key={entry.date}>
          Pressed: {entry.value} - at: {new Date(entry.date).toUTCString()}
        </li>
      ))}
    </ul>
  );
};

export default KeypadHistory;
