type CloudinaryUploadResponse = {
  secure_url: string;
};

function isCloudinaryUploadResponse(
  payload: unknown,
): payload is CloudinaryUploadResponse {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as Record<string, unknown>).secure_url === "string"
  );
}

export function uploadImageToCloudinary(
  file: File,
  onProgress?: (progress: number) => void,
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return new Promise<string>((resolve, reject) => {
    if (!cloudName || !uploadPreset) {
      reject(
        new Error(
          "Cloudinary belum dikonfigurasi. Isi NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME dan NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
        ),
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const request = new XMLHttpRequest();
    request.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    );

    request.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }

      onProgress?.(Math.round((event.loaded / event.total) * 100));
    };

    request.onerror = () => {
      reject(new Error("Upload gambar gagal. Periksa koneksi dan konfigurasi Cloudinary."));
    };

    request.onload = () => {
      if (request.status < 200 || request.status >= 300) {
        reject(new Error(`Upload gambar gagal dengan status ${request.status}.`));
        return;
      }

      try {
        const payload: unknown = JSON.parse(request.responseText);

        if (!isCloudinaryUploadResponse(payload)) {
          reject(new Error("Response Cloudinary tidak valid."));
          return;
        }

        resolve(payload.secure_url);
      } catch {
        reject(new Error("Response Cloudinary tidak dapat dibaca."));
      }
    };

    request.send(formData);
  });
}
