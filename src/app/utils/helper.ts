export function toggleExpandedOverview(
    isExpanded: { [key: number]: boolean },
    id: number
  ): { [key: number]: boolean } {
    return {
      ...isExpanded,
      [id]: !isExpanded[id],
    };
}
  
export function truncateOverview(text: string, wordLimit: number = 30): string {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
}