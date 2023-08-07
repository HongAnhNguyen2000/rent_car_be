import { Icon } from '@iconify/react';
import { useRef, useState, useCallback, useEffect } from 'react';
import peopleFill from '@iconify/icons-eva/people-fill';
import { alpha } from '@mui/material/styles';
import { ListItem, ListItemAvatar, Typography, ListItemText, Avatar } from '@mui/material';
import useIsMountedRef from 'hooks/useIsMountedRef';
import axios from 'utils/axios';
import { fToNow } from 'utils/formatTime';
import Scrollbar from 'components/common/Scrollbar';
import MenuPopover from 'components/common/MenuPopover';
import { MIconButton } from 'components/@material-extend';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;
const PADDING_ITEM = 2.5;

export default function ContactsPopover() {
  const anchorRef = useRef(null);
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  const getContacts = useCallback(async () => {
    try {
      const response = await axios.get('/api/chat/contacts');
      if (isMountedRef.current) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        color={open ? 'primary' : 'default'}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Icon icon={peopleFill} width={20} height={20} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Typography variant="h6" sx={{ p: PADDING_ITEM }}>
          Contacts <Typography component="span">({contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 8 }}>
          {contacts.map((contact) => {
            const { id, name, avatar, status, lastActivity } = contact;

            return (
              <ListItem
                button
                disableGutters
                key={id}
                sx={{ px: PADDING_ITEM, height: ITEM_HEIGHT }}
              >
                <ListItemAvatar sx={{ position: 'relative' }}>
                  <Avatar src={avatar} />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                  secondaryTypographyProps={{ typography: 'caption' }}
                  primary={name}
                  secondary={status === 'offline' && fToNow(lastActivity)}
                />
              </ListItem>
            );
          })}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
