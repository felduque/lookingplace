import { Comment } from "../../models/comment.model.js";
import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";

export const createComment = async (req, res) => {
  const { comment, property_comment, author, avatar } = req.body;
  await Comment.create({
    comment,
    property_comment,
    author,
    avatar,
    fecha: new Date(),
  });
  return res.status(201).json({ message: `Comment created! ` });
};

export const getAllComments = async (req, res) => {
  try {
    const comment = await Comment.findAll({
      attributes: ["id", "comment", "fecha", "author", "avatar"],
      include: [
        {
          model: Client,
          as: "Client",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Tenant,
          as: "Tenant",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Property,
          as: "Property",
          attributes: ["id"],
        },
      ],
    });
    res.json({
      data: comment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    let commentId = await Comment.findOne({
      where: { id },
      attributes: ["id", "comment", "fecha"],
      include: [
        {
          model: Client,
          as: "client_comment",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Tenant,
          as: "tentant_comment",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Property,
          as: "property_comment",
          attributes: ["id", "fullName", "avatar", "email"],
        },
      ],
    });
    res.json({
      data: commentId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    let comment = await Comment.findOne({
      where: { id },
    });
    if (!comment) return res.status(400).json({ message: "Comment not found" });
    if (comment) {
      await Comment.destroy({
        where: { id },
      });
      res.json({
        message: "Comment deleted successfully",
        data: Comment,
      });
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment, property_comment, client_comment, tenant_comment } =
    req.body;
  try {
    let commentUpd = await Comment.findOne({
      where: { id },
    });
    if (!commentUpd)
      return res.status(400).json({ message: "Comment not found" });
    if (commentUpd) {
      await Comment.update(
        {
          comment,
          property_comment,
          client_comment,
          tenant_comment,
        },
        {
          where: { id },
        }
      );
      res.json({
        message: "Comment updated successfully",
        data: commentUpd,
      });
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};
