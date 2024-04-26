import React, { createContext, useState } from "react";
import { deepForEach, deepMap } from "react-children-utilities";

interface TextTranslationContextType {
  translation: boolean;
  setTranslation: (value: boolean) => void;
}

export const TextTranslationContext = createContext<TextTranslationContextType>(
  {
    translation: false,
    setTranslation: () => {},
  }
);

export const MyAutoTranslated: React.FC<any> = ({ children }) => {
  const [translation, setTranslation] = useState<boolean>(true);

  // useEffect(() => {
  //   setTranslation(true);
  // }, []);

  return (
    <TextTranslationContext.Provider value={{ translation, setTranslation }}>
      {children}
    </TextTranslationContext.Provider>
  );
};
