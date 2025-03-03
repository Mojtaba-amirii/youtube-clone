export default function Loader() {
  <div className=" fixed inset-0 backdrop-blur-xs flex items-center justify-center h-screen w-screen">
    <div
      className=" animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-white"
      role="status"
      aria-label="Loading.."
    />
  </div>;
}
