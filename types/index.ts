export interface Comic {
  id: string;
  title: string;
  slug: string;
  releases: Release[];
}
export interface Release {
  id: int;
  title: string;
  comicId: int;
  comic: Comic;
  page: Page;
}
export interface Page {
  id: int;
}
export interface Comics {
  comics: [Comic];
}
