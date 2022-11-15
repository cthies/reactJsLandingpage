import tracer from 'src/tracer';

type Type = string;

type Item = {
  [key: string]: string;
};

type HTML = string;

// function getMetaTagContentByProperty(values: Item, property: string): string {
//   return values[property] ?? '';
// }

// function getProduct(html: HTML): Item {
//   const matches = html.matchAll(/<meta property="([\s\S]*?)" content="([\s\S]*?)">/gim);
//   if (matches) {
//     const values = {} as Item;
//     for (const match of matches) {
//       values[match[1]] = match[2];
//     }
//     return {
//       type: getMetaTagContentByProperty(values, 'og:type'),
//       title: getMetaTagContentByProperty(values, 'og:title'),
//       description: getMetaTagContentByProperty(values, 'og:description'),
//       image: getMetaTagContentByProperty(values, 'og:image'),
//       price: getMetaTagContentByProperty(values, 'og:price:amount'),
//       currency: getMetaTagContentByProperty(values, 'og:price:currency'),
//       html,
//     };
//   }
//   return {};
// }

function getContent(type: Type, html: HTML): Item {
  switch (type) {
    // case 'product':
    //   return getProduct(html);
    default:
      return { html };
  }
}

function getItemProps(content: string | void): Item {
  if (!content) {
    return {};
  }
  const pageType = tracer.trace('getItemProps.pageType.match', () => content.match(/page_type[^\w]+([a-z_-]+)/i));
  const type = pageType ? pageType[1] : '';
  return getContent(type, content);
}

export default getItemProps;
