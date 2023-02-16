const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });
console.log(process.env.TWILIO_ACCOUNT_SID);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const contacts = [
  { name: "Rilwan", phoneNumber: +2349074452956 },
  //   { name: "Agba", phoneNumber: +2349073882829 },
  //   { name: "Barakat", phoneNumber: +2349026685514 },
  //   { name: "Hannah", phoneNumber: +2347049174259 },
  //   { name: "Laflare", phoneNumber: +2347033888686 },
  //   { name: "Sheriff", phoneNumber: +2347038441225 },
  //   { name: "Lade", phoneNumber: +2348034451788 },
];

contacts.forEach((contact) => {
  client.calls
    .create({
      twiml: `<Response><Say>Hello ${contact.name}, This is an automated call from Ridwan to check up on you, I hope you good, Stay safe in tis electon season</Say></Response>`,
      from: process.env.TWILIO_ACCOUNT_PHONENUMBER,
      to: contact.phoneNumber,
    })
    .then((call) => {
      console.log(call.sid, " ", `${contact.name} called successfully`);
    })
    .catch((err) => {
      console.log(`${contact.name} could not be reached ue to error`, err);
    });
});
