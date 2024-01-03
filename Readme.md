# nextjs-parser

NextJS page props, especially UrlSearchParams parser utility in NextJS v13 app routing.

In NextJS v13 app routing, [Page](https://nextjs.org/docs/app/api-reference/file-conventions/page) can get params, searchParams from url.
But searchParams is not URLSearchParams, it is just plain object. So this library parse it to schema and make url navigation easy.

Also supports number/boolean parsing of FormData used in [server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

## Installation

```bash
npm install nextjs-parser
```

## Example

Pagination like `/posts?page=1` can be parsed like this.

`paginationParams.ts`

```typescript
import { NextProps, NextSearchParams } from '../NextProps';

export interface PaginationParams {
  page: number;
}

export namespace PaginationParams {
  const schema = {
    page: 'number',
  } as const;

  export const defaultValue: PaginationParams = {
    page: 1,
  };

  export const parse = (props: NextProps): PaginationParams => {
    return NextSearchParams.parse(props.searchParams, schema, defaultValue);
  };

  export const merge = (searchParams: NextSearchParams, params: Partial<PaginationParams>): string => {
    return NextSearchParams.merge(searchParams, params);
  }
}
```

`page.tsx`

```typescript

export default async function ListPage(props: NextProps) {
  const { page } = PaginationParams.parse(props);

  return (
    <Link href={`/page?${
      PaginationParams.merge(props.searchParams, {
        page: page + 1,
      })
    }`}>
      next page
    </Link>
  )
  // ...
}
```

### Nullable

`paginationParams.ts`

```typescript
import { NextProps, NextSearchParams } from '../NextProps';

export interface CreatePaginationParams {
  create: boolean | null;
  page: number;
}

export namespace CreatePaginationParams {
  const schema = {
    create: 'boolean?',
    page: 'number',
  } as const;

  export const defaultValue: CreatePaginationParams = {
    create: null,
    page: 1,
  };

  export const parse = (props: NextProps): CreatePaginationParams => {
    return NextSearchParams.parse(props.searchParams, schema, defaultValue);
  };

  export const merge = (searchParams: NextSearchParams, params: Partial<CreatePaginationParams>): string => {
    return NextSearchParams.merge(searchParams, params);
  }
}
```

`page.tsx`

```typescript
export default async function ListPage(props: NextProps) {
  const { create, page } = CreatePaginationParams.parse(props);

  if (create) {
    // ...
  }

  return (
    <Link href={`/page?${
      CreatePaginationParams.merge(props.searchParams, {
        page: page + 1,
      })
    }`}>
      next page
    </Link>
  )
  // ...
}
```