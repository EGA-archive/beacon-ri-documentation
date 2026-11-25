import React, { createContext, useContext, useState } from "react";

interface SearchableContent {
  route: string;
  text: string;
  title: string;
}

interface SearchableContentContextProps {
  searchableContent: SearchableContent[];
  addSearchableContent: (route: string, text: string, title: string) => void;
}

const SearchableContentContext = createContext<
  SearchableContentContextProps | undefined
>(undefined);

export const SearchableContentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchableContent, setSearchableContent] = useState<
    SearchableContent[]
  >([]);

  const addSearchableContent = (route: string, text: string, title: string) => {
    setSearchableContent((prev) => [
      ...prev.filter((item) => item.route !== route),
      { route, text, title },
    ]);
  };

  return (
    <SearchableContentContext.Provider
      value={{ searchableContent, addSearchableContent }}
    >
      {children}
    </SearchableContentContext.Provider>
  );
};

export const useSearchableContent = () => {
  const context = useContext(SearchableContentContext);
  if (!context) {
    throw new Error(
      "useSearchableContent must be used within a SearchableContentProvider"
    );
  }
  return context;
};
