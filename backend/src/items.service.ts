import { Injectable } from "@nestjs/common";
import type { Item } from "./schemas.js";

@Injectable()
export class ItemsService {
  private readonly itemsByUser = new Map<string, Item[]>();

  list(userId: string): Item[] {
    return this.itemsByUser.get(userId) ?? [];
  }

  add(userId: string, title: string): Item {
    const item: Item = {
      id: `it_${Math.random().toString(36).slice(2)}`,
      title,
      createdAt: new Date().toISOString(),
    };
    const existing = this.itemsByUser.get(userId) ?? [];
    existing.unshift(item);
    this.itemsByUser.set(userId, existing);
    return item;
  }
}
