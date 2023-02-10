export interface Comic {
  id: string;
  title: string;
  slug: string;
}
export interface Comics {
  comics: [Comic];
}
