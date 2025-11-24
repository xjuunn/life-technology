
const base = '/upload';

export interface UploadResponse {
  message: string;
  fileUrl: string;
  fullUrl: string;
  fileName: string;
  fileSize: number;
}

/**
 * 上传头像
 * @param file 头像文件
 */
export function avatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);
  return api.post<UploadResponse>(base + '/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 上传封面
 * @param file 封面文件
 */
export function cover(file: File) {
  const formData = new FormData();
  formData.append('coverImage', file);
  return api.post<UploadResponse>(base + '/cover', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 上传多个文件
 * @param files 多个图片文件
 */
export function multipleUpload(files: File[]) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file)
  })
  return api.post(base + '/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}