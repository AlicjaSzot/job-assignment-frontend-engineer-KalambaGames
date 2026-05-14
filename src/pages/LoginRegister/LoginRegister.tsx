import React, { useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useLogin, useRegister } from "api/auth/useAuth";
import { parseApiErrors } from "utils/parseApiErrors";
import FormInput from "components/FormInput/FormInput";

export default function LoginRegister(): JSX.Element {
  const isLogin = !!useRouteMatch({ path: "/login", exact: true });
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSuccess = (): void => {
    history.push("/");
  };

  const { login, isLoading: loginLoading, error: loginError } = useLogin();
  const { register, isLoading: registerLoading, error: registerError } = useRegister();

  const isLoading = isLogin ? loginLoading : registerLoading;
  const errors: string[] = (isLogin ? loginError : registerError)
    ? parseApiErrors(isLogin ? loginError : registerError)
    : [];

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isLogin) {
      login({ email, password }, { onSuccess });
    } else {
      register({ username, email, password }, { onSuccess });
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{isLogin ? "Sign in" : "Sign up"}</h1>
            <p className="text-xs-center">
              {isLogin ? <Link to="/register">Need an account?</Link> : <Link to="/login">Have an account?</Link>}
            </p>

            {errors.length > 0 && (
              <ul className="error-messages">
                {errors.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <FormInput
                  fieldSize="lg"
                  type="text"
                  placeholder="Your Name"
                  value={username}
                  onChange={(e): void => setUsername(e.target.value)}
                  required
                />
              )}
              <FormInput
                fieldSize="lg"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e): void => setEmail(e.target.value)}
                required
              />
              <FormInput
                fieldSize="lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e): void => setPassword(e.target.value)}
                required
              />
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={isLoading}>
                {isLoading ? "Please wait…" : isLogin ? "Sign in" : "Sign up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
