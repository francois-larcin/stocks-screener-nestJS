export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">
        Cette fonctionnalité est en cours de construction. 🚧
      </p>
    </div>
  );
}
