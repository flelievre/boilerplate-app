import {
  Avatar,
  } from '@mui/material';
import {
  useGetApiProtectedImageSrc,
} from '@/utils';

const AvatarApiProtectedSrc = ({
  src = '',
  ...otherAvatarProps
}) => {
  const {
    imageSrc = '',
  } = useGetApiProtectedImageSrc({
    src,
  });

  return (
    <Avatar
      src={imageSrc}
      // eslint-disable-next-line
      {...otherAvatarProps}
    />
  );
};

export default AvatarApiProtectedSrc;
