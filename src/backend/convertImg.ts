// Convert Image to Binary (or a Binary Large Object - BLOB)
export function convertImgToBlob(imgFile: File)/*: Blob*/ {
    console.log(imgFile.size);
    return;
}
// export function convertBlobToFile(imgFile) {

// }

/* export function getImgSimplifiedSize(imgFile: File) {
    // got from: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_showing_files_size
    let numberOfBytes = imgFile.size
    const units = [
            "B",
            "KiB",
            "MiB",
            "GiB",
            "TiB",
            "PiB",
            "EiB",
            "ZiB",
            "YiB",
          ];
          const exponent = Math.min(
            Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
            units.length - 1,
          );
          const approx = numberOfBytes / 1024 ** exponent;
          const output =
            exponent === 0
              ? `${numberOfBytes} bytes`
              : `${approx.toFixed(3)} ${
                  units[exponent]
                } (${numberOfBytes} bytes)`;

}*/
