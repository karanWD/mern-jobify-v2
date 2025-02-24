import multer from "multer"

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images')
  },
  filename:(req,file,cb)=>{
    const fileName = file.originalname
    cb(null,fileName)
  },
})

const upload = multer({storage})

export default upload