import React, { useState } from 'react';
import {
  Card,
  Divider,
  Box,
  Modal,
  Stack,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import useSettings from 'src/common/hooks/useSettings';
import Iconify from 'src/common/components/Iconify';
import { useGetCategoriesTree } from 'src/management-categories/common/hooks/useGetCategoriesTree';

interface FormSelectCategoriesIdProps {
  open: boolean;
  defaultSelected?: string[];
  onClose: () => void;
  onSelect: (categoryIds: string[]) => void;
}

const renderTree = (nodes: any[], selected: string[], onSelect: (id: string) => void) =>
  nodes.map((node) => (
    <TreeItem
      key={node.id}
      nodeId={String(node.id)}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: selected.includes(String(node.id)) ? 'action.selected' : 'inherit',
            px: 1,
            borderRadius: 1,
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(String(node.id));
          }}
        >
          {node.name}
        </Box>
      }
    >
      {Array.isArray(node.children) && node.children.length > 0
        ? renderTree(node.children, selected, onSelect)
        : null}
    </TreeItem>
  ));

// Helper to get all node ids recursively
const getAllNodeIds = (nodes: any[]): string[] => {
  let ids: string[] = [];
  nodes.forEach((node) => {
    ids.push(String(node.id));
    if (Array.isArray(node.children) && node.children.length > 0) {
      ids = ids.concat(getAllNodeIds(node.children));
    }
  });
  return ids;
};

const FormSelectCategoriesId = ({
  open,
  onClose,
  onSelect,
  defaultSelected = [],
}: FormSelectCategoriesIdProps) => {
  const { themeStretch } = useSettings();
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [dense, setDense] = useState(false);

  const { data, isLoading } = useGetCategoriesTree();

  // Get all node ids for defaultExpanded
  const allNodeIds = data?.metadata ? getAllNodeIds(data.metadata) : [];

  const handleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          p: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: themeStretch ? '100%' : { xs: 1, sm: 480, md: 600 },
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Chọn danh mục</Typography>
          <Divider />
          <Box sx={{ height: dense ? 320 : 480, overflow: 'auto', px: 1 }}>
            {isLoading ? (
              <Typography align="center" sx={{ mt: 4 }}>
                Đang tải danh mục...
              </Typography>
            ) : (
              <TreeView
                defaultCollapseIcon={<Iconify icon="mdi:chevron-down" />}
                defaultExpandIcon={<Iconify icon="mdi:chevron-right" />}
                multiSelect
                selected={selected}
                onNodeSelect={(_, ids) => setSelected(Array.isArray(ids) ? ids : [ids])}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
                defaultExpanded={allNodeIds}
              >
                {data?.metadata ? renderTree(data.metadata, selected, handleSelect) : null}
              </TreeView>
            )}
          </Box>
          <Box>
            <FormControlLabel
              control={<Switch checked={dense} onChange={() => setDense((v) => !v)} />}
              label="Dense"
              sx={{ px: 1, py: 1 }}
            />
          </Box>
          <Button variant="contained" onClick={handleConfirm}>
            Chọn danh mục
          </Button>
        </Stack>
      </Card>
    </Modal>
  );
};

export default FormSelectCategoriesId;
