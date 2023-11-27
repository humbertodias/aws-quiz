const Header = () => {
  return (
    <>
      <div className="flex flex-row">App</div>
      MODE {import.meta.env.MODE}
      <br />
      DEV {import.meta.env.DEV ? "true" : "false"}
      <br />
      VITE_API_URL {import.meta.env.VITE_API_URL}
    </>
  );
};
export default Header;
