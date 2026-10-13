/**
 * The search's "Suggest it" hands its query to the suggestion form, which
 * fills its product field and takes focus.
 */
const EVENT = 'justevery:suggest';

export function requestSuggestion(product: string): void {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: product }));
}

export function onSuggestionRequest(
  handler: (product: string) => void
): () => void {
  const listener = (event: Event) =>
    handler((event as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
