// Prefix site-local Markdown links and image sources for repository deployments.
export default function markdownBasePath(base = '/') {
  const prefix = base.replace(/\/$/, '');
  return {
    name: 'academic-base-path',
    element: {
      filter: ['a', 'img', 'iframe', 'source'],
      visit(node, context) {
        for (const key of ['href', 'src']) {
          const value = node.properties?.[key];
          if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
            context.setProperty(node, key, `${prefix}${value}`);
          }
        }
      },
    },
  };
}
