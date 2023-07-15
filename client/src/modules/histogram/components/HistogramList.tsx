import { useState } from "react";
import "./HistogramList.css";
import { Loading } from "../../../components/Loading";

type Props = {
  isLoading?: boolean;
  data: { word: string; frequency: number; no: number }[];
};
export const HistogramList = ({ isLoading, data }: Props) => {
  const itemsPerPage = 20; // Number of items to display per page

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Word</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            currentItems.map((item) => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.word}</td>
                <td>{item.frequency}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => handlePaginationClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
