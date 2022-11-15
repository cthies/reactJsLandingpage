export default function mangleOutgoingCookie(content: string, existingDomain: string, targetDomain: string): string {
  return content.replaceAll(existingDomain, targetDomain);
}
