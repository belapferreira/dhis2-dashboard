import { Box, Center, CircularLoader } from '@dhis2/ui';

export const Loader = () => {
  return (
    <Box height="200px">
      <Center>
        <CircularLoader />
      </Center>
    </Box>
  );
};
