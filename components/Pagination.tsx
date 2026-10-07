import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  params,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const href = (page: number) => {
    const sp = new URLSearchParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value) sp.set(key, value);
      }
    }
    sp.set("page", String(page));
    return `${basePath}?${sp.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12 flex-wrap"
      aria-label="Sayfalama"
    >
      {currentPage > 1 ? (
        <Link
          href={href(currentPage - 1)}
          className="glass px-4 py-2 rounded-full text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
        >
          Önceki
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-full text-label-md text-outline/40 select-none">
          Önceki
        </span>
      )}

      {pages.map((p) =>
        p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary text-label-md font-medium"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className="w-10 h-10 flex items-center justify-center rounded-full glass text-on-surface-variant hover:text-on-surface transition-colors text-label-md"
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={href(currentPage + 1)}
          className="glass px-4 py-2 rounded-full text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
        >
          Sonraki
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-full text-label-md text-outline/40 select-none">
          Sonraki
        </span>
      )}
    </nav>
  );
}
