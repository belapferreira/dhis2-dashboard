import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center px-6">
      <div className="flex h-full w-full max-w-screen-lg items-center justify-between py-3">
        <Image
          src="dhis2-logo.svg"
          width={100}
          height={30.33}
          alt="DHIS2 logo"
        />

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-app-grey-600 text-sm text-app-grey-050"
          title="Jane Doe"
        >
          JD
        </div>
      </div>
    </header>
  );
};
