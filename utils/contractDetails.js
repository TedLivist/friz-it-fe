export const contractAddress = "0xC6dca50314D9F52F4F42DEd4FccE4867cfE0ED6b";

export const contractABI = [
  {"inputs":[{"internalType":"uint256","name":"_deadline","type":"uint256"},{"internalType":"address","name":"_recipientAddress","type":"address"},
    {"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"}],"stateMutability":"payable","type":"constructor"},
    {"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":
      [{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":
        [{"indexed":false,"internalType":"uint256","name":"newDeadline","type":"uint256"}],"name":"DeadlineAdjusted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},
          {"indexed":false,"internalType":"uint256","name":"ethAmount","type":"uint256"},
          {"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":
            [{"internalType":"uint256","name":"_newDeadline","type":"uint256"}],"name":"adjustDeadline","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":
              [],"name":"deadline","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":
                [{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recipientAddress","outputs"
                  :[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":
                    [{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},
                    {"stateMutability":"payable","type":"receive"}
]