const portRegex = /:\d+$/g;

export default function mangleReturningCookie(
  content: string,
  existingDomain: string,
  targetDomain: string,
  targetInsecure: boolean
): string {
  const portlessExistingDomain = existingDomain.replaceAll(portRegex, '');
  const portlessTargetDomain = targetDomain.replaceAll(portRegex, '');

  //Mangle domain
  if (portlessTargetDomain !== 'localhost') {
    content = content.replaceAll(`domain=${portlessExistingDomain}`, `domain=${portlessTargetDomain}`);
  } else {
    // In case of localhost -- drop domain at all. (RFC stuff)
    // NOTE: this is used only development.
    content = content.replaceAll(/;\s*domain=[\w.]+(;\s*)?/g, '$1');
  }

  //Mangle secure flag
  if (targetInsecure) {
    content = content.replaceAll(/;\s*secure(;\s*)?/g, '$1');
  }

  return content;
}
