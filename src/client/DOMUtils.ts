export function updateTag(
  tagName: string,
  keyName: string,
  keyValue: string,
  attrName: string,
  attrValue: string
): void {
  const node = document.head.querySelector(
    `${tagName}[${keyName}="${keyValue}"]`
  );
  if (node && node.getAttribute(attrName) === attrValue) {
    return;
  }

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    (node.parentNode as HTMLElement).removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}

export function updateMeta(name: string, content: string): void {
  updateTag('meta', 'name', name, 'content', content);
}

export function updateCustomMeta(property: string, content: string): void {
  updateTag('meta', 'property', property, 'content', content);
}

export function updateLink(rel: string, href: string): void {
  updateTag('link', 'rel', rel, 'href', href);
}

export function getComposedPath(event: Event): (HTMLElement)[] {
  // tslint:disable-next-line:no-any
  if ((event as any).path) {
    // tslint:disable-next-line:no-any
    return (event as any).path as HTMLElement[];
  }
  if (event.composedPath) {
    return event.composedPath() as HTMLElement[];
  }
  let el = event.target as HTMLElement;
  const path: (HTMLElement)[] = [];

  while (el) {
    path.push(el);

    if (el.tagName === 'HTML') {
      return path;
    }

    el = el.parentElement as HTMLElement;
  }

  return path;
}

export function checkSafariBrowser(): boolean {
  return (
    navigator.userAgent.indexOf('Safari') !== -1 &&
    navigator.userAgent.indexOf('Chrome') === -1
  );
}
