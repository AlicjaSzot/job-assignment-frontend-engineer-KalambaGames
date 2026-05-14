import { useParams } from "react-router-dom";
import ArticleBanner from "./ArticleBanner";
import ArticleBody from "./ArticleBody";

export default function Article(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="article-page">
      <ArticleBanner slug={slug} />
      <div className="container page">
        <ArticleBody slug={slug} />
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
