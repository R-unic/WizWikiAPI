export const ToTitleCase = (item: string): string =>
    item
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b[a-z]/g, t => t.toUpperCase());