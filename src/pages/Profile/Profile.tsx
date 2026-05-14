import { useParams } from "react-router-dom";
import { useProfile, useToggleFollow } from "api/profile/useProfile";
import { useAuth } from "api/auth/useAuth";
import { DEFAULT_AVATAR } from "utils/constants";
import ProfileArticleList from "./ProfileArticleList";

export default function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const { profile, isLoading: profileLoading, isError: profileError } = useProfile(username);
  const { toggleFollow, isLoading: followLoading } = useToggleFollow(username);

  if (profileLoading)
    return (
      <div className="container page">
        <p>Loading profile...</p>
      </div>
    );
  if (profileError || !profile)
    return (
      <div className="container page">
        <p>Could not load profile.</p>
      </div>
    );

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image || DEFAULT_AVATAR} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                {isLoggedIn && (
                  <button
                    className={`btn btn-sm action-btn ${profile.following ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={(): void => toggleFollow(profile.following)}
                    disabled={followLoading}
                  >
                    <i className={`ion-${profile.following ? "minus" : "plus"}-round`} />
                    &nbsp;{profile.following ? "Unfollow" : "Follow"} {profile.username}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                </ul>
              </div>

              <ProfileArticleList username={username} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
