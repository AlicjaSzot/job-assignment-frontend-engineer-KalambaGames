import { useState } from "react";
import Banner from "components/Banner";
import ArticlePreviewCard from "components/ArticlePreviewCard";
import TagList from "components/TagList";
import NavTabs from "components/NavTabs";
import { useQuery } from "react-query";
import { fetchFeedArticles, fetchGlobalArticles } from "api/articlesApi";
import { Article } from "types/articles";

const MOCK_TAGS = ["programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"];

export default function ArticleList() {
  const [activeTab, setActiveTab] = useState("global");

  const tabs = [
    { id: "your-feed", label: "Your Feed", active: activeTab === "your-feed" },
    { id: "global", label: "Global Feed", active: activeTab === "global" },
  ];

  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    error: isErrorArticles,
  } = useQuery(
    ["articles", activeTab],
    () => (activeTab === "your-feed" ? fetchFeedArticles() : fetchGlobalArticles()),
    { retry: false }
  );

  return (
    <>
      <div className="home-page">
        <Banner title="conduit" subtitle="A place to share your knowledge." />

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <NavTabs tabs={tabs} onTabClick={setActiveTab} />

              {isLoadingArticles && <div className="article-preview">Loading articles...</div>}
              {isErrorArticles && <div className="article-preview">An error occurred while loading articles.</div>}

              {!isLoadingArticles &&
                !isErrorArticles &&
                articlesData?.articles?.map((article: Article) => (
                  <ArticlePreviewCard
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    description={article.description}
                    author={article.author}
                    date={article.createdAt}
                    favorited={article.favorited}
                    favoritesCount={article.favoritesCount}
                  />
                ))}
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
    </>
  );
}
