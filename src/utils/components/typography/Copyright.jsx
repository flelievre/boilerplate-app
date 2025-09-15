import {
  Typography,
  Link,
} from '@mui/material';
import {
  VITE_APP_NAME,
  VITE_WEB_APP_URL,
} from '@/config';

const Copyright = ({
  sx = {},
  url = VITE_WEB_APP_URL,
  companyName = VITE_APP_NAME,
}) => (
<Typography variant="body2" align="center" sx={{ ...sx }}>
      <Link underline="hover" color="inherit" href={url}>
        {`© Copyright ${companyName} ${new Date().getFullYear()}.`}
      </Link>
    </Typography>
);

export default Copyright;
