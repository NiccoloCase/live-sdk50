import { useEffect, useMemo, useRef, useState } from "react";
import {
  User,
  useSearchUserByTextOrPhoneNumberLazyQuery,
  useSearchUserByTextOrPhoneNumberQuery,
} from "../../generated/graphql";
import _, { debounce } from "lodash";

const MIN_TEXT_LENGTH = 3;

export const useSearchUserByText = (): [(t: string) => void, users: User[]] => {
  const [searchQuery, { data, error }] =
    useSearchUserByTextOrPhoneNumberLazyQuery();

  useEffect(() => {
    if (error) console.warn(error);
  }, []);

  let timeoutId = useRef<NodeJS.Timeout | null>();
  const lastDataTime = useRef<null | Date>();

  const [results, setResults] = useState<User[]>([]);

  const debouncedOnTextChange = debounce(async (text: string) => {
    const { data } = await searchQuery({
      variables: {
        text,
      },
      fetchPolicy: "network-only",
    });
    if (data?.searchUserByTextOrPhoneNumber)
      setResults(data.searchUserByTextOrPhoneNumber as any);
  }, 500);

  const onTextChange = (text: string) => {
    if (text.length < MIN_TEXT_LENGTH) setResults([]);

    // Cancella il timeout esistente, se presente
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      debouncedOnTextChange(text);
    }, 200);
  };

  return [onTextChange, results];
};
