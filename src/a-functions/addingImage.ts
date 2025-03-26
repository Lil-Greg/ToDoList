import { convertImgToURL, getLocalImage, resizeImage } from "../backend/convertImg";

export default async function addingImage(imgFile?: File) {
    let imgReturn: string | undefined;
    if (imgFile !== undefined) {
        const resizedImg = await resizeImage(imgFile, 60, 60);
        imgReturn = await convertImgToURL(resizedImg);
    } else {
        const noChosen: File = await getLocalImage();
        const resizedImg = await resizeImage(noChosen, 60, 60);
        imgReturn = await convertImgToURL(resizedImg);
    }
    if (imgReturn === undefined) {
        // Never Gonna Be Undefined though
        return;
    }
    return imgReturn;
}

// To Set For if Statement when Changing PFP:
// 1024(kilobytes)*1024(megabytes)*10(10 MB)
//  = 10,485,760 bytes