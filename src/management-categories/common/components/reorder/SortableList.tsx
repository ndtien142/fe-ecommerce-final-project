import { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { useDispatch, useSelector } from 'src/common/redux/store';
import genNewItems, { flattenWithAncestors } from '../../utils';
import { setItemsCategory } from '../../category.slice';

export default function SortableList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.categories.items);
  const flattenedItems = useMemo(
    () =>
      flattenWithAncestors(
        items.map((item) => ({
          ...item,
          ancestorIds: [],
        }))
      ),
    [items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const overAncestorIds = over.data.current?.ancestorIds || [];
    if (overAncestorIds.includes(active.id)) return;

    const newItems = genNewItems(items, flattenedItems, active.id.toString(), over.id.toString());
    dispatch(setItemsCategory(newItems));
  }

  if (flattenedItems.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      //   modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={flattenedItems} strategy={verticalListSortingStrategy}>
        {flattenedItems.map((i) => (
          <SortableItem key={i.id} item={i} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
