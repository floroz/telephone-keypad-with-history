import KeypadHistory from "./keypad/keypad-history.component";
import { KeyPad } from "./keypad/keypad.component";
import { KeyPressHistoryProvider } from "./keypad/keypad.context";

function App() {
  return (
    <KeyPressHistoryProvider>
      <h1>Key Pad with History</h1>
      <main>
        <KeyPad />
        <KeypadHistory />
      </main>
    </KeyPressHistoryProvider>
  );
}

export default App;
