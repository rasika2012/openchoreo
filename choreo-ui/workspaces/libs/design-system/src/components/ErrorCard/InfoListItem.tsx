import Info from '@design-system/Icons/generated/Info';
import { Box, Typography } from '@mui/material';

interface InfoListItemProps {
  message: string | React.ReactNode;
}

export const InfoListItem: React.FC<InfoListItemProps> = ({ message }) => {
  return (
    <Box className="infoListItem">
      <Box className="infoListItemIcon">
        <Info color="primary" fontSize="inherit" />
      </Box>
      <Box className="infoListItemMessage">
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoListItem;
