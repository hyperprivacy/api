export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

/** The "Query" type is the root of all GraphQL queries. (A "Mutation" type will be covered later on.) */
export interface Query {
  books?: Maybe<(Maybe<Book>)[]>;
}

/** This "Book" type can be used in other type declarations. */
export interface Book {
  title?: Maybe<string>;

  author?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** The "Query" type is the root of all GraphQL queries. (A "Mutation" type will be covered later on.) */
export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    books?: BooksResolver<Maybe<(Maybe<Book>)[]>, TypeParent, Context>;
  }

  export type BooksResolver<
    R = Maybe<(Maybe<Book>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
}
/** This "Book" type can be used in other type declarations. */
export namespace BookResolvers {
  export interface Resolvers<Context = {}, TypeParent = Book> {
    title?: TitleResolver<Maybe<string>, TypeParent, Context>;

    author?: AuthorResolver<Maybe<string>, TypeParent, Context>;
  }

  export type TitleResolver<
    R = Maybe<string>,
    Parent = Book,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AuthorResolver<
    R = Maybe<string>,
    Parent = Book,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  Book?: BookResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
