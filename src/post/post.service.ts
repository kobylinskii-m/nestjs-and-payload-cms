import { Model } from "mongoose";
import payload from "payload";
import { Post } from "payload/generated-types";
import { PostCollection } from "../collections/post.collection";

export class PostService {
  private readonly _postModel: Model<Post>;
  constructor() {
    this._postModel = payload.collections[PostCollection.slug].Model;
    setInterval(this.handlerPublisherPost.bind(this), 1000 * 60 * 60);
  }

  public async handlerPublisherPost() {
    const result = await this._postModel.find({
      status: "draft",
      datePublished: { $lte: new Date() },
    });
    for (const item of result) {
      item.status = "published";
      await item.save();
    }
  }
}
