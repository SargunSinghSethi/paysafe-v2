interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({
  title,
  children,
}: CardProps): JSX.Element {
  return (
    <div className="border p-4">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>
        {children}
      </p>
    </div>
  );
}
