import useAuth from 'hooks/useAuth';
import createAvatar from 'utils/createAvatar';
import MAvatar, { MAvatarProps } from '../@material-extend/MAvatar';


export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </MAvatar>
  );
}
