//mc_verication_service.js

const request = require("request");
const express = require("express");

const app = express();
const port = 3000;

const baseURL = "https://cpaas.messagecentral.com";
const customerId = "[Your Customer ID]";
const email = "[Your Email]";
const password = "[Your Password]";

let verificationId;

const generateAuthToken = async () => {
    const base64String = Buffer.from(password).toString("base64");

    const url = `${baseURL}/auth/v1/authentication/token?
    country=IN&customerId=${customerId}&email=${email}
    &key=${base64String}&scope=NEW`;

    const options = {
        url: url,
        headers: {
            accept: "*/*",
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error("Error generating auth token:", error);
                reject(error);
                return;
            }

            console.log("Auth Token:", body);
            authToken = JSON.parse(body).token;

            resolve(authToken);
        });
    });
};

const sendOtp = async (countryCode, mobileNumber) => {
    const url = `${baseURL}/verification/v2/verification/send?
    countryCode=${countryCode}&customerId=${customerId}&
    flowType=SMS&mobileNumber=${mobileNumber}`;

    const options = {
        url: url,
        method: "POST",
        json: true,
        headers: {
            accept: "*/*",
            authToken: authToken,
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error("Error generating auth token:", error);
                reject(error);
                return;
            }
            console.log("Request :", options);
            console.log("Body :", body);
            verificationId = body.data.verificationId;
            resolve(body);
        });
    });
};

const velidateOtp = async (otpCode, countryCode, mobileNumber) => {
    const url = `${baseURL}/verification/v2/verification/validateOtp?
    countryCode=${countryCode}&mobileNumber=${mobileNumber}&
    verificationId=${verificationId}&customerId=${customerId}&code=${otpCode}`;

    const options = {
        url: url,
        method: "GET",
        json: true,
        headers: {
            accept: "*/*",
            authToken: authToken,
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error("Error generating auth token:", error);
                reject(error);
                return;
            }
            console.log("Request :", options);
            console.log("Body :", body);

            resolve(body);
        });
    });
};

app.post("/sendotp/:countryCode/:mobileNumber", async (req, res) => {
    const { countryCode, mobileNumber } = req.params;

    const authToken = await generateAuthToken();

    try {
        body = await sendOtp(countryCode, mobileNumber);

        if (body.data.responseCode == 200 && body.data.errorMessage == null) {
            res.status(200).send("Otp sent! Successfully");
        } else {
            res.status(400).send("Bad Request ${body.data.errorMessage}");
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
        const s = error;
        res.status(500).send(s);
    }
});

app.get(
    "/validateOtp/:countryCode/:mobileNumber/:otpCode",
    async (req, res) => {
        const { countryCode, mobileNumber, otpCode } = req.params;

        const authToken = await generateAuthToken();

        try {
            body = await velidateOtp(otpCode, countryCode, mobileNumber);

            if (
                body.data.verificationStatus == "VERIFICATION_COMPLETED" &&
                body.data.errorMessage == null
            ) {
                res.status(200).send("Otp verification Done! ");
            } else {
                res.status(400).send("Bad Request : ${body.data.errorMessage}");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            const s = error;
            res.status(500).send(s);
        }
    }
);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
