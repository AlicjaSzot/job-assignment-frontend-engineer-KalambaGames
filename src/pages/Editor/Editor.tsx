import React from "react";
import FormInput from "components/FormInput/FormInput";
import FormTextarea from "components/FormTextarea/FormTextarea";

export default function Editor(): JSX.Element {
  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <FormInput fieldSize="lg" type="text" placeholder="Article Title" />
                  <FormInput id="article-about" type="text" placeholder="What's this article about?" />
                  <FormTextarea id="article-body" rows={8} placeholder="Write your article (in markdown)" />
                  <FormInput type="text" placeholder="Enter tags">
                    <div className="tag-list" />
                  </FormInput>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
