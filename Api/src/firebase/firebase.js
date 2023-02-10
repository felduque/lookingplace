import admin from "firebase-admin";

import serviceAccount from "../firebase/firebasekey.json" assert { type: "json" };

const BUCKET = "lookingplace-7c14f.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

export const uploadImageClient = (req, res, next) => {
  if (!req.file) return next();

  const avatar = req.file;
  const avatarName = Date.now() + "." + avatar.originalname.split(".").pop();

  const file = bucket.file("files/clients/" + avatarName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: avatar.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.log(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/files/clients/${avatarName}`;

    next();
  });

  stream.end(avatar.buffer);
};

export const uploadImageProperty = (req, res, next) => {
  if (!req.files) return next();
  // creadora de req files
  const promises = [];
  for (let i = 0; i < req.files.length; i++) {
    const image = req.files[i];
    const imageName = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file("files/properties/" + imageName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });
    //promesa que maneja error handler y  writestream finish (llegan a hacerse 5 promesas por que el maximo es 5 imagenes)
    const promise = new Promise((resolve, reject) => {
      stream.on("error", (e) => {
        console.log(e);
        reject(e);
      });

      stream.on("finish", async () => {
        await file.makePublic();
        //creo un firebaseurl por cada file que este indexado
        req.files[
          i
        ].firebaseUrl = `https://storage.googleapis.com/${BUCKET}/files/properties/${imageName}`;
        resolve();
      });
    });

    // pushea las promesas en un array
    promises.push(promise);

    stream.end(image.buffer);
  }

  Promise.all(promises)
    .then(() => {
      next();
    })
    .catch((e) => {
      console.error(e);
    });
};

export const uploadImageTenant = (req, res, next) => {
  if (!req.file) return next();

  const avatar = req.file;
  const avatarName = Date.now() + "." + avatar.originalname.split(".").pop();

  const file = bucket.file("files/tenants/" + avatarName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: avatar.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.log(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/files/tenants/${avatarName}`;

    next();
  });

  stream.end(avatar.buffer);
};
