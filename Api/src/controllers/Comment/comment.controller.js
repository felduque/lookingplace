import { Comment } from "../../models/comment.model.js";
import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";

export const createComment = async (req, res) => {
  const {
    comment,
    property_comment,
    author,
    avatar,
    client_comment,
    calificacion,
  } = req.body;

  try {
    const existingComment = await Comment.findOne({
      where: {
        author,
        property_comment,
      },
    });

    if (existingComment) {
      return res
        .status(400)
        .json({ message: "El autor ya ha comentado en esta propiedad" });
    }

    await Comment.create({
      comment,
      property_comment,
      author,
      avatar,
      client_comment,
      calificacion,
      fecha: new Date(),
    });
    return res.status(201).json({ message: `Comentario creado! ` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
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
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Tenant,
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Property,
          attributes: ["id", "title"],
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
  const { comment, property_comment } = req.body;
  console.log(req.body);
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

export const calificacionUpdate = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { dataBody } = req.body;
  console.log(dataBody);
  try {
    let commentUpd = await Comment.findOne({
      where: { id },
    });
    if (!commentUpd)
      return res.status(400).json({ message: "Comment not found" });
    if (commentUpd) {
      await Comment.update(
        {
          calificacion: dataBody,
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
