import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IFlattenedCategory } from 'src/common/@types/product/category.interface';
import { getRandomColor } from '../../utils';

export default function SortableItem({ item }: { item: IFlattenedCategory }) {
  const { ancestorIds = [] } = item;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
    data: { ancestorIds },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '0 8px',
    margin: '8px 4px',
    background: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    color: getRandomColor(item.id),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p style={{ paddingLeft: `${ancestorIds.length * 20}px` }}>📁 {item.id}</p>
    </div>
  );
}
