const Search = () => {
  return (
    <div className="relative flex items-center max-w-[190px]">
      <svg
        className="absolute left-4 fill-[#9e9ea7] w-4 h-4"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </g>
      </svg>
      <input
        placeholder="Search"
        type="search"
        className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-transparent bg-[#f3f3f4] text-[#0d0c22] placeholder-[#9e9ea7] outline-none transition duration-300 hover:border-[rgba(234,76,137,0.4)] hover:bg-white hover:shadow-[0_0_0_4px_rgb(234_76_137_/_10%)] focus:border-[rgba(234,76,137,0.4)] focus:bg-white focus:shadow-[0_0_0_4px_rgb(234_76_137_/_10%)]"
      />
    </div>
  );
}

export default Search;