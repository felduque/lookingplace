import { Comment } from "../../models/comment.model.js";


export async function createComment(req, res) {

  const { comment, property_comment, client_comment, tenant_comment } =
    req.body;
  await Comment.create({
    comment,
    property_comment,
    client_comment,
    tenant_comment,
  });
  return res.status(201).json({ message: `You are creat ` });
}
