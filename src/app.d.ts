// See https://svelte.dev/docs/kit/types#app.d.ts
// import type { JwtPayload } from "jsonwebtoken";
// for information about these interfaces

declare global {
  namespace App {
    interface Locals {
      user: {
      email: string;
      firstName: string | undefined;
      lastName: string| undefined;
      }| null;
    }
  }
}

export {};
