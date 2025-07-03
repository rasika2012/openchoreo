import { Box, ImageBuilding } from '@open-choreo/design-system';

export function FullPageLoader() {
  return (
    <Box
      testId="full-page-loader"
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100%'
    >
      <ImageBuilding />
    </Box>
  );
}
