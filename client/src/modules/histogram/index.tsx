import React from "react";
import { HistogramList } from "./components/HistogramList";
import { SearchBar } from "./components/SearchBar";
import { useNotification } from "../../hooks/useNotification";

type HistogramData = {
  id: number;
  url: string;
  words: { word: string; frequency: number; no: number }[];
};

export const Histogram = () => {
  const [data, setData] = React.useState<HistogramData>();

  const [loading, setLoading] = React.useState(false);

  const [searchUrl, setSearchUrl] = React.useState("");
  
  const notify = useNotification();

  const handleSearch = (value: string) => {
    setSearchUrl(value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `http://localhost:8000/histogram?url=${searchUrl}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const error = await response.json();
          return notify({
            type: "error",
            message: error.detail[0].msg,
          });
        }
        const data = (await response.json()) as HistogramData;
        setData({
          ...data,
          words: data.words.map((w, index) => ({ ...w, no: index + 1 })),
        });
      } catch (error) {
        notify({
          type: "error",
          message: "Unknow Exception",
        });
      } finally {
        setLoading(false);
      }
    };

    if (searchUrl) {
      void fetchData();
    }
  }, [searchUrl, notify]);

  return (
    <div>
      <SearchBar isLoading={loading} onSearch={handleSearch} />
      <HistogramList isLoading={loading} data={data?.words ?? []} />
    </div>
  );
};
