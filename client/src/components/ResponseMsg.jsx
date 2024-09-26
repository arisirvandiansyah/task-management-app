export const Error = ({ msg }) => {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-center p-3 uppercase font-semibold mb-3 rounded-md">
      {msg}
    </div>
  );
};

export const Success = ({ msg }) => {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-center p-3 uppercase font-semibold mb-3 rounded-md">
      {msg}
    </div>
  );
};
