import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { User } from "./schemas.js";

@Injectable()
export class AuthService {
  private readonly users: Record<string, { user: User; password: string }> = {
    "demo@spectra.dev": {
      user: { id: "u_1", email: "demo@spectra.dev", displayName: "Demo User" },
      password: "demo1234",
    },
  };

  private readonly tokens = new Map<string, string>();

  login(email: string, password: string): { token: string; user: User } {
    const record = this.users[email];
    if (!record || record.password !== password) {
      throw new UnauthorizedException("invalid credentials");
    }
    const token = `tk_${Math.random().toString(36).slice(2)}`;
    this.tokens.set(token, record.user.id);
    return { token, user: record.user };
  }

  resolve(token: string): string | undefined {
    return this.tokens.get(token);
  }

  findById(userId: string): User | undefined {
    return Object.values(this.users).find((u) => u.user.id === userId)?.user;
  }
}
