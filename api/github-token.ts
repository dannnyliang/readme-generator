import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const { REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET_ID } = process.env;

module.exports = (req: VercelRequest, res: VercelResponse) => {
  const { code } = req.query;
  const data = {
    code,
    client_id: REACT_APP_GITHUB_CLIENT_ID,
    client_secret: REACT_APP_GITHUB_SECRET_ID,
  };

  if (!code) {
    res.status(404).json({
      error: "Required argument `code` isnot provided.",
    });
  }

  axios
    .post("https://github.com/login/oauth/access_token", data, {
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    });
};
