const { google } = require("googleapis");

const axios = require("axios");

//get drive service
const getDriveService = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};

const drive = getDriveService();

const uploadSingleFile = async (fileName, fileUrl) => {
  try {
    const folderId = "16YuMtXI-WX9iTK5aAyg0juvWY7PPKL1a";
    const response = await axios.get(fileUrl, { responseType: "stream" });
    const mimeType = response.headers["content-type"];
    const { data: { id, name } = {} } = await drive.files.create({
      resource: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: response.data,
      },
      fields: "id,name",
    });

    const file = await drive.files.get({
      fileId: id,
      fields: "thumbnailLink",
    });

    console.log("Filfile.data.e Uploaded", name, id, file.data.thumbnailLink);
    return file.data.thumbnailLink;
  } catch (error) {
    throw new Error(error);
  }
};

const scanUrlsForFiles = async (fileUrls) => {
  try {
    const fileLinks = [];
    for (const fileUrl of fileUrls) {
      const fileName = fileUrl.split("/").pop();
      console.log("fileName", fileName);

      const link = await uploadSingleFile(fileName, fileUrl);
      fileLinks.push(link);
    }
    return fileLinks;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  scanUrlsForFiles,
};
