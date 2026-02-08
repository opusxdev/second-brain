import userContent from "../models/contentModel.js";

export const newContent = async (req, res) => {
  try {
    const { link, contentType, title, tag } = req.body;
    const userid = req.userID;

    // checking whether user given all the fields or not
    if (!link || !contentType || !title || !userid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contentCreated = new userContent({
      link,
      contentType,
      title,
      tag,
      userId: userid
    });

    await contentCreated.save();

    return res.status(200).json({ message: "Content saved Successfully" });
  } catch (err) {
    console.log("Err(catch): something went wrong", err);
  }
};

export const content = async (req, res) => {
  try {
    const userid = req.userID;

    // checking userid present or not
    if (!userid) {
      return res.status(400).json({ message: "Something wrong" });
    }

    const userData = await userContent.find({ userId: userid });

    console.log(userData);

    return res.status(200).json({
      message: "User data fetched successfully",
      data: userData
    });
  } catch (err) {
    console.log("Err(catch): something went wrong", err);
  }
};

export const deleteContent = async (req, res) => {
  try {
    const userid = req.userID;
    const userTitle = req.params.contentId;

    console.log("userid =>", userid);
    console.log("contentid =>", userTitle);

    if (!userid || !userTitle) {
      return res.status(400).json({ message: "User ID or Content ID missing" });
    }

    const content = await userContent.findOne({ title: userTitle, userId: userid });

    if (!content) {
      return res.status(404).json({ message: "Content not found or unauthorized" });
    }

    await userContent.findByIdAndDelete(content);

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (err) {
    console.log("Err(catch): something went wrong", err);
  }
};

export const shareContent = async (req, res) => {
  const { userId } = req.params;
  try {
    const documents = await userContent.find({ userId });
    return res.status(200).json({ data: documents });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
