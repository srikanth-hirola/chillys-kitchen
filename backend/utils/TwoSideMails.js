const sendMail = require("./sendMail")
const User = require('../model/user');

const TwoSideMails = async (shopMail, adminSide, sellerSide) => {
    // const foundAdmin = await User.findOne({ role: 'Admin' })

    // const options = {
    //     email: foundAdmin?.email,
    //     subject: adminSide?.subject,
    //     message: adminSide?.message
    // }

    const options2 = {
        email: shopMail,
        subject: sellerSide?.subject,
        message: sellerSide?.message
    }
    await sendMail(options2)
    // sendMail(options)
    //     .then(async (resu) => {
    //         await sendMail(options2)
    //     })
    //     .catch((error) => {
    //         return next(new ErrorHandler(error.message, 400));
    //     })
}

module.exports = TwoSideMails