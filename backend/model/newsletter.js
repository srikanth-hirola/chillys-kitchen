const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
    {
        mailIds: {
            type: Array,
        },
    }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);