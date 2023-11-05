'use client';

import Image from 'next/image';
import { UserAvatar } from '@dhis2/ui';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center">
      <div className="flex h-full w-full max-w-screen-lg items-center justify-between py-3">
        <Image src="dhis2-logo.svg" width={100} height={32} alt="DHIS2 logo" />

        <UserAvatar name="Jane Doe" />
      </div>
    </header>
  );
};
