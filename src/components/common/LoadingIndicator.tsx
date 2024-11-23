const LoadingIndicator = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin rounded-full border-4 border-t-transparent border-white h-12 w-12"></div>
    </div>
  );
};

export default LoadingIndicator;
