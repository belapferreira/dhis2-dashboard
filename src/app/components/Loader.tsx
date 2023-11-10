export const Loader = () => {
  return (
    <div className="bg-gray-900 flex h-52 w-full flex-1 items-center justify-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white -ml-1 mr-3 h-7 w-7 animate-spin"
      >
        <g clipPath="url(#clip0_295_3680)">
          <circle
            opacity="0.15"
            cx="12"
            cy="12"
            r="10"
            stroke="#6E7A8A"
            strokeWidth="4"
          />
          <path
            d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2"
            stroke="#147CD7"
            strokeWidth="4"
          />
        </g>
        <defs>
          <clipPath id="clip0_295_3680">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
