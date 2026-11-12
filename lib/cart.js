"use client";

/**
 * The cart lives in this browser's localStorage: one line per book and
 * format, with a quantity. Every change fires "cart-updated" so the header
 * badge follows without a reload.
 */
const KEY = "gp_cart";

export function readCart() {
  if (typeof window === "undefined") return [];
  try {
    const items = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function write(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage blocked: the cart just won't persist */
  }
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(book, format = "Hard copy", qty = 1) {
  const items = readCart();
  const line = items.find((i) => i.bookId === book._id && i.format === format);
  if (line) line.quantity = Math.min(20, line.quantity + qty);
  else
    items.push({
      bookId: book._id,
      slug: book.slug,
      title: book.title,
      author: book.author,
      cover: book.frontCoverImage,
      price: book.price,
      format,
      quantity: qty
    });
  write(items);
}

export function setQuantity(bookId, format, quantity) {
  write(readCart().map((i) => (i.bookId === bookId && i.format === format ? { ...i, quantity: Math.max(1, Math.min(20, quantity)) } : i)));
}

export function removeLine(bookId, format) {
  write(readCart().filter((i) => !(i.bookId === bookId && i.format === format)));
}

export const cartCount = (items) => items.reduce((n, i) => n + i.quantity, 0);
