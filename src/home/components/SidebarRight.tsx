import React from 'react';
import { Box, List, ListItem, ListItemText, Link, Typography } from '@mui/material';

const SidebarRight: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 320,
        boxShadow: 1,
        p: 2,
      }}
    >
      {/* Menu Widget */}
      <Box sx={{ mb: 2 }}>
        <List>
          <ListItem>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Video - Clip sản phẩm
            </Typography>
            <i className="icon-arrow-1 fs-10" />
          </ListItem>
          <ListItem>
            <Typography variant="body1">CHÍNH SÁCH BẢO HÀNH TÔN HOA SEN</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Hệ thống siêu thị toàn quốc
            </Typography>
            <i className="icon-arrow-1 fs-10" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SidebarRight;
