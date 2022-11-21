import {
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from "react";
import { KeyPressEntry } from "./keypad.types";
import { getKeypadPressHistory, setKeypadPressHistory } from "./keypad.utils";

type KeyPressHistoryContext = {
  press: (value: string) => void;
  keypressHistory: KeyPressEntry[];
};

export const KeyPressHistoryContext = createContext<KeyPressHistoryContext>({
  press: (_) => {},
  keypressHistory: [],
});

export const KeyPressHistoryProvider = ({ children }: any) => {
  const [keypressHistory, setPressHistory] = useState<KeyPressEntry[]>(
    getKeypadPressHistory()
  );

  const saveHistory = useCallback((newHistory: KeyPressEntry[]): void => {
    return setKeypadPressHistory(newHistory);
  }, []);

  const addEntry = useCallback(
    (entry: KeyPressEntry) => {
      setPressHistory((prev) => {
        const newhistory = prev.concat(entry);
        saveHistory(newhistory);
        return newhistory;
      });
    },
    [saveHistory]
  );

  const press = useCallback(
    (value: string): void => {
      addEntry({ value, date: new Date().toISOString() });
    },
    [addEntry]
  );

  const value = useMemo<KeyPressHistoryContext>(
    () => ({ press, keypressHistory }),
    [keypressHistory, press]
  );

  return (
    <KeyPressHistoryContext.Provider value={value}>
      {children}
    </KeyPressHistoryContext.Provider>
  );
};

export const useKeypadContext = () => {
  const ctx = useContext(KeyPressHistoryContext);

  if (!ctx) {
    throw new Error("ctx used outside Provider");
  }

  const { press, keypressHistory } = ctx;

  return { press, keypressHistory };
};
