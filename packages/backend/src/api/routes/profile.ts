import { Router } from 'express';
import multer from 'multer';

import { changeProfileImage } from '../../bll/user.js';

const profileRouter = Router();

const upload = multer({
  dest: 'user-images/',
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB file size limit
});

profileRouter.post('/avatar', upload.single('file'), async (req, res) => {
  // 'file' is the name attribute in the FormData on the frontend
  // req.file contains information about the uploaded file

  // Process the file as needed (e.g., save it somewhere)
  console.log('Uploaded:', req.file);
  const fileUri = `http://localhost:3000/user-images/${req.file!.filename}`;

  await changeProfileImage(req.user.id, fileUri);

  // Respond to the client
  setTimeout(() => {
    res.json({
      message: 'File uploaded successfully',
      filename: fileUri,
    });
  }, 1000);
});

export { profileRouter };
