exports.imageValidations = (req) => {

    if(!req.files) {
        return {
            error: true,
            message: "Image is required"
        }
    }

    const image = req.files.image
    const imageExtension = image.name.split('.').pop()
    const allowedExtensions = ['jpg', "png"]

    if(!allowedExtensions.includes(imageExtension)){
        return {
            error: true,
            message: "Only jpg, png, and jpeg are allowed"
        }
    }

    return {
        error: false,
        message: "Image is valid"
    }

}