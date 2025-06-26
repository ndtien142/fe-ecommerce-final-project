import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Chip,
  Paper,
  Skeleton,
  Alert,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useGetCategoriesTree } from 'src/management-categories/common/hooks/useGetCategoriesTree';
import { ICategory } from 'src/common/@types/product/category.interface';

interface CategoryItemProps {
  category: ICategory;
  level: number;
  onCategoryClick: (categorySlug: string) => void;
  selectedCategory?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  level,
  onCategoryClick,
  selectedCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.slug;

  const handleCategoryClick = () => {
    onCategoryClick(category.slug);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ListItem disablePadding sx={{ pl: level * 2 }}>
        <ListItemButton
          onClick={handleCategoryClick}
          selected={isSelected}
          sx={{
            borderRadius: 1,
            mx: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
          }}
        >
          {hasChildren && (
            <IconButton size="small" onClick={handleToggleExpand} sx={{ mr: 1, color: 'inherit' }}>
              <Icon
                icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                width={20}
                height={20}
              />
            </IconButton>
          )}
          <Icon icon="mdi:tag-outline" width={18} height={18} style={{ marginRight: 8 }} />
          <ListItemText
            primary={category.name}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: isSelected ? 600 : 400,
            }}
          />
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.children.map((child) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                onCategoryClick={onCategoryClick}
                selectedCategory={selectedCategory}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  const { data: categoriesTree, isLoading, error } = useGetCategoriesTree();

  const handleCategoryClick = (categorySlug: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (categorySlug) {
      newSearchParams.set('category', categorySlug);
    } else {
      newSearchParams.delete('category');
    }

    navigate({ search: newSearchParams.toString() });
  };

  const handleClearCategory = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('category');
    navigate({ search: newSearchParams.toString() });
  };

  if (isLoading) {
    return (
      <Paper sx={{ width: 280, p: 2, height: 'fit-content' }}>
        <Skeleton variant="text" width="60%" height={32} />
        <Divider sx={{ my: 2 }} />
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={40} sx={{ mb: 1, borderRadius: 1 }} />
        ))}
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ width: 280, p: 2 }}>
        <Alert severity="error">Error loading categories</Alert>
      </Paper>
    );
  }

  const selectedCategoryName = categoriesTree?.metadata?.find((cat) =>
    findCategoryBySlug(cat, selectedCategory)
  );

  return (
    <Paper
      elevation={2}
      sx={{
        width: 280,
        height: 'fit-content',
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Icon icon="mdi:view-list" width={24} height={24} />
            Categories
          </Typography>
          {selectedCategory && (
            <Button
              size="small"
              startIcon={<Icon icon="mdi:close" width={16} height={16} />}
              onClick={handleClearCategory}
              color="error"
              variant="outlined"
              sx={{ minWidth: 'auto', px: 1 }}
            >
              Clear
            </Button>
          )}
        </Box>

        {selectedCategory && (
          <Chip
            label={`Filtered: ${
              findCategoryBySlug(categoriesTree?.metadata?.[0], selectedCategory)?.name ||
              selectedCategory
            }`}
            onDelete={handleClearCategory}
            color="primary"
            size="small"
            sx={{ mb: 1 }}
          />
        )}
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List dense>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleClearCategory}
              selected={!selectedCategory}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <Icon
                icon="mdi:view-grid-outline"
                width={18}
                height={18}
                style={{ marginRight: 8 }}
              />
              <ListItemText
                primary="All Categories"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: !selectedCategory ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>

          {categoriesTree?.metadata?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              level={0}
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
            />
          ))}
        </List>
      </Box>
    </Paper>
  );
};

// Helper function to find category by slug in nested structure
const findCategoryBySlug = (
  category: ICategory | undefined,
  slug: string
): ICategory | undefined => {
  if (!category) return undefined;
  if (category.slug === slug) return category;

  for (const child of category.children || []) {
    const found = findCategoryBySlug(child, slug);
    if (found) return found;
  }

  return undefined;
};

export default Navbar;
