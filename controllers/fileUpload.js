const File = require("../models/File");
const cloundinary = require("cloudinary").v2;

// Local file upload
module.exports.localFileUpload = async (req, res) => {
  try {
    // fetch file from request
    const file = req.files.file;
    console.log(file, "Uploded file");

    //create a path where file needs to be stored
    // kis path pe file store krna chahte ho
    let path = __dirname + "/files/" + Date.now() + file.name.split("."[1]);

    // .mv se particular file ko given path pe move krna chate hai

    file.mv(path, (err) => {
      console.log(err);
    });
    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully !",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "Something went wront !",
    });
  }
};

// function to check file support

const isSupportedFile = (fileType, supportedTypes) => {
  return supportedTypes.includes(fileType);
};

const uploadFileToCloudinary = async (file, folder, quality) => {
  const options = { folder };
  options.resource_type = "auto"; // khud se decide krne do video hai ya image
  console.log(file.tempFilePath, "temp file path");

  if (quality) {
    options.quality = quality;
  }

  return await cloundinary.uploader.upload(file.tempFilePath, options);
};

module.exports.imageUpload = async (req, res) => {
  try {
    //  data fetch
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;
    // console.log(name , imageUrl , tags , email , file , "all data")

    // Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isSupportedFile(fileType, supportedTypes)) {
      return res.status(401).json({
        message: false,
        message: "File format not supported",
      });
    }
    // next => yaha tak k step me file format supported true hai , now we have to upload file to cloudinary and create a entry in db
    const response = await uploadFileToCloudinary(file, "CodeHelp");
    console.log(response, "response");

    //   creating an entry in the db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.url,
    });
    res.status(200).json({
      success: true,
      data: fileData,
      message: "File Uploaded Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports.videoUpload = async (req, res) => {
  try {
    // fetch data from req
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;
    console.log(file, "file");

    // Adding Validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType, "fileType");

    // TODO :  Retrict the video size upto 5MB

    if (!isSupportedFile(fileType, supportedTypes)) {
      return res.status(404).json({
        success: false,
        message: "Ivalid video format",
      });
    }

    //    Adding to cloudinary
    const response = await uploadFileToCloudinary(file, "CodeHelp");
    console.log(response, "response");

    // Adding to db
    const fileData = await File.create({
      name,
      email,
      tags,
      videoUrl: response.url,
    });

    return res.status(200).json({
      success: true,
      data: fileData,
      message: "Video Uploaded Successfully !",
    });
  } catch (e) {
    console.log(e, "error from catch block");
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports.reduceImageSize = async (req, res) => {
  try {
    //  data fetch
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;
    // console.log(name , imageUrl , tags , email , file , "all data")

    // Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isSupportedFile(fileType, supportedTypes)) {
      return res.status(401).json({
        message: false,
        message: "File format not supported",
      });
    }
    // next => yaha tak k step me file format supported true hai , now we have to upload file to cloudinary and create a entry in db
    // TODO :  height width se compress krne ki koshish krenge
    const response = await uploadFileToCloudinary(file, "CodeHelp", 20);
    console.log(response, "response");

    //   creating an entry in the db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.url,
    });
    res.status(200).json({
      success: true,
      data: fileData,
      message: "File Uploaded Successfully",
    });
  } catch (e) {
    console.log(e, "error from catch block");
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
