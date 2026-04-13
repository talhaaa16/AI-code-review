const aiService = require("../services/aiservices")

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).send("Prompt is required");
        }

        const response = await aiService(code);
        res.send(response);
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).send(err.message || "Internal Server Error");
    }
}