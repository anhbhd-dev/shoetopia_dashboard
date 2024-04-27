import { Button } from "@chakra-ui/react";

export type PaginationPropsType = {
  className?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
};
export default function Pagination({
  className,
  currentPage,
  totalPage,
  setCurrentPage,
}: PaginationPropsType) {
  return (
    <div className={className}>
      {currentPage > 1 && (
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </Button>
      )}
      {Array.from({ length: totalPage }).map((_, i) => (
        <Button
          onClick={() => setCurrentPage(i + 1)}
          key={i}
          colorScheme="teal"
          variant={currentPage === i + 1 ? "solid" : "outline"}
        >
          {i + 1}
        </Button>
      ))}
      {currentPage < totalPage && (
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Trang sau
        </Button>
      )}
    </div>
  );
}
