import { useState, useCallback, useRef } from "react";
import { KeyPressEntry } from "./keypad.types";

const KEYPAD_HISTORY_KEY = "KEYPAD_HISTORY_KEY";

export const getKeypadPressHistory = (): KeyPressEntry[] => {
  if (!window.localStorage) {
    return [];
  }

  let serializedKeypadHistory = window.localStorage.getItem(KEYPAD_HISTORY_KEY);

  if (!serializedKeypadHistory) {
    return [];
  }

  try {
    return JSON.parse(serializedKeypadHistory);
  } catch (error) {
    // logger service
    console.warn(error);
    return [];
  }
};

export const setKeypadPressHistory = (
  keypressHistory: KeyPressEntry[]
): void => {
  if (!window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(
      KEYPAD_HISTORY_KEY,
      JSON.stringify(keypressHistory)
    );
  } catch (error) {
    // logger service
    console.warn(error);
  }
};
