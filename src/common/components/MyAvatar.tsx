// hooks
import useAuth from '../hooks/useAuth';
import { useSelector } from '../redux/store';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Avatar
      src={user?.profile?.avatarUrl}
      alt={user?.profile?.firstName || ''}
      color={
        user?.profile?.avatarUrl
          ? 'default'
          : createAvatar(user?.profile?.firstName || user?.email || '').color
      }
      {...other}
    >
      {createAvatar(user?.profile?.firstName || user?.email || '').name}
    </Avatar>
  );
}
