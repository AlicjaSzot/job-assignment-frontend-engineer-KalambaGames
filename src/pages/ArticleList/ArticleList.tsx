import { useState } from "react";
import Banner from "components/Banner/Banner";
import TagList from "components/TagList/TagList";
import NavTabs from "components/NavTabs/NavTabs";
import ArticleListContent from "./ArticleListContent";
import { MOCK_TAGS } from "utils/constants";

export default function ArticleList(): JSX.Element {
  const [activeTab, setActiveTab] = useState("global");

  const tabs = [
    { id: "your-feed", label: "Your Feed", active: activeTab === "your-feed" },
    { id: "global", label: "Global Feed", active: activeTab === "global" },
  ];

  return (
    <div className="home-page">
      <Banner title="conduit" subtitle="A place to share your knowledge." />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <NavTabs tabs={tabs} onTabClick={setActiveTab} />
            <ArticleListContent activeTab={activeTab} />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList tags={MOCK_TAGS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
