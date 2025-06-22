import { ICategory, IFlattenedCategory } from 'src/common/@types/product/category.interface';

export function flattenWithAncestors(items: IFlattenedCategory[]): IFlattenedCategory[] {
  return items.reduce<IFlattenedCategory[]>((acc, item) => {
    acc.push(item);
    if (item.children) {
      const children = item.children.map((i) => ({
        ...i,
        ancestorIds: [...(item.ancestorIds || []), item.id],
      }));
      acc.push(...flattenWithAncestors(children));
    }
    return acc;
  }, []);
}

export const COLORS_MAP: Record<string, string> = {};
export function getRandomColor(id: string) {
  if (COLORS_MAP[id]) return COLORS_MAP[id];
  COLORS_MAP[id] = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return COLORS_MAP[id];
}

let ActiveItem: ICategory | null = null;

function findActiveItem(items: ICategory[], activeId: string) {
  items.forEach((item) => {
    if (item.id === activeId) {
      ActiveItem = { ...item };
      return;
    }
    if (item.children) {
      findActiveItem(item.children, activeId);
    }
  });
}

function insertActiveItem(
  items: ICategory[],
  activeId: string,
  activeIndex: number,
  overId: string,
  overIndex: number,
  insertFirst: boolean
): ICategory[] {
  let hasOverId = false;
  const newItems = items.map((item): ICategory & { isActive?: boolean } => {
    if (item.id === activeId) return { ...item, isActive: true };
    if (item.id === overId) hasOverId = true;
    return {
      ...item,
      children: item.children
        ? insertActiveItem(item.children, activeId, activeIndex, overId, overIndex, insertFirst)
        : item.children,
    };
  });

  if (hasOverId && ActiveItem) {
    const overItemIndex = newItems.findIndex((item) => item.id === overId);
    if (overItemIndex === 0 && insertFirst) newItems.unshift(ActiveItem);
    else if (overItemIndex > -1) {
      const startIndex = activeIndex < overIndex ? overItemIndex + 1 : overItemIndex;
      newItems.splice(startIndex, 0, ActiveItem);
    }
  }
  return newItems.filter((item) => !item.isActive);
}

export default function genNewItems(
  items: ICategory[],
  flattenedItems: IFlattenedCategory[],
  activeId: string,
  overId: string
): ICategory[] {
  const activeIndex = flattenedItems.findIndex((i) => i.id === activeId);
  const overIndex = flattenedItems.findIndex((i) => i.id === overId);

  let insertFirst = false;
  if (activeIndex < overIndex) {
    const over = flattenedItems[overIndex];
    const nextOver = flattenedItems[overIndex + 1];
    if (nextOver && nextOver.ancestorIds?.includes(over.id)) {
      overId = nextOver.id;
      insertFirst = true;
    }
  }

  ActiveItem = null;
  findActiveItem(items, activeId);
  if (!ActiveItem) return items;

  return insertActiveItem(items, activeId, activeIndex, overId, overIndex, insertFirst);
}

// Flatten categories for easier manipulation
export type IFlattenedCategoryV2 = ICategory & { depth: number };

export const flattenCategories = (
  categories: ICategory[],
  parentName: string = '',
  depth: number = 0
): IFlattenedCategoryV2[] => {
  let result: IFlattenedCategoryV2[] = [];

  for (const category of categories) {
    const fullName = parentName ? `${parentName} > ${category.name}` : category.name;
    result.push({
      id: category.id,
      name: fullName,
      description: category.description ?? '',
      slug: category.slug ?? '',
      sortOrder: category.sortOrder ?? 0,
      status: category.status ?? 'active',
      children: category.children ?? [],
      depth,
    });

    if (category.children?.length > 0) {
      result = result.concat(flattenCategories(category.children, fullName, depth + 1));
    }
  }

  return result;
};
