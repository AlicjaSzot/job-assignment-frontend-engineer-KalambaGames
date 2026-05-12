interface TagListProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export default function TagList({ tags, onTagClick }: TagListProps) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <a
          key={tag}
          href={`#`}
          className="tag-pill tag-default"
          onClick={e => {
            e.preventDefault();
            onTagClick?.(tag);
          }}
        >
          {tag}
        </a>
      ))}
    </div>
  );
}
