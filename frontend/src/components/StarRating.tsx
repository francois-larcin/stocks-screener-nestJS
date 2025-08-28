export function StarRating({
  value = 0,
  outOf = 5,
}: {
  value?: number;
  outOf?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: outOf }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${
            i < value ? "text-yellow-400" : "text-gray-300"
          } w-5 h-5`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.953L10 0l2.951 5.957 6.561.953-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );
}
