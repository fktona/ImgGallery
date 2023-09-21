import { useState, useEffect } from "react";

export default function usePage(total_pages) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let newPage = [];
    const pagesToFetch = Math.min(total_pages, 20);
    for (let i = 1; i <= pagesToFetch; i++) {
      newPage.push(i);
    }
    setPages(newPage);
  }, [total_pages]);

  return {
    pages,
    setPages,
    setCurrentPage,
    currentPage,
  };
}
