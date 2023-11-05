'use client';

import { Box, UserAvatar, Logo } from '@dhis2/ui';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center">
      <Box className="flex h-full w-full max-w-screen-lg items-center justify-between py-3">
        <Box className="height=[32px] w-[100px]">
          <Logo />
        </Box>

        <UserAvatar name="Jane Doe" />
      </Box>
    </header>
  );
};
