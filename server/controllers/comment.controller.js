import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";

export const createComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { comment } = req.body;
    const {userId} = req.user;
    

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    let newComment = await Comment.create({
      text: comment,
      userId,
      videoId,
    });

    video.comments.push(newComment._id);
    await video.save();

    // ✅ Populate the user info before sending the response
    newComment = await newComment.populate("userId", "username email");

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
   const {commentId} = req.params;
   const {userId} = req.user;

   const comment = await Comment.findById(commentId);
   if(!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
   } 
   if(comment.userId.toString() !== userId) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this comment",
    }); 
   }

   await Comment.findByIdAndDelete(commentId);

   // Delete The Comment reference from the Video collection as well
   await Video.findByIdAndUpdate(comment.videoId, {
    $pull: {comments: commentId},
   });


   return res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
   });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    }); 
  }
}

export const updateComment = async (req, res) => {
  try {
   const { commentId} = req.params;
   const {comment} = req.body;
   const {userId} = req.user;

   const commentToUpdate = await Comment.findById(commentId);
   if(!commentToUpdate) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
   }
   if(commentToUpdate.userId.toString()!== userId) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this comment",
    }); 
   }

   commentToUpdate.text = comment;
   await commentToUpdate.save();

   return res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: commentToUpdate,  
   })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export const getAllComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate("comments").populate("comments.userId").populate("comments.likes")
    .populate("comments.replies").populate("comments.replies.userId").populate("comments.replies.likes");
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    } 

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: video.comments, 
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    }); 
  } 
};


export const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment fetched successfully",
      data: comment,  
    }) 
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    }); 
  }
}

export const likedOrUnlikeComment = async (req, res) => {
  try {
    const {commentId} = req.params;
    const { userId } = req.user;

    const comment = await Comment.findById(commentId);

    if(!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      }); 
    }

    const hasLiked  = comment.likes.includes(userId);
    if(hasLiked) {
       // Remove like
      comment.likes.pull(userId);
      await comment.save();
      return res.status(200).json({
        success: true,
        message: "Comment unliked successfully",
      });
    }else{
      // Add like
      comment.likes.push(userId);
      await comment.save();
      return res.status(200).json({
        success: true,
        message: "Comment liked",
      });
    }

  } catch (error) {
    
  }
}

export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { reply } = req.body;
    const userId = req.user._id;

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: "Reply text is required",
      });
    }

    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Step 1: Create a new comment document as the reply
    const newReply = await Comment.create({
      text: reply,
      userId,
      videoId: parentComment.videoId, // inherit videoId from parent
    });

    // Step 2: Push the reply's ObjectId to parent comment
    parentComment.replies.push(newReply._id);
    await parentComment.save();

    return res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: newReply,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};