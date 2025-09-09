import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3Singleton from "src/config/s3";

/**
 * Sube un PDF a S3 y devuelve el "key" del archivo.
 * Ese key lo debes guardar en la base de datos.
 */
export async function uploadPdfToS3(buffer: Buffer, key: string) {
  const s3 = S3Singleton.getInstance();
  const s3BucketName = process.env.PDF_BUCKET;

  const putCommand = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: key,
    Body: buffer,
    ContentType: "application/pdf",
  });

  await s3.send(putCommand);

  return key;
}

/**
 * Genera un signed URL válido por 1 hora a partir del key guardado en la DB.
 */
export async function getSignedUrlFromS3(key: string, expiresInSeconds = 3600) {
  const s3 = S3Singleton.getInstance();
  const s3BucketName = process.env.PDF_BUCKET;

  const getCommand = new GetObjectCommand({
    Bucket: s3BucketName,
    Key: key,
  });

  return await getSignedUrl(s3, getCommand, { expiresIn: expiresInSeconds });
}
