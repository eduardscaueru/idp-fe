export interface IPost {
  id?: number;
  title?: string;
  createDate?: Date;
  timeCreatedString?: string;
  likeCount?: number;
  alreadyLiked?: boolean;
  bodyText?: string;
  imageString?: string;
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public title?: string,
    public createDate?: Date,
    public timeCreatedString?: string,
    public likeCount?: number,
    public alreadyLiked?: boolean,
    public bodyText?: string,
    public imageString?: string
  ) { }
}
