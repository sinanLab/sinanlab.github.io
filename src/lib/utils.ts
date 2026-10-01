export function withBase(path = ''): string {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(date);
}

export function dateDescending(a: { data: { date?: Date } }, b: { data: { date?: Date } }): number {
  return (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0);
}

export function publicationDescending(a: { data: { year: number | null } }, b: { data: { year: number | null } }): number {
  return (b.data.year ?? 0) - (a.data.year ?? 0);
}
