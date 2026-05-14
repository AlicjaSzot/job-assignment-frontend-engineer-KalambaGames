import React from "react";
import FormInput from "components/FormInput/FormInput";
import FormTextarea from "components/FormTextarea/FormTextarea";

export default function Settings(): JSX.Element {
  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <FormInput id="profile-picture" type="text" placeholder="URL of profile picture" />
                  <FormInput fieldSize="lg" type="text" placeholder="Your Name" />
                  <FormTextarea id="short-bio" fieldSize="lg" rows={8} placeholder="Short bio about you" />
                  <FormInput fieldSize="lg" type="text" placeholder="Email" />
                  <FormInput fieldSize="lg" type="password" placeholder="Password" />
                  <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </fieldset>
              </form>
              <hr />
              <a className="btn btn-outline-danger" href="/#/logout">
                Or click here to logout.
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
