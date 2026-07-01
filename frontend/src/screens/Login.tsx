import { useState, type ReactElement, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { api, type LoginResponse } from "../api/client.js";

type Props = { onLoginSuccess: () => void };

export function Login({ onLoginSuccess }: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: (payload) => api.login(payload),
    onSuccess: () => onLoginSuccess(),
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    mutation.mutate({ email, password });
  }

  return (
    <main data-testid="screen-login" style={{ maxWidth: 360, margin: "5rem auto", fontFamily: "system-ui" }}>
      <h1 data-testid="login-title">Sign in</h1>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            data-testid="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: 4 }}
          />
        </label>
        <label style={{ display: "block", marginBottom: 12 }}>
          Password
          <input
            data-testid="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: 4 }}
          />
        </label>
        <button data-testid="login-submit" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {mutation.error ? (
        <p data-testid="login-error" role="alert" style={{ color: "crimson" }}>
          {mutation.error.message}
        </p>
      ) : null}
    </main>
  );
}
