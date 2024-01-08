

export default function handler(req, res) {
  const pincodes = {
    "584101":["Raichur","Karnataka"],
    "110003":["Delhi","Delhi"],
    "721302":["Kaharagpur","West Bengal"],
    "560017":["Banglore","Karanataka"]
  }
    res.status(200).json({pincodes:pincodes});
}
  