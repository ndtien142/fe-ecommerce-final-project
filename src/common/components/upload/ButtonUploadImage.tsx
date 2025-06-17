import { m, AnimatePresence } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import { List, IconButton, ListItemText, ListItem } from '@mui/material';
import Image from '../Image';
import Iconify from '../Iconify';
import { varFade } from '../animate';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import { Box, Stack, Button } from '@mui/material';
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';

// Helper to get file data (key, name, preview, size)
function getFileData(file: File | string, index: number) {
  if (typeof file === 'string') {
    return {
      key: file,
      name: file,
      preview: file,
      size: 0,
    };
  }
  return {
    key: file.name + index,
    name: file.name,
    preview: URL.createObjectURL(file),
    size: file.size,
  };
}

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

type ButtonMultiFilePreviewProps = {
  showPreview?: boolean;
  files: (File | string)[];
  onRemove?: (file: File | string) => void;
};

export function ButtonMultiFilePreview({
  showPreview = false,
  files,
  onRemove,
}: ButtonMultiFilePreviewProps) {
  const hasFile = files.length > 0;

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
      <AnimatePresence>
        {files.map((file, index) => {
          const { key, name, preview } = getFileData(file, index);

          if (showPreview) {
            return (
              <ListItem
                key={key}
                component={m.div}
                {...varFade().inRight}
                sx={{
                  p: 0,
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'inline-flex',
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Image alt="preview" src={preview} ratio="1/1" />
                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 6,
                      p: '2px',
                      right: 6,
                      position: 'absolute',
                      color: 'common.white',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                      },
                    }}
                  >
                    <Iconify icon={'eva:close-fill'} />
                  </IconButton>
                )}
              </ListItem>
            );
          }

          return (
            <ListItem
              key={key}
              component={m.div}
              {...varFade().inRight}
              sx={{
                my: 1,
                px: 2,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Iconify
                icon={'eva:file-fill'}
                sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
              />
              <ListItemText
                primary={typeof file === 'string' ? file : name}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
              {onRemove && (
                <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                  <Iconify icon={'eva:close-fill'} />
                </IconButton>
              )}
            </ListItem>
          );
        })}
      </AnimatePresence>
    </List>
  );
}

type ButtonUploadImageProps = {
  error?: boolean;
  showPreview?: boolean;
  files: (File | string)[];
  onUpload: () => void;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: () => void;
  helperText?: React.ReactNode;
  sx?: any;
  [key: string]: any;
};

export default function ButtonUploadImage({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}: ButtonUploadImageProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />
        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <ButtonMultiFilePreview files={files} showPreview={showPreview} onRemove={onRemove} />

      {files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}

      {helperText && helperText}
    </Box>
  );
}
