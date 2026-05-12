interface Tab {
  id: string;
  label: string;
  active: boolean;
}

interface NavTabsProps {
  tabs: Tab[];
  onTabClick?: (tabId: string) => void;
}

export default function NavTabs({ tabs, onTabClick }: NavTabsProps) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {tabs.map(tab => (
          <li key={tab.id} className="nav-item">
            <a
              className={`nav-link ${tab.active ? "active" : "disabled"}`}
              href="#"
              onClick={e => {
                e.preventDefault();
                onTabClick?.(tab.id);
              }}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
