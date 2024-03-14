const sendMail = require("./sendMail")

const TwoSideOrderMails = async (shopMail, userMail, userSide, sellerSide) => {

    const options = {
        email: userMail,
        subject: userSide?.subject,
        message: userSide?.message
    }

    const options2 = {
        email: shopMail,
        subject: sellerSide?.subject,
        message: sellerSide?.message
    }

    sendMail(options)
        .then(async (resu) => {
            await sendMail(options2)
        })
        .catch((error) => {
            console.log(error)
            return next(new ErrorHandler(error.message, 400));
        })
}

module.exports = TwoSideOrderMails