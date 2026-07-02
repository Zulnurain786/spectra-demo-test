import { useState, type ReactElement, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Item } from "../api/client.js";

const ITEMS_QUERY_KEY = ["dashboard", "items"] as const;
const ME_QUERY_KEY = ["me"] as const;

export function Dashboard(): ReactElement {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: () => api.me(),
  });

  const itemsQuery = useQuery({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: () => api.listItems(),
  });

  const addMutation = useMutation<Item, Error, string>({
    mutationFn: (newTitle) => api.addItem(newTitle),
    onSuccess: (created) => {
      queryClient.setQueryData<Item[]>(ITEMS_QUERY_KEY, (prev) => [created, ...(prev ?? [])]);
      setTitle("");
    },
  });

  function handleAdd(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!title.trim()) return;
    addMutation.mutate(title.trim());
  }

  const userName = meQuery.data?.user.displayName ?? "...";
  const items = itemsQuery.data ?? [];

  return (
    <main data-testid="screen-dashboard" style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "system-ui" }}>
      <header data-testid="dashboard-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Dashboard</h1>
        <span data-testid="dashboard-user">{userName}</span>
      </header>
      <form data-testid="add-item-form" onSubmit={handleAdd} style={{ display: "flex", gap: 8, margin: "1rem 0" }}>
        <input
          data-testid="add-item-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New item title"
          style={{ flex: 1 }}
        />
        <button data-testid="add-item-submit" type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>
      {itemsQuery.isLoading ? (
        <p data-testid="items-loading">Loading items…</p>
      ) : itemsQuery.error ? (
        <p data-testid="items-error" role="alert" style={{ color: "crimson" }}>
          {itemsQuery.error.message}
        </p>
      ) : (
        <ul data-testid="items-list">
          {items.map((it) => (
            <li key={it.id} data-testid={`item-${it.id}`}>
              <strong>{it.title}</strong>{" "}
              <small>{new Date(it.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
