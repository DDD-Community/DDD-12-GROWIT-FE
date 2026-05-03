export async function register() {
  // Node.js 25+ exposes a broken localStorage global (empty object without getItem/setItem).
  // This causes "localStorage.getItem is not a function" errors during SSR.
  // Remove it so code that accesses localStorage without a `typeof window` guard fails gracefully.
  if (
    typeof window === 'undefined' &&
    typeof globalThis.localStorage !== 'undefined' &&
    typeof globalThis.localStorage.getItem !== 'function'
  ) {
    delete (globalThis as any).localStorage;
  }
}
